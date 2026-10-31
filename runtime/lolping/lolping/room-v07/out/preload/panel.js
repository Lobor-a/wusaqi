"use strict";
const electron = require("electron");
const api = {
  // Inlined: a sandboxed preload can require electron, but not a generated sibling chunk.
  on: (cb) => {
    const listener = (_event, state) => cb(state);
    electron.ipcRenderer.on("panel:state", listener);
    return () => electron.ipcRenderer.removeListener("panel:state", listener);
  },
  act: (action) => electron.ipcRenderer.send("panel:action", action)
};
electron.contextBridge.exposeInMainWorld("panelApi", api);
