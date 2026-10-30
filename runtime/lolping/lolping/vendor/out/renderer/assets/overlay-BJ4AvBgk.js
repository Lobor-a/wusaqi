import { E as EMOTE_DURATION_S, T as TAG_COLORS, e as emoteAnimUrl, t as textureUrl, F as FALLBACK_TEXTURE, W as WHEEL_SLOTS, o as overlaySettings, p as pingsFor, D as DEFAULT_CLICK_PING, a as emoteIconUrl, b as pingById, c as allSoundNames, s as soundUrl, d as EMOTE_CATALOG, f as emoteSoundUrl, g as TICK_SOUND, h as catalogEmote, i as isBundledEmote, j as customHash, k as customAnimUrl, l as customStillUrl, m as DEFAULT_CLICK_EMOTE, n as allTextureNames, q as allEmoteAssetFiles, r as DEFAULT_SETTINGS } from "./settings-BFySwfrq.js";
const div$1 = (cls) => {
  const d = document.createElement("div");
  d.className = cls;
  return d;
};
function image(cls = "") {
  const el2 = document.createElement("img");
  if (cls) el2.className = cls;
  el2.alt = "";
  el2.draggable = false;
  return el2;
}
function bubble() {
  const b = div$1("bubble");
  b.textContent = "?";
  return b;
}
function envelope(child) {
  const fx = div$1("fx");
  fx.append(child);
  return fx;
}
async function fetchImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.blob();
}
class EmoteStage {
  constructor(layer, fetchBlob = fetchImage) {
    this.layer = layer;
    this.fetchBlob = fetchBlob;
  }
  layer;
  fetchBlob;
  live = /* @__PURE__ */ new Map();
  blobs = /* @__PURE__ */ new Map();
  /** Shows `art` centred on (x, y), replacing the owner's emote if it has one on screen. */
  spawn(owner, art, x, y, opts) {
    this.clear(owner);
    const root = div$1("emote");
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;
    root.style.setProperty("--size", `${opts.sizePx}px`);
    root.style.setProperty("--dur", `${EMOTE_DURATION_S}s`);
    const live = {
      root,
      url: null,
      gone: false,
      timer: setTimeout(() => this.end(owner, live), EMOTE_DURATION_S * 1e3 + 150)
    };
    this.live.set(owner, live);
    if (art.kind === "bundled") this.showBundled(live, art.slug);
    else if (art.kind === "custom") {
      const img2 = image();
      img2.addEventListener("error", () => img2.replaceWith(bubble()), { once: true });
      img2.src = art.url;
      root.append(envelope(img2));
    } else {
      root.append(envelope(bubble()));
    }
    if (opts.tag) {
      const tag = div$1("tag");
      tag.textContent = opts.tag.name;
      tag.style.setProperty("--tag", TAG_COLORS[opts.tag.color] ?? TAG_COLORS[0]);
      root.append(tag);
    }
    this.layer.append(root);
  }
  /** Removes the owner's emote at once, if it has one. */
  clear(owner) {
    const live = this.live.get(owner);
    if (live) this.end(owner, live);
  }
  /**
   * The baked animation plays once from frame 0, but Chromium gives images with the same URL one shared clock, so each
   * spawn gets its own object URL (the Blob is fetched once per emote).
   */
  showBundled(live, slug) {
    const img2 = image("sheet");
    live.root.append(img2);
    let swapped = false;
    const placeholder = () => {
      if (swapped || live.gone) return;
      swapped = true;
      img2.replaceWith(envelope(bubble()));
    };
    img2.addEventListener("error", placeholder, { once: true });
    this.blob(slug).then(
      (blob) => {
        if (live.gone) return;
        live.url = URL.createObjectURL(blob);
        img2.src = live.url;
      },
      placeholder
    );
  }
  blob(slug) {
    let blob = this.blobs.get(slug);
    if (!blob) {
      blob = this.fetchBlob(emoteAnimUrl(slug));
      this.blobs.set(slug, blob);
      const fetched = blob;
      blob.catch(() => {
        if (this.blobs.get(slug) === fetched) this.blobs.delete(slug);
      });
    }
    return blob;
  }
  end(owner, live) {
    if (live.gone) return;
    live.gone = true;
    clearTimeout(live.timer);
    live.root.remove();
    if (live.url) URL.revokeObjectURL(live.url);
    if (this.live.get(owner) === live) this.live.delete(owner);
  }
}
const MAX_PINGS = 60;
function img(name, cls = "") {
  const el2 = document.createElement("img");
  if (cls) el2.className = cls;
  el2.src = textureUrl(name);
  el2.onerror = () => {
    el2.onerror = null;
    el2.src = textureUrl(FALLBACK_TEXTURE);
  };
  return el2;
}
const div = (cls) => {
  const d = document.createElement("div");
  d.className = cls;
  return d;
};
function spawnPing(layer, def, x, y, opts) {
  const root = div("ping");
  root.style.left = `${x}px`;
  root.style.top = `${y}px`;
  root.style.setProperty("--c", def.color);
  root.style.setProperty("--size", `${opts.sizePx}px`);
  root.style.setProperty("--dur", `${opts.durationS}s`);
  root.append(div("ground"), div("ring"), div("ring r2"), div("ring r3"));
  const art = div("art");
  if (def.art.length === 2) {
    const clash = div("clash");
    clash.append(img(def.art[0], "a1"), img(def.art[1], "a2"));
    art.append(clash, div("flash"));
  } else {
    const pop = div("pop");
    pop.append(img(def.art[0]));
    art.append(pop);
  }
  root.append(art);
  if (opts.tag) {
    const tag = div("tag");
    tag.textContent = opts.tag.name;
    tag.style.setProperty("--tag", TAG_COLORS[opts.tag.color] ?? TAG_COLORS[0]);
    root.append(tag);
  }
  while (layer.childElementCount >= MAX_PINGS) layer.firstElementChild?.remove();
  layer.append(root);
  setTimeout(() => root.remove(), opts.durationS * 1e3 + 150);
}
const MAX_VOICES = 8;
class SoundBank {
  ctx = new AudioContext({ latencyHint: "interactive" });
  buffers = /* @__PURE__ */ new Map();
  voices = 0;
  /** Decodes every sound up front, each under its key. Resolves with the URLs that failed to load. */
  async load(entries) {
    const results = await Promise.all(
      entries.map(async ({ key, url }) => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(String(res.status));
          this.buffers.set(key, await this.ctx.decodeAudioData(await res.arrayBuffer()));
          return null;
        } catch {
          return url;
        }
      })
    );
    return results.filter((r) => r !== null);
  }
  play(key, volume01) {
    const buffer = this.buffers.get(key);
    if (!buffer || volume01 <= 0 || this.voices >= MAX_VOICES) return;
    if (this.ctx.state !== "running") void this.ctx.resume();
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = buffer;
    gain.gain.value = volume01;
    src.connect(gain).connect(this.ctx.destination);
    this.voices++;
    src.onended = () => this.voices--;
    src.start();
  }
}
function showToast(layer, title, body, ms = 1800) {
  layer.querySelectorAll(".toast").forEach((t) => t.remove());
  const toast = document.createElement("div");
  toast.className = "toast";
  const icon = document.createElement("img");
  icon.src = textureUrl("generic_ping");
  const text = document.createElement("div");
  const b = document.createElement("b");
  b.textContent = title;
  const small = document.createElement("small");
  small.textContent = body;
  text.append(b, small);
  toast.append(icon, text);
  layer.append(toast);
  setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 220);
  }, ms);
}
const WHEEL = { innerR: 86, outerR: 188, extR: 288, iconR: 137, iconSize: 48 };
function pickSlice(dx, dy, deadZone = WHEEL.innerR) {
  if (Math.hypot(dx, dy) < deadZone) return -1;
  const deg = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 22.5 + 360) % 360;
  return Math.floor(deg / 45) % 8;
}
const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  parent.append(e);
  return e;
}
const polar = (r, deg) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];
function sector(r0, r1, a0, a1) {
  const [x0, y0] = polar(r0, a0);
  const [x1, y1] = polar(r1, a0);
  const [x2, y2] = polar(r1, a1);
  const [x3, y3] = polar(r0, a1);
  return `M${x0},${y0} L${x1},${y1} A${r1},${r1} 0 0 1 ${x2},${y2} L${x3},${y3} A${r0},${r0} 0 0 0 ${x0},${y0}Z`;
}
class Wheel {
  constructor(svg, centerLabel, centerIcon, onHover) {
    this.svg = svg;
    this.centerLabel = centerLabel;
    this.centerIcon = centerIcon;
    this.onHover = onHover;
    this.build();
  }
  svg;
  centerLabel;
  centerIcon;
  onHover;
  wedges = [];
  icons = [];
  items = [];
  hot = -1;
  ox = 0;
  oy = 0;
  opened = false;
  /** Changes what each slice holds, top (N) then clockwise. */
  setItems(items) {
    this.items = items;
    this.icons.forEach((icon, i) => {
      const item = items[i];
      if (item) icon.setAttribute("href", item.icon);
      else icon.removeAttribute("href");
    });
  }
  get isOpen() {
    return this.opened;
  }
  open(x, y) {
    this.ox = x;
    this.oy = y;
    this.svg.style.left = `${x}px`;
    this.svg.style.top = `${y}px`;
    this.setHot(-1);
    this.opened = true;
    this.svg.classList.add("open");
  }
  move(x, y) {
    if (this.opened) this.setHot(pickSlice(x - this.ox, y - this.oy));
  }
  /** Closes the wheel. Returns the chosen item's key at the wheel centre, or null when released in the dead zone. */
  release(x, y) {
    if (!this.opened) return null;
    const slice = pickSlice(x - this.ox, y - this.oy);
    this.close();
    const item = slice >= 0 ? this.items[slice] : void 0;
    return item ? { key: item.key, x: this.ox, y: this.oy } : null;
  }
  cancel() {
    if (this.opened) this.close();
  }
  close() {
    this.opened = false;
    this.svg.classList.remove("open");
    this.setHot(-1);
  }
  setHot(i) {
    if (i === this.hot) return;
    if (this.hot >= 0) {
      this.wedges[this.hot].setAttribute("fill-opacity", "0");
      this.icons[this.hot].classList.remove("hot");
    }
    this.hot = i;
    if (i >= 0) {
      this.wedges[i].setAttribute("fill-opacity", "0.55");
      this.icons[i].classList.add("hot");
      if (this.opened) this.onHover(i);
    }
  }
  build() {
    const { innerR, outerR, extR, iconR, iconSize } = WHEEL;
    const svg = this.svg;
    const id = `lp-${svg.id}`;
    el("defs", {}, svg).innerHTML = `
      <radialGradient id="${id}-ext" cx="0" cy="0" r="${extR}" gradientUnits="userSpaceOnUse">
        <stop offset="${outerR / extR}" stop-color="#5c6066" stop-opacity=".55"/><stop offset="1" stop-color="#5c6066" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}-ring" cx="0" cy="0" r="${outerR}" gradientUnits="userSpaceOnUse">
        <stop offset="${innerR / outerR}" stop-color="#2a2d31"/><stop offset="1" stop-color="#4a4e54"/></radialGradient>
      <radialGradient id="${id}-hot" cx="0" cy="0" r="${extR}" gradientUnits="userSpaceOnUse">
        <stop offset="${innerR / extR}" stop-color="#8a8f96"/><stop offset="${outerR / extR}" stop-color="#9aa0a8"/>
        <stop offset="1" stop-color="#9aa0a8" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}-core" cx="0" cy="-10" r="${innerR}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#2c5d60"/><stop offset="1" stop-color="#11292c"/></radialGradient>`;
    const slots = [...Array(WHEEL_SLOTS).keys()];
    slots.forEach((i) => {
      const mid = -90 + i * 45;
      if (i % 2 === 0) el("path", { d: sector(outerR, extR, mid - 22.5, mid + 22.5), fill: `url(#${id}-ext)` }, svg);
    });
    el("circle", { r: (innerR + outerR) / 2, fill: "none", stroke: `url(#${id}-ring)`, "stroke-width": outerR - innerR, opacity: 0.92 }, svg);
    slots.forEach((i) => {
      const mid = -90 + i * 45;
      const reach = i % 2 === 0 ? extR : outerR;
      this.wedges.push(el("path", { d: sector(innerR, reach, mid - 22.5, mid + 22.5), fill: `url(#${id}-hot)`, "fill-opacity": 0, class: "wedge" }, svg));
      const [x0, y0] = polar(innerR, mid - 22.5);
      const [x1, y1] = polar(outerR, mid - 22.5);
      el("line", { x1: x0, y1: y0, x2: x1, y2: y1, stroke: "#a08a5c", "stroke-opacity": 0.45, "stroke-width": 1.2 }, svg);
    });
    slots.forEach((i) => {
      const [ix, iy] = polar(iconR, -90 + i * 45);
      this.icons.push(el("image", { x: ix - iconSize / 2, y: iy - iconSize / 2, width: iconSize, height: iconSize, class: "icon" }, svg));
    });
    el("circle", { r: innerR + 4, fill: "none", stroke: "#1a1a1a", "stroke-width": 6, opacity: 0.6 }, svg);
    el("circle", { r: innerR, fill: `url(#${id}-core)`, stroke: "#c8aa6e", "stroke-width": 3 }, svg);
    el("circle", { r: innerR - 7, fill: "none", stroke: "#8a7448", "stroke-width": 1, opacity: 0.6 }, svg);
    el("image", { href: this.centerIcon, x: -20, y: -58, width: 40, height: 40, class: "hub" }, svg);
    el("text", { x: 0, y: 6, "text-anchor": "middle", class: "centerTxt" }, svg).textContent = this.centerLabel;
    el("text", { x: 6, y: 50, "text-anchor": "middle", class: "backTxt" }, svg).textContent = "BACK";
    const mouse = el("g", { opacity: 0.55, transform: "translate(-26,40)" }, svg);
    el("rect", { x: 0, y: 0, width: 11, height: 16, rx: 5.5, fill: "none", stroke: "#6c7a7c", "stroke-width": 1.3 }, mouse);
    el("path", { d: "M5.5,0 V7 H11 V5.5 A5.5,5.5 0 0 0 5.5,0Z", fill: "#6c7a7c" }, mouse);
  }
}
const pingLayer = document.getElementById("pings");
const toastLayer = document.getElementById("toasts");
const pingSvg = document.getElementById("wheel");
const emoteSvg = pingSvg.cloneNode(false);
emoteSvg.id = "emoteWheel";
pingSvg.after(emoteSvg);
const emoteLayer = document.createElement("div");
emoteLayer.id = "emotes";
pingLayer.after(emoteLayer);
const sounds = new SoundBank();
const stage = new EmoteStage(emoteLayer);
let settings = overlaySettings(DEFAULT_SETTINGS);
const [fallbackPing] = pingsFor([DEFAULT_CLICK_PING]);
const volume = () => settings.muted ? 0 : settings.volume / 100;
const tick = () => {
  if (settings.tickSound) sounds.play(TICK_SOUND, volume() * 0.5);
};
const pingWheel = new Wheel(pingSvg, "PING", textureUrl("generic_ping"), tick);
const emoteWheel = new Wheel(emoteSvg, "EMOTE", emoteIconUrl(DEFAULT_CLICK_EMOTE), tick);
const pingItem = (p) => ({ key: p.id, icon: textureUrl(p.icon) });
function emoteItem(ref) {
  if (catalogEmote(ref)) return { key: ref, icon: emoteIconUrl(ref) };
  if (settings.customEmotes.some((c) => c.id === ref)) return { key: ref, icon: customStillUrl(customHash(ref)) };
  return { key: ref, icon: textureUrl("generic_ping") };
}
function localArt(ref) {
  if (isBundledEmote(ref)) return { kind: "bundled", slug: ref };
  const custom = settings.customEmotes.find((c) => c.id === ref);
  if (!custom) return { kind: "placeholder" };
  const hash = customHash(ref);
  return { kind: "custom", url: custom.animated ? customAnimUrl(hash) : customStillUrl(hash), animated: custom.animated };
}
function applySettings(s) {
  settings = s;
  pingWheel.setItems(pingsFor(s.wheel).map(pingItem));
  emoteWheel.setItems(s.emoteWheel.map(emoteItem));
}
applySettings(settings);
function ping(def, x, y, tag) {
  spawnPing(pingLayer, def, x, y, { sizePx: settings.pingSizePx, durationS: settings.pingDurationS, tag });
  sounds.play(def.sound, volume());
}
function emote(owner, art, x, y, tag) {
  stage.spawn(owner, art, x, y, { sizePx: settings.emoteSizePx, tag });
  if (art.kind === "bundled" && catalogEmote(art.slug)?.hasSound && settings.emoteSound) sounds.play(`emote:${art.slug}`, volume());
}
const wheelOf = (p) => p.wheel === "emote" ? emoteWheel : pingWheel;
window.overlay.on("overlay:settings", applySettings);
window.overlay.on("wheel:open", (p) => wheelOf(p).open(p.x, p.y));
window.overlay.on("wheel:move", (p) => wheelOf(p).move(p.x, p.y));
window.overlay.on("wheel:release", (p) => {
  const chosen = wheelOf(p).release(p.x, p.y);
  if (!chosen) return;
  if (p.wheel === "emote") {
    emote("self", localArt(chosen.key), chosen.x, chosen.y);
    window.overlay.reportEmote(chosen.key, chosen.x, chosen.y);
  } else {
    const def = pingById(chosen.key) ?? fallbackPing;
    ping(def, chosen.x, chosen.y);
    window.overlay.reportPing(def.id, chosen.x, chosen.y);
  }
});
window.overlay.on("wheel:cancel", () => {
  pingWheel.cancel();
  emoteWheel.cancel();
});
window.overlay.on("ping:spawn", (p) => ping(pingById(p.id) ?? fallbackPing, p.x, p.y, p.tag));
window.overlay.on("emote:spawn", (p) => emote(p.owner, p.art, p.x, p.y, p.tag));
window.overlay.on("emote:clear", (p) => stage.clear(p.owner));
window.overlay.on("toast:show", (t) => showToast(toastLayer, t.title, t.body));
const probe = (url, label) => new Promise((resolve) => {
  const img2 = new Image();
  img2.onload = () => resolve(null);
  img2.onerror = () => resolve(label);
  img2.src = url;
});
async function probeHead(url, label) {
  try {
    const res = await fetch(url);
    void res.body?.cancel();
    return res.ok ? null : label;
  } catch {
    return label;
  }
}
function checkImages() {
  const pings = allTextureNames().map((name) => probe(textureUrl(name), `textures/${name}.png`));
  const emotes = allEmoteAssetFiles().filter((file) => !file.endsWith(".ogg")).map((file) => probeHead(`../${file}`, file));
  return Promise.all([...pings, ...emotes]).then((r) => r.filter((x) => x !== null));
}
const soundEntries = [
  ...allSoundNames().map((name) => ({ key: name, url: soundUrl(name) })),
  ...EMOTE_CATALOG.filter((e) => e.hasSound).map((e) => ({ key: `emote:${e.slug}`, url: emoteSoundUrl(e.slug) }))
];
const assetName = (url) => url.replace(/^(?:\.{1,2}\/)+/, "");
void Promise.all([sounds.load(soundEntries), checkImages()]).then(([missingSounds, missingImages]) => {
  const missing = [...missingSounds.map(assetName), ...missingImages];
  if (missing.length > 0) window.overlay.reportMissingAssets(missing);
});
