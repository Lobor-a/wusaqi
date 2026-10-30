'use strict';
const electron = require('electron');
const { app, protocol } = electron;
const readline = require('node:readline');
const fs = require('node:fs');
const net = require('node:net');
const { registerDesktopProtocols } = require('./desktop-protocols');
const { createLolPingIntegration } = require('./lolping-integration');
registerDesktopProtocols(protocol, { lolPing: true });
const emit = (value) => process.stdout.write('TUTU_LOLPING ' + JSON.stringify(value) + '\n');
app.setName('兔兔桌宠 lolPing');
fs.mkdirSync(process.env.TUTU_LOLPING_DATA, { recursive: true });
app.setPath('userData', process.env.TUTU_LOLPING_DATA);
let stopping = false;
let server;
let lastHeartbeat = Date.now();
const integration = createLolPingIntegration(electron, {
  dataDir: process.env.TUTU_LOLPING_DATA,
  onChanged: (status) => emit({ type: 'status', status }),
  setLaunchAtStartup: (enabled) => emit({ type: 'autostart', enabled }),
});
async function stop() {
  if (stopping) return;
  stopping = true;
  server?.close();
  try {
    await Promise.race([integration.dispose(), new Promise(resolve => setTimeout(resolve, 4000))]);
  } finally { app.exit(0); }
}
app.on('window-all-closed', () => {});
app.whenReady().then(() => {
  integration.start();
  emit({ type: 'status', status: integration.getStatus() });
  server = net.createServer((socket) => {
  socket.on('error', () => { void stop(); });
  const input = readline.createInterface({ input: socket });
  input.on('line', (line) => {
    try {
      const { action, token } = JSON.parse(line);
      if (token !== process.env.TUTU_LOLPING_TOKEN) { socket.destroy(); return; }
      lastHeartbeat = Date.now();
      if (action === 'heartbeat') return;
      if (action === 'settings') integration.openSettings();
      else if (action === 'room') integration.openSettings('room');
      else if (action === 'toggle') integration.toggle();
      else if (action === 'retry') integration.retry();
      else if (action === 'stop') void stop();
      emit({ type: 'status', status: integration.getStatus() });
    } catch (error) { emit({ type: 'error', message: String(error.message || error) }); }
  });
  input.on('close', () => void stop());
  });
  server.listen(0, '127.0.0.1', () => emit({ type: 'port', port: server.address().port }));
  setInterval(() => { if (Date.now() - lastHeartbeat > 20000) void stop(); }, 3000).unref();
}).catch((error) => { emit({ type: 'error', message: String(error.stack || error) }); void stop(); });
