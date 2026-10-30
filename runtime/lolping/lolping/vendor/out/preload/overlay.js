"use strict";
const electron = require("electron");
const OVERLAY_CHANNELS = [
  "overlay:settings",
  "wheel:open",
  "wheel:move",
  "wheel:release",
  "wheel:cancel",
  "ping:spawn",
  "emote:spawn",
  "emote:clear",
  "toast:show"
];
const OVERLAY_ASSETS = "overlay:assets";
const OVERLAY_PINGED = "overlay:pinged";
const OVERLAY_EMOTED = "overlay:emoted";
const api = {
  on(channel, cb) {
    if (!OVERLAY_CHANNELS.includes(channel)) throw new Error(`unknown overlay channel: ${channel}`);
    electron.ipcRenderer.on(channel, (_event, payload) => cb(payload));
  },
  reportMissingAssets(names) {
    electron.ipcRenderer.send(OVERLAY_ASSETS, names);
  },
  /** A wheel ping was placed here (CSS px in this overlay). */
  reportPing(id, x, y) {
    electron.ipcRenderer.send(OVERLAY_PINGED, { id, x, y });
  },
  /** A wheel emote was placed here (CSS px in this overlay). */
  reportEmote(ref, x, y) {
    electron.ipcRenderer.send(OVERLAY_EMOTED, { ref, x, y });
  }
};
electron.contextBridge.exposeInMainWorld("overlay", api);
