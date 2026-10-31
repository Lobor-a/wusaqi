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
const SOUND_MAX_BYTES = 1048576;
const SOUND_MAX_S = 5;
const EMOTE_FX_VARIANTS = 6;
const BY_SLUG = new Map(EMOTE_CATALOG.map((e) => [e.slug, e]));
const catalogEmote = (slug) => BY_SLUG.get(slug);
const isBundledEmote = (v) => typeof v === "string" && BY_SLUG.has(v);
const customHash = (ref) => ref.slice(2);
const emoteAnimUrl = (slug) => `../emotes/${slug}.webp`;
const emoteIconUrl = (slug) => `../emotes/${slug}.png`;
const emoteSoundUrl = (slug) => `../emotes/${slug}.ogg`;
const CUSTOM_EMOTE_URL = "lolping://emotes/";
const customStillUrl = (hash) => `${CUSTOM_EMOTE_URL}${hash}.webp`;
const customAnimUrl = (hash) => `${CUSTOM_EMOTE_URL}${hash}.anim`;
const customSoundUrl = (hash) => `${CUSTOM_EMOTE_URL}${hash}.sound`;
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
  { id: "push", name: "Push", icon: "pingwheel_pushrender", art: ["pingwheel_pushrender"], sound: "SRP_9", color: "#35d27a" },
  // League's upright On My Way is colourblind blue; omw_cyan is it recoloured by tools/extract-assets --derived.
  { id: "omw", name: "On My Way", icon: "omw_cyan", art: ["omw_cyan"], sound: "OnMyWay", color: "#2e8bff" },
  { id: "allin", name: "All In", icon: "png_all_in", art: ["pingwheel_allin_render_01", "pingwheel_allin_render_02"], sound: "SRP_4", color: "#f2b320" },
  { id: "assist", name: "Assist Me", icon: "png_assist_me_128x128", art: ["png_assist_me_128x128"], sound: "ComeHere", color: "#35d27a" },
  { id: "needvision", name: "Need Vision", icon: "mt11_18_vision", art: ["mt11_18_vision"], sound: "SRP_7", color: "#35d27a" },
  { id: "missing", name: "Enemy Missing", icon: "png_enemymissing_128x128", art: ["png_enemymissing_128x128"], sound: "MIA", color: "#f2c518" },
  { id: "enemyvision", name: "Enemy Vision", icon: "pingwheel_enemyvisionrender", art: ["pingwheel_enemyvisionrender"], sound: "AreaIsWarded", color: "#ff3b55" },
  { id: "generic", name: "Generic", icon: "pingwheel_basicpingrender", art: ["pingwheel_basicpingrender"], sound: "Base", color: "#2e8bff" },
  { id: "bait", name: "Bait", icon: "pingwheel_baitrender", art: ["pingwheel_baitrender"], sound: "SRP_11", color: "#efbc12" },
  { id: "visioncleared", name: "Vision Cleared", icon: "pingwheel_visionclearedrender", art: ["pingwheel_visionclearedrender"], sound: "SRP_6", color: "#2b80ff" },
  // Not a League ping: Enemy Missing turned upside down ("¿"), asked for in #24. Older room peers drop it.
  { id: "missingflip", name: "Upside-down Missing", icon: "enemy_missing_flipped", art: ["enemy_missing_flipped"], sound: "MIA", color: "#f2c518" }
];
const DEFAULT_WHEEL = ["danger", "push", "omw", "allin", "assist", "needvision", "missing", "enemyvision"];
const DEFAULT_CLICK_PING = "generic";
const WHEEL_SLOTS = 8;
const TICK_SOUND = "button";
const FALLBACK_TEXTURE = "pingwheel_basicpingrender";
const LOGO_TEXTURE = "generic_ping";
function pingById(id) {
  return ALL_PINGS.find((p) => p.id === id);
}
const isPingId = (v) => typeof v === "string" && pingById(v) !== void 0;
const pingsFor = (ids) => ids.map((id) => pingById(id));
pingsFor(DEFAULT_WHEEL);
const textureUrl = (name) => `../textures/${name}.png`;
const soundUrl = (name) => `../sounds/${name}.wav`;
function allSoundNames() {
  return [.../* @__PURE__ */ new Set([...ALL_PINGS.map((p) => p.sound), TICK_SOUND])];
}
function allTextureNames() {
  return [.../* @__PURE__ */ new Set([...ALL_PINGS.flatMap((p) => [p.icon, ...p.art]), FALLBACK_TEXTURE, LOGO_TEXTURE])];
}
export {
  ANIM_MAX_BYTES as A,
  DEFAULT_EMOTE_WHEEL as B,
  CUSTOM_EMOTE_URL as C,
  DEFAULT_CLICK_PING as D,
  EMOTE_DURATION_S as E,
  FALLBACK_TEXTURE as F,
  ALL_PINGS as G,
  isPingId as H,
  INPUT_MAX_BYTES as I,
  DEFAULT_WHEEL as J,
  LOGO_TEXTURE as L,
  MAX_CUSTOM_EMOTES as M,
  SOUND_MAX_BYTES as S,
  TICK_SOUND as T,
  WHEEL_SLOTS as W,
  emoteAnimUrl as a,
  customStillUrl as b,
  catalogEmote as c,
  customHash as d,
  emoteIconUrl as e,
  pingsFor as f,
  allSoundNames as g,
  EMOTE_CATALOG as h,
  emoteSoundUrl as i,
  isBundledEmote as j,
  customAnimUrl as k,
  allTextureNames as l,
  allEmoteAssetFiles as m,
  customSoundUrl as n,
  SOUND_MAX_S as o,
  pingById as p,
  INPUT_MAX_SIDE as q,
  ANIM_MAX_SIDE as r,
  soundUrl as s,
  textureUrl as t,
  STILL_MAX_BYTES as u,
  STILL_SIDE as v,
  STILL_FALLBACK_SIDE as w,
  EMOTE_FX_VARIANTS as x,
  emoteName as y,
  DEFAULT_CLICK_EMOTE as z
};
