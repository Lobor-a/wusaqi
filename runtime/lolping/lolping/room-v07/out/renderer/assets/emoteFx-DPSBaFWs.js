import { z as DEFAULT_CLICK_EMOTE, B as DEFAULT_EMOTE_WHEEL, D as DEFAULT_CLICK_PING, J as DEFAULT_WHEEL } from "./pings-Ce34JV4E.js";
import { s as strings } from "./i18n-C9rFRN0K.js";
const FEATURES = [
  { id: "teammate" },
  { id: "emotes" },
  { id: "rooms" },
  { id: "roomText", requires: "rooms" },
  { id: "roomVotes", requires: "rooms" },
  { id: "roomPanel", requires: "rooms" }
];
const DEFAULT_FEATURES = { teammate: false, emotes: true, rooms: true, roomText: true, roomVotes: true, roomPanel: true };
function featureVisible(id, platform) {
  return !(id === "teammate" && platform === "linux");
}
function featureGroups(platform) {
  const visible = FEATURES.filter(({ id }) => featureVisible(id, platform));
  return visible.filter((f) => f.requires === void 0).map(({ id }) => ({ id, parts: visible.filter((f) => f.requires === id).map((f) => f.id) }));
}
function featureOn(s, id) {
  const entry = FEATURES.find((f) => f.id === id);
  return s.features[id] && (entry?.requires === void 0 || s.features[entry.requires]);
}
const WHEEL = { size: 600, innerR: 86, outerR: 188, extR: 288, iconR: 137, iconSize: 48 };
function pickSlice(dx, dy, deadZone = WHEEL.innerR) {
  if (Math.hypot(dx, dy) < deadZone) return -1;
  const deg = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 22.5 + 360) % 360;
  return Math.floor(deg / 45) % 8;
}
const MOD = { ctrl: 1, alt: 2, shift: 4, win: 8 };
const HOTKEY_PRIMARY_MODS = MOD.ctrl | MOD.alt | MOD.win;
const UNSAFE_TRIGGER_VKS = [
  13,
  // Enter
  9,
  // Tab
  8,
  // Backspace
  32,
  // Space
  27,
  // Escape
  37,
  38,
  39,
  40
  // arrow keys
];
const NAMED_CODES = {
  Space: 32,
  Enter: 13,
  Tab: 9,
  Backspace: 8,
  Escape: 27,
  Insert: 45,
  Delete: 46,
  Home: 36,
  End: 35,
  PageUp: 33,
  PageDown: 34,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  CapsLock: 20,
  Pause: 19,
  ScrollLock: 145,
  PrintScreen: 44,
  ContextMenu: 93,
  Backquote: 192,
  Minus: 189,
  Equal: 187,
  BracketLeft: 219,
  BracketRight: 221,
  Backslash: 220,
  Semicolon: 186,
  Quote: 222,
  Comma: 188,
  Period: 190,
  Slash: 191,
  NumpadMultiply: 106,
  NumpadAdd: 107,
  NumpadSubtract: 109,
  NumpadDecimal: 110,
  NumpadDivide: 111
};
function codeToVk(code) {
  let m = /^Key([A-Z])$/.exec(code);
  if (m) return m[1].charCodeAt(0);
  m = /^Digit([0-9])$/.exec(code);
  if (m) return 48 + Number(m[1]);
  m = /^Numpad([0-9])$/.exec(code);
  if (m) return 96 + Number(m[1]);
  m = /^F([0-9]{1,2})$/.exec(code);
  if (m) {
    const n = Number(m[1]);
    return n >= 1 && n <= 24 ? 111 + n : null;
  }
  return NAMED_CODES[code] ?? null;
}
const VK_LABELS = {
  32: "Space",
  13: "Enter",
  9: "Tab",
  8: "Backspace",
  27: "Esc",
  45: "Insert",
  46: "Delete",
  36: "Home",
  35: "End",
  33: "Page Up",
  34: "Page Down",
  37: "←",
  38: "↑",
  39: "→",
  40: "↓",
  20: "Caps Lock",
  19: "Pause",
  145: "Scroll Lock",
  44: "Print Screen",
  93: "Menu",
  192: "`",
  189: "-",
  187: "=",
  219: "[",
  221: "]",
  220: "\\",
  186: ";",
  222: "'",
  188: ",",
  190: ".",
  191: "/",
  106: "Num *",
  107: "Num +",
  109: "Num -",
  110: "Num .",
  111: "Num /"
};
const VK_LABELS_MAC = {
  13: "Return",
  8: "Delete",
  46: "Forward Delete",
  45: "Help",
  27: "Esc"
};
function vkLabel(vk, platform = "win") {
  if (platform === "mac" && VK_LABELS_MAC[vk]) return VK_LABELS_MAC[vk];
  if (vk >= 65 && vk <= 90 || vk >= 48 && vk <= 57) return String.fromCharCode(vk);
  if (vk >= 96 && vk <= 105) return `Num ${vk - 96}`;
  if (vk >= 112 && vk <= 135) return `F${vk - 111}`;
  return VK_LABELS[vk] ?? `Key 0x${vk.toString(16).toUpperCase().padStart(2, "0")}`;
}
function modLabels(mods, platform = "win") {
  const out = [];
  if (platform === "mac") {
    if (mods & MOD.ctrl) out.push("⌃");
    if (mods & MOD.alt) out.push("⌥");
    if (mods & MOD.shift) out.push("⇧");
    if (mods & MOD.win) out.push("⌘");
    return out;
  }
  if (mods & MOD.ctrl) out.push("Ctrl");
  if (mods & MOD.alt) out.push("Alt");
  if (mods & MOD.shift) out.push("Shift");
  if (mods & MOD.win) out.push(platform === "linux" ? "Super" : "Win");
  return out;
}
const hotkeyParts = (h, platform = "win") => [...modLabels(h.mods, platform), vkLabel(h.vk, platform)];
const hotkeyLabel = (h, platform = "win") => hotkeyParts(h, platform).join(platform === "mac" ? "" : " + ");
function eventMods(e) {
  return (e.ctrlKey ? MOD.ctrl : 0) | (e.altKey ? MOD.alt : 0) | (e.shiftKey ? MOD.shift : 0) | (e.metaKey ? MOD.win : 0);
}
const def = (id, kind, extra = {}) => ({ id, kind, deep: false, autoCard: false, ...extra });
const INTENTS = {
  missing: def("missing", "answer"),
  push: def("push", "continue"),
  danger: def("danger", "answer"),
  assist: def("assist", "guide"),
  omw: def("omw", "act"),
  needvision: def("needvision", "answer"),
  allin: def("allin", "answer", { deep: true, autoCard: true }),
  enemyvision: def("enemyvision", "grab"),
  generic: def("generic", "words"),
  visioncleared: def("visioncleared", "act"),
  missingflip: def("missingflip", "answer", { autoCard: true }),
  bait: def("bait", "save")
};
function intentFor(s, id, lang) {
  const o = s.intents[id];
  const text = strings(lang).teammate.intent[id];
  return {
    def: INTENTS[id],
    enabled: o?.enabled ?? true,
    label: o?.label || text.label,
    instruction: o?.instruction || text.instruction,
    /** The user's own instruction; '' when they kept the default. */
    custom: o?.instruction ?? ""
  };
}
const isBuiltin = (p) => p.kind === "builtin";
const FALLBACK_ASK = "win";
const DEFAULT_TEAMMATE = {
  askTrigger: FALLBACK_ASK,
  askClick: true,
  askDoubleTap: false,
  tagName: "AI",
  tagColor: 3,
  tagColorCustom: null,
  intents: {},
  profiles: [],
  defaultProfile: null,
  deepProfile: null,
  rules: [],
  agentsCanPing: false,
  context: { marks: true, systemText: true, files: true, webPdfs: false, clipboardForForms: false },
  emotes: true,
  receiptSound: true,
  history: { on: true, keepDays: 30, maxThreads: 500, paused: false },
  permissions: [],
  firstRunDone: false
};
const MAX_RULES = 50;
const PATH_MAX = 1024;
const MAX_FOLDERS = 20;
const TIMEOUT_DEFAULT_S = 300;
const INTENT_LABEL_MAX = 40;
const INTENT_INSTRUCTION_MAX = 2e3;
const TAG_NAME_MAX = 12;
const canDoubleTap = (k) => k === "alt" || k === "ctrl" || k === "shift" || k === "win";
const keyboardTriggers = (platform) => platform !== "win" ? ["alt", "ctrl", "shift", "win"] : ["alt", "ctrl", "shift", "win", "capslock"];
const DEFAULT_SETTINGS = {
  clickPingId: DEFAULT_CLICK_PING,
  wheelSizePx: WHEEL.size,
  wheel: [...DEFAULT_WHEEL],
  panelKey: 9,
  pingSizePx: 110,
  pingDurationS: 3.2,
  keepLastPing: false,
  volume: 70,
  muted: false,
  tickSound: true,
  displayName: "Player",
  tagColor: 0,
  emoteWheel: [...DEFAULT_EMOTE_WHEEL],
  clickEmoteId: DEFAULT_CLICK_EMOTE,
  emoteSizePx: 150,
  emoteSound: true,
  customEmotes: [],
  features: { ...DEFAULT_FEATURES },
  teammate: { ...DEFAULT_TEAMMATE }
};
const LIMITS = {
  dragThresholdPx: { min: 2, max: 40, step: 1 },
  wheelSizePx: { min: 300, max: 900, step: 10 },
  pingSizePx: { min: 60, max: 220, step: 1 },
  pingDurationS: { min: 1, max: 8, step: 0.1 },
  volume: { min: 0, max: 100, step: 1 },
  incomingPingLimit: { min: 0, max: 20, step: 1 },
  emoteSizePx: { min: 80, max: 300, step: 1 }
};
const CAPS_LOCK_VK = 20;
const triggerVk = (t) => typeof t === "object" ? t.vk : t === "capslock" ? CAPS_LOCK_VK : null;
function sameTrigger(a, b) {
  const x = triggerVk(a);
  const y = triggerVk(b);
  return x !== null && y !== null ? x === y : a === b;
}
function separateAskKey(s) {
  return featureOn(s, "teammate") && s.teammate.askTrigger !== "same" ? s.teammate.askTrigger : null;
}
const asksOnPing = (s) => featureOn(s, "teammate") && s.teammate.askTrigger === "same";
[DEFAULT_SETTINGS.panelKey, 192, 113, 114, 115];
({ name: DEFAULT_SETTINGS.displayName, color: DEFAULT_SETTINGS.tagColor });
const KEY_LABELS = {
  linux: { alt: "Alt", ctrl: "Ctrl", shift: "Shift", win: "Super", capslock: "Caps Lock" },
  win: { alt: "Alt", ctrl: "Ctrl", shift: "Shift", win: "Win", capslock: "Caps Lock" },
  mac: { alt: "⌥ Option", ctrl: "⌃ Control", shift: "⇧ Shift", win: "⌘ Command", capslock: "⇪ Caps Lock" }
};
function triggerLabel(t, lang = "en", platform = "win") {
  if (typeof t === "object") return vkLabel(t.vk, platform);
  if (t === "mouse4" || t === "mouse5") return strings(lang)[t];
  return KEY_LABELS[platform][t];
}
const soundLevel = (s) => s.muted ? 0 : s.volume / 100;
const overlaySettings = (s, lang = "en") => ({
  pingSizePx: s.pingSizePx,
  pingDurationS: s.pingDurationS,
  keepLastPing: s.keepLastPing,
  volume: s.volume,
  muted: s.muted,
  tickSound: s.tickSound,
  wheelSizePx: s.wheelSizePx,
  wheel: [...s.wheel],
  clickPingId: s.clickPingId,
  emoteWheel: [...s.emoteWheel],
  clickEmoteId: s.clickEmoteId,
  emoteSizePx: s.emoteSizePx,
  emoteSound: s.emoteSound,
  customEmotes: s.customEmotes.map((c) => ({ ...c })),
  ask: askWheel(s, lang)
});
function askWheel(s, lang) {
  const t = s.teammate;
  const labels = {};
  const disabled = [];
  for (const id of s.wheel) {
    const intent = intentFor(t, id, lang);
    labels[id] = intent.label;
    if (!intent.enabled) disabled.push(id);
  }
  return {
    tag: { name: t.tagName, color: t.tagColor, rgb: t.tagColorCustom },
    labels,
    disabled,
    onPing: asksOnPing(s),
    click: t.askClick
  };
}
const div = (cls) => {
  const d = document.createElement("div");
  d.className = cls;
  return d;
};
function image(cls = "") {
  const el = document.createElement("img");
  if (cls) el.className = cls;
  el.alt = "";
  el.draggable = false;
  return el;
}
function bubble() {
  const b = div("bubble");
  b.textContent = "?";
  return b;
}
function envelope(child, variant) {
  const fx = div(`fx v${variant}`);
  fx.append(child);
  return fx;
}
function emoteFxContent(variant, url) {
  const img = image();
  img.addEventListener("error", () => img.replaceWith(bubble()), { once: true });
  img.src = url;
  return envelope(img, variant);
}
export {
  DEFAULT_SETTINGS as D,
  HOTKEY_PRIMARY_MODS as H,
  INTENT_LABEL_MAX as I,
  LIMITS as L,
  MAX_RULES as M,
  PATH_MAX as P,
  TIMEOUT_DEFAULT_S as T,
  UNSAFE_TRIGGER_VKS as U,
  WHEEL as W,
  envelope as a,
  bubble as b,
  codeToVk as c,
  eventMods as d,
  emoteFxContent as e,
  triggerLabel as f,
  sameTrigger as g,
  separateAskKey as h,
  canDoubleTap as i,
  MAX_FOLDERS as j,
  keyboardTriggers as k,
  TAG_NAME_MAX as l,
  INTENT_INSTRUCTION_MAX as m,
  isBuiltin as n,
  overlaySettings as o,
  pickSlice as p,
  featureGroups as q,
  featureOn as r,
  soundLevel as s,
  triggerVk as t,
  hotkeyParts as u,
  vkLabel as v,
  hotkeyLabel as w
};
