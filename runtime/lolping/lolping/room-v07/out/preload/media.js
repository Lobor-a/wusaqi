"use strict";
const electron = require("electron");
const MEDIA_CH = { command: "room-media:command", event: "room-media:event" };
const api = {
  on: (cb) => {
    const listener = (_event, command) => cb(command);
    electron.ipcRenderer.on(MEDIA_CH.command, listener);
    return () => electron.ipcRenderer.removeListener(MEDIA_CH.command, listener);
  },
  emit: (event) => electron.ipcRenderer.send(MEDIA_CH.event, event)
};
electron.contextBridge.exposeInMainWorld("roomMedia", api);
