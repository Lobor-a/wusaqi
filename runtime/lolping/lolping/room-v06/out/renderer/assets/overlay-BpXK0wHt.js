import { E as EMOTE_DURATION_S, e as emoteIconUrl, a as emoteAnimUrl, t as textureUrl, F as FALLBACK_TEXTURE, L as LOGO_TEXTURE, W as WHEEL_SLOTS, c as catalogEmote, b as customStillUrl, d as customHash, p as pingById, f as pingsFor, D as DEFAULT_CLICK_PING, g as allSoundNames, s as soundUrl, h as EMOTE_CATALOG, i as emoteSoundUrl, T as TICK_SOUND, C as CUSTOM_EMOTE_URL, j as isBundledEmote, k as customAnimUrl, l as allTextureNames, m as allEmoteAssetFiles, n as customSoundUrl } from "./pings-Ce34JV4E.js";
import { i as isTagColor, a as isTagRgb, t as tagColorCss } from "./i18n-Bn0BgxO2.js";
import { e as emoteFxContent, a as envelope, b as bubble, W as WHEEL, p as pickSlice, o as overlaySettings, D as DEFAULT_SETTINGS, s as soundLevel } from "./emoteFx-Dz2VkEKA.js";
const GLOW_SIZE_MAX = 32768;
const GLOW_AT_MAX = 1e5;
const GLOW_DELAY_MAX = 1e4;
const TICKET_MAX = 100;
function parseMateGlow(raw) {
  if (typeof raw !== "object" || raw === null) return null;
  const g = raw;
  const num = (v, min, max) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
  const box = g.box;
  if (typeof box !== "object" || box === null) return null;
  const { x, y, w, h } = box;
  if (!num(x, -GLOW_AT_MAX, GLOW_AT_MAX) || !num(y, -GLOW_AT_MAX, GLOW_AT_MAX)) return null;
  if (!num(w, 0, GLOW_SIZE_MAX) || !num(h, 0, GLOW_SIZE_MAX) || w === 0 || h === 0) return null;
  if (!isTagColor(g.color) || !num(g.delay, 0, GLOW_DELAY_MAX)) return null;
  const rgb = g.rgb ?? null;
  if (rgb !== null && !isTagRgb(rgb)) return null;
  const { ticket } = g;
  if (ticket !== void 0 && (typeof ticket !== "string" || ticket.length > TICKET_MAX)) return null;
  return { box: { x, y, w, h }, color: g.color, rgb, delay: g.delay, ...ticket === void 0 ? {} : { ticket } };
}
const KEPT_DUR_S = 86400;
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
    if (owner === "mate") root.dataset.owner = owner;
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;
    root.style.setProperty("--size", `${opts.sizePx}px`);
    root.style.setProperty("--dur", `${opts.keep ? KEPT_DUR_S : EMOTE_DURATION_S}s`);
    const live = {
      root,
      url: null,
      gone: false,
      timer: setTimeout(() => opts.keep ? live.settle?.() : this.end(owner, live), EMOTE_DURATION_S * 1e3 + 150)
    };
    this.live.set(owner, live);
    if (art.kind === "bundled") this.showBundled(live, art.slug, opts.keep === true);
    else if (art.kind === "custom") {
      if (art.animated) this.showCustomAnimation(live, art);
      else root.append(emoteFxContent(art.fx, art.url));
    } else root.append(envelope(bubble(), 0));
    if (opts.tag) {
      const tag = div$1("tag");
      tag.textContent = opts.tag.name;
      tag.style.setProperty("--tag", tagColorCss(opts.tag.color, opts.tag.rgb));
      root.append(tag);
    }
    this.layer.append(root);
  }
  /** Removes the owner's emote at once, if it has one. */
  clear(owner) {
    const live = this.live.get(owner);
    if (live) this.end(owner, live);
  }
  /** Each spawn gets a fresh clock, with no unbounded renderer cache of multi-megabyte originals. */
  showCustomAnimation(live, art) {
    const fallback = art.stillUrl ?? art.url.replace(/\.anim$/, ".webp");
    const content = emoteFxContent(art.fx, fallback);
    live.root.append(content);
    this.fetchBlob(art.url).then((blob) => {
      if (live.gone) return;
      live.url = URL.createObjectURL(blob);
      const animation = emoteFxContent(art.fx, live.url);
      const img2 = animation.querySelector("img");
      img2?.addEventListener("error", () => {
        if (!live.gone) animation.replaceWith(emoteFxContent(art.fx, fallback));
      }, { once: true });
      content.replaceWith(animation);
    }, () => {
    });
  }
  /**
   * The baked animation plays once from frame 0, but Chromium gives images with the same URL one shared clock, so each
   * spawn gets its own object URL (the Blob is fetched once per emote).
   */
  showBundled(live, slug, keep) {
    const img2 = image("sheet");
    live.root.append(img2);
    let swapped = false;
    const placeholder = () => {
      if (swapped || live.gone) return;
      swapped = true;
      img2.replaceWith(envelope(bubble(), 0));
    };
    img2.addEventListener("error", placeholder, { once: true });
    if (keep) {
      live.settle = () => {
        if (swapped || live.gone) return;
        swapped = true;
        img2.className = "still";
        img2.src = emoteIconUrl(slug);
      };
    }
    this.blob(slug).then(
      (blob) => {
        if (live.gone || swapped) return;
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
async function fetchImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.blob();
}
const GLOW_MS = 900;
function spawnGlow(layer, g) {
  const el2 = document.createElement("div");
  el2.className = "mate-glow";
  el2.dataset.owner = "mate";
  el2.style.left = `${g.box.x}px`;
  el2.style.top = `${g.box.y}px`;
  el2.style.width = `${g.box.w}px`;
  el2.style.height = `${g.box.h}px`;
  el2.style.setProperty("--glow", tagColorCss(g.color, g.rgb));
  layer.append(el2);
  setTimeout(() => el2.remove(), GLOW_MS);
}
class GlowStage {
  constructor(layer) {
    this.layer = layer;
  }
  layer;
  pending = /* @__PURE__ */ new Set();
  spawn(g) {
    const timer = setTimeout(() => {
      this.pending.delete(timer);
      spawnGlow(this.layer, g);
    }, g.delay);
    this.pending.add(timer);
  }
  /** A pause, mate:clear or a new ask: no field of the old answer lights up after it. */
  clear() {
    for (const timer of this.pending) clearTimeout(timer);
    this.pending.clear();
  }
}
const IDLE_MS = 250;
class IdleWatch {
  constructor(isEmpty, report) {
    this.isEmpty = isEmpty;
    this.report = report;
  }
  isEmpty;
  report;
  idle = false;
  timer = null;
  /** Call whenever something may have appeared on the overlay or left it. */
  check() {
    if (!this.isEmpty()) {
      if (this.timer !== null) clearTimeout(this.timer);
      this.timer = null;
      if (this.idle) {
        this.idle = false;
        this.report(false);
      }
      return;
    }
    if (this.idle || this.timer !== null) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      if (!this.isEmpty()) return;
      this.idle = true;
      this.report(true);
    }, IDLE_MS);
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
  const root = div(["ping", opts.keep ? "kept" : "", opts.tagOnly ? "tag-only" : ""].filter(Boolean).join(" "));
  root.style.left = `${x}px`;
  root.style.top = `${y}px`;
  root.style.setProperty("--c", def.color);
  root.style.setProperty("--size", `${opts.sizePx}px`);
  root.style.setProperty("--dur", `${opts.durationS}s`);
  if (opts.owner) root.dataset.owner = opts.owner;
  if (!opts.tagOnly) {
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
  }
  if (opts.label) {
    const label = div("label");
    label.textContent = opts.label;
    root.append(label);
  }
  if (opts.tag) {
    const tag = div(opts.thinking ? "tag dots" : "tag");
    tag.textContent = opts.tag.name;
    tag.style.setProperty("--tag", tagColorCss(opts.tag.color, opts.tag.rgb));
    root.append(tag);
  }
  while (layer.childElementCount >= MAX_PINGS) layer.firstElementChild?.remove();
  layer.append(root);
  if (!opts.keep) setTimeout(() => root.remove(), opts.durationS * 1e3 + 150);
  return root;
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
  /** Plays the sound at `url`, loading it under that key the first time. A file that won't load plays nothing. */
  async playUrl(url, volume01) {
    if (!this.buffers.has(url)) await this.load([{ key: url, url }]);
    this.play(url, volume01);
  }
  /** Drops the loaded sounds whose key starts with `prefix`, so the next play loads them again. */
  forget(prefix) {
    for (const key of this.buffers.keys()) if (key.startsWith(prefix)) this.buffers.delete(key);
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
  icon.src = textureUrl(LOGO_TEXTURE);
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
const BASE_MS = 4e3;
const PER_POINT_MS = 60;
const MAX_MS = 1e4;
const LANE_GAP_PX = 24;
function textDurationMs(text) {
  return Math.min(MAX_MS, BASE_MS + PER_POINT_MS * [...text].length);
}
function keepOnScreen(anchor, size, screen, margin) {
  const half = size.width / 2;
  return {
    x: Math.max(half + margin, Math.min(anchor.x, screen.width - half - margin)),
    y: Math.max(size.height + margin, Math.min(anchor.y, screen.height - margin))
  };
}
class OwnerLimit {
  constructor(max) {
    this.max = max;
  }
  max;
  ids = /* @__PURE__ */ new Map();
  /** Returns the ids of this owner's lines that have to go now. */
  add(owner, id) {
    const list = this.ids.get(owner) ?? [];
    list.push(id);
    this.ids.set(owner, list);
    return list.splice(0, Math.max(0, list.length - this.max));
  }
  remove(owner, id) {
    const list = this.ids.get(owner)?.filter((x) => x !== id);
    if (list === void 0) return;
    if (list.length === 0) this.ids.delete(owner);
    else this.ids.set(owner, list);
  }
}
class DanmakuLanes {
  constructor(lanes, now) {
    this.now = now;
    this.freeAt = Array.from({ length: lanes }, () => 0);
  }
  now;
  freeAt;
  /** The lowest free lane for a line `widthPx` wide, or null when every lane is busy. Lines start at the screen's right edge. */
  take(widthPx, speedPxS) {
    const t = this.now();
    const lane = this.freeAt.findIndex((at) => at <= t);
    if (lane < 0) return null;
    this.freeAt[lane] = t + (widthPx + LANE_GAP_PX) / speedPxS * 1e3;
    return lane;
  }
  /** Milliseconds until some lane is free: 0 when one is now. */
  nextFreeMs() {
    return Math.max(0, Math.min(...this.freeAt) - this.now());
  }
}
const MAX_LINES_PER_OWNER = 3;
const DANMAKU_SPEED_PX_S = 160;
const DANMAKU_LINE_PX = 34;
const SPOT_MARGIN_PX = 8;
const el$1 = (className, text) => {
  const e = document.createElement("div");
  e.className = className;
  if (text !== void 0) e.textContent = text;
  return e;
};
class TextStage {
  constructor(layer, now = Date.now) {
    this.layer = layer;
    this.now = now;
  }
  layer;
  now;
  limit = new OwnerLimit(MAX_LINES_PER_OWNER);
  shown = /* @__PURE__ */ new Map();
  /** 弹幕 lines that have no lane yet, oldest first, with the width they were measured at. */
  waiting = [];
  lanes = null;
  laneCount = 0;
  pumpTimer = null;
  nextId = 1;
  spawn(line) {
    const id = this.nextId++;
    for (const old of this.limit.add(line.owner, id)) this.drop(old);
    if (line.style === "danmaku") this.spawnDanmaku(id, line);
    else this.spawnSpot(id, line);
  }
  spawnSpot(id, line) {
    const ms = textDurationMs(line.text);
    const root = el$1("text-pop");
    root.style.setProperty("--dur", `${ms}ms`);
    if (line.tag) root.append(this.nameOf("text-name", line.tag));
    root.append(el$1("text-body", line.text));
    this.layer.append(root);
    let at = { x: line.x, y: line.y };
    for (let pass = 0; pass < 2; pass++) {
      root.style.left = `${at.x}px`;
      root.style.top = `${at.y}px`;
      at = keepOnScreen(
        line,
        { width: root.offsetWidth, height: root.offsetHeight },
        { width: window.innerWidth, height: window.innerHeight },
        SPOT_MARGIN_PX
      );
    }
    root.style.left = `${at.x}px`;
    root.style.top = `${at.y}px`;
    this.shown.set(id, { owner: line.owner, root, timer: setTimeout(() => this.drop(id), ms) });
  }
  spawnDanmaku(id, line) {
    const root = el$1("danmaku wait");
    if (line.tag) root.append(this.nameOf("danmaku-name", line.tag));
    root.append(el$1("danmaku-text", line.text));
    root.style.left = `${window.innerWidth}px`;
    this.layer.append(root);
    this.shown.set(id, { owner: line.owner, root, timer: null });
    this.waiting.push({ id, widthPx: root.offsetWidth });
    this.pump();
  }
  nameOf(className, tag) {
    const name = el$1(className, tag.name);
    name.style.setProperty("--tag", tagColorCss(tag.color, tag.rgb));
    return name;
  }
  /** Starts waiting lines while there is a free lane, and comes back when the next one frees. */
  pump() {
    if (this.pumpTimer !== null) {
      clearTimeout(this.pumpTimer);
      this.pumpTimer = null;
    }
    const lanes = this.lanesFor(window.innerHeight);
    for (let next = this.waiting[0]; next !== void 0; next = this.waiting[0]) {
      const lane = lanes.take(next.widthPx, DANMAKU_SPEED_PX_S);
      if (lane === null) {
        this.pumpTimer = setTimeout(() => this.pump(), lanes.nextFreeMs() + 1);
        return;
      }
      this.waiting.shift();
      this.startDanmaku(next.id, next.widthPx, lane);
    }
  }
  startDanmaku(id, widthPx, lane) {
    const line = this.shown.get(id);
    if (!line) return;
    const travelPx = window.innerWidth + widthPx;
    const ms = travelPx / DANMAKU_SPEED_PX_S * 1e3;
    line.root.style.top = `${lane * DANMAKU_LINE_PX}px`;
    line.root.style.setProperty("--travel", `-${travelPx}px`);
    line.root.style.setProperty("--dur", `${ms}ms`);
    line.root.classList.remove("wait");
    line.timer = setTimeout(() => this.drop(id), ms);
  }
  /** Takes a line down, whether it is on screen or still waiting for a lane. */
  drop(id) {
    const line = this.shown.get(id);
    if (!line) return;
    if (line.timer !== null) clearTimeout(line.timer);
    line.root.remove();
    this.shown.delete(id);
    this.limit.remove(line.owner, id);
    const waiting = this.waiting.findIndex((w) => w.id === id);
    if (waiting >= 0) this.waiting.splice(waiting, 1);
  }
  /** The 弹幕 rows: the top quarter of the display, one row per line height. Rebuilt if the display's size changed. */
  lanesFor(heightPx) {
    const count = Math.max(1, Math.floor(heightPx / 4 / DANMAKU_LINE_PX));
    if (this.lanes === null || count !== this.laneCount) {
      this.lanes = new DanmakuLanes(count, this.now);
      this.laneCount = count;
    }
    return this.lanes;
  }
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
const CENTER_LABEL_MAX = 14;
const fitLabel = (text) => {
  const chars = [...text];
  return chars.length > CENTER_LABEL_MAX ? `${chars.slice(0, CENTER_LABEL_MAX - 1).join("")}…` : text;
};
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
  hub = null;
  centerTxt = null;
  /** Replaces the constructor's centre text while set. */
  idleLabel = null;
  dimmed = /* @__PURE__ */ new Set();
  items = [];
  hot = -1;
  ox = 0;
  oy = 0;
  opened = false;
  scale = 1;
  /** Changes what each slice holds, top (N) then clockwise. */
  setItems(items) {
    this.items = items;
    this.icons.forEach((icon, i) => {
      const item = items[i];
      if (item) icon.setAttribute("href", item.icon);
      else icon.removeAttribute("href");
    });
    this.setDimmed([...this.dimmed]);
    this.showCenterText();
  }
  /** The centre's text while no labelled slice is hovered; null puts the wheel's own back. */
  setCenterLabel(text) {
    this.idleLabel = text;
    this.showCenterText();
  }
  /** Greys out the slices holding these keys (an ask wheel's switched-off intents). */
  setDimmed(keys) {
    this.dimmed = new Set(keys);
    this.icons.forEach((icon, i) => {
      const item = this.items[i];
      if (item && this.dimmed.has(item.key)) icon.classList.add("dim");
      else icon.classList.remove("dim");
    });
  }
  /** Changes the icon in the middle of the wheel. */
  setCenterIcon(url) {
    this.hub?.setAttribute("href", url);
  }
  /** Scales the SVG and its dead zone together, keeping the press point at the centre. */
  setSize(sizePx) {
    this.scale = sizePx / WHEEL.size;
    this.svg.style.width = `${sizePx}px`;
    this.svg.style.height = `${sizePx}px`;
    this.svg.style.marginLeft = `${-sizePx / 2}px`;
    this.svg.style.marginTop = `${-sizePx / 2}px`;
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
    if (this.opened) this.setHot(pickSlice(x - this.ox, y - this.oy, WHEEL.innerR * this.scale));
  }
  /** Closes the wheel. Returns the chosen item's key at the wheel centre, or null when released in the dead zone. */
  release(x, y) {
    if (!this.opened) return null;
    const slice = pickSlice(x - this.ox, y - this.oy, WHEEL.innerR * this.scale);
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
    this.showCenterText();
  }
  showCenterText() {
    if (!this.centerTxt) return;
    const label = this.hot >= 0 ? this.items[this.hot]?.label : void 0;
    this.centerTxt.textContent = label ? fitLabel(label) : this.idleLabel ?? this.centerLabel;
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
    el("circle", { r: innerR, fill: `url(#${id}-core)`, stroke: "#c8aa6e", "stroke-width": 3, class: "core" }, svg);
    el("circle", { r: innerR - 7, fill: "none", stroke: "#8a7448", "stroke-width": 1, opacity: 0.6 }, svg);
    this.hub = el("image", { href: this.centerIcon, x: -20, y: -58, width: 40, height: 40, class: "hub" }, svg);
    this.centerTxt = el("text", { x: 0, y: 6, "text-anchor": "middle", class: "centerTxt" }, svg);
    this.centerTxt.textContent = this.centerLabel;
    el("text", { x: 6, y: 50, "text-anchor": "middle", class: "backTxt" }, svg).textContent = "BACK";
    const mouse = el("g", { opacity: 0.55, transform: "translate(-26,40)" }, svg);
    el("rect", { x: 0, y: 0, width: 11, height: 16, rx: 5.5, fill: "none", stroke: "#6c7a7c", "stroke-width": 1.3 }, mouse);
    el("path", { d: "M5.5,0 V7 H11 V5.5 A5.5,5.5 0 0 0 5.5,0Z", fill: "#6c7a7c" }, mouse);
  }
}
const UNKNOWN_ICON = textureUrl(FALLBACK_TEXTURE);
const pingItem = (p) => ({ key: p.id, icon: textureUrl(p.icon) });
function emoteItem(ref, customEmotes) {
  if (catalogEmote(ref)) return { key: ref, icon: emoteIconUrl(ref) };
  if (customEmotes.some((c) => c.id === ref)) return { key: ref, icon: customStillUrl(customHash(ref)) };
  return { key: ref, icon: UNKNOWN_ICON };
}
const pingIcon = (id) => {
  const def = pingById(id);
  return def ? textureUrl(def.icon) : UNKNOWN_ICON;
};
function centerIcons(s) {
  return { ping: pingIcon(s.clickPingId), emote: emoteItem(s.clickEmoteId, s.customEmotes).icon };
}
const pingLayer = document.getElementById("pings");
const toastLayer = document.getElementById("toasts");
const textLayer = document.getElementById("texts");
const pingSvg = document.getElementById("wheel");
const emoteSvg = pingSvg.cloneNode(false);
emoteSvg.id = "emoteWheel";
pingSvg.after(emoteSvg);
const emoteLayer = document.createElement("div");
emoteLayer.id = "emotes";
pingLayer.after(emoteLayer);
const sounds = new SoundBank();
const stage = new EmoteStage(emoteLayer);
const texts = new TextStage(textLayer);
const glows = new GlowStage(pingLayer);
let settings = overlaySettings(DEFAULT_SETTINGS);
const [fallbackPing] = pingsFor([DEFAULT_CLICK_PING]);
const volume = () => soundLevel(settings);
const tick = () => {
  if (settings.tickSound) sounds.play(TICK_SOUND, volume() * 0.5);
};
const centers = centerIcons(settings);
const pingWheel = new Wheel(pingSvg, "PING", centers.ping, tick);
const emoteWheel = new Wheel(emoteSvg, "EMOTE", centers.emote, tick);
function localArt(ref) {
  if (isBundledEmote(ref)) return { kind: "bundled", slug: ref };
  const custom = settings.customEmotes.find((c) => c.id === ref);
  if (!custom) return { kind: "placeholder" };
  const hash = customHash(ref);
  const sound = custom.sound ? { sound: customSoundUrl(hash) } : {};
  return { kind: "custom", url: custom.animated ? customAnimUrl(hash) : customStillUrl(hash), animated: custom.animated, ...sound, fx: custom.fx ?? 0 };
}
let keptPing = null;
function dropKeptPing() {
  keptPing?.remove();
  keptPing = null;
}
function applySettings(s) {
  settings = s;
  sounds.forget(CUSTOM_EMOTE_URL);
  if (!s.keepLastPing) dropKeptPing();
  pingWheel.setSize(s.wheelSizePx);
  emoteWheel.setSize(s.wheelSizePx);
  pingWheel.setItems(pingsFor(s.wheel).map(pingItem));
  emoteWheel.setItems(s.emoteWheel.map((ref) => emoteItem(ref, s.customEmotes)));
  const { ping: ping2, emote: emote2 } = centerIcons(s);
  pingWheel.setCenterIcon(ping2);
  emoteWheel.setCenterIcon(emote2);
}
applySettings(settings);
function ping(def, x, y, tag, keep = false, mate = {}) {
  const { owner, label, thinking, tagOnly } = mate;
  const ours = keep && owner !== "mate";
  if (ours) dropKeptPing();
  const el2 = spawnPing(pingLayer, def, x, y, {
    sizePx: settings.pingSizePx,
    durationS: settings.pingDurationS,
    tag,
    keep,
    owner,
    label,
    thinking,
    tagOnly
  });
  if (ours) keptPing = el2;
  if (!mate.silent) sounds.play(def.sound, volume());
}
let mateTicket = null;
const staleMate = (p) => p.ticket !== void 0 && mateTicket !== null && p.ticket !== mateTicket;
const mateMarks = () => [...document.querySelectorAll('[data-owner="mate"]')];
function clearMate() {
  glows.clear();
  for (const el2 of mateMarks()) el2.remove();
  stage.clear("mate");
}
const MATE_FADE_MS = 600;
function fadeMate() {
  const marks = mateMarks();
  for (const el2 of marks) el2.classList.add("mate-fade");
  setTimeout(() => {
    for (const el2 of marks) el2.remove();
    if (mateMarks().length === 0) stage.clear("mate");
  }, MATE_FADE_MS);
}
function dressWheel(ask) {
  pingSvg.classList.toggle("ask", ask);
  const { tag, labels, disabled } = settings.ask;
  pingSvg.style.setProperty("--ask", tagColorCss(tag.color, tag.rgb));
  pingWheel.setItems(pingsFor(settings.wheel).map((def) => ask ? { ...pingItem(def), label: labels[def.id] } : pingItem(def)));
  pingWheel.setDimmed(ask ? disabled : []);
  pingWheel.setCenterLabel(ask ? tag.name : null);
}
function emote(owner, art, x, y, tag, keep = false) {
  stage.spawn(owner, art, x, y, { sizePx: settings.emoteSizePx, tag, keep });
  if (!settings.emoteSound) return;
  if (art.kind === "bundled" && catalogEmote(art.slug)?.hasSound) sounds.play(`emote:${art.slug}`, volume());
  if (art.kind === "custom" && art.sound) void sounds.playUrl(art.sound, volume());
}
const wheelOf = (p) => p.wheel === "emote" ? emoteWheel : pingWheel;
window.overlay.on("overlay:settings", applySettings);
window.overlay.on("wheel:open", (p) => {
  if (p.wheel !== "emote") dressWheel(p.wheel === "ask");
  wheelOf(p).open(p.x, p.y);
});
window.overlay.on("wheel:move", (p) => wheelOf(p).move(p.x, p.y));
window.overlay.on("wheel:release", (p) => {
  const chosen = wheelOf(p).release(p.x, p.y);
  if (!chosen) return;
  if (p.wheel === "emote") {
    emote("self", localArt(chosen.key), chosen.x, chosen.y);
    window.overlay.reportEmote(chosen.key, chosen.x, chosen.y);
  } else if (p.wheel === "ask") {
    const def = pingById(chosen.key);
    if (def && !settings.ask.disabled.includes(def.id)) ping(def, chosen.x, chosen.y);
  } else {
    const def = pingById(chosen.key) ?? fallbackPing;
    ping(def, chosen.x, chosen.y, void 0, settings.keepLastPing);
    window.overlay.reportPing(def.id, chosen.x, chosen.y);
  }
});
window.overlay.on("wheel:cancel", () => {
  pingWheel.cancel();
  emoteWheel.cancel();
});
window.overlay.on("ping:spawn", (p) => {
  if (p.owner === "mate" && staleMate(p)) return;
  ping(pingById(p.id) ?? fallbackPing, p.x, p.y, p.tag, p.keep === true, p);
});
window.overlay.on("ping:unkeep", dropKeptPing);
window.overlay.on("emote:spawn", (p) => {
  if (p.owner === "mate" && staleMate(p)) return;
  emote(p.owner, p.art, p.x, p.y, p.tag, p.keep === true);
});
window.overlay.on("emote:clear", (p) => stage.clear(p.owner));
window.overlay.on("toast:show", (t) => showToast(toastLayer, t.title, t.body));
window.overlay.on("text:spawn", (t) => texts.spawn(t));
window.overlay.on("mate:clear", clearMate);
window.overlay.on("mate:fade", fadeMate);
window.overlay.on("mate:ticket", (t) => {
  if (t.id !== mateTicket) glows.clear();
  mateTicket = t.id;
});
window.overlay.on("mate:said", () => {
  for (const el2 of document.querySelectorAll('[data-owner="mate"] .tag.dots')) el2.classList.remove("dots");
});
window.overlay.on("mate:glow", (raw) => {
  const g = parseMateGlow(raw);
  if (g && !staleMate(g)) glows.spawn(g);
});
const layers = [pingLayer, emoteLayer, textLayer, toastLayer];
const idle = new IdleWatch(
  () => !pingWheel.isOpen && !emoteWheel.isOpen && layers.every((l) => l.childElementCount === 0),
  (v) => window.overlay.reportIdle(v)
);
const changes = new MutationObserver(() => idle.check());
for (const l of layers) changes.observe(l, { childList: true });
for (const svg of [pingSvg, emoteSvg]) changes.observe(svg, { attributes: true, attributeFilter: ["class"] });
idle.check();
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
