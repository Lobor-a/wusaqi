"use strict";
const electron = require("electron");
const api = {
  // Inlined: a sandboxed preload can require electron, but not a generated sibling chunk.
  submit: (text) => electron.ipcRenderer.invoke("text:submit", text),
  cancel: () => electron.ipcRenderer.send("text:cancel"),
  strings: () => electron.ipcRenderer.invoke("text:strings")
};
electron.contextBridge.exposeInMainWorld("textApi", api);
