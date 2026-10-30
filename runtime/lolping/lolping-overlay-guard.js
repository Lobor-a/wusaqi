'use strict';

const { TOPMOST_WATCHDOG_TICK_MS, shouldReassertTopmost } = require('./topmost-watchdog.js');

const VISIBLE_CHANNELS = new Set(['wheel:open', 'ping:spawn', 'emote:spawn', 'toast:show']);

/** Keep lolPing's click-through windows above ordinary windows without taking focus. */
function createLolPingOverlayGuard({ now = Date.now, schedule = setInterval, cancel = clearInterval } = {}) {
  const windows = new Map();
  let timer;
  let disposed = false;

  const raise = (win) => {
    if (disposed || win.isDestroyed()) return;
    // isAlwaysOnTop() can stay true after Windows has moved the window out of
    // the topmost band. Reassert the native z-order, without showing/focusing it.
    win.setAlwaysOnTop(true, 'screen-saver');
    const state = windows.get(win);
    if (state) state.lastAssertMs = now();
  };
  const unwatch = (win) => {
    const state = windows.get(win);
    if (!state) return;
    win.removeListener('show', state.onShow);
    win.removeListener('closed', state.onClosed);
    windows.delete(win);
    if (!windows.size && timer !== undefined) {
      cancel(timer);
      timer = undefined;
    }
  };
  const watch = (win) => {
    if (disposed || win.isDestroyed() || windows.has(win)) return;
    const state = { lastAssertMs: now(), onShow: () => raise(win), onClosed: () => unwatch(win) };
    windows.set(win, state);
    win.on('show', state.onShow);
    win.once('closed', state.onClosed);
    if (win.isVisible()) raise(win);
    if (timer === undefined) {
      timer = schedule(() => {
        for (const [window, entry] of windows) {
          if (window.isDestroyed()) {
            unwatch(window);
            continue;
          }
          if (
            shouldReassertTopmost({
              nowMs: now(),
              lastAssertMs: entry.lastAssertMs,
              destroyed: false,
              visible: window.isVisible(),
              paused: false,
            })
          )
            raise(window);
        }
      }, TOPMOST_WATCHDOG_TICK_MS);
      timer?.unref?.();
    }
  };

  return {
    watch,
    prepare(win, channel) {
      if (disposed || win.isDestroyed() || !VISIBLE_CHANNELS.has(channel)) return;
      watch(win);
      if (!win.isVisible()) win.showInactive();
      raise(win);
    },
    dispose() {
      disposed = true;
      for (const win of windows.keys()) unwatch(win);
    },
  };
}

module.exports = { createLolPingOverlayGuard };
