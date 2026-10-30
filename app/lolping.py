"""Manage the isolated Electron process that hosts lolPing."""
import json
import os
import sys
import secrets
from pathlib import Path

from PySide6.QtCore import QObject, QProcess, QProcessEnvironment, QTimer, Signal
from PySide6.QtNetwork import QTcpSocket, QHostAddress

import theme


class LolPing(QObject):
    status_changed = Signal()
    error = Signal(str)

    def __init__(self, parent=None):
        super().__init__(parent)
        base = Path(getattr(sys, '_MEIPASS', Path(__file__).resolve().parent.parent))
        self.script = base / 'runtime' / 'lolping' / 'main.js'
        bundled = base / 'runtime' / 'electron' / 'electron.exe'
        self.electron = Path(os.environ.get('TUTU_ELECTRON', str(bundled if bundled.exists() else Path.home() / '.dsh' / 'electron' / 'electron.exe')))
        self.process = QProcess(self)
        self.socket = QTcpSocket(self)
        self.token = secrets.token_hex(24)
        self.socket.connected.connect(self._flush)
        self.heartbeat = QTimer(self)
        self.heartbeat.setInterval(3000)
        self.heartbeat.timeout.connect(self._heartbeat)
        self.heartbeat.start()
        env = QProcessEnvironment.systemEnvironment()
        env.remove('ELECTRON_RUN_AS_NODE')
        env.insert('TUTU_LOLPING_DATA', str(Path(theme.app_dir()) / 'data' / 'lolping'))
        env.insert('TUTU_LOLPING_TOKEN', self.token)
        self.process.setProcessEnvironment(env)
        self.process.setProcessChannelMode(QProcess.SeparateChannels)
        self.process.readyReadStandardOutput.connect(self._read)
        self.process.errorOccurred.connect(self._process_error)
        self.process.finished.connect(self._finished)
        self.status = {'enabled': False, 'helper': 'starting'}
        self.buffer = b''
        self.stopping = False
        self.pending = []
        # 运行组件是否齐全：缺 Electron 时不做任何提示，静静保持不可用，
        # 免得每次启动都弹模态框把人挡在门外。
        self.available = self.electron.is_file() and self.script.is_file()

    def start(self):
        self.stopping = False
        self.socket.abort()
        self.pending.clear()
        self.status = {'enabled': False, 'helper': 'starting'}
        if not self.available:
            self.status = {'enabled': False, 'helper': 'failed'}
            self.status_changed.emit()
            return
        self.process.start(str(self.electron), [str(self.script)])

    def retry(self):
        if self.process.state() == QProcess.NotRunning:
            self.start()
        else:
            self.command('retry')

    def command(self, action):
        if not self.available:
            self.error.emit('未找到 lolPing 运行组件：请安装 Electron，或用 TUTU_ELECTRON 指定 electron.exe。')
            return
        if self.process.state() != QProcess.Running:
            self.error.emit('lolPing 未运行，请重新启动桌宠。')
            return
        if self.socket.state() != QTcpSocket.ConnectedState:
            self.pending.append(action)
        else:
            self._send(action)

    def _send(self, action):
        self.socket.write((json.dumps({'action': action, 'token': self.token}) + '\n').encode())

    def _flush(self):
        self._heartbeat()
        for action in self.pending:
            self._send(action)
        self.pending.clear()

    def _heartbeat(self):
        if self.socket.state() == QTcpSocket.ConnectedState:
            self._send('heartbeat')

    def _read(self):
        self.buffer += bytes(self.process.readAllStandardOutput())
        while b'\n' in self.buffer:
            line, self.buffer = self.buffer.split(b'\n', 1)
            if not line.startswith(b'TUTU_LOLPING '):
                continue
            try:
                item = json.loads(line[len(b'TUTU_LOLPING '):])
                if item.get('type') == 'status':
                    self.status = item['status']
                    self.status_changed.emit()
                elif item.get('type') == 'port':
                    self.socket.connectToHost(QHostAddress.LocalHost, int(item['port']))
                elif item.get('type') == 'autostart':
                    on = bool(item['enabled'])
                    if not theme.set_autostart(on):
                        self.error.emit('无法更改开机启动设置。')
                    else:
                        # 和主配置保持一致：否则出现「注册表开了、配置里是关的」，
                        # 下次启动又被当成残留项清掉，看着像开关失灵。
                        cfg = getattr(self.pet, 'cfg', None)
                        if cfg is not None:
                            cfg.autostart = on
                            cfg.save()
                elif item.get('type') == 'error':
                    self.error.emit(item.get('message', 'lolPing 发生错误'))
            except (ValueError, KeyError):
                continue

    def _process_error(self, _error):
        if not self.stopping:
            self.error.emit('lolPing 启动失败：' + self.process.errorString())

    def _finished(self, code, _status):
        self.socket.abort()
        self.pending.clear()
        self.status = {'enabled': False, 'helper': 'failed'}
        self.status_changed.emit()
        if not self.stopping:
            self.error.emit(f'lolPing 已退出（{code}），请重新启动桌宠。')

    def stop(self):
        self.stopping = True
        if self.process.state() != QProcess.NotRunning:
            if self.socket.state() == QTcpSocket.ConnectedState:
                self._send('stop')
                self.socket.waitForBytesWritten(1000)
            if not self.process.waitForFinished(5000):
                self.process.kill()
                self.process.waitForFinished(2000)
