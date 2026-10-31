"use strict";
const electron = require("electron");
const api = {
  // Inlined rather than imported: a sandboxed preload can't require a shared chunk.
  platform: process.platform === "darwin" ? "mac" : process.platform === "linux" ? "linux" : "win",
  // Inlined channel names: a sandboxed preload can require electron, but not a generated sibling chunk.
  on: (cb) => {
    const listener = (_event, state) => cb(state);
    electron.ipcRenderer.on("mate:state", listener);
    return () => electron.ipcRenderer.removeListener("mate:state", listener);
  },
  onLeave: (cb) => {
    const listener = (_event, how) => cb(how);
    electron.ipcRenderer.on("mate:leave", listener);
    return () => electron.ipcRenderer.removeListener("mate:leave", listener);
  },
  act: (action) => electron.ipcRenderer.send("mate:action", action),
  size: (size) => electron.ipcRenderer.send("mate:size", size),
  drag: (d) => electron.ipcRenderer.send("mate:drag", d)
};
electron.contextBridge.exposeInMainWorld("mateApi", api);
