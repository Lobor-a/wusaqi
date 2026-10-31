'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { createLolPingOverlayGuard } = require('./lolping-overlay-guard.js');

/** One lolPing instance shares the pet's Electron process, tray and lifetime. */
function createLolPingIntegration(electron, options = {}) {
  const dataDir = options.dataDir || path.join(__dirname, '../../data/lolping');
  const legacyDir = options.legacyDir;
  const supported = process.platform === 'win32';
  const overlayGuard = createLolPingOverlayGuard();
  let api = null;
  let failure = null;
  let room = null;
  const getStatus = () => ({
    available: supported && !failure,
    ...(api ? api.getStatus() : { enabled: false, helper: supported ? 'starting' : 'unsupported' }),
    ...(failure ? { error: failure, helper: 'failed' } : {}),
    room,
  });
  const changed = () => queueMicrotask(() => options.onChanged?.(getStatus()));
  let core = null;
  if (supported) {
    try {
      core = require('./lolping/room-v06/out/main/integrated.cjs');
      // main.js registers lolPing and pet bridge privileges together before ready.
    } catch (error) {
      failure = String(error.message || error);
      console.error('[dsh-pet-lolping] 加载失败:', failure);
    }
  }

  function migrateSettings() {
    fs.mkdirSync(dataDir, { recursive: true });
    const dest = path.join(dataDir, 'settings.json');
    if (!legacyDir || fs.existsSync(dest) || !fs.existsSync(path.join(legacyDir, 'settings.json'))) return;
    const settings = fs.readFileSync(path.join(legacyDir, 'settings.json'), 'utf8');
    JSON.parse(settings); // An unreadable old file must not replace clean defaults.
    const emotes = path.join(legacyDir, 'emotes');
    if (fs.existsSync(emotes)) {
      fs.mkdirSync(path.join(dataDir, 'emotes'), { recursive: true });
      for (const entry of fs.readdirSync(emotes, { withFileTypes: true })) {
        if (entry.isFile() && /^[0-9a-f]{32}(?:\.anim)?\.(?:webp|gif)$/.test(entry.name)) {
          fs.copyFileSync(path.join(emotes, entry.name), path.join(dataDir, 'emotes', entry.name));
        }
      }
    }
    fs.writeFileSync(dest, settings, { flag: 'wx' });
  }

  return {
    getStatus,
    start() {
      if (!core || api) return getStatus();
      try {
        try {
          migrateSettings();
        } catch (error) {
          console.warn('[dsh-pet-lolping] 旧设置导入失败，使用独立设置:', String(error.message || error));
        }
        api = core.startIntegrated({
          dataDir,
          helperPath: path.join(__dirname, 'lolping/room-v06/hook-helper.exe'),
          protectOverlay: (win) => overlayGuard.watch(win),
          prepareOverlay: (win, channel) => overlayGuard.prepare(win, channel),
          setLaunchAtStartup: options.setLaunchAtStartup || (() => {}),
          createTray() {
            // Original lolPing status still drives its settings page; one pet tray owns the menu.
            return {
              set: changed,
              setRoom(value) {
                room = value;
                changed();
              },
              setRoomsShown: changed,
              setTeammate: changed,
              setText: changed,
              setUpdate() {},
              destroy() {},
            };
          },
        });
        changed();
      } catch (error) {
        failure = String(error.message || error);
        console.error('[dsh-pet-lolping] 启动失败:', failure);
        changed();
      }
      return getStatus();
    },
    openSettings(section) {
      if (!api) {
        electron.dialog.showErrorBox('lolPing 启动失败', failure || '当前平台不支持已导入的 lolPing 组件。');
        return;
      }
      api.openSettings(section);
    },
    toggle() {
      if (api) api.setEnabled(!api.getStatus().enabled);
      return getStatus();
    },
    retry() {
      api?.retryHelper();
      return getStatus();
    },
    dispose() {
      overlayGuard.dispose();
      return api?.dispose() || Promise.resolve();
    },
  };
}

module.exports = { createLolPingIntegration };
