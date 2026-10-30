"use strict";
const electron = require("electron");
const SETTINGS_CH = {
  get: "settings:get",
  set: "settings:set",
  changed: "settings:changed",
  status: "status:get",
  statusChanged: "status:changed",
  setEnabled: "app:setEnabled",
  preview: "app:preview",
  previewEmote: "app:previewEmote",
  emoteImport: "emote:import",
  emoteRemove: "emote:remove",
  about: "app:about",
  openFolder: "app:openSettingsFolder",
  openProject: "app:openProjectPage",
  retryHelper: "app:retryHelper",
  capture: "app:capture",
  openAccessibility: "app:openAccessibility",
  roomGet: "room:get",
  roomChanged: "room:state",
  roomCreate: "room:create",
  roomJoin: "room:join",
  roomLeave: "room:leave",
  roomMute: "room:mute",
  roomClipboard: "room:clipboardCode",
  roomCopy: "room:copyCode",
  roomRetryInternet: "room:retryInternet",
  updateGet: "update:get",
  updateState: "update:state",
  updateCheck: "update:check",
  updateStart: "update:start",
  updateOpenRelease: "update:openRelease",
  showSection: "settings:showSection"
};
function subscribe(channel, cb) {
  const handler = (_e, v) => cb(v);
  electron.ipcRenderer.on(channel, handler);
  return () => electron.ipcRenderer.removeListener(channel, handler);
}
const api = {
  // Inlined rather than imported: a sandboxed preload can't require a shared chunk.
  platform: process.platform === "darwin" ? "mac" : "win",
  getSettings: () => electron.ipcRenderer.invoke(SETTINGS_CH.get),
  setSettings: (patch) => electron.ipcRenderer.invoke(SETTINGS_CH.set, patch),
  onSettings: (cb) => subscribe(SETTINGS_CH.changed, cb),
  getStatus: () => electron.ipcRenderer.invoke(SETTINGS_CH.status),
  onStatus: (cb) => subscribe(SETTINGS_CH.statusChanged, cb),
  setEnabled: (on) => electron.ipcRenderer.invoke(SETTINGS_CH.setEnabled, on),
  previewPing: (id) => electron.ipcRenderer.invoke(SETTINGS_CH.preview, id),
  previewEmote: (ref) => electron.ipcRenderer.invoke(SETTINGS_CH.previewEmote, ref),
  importEmote: (file) => electron.ipcRenderer.invoke(SETTINGS_CH.emoteImport, file),
  removeEmote: (id) => electron.ipcRenderer.invoke(SETTINGS_CH.emoteRemove, id),
  getAbout: () => electron.ipcRenderer.invoke(SETTINGS_CH.about),
  openSettingsFolder: () => electron.ipcRenderer.invoke(SETTINGS_CH.openFolder),
  openProjectPage: () => electron.ipcRenderer.invoke(SETTINGS_CH.openProject),
  retryHelper: () => electron.ipcRenderer.invoke(SETTINGS_CH.retryHelper),
  setCapturing: (on) => electron.ipcRenderer.invoke(SETTINGS_CH.capture, on),
  openAccessibility: () => electron.ipcRenderer.invoke(SETTINGS_CH.openAccessibility),
  getRoom: () => electron.ipcRenderer.invoke(SETTINGS_CH.roomGet),
  onRoom: (cb) => subscribe(SETTINGS_CH.roomChanged, cb),
  createRoom: () => electron.ipcRenderer.invoke(SETTINGS_CH.roomCreate),
  joinRoom: (text) => electron.ipcRenderer.invoke(SETTINGS_CH.roomJoin, text),
  leaveRoom: () => electron.ipcRenderer.invoke(SETTINGS_CH.roomLeave),
  muteMember: (peer, on) => electron.ipcRenderer.invoke(SETTINGS_CH.roomMute, peer, on),
  clipboardRoomCode: () => electron.ipcRenderer.invoke(SETTINGS_CH.roomClipboard),
  copyRoomCode: () => electron.ipcRenderer.invoke(SETTINGS_CH.roomCopy),
  retryInternet: () => electron.ipcRenderer.invoke(SETTINGS_CH.roomRetryInternet),
  onShowSection: (cb) => subscribe(SETTINGS_CH.showSection, cb),
  getUpdate: () => electron.ipcRenderer.invoke(SETTINGS_CH.updateGet),
  onUpdate: (cb) => subscribe(SETTINGS_CH.updateState, cb),
  checkForUpdates: () => electron.ipcRenderer.invoke(SETTINGS_CH.updateCheck),
  startUpdate: () => electron.ipcRenderer.invoke(SETTINGS_CH.updateStart),
  openReleasePage: () => electron.ipcRenderer.invoke(SETTINGS_CH.updateOpenRelease)
};
electron.contextBridge.exposeInMainWorld("settingsApi", api);
