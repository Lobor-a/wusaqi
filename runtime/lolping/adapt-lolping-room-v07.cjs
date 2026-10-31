const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
if (!process.argv[2]) throw new Error('Usage: node runtime/lolping/adapt-lolping-room-v07.cjs <lolPing build directory>');
const buildDir = path.resolve(process.argv[2]);
let code = fs.readFileSync(path.join(buildDir, 'out/main/index.js'), 'utf8');
const digest = crypto.createHash('sha256').update(code).digest('hex');
if (digest !== '0de320ca21b3a7c111ea5acf48b52067cf8a5c887dba585eb53cca10f5055e85') {
  throw new Error('Unrecognized lolPing build; review the adapter before rebuilding.');
}
function once(a, b) {
  if (!code.includes(a) || code.indexOf(a) !== code.lastIndexOf(a)) throw new Error('adapter mismatch: ' + a.slice(0, 100));
  code = code.replace(a, () => b);
}
once('"use strict";', '"use strict";\nlet integrationHost; let integrationApi;');
const first = code.indexOf('registerAppScheme();\nrequire$$1.app.setAppUserModelId');
const last = code.indexOf('function osUserName()', first);
if (first < 0 || last < first) throw new Error('bootstrap not found');
code = code.slice(0, first) + 'module.exports={registerAppScheme,startIntegrated(host){if(!integrationApi){integrationHost=host;integrationApi=start()}return integrationApi;}};\n' + code.slice(last);
once('const helperExePath = () => require$$1.app.isPackaged ? path.join(process.resourcesPath, HELPER_FILE) : path.join(require$$1.app.getAppPath(), "native", "hook-helper", "build", HELPER_FILE);', 'const helperExePath = () => integrationHost.helperPath;');
once('const settingsDir = () => path.join(require$$1.app.getPath("appData"), "lolPing");', 'const settingsDir = () => integrationHost.dataDir;');
once('const assetPath = (...parts) => require$$1.app.isPackaged ? path.join(__dirname, "../renderer", ...parts) : path.join(require$$1.app.getAppPath(), "assets", ...parts);', 'const assetPath = (...parts) => path.join(__dirname, "../renderer", ...parts);');
once('const devUrl = process.env.ELECTRON_RENDERER_URL;', 'const devUrl = undefined;');
once('rendererRoot: process.env.ELECTRON_RENDERER_URL ? null : path.join(__dirname, "../renderer"),', 'rendererRoot: path.join(__dirname, "../renderer"),');
once('const updater = !IS_LINUX && (require$$1.app.isPackaged || testUrl) ? createUpdater() : null;', 'const updater = null;');
once('const tray = new AppTray(', 'const tray = integrationHost.createTray(');
once('    win2.setAlwaysOnTop(true, "screen-saver");\n    if (this.captureExcluded)', '    win2.setAlwaysOnTop(true, "screen-saver");\n    integrationHost.protectOverlay?.(win2);\n    if (this.captureExcluded)');
once('    if (!IS_MAC && !IS_LINUX && RAISING_CHANNELS.has(channel)) w.setAlwaysOnTop(true, "screen-saver");\n    w.webContents.send(channel, payload);', '    if (!IS_MAC && !IS_LINUX && RAISING_CHANNELS.has(channel)) w.setAlwaysOnTop(true, "screen-saver");\n    integrationHost.prepareOverlay?.(w, channel);\n    w.webContents.send(channel, payload);');
once('await require$$1.clipboard.readText().catch(() => "")', 'await Promise.resolve().then(() => require$$1.clipboard.readText()).catch(() => "")');
once('void require$$1.clipboard.writeText(code).catch(() => void 0);', 'void Promise.resolve().then(() => require$$1.clipboard.writeText(code)).catch(() => void 0);');
once('require$$1.powerMonitor.on("resume", () => {\n    lan.rebind();\n    relay.wake();\n  });', 'const onResume = () => { lan.rebind(); relay.wake(); };\n  require$$1.powerMonitor.on("resume", onResume);');
once('    version: require$$1.app.getVersion(),\n    problems:', '    version: "0.6.0 (桌宠集成版)",\n    problems:');
once('    appVersion: require$$1.app.getVersion(),', '    appVersion: "0.6.0",');
once('    enabled: r.enabled === true,\n    stun:', '    enabled: typeof r.enabled === "boolean" ? r.enabled : true,\n    stun:');
// Keep the last successfully joined room until a replacement is joined.
once('    if (this.phase !== "idle") this.leave();\n    const session = ++this.session;', '    if (this.phase !== "idle") this.stop();\n    const session = ++this.session;');
once('  /** Leaves the room and forgets it, so it isn\'t rejoined on the next launch. */', '  /** Leaves the room now while retaining the last joined room for the next launch. */');
once('    this.stop();\n    this.emit("saveCode", null);\n  }\n  /** Says bye on the way out', '    this.stop();\n  }\n  /** Says bye on the way out');
const launch = code.indexOf('    if (require$$1.app.isPackaged && s.launchAtStartup !== previous.launchAtStartup) {');
const launchEnd = code.indexOf('\n  });\n  registerSettingsIpc', launch);
if (launch < 0 || launchEnd < launch) throw new Error('launch handler not found');
code = code.slice(0, launch) + '    if (s.launchAtStartup !== previous.launchAtStartup) integrationHost.setLaunchAtStartup(s.launchAtStartup);' + code.slice(launchEnd);
const startup = code.indexOf('  if (IS_MAC) {\n    if (store.firstRun || !trusted()) openSettingsWindow();', code.indexOf('function start()'));
const endStart = code.indexOf('  updater?.start();', startup);
if (startup < 0 || endStart < startup) throw new Error('startup not found');
code = code.slice(0, startup) + '  // Settings are opened by the pet.\n' + code.slice(endStart);
const quit = code.indexOf('  require$$1.app.on("window-all-closed", () => {', startup);
const quitEnd = code.indexOf('\n}\n', quit);
if (quit < 0 || quitEnd < quit) throw new Error('quit not found');
const replacement = `  let stopping;
  return {
    openSettings: section => openSettingsWindow(section), getStatus: status,
    setEnabled, retryHelper: startHelper, getSettings: () => settings,
    dispose() {
      if (stopping) return stopping;
      quitting = true;
      updater?.stop(); room.quit(); transfer.stop(); animations.stop(); sounds.stop(); media?.stop();
      stopWaitingForAccess(); require$$1.powerMonitor.off("resume", onResume);
      const mateStopped = stopMate(); tray.destroy(); panels.destroy(); overlays.destroy();
      settingsWindow()?.destroy(); closeTextWindow();
      stopping = Promise.allSettled([bridge.stop(), store.flush(), lan.whenClosed(), relay.whenClosed(), mateStopped]).then(() => undefined);
      return stopping;
    }
  };`;
code = code.slice(0, quit) + replacement + code.slice(quitEnd);
fs.writeFileSync(path.join(buildDir, 'out/main/integrated.cjs'), code);
const assets = path.join(buildDir, 'out/renderer/assets');
const settingsFiles = fs.readdirSync(assets).filter(f => /^settings-.*\.js$/.test(f));
if (settingsFiles.length !== 1) throw new Error('settings bundle not found');
const settingsFile = path.join(assets,settingsFiles[0]);
let ui = fs.readFileSync(settingsFile,'utf8');
const before = 'featureGroups(api.platform).map(({ id, parts }) => {';
const after = 'featureGroups(api.platform).filter(({ id }) => id !== "teammate").map(({ id, parts }) => {';
if (ui.includes(before)) ui = ui.replace(before,after);
else if (!ui.includes(after)) throw new Error('feature settings changed');
fs.writeFileSync(settingsFile,ui);
