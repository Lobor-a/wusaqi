const EMOTE_CATALOG = [
  { slug: "facepalm", leagueId: 4341, name: "Facepalm", nameZh: "捂脸", hasSound: true },
  { slug: "unworthy", leagueId: 3236, name: "Unworthy", nameZh: "弱爆", hasSound: true },
  { slug: "unworthy_cn", leagueId: 3239, name: "Unworthy (Chinese text)", nameZh: "弱爆（文字版）", hasSound: true },
  { slug: "poro_snax", leagueId: 1445, name: "Poro Snax", nameZh: "魄罗佳肴", hasSound: true },
  { slug: "sad_kitten", leagueId: 1457, name: "Sad Kitten", nameZh: "悲伤猫咪", hasSound: true },
  { slug: "cheeky_poro", leagueId: 1499, name: "Cheeky Poro", nameZh: "调皮魄罗", hasSound: true },
  { slug: "angry_kitty", leagueId: 1501, name: "Angry Kitty", nameZh: "我生气了！", hasSound: true },
  { slug: "gg_heart", leagueId: 3124, name: "GG <3", nameZh: "精彩的对局 <3", hasSound: true },
  { slug: "bee_happy", leagueId: 3153, name: "Bee Happy", nameZh: "小蜜蜂 高兴", hasSound: true },
  { slug: "bee_mad", leagueId: 3154, name: "Bee Mad", nameZh: "小蜜蜂 疯狂", hasSound: true },
  { slug: "bee_sad", leagueId: 3155, name: "Bee Sad", nameZh: "小蜜蜂 悲伤", hasSound: true },
  { slug: "snoozy_poro", leagueId: 3173, name: "Snoozy Poro", nameZh: "打盹魄罗", hasSound: true },
  { slug: "wahaha", leagueId: 3177, name: "Wahaha", nameZh: "笑哭我了", hasSound: true },
  { slug: "omg_love_it", leagueId: 3207, name: "OMG I love it", nameZh: "我的天，爱死它了", hasSound: true },
  { slug: "poro_ride", leagueId: 3214, name: "Poro Ride", nameZh: "溜了溜了", hasSound: true },
  { slug: "dont_make_me_laugh", leagueId: 3358, name: "Don't Make Me Laugh", nameZh: "xswl", hasSound: true },
  { slug: "woah_dizzy", leagueId: 4334, name: "Woah…Dizzy", nameZh: "晕晕", hasSound: true },
  { slug: "haha_hilarious", leagueId: 4443, name: "Haha HILARIOUS", nameZh: "哈哈笑死", hasSound: true },
  { slug: "gasp", leagueId: 4670, name: "Gasp!", nameZh: "倒吸一口凉气！", hasSound: true },
  { slug: "super_approved", leagueId: 4860, name: "Super-Approved", nameZh: "超赞的", hasSound: true },
  { slug: "pain", leagueId: 4948, name: "PaiN…", nameZh: "强颜欢笑", hasSound: true },
  { slug: "laughing_out_loud", leagueId: 4952, name: "Laughing Out LOUD", nameZh: "哈哈哈", hasSound: true },
  { slug: "hats_off", leagueId: 3156, name: "Hat's Off", nameZh: "脱帽致意", hasSound: true },
  { slug: "call_me", leagueId: 3338, name: "Call Me!", nameZh: "双击666！", hasSound: true },
  { slug: "think_about_it", leagueId: 3339, name: "Think About It", nameZh: "脑子是个好东西", hasSound: true },
  { slug: "unimpressed", leagueId: 3414, name: "Animated Unimpressed!", nameZh: "凡人！动态表情", hasSound: true },
  { slug: "did_you_just", leagueId: 3448, name: "Animated Did You Just?", nameZh: "动态 我太难了！", hasSound: true },
  { slug: "nice_try", leagueId: 1030, name: "Nice Try", nameZh: "棒棒哒", hasSound: true },
  { slug: "nice", leagueId: 1459, name: "Nice", nameZh: "干得漂亮", hasSound: true },
  { slug: "despair", leagueId: 1467, name: "Despair", nameZh: "呜呜呜---", hasSound: true },
  { slug: "does_not_compute", leagueId: 1468, name: "Does Not Compute", nameZh: "无法求解", hasSound: true },
  { slug: "come_at_me", leagueId: 1480, name: "Come at Me", nameZh: "放马过来", hasSound: true },
  { slug: "how_could_you", leagueId: 1487, name: "How Could You", nameZh: "你怎能这样", hasSound: true },
  { slug: "scout_approved", leagueId: 1492, name: "Scout-Approved", nameZh: "提莫说很好", hasSound: true },
  { slug: "maybe_next_time", leagueId: 3141, name: "Maybe Next Time", nameZh: "也许下次", hasSound: true },
  { slug: "okay", leagueId: 3159, name: "Okay", nameZh: "OK", hasSound: true },
  { slug: "good_job_buddy", leagueId: 3166, name: "Good Job, Buddy!", nameZh: "干得好，伙计！", hasSound: true },
  { slug: "teamwork", leagueId: 3167, name: "Teamwork!", nameZh: "团队协作！", hasSound: true },
  { slug: "i_will_destroy_you", leagueId: 3215, name: "I will destroy you", nameZh: "你瞅啥？", hasSound: true },
  { slug: "not_today", leagueId: 3581, name: "Not Today!", nameZh: "没门！", hasSound: true },
  { slug: "oh", leagueId: 3709, name: "Oh...", nameZh: "大受震撼", hasSound: true },
  { slug: "come_again", leagueId: 3962, name: "Come again?", nameZh: "一脸问号", hasSound: true },
  { slug: "magpie_oopsie", leagueId: 4091, name: "Magpie Oopsie", nameZh: "雀实有问题", hasSound: true },
  { slug: "such_foolishness", leagueId: 4730, name: "Such Foolishness", nameZh: "如此愚蠢", hasSound: true }
];
const DEFAULT_EMOTE_WHEEL = [
  "unworthy_cn",
  "poro_snax",
  "sad_kitten",
  "cheeky_poro",
  "angry_kitty",
  "gg_heart",
  "bee_happy",
  "bee_mad"
];
const DEFAULT_CLICK_EMOTE = "facepalm";
const MAX_CUSTOM_EMOTES = 24;
const EMOTE_DURATION_S = 3;
const STILL_MAX_BYTES = 12288;
const STILL_SIDE = 160;
const STILL_FALLBACK_SIDE = 128;
const INPUT_MAX_BYTES = 8388608;
const INPUT_MAX_SIDE = 8192;
const ANIM_MAX_BYTES = 5242880;
const ANIM_MAX_SIDE = 1024;
const BY_SLUG = new Map(EMOTE_CATALOG.map((e) => [e.slug, e]));
const catalogEmote = (slug) => BY_SLUG.get(slug);
const isBundledEmote = (v) => typeof v === "string" && BY_SLUG.has(v);
const customHash = (ref) => ref.slice(2);
const emoteAnimUrl = (slug) => `../emotes/${slug}.webp`;
const emoteIconUrl = (slug) => `../emotes/${slug}.png`;
const emoteSoundUrl = (slug) => `../emotes/${slug}.ogg`;
const customStillUrl = (hash) => `lolping://emotes/${hash}.webp`;
const customAnimUrl = (hash) => `lolping://emotes/${hash}.anim`;
function allEmoteAssetFiles() {
  return EMOTE_CATALOG.flatMap((e) => [`emotes/${e.slug}.webp`, `emotes/${e.slug}.png`, ...e.hasSound ? [`emotes/${e.slug}.ogg`] : []]);
}
function emoteName(ref, lang, custom) {
  const bundled = catalogEmote(ref);
  if (bundled) return lang === "zh-CN" ? bundled.nameZh : bundled.name;
  return custom.find((c) => c.id === ref)?.name ?? "?";
}
const ALL_PINGS = [
  { id: "danger", name: "Danger", icon: "pingwheel_retreatrender", art: ["pingwheel_retreatrender"], sound: "SRP_12", color: "#ff3b55" },
  { id: "push", name: "Push", icon: "push", art: ["pingwheel_pushrender"], sound: "SRP_9", color: "#35d27a" },
  { id: "omw", name: "On My Way", icon: "omw", art: ["omw"], sound: "OnMyWay", color: "#2e8bff" },
  { id: "allin", name: "All In", icon: "all_in", art: ["pingwheel_allin_render_01", "pingwheel_allin_render_02"], sound: "SRP_4", color: "#f2b320" },
  { id: "assist", name: "Assist Me", icon: "assist_me", art: ["assist_me"], sound: "ComeHere", color: "#56d43c" },
  { id: "needvision", name: "Need Vision", icon: "need_vision", art: ["need_vision"], sound: "SRP_7", color: "#56d43c" },
  { id: "missing", name: "Enemy Missing", icon: "enemy_missing", art: ["enemy_missing"], sound: "MIA", color: "#f2c518" },
  { id: "enemyvision", name: "Enemy Vision", icon: "enemy_vision", art: ["pingwheel_enemyvisionrender"], sound: "AreaIsWarded", color: "#ff3b55" },
  { id: "generic", name: "Generic", icon: "generic_ping", art: ["pingwheel_basicpingrender"], sound: "Base", color: "#2e8bff" },
  { id: "bait", name: "Bait", icon: "pingwheel_baitrender", art: ["pingwheel_baitrender"], sound: "SRP_11", color: "#efbc12" },
  { id: "visioncleared", name: "Vision Cleared", icon: "vision_cleared", art: ["pingwheel_visionclearedrender"], sound: "SRP_6", color: "#2b80ff" }
];
const DEFAULT_WHEEL = ["danger", "push", "omw", "allin", "assist", "needvision", "missing", "enemyvision"];
const DEFAULT_CLICK_PING = "generic";
const WHEEL_SLOTS = 8;
const TICK_SOUND = "button";
const FALLBACK_TEXTURE = "generic_ping";
function pingById(id) {
  return ALL_PINGS.find((p) => p.id === id);
}
const pingsFor = (ids) => ids.map((id) => pingById(id));
pingsFor(DEFAULT_WHEEL);
const textureUrl = (name) => `../textures/${name}.png`;
const soundUrl = (name) => `../sounds/${name}.wav`;
function allSoundNames() {
  return [.../* @__PURE__ */ new Set([...ALL_PINGS.map((p) => p.sound), TICK_SOUND])];
}
function allTextureNames() {
  return [.../* @__PURE__ */ new Set([...ALL_PINGS.flatMap((p) => [p.icon, ...p.art]), FALLBACK_TEXTURE])];
}
const LANGUAGE_PREFS = ["auto", "en", "zh-CN"];
const LANGUAGE_NAMES = { en: "English", "zh-CN": "简体中文" };
function resolveLang(pref, locale) {
  if (pref !== "auto") return pref;
  return /^zh/i.test(locale) ? "zh-CN" : "en";
}
const en = {
  lang: "en",
  on: "On",
  off: "Off",
  // settings window
  navTrigger: "Trigger",
  navToggle: "Toggle",
  navPings: "Pings & sound",
  navWheel: "Wheel",
  navEmotes: "Emotes",
  navRoom: "Room",
  navApp: "App",
  tagline: "Ping anywhere",
  pageTitle: "Settings",
  statusHelperStopped: "Input helper stopped",
  statusOn: "Pinging is on",
  statusOff: "Pinging is off",
  statusFailedHint: "Mouse and keyboard input can’t be read right now.",
  statusHint: (trigger, hotkey, enabled) => `Hold ${trigger} and drag to open the ping wheel · ${hotkey} to turn ${enabled ? "off" : "on"}`,
  restartHelper: "Restart helper",
  triggerKey: "Trigger key",
  triggerKeyDesc: "Hold this, then drag with the left mouse button to open the wheel",
  triggerMouseDesc: "Press and drag with this mouse button to open the wheel",
  customKeyNote: "This key won’t type in other apps while lolPing is on",
  dragDistance: "Drag distance",
  dragDistanceDesc: "How far the mouse must move before the wheel opens",
  clickPing: (trigger) => `${trigger} + click places a ping`,
  clickPingDesc: (trigger) => `Places the ping in the centre of the wheel. When off, ${trigger} + click passes straight through to the app underneath`,
  toggleShortcut: "Enable / disable shortcut",
  toggleShortcutDesc: "Works anywhere, even while pinging is off",
  startEnabled: "Start enabled",
  startEnabledDesc: "Pinging is on when lolPing launches",
  pingSize: "Ping size",
  pingDuration: "Ping duration",
  pingDurationDesc: "How long a ping stays on screen",
  volume: "Volume",
  mute: "Mute ping sounds",
  tickSound: "Wheel tick sound",
  tickSoundDesc: "Plays a quiet click when hovering a new slice",
  wheelTitle: "Customize the wheel",
  wheelDesc: (trigger) => `Drag a ping onto a slice to put it there. Drop it on the centre to make it the ${trigger} + click ping.`,
  wheelReset: "Reset to default",
  allPings: "All pings",
  allPingsDesc: "Click to preview. Drag onto the wheel to assign, or click a ping and then a slot.",
  wheelPickHint: (name) => `Now click a slice or the centre to place ${name}. Esc cancels.`,
  wheelCenter: "CLICK",
  wheelNew: "NEW",
  wheelSlotLabel: (dir, name) => `${dir}: ${name}`,
  wheelCenterLabel: (trigger, name) => `${trigger} + click: ${name}`,
  slotNames: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
  emoteKey: "Emote key",
  emoteKeyDesc: "Hold this and drag to open the emote wheel. It can’t be the same as the trigger key.",
  emoteKeyOff: "Off",
  emoteKeyOffDesc: "The emote wheel is off. Pick a key to turn it on.",
  emoteClick: (key) => `${key} + click places an emote`,
  emoteClickDesc: (key) => `Places the emote in the centre of the emote wheel. When off, ${key} + click passes straight through to the app underneath`,
  emoteSize: "Emote size",
  emoteSound: "Emote sounds",
  emoteSoundDesc: "Plays an emote’s own sound at the volume set under Pings & sound",
  emoteWheelTitle: "Customize the emote wheel",
  emoteWheelDesc: (key) => `Drag an emote onto a slice to put it there. Drop it on the centre to make it the ${key} + click emote.`,
  allEmotes: "All emotes",
  allEmotesDesc: "Click to preview. Drag onto the wheel to assign, or click an emote and then a slot.",
  removeImage: (name) => `Remove ${name}`,
  addImage: "Add image…",
  addImageDesc: "PNG, JPG, GIF or WebP, up to 8 MB and 8192 pixels on the longest side. You can also drop images on the list.",
  yourImages: (n, max) => `Your images: ${n} of ${max}`,
  importErrType: (file) => `${file} isn’t a PNG, JPG, GIF or WebP image.`,
  importErrSize: (file) => `${file} is too big: an image can be up to 8 MB and 8192 pixels on its longest side.`,
  importErrAnimSize: (file) => `${file} is too big to animate: an animation can be up to 5 MB and 1024 pixels on its longest side.`,
  importErrDetail: (file) => `${file} is too detailed to make a small emote from. Try a simpler image.`,
  importErrFull: "You can add up to 24 images. Remove one to add another.",
  importErrDuplicate: (file) => `${file} is already one of your images.`,
  importErrDisk: (file) => `${file} couldn’t be saved. Check that the settings folder can be written to.`,
  launchAtStartup: "Launch at Windows startup",
  launchAtStartupDesc: "Starts hidden in the tray",
  language: "Language",
  languageDesc: "Follow Windows, or pick one",
  languageAuto: "Follow Windows",
  about: "About",
  aboutDesc: (version) => `lolPing ${version} · Ping icons and sounds © Riot Games`,
  githubPage: "GitHub page",
  openSettingsFolder: "Open settings folder",
  problems: "Problems",
  knownLimitations: "Known limitations",
  pressKey: "Press a key…",
  hintUnusable: "That key can’t be used",
  hintNotTrigger: "That key can’t be used as a trigger",
  hintNeedModifier: "Add Ctrl, Alt or Win",
  keyboard: "Keyboard",
  mouse: "Mouse",
  mouseBack: "back",
  mouseForward: "forward",
  customKey: "Custom key",
  customKeyMenu: "Custom key…",
  chooseKey: "Choose a key",
  mouse4: "Mouse 4",
  mouse5: "Mouse 5",
  // macOS Accessibility permission (settings window)
  statusNoAccess: "Waiting for Accessibility access",
  statusNoAccessHint: "lolPing can’t see the mouse and keyboard until macOS allows it.",
  permTitle: "lolPing needs Accessibility access",
  permSteps: [
    "Click Open System Settings.",
    "Turn on lolPing under Privacy & Security → Accessibility.",
    "Already on after an update? Select lolPing, remove it with –, and turn it on again."
  ],
  permStaleTitle: "Turn Accessibility access on again",
  permStaleSteps: [
    "macOS forgets the permission each time lolPing is updated.",
    "In Privacy & Security → Accessibility, select lolPing and remove it with –.",
    "Click Open System Settings, turn lolPing on again, then click Try again."
  ],
  permOpen: "Open System Settings",
  permRetry: "Try again",
  // room (settings window)
  roomName: "Your name",
  roomNameDesc: "Shown under your pings on other people’s screens",
  roomColor: "Tag colour",
  roomColorLabel: (n) => `Colour ${n}`,
  roomJoinTitle: "Join a room",
  roomJoinDesc: "Paste the code a friend sent you, or create a room and share yours",
  roomNetworkHint: "The first time, Windows asks whether lolPing may use your network: allow it, and make sure your Wi‑Fi is set to Private.",
  roomJoin: "Join",
  roomCreate: "Create room",
  roomInvalid: "That isn’t a room code.",
  roomMistyped: "This code looks mistyped.",
  roomJoinFailed: "Couldn’t join the room. Try again.",
  roomShareDesc: "Share this code with friends",
  roomJoining: "Joining…",
  roomCopy: "Copy code",
  roomCopied: "Copied",
  roomLeave: "Leave room",
  roomYou: "you",
  roomPath: { lan: "LAN", internet: "Internet", connecting: "Connecting…", unreachable: "Can’t reach" },
  roomPaused: "paused",
  roomMutedBadge: "muted",
  roomNeedsUpdate: "needs update",
  memberOldNoEmotes: "Can’t see emotes, needs an update",
  roomClockSkew: "A device trying to join has a clock more than 10 minutes off. Check the date and time settings on every device.",
  roomMuteMember: "Mute",
  roomUnmuteMember: "Unmute",
  roomWaiting: "Waiting for others…",
  roomLonely: "Nobody here yet. Check that your friends typed the same code.",
  roomLanUnavailable: "LAN unavailable",
  roomLanUnavailableDesc: "lolPing couldn’t open UDP port 47474. Another app may be using it; restarting lolPing can help.",
  roomMute: "Mute room",
  roomMuteDesc: "Keep pinging, but hide everyone else’s pings and emotes",
  roomLimit: "Incoming ping and emote limit",
  roomLimitDesc: "Pings and emotes together, per person. Unlimited lets friends spam you",
  roomLimitValue: (n) => n === 0 ? "Unlimited" : `${n} / s`,
  roomRejoin: "Rejoin last room on launch",
  roomInternet: "Allow internet connections",
  roomInternetDesc: "Meet friends on other networks through public relays. Off: same network only.",
  roomInternetUnavailable: "Internet unavailable",
  roomInternetUnavailableDesc: "Can’t reach any relay. Retrying in the background.",
  roomRetry: "Retry",
  roomLonelyInternetOff: "Friends on another network? Turn on Allow internet connections.",
  roomDisplays: "Displays",
  roomDisplaysDesc: "A ping lands on the display with the same number, or on #1",
  roomPrimary: "Primary",
  roomPrivacy: "Pings and names are end-to-end encrypted. People on your network can see your local IP address. With internet connections on, public relays see your IP address, an anonymous room ID and when you send, but never your pings or your name.",
  roomHelp: "Can’t see a friend? Check that you both typed the same code. On the same network, lolPing must be allowed through the firewall; on different networks, you both need Allow internet connections on.",
  pingNames: {
    danger: "Danger",
    push: "Push",
    omw: "On My Way",
    allin: "All In",
    assist: "Assist Me",
    needvision: "Need Vision",
    missing: "Enemy Missing",
    enemyvision: "Enemy Vision",
    generic: "Generic",
    bait: "Bait",
    visioncleared: "Vision Cleared"
  },
  // main process
  limitations: [
    "The wheel can’t be triggered over elevated (administrator) windows such as Task Manager.",
    "Exclusive-fullscreen games draw above the overlay.",
    "Single-window screen capture doesn’t include the overlay; use whole-screen capture.",
    "While lolPing is on, Ctrl + drag (the default emote key) opens the emote wheel instead of copying files or text. Change the emote key or turn it off in Settings → Emotes."
  ],
  missingAsset: (file) => `Missing asset: ${file}`,
  hotkeyTaken: (hotkey) => `${hotkey} is already used by another app.`,
  emoteKeyClash: "The ping trigger and the emote key can’t be the same key, and the emote key can’t be the pause shortcut’s key.",
  problemEmoteKeyClash: "The emote key was the same as another lolPing key, so it was turned off.",
  toastOn: "Pings on",
  toastOff: "Pings off",
  toastToggleHint: (hotkey) => `${hotkey} to toggle`,
  toastHelperStopped: "Ping helper stopped",
  toastHelperStoppedBody: "Right-click the tray icon to restart it",
  trayTip: (on) => `lolPing: pings ${on ? "on" : "off"}`,
  trayTipFailed: "lolPing: input helper stopped",
  trayTipNoAccess: "lolPing: needs Accessibility access",
  toastMenuBar: "lolPing is running",
  toastMenuBarBody: "Click the ping icon in the menu bar for settings",
  trayEnabled: "Enabled",
  trayRestart: "Restart input helper",
  traySettings: "Settings…",
  trayQuit: "Quit lolPing",
  trayRoom: "Room",
  trayRoomJoinClipboard: "Join from clipboard",
  trayRoomCreate: "Create room",
  trayRoomSettings: "Room settings…",
  trayRoomLabel: (code, n) => `${code} · ${n} ${n === 1 ? "person" : "people"}`,
  trayRoomCopy: "Copy code",
  trayRoomMute: "Mute room",
  trayRoomLeave: "Leave room",
  toastRoomJoined: (code) => `Joined room ${code}`,
  toastRoomJoinedBody: "Share the code with friends",
  toastMemberJoined: (name) => `${name} joined`,
  toastMemberLeft: (name) => `${name} left`,
  toastMemberLost: (name) => `${name} disconnected`,
  toastRoomFull: "Room is full",
  toastRoomFullBody: "A room holds up to 8 people",
  toastNoCode: "No room code on the clipboard",
  toastNoCodeBody: "Copy a code like PING-XXXXX-XXXXX first",
  // updates
  updateAvailable: (v) => `lolPing ${v} is available`,
  updateNow: "Update",
  whatsNew: "What’s new",
  checkForUpdates: "Check for updates",
  checking: "Checking…",
  checkedAt: (time) => `Checked ${time}`,
  upToDate: "lolPing is up to date",
  downloadingUpdate: (n) => `Downloading update… ${n}%`,
  installingUpdate: "Installing update…",
  updateToastTitle: "Update available",
  updateErrorToastTitle: "Update error",
  updateToastBody: (v) => `lolPing ${v} is ready to download. Update from the tray menu or Settings.`,
  restartingToUpdate: "Restarting to update…",
  updateMacSteps: "lolPing downloads the update and opens it. Drag lolPing into Applications, choose Replace, then open it and allow Accessibility again.",
  updateMacDialog: "Drag lolPing into Applications and choose Replace. Then open it and allow Accessibility again. lolPing will quit now.",
  updateErrCheck: (reason) => `Couldn’t check for updates: ${reason}`,
  updateErrDownload: "The download failed. Try again.",
  updateErrDamaged: "The download was damaged. Try again.",
  updateErrInstall: "The update couldn’t be installed. Try again.",
  updateReasonUnknown: "no details",
  retry: "Retry",
  autoUpdateCheck: "Check for updates automatically",
  autoUpdateCheckDesc: "Checks GitHub for a new version every few hours. Nothing downloads until you click Update.",
  trayUpdateTo: (v) => `Update to ${v}…`,
  trayCheckForUpdates: "Check for updates",
  trayDownloading: (n) => `Downloading update… ${n}%`,
  trayInstalling: "Installing update…"
};
const zh = {
  lang: "zh-CN",
  on: "开",
  off: "关",
  navTrigger: "触发",
  navToggle: "开关",
  navPings: "信号与声音",
  navWheel: "轮盘",
  navEmotes: "表情",
  navRoom: "房间",
  navApp: "应用",
  tagline: "随处发信号",
  pageTitle: "设置",
  statusHelperStopped: "输入助手已停止",
  statusOn: "信号已开启",
  statusOff: "信号已关闭",
  statusFailedHint: "目前无法读取鼠标和键盘输入。",
  statusHint: (trigger, hotkey, enabled) => `按住 ${trigger} 并拖动打开信号轮盘 · ${hotkey} ${enabled ? "关闭" : "开启"}`,
  restartHelper: "重启助手",
  triggerKey: "触发键",
  triggerKeyDesc: "按住此键，再用鼠标左键拖动以打开轮盘",
  triggerMouseDesc: "按住此鼠标键并拖动以打开轮盘",
  customKeyNote: "lolPing 开启时，此键在其他程序中不会输入字符",
  dragDistance: "拖动距离",
  dragDistanceDesc: "鼠标移动多远后才打开轮盘",
  clickPing: (trigger) => `${trigger} + 单击发送信号`,
  clickPingDesc: (trigger) => `发送轮盘中心的信号。关闭时，${trigger} + 单击会直接传给下方的程序`,
  toggleShortcut: "开关快捷键",
  toggleShortcutDesc: "在任何地方都可用，即使信号已关闭",
  startEnabled: "启动时开启",
  startEnabledDesc: "启动 lolPing 时信号处于开启状态",
  pingSize: "信号大小",
  pingDuration: "信号持续时间",
  pingDurationDesc: "信号在屏幕上停留多久",
  volume: "音量",
  mute: "静音信号声音",
  tickSound: "轮盘提示音",
  tickSoundDesc: "悬停到新的扇区时播放轻微的点击声",
  wheelTitle: "自定义轮盘",
  wheelDesc: (trigger) => `把信号拖到扇区上即可放置。拖到中心则设为 ${trigger} + 单击发送的信号。`,
  wheelReset: "恢复默认",
  allPings: "全部信号",
  allPingsDesc: "单击可预览。拖到轮盘上即可分配，也可以先单击信号，再单击位置。",
  wheelPickHint: (name) => `请单击一个扇区或中心来放置“${name}”。按 Esc 取消。`,
  wheelCenter: "单击",
  wheelNew: "新",
  wheelSlotLabel: (dir, name) => `${dir}：${name}`,
  wheelCenterLabel: (trigger, name) => `${trigger} + 单击：${name}`,
  slotNames: ["上", "右上", "右", "右下", "下", "左下", "左", "左上"],
  emoteKey: "表情键",
  emoteKeyDesc: "按住此键并拖动以打开表情轮盘，不能与触发键相同。",
  emoteKeyOff: "关闭",
  emoteKeyOffDesc: "表情轮盘已关闭。选择一个键即可开启。",
  emoteClick: (key) => `${key} + 单击发送表情`,
  emoteClickDesc: (key) => `发送表情轮盘中心的表情。关闭时，${key} + 单击会直接传给下方的程序`,
  emoteSize: "表情大小",
  emoteSound: "表情音效",
  emoteSoundDesc: "按“信号与声音”中设置的音量播放表情自带的音效",
  emoteWheelTitle: "自定义表情轮盘",
  emoteWheelDesc: (key) => `把表情拖到扇区上即可放置。拖到中心则设为 ${key} + 单击发送的表情。`,
  allEmotes: "全部表情",
  allEmotesDesc: "单击可预览。拖到轮盘上即可分配，也可以先单击表情，再单击位置。",
  removeImage: (name) => `移除“${name}”`,
  addImage: "添加图片…",
  addImageDesc: "支持 PNG、JPG、GIF 和 WebP，最大 8 MB，最长边不超过 8192 像素。也可以把图片拖到列表上。",
  yourImages: (n, max) => `我的图片：${n}/${max}`,
  importErrType: (file) => `“${file}”不是 PNG、JPG、GIF 或 WebP 图片。`,
  importErrSize: (file) => `“${file}”太大：图片最大 8 MB，最长边不超过 8192 像素。`,
  importErrAnimSize: (file) => `“${file}”太大，无法作为动图：动图最大 5 MB，最长边不超过 1024 像素。`,
  importErrDetail: (file) => `“${file}”细节太多，无法做成足够小的表情。请换一张简单些的图片。`,
  importErrFull: "最多可添加 24 张图片。请先移除一张再添加。",
  importErrDuplicate: (file) => `“${file}”已在我的图片中。`,
  importErrDisk: (file) => `无法保存“${file}”。请检查设置文件夹是否可以写入。`,
  launchAtStartup: "开机启动",
  launchAtStartupDesc: "启动后隐藏在托盘中",
  language: "语言",
  languageDesc: "跟随 Windows，或手动选择",
  languageAuto: "跟随 Windows",
  about: "关于",
  aboutDesc: (version) => `lolPing ${version} · 信号图标和音效 © Riot Games`,
  githubPage: "GitHub 主页",
  openSettingsFolder: "打开设置文件夹",
  problems: "问题",
  knownLimitations: "已知限制",
  pressKey: "请按一个键…",
  hintUnusable: "这个键无法使用",
  hintNotTrigger: "这个键不能用作触发键",
  hintNeedModifier: "请加上 Ctrl、Alt 或 Win",
  keyboard: "键盘",
  mouse: "鼠标",
  mouseBack: "后退",
  mouseForward: "前进",
  customKey: "自定义按键",
  customKeyMenu: "自定义按键…",
  chooseKey: "选择一个键",
  mouse4: "鼠标侧键 4",
  mouse5: "鼠标侧键 5",
  statusNoAccess: "等待辅助功能权限",
  statusNoAccessHint: "在 macOS 允许之前，lolPing 无法读取鼠标和键盘。",
  permTitle: "lolPing 需要辅助功能权限",
  permSteps: [
    "点按“打开系统设置”。",
    "在“隐私与安全性 → 辅助功能”中打开 lolPing。",
    "更新后已经是打开状态？选中 lolPing，点按 – 移除，再重新打开。"
  ],
  permStaleTitle: "请重新打开辅助功能权限",
  permStaleSteps: [
    "每次更新 lolPing 后，macOS 都会忘记这项权限。",
    "在“隐私与安全性 → 辅助功能”中选中 lolPing，点按 – 将其移除。",
    "点按“打开系统设置”，重新打开 lolPing，然后点按“重试”。"
  ],
  permOpen: "打开系统设置",
  permRetry: "重试",
  roomName: "你的名字",
  roomNameDesc: "显示在你的信号下方，其他人可以看到",
  roomColor: "名字颜色",
  roomColorLabel: (n) => `颜色 ${n}`,
  roomJoinTitle: "加入房间",
  roomJoinDesc: "粘贴朋友发来的房间码，或创建房间并分享你的房间码",
  roomNetworkHint: "第一次使用时，Windows 会询问是否允许 lolPing 使用网络：请允许，并确认你的 Wi‑Fi 设置为“专用网络”。",
  roomJoin: "加入",
  roomCreate: "创建房间",
  roomInvalid: "这不是房间码。",
  roomMistyped: "房间码好像输错了。",
  roomJoinFailed: "无法加入房间，请重试。",
  roomShareDesc: "把这个房间码分享给朋友",
  roomJoining: "正在加入…",
  roomCopy: "复制房间码",
  roomCopied: "已复制",
  roomLeave: "离开房间",
  roomYou: "你",
  roomPath: { lan: "局域网", internet: "互联网", connecting: "正在连接…", unreachable: "无法连接" },
  roomPaused: "已暂停",
  roomMutedBadge: "已静音",
  roomNeedsUpdate: "需要更新",
  memberOldNoEmotes: "看不到表情，需要更新",
  roomClockSkew: "有设备的时钟偏差超过 10 分钟，无法加入。请检查每台设备的日期和时间设置。",
  roomMuteMember: "静音",
  roomUnmuteMember: "取消静音",
  roomWaiting: "正在等待其他人…",
  roomLonely: "还没有人加入。请确认朋友输入的是同一个房间码。",
  roomLanUnavailable: "局域网不可用",
  roomLanUnavailableDesc: "lolPing 无法打开 UDP 端口 47474，可能被其他程序占用了。重启 lolPing 也许有帮助。",
  roomMute: "房间静音",
  roomMuteDesc: "你仍可发信号和表情，但不显示其他人的信号和表情",
  roomLimit: "接收信号和表情上限",
  roomLimitDesc: "信号和表情合计，按每人计算。选择“不限”时朋友可以随意刷屏",
  roomLimitValue: (n) => n === 0 ? "不限" : `${n} 次/秒`,
  roomRejoin: "启动时重新加入上次的房间",
  roomInternet: "允许互联网连接",
  roomInternetDesc: "通过公共中继与其他网络上的朋友连接。关闭后仅限同一网络。",
  roomInternetUnavailable: "互联网不可用",
  roomInternetUnavailableDesc: "无法连接任何中继，正在后台重试。",
  roomRetry: "重试",
  roomLonelyInternetOff: "朋友在其他网络？请打开“允许互联网连接”。",
  roomDisplays: "显示器",
  roomDisplaysDesc: "信号显示在编号相同的显示器上，没有则显示在 1 号上",
  roomPrimary: "主显示器",
  roomPrivacy: "信号和名字均为端到端加密。同一网络中的人可以看到你的本地 IP 地址。开启互联网连接后，公共中继可以看到你的 IP 地址、匿名房间 ID 和发送时间，但永远看不到你的信号和名字。",
  roomHelp: "看不到朋友？请确认你们输入的是同一个房间码。在同一网络中，需要允许 lolPing 通过防火墙；在不同网络中，双方都需要打开“允许互联网连接”。",
  pingNames: {
    danger: "危险",
    push: "推进",
    omw: "正在赶来",
    allin: "全力进攻",
    assist: "请求协助",
    needvision: "需要视野",
    missing: "敌人消失",
    enemyvision: "敌方视野",
    generic: "普通信号",
    bait: "诱饵",
    visioncleared: "视野已清除"
  },
  limitations: [
    "无法在以管理员身份运行的窗口（例如任务管理器）上打开轮盘。",
    "独占全屏的游戏会盖住信号层。",
    "只共享单个窗口时看不到信号，请共享整个屏幕。",
    "lolPing 开启时，Ctrl + 拖动（默认的表情键）会打开表情轮盘，而不是复制文件或文字。可在“设置 → 表情”中更换表情键或将其关闭。"
  ],
  missingAsset: (file) => `缺少素材：${file}`,
  hotkeyTaken: (hotkey) => `${hotkey} 已被其他程序占用。`,
  emoteKeyClash: "信号触发键和表情键不能是同一个键，表情键也不能是暂停快捷键的按键。",
  problemEmoteKeyClash: "表情键与 lolPing 的另一个按键相同，已被关闭。",
  toastOn: "信号已开启",
  toastOff: "信号已关闭",
  toastToggleHint: (hotkey) => `${hotkey} 切换`,
  toastHelperStopped: "信号助手已停止",
  toastHelperStoppedBody: "右键单击托盘图标以重启",
  trayTip: (on) => `lolPing：信号${on ? "已开启" : "已关闭"}`,
  trayTipFailed: "lolPing：输入助手已停止",
  trayTipNoAccess: "lolPing：需要辅助功能权限",
  toastMenuBar: "lolPing 正在运行",
  toastMenuBarBody: "点按菜单栏中的信号图标打开设置",
  trayEnabled: "启用",
  trayRestart: "重启输入助手",
  traySettings: "设置…",
  trayQuit: "退出 lolPing",
  trayRoom: "房间",
  trayRoomJoinClipboard: "从剪贴板加入",
  trayRoomCreate: "创建房间",
  trayRoomSettings: "房间设置…",
  trayRoomLabel: (code, n) => `${code} · ${n} 人`,
  trayRoomCopy: "复制房间码",
  trayRoomMute: "房间静音",
  trayRoomLeave: "离开房间",
  toastRoomJoined: (code) => `已加入房间 ${code}`,
  toastRoomJoinedBody: "把房间码分享给朋友",
  toastMemberJoined: (name) => `${name} 加入了房间`,
  toastMemberLeft: (name) => `${name} 离开了房间`,
  toastMemberLost: (name) => `${name} 已断开连接`,
  toastRoomFull: "房间已满",
  toastRoomFullBody: "一个房间最多 8 人",
  toastNoCode: "剪贴板中没有房间码",
  toastNoCodeBody: "请先复制形如 PING-XXXXX-XXXXX 的房间码",
  updateAvailable: (v) => `有新版本 lolPing ${v}`,
  updateNow: "更新",
  whatsNew: "更新内容",
  checkForUpdates: "检查更新",
  checking: "正在检查…",
  checkedAt: (time) => `检查于 ${time}`,
  upToDate: "lolPing 已是最新版本",
  downloadingUpdate: (n) => `正在下载更新… ${n}%`,
  installingUpdate: "正在安装更新…",
  updateToastTitle: "有可用更新",
  updateErrorToastTitle: "更新出错",
  updateToastBody: (v) => `lolPing ${v} 可以下载了。请从托盘菜单或设置中更新。`,
  restartingToUpdate: "正在重启以更新…",
  updateMacSteps: "lolPing 会下载更新并打开它。请把 lolPing 拖到“应用程序”中，选择“替换”，然后打开它并再次允许辅助功能。",
  updateMacDialog: "请把 lolPing 拖到“应用程序”中并选择“替换”，然后打开它并再次允许辅助功能。lolPing 现在将退出。",
  updateErrCheck: (reason) => `无法检查更新：${reason}`,
  updateErrDownload: "下载失败，请重试。",
  updateErrDamaged: "下载的文件已损坏，请重试。",
  updateErrInstall: "无法安装更新，请重试。",
  updateReasonUnknown: "没有详细信息",
  retry: "重试",
  autoUpdateCheck: "自动检查更新",
  autoUpdateCheckDesc: "每隔几小时向 GitHub 检查一次新版本。在你点击“更新”之前不会下载任何内容。",
  trayUpdateTo: (v) => `更新到 ${v}…`,
  trayCheckForUpdates: "检查更新",
  trayDownloading: (n) => `正在下载更新… ${n}%`,
  trayInstalling: "正在安装更新…"
};
const MAC = {
  en: {
    hintNeedModifier: "Add ⌃, ⌥ or ⌘",
    launchAtStartup: "Open at login",
    launchAtStartupDesc: "Starts in the menu bar",
    languageDesc: "Follow macOS, or pick one",
    languageAuto: "Follow macOS",
    openSettingsFolder: "Show in Finder",
    limitations: [
      "macOS asks for Accessibility access again after every lolPing update.",
      "The wheel can’t open while a secure screen is up, such as the login window or a password prompt.",
      "Some full-screen games draw above the overlay.",
      "Single-window screen sharing doesn’t include the pings; share the entire screen.",
      "While lolPing is on, ⌃ Control + drag (the default emote key) opens the emote wheel instead of its usual action. Change the emote key or turn it off in Settings → Emotes."
    ],
    toastHelperStoppedBody: "Click the menu bar icon to restart it",
    updateToastBody: (v) => `lolPing ${v} is ready to download. Update from the menu bar or Settings.`,
    roomNetworkHint: "The first time, macOS asks whether lolPing may find devices on your local network: allow it."
  },
  "zh-CN": {
    hintNeedModifier: "请加上 ⌃、⌥ 或 ⌘",
    launchAtStartup: "登录时打开",
    launchAtStartupDesc: "启动后显示在菜单栏中",
    languageDesc: "跟随 macOS，或手动选择",
    languageAuto: "跟随 macOS",
    openSettingsFolder: "在访达中显示",
    limitations: [
      "每次更新 lolPing 后，macOS 都会再次要求辅助功能权限。",
      "登录窗口或密码提示等安全界面出现时无法打开轮盘。",
      "部分全屏游戏会盖住信号层。",
      "只共享单个窗口时看不到信号，请共享整个屏幕。",
      "lolPing 开启时，⌃ Control + 拖动（默认的表情键）会打开表情轮盘，而不会执行它原本的操作。可在“设置 → 表情”中更换表情键或将其关闭。"
    ],
    toastHelperStoppedBody: "点按菜单栏图标以重启",
    updateToastBody: (v) => `lolPing ${v} 可以下载了。请从菜单栏或设置中更新。`,
    roomNetworkHint: "第一次使用时，macOS 会询问是否允许 lolPing 查找本地网络中的设备：请允许。"
  }
};
const TABLES = {
  win: { en, "zh-CN": zh },
  mac: { en: { ...en, ...MAC.en }, "zh-CN": { ...zh, ...MAC["zh-CN"] } }
};
const strings = (lang, platform = "win") => TABLES[platform][lang];
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
  if (mods & MOD.win) out.push("Win");
  return out;
}
const hotkeyParts = (h, platform = "win") => [...modLabels(h.mods, platform), vkLabel(h.vk, platform)];
const hotkeyLabel = (h, platform = "win") => hotkeyParts(h, platform).join(platform === "mac" ? "" : " + ");
function eventMods(e) {
  return (e.ctrlKey ? MOD.ctrl : 0) | (e.altKey ? MOD.alt : 0) | (e.shiftKey ? MOD.shift : 0) | (e.metaKey ? MOD.win : 0);
}
const TAG_COLORS = [
  "#4fc3f7",
  // sky
  "#ff8a65",
  // coral
  "#aed581",
  // lime
  "#ba68c8",
  // purple
  "#ffd54f",
  // amber
  "#4db6ac",
  // teal
  "#f06292",
  // pink
  "#e0e0e0"
  // silver
];
const keyboardTriggers = (platform) => platform === "mac" ? ["alt", "ctrl", "shift", "win"] : ["alt", "ctrl", "shift", "win", "capslock"];
const DEFAULT_SETTINGS = {
  clickPingId: DEFAULT_CLICK_PING,
  wheel: [...DEFAULT_WHEEL],
  pingSizePx: 110,
  pingDurationS: 3.2,
  volume: 70,
  muted: false,
  tickSound: true,
  emoteWheel: [...DEFAULT_EMOTE_WHEEL],
  clickEmoteId: DEFAULT_CLICK_EMOTE,
  emoteSizePx: 150,
  emoteSound: true,
  customEmotes: []
};
const LIMITS = {
  dragThresholdPx: { min: 2, max: 40, step: 1 },
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
const KEY_LABELS = {
  win: { alt: "Alt", ctrl: "Ctrl", shift: "Shift", win: "Win", capslock: "Caps Lock" },
  mac: { alt: "⌥ Option", ctrl: "⌃ Control", shift: "⇧ Shift", win: "⌘ Command", capslock: "⇪ Caps Lock" }
};
function triggerLabel(t, lang = "en", platform = "win") {
  if (typeof t === "object") return vkLabel(t.vk, platform);
  if (t === "mouse4" || t === "mouse5") return strings(lang)[t];
  return KEY_LABELS[platform][t];
}
const overlaySettings = (s) => ({
  pingSizePx: s.pingSizePx,
  pingDurationS: s.pingDurationS,
  volume: s.volume,
  muted: s.muted,
  tickSound: s.tickSound,
  wheel: [...s.wheel],
  clickPingId: s.clickPingId,
  emoteWheel: [...s.emoteWheel],
  clickEmoteId: s.clickEmoteId,
  emoteSizePx: s.emoteSizePx,
  emoteSound: s.emoteSound,
  customEmotes: s.customEmotes.map((c) => ({ ...c }))
});
export {
  ANIM_MAX_BYTES as A,
  eventMods as B,
  keyboardTriggers as C,
  DEFAULT_CLICK_PING as D,
  EMOTE_DURATION_S as E,
  FALLBACK_TEXTURE as F,
  triggerVk as G,
  HOTKEY_PRIMARY_MODS as H,
  INPUT_MAX_BYTES as I,
  vkLabel as J,
  triggerLabel as K,
  LIMITS as L,
  sameTrigger as M,
  emoteName as N,
  MAX_CUSTOM_EMOTES as O,
  DEFAULT_EMOTE_WHEEL as P,
  hotkeyLabel as Q,
  resolveLang as R,
  STILL_MAX_BYTES as S,
  TAG_COLORS as T,
  UNSAFE_TRIGGER_VKS as U,
  ALL_PINGS as V,
  WHEEL_SLOTS as W,
  hotkeyParts as X,
  DEFAULT_WHEEL as Y,
  LANGUAGE_NAMES as Z,
  LANGUAGE_PREFS as _,
  emoteIconUrl as a,
  pingById as b,
  allSoundNames as c,
  EMOTE_CATALOG as d,
  emoteAnimUrl as e,
  emoteSoundUrl as f,
  TICK_SOUND as g,
  catalogEmote as h,
  isBundledEmote as i,
  customHash as j,
  customAnimUrl as k,
  customStillUrl as l,
  DEFAULT_CLICK_EMOTE as m,
  allTextureNames as n,
  overlaySettings as o,
  pingsFor as p,
  allEmoteAssetFiles as q,
  DEFAULT_SETTINGS as r,
  soundUrl as s,
  textureUrl as t,
  strings as u,
  INPUT_MAX_SIDE as v,
  ANIM_MAX_SIDE as w,
  STILL_SIDE as x,
  STILL_FALLBACK_SIDE as y,
  codeToVk as z
};
