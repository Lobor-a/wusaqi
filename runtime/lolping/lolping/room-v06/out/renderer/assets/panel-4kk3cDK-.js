import { s as strings, t as tagColorCss } from "./i18n-Bn0BgxO2.js";
const VOTE_MS = { ff: 6e4, kick: 6e4, ready: 15e3 };
function voteBoxes(v, members) {
  return v.voters.map((peer) => {
    const ballot = v.ballots[peer];
    return { peer, name: members.find((m) => m.peer === peer)?.name ?? "", answer: ballot === void 0 ? "none" : ballot ? "yes" : "no" };
  });
}
function voteLeft(v, now) {
  return Math.min(1, Math.max(0, (v.endsAt - now) / VOTE_MS[v.kind]));
}
function canAnswer(v, me, over, now) {
  return me !== void 0 && !over && now < v.endsAt && v.voters.includes(me) && !(me in v.ballots);
}
function voteStatus(mine, over, t) {
  if (mine !== void 0) return mine ? t.voteYouYes : t.voteYouNo;
  return over ? t.voteEnded : null;
}
function voteTitle(v, members, t) {
  if (v.kind === "ff") return t.voteTitleFf;
  if (v.kind === "ready") return t.voteTitleReady;
  return t.voteTitleKick(members.find((m) => m.peer === v.target)?.name ?? "?");
}
const MARK = { yes: "✓", no: "✗" };
function el(tag, className, text) {
  const e = document.createElement(tag);
  e.className = className;
  if (text !== void 0) e.textContent = text;
  return e;
}
function marks(className, boxes) {
  const row = el("div", className);
  for (const b of boxes) {
    const mark = el("span", b.answer);
    mark.title = b.name;
    row.append(mark);
  }
  return row;
}
let countdown = null;
let ticking = false;
function tick() {
  if (!countdown) {
    ticking = false;
    return;
  }
  const { vote, over, bar } = countdown;
  bar.style.transform = `scaleX(${voteLeft(vote, Date.now())})`;
  if (over) ticking = false;
  else requestAnimationFrame(tick);
}
function renderVote(root2, state, act) {
  const v = state.vote;
  if (!v) {
    root2.replaceChildren();
    countdown = null;
    return;
  }
  const t = strings(state.lang);
  const members = state.room.members;
  const me = members.find((m) => m.self)?.peer;
  const mine = me === void 0 ? void 0 : v.ballots[me];
  const answerable = canAnswer(v, me, state.voteOver, Date.now());
  const answerButton = (yes, className, label, name) => {
    const b = el("button", className, label);
    b.type = "button";
    b.setAttribute("aria-label", name);
    b.disabled = !answerable;
    b.addEventListener("click", () => act({ t: "ballot", yes }));
    return b;
  };
  const card2 = el("section", "vote surrender");
  const bar = el("div", "bar");
  const track = el("div", "track");
  track.append(bar);
  const foot = el("div", "foot");
  const status = voteStatus(mine, state.voteOver, t);
  if (status === null) foot.append(answerButton(true, "yes", MARK.yes, t.voteYes), answerButton(false, "no", MARK.no, t.voteNo));
  else foot.append(el("span", "said", status));
  card2.append(el("h1", "title", voteTitle(v, members, t)), marks("segments", voteBoxes(v, members)), track, foot);
  root2.replaceChildren(card2);
  countdown = { vote: v, over: state.voteOver, bar };
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(tick);
  }
}
function readyPhase(mine, over) {
  if (mine !== void 0) return mine ? "accepted" : "declined";
  return over ? "ended" : "countdown";
}
function countdownRate(duration, currentTime, secondsLeft) {
  const rate = (duration - currentTime) / secondsLeft;
  return Number.isFinite(rate) && rate > 0.0625 ? rate : 1;
}
function readySounds(from, to) {
  const play2 = from === null ? ["intro"] : [];
  if (to === "countdown") play2.push("countdown");
  if (to === "accepted") play2.push("acceptedLoop");
  const fade = ["countdown", "acceptedLoop"].filter((x) => !play2.includes(x));
  return { play: play2, fade };
}
const SOUND_FILE = {
  intro: "ready-intro",
  countdown: "ready-countdown",
  acceptedLoop: "ready-accepted-loop"
};
const FADE_MS = 300;
const CLIP_FILE = {
  countdown: "ready-countdown",
  acceptedIntro: "ready-accepted-intro",
  acceptedIdle: "ready-accepted-idle",
  declined: "ready-declined"
};
let card = null;
function clip(name, loop) {
  const v = el("video", `clip ${name}`);
  v.src = `../ui/${CLIP_FILE[name]}.webm`;
  v.muted = true;
  v.loop = loop;
  v.preload = "auto";
  v.hidden = true;
  return v;
}
function sound(name, loop) {
  const a = new Audio(`../ui/${SOUND_FILE[name]}.ogg`);
  a.loop = loop;
  a.preload = "auto";
  return a;
}
function fadeOut(a) {
  if (a.paused) return;
  const from = a.volume;
  const start = performance.now();
  const timer = setInterval(() => {
    const left = 1 - (performance.now() - start) / FADE_MS;
    if (left > 0 && !a.paused) {
      a.volume = from * left;
      return;
    }
    clearInterval(timer);
    a.pause();
    a.volume = from;
  }, 30);
}
function sounds(c, from, to) {
  const { play: play2, fade } = readySounds(from, to);
  for (const name of fade) fadeOut(c.sounds[name]);
  if (c.volume <= 0) return;
  for (const name of play2) {
    const a = c.sounds[name];
    a.volume = c.volume;
    a.currentTime = 0;
    void a.play().catch(() => void 0);
  }
}
function play(c, name) {
  for (const [key, v2] of Object.entries(c.clips)) {
    if (key === name) continue;
    v2.hidden = true;
    v2.pause();
  }
  const v = c.clips[name];
  v.hidden = false;
  v.currentTime = 0;
  void v.play().catch(() => void 0);
}
function pace(c) {
  const v = c.clips.countdown;
  v.playbackRate = countdownRate(v.duration, v.currentTime, (c.endsAt - Date.now()) / 1e3);
}
function enter(c, phase) {
  sounds(c, c.phase, phase);
  clearInterval(c.pace);
  c.pace = void 0;
  c.scene.classList.toggle("declined", phase === "declined");
  if (phase === "countdown") {
    play(c, "countdown");
    pace(c);
    c.pace = window.setInterval(() => pace(c), 1e3);
  } else if (phase === "accepted") {
    play(c, "acceptedIntro");
  } else if (phase === "declined") {
    play(c, "declined");
  } else {
    c.clips.countdown.pause();
  }
  c.phase = phase;
}
function build(id, endsAt, volume, act) {
  const root2 = el("section", "vote ready");
  const body = el("div", "body");
  const scene = el("div", "scene");
  const timer = el("div", "timer");
  const clips = {
    countdown: clip("countdown", false),
    acceptedIntro: clip("acceptedIntro", false),
    acceptedIdle: clip("acceptedIdle", true),
    declined: clip("declined", false)
  };
  timer.append(...Object.values(clips));
  const status = el("div", "status");
  const title = el("h1", "title");
  const details = el("p", "details");
  const pips = el("div", "pips");
  status.append(title, details, pips);
  const buttons = el("div", "buttons");
  const button = (className, yes) => {
    const b = el("button", className);
    b.type = "button";
    b.addEventListener("click", () => act({ t: "ballot", yes }));
    return b;
  };
  const accept = button("accept", true);
  const decline = button("decline", false);
  buttons.append(accept, decline);
  body.append(scene, el("div", "frame"), timer, el("div", "map"), status, buttons);
  root2.append(body);
  const sounds2 = {
    intro: sound("intro", false),
    countdown: sound("countdown", false),
    acceptedLoop: sound("acceptedLoop", true)
  };
  const c = { id, root: root2, scene, title, details, pips, accept, decline, clips, sounds: sounds2, volume, phase: null, endsAt, pace: void 0 };
  clips.acceptedIntro.addEventListener("ended", () => {
    if (c.phase === "accepted") play(c, "acceptedIdle");
  });
  return c;
}
function dropReady() {
  if (!card) return;
  clearInterval(card.pace);
  for (const m of [...Object.values(card.clips), ...Object.values(card.sounds)]) m.pause();
  card = null;
}
function renderReady(root2, state, act) {
  const v = state.vote;
  if (!v) return;
  const t = strings(state.lang);
  const members = state.room.members;
  const me = members.find((m) => m.self)?.peer;
  const mine = me === void 0 ? void 0 : v.ballots[me];
  if (!card || card.id !== v.id) {
    dropReady();
    card = build(v.id, v.endsAt, state.volume, act);
  }
  const c = card;
  c.volume = state.volume;
  if (!root2.contains(c.root)) root2.replaceChildren(c.root);
  const phase = readyPhase(mine, state.voteOver);
  if (phase === "accepted") {
    c.title.textContent = t.readyAccepted;
    c.details.textContent = t.readyWaiting;
  } else if (phase === "declined") {
    c.title.textContent = t.readyDeclined;
    c.details.textContent = "";
  } else {
    c.title.textContent = voteTitle(v, members, t);
    const starter = members.find((m) => m.peer === v.starter)?.name;
    c.details.textContent = starter ? t.voteStartedBy(starter) : "";
  }
  c.pips.replaceChildren(...voteBoxes(v, members).map((b) => {
    const pip = el("span", b.answer);
    pip.title = b.name;
    return pip;
  }));
  const answerable = canAnswer(v, me, state.voteOver, Date.now());
  c.accept.textContent = t.voteAccept;
  c.decline.textContent = t.voteDecline;
  c.accept.disabled = !answerable;
  c.decline.disabled = !answerable;
  c.decline.classList.toggle("chosen", mine === false);
  if (c.phase !== phase) enter(c, phase);
}
function memberFlags(m) {
  const flags = [];
  if (m.needsUpdate) flags.push("update");
  if (m.noChat) flags.push("noChat");
  if (m.status === "paused") flags.push("paused");
  if (m.status === "muted") flags.push("muted");
  if (m.textOff) flags.push("textOff");
  if (m.votesOff) flags.push("votesOff");
  return flags.length > 0 ? flags : ["on"];
}
const statusTip = (flags, t) => flags.map((f) => t.panelStatus[f]).join("\n");
function rowActions(m, s) {
  return { alive: s.textOn, mute: !m.self, kick: s.votesOn && !m.self };
}
const memberCount = (s) => `${s.room.members.length} / ${s.max}`;
function boardSlots(members, max) {
  const cells = Math.max(2, Math.ceil(Math.max(max, members.length) / 2) * 2);
  return Array.from({ length: cells }, (_, i) => members[i] ?? null);
}
const initial = (name) => ([...name.trim()][0] ?? "?").toUpperCase();
const atBottom = (top, clientHeight, scrollHeight) => scrollHeight - top - clientHeight <= 8;
const SVG_NS = "http://www.w3.org/2000/svg";
const FLAG_GLYPH = {
  on: "●",
  paused: "❚❚",
  muted: "⊘",
  update: "⇧",
  noChat: "!",
  textOff: "T",
  votesOff: "V"
};
let tab = "members";
function speakerIcon(muted) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  const path = (d, stroke) => {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    if (stroke) p.setAttribute("fill", "none");
    svg.append(p);
  };
  path("M2 6h3l4-3v10l-4-3H2z", false);
  if (muted) path("M11.5 6l3.5 4M15 6l-3.5 4", true);
  else path("M11.5 5.5a3.5 3.5 0 0 1 0 5", true);
  return svg;
}
function iconButton(className, label, onClick) {
  const b = el("button", `icon ${className}`);
  b.type = "button";
  b.title = label;
  b.setAttribute("aria-label", label);
  b.addEventListener("click", onClick);
  return b;
}
function memberRow(m, state, t, act) {
  const can = rowActions(m, state);
  const color = tagColorCss(m.color, m.rgb);
  const row = el("div", `member${m.muted ? " muted" : ""}${m.self ? " me" : ""}`);
  row.style.setProperty("--tag", color);
  const flags = memberFlags(m);
  const portrait = el("span", "portrait", initial(m.name));
  const badge = el("span", `badge ${flags[0]}`, FLAG_GLYPH[flags[0]]);
  badge.title = statusTip(flags, t);
  portrait.append(badge);
  const who = el("div", "who");
  const tag = el(can.alive ? "button" : "span", "tag", m.name);
  if (tag instanceof HTMLButtonElement) {
    tag.type = "button";
    tag.title = t.aliveLine(m.name);
    tag.addEventListener("click", () => act({ t: "alive", peer: m.peer }));
  }
  who.append(tag, el("span", "path", m.self ? t.roomYou : t.roomPath[m.path]));
  const icons = el("div", "icons");
  if (can.mute) {
    const mute = iconButton(
      `speaker${m.muted ? " on" : ""}`,
      m.muted ? t.roomUnmuteMember : t.roomMuteMember,
      () => act({ t: "mute", peer: m.peer, on: !m.muted })
    );
    mute.append(speakerIcon(m.muted));
    icons.append(mute);
  }
  if (can.kick) {
    const kick = iconButton("kick", t.panelKick(m.name), () => act({ t: "kick", peer: m.peer }));
    kick.textContent = "✕";
    icons.append(kick);
  }
  row.append(portrait, who, icons);
  return row;
}
function emptyRow() {
  const row = el("div", "member open");
  row.append(el("span", "portrait"));
  return row;
}
function historyLine(line) {
  const row = el("div", `line ${line.kind}`);
  if (line.tag) {
    const who = el("span", "who", line.tag.name);
    who.style.setProperty("--tag", tagColorCss(line.tag.color, line.tag.rgb));
    row.append(who);
  }
  row.append(el("span", "said", line.text));
  return row;
}
function voteButton(label, kind, act) {
  const b = el("button", `lol-button ${kind}`, label);
  b.type = "button";
  b.addEventListener("click", () => act({ t: "vote", kind }));
  return b;
}
function renderRoster(root2, state, act) {
  const t = strings(state.lang);
  const found = root2.querySelector(".list");
  const before = found?.classList.contains(tab) ? found : null;
  const wasAtBottom = before ? atBottom(before.scrollTop, before.clientHeight, before.scrollHeight) : true;
  const wasTop = before?.scrollTop ?? 0;
  const cap = el("header", "cap");
  const tabButton = (id, label) => {
    const b = el("button", `tab${tab === id ? " current" : ""}`, label);
    b.type = "button";
    b.addEventListener("click", () => {
      tab = id;
      renderRoster(root2, state, act);
    });
    return b;
  };
  const gem = el("div", "gem");
  gem.append(el("span", "count", memberCount(state)));
  cap.append(tabButton("members", t.panelMembers), gem, tabButton("history", t.panelHistory));
  const board = el("section", "board");
  const head = el("div", "board-head");
  if (state.votesOn) head.append(voteButton(t.panelSurrender, "ff", act));
  head.append(el("span", "code", state.room.code ?? ""));
  if (state.votesOn) head.append(voteButton(t.panelReadyCheck, "ready", act));
  board.append(head);
  const list = el("div", `list lol-scroll ${tab}`);
  if (tab === "members") {
    const slots = boardSlots(state.room.members, state.max);
    list.style.setProperty("--rows", String(slots.length / 2));
    for (const m of slots) list.append(m ? memberRow(m, state, t, act) : emptyRow());
  } else if (state.history.length === 0) {
    list.append(el("div", "empty", t.panelHistoryEmpty));
  } else {
    for (const line of state.history) list.append(historyLine(line));
  }
  board.append(list);
  root2.replaceChildren(cap, board);
  list.scrollTop = tab === "history" && wasAtBottom ? list.scrollHeight : wasTop;
}
const root = document.getElementById("root");
window.panelApi.on((state) => {
  document.body.dataset.view = state.view;
  const act = (action) => window.panelApi.act(action);
  if (state.view === "vote" && state.vote?.kind === "ready") return renderReady(root, state, act);
  dropReady();
  if (state.view === "vote") renderVote(root, state, act);
  else renderRoster(root, state, act);
});
