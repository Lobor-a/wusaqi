"""兔兔桌宠 · 提醒版

保留了换装版的全部玩法（拖动掉落、摸摸头、喂食、双击蹦跳、番茄钟、跟随鼠标、
自由散步、自言自语、置顶、大小、开机自启、托盘、亲密度、36 套换装），
新增一整套提醒系统（定时 / 间隔、星期重复、自定义文案、静音、稍后提醒、响铃）。
"""
from __future__ import annotations

import json
import math
import os
import random
import sys
import time

from PySide6.QtCore import QElapsedTimer, QPoint, QPointF, QRectF, QSize, Qt, QTimer
from PySide6.QtGui import (
    QAction,
    QColor,
    QCursor,
    QFont,
    QIcon,
    QPainter,
    QPainterPath,
    QPen,
    QPixmap,
    QPolygonF,
)
from PySide6.QtWidgets import (
    QApplication,
    QHBoxLayout,
    QInputDialog,
    QLabel,
    QMenu,
    QMessageBox,
    QPushButton,
    QSystemTrayIcon,
    QVBoxLayout,
    QWidget,
)

import motion
import reminders
import lolping
import theme
import wardrobe


# ==================================================================== 配置
class Config:
    DEFAULTS = {
        "intimacy": 0.0,
        "outfit": 0,
        "size": "mid",
        "on_top": True,
        "follow": False,
        "walk": True,
        "talk": True,
        "pos": None,
        "autostart": False,
        "last_seen": 0.0,
    }

    def __init__(self, path: str | None = None):
        self.path = path or theme.CONFIG_PATH
        self.raw: dict = {}
        self.load()

    def load(self) -> None:
        data = {}
        try:
            with open(self.path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            data = {}
        if not isinstance(data, dict):
            data = {}
        self.raw = data
        for k, v in self.DEFAULTS.items():
            setattr(self, k, data.get(k, v))
        try:
            self.intimacy = float(self.intimacy)
        except Exception:
            self.intimacy = 0.0
        try:
            self.outfit = int(self.outfit) % max(1, theme.OUTFIT_COUNT)
        except Exception:
            self.outfit = 0
        if self.size not in theme.SIZES:
            self.size = "mid"

    def save(self) -> None:
        data = dict(self.raw)
        for k in self.DEFAULTS:
            data[k] = getattr(self, k)
        mix = dict(data.get("mix") or {})
        mix.update({"photo": self.outfit, "pal": f"photo{self.outfit}"})
        data["mix"] = mix
        try:
            tmp = self.path + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            os.replace(tmp, self.path)
        except Exception:
            pass

    def level(self) -> str:
        name = theme.LEVELS[0][1]
        for th, n in theme.LEVELS:
            if self.intimacy >= th:
                name = n
        return name


# ==================================================================== 气泡
class Bubble(QWidget):
    """头上那朵对话气泡（可带按钮，重复使用同一个窗口）。"""

    TRAIL = 14

    def __init__(self):
        super().__init__(None, Qt.FramelessWindowHint | Qt.Tool | Qt.WindowStaysOnTopHint)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setAttribute(Qt.WA_ShowWithoutActivating)
        self.setFocusPolicy(Qt.NoFocus)

        lay = QVBoxLayout(self)
        lay.setContentsMargins(16, 12, 16, 12 + self.TRAIL)
        lay.setSpacing(8)
        self.lay = lay

        self.lb = QLabel()
        self.lb.setWordWrap(True)
        self.lb.setStyleSheet(
            f"color:{theme.INK};font-family:'Microsoft YaHei UI';font-size:13px;background:transparent;"
        )
        lay.addWidget(self.lb)

        self.btn_row = QHBoxLayout()
        self.btn_row.setSpacing(8)
        self.btn_row.addStretch(1)
        lay.addLayout(self.btn_row)

        self.hide_timer = QTimer(self)
        self.hide_timer.setSingleShot(True)
        self.hide_timer.timeout.connect(self.hide)
        self.buttons: list[QPushButton] = []

    # -- 内容
    def show_text(self, text: str, ms: int = 2600, actions: list[tuple[str, object]] | None = None) -> None:
        for b in self.buttons:
            self.btn_row.removeWidget(b)
            b.deleteLater()
        self.buttons.clear()

        self.lb.setText(text)
        width = 240 if len(text) > 16 else max(96, 15 * len(text) + 6)
        self.lb.setFixedWidth(width)

        for label, cb in actions or []:
            b = QPushButton(label)
            b.setCursor(Qt.PointingHandCursor)
            b.setStyleSheet(
                "QPushButton{background:#FFF;border:2px solid #FFD3E0;border-radius:9px;"
                "padding:4px 12px;color:#43261E;font-family:'Microsoft YaHei UI';font-size:12px;}"
                "QPushButton:hover{background:#FFF0F5;border-color:#FF8FB1;}"
            )
            b.clicked.connect(lambda _=False, f=cb: f())
            self.btn_row.addWidget(b)
            self.buttons.append(b)

        self.adjustSize()
        self.setFixedSize(self.sizeHint().width(), self.sizeHint().height())
        self.show()
        self.raise_()

        if ms > 0:
            self.hide_timer.start(ms)

    def paintEvent(self, e) -> None:
        if not self.lb.text():
            return
        p = QPainter(self)
        p.setRenderHint(QPainter.Antialiasing)
        w, h = self.width(), self.height()
        r = QRectF(1.5, 1.5, w - 3, h - self.TRAIL - 2)

        path = QPainterPath()
        path.addRoundedRect(r, 13, 13)
        tri = QPainterPath()
        tri.moveTo(w / 2 - 8, r.bottom() - 1)
        tri.lineTo(w / 2, r.bottom() + self.TRAIL - 2)
        tri.lineTo(w / 2 + 8, r.bottom() - 1)
        tri.closeSubpath()
        path = path.united(tri)

        p.setPen(QPen(QColor(theme.INK), 2.4))
        p.setBrush(QColor(255, 253, 246, 250))
        p.drawPath(path)


# ==================================================================== 兔子
class PetWindow(QWidget):
    def __init__(self, cfg: Config):
        flags = Qt.FramelessWindowHint | Qt.Tool
        if cfg.on_top:
            flags |= Qt.WindowStaysOnTopHint
        super().__init__(None, flags)
        self.cfg = cfg
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setAttribute(Qt.WA_ShowWithoutActivating)
        self.setContextMenuPolicy(Qt.DefaultContextMenu)

        self.store = reminders.ReminderStore()
        self.engine = reminders.ReminderEngine(self.store, self.on_reminder)

        self.pix = QPixmap()
        self.bubble = Bubble()

        # 运动状态
        self.grounded = True
        self.dragging = False
        self.vy = 0.0
        self.y_float = 0.0
        self.anim = motion.Animator()
        self.next_idle = time.time() + random.uniform(5, 10)
        self.walk_target: float | None = None
        self.next_walk = time.time() + random.uniform(3, 7)
        self.sleeping = False
        self.pat_time = 0.0

        # 专注
        self.focus_end = 0.0
        self.focus_mins = 0

        self.clock = QElapsedTimer()
        self.clock.start()
        self.last_tick = 0.0
        self.next_talk = time.time() + random.uniform(50, 110)
        self.reminder_check = 0.0

        self.apply_look(self.cfg.outfit)
        self.set_size(self.cfg.size, keep_pos=True)
        self._restore_pos()

        self.tick_timer = QTimer(self)
        self.tick_timer.timeout.connect(self.on_tick)
        self.tick_timer.start(33)

        self.min_timer = QTimer(self)
        self.min_timer.timeout.connect(self.on_minute)
        self.min_timer.start(60000)

    # ---------------------------------------------------------- 外观
    def apply_look(self, index: int) -> None:
        self.cfg.outfit = int(index) % max(1, theme.OUTFIT_COUNT)
        self.pix = QPixmap(theme.outfit_at(self.cfg.outfit)["path"])
        self.update()

    def set_size(self, key: str, keep_pos: bool = False) -> None:
        if key not in theme.SIZES:
            key = "mid"
        self.cfg.size = key
        side = theme.SIZES[key]
        old = self.pos()
        self.setFixedSize(side, side)
        geo = self.screen().availableGeometry()
        self.floor = geo.bottom() - side + 4
        if keep_pos:
            self.move(old)
        else:
            self.move(self.x(), self.floor)
        self.y_float = float(self.y())
        self.update()

    def _restore_pos(self) -> None:
        geo = self.screen().availableGeometry()
        pos = self.cfg.pos
        ok = False
        if isinstance(pos, (list, tuple)) and len(pos) == 2:
            x, y = int(pos[0]), int(pos[1])
            if geo.left() - 200 < x < geo.right() and geo.top() - 200 < y < geo.bottom() + 200:
                self.move(x, y)
                ok = True
        if not ok:
            self.move(geo.right() - self.width() - 40, self.floor)

    def paintEvent(self, e) -> None:
        if self.pix.isNull():
            return
        p = QPainter(self)
        p.setRenderHint(QPainter.Antialiasing)
        p.setRenderHint(QPainter.SmoothPixmapTransform)

        w, h = self.width(), self.height()
        pose = self.anim.pose(
            grounded=self.grounded and not self.dragging,
            sleeping=self.sleeping,
        )

        img_h = h * 0.90
        img_w = img_h * (self.pix.width() / max(1, self.pix.height()))
        if img_w > w:
            img_w = w
            img_h = img_w * (self.pix.height() / max(1, self.pix.width()))

        cx = w / 2 + pose.dx * w
        by = h - h * 0.03 + pose.dy * h

        p.save()
        p.translate(cx, by)
        if pose.rot:
            p.rotate(pose.rot)
        p.scale(pose.sx, pose.sy)
        p.drawPixmap(QRectF(-img_w / 2, -img_h, img_w, img_h), self.pix, QRectF(self.pix.rect()))
        p.restore()

        # 粒子（心心 / 星星 / 音符 / 灰尘…）
        self.anim.draw(p, QRectF(cx - img_w / 2, by - img_h, img_w, img_h))

        if self.sleeping:
            f = QFont("Microsoft YaHei UI", max(9, int(w * 0.055)), QFont.Bold)
            p.setFont(f)
            p.setPen(QColor(120, 96, 86, 200))
            t = time.time()
            for i in range(3):
                a = (t * 0.7 + i * 0.55) % 1.0
                p.drawText(QPointF(w * 0.72 + a * w * 0.16, by - img_h * 0.70 - a * img_h * 0.20), "z")

    # ---------------------------------------------------------- 主循环
    def on_tick(self) -> None:
        now = self.clock.elapsed() / 1000.0
        dt = now - self.last_tick
        self.last_tick = now
        self.anim.update(dt)

        # 掉落 / 弹跳
        if not self.grounded and not self.dragging:
            self.vy += 1.9
            self.y_float += self.vy
            if self.y_float >= self.floor:
                self.y_float = float(self.floor)
                if abs(self.vy) > 6:
                    self.vy = -self.vy * 0.42
                    self.y_float += self.vy
                    self.anim.play("land", force=True)
                else:
                    self.vy = 0.0
                    self.grounded = True
                    self.anim.play("land", force=True)
            self.move(self.x(), int(self.y_float))
        elif not self.dragging:
            self.y_float = float(self.floor)
            self.move(self.x(), int(self.floor))

        # 跟随鼠标
        if self.cfg.follow and not self.dragging:
            cursor_x = QCursor.pos().x()
            dx = cursor_x - (self.x() + self.width() // 2)
            if abs(dx) > 8:
                step = max(-6.0, min(6.0, dx * 0.12))
                self.move(int(self.x() + step), int(self.floor))
                self.grounded = True

        # 自由散步
        elif self.cfg.walk and self.grounded and not self.dragging and not self.sleeping:
            if self.walk_target is None and time.time() > self.next_walk:
                geo = self.screen().availableGeometry()
                self.walk_target = random.uniform(geo.left() + 10, geo.right() - self.width() - 10)
            if self.walk_target is not None:
                dx = self.walk_target - self.x()
                if abs(dx) < 3:
                    self.walk_target = None
                    self.next_walk = time.time() + random.uniform(5, 14)
                else:
                    step = 2.2 if abs(dx) < 60 else 3.0
                    self.move(int(self.x() + math.copysign(step, dx)), int(self.floor))

        # 待机小动作：站着发呆时自己玩
        if (
            self.grounded
            and not self.sleeping
            and not self.dragging
            and not self.anim.busy
            and not self.focus_end
            and self.walk_target is None
            and time.time() > self.next_idle
        ):
            self.play_idle()

        # 自言自语
        if self.cfg.talk and not self.sleeping and time.time() > self.next_talk:
            self.next_talk = time.time() + random.uniform(70, 150)
            if not self.bubble.isVisible():
                self.say(random.choice(theme.CHAT))

        # 提醒检查（每 3 秒一次，引擎内部也做了节流）
        if now - self.reminder_check > 3:
            self.reminder_check = now
            self.engine.tick()

        # 专注结束
        if self.focus_end and time.time() >= self.focus_end:
            self.finish_focus()

        self._place_bubble()
        self.update()

    def _place_bubble(self) -> None:
        if not self.bubble.isVisible():
            return
        bw, bh = self.bubble.width(), self.bubble.height()
        x = self.x() + self.width() // 2 - bw // 2
        y = self.y() - bh + int(self.height() * 0.10)
        geo = self.screen().availableGeometry()
        x = max(geo.left() + 4, min(x, geo.right() - bw - 4))
        y = max(geo.top() + 4, y)
        self.bubble.move(int(x), int(y))

    def on_minute(self) -> None:
        # 陪着你慢慢涨亲密度
        if not self.sleeping:
            self.cfg.intimacy = min(999.0, self.cfg.intimacy + 0.15)
            if int(self.cfg.intimacy) % 5 == 0:
                self.cfg.save()
        self.cfg.last_seen = time.time()

    # ---------------------------------------------------------- 说话
    def say(self, text: str, ms: int = 2600, actions=None) -> None:
        self.bubble.show_text(text, ms, actions)
        self._place_bubble()

    # ---------------------------------------------------------- 互动
    def pat(self) -> None:
        now = time.time()
        if now - self.pat_time < 3:
            self.anim.play("wiggle", force=True)
            self.say("刚刚才摸过啦～")
            return
        self.pat_time = now
        self.cfg.intimacy += 1
        self.cfg.save()
        self.anim.play("pat", force=True)
        self.anim.burst("heart", 3)
        self.say(f"{random.choice(theme.PAT_LINES)}  🌸 亲密度 {self.cfg.intimacy:.0f}")

    def feed(self) -> None:
        self.cfg.intimacy += 3
        self.cfg.save()
        self.anim.play("eat", force=True)
        self.say(f"{random.choice(theme.FEED_LINES)}  · 亲密度 {self.cfg.intimacy:.0f}")

    def hop(self, animate: bool = True) -> None:
        if self.dragging:
            return
        self.grounded = False
        self.vy = -9.5
        self.y_float = float(self.y())
        if animate:
            self.anim.play("hop", force=True)

    # ---------------------------------------------------------- 动作
    def play_idle(self) -> None:
        """站着发呆时随机来个小动作。"""
        name, line = random.choice(motion.IDLE_ACTIONS)
        self.anim.play(name, force=True)
        if line and not self.bubble.isVisible():
            self.say(line, 2600)
        self.next_idle = time.time() + random.uniform(9, 22)

    def play_action(self, name: str) -> None:
        """菜单里手动点一个动作。"""
        if self.sleeping:
            self.sleeping = False
            self.say("唔…醒了醒了", 2000)
        self.anim.play(name, force=True)
        if name in ("cheer", "jump_spin"):
            self.hop(animate=False)
        self.next_idle = time.time() + random.uniform(9, 22)

    # ---------------------------------------------------------- 专注
    def start_focus(self, mins: int) -> None:
        self.focus_mins = mins
        self.focus_end = time.time() + mins * 60
        self.anim.play("nod", force=True)
        self.say(f"开始专注 {mins} 分钟，我陪着你～", 3200)
        self.update_tray_tip()

    def stop_focus(self) -> None:
        self.focus_end = 0
        self.say("专注结束，休息一下眼睛吧")
        self.update_tray_tip()

    def finish_focus(self) -> None:
        self.focus_end = 0
        self.cfg.intimacy += 4
        self.cfg.save()
        theme.play_chime("bright")
        self.anim.play("cheer", force=True)
        self.anim.burst("sparkle", 6)
        self.hop(animate=False)
        self.say("专注完成！你超棒的，+4 亲密度", 4200)
        self.update_tray_tip()

    def focus_left(self) -> str:
        if not self.focus_end:
            return ""
        left = max(0, int(self.focus_end - time.time()))
        return f"{left // 60:02d}:{left % 60:02d}"

    # ---------------------------------------------------------- 提醒
    def on_reminder(self, r: dict) -> None:
        text = reminders.render_text(r, self.store.who)
        if r.get("sound", True):
            theme.play_chime("bright")
        if not self.isVisible():
            self.show()
        self.raise_()
        self.anim.play("alert", force=True)
        self.hop(animate=False)

        actions = [("知道啦", self.bubble.hide)]
        snooze = int(r.get("snooze") or 0)
        if snooze > 0:
            actions.append((f"{snooze} 分钟后再说", lambda rr=r: self.snooze(rr)))

        self.say(text, 0, actions)
        tray = getattr(self, "tray", None)
        if tray is not None and not self.isVisible():
            tray.showMessage("兔兔提醒", text, QSystemTrayIcon.Information, 8000)

    def snooze(self, r: dict) -> None:
        mins = int(r.get("snooze") or 0) or 5
        r["snooze_ts"] = time.time() + mins * 60
        self.store.save()
        self.say(f"好，{mins} 分钟后再叫你～", 2600)

    def remind_now(self) -> None:
        text, ok = QInputDialog.getText(self, "马上提醒", "让兔兔说什么？", text="该睡觉啦～")
        if ok and text.strip():
            theme.play_chime("soft")
            self.hop()
            self.say(text.strip(), 6000)

    def open_reminders(self) -> None:
        dlg = reminders.ReminderDialog(self, self.store, self.engine, on_test=self._test_say)
        dlg.exec()

    def _test_say(self, text: str) -> None:
        theme.play_chime("soft")
        self.say(text, 4000)

    # ---------------------------------------------------------- 菜单
    def _act(self, menu, text, cb, checkable=False, checked=False):
        a = QAction(text, menu)
        if checkable:
            a.setCheckable(True)
            a.setChecked(checked)
        a.triggered.connect(lambda _=False: cb())
        menu.addAction(a)
        return a

    def build_menu(self) -> QMenu:
        m = QMenu(self)
        head = QAction(
            f"{theme.outfit_at(self.cfg.outfit)['name']} · 亲密度 {self.cfg.intimacy:.0f}（{self.cfg.level()}）", m
        )
        head.setEnabled(False)
        m.addAction(head)
        m.addSeparator()

        self._act(m, "👗  换装衣橱…", self.open_wardrobe)
        self._act(m, "🤚  摸摸头", self.pat)
        self._act(m, "🥕  喂根胡萝卜", self.feed)

        self.add_lolping_menu(m)

        am = m.addMenu("🎬  表演动作")
        for key, label in motion.ACTION_LABELS:
            self._act(am, label, lambda k=key: self.play_action(k))

        # 专注
        fm = m.addMenu("⏱  专注计时")
        if self.focus_end:
            self._act(fm, f"结束专注（剩 {self.focus_left()}）", self.stop_focus)
        else:
            for mins in (15, 25, 45):
                self._act(fm, f"{mins} 分钟", lambda v=mins: self.start_focus(v))

        # 提醒
        rm = m.addMenu("⏰  提醒")
        self._act(rm, "马上提醒我…", self.remind_now)
        self._act(rm, "提醒设置…", self.open_reminders)
        rm.addSeparator()
        if self.store.is_muted():
            self._act(rm, "🔔  取消静音", self.toggle_mute)
        else:
            self._act(rm, "🔕  静音 1 小时", self.toggle_mute)
        rm.addSeparator()
        items = list(self.store.items)
        if items:
            head2 = QAction("点一下 = 开 / 关这条提醒", rm)
            head2.setEnabled(False)
            rm.addAction(head2)
            for r in items[:8]:
                txt = f"{r.get('name', '提醒')} · {reminders.schedule_text(r)}"
                self._act(rm, txt, lambda rr=r: self.toggle_reminder(rr),
                          checkable=True, checked=bool(r.get("enabled", True)))
        else:
            a = QAction("（还没有提醒，去设置里加一条）", rm)
            a.setEnabled(False)
            rm.addAction(a)

        m.addSeparator()
        for key, label in (("follow", "🎯  跟着鼠标走"), ("walk", "🚶  自由散步"), ("talk", "💬  偶尔自言自语")):
            self._act(m, label, lambda k=key: self.toggle_flag(k),
                      checkable=True, checked=bool(getattr(self.cfg, key)))

        m.addSeparator()
        self._act(m, "📌  窗口置顶", self.toggle_top, checkable=True, checked=bool(self.cfg.on_top))

        sm = m.addMenu("📐  大小")
        for key, label in theme.SIZE_LABELS.items():
            self._act(sm, label, lambda k=key: self.change_size(k),
                      checkable=True, checked=self.cfg.size == key)

        self._act(m, "⚡  开机自动启动", self.toggle_autostart,
                  checkable=True, checked=theme.autostart_enabled())

        m.addSeparator()
        self._act(m, "☀  叫醒它" if self.sleeping else "😴  去睡觉", self.toggle_sleep)
        self._act(m, "🪂  回到地面", self.go_floor)
        m.addSeparator()
        self._act(m, "❌  退出", self.quit_app)
        return m

    def toggle_reminder(self, r: dict) -> None:
        r["enabled"] = not bool(r.get("enabled", True))
        r["last_ts"] = time.time()
        self.store.save()
        state = "开着" if r["enabled"] else "先关掉"
        self.say(f"「{r.get('name', '提醒')}」{state}了", 2600)

    def add_lolping_menu(self, menu):
        lp = menu.addMenu("📣  lolPing")
        controller = self.lolping
        self._act(lp, "设置管理…", lambda: controller.command('settings'))
        toggle = self._act(lp, "启用信号与表情", lambda: controller.command('toggle'))
        lp.aboutToShow.connect(lambda: toggle.setText(
            "暂停信号与表情" if controller.status.get('enabled') else "启用信号与表情"))
        self._act(lp, "联机房间…", lambda: controller.command('room'))
        self._act(lp, "重启输入监听", controller.retry)

    def toggle_flag(self, key: str) -> None:
        setattr(self.cfg, key, not getattr(self.cfg, key))
        if key == "walk":
            self.walk_target = None
            self.next_walk = time.time() + 4
        self.cfg.save()

    def toggle_top(self) -> None:
        self.cfg.on_top = not self.cfg.on_top
        self.cfg.save()
        flags = self.windowFlags()
        if self.cfg.on_top:
            flags |= Qt.WindowStaysOnTopHint
        else:
            flags &= ~Qt.WindowStaysOnTopHint
        self.setWindowFlags(flags | Qt.FramelessWindowHint | Qt.Tool)
        self.show()

    def toggle_autostart(self) -> None:
        want = not theme.autostart_enabled()
        if not theme.set_autostart(want):
            QMessageBox.information(self, "开机自启", "写入注册表失败，可以手动放到启动文件夹里。")
        self.cfg.autostart = want
        self.cfg.save()

    def toggle_sleep(self) -> None:
        self.sleeping = not self.sleeping
        self.anim.stop()
        if self.sleeping:
            self.walk_target = None
            self.vy = 0
            self.grounded = True
            self.y_float = float(self.floor)
            self.move(self.x(), int(self.floor))
            self.say("晚安……")
        else:
            self.say("醒啦！")
        self.update()

    def go_floor(self) -> None:
        self.move(self.x(), int(self.floor))
        self.grounded = True
        self.vy = 0
        self.y_float = float(self.floor)

    def change_size(self, key: str) -> None:
        self.set_size(key)
        self.cfg.save()

    def open_wardrobe(self) -> None:
        dlg = wardrobe.WardrobeDialog(self, self.cfg.outfit, self._wear_outfit)
        dlg.exec()

    def _wear_outfit(self, index: int) -> None:
        self.apply_look(index)
        self.cfg.save()
        self.say(f"这身「{theme.outfit_at(index)['name']}」好看吗？")

    def toggle_mute(self) -> None:
        if self.store.is_muted():
            self.store.unmute()
            self.say("好，接着提醒你～")
        else:
            self.store.mute(60)
            self.say("我先安静一小时，到点只记下来不打扰你")

    def update_tray_tip(self) -> None:
        if getattr(self, "tray", None):
            tip = f"{theme.APP_NAME} · 亲密度 {self.cfg.intimacy:.0f}"
            left = self.focus_left()
            if left:
                tip += f" · 专注剩 {left}"
            self.tray.setToolTip(tip)

    def quit_app(self) -> None:
        self.cfg.pos = [self.x(), self.y()]
        self.cfg.last_seen = time.time()
        self.cfg.save()
        self.store.save()
        self.bubble.hide()
        QApplication.quit()

    # ---------------------------------------------------------- 鼠标
    def mousePressEvent(self, e) -> None:
        if e.button() == Qt.LeftButton:
            self.dragging = True
            self._press_pos = e.globalPosition().toPoint()
            self._win_pos = self.pos()
            self._moved = False
            self._last_drag_dx = 0
            self.vy = 0
            self.grounded = True
            e.accept()

    def mouseMoveEvent(self, e) -> None:
        if not self.dragging:
            return
        delta = e.globalPosition().toPoint() - self._press_pos
        step = delta.x() - getattr(self, "_last_drag_dx", delta.x())
        self._last_drag_dx = delta.x()
        self.anim.extra_rot = max(-10.0, min(10.0, step * 1.8))
        if abs(delta.x()) > 3 or abs(delta.y()) > 3:
            self._moved = True
        self.move(self._win_pos + delta)
        self._place_bubble()
        e.accept()

    def mouseReleaseEvent(self, e) -> None:
        if e.button() != Qt.LeftButton or not self.dragging:
            return
        self.dragging = False
        geo = self.screen().availableGeometry()
        # 落在屏幕外面的话拉回来
        x = max(geo.left() - self.width() // 2, min(self.x(), geo.right() - self.width() // 2))
        self.move(int(x), self.y())
        if self.y() < geo.top():
            self.move(self.x(), geo.top())
        if self.y() + self.height() > geo.bottom() + self.height() // 2:
            self.move(self.x(), geo.top())
        self.grounded = False
        self.vy = 1.0
        self.y_float = float(self.y())
        if not self._moved:
            self.pat()
        else:
            self.cfg.pos = [self.x(), self.y()]
            self.cfg.save()
        e.accept()

    def mouseDoubleClickEvent(self, e) -> None:
        if not self.dragging:
            self.grounded = False
            self.vy = -13.0
            self.y_float = float(self.y())
            self.anim.play("turn", force=True)
            self.anim.burst("dust", 4)
        self.say("蹦！", 1200)
        e.accept()

    def contextMenuEvent(self, e) -> None:
        self.build_menu().exec(e.globalPos())



# ==================================================================== 托盘 / 主程序
class App:
    def __init__(self, argv):
        self.qapp = QApplication(argv)
        self.qapp.setApplicationName(theme.APP_NAME)
        self.qapp.setQuitOnLastWindowClosed(False)
        self.qapp.setWindowIcon(QIcon(theme.resource("assets/icon256.png")))

        self.cfg = Config()
        self.pet = PetWindow(self.cfg)

        self.lolping = lolping.LolPing(self.pet)
        self.pet.lolping = self.lolping
        self.lolping.error.connect(lambda message: QMessageBox.warning(self.pet, 'lolPing', message))
        self.qapp.aboutToQuit.connect(self.lolping.stop)
        self.lolping.start()

        self.pet.tray = None
        self.build_tray()
        self.pet.show()
        QTimer.singleShot(1200, lambda: self.pet.say(random.choice(theme.GREET_LINES), 3600))
        if getattr(self.pet.store, "fresh", False):
            QTimer.singleShot(
                6000,
                lambda: self.pet.say("右键我 →「⏰ 提醒」，就能让我准时喊你睡觉啦～", 5200),
            )

    def build_tray(self) -> None:
        icon = QIcon(QPixmap(theme.resource("assets/tray.png")))
        self.tray = QSystemTrayIcon(icon)
        self.tray.setToolTip(f"{theme.APP_NAME} · 亲密度 {self.cfg.intimacy:.0f}")
        m = QMenu()
        m.addAction("🐰  显示 / 隐藏", self.toggle_visible)
        m.addAction("👗  换装衣橱…", self.pet.open_wardrobe)
        m.addAction("🤚  摸摸头", self.pet.pat)
        m.addAction("⏰  提醒设置…", self.pet.open_reminders)
        m.addAction("⏱  快速专注 25 分钟", lambda: self.pet.start_focus(25))
        m.addAction("🔕  静音 / 取消静音", self.pet.toggle_mute)
        self.pet.add_lolping_menu(m)
        m.addSeparator()
        m.addAction("❌  退出", self.pet.quit_app)
        self.tray.setContextMenu(m)
        self.tray.activated.connect(self.on_tray)
        self.tray.show()
        self.pet.tray = self.tray

    def on_tray(self, reason) -> None:
        if reason == QSystemTrayIcon.Trigger:
            self.toggle_visible()

    def toggle_visible(self) -> None:
        if self.pet.isVisible():
            self.pet.bubble.hide()
            self.pet.hide()
        else:
            self.pet.show()
            self.pet.raise_()

    def run(self) -> int:
        return self.qapp.exec()


def _log_exc(exc_type, exc, tb):
    import traceback

    try:
        with open(theme.ERROR_LOG, "a", encoding="utf-8") as f:
            f.write("\n===== " + time.strftime("%Y-%m-%d %H:%M:%S") + "\n")
            traceback.print_exception(exc_type, exc, tb, file=f)
    except Exception:
        pass


def main() -> int:
    sys.excepthook = _log_exc
    app = App(sys.argv)
    return app.run()


if __name__ == "__main__":
    sys.exit(main())
