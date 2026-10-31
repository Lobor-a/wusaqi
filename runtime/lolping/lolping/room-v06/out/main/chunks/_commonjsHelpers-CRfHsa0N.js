"use strict";
const path = require("node:path");
const node_crypto = require("node:crypto");
const promises = require("node:fs/promises");
const net = require("node:net");
const os = require("node:os");
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
const posixQuote = (v) => `'${v.replace(/'/g, "'\\''")}'`;
const tomlString = (v) => JSON.stringify(v);
const tomlKey = (k) => /^[A-Za-z0-9_-]+$/.test(k) ? k : tomlString(k);
const AGENT_PRESET_IDS = [
  "claude",
  "dsh",
  "codex",
  "gemini",
  "qwen",
  "copilot",
  "cursor",
  "opencode",
  "kimi",
  "auggie",
  "goose",
  "droid",
  "qoder",
  "kiro"
];
const CLIENT_MARKS = [
  ["claude-code", "claude"],
  ["dsh-mcp-client", "dsh"],
  ["codex", "codex"],
  ["gemini", "gemini"],
  ["qwen", "qwen"],
  ["copilot", "copilot"],
  ["cursor", "cursor"],
  ["opencode", "opencode"],
  ["kimi", "kimi"],
  ["auggie", "auggie"],
  ["goose", "goose"],
  ["droid", "droid"],
  ["factory", "droid"],
  ["qoder", "qoder"],
  ["kiro", "kiro"]
];
function presetForClient(name) {
  const n = name.toLowerCase();
  return CLIENT_MARKS.find(([mark]) => n.includes(mark))?.[1] ?? null;
}
const DISPLAY_TOOLS = ["say", "ping", "emote", "answer"];
function agentPrompt(askDir) {
  return `lolPing asks you something. Read ask.md in ${askDir}, look at the images it names, and answer only with the lolping tools.`;
}
function jsonLine(line) {
  const text2 = line.trim();
  if (!text2.startsWith("{")) return null;
  try {
    const value = JSON.parse(text2);
    return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}
function text$1(v) {
  return typeof v === "string" && v !== "" ? v : void 0;
}
function obj(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v) ? v : {};
}
function parsed(session, error) {
  return {
    ...session !== void 0 ? { session } : {},
    ...error !== void 0 ? { error } : {}
  };
}
function sessionIdLine(line) {
  const o = jsonLine(line);
  return o ? parsed(text$1(o.session_id)) : {};
}
function initLine(line) {
  const o = jsonLine(line);
  return o && (o.type === "init" || o.subtype === "init") ? parsed(text$1(o.session_id)) : {};
}
const noParse = () => ({});
const noEnv = () => ({});
const noConfig = () => null;
function stdioConfig(s, extra = {}) {
  return JSON.stringify({
    mcpServers: {
      lolping: { type: "stdio", command: s.bridge.command, args: s.bridge.args, env: s.bridge.env, ...extra }
    }
  });
}
function settingsConfig(s) {
  return JSON.stringify({
    mcpServers: { lolping: { command: s.bridge.command, args: s.bridge.args, env: s.bridge.env } }
  });
}
const withResume = (s, flag) => s.resume === null ? [] : [...flag, s.resume];
function tomlTable$1(env) {
  const pairs = Object.entries(env).map(([k, v]) => `${tomlKey(k)} = ${tomlString(v)}`);
  return pairs.length === 0 ? "{}" : `{ ${pairs.join(", ")} }`;
}
const yamlString = (v) => `'${v.replace(/'/g, "''")}'`;
function dshInsertRows(bridge) {
  const args = bridge.args.length === 0 ? ["        args: []"] : ["        args:", ...bridge.args.map((a) => `          - ${yamlString(a)}`)];
  const env = Object.entries(bridge.env);
  const envRows = env.length === 0 ? ["        env: {}"] : ["        env:", ...env.map(([k, v]) => `          ${yamlString(k)}: ${yamlString(v)}`)];
  return [
    "- insert:",
    "    - id: 'mcp-lolping'",
    "      name: '@deepseek-ai/dsh-mcp-client'",
    "      config:",
    "        serverName: 'lolping'",
    "        transport: 'stdio'",
    `        command: ${yamlString(bridge.command)}`,
    ...args,
    ...envRows
  ];
}
function dshPatch(s) {
  const rows = ["credentials", "authorization", "deepseek-account"].flatMap((id) => [
    `- id: ${yamlString(id)}`,
    "  disabled: false"
  ]);
  return [...rows, ...dshInsertRows(s.bridge), ""].join("\n");
}
const CLAUDE_TOOLS = [...DISPLAY_TOOLS, "look", "read_file", "copy", "paste", "fill", "event", "open"].map((t) => `mcp__lolping__${t}`).join(",");
function claudeParse(line) {
  const o = jsonLine(line);
  if (!o) return {};
  const failed = o.type === "result" && o.is_error === true;
  const error = failed ? text$1(o.result) ?? text$1(o.subtype) ?? "error" : void 0;
  return parsed(text$1(o.session_id), error);
}
function codexParse(line) {
  const o = jsonLine(line);
  if (!o) return {};
  switch (o.type) {
    case "thread.started":
      return parsed(text$1(o.thread_id));
    case "error":
      return parsed(void 0, text$1(o.message));
    case "turn.failed":
      return parsed(void 0, text$1(obj(o.error).message) ?? "error");
    default:
      return {};
  }
}
function dshParse(line) {
  const o = jsonLine(line);
  if (!o) return {};
  if (o.type === "session") return parsed(text$1(o.sessionId));
  if (o.type === "error") return parsed(void 0, text$1(o.message));
  if (o.type === "turn_end") {
    const reason = obj(o.reason);
    if (reason.kind === "error") return parsed(void 0, text$1(reason.message) ?? "error");
  }
  return {};
}
function opencodeParse(line) {
  const o = jsonLine(line);
  return o ? parsed(text$1(o.sessionID)) : {};
}
const STREAM_JSON = ["--output-format", "stream-json"];
const AGENT_PRESETS = {
  claude: {
    id: "claude",
    name: "Claude Code",
    bin: "claude",
    checked: true,
    consent: true,
    mcp: "run",
    approvals: "asks",
    args: (s) => [
      "-p",
      s.prompt,
      "--mcp-config",
      s.mcpConfigPath,
      "--strict-mcp-config",
      "--add-dir",
      s.askDir,
      "--allowedTools",
      CLAUDE_TOOLS,
      "--permission-prompt-tool",
      "mcp__lolping__consent",
      ...STREAM_JSON,
      "--verbose",
      ...withResume(s, ["--resume"])
    ],
    configFile: (s) => stdioConfig(s),
    env: noEnv,
    parse: claudeParse,
    openArgs: (id) => ["--resume", id]
  },
  dsh: {
    id: "dsh",
    name: "DeepSeek Harness",
    bin: "dsh",
    checked: true,
    consent: false,
    mcp: "run",
    approvals: "none",
    args: (s) => [
      "--profile",
      "headless",
      "--json",
      "--patch",
      s.mcpConfigPath,
      ...withResume(s, ["--session-id"]),
      s.prompt
    ],
    configFile: dshPatch,
    env: noEnv,
    parse: dshParse,
    openArgs: (id) => ["tui", "--resume", id]
  },
  codex: {
    id: "codex",
    name: "Codex",
    bin: "codex",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    // Codex has no config-file flag, so the bridge goes in as -c overrides; options come before `resume`.
    args: (s) => [
      "exec",
      "--json",
      "--skip-git-repo-check",
      "-c",
      `mcp_servers.lolping.command=${tomlString(s.bridge.command)}`,
      "-c",
      `mcp_servers.lolping.args=${JSON.stringify(s.bridge.args)}`,
      "-c",
      `mcp_servers.lolping.env=${tomlTable$1(s.bridge.env)}`,
      ...s.resume === null ? [] : ["resume", s.resume],
      s.prompt
    ],
    configFile: noConfig,
    env: noEnv,
    parse: codexParse,
    openArgs: (id) => ["resume", id]
  },
  gemini: {
    id: "gemini",
    name: "Gemini CLI",
    bin: "gemini",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    args: (s) => ["-p", s.prompt, ...STREAM_JSON, ...withResume(s, ["--resume"])],
    configFile: settingsConfig,
    env: (s) => ({ GEMINI_CLI_SYSTEM_SETTINGS_PATH: s.mcpConfigPath }),
    parse: initLine,
    openArgs: (id) => ["--resume", id]
  },
  qwen: {
    id: "qwen",
    name: "Qwen Code",
    bin: "qwen",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    args: (s) => ["-p", s.prompt, ...STREAM_JSON, ...withResume(s, ["--resume"])],
    configFile: settingsConfig,
    env: (s) => ({ QWEN_CODE_SYSTEM_SETTINGS_PATH: s.mcpConfigPath }),
    parse: initLine,
    openArgs: (id) => ["--resume", id]
  },
  copilot: {
    id: "copilot",
    name: "Copilot CLI",
    bin: "copilot",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    args: (s) => [
      "-p",
      s.prompt,
      "--additional-mcp-config",
      `@${s.mcpConfigPath}`,
      "--allow-tool",
      "lolping",
      ...withResume(s, ["--resume"])
    ],
    // Copilot CLI wants an explicit tool list on each server.
    configFile: (s) => stdioConfig(s, { tools: ["*"] }),
    env: noEnv,
    parse: noParse,
    openArgs: (id) => ["--resume", id]
  },
  cursor: {
    id: "cursor",
    name: "Cursor CLI",
    bin: "cursor-agent",
    checked: false,
    consent: false,
    mcp: "user",
    userConfig: "~/.cursor/mcp.json",
    approvals: "own",
    args: (s) => ["-p", s.prompt, ...STREAM_JSON, ...withResume(s, ["--resume"])],
    configFile: noConfig,
    env: noEnv,
    parse: sessionIdLine,
    openArgs: (id) => ["--resume", id]
  },
  opencode: {
    id: "opencode",
    name: "opencode",
    bin: "opencode",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    args: (s) => ["run", s.prompt, "--format", "json", ...withResume(s, ["--session"])],
    configFile: (s) => JSON.stringify({
      mcp: { lolping: { type: "local", command: [s.bridge.command, ...s.bridge.args], environment: s.bridge.env } }
    }),
    env: (s) => ({ OPENCODE_CONFIG: s.mcpConfigPath }),
    parse: opencodeParse,
    openArgs: (id) => ["--session", id]
  },
  kimi: {
    id: "kimi",
    name: "Kimi Code",
    bin: "kimi",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    args: (s) => ["--print", "-c", s.prompt, "--mcp-config-file", s.mcpConfigPath, ...withResume(s, ["-r"])],
    configFile: (s) => stdioConfig(s),
    env: noEnv,
    parse: noParse,
    openArgs: (id) => ["-r", id]
  },
  auggie: {
    id: "auggie",
    name: "Auggie",
    bin: "auggie",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    args: (s) => ["--print", "--quiet", s.prompt, "--mcp-config", s.mcpConfigPath],
    configFile: (s) => stdioConfig(s),
    env: noEnv,
    parse: noParse,
    openArgs: () => []
  },
  goose: {
    id: "goose",
    name: "Goose",
    bin: "goose",
    checked: false,
    consent: false,
    mcp: "run",
    approvals: "own",
    // Goose can't take env through a config, so its extension line carries the bridge's as leading NAME=value words.
    args: (s) => [
      "run",
      "-t",
      s.prompt,
      "--with-extension",
      [
        // Goose reads the extension as one shell-style line; single quotes keep Windows backslashes as they are.
        ...Object.entries(s.bridge.env).map(([k, v]) => `${k}=${posixQuote(v)}`),
        ...[s.bridge.command, ...s.bridge.args].map(posixQuote)
      ].join(" "),
      ...s.resume === null ? [] : ["-r", "--session-id", s.resume]
    ],
    configFile: noConfig,
    env: noEnv,
    parse: noParse,
    openArgs: (id) => ["session", "-r", "--session-id", id]
  },
  droid: {
    id: "droid",
    name: "Droid",
    bin: "droid",
    checked: false,
    consent: false,
    mcp: "user",
    userConfig: "~/.factory/mcp.json",
    approvals: "own",
    args: (s) => ["exec", "-o", "stream-json", ...withResume(s, ["-s"]), s.prompt],
    configFile: noConfig,
    env: noEnv,
    parse: sessionIdLine,
    openArgs: (id) => ["--resume", id]
  },
  qoder: {
    id: "qoder",
    name: "Qoder CLI",
    bin: "qodercli",
    checked: false,
    consent: false,
    mcp: "user",
    approvals: "own",
    args: (s) => ["-p", s.prompt, ...STREAM_JSON],
    configFile: noConfig,
    env: noEnv,
    parse: noParse,
    openArgs: (id) => ["--resume", id]
  },
  kiro: {
    id: "kiro",
    name: "Kiro CLI",
    bin: "kiro-cli",
    checked: false,
    consent: false,
    mcp: "user",
    userConfig: "~/.kiro/settings/mcp.json",
    approvals: "own",
    args: (s) => ["chat", "--no-interactive", ...withResume(s, ["--resume-id"]), s.prompt],
    configFile: noConfig,
    env: noEnv,
    parse: noParse,
    openArgs: (id) => ["chat", "--resume-id", id]
  }
};
const platformOf = (nodePlatform) => nodePlatform === "darwin" ? "mac" : nodePlatform === "linux" ? "linux" : "win";
const everywhere = (path2) => ({ win: path2, mac: path2, linux: path2 });
const CONNECT_APPS = [
  {
    id: "claude-desktop",
    shape: "mcpServers",
    file: {
      win: "%APPDATA%\\Claude\\claude_desktop_config.json",
      mac: "~/Library/Application Support/Claude/claude_desktop_config.json",
      linux: "~/.config/Claude/claude_desktop_config.json"
    }
  },
  { id: "codex", shape: "toml", file: everywhere("~/.codex/config.toml") },
  { id: "cursor", shape: "mcpServers", file: everywhere("~/.cursor/mcp.json") },
  { id: "vscode", shape: "servers", page: "vscode" },
  {
    id: "windsurf",
    shape: "mcpServers",
    file: {
      win: "%APPDATA%\\devin\\mcp_config.json",
      mac: "~/.config/devin/mcp_config.json",
      linux: "~/.config/devin/mcp_config.json"
    }
  },
  { id: "antigravity", shape: "mcpServers", page: "antigravity" },
  { id: "zed", shape: "context_servers", file: everywhere("~/.config/zed/settings.json") },
  { id: "kiro", shape: "mcpServers", file: everywhere("~/.kiro/settings/mcp.json") },
  { id: "trae", shape: "mcpServers", page: "theirSettings" },
  { id: "jetbrains", shape: "mcpServers", page: "jetbrains" },
  { id: "cline", shape: "mcpServers", page: "extension" },
  { id: "dsh", shape: "dshPatch", file: everywhere("~/.dsh/profiles/desktop/cordis.patch.yml") },
  { id: "goose", shape: "gooseLine", page: "goose" },
  { id: "cherry", shape: "mcpServers", page: "cherryLm" },
  { id: "gemini", shape: "mcpServers", file: everywhere("~/.gemini/settings.json, ~/.qwen/settings.json") },
  { id: "claude-code", shape: "claudeCodeLine", page: "claudeCode" }
];
function mcpServersJson(b) {
  return JSON.stringify({ mcpServers: { lolping: b } }, null, 2);
}
function tomlTable(b) {
  const env = Object.entries(b.env).map(([k, v]) => `${tomlKey(k)} = ${tomlString(v)}`);
  return [
    "[mcp_servers.lolping]",
    `command = ${tomlString(b.command)}`,
    `args = [${b.args.map(tomlString).join(", ")}]`,
    ...env.length === 0 ? [] : ["", "[mcp_servers.lolping.env]", ...env],
    ""
  ].join("\n");
}
function shellWord(platform, v) {
  if (platform !== "win") return /^[\w@%+=:,./-]+$/.test(v) ? v : posixQuote(v);
  if (/^[\w@+=:,./\\-]+$/.test(v)) return v;
  return `"${v.replace(/(\\*)"/g, '$1$1\\"').replace(/(\\+)$/, "$1$1")}"`;
}
const envPairs = (b) => Object.entries(b.env).map(([k, v]) => `${k}=${v}`);
function connectSnippet(shape, b, platform, envLabel) {
  switch (shape) {
    case "mcpServers":
      return mcpServersJson(b);
    case "servers":
      return JSON.stringify({ servers: { lolping: { type: "stdio", ...b } } }, null, 2);
    case "context_servers":
      return JSON.stringify(
        { context_servers: { lolping: { command: { path: b.command, args: b.args, env: b.env } } } },
        null,
        2
      );
    case "toml":
      return tomlTable(b);
    case "dshPatch":
      return [...dshInsertRows(b), ""].join("\n");
    case "gooseLine": {
      const vars = envPairs(b);
      return [[b.command, ...b.args].map(posixQuote).join(" "), ...vars.length > 0 ? ["", envLabel, ...vars] : []].join("\n");
    }
    case "claudeCodeLine":
      return mcpAddLine("claude", b, platform);
  }
}
function mcpAddLine(bin, b, platform) {
  return [
    `${bin} mcp add lolping`,
    ...envPairs(b).map((pair) => `-e ${shellWord(platform, pair)}`),
    "--",
    ...[b.command, ...b.args].map((w) => shellWord(platform, w))
  ].join(" ");
}
const productName = "lolPing";
const version = "0.6.0";
const pkg = {
  productName,
  version
};
function bridgeCommand(o) {
  const env = { ELECTRON_RUN_AS_NODE: "1", LOLPING_PIPE: o.pipe, LOLPING_DATA: o.dataDir };
  if (o.ask !== null) env.LOLPING_ASK = o.ask;
  return { command: o.execPath, args: [o.bridgeJs], env };
}
function userConfigSnippet(o) {
  return mcpServersJson(bridgeCommand({ ...o, ask: null }));
}
function dataDirFor(platform, env, home) {
  if (platform === "win") {
    return path.win32.join(env.APPDATA || path.win32.join(home, "AppData", "Roaming"), pkg.productName);
  }
  if (platform === "mac") return path.posix.join(home, "Library", "Application Support", pkg.productName);
  return path.posix.join(env.XDG_CONFIG_HOME || path.posix.join(home, ".config"), pkg.productName);
}
const BRIDGE_VERSION = 1;
const BRIDGE_LINE_MAX = 4 * 1024 * 1024;
const CLIENT_NAME_MAX = 64;
const CLIENT_VERSION_MAX = 32;
const ASK_MAX = 128;
const encodeLine = (m) => `${JSON.stringify(m)}
`;
const TOKEN_RE = /^[0-9a-f]{64}$/;
const TOOL_NAME_RE = /^[a-z_]{1,32}$/;
const ASK_RE = /^[A-Za-z0-9-]+\.[0-9a-f]{32}$/;
const BASE64_RE = /^[A-Za-z0-9+/=]*$/;
const isRecord$1 = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const isId = (v) => Number.isSafeInteger(v) && v >= 0;
const isShort = (v, max) => typeof v === "string" && v.length > 0 && v.length <= max;
function parseObject(line) {
  if (line.length > BRIDGE_LINE_MAX) return null;
  let v;
  try {
    v = JSON.parse(line);
  } catch {
    return null;
  }
  return isRecord$1(v) ? v : null;
}
function parseToApp(line) {
  const o = parseObject(line);
  if (!o) return null;
  switch (o.t) {
    case "hello": {
      const { v, token, ask, client } = o;
      if (!Number.isSafeInteger(v) || v < 1) return null;
      if (typeof token !== "string" || !TOKEN_RE.test(token)) return null;
      if (ask !== null && (typeof ask !== "string" || ask.length > ASK_MAX || !ASK_RE.test(ask))) return null;
      if (!isRecord$1(client) || !isShort(client.name, CLIENT_NAME_MAX) || !isShort(client.version, CLIENT_VERSION_MAX)) {
        return null;
      }
      return { t: "hello", v, token, ask, client: { name: client.name, version: client.version } };
    }
    case "list":
      return isId(o.id) ? { t: "list", id: o.id } : null;
    case "call":
      if (!isId(o.id) || typeof o.name !== "string" || !TOOL_NAME_RE.test(o.name)) return null;
      return { t: "call", id: o.id, name: o.name, args: o.args };
    default:
      return null;
  }
}
function parseToolDef(v) {
  if (!isRecord$1(v) || typeof v.name !== "string" || !TOOL_NAME_RE.test(v.name)) return null;
  if (typeof v.description !== "string" || !isRecord$1(v.parameters)) return null;
  return { name: v.name, description: v.description, parameters: v.parameters };
}
function parseContent(v) {
  if (!isRecord$1(v)) return null;
  if ("text" in v) return typeof v.text === "string" && !("image" in v) ? { text: v.text } : null;
  const img = v.image;
  if (!isRecord$1(img) || img.mime !== "image/jpeg" && img.mime !== "image/png") return null;
  if (typeof img.data !== "string" || !BASE64_RE.test(img.data)) return null;
  return { image: { mime: img.mime, data: img.data } };
}
function parseFromApp(line) {
  const o = parseObject(line);
  if (!o) return null;
  switch (o.t) {
    case "tools": {
      if (!isId(o.id) || !Array.isArray(o.tools)) return null;
      const tools = o.tools.map(parseToolDef);
      return tools.every((d) => d !== null) ? { t: "tools", id: o.id, tools } : null;
    }
    case "result": {
      if (!isId(o.id) || !Array.isArray(o.content) || typeof o.isError !== "boolean") return null;
      const content = o.content.map(parseContent);
      return content.every((c) => c !== null) ? { t: "result", id: o.id, content, isError: o.isError } : null;
    }
    case "bye":
      return o.reason === "token" || o.reason === "version" || o.reason === "over" ? { t: "bye", reason: o.reason } : null;
    default:
      return null;
  }
}
const HELLO_DEADLINE_MS = 2e3;
const TOKEN_BYTES = 32;
const PIPE_NAME_HEX = 16;
const SOCKET_PATH_MAX = { mac: 103, linux: 107 };
const FAILED_CALL = [{ text: "lolPing failed to run that." }];
function bridgeLocation(platform, userData, username, around = {}) {
  if (platform === "win") {
    const id2 = node_crypto.createHash("sha256").update(username).digest("hex").slice(0, PIPE_NAME_HEX);
    return { path: `\\\\.\\pipe\\lolping-${id2}`, privateDir: null };
  }
  const inUserData = path.join(userData, "mcp.sock");
  if (Buffer.byteLength(inUserData) <= SOCKET_PATH_MAX[platform]) return { path: inUserData, privateDir: null };
  const tmp = around.tmp ?? os.tmpdir();
  const id = node_crypto.createHash("sha256").update(JSON.stringify([username, userData])).digest("hex").slice(0, PIPE_NAME_HEX);
  if (platform === "mac") return { path: path.join(tmp, `lolping-${id}.sock`), privateDir: null };
  const runtime = "runtimeDir" in around ? around.runtimeDir : process.env.XDG_RUNTIME_DIR;
  if (runtime !== void 0 && runtime !== "" && path.isAbsolute(runtime)) {
    return { path: path.join(runtime, `lolping-${id}.sock`), privateDir: null };
  }
  const uid = "uid" in around ? around.uid ?? null : process.getuid?.() ?? null;
  const dir = path.join(tmp, `lolping-${uid ?? id}`);
  return { path: path.join(dir, `${id}.sock`), privateDir: dir };
}
const bridgePath = (platform, userData, username, around) => bridgeLocation(platform, userData, username, around).path;
async function ensurePrivateDir(dir, uid = process.getuid?.() ?? null) {
  try {
    await promises.mkdir(dir, { mode: 448 });
  } catch (e) {
    if (e.code !== "EEXIST") throw e;
  }
  const info = await promises.lstat(dir);
  if (!info.isDirectory() || uid !== null && info.uid !== uid || (info.mode & 511) !== 448) {
    throw new Error(`${dir} is not a private folder of this user`);
  }
}
async function writeTokenFile(file, token) {
  if (platformOf(process.platform) !== "win") {
    await promises.chmod(file, 384).catch((e) => {
      if (e.code !== "ENOENT") throw e;
    });
  }
  await promises.writeFile(file, token, { mode: 384 });
}
const sameToken = (given, expected) => {
  const a = Buffer.from(given, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && node_crypto.timingSafeEqual(a, b);
};
class BridgeServer {
  constructor(deps) {
    this.deps = deps;
  }
  deps;
  server = null;
  token = "";
  sockets = /* @__PURE__ */ new Set();
  get connections() {
    return this.sockets.size;
  }
  async start() {
    this.token = this.deps.random(TOKEN_BYTES).toString("hex");
    await this.deps.writeToken(this.deps.tokenFile, this.token);
    const posix = platformOf(process.platform) !== "win";
    if (posix && this.deps.privateDir) await ensurePrivateDir(this.deps.privateDir);
    if (posix) await promises.rm(this.deps.path, { force: true });
    const server = net.createServer((socket) => this.accept(socket));
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(this.deps.path, () => {
        server.off("error", reject);
        resolve();
      });
    });
    server.on("error", (err) => console.warn("[teammate] bridge:", err));
    this.server = server;
    if (posix) await promises.chmod(this.deps.path, 384);
  }
  async stop() {
    const server = this.server;
    this.server = null;
    const closed = [...this.sockets].map((s) => new Promise((resolve) => {
      s.once("close", () => resolve());
      s.destroy();
    }));
    if (server) await new Promise((resolve) => server.close(() => resolve()));
    await Promise.all(closed);
  }
  accept(socket) {
    this.sockets.add(socket);
    socket.setEncoding("utf8");
    let session = null;
    let buffered = "";
    let finished = false;
    const pending = /* @__PURE__ */ new Set();
    const send = (m) => {
      if (!socket.destroyed) socket.write(encodeLine(m));
    };
    const bye = (reason) => {
      send({ t: "bye", reason });
      socket.end();
      finished = true;
    };
    const helloTimer = setTimeout(() => socket.destroy(), HELLO_DEADLINE_MS);
    const handleLine = (line) => {
      const m = parseToApp(line);
      if (!m) return void socket.destroy();
      if (!session) {
        if (m.t !== "hello") return void socket.destroy();
        if (!sameToken(m.token, this.token)) return bye("token");
        if (m.v !== BRIDGE_VERSION) return bye("version");
        clearTimeout(helloTimer);
        session = { ask: m.ask, client: m.client };
        this.deps.handler.hello(session);
        return;
      }
      const s = session;
      if (m.t === "hello") return void socket.destroy();
      if (m.t === "list") {
        let tools;
        try {
          tools = this.deps.handler.list(s);
        } catch {
          return void socket.destroy();
        }
        send({ t: "tools", id: m.id, tools });
        return;
      }
      const abort = new AbortController();
      pending.add(abort);
      void Promise.resolve().then(() => this.deps.handler.call(s, m.name, m.args, abort.signal)).then(
        (r) => {
          try {
            send({ t: "result", id: m.id, content: r.content, isError: r.isError });
          } catch (err) {
            console.warn("[teammate] bridge:", err);
            send({ t: "result", id: m.id, content: FAILED_CALL, isError: true });
          }
        },
        () => send({ t: "result", id: m.id, content: FAILED_CALL, isError: true })
      ).finally(() => pending.delete(abort));
    };
    socket.on("data", (chunk) => {
      if (finished) return;
      buffered += chunk;
      let nl = buffered.indexOf("\n");
      while (nl !== -1 && !finished && !socket.destroyed) {
        const line = buffered.slice(0, nl);
        buffered = buffered.slice(nl + 1);
        handleLine(line);
        nl = buffered.indexOf("\n");
      }
      if (buffered.length > BRIDGE_LINE_MAX) socket.destroy();
    });
    socket.on("error", () => void 0);
    socket.on("close", () => {
      clearTimeout(helloTimer);
      for (const a of pending) a.abort();
      pending.clear();
      this.sockets.delete(socket);
    });
  }
}
const TABLE_MAX = { rows: 50, cols: 20, cell: 1e3 };
function cellText(value) {
  if (value === null || value === void 0) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return null;
}
function cutCell(text2) {
  if (text2.length <= TABLE_MAX.cell) return text2;
  const cut = text2.slice(0, TABLE_MAX.cell);
  return /[\uD800-\uDBFF]$/.test(cut) ? cut.slice(0, -1) : cut;
}
function normalizeTable(rows) {
  if (!Array.isArray(rows) || rows.length === 0 || rows.length > TABLE_MAX.rows) return null;
  const table = [];
  let width = 0;
  for (const row of rows) {
    if (!Array.isArray(row) || row.length > TABLE_MAX.cols) return null;
    const cells = [];
    for (const value of row) {
      const text2 = cellText(value);
      if (text2 === null) return null;
      cells.push(cutCell(text2));
    }
    width = Math.max(width, cells.length);
    table.push(cells);
  }
  if (width === 0) return null;
  return table.map((cells) => [...cells, ...Array(width - cells.length).fill("")]);
}
function tableTsv(rows) {
  return rows.map((row) => `${row.map((c) => c.replace(/[\t\r\n]+/g, " ")).join("	")}\r
`).join("");
}
const SAME_CELL_BREAK = '<br style="mso-data-placement:same-cell">';
const AS_TEXT = ` style="mso-number-format:'\\@'"`;
function escapeHtml(text2) {
  return text2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function htmlCell(tag, cell) {
  const asText = /^0\d/.test(cell) || /^\d{16,}$/.test(cell);
  const body = escapeHtml(cell).replace(/\r\n|\r|\n/g, SAME_CELL_BREAK);
  return `<${tag}${asText ? AS_TEXT : ""}>${body}</${tag}>`;
}
function tableHtml(rows) {
  const body = rows.map((row, i) => `<tr>${row.map((c) => htmlCell(i === 0 ? "th" : "td", c)).join("")}</tr>`).join("");
  return `<table>${body}</table>`;
}
const MINUTE = 6e4;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WHEN = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/;
function parseWhen(text2) {
  const m = WHEN.exec(text2);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const allDay = m[4] === void 0;
  const [h, mi] = allDay ? [0, 0] : [Number(m[4]), Number(m[5])];
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  const back = new Date(wall);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) return null;
  if (back.getUTCHours() !== h || back.getUTCMinutes() !== mi) return null;
  return { wall, allDay };
}
const pad = (n, len = 2) => String(n).padStart(len, "0");
function utcStamp(ms) {
  const d = new Date(ms);
  const date = `${pad(d.getUTCFullYear(), 4)}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  return `${date}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}
function dateStamp(ms) {
  return utcStamp(ms).slice(0, 8);
}
function wallToUtc(wall, zoneOffset) {
  const first = wall - zoneOffset(new Date(wall)) * MINUTE;
  return wall - zoneOffset(new Date(first)) * MINUTE;
}
function escapeText(text2) {
  return text2.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
}
const FOLD_OCTETS = 75;
const encoder = new TextEncoder();
function fold(line) {
  const out = [];
  let current = "";
  let used = 0;
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    if (used + size > FOLD_OCTETS) {
      out.push(current);
      current = " ";
      used = 1;
    }
    current += ch;
    used += size;
  }
  out.push(current);
  return out;
}
function eventIcs(e, opts) {
  if (e.title.trim() === "") return null;
  const start = parseWhen(e.start);
  if (!start) return null;
  let end = null;
  if (e.end !== void 0 && e.end !== "") {
    end = parseWhen(e.end);
    if (!end || end.allDay !== start.allDay || end.wall < start.wall) return null;
  }
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//lolPing//teammate//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${utcStamp(opts.now)}`
  ];
  if (start.allDay) {
    lines.push(`DTSTART;VALUE=DATE:${dateStamp(start.wall)}`);
    lines.push(`DTEND;VALUE=DATE:${dateStamp((end ?? start).wall + DAY)}`);
  } else {
    const from = wallToUtc(start.wall, opts.zoneOffset);
    lines.push(`DTSTART:${utcStamp(from)}`);
    lines.push(`DTEND:${utcStamp(end ? wallToUtc(end.wall, opts.zoneOffset) : from + HOUR)}`);
  }
  lines.push(`SUMMARY:${escapeText(e.title)}`);
  if (e.location) lines.push(`LOCATION:${escapeText(e.location)}`);
  if (e.notes) lines.push(`DESCRIPTION:${escapeText(e.notes)}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return `${lines.flatMap(fold).join("\r\n")}\r
`;
}
const MAX_PINGS = 6;
const MAX_EMOTES = 1;
const MAX_SAY = 600;
const MAX_ANSWER = 2e4;
const MAX_LABEL = 20;
const MAX_SEARCH = 200;
const MAX_COPY = 2e4;
const MAX_PASTE = 2e4;
const MAX_FILL_FIELDS = 60;
const MAX_FILL_VALUE = 2e3;
const MAX_EVENT_TITLE = 200;
const MAX_EVENT_LOCATION = 200;
const MAX_EVENT_NOTES = 2e3;
const MAX_URL = 2e3;
const MAX_OPENS = 3;
const MATE_PINGS = [
  "danger",
  "assist",
  "missing",
  "needvision",
  "push",
  "allin",
  "enemyvision",
  "bait",
  "visioncleared",
  "generic"
];
const POINT_PROPS = {
  x: { type: "number", description: "Horizontal position in overview image pixels, on the exact element you mean." },
  y: { type: "number", description: "Vertical position in overview image pixels, on the exact element you mean." },
  spot: { type: "integer", description: "Number of one of the user's spots, instead of x and y." }
};
function toolDefs(opts) {
  const spotNote = opts.spots > 0 ? ` The user marked ${opts.spots} spot${opts.spots === 1 ? "" : "s"}.` : "";
  const defs = [
    {
      name: "say",
      description: "Say one short line to the user in a speech bubble.",
      parameters: { type: "object", properties: { text: { type: "string" } }, required: ["text"] }
    },
    {
      name: "ping",
      description: `Place a League ping on the screen at a point.${spotNote}`,
      parameters: {
        type: "object",
        properties: {
          type: { type: "string", enum: MATE_PINGS },
          ...POINT_PROPS,
          label: { type: "string", description: `A short label, at most ${MAX_LABEL} characters.` },
          order: { type: "integer", description: "Place pings with a lower order first." }
        },
        required: ["type"]
      }
    }
  ];
  if (opts.emotes) {
    defs.push({
      name: "emote",
      description: "Show an emote at a point. Use at most one.",
      parameters: {
        type: "object",
        properties: { slug: { type: "string", enum: EMOTE_CATALOG.map((e) => e.slug) }, ...POINT_PROPS },
        required: ["slug"]
      }
    });
  }
  defs.push({
    name: "answer",
    description: "Give a longer answer in Markdown, shown in a card.",
    parameters: { type: "object", properties: { markdown: { type: "string" } }, required: ["markdown"] }
  });
  if (opts.look) {
    defs.push({
      name: "look",
      description: "Get a closer, zoomed view of a rectangle of the overview, for a detail you can't read in the images.",
      parameters: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
          w: { type: "number", description: "Width in overview pixels." },
          h: { type: "number", description: "Height in overview pixels." }
        },
        required: ["x", "y", "w", "h"]
      }
    });
  }
  if (opts.file) {
    defs.push({
      name: "read_file",
      description: "Read more of the open file: some pages, or the passages that match a search. Give one of the two.",
      parameters: {
        type: "object",
        properties: {
          pages: { type: "string", description: 'Pages to read, 1-based: "3" or "3-5".' },
          search: { type: "string", description: `Words to look for in the file, at most ${MAX_SEARCH} characters.` }
        }
      }
    });
  }
  if (opts.kind === "grab" || opts.kind === "act") {
    defs.push({
      name: "copy",
      description: "Put text or a table on the clipboard at once. Give `text`, or `table` for a table.",
      parameters: {
        type: "object",
        properties: {
          text: { type: "string", description: `The exact text, at most ${MAX_COPY} characters.` },
          table: {
            type: "array",
            description: `A table as rows of cells, at most ${TABLE_MAX.rows} rows of ${TABLE_MAX.cols} cells.`,
            items: { type: "array", items: { type: "string" } }
          }
        }
      }
    });
  }
  if (opts.kind === "grab") {
    defs.push({
      name: "event",
      description: 'Offer a calendar event for a date or an event on the screen, after the user agrees. Times are local, "YYYY-MM-DDTHH:mm". Give just a date, "YYYY-MM-DD", for an all-day event; then `end` is the last day of the event, inclusive.',
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: `At most ${MAX_EVENT_TITLE} characters.` },
          start: { type: "string", description: '"YYYY-MM-DDTHH:mm", or "YYYY-MM-DD" for an all-day event.' },
          end: { type: "string", description: "The same format as start. Leave it out when the screen gives no end." },
          location: { type: "string", description: `At most ${MAX_EVENT_LOCATION} characters.` },
          notes: { type: "string", description: `At most ${MAX_EVENT_NOTES} characters.` }
        },
        required: ["title", "start"]
      }
    });
  }
  if (opts.kind === "act") {
    defs.push({
      name: "paste",
      description: "Paste text into the text field or editor the user pinged, after the user agrees. Use at most one. An insert adds only the new text at the caret: never repeat text that is already there.",
      parameters: {
        type: "object",
        properties: {
          text: { type: "string", description: `The finished text, at most ${MAX_PASTE} characters.` },
          // With nothing selected a replace can only be copied instead, so the model isn't offered one.
          mode: opts.selection ? {
            type: "string",
            enum: ["insert", "replace"],
            description: "`insert` at the caret, or `replace` to overwrite the text that is selected."
          } : { type: "string", enum: ["insert"], description: "Nothing is selected: the text goes in at the caret." }
        },
        required: ["text", "mode"]
      }
    });
  }
  if (opts.kind === "act" && opts.form) {
    defs.push({
      name: "fill",
      description: 'Fill form fields from the list of form fields; the user sees them first. Use at most one. A checkbox value is exactly `on` or `off`. A radio button is chosen by giving its id any value. Never fill a field marked "secure, never fill".',
      parameters: {
        type: "object",
        properties: {
          fields: {
            type: "array",
            description: `At most ${MAX_FILL_FIELDS} fields.`,
            items: {
              type: "object",
              properties: {
                id: { type: "string", description: "The id from the form fields list." },
                value: { type: "string", description: `At most ${MAX_FILL_VALUE} characters.` }
              },
              required: ["id", "value"]
            }
          }
        },
        required: ["fields"]
      }
    });
  }
  defs.push({
    name: "open",
    description: "Open a web link in the browser, after the user agrees. Only http and https links.",
    parameters: { type: "object", properties: { url: { type: "string" } }, required: ["url"] }
  });
  return defs;
}
function visitorToolDefs(emotes) {
  const shown = new Set(DISPLAY_TOOLS);
  return toolDefs({ emotes, spots: 0, file: false, look: false, kind: "answer", form: false, selection: false }).filter((d) => shown.has(d.name)).map((d) => {
    const { properties, ...rest } = d.parameters;
    if (!isRecord(properties)) return d;
    const { x: _x, y: _y, spot: _spot, ...kept } = properties;
    return { ...d, parameters: { ...rest, properties: kept } };
  });
}
const CONSENT_TOOL = {
  name: "consent",
  description: "lolPing's permission prompt: Claude Code asks it before using a tool. The user decides on a card.",
  parameters: {
    type: "object",
    properties: {
      tool_name: { type: "string", description: "The tool that wants to run." },
      input: { type: "object", description: "The input the tool would run with." },
      tool_use_id: { type: "string" }
    },
    required: ["tool_name", "input"]
  }
};
const CONSENT_TOOL_NAME = /^[A-Za-z0-9_.-]{1,64}$/;
function parseConsent(args) {
  if (!isRecord(args) || typeof args.tool_name !== "string" || !CONSENT_TOOL_NAME.test(args.tool_name)) return null;
  return isRecord(args.input) ? { tool: args.tool_name, input: args.input } : null;
}
const isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const num = (v) => typeof v === "number" && Number.isFinite(v) ? v : null;
function text(v, max) {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max).trim();
  return t ? t : null;
}
function target(a) {
  const x = num(a.x);
  const y = num(a.y);
  if (x !== null && y !== null) return { x, y };
  const spot = num(a.spot ?? a.mark);
  return spot !== null && Number.isInteger(spot) && spot >= 1 ? { spot } : null;
}
function pageRange(v) {
  if (typeof v === "number") return Number.isInteger(v) && v >= 1 ? { from: v, to: v } : null;
  const m = typeof v === "string" ? /^\s*(\d+)\s*(?:-\s*(\d+)\s*)?$/.exec(v) : null;
  if (!m) return null;
  const from = Number(m[1]);
  const to = m[2] === void 0 ? from : Number(m[2]);
  return from >= 1 && from <= to ? { from, to } : null;
}
function exactText(v, max) {
  return typeof v === "string" && v.trim() !== "" && v.length <= max ? v : null;
}
function optionalText(v, max) {
  if (v === void 0 || v === null) return void 0;
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t === "") return void 0;
  return t.length <= max ? t : null;
}
function fillFields(v) {
  if (!Array.isArray(v) || v.length === 0 || v.length > MAX_FILL_FIELDS) return null;
  const byId = /* @__PURE__ */ new Map();
  for (const f of v) {
    if (!isRecord(f) || typeof f.id !== "string" || f.id === "") return null;
    const value = typeof f.value === "number" && Number.isFinite(f.value) ? String(f.value) : f.value;
    if (typeof value !== "string" || value.length > MAX_FILL_VALUE) return null;
    byId.set(f.id, value);
  }
  return [...byId].map(([id, value]) => ({ id, value }));
}
function eventCall(a) {
  const title = optionalText(a.title, MAX_EVENT_TITLE);
  const end = optionalText(a.end, 40);
  const location = optionalText(a.location, MAX_EVENT_LOCATION);
  const notes = optionalText(a.notes, MAX_EVENT_NOTES);
  if (!title || typeof a.start !== "string" || end === null || location === null || notes === null) return null;
  const event = {
    title,
    start: a.start.trim(),
    ...end !== void 0 ? { end } : {},
    ...location !== void 0 ? { location } : {},
    ...notes !== void 0 ? { notes } : {}
  };
  return eventIcs(event, { uid: "check", now: 0, zoneOffset: () => 0 }) === null ? null : { tool: "event", ...event };
}
function webUrl(v) {
  const t = typeof v === "string" ? v.trim() : "";
  if (t === "" || t.length > MAX_URL) return null;
  try {
    const { protocol } = new URL(t);
    return protocol === "http:" || protocol === "https:" ? t : null;
  } catch {
    return null;
  }
}
function parseToolCall(name, args) {
  let a = args;
  if (typeof a === "string") {
    try {
      a = JSON.parse(a);
    } catch {
      return null;
    }
  }
  if (!isRecord(a)) return null;
  switch (name) {
    case "say": {
      const t = text(a.text, MAX_SAY);
      return t === null ? null : { tool: "say", text: t };
    }
    case "answer": {
      const t = text(a.markdown, MAX_ANSWER);
      return t === null ? null : { tool: "answer", markdown: t };
    }
    case "ping": {
      const type = MATE_PINGS.find((id) => id === a.type);
      const at = target(a);
      if (!type || !at) return null;
      const label = a.label === void 0 ? null : text(a.label, MAX_LABEL);
      const order = a.order === void 0 ? null : num(a.order);
      return {
        tool: "ping",
        type,
        at,
        ...label !== null ? { label } : {},
        ...order !== null ? { order } : {}
      };
    }
    case "emote": {
      const slug = EMOTE_CATALOG.find((e) => e.slug === a.slug)?.slug;
      const at = target(a);
      return slug && at ? { tool: "emote", slug, at } : null;
    }
    case "look": {
      const x = num(a.x);
      const y = num(a.y);
      const w = num(a.w);
      const h = num(a.h);
      if (x === null || y === null || w === null || h === null || w <= 0 || h <= 0) return null;
      return { tool: "look", x, y, w, h };
    }
    case "read_file": {
      const pages = pageRange(a.pages);
      const search = text(a.search, MAX_SEARCH);
      if (!pages && search === null) return null;
      return { tool: "read_file", ...pages ? { pages } : {}, ...search !== null ? { search } : {} };
    }
    case "copy": {
      const table = a.table === void 0 ? null : normalizeTable(a.table);
      if (table) return { tool: "copy", table };
      const t = exactText(a.text, MAX_COPY);
      return t === null ? null : { tool: "copy", text: t };
    }
    case "paste": {
      const t = exactText(a.text, MAX_PASTE);
      const mode = a.mode === void 0 ? "insert" : a.mode;
      return t !== null && (mode === "insert" || mode === "replace") ? { tool: "paste", text: t, mode } : null;
    }
    case "fill": {
      const fields = fillFields(a.fields);
      return fields ? { tool: "fill", fields } : null;
    }
    case "event":
      return eventCall(a);
    case "open": {
      const url = webUrl(a.url);
      return url === null ? null : { tool: "open", url };
    }
    default:
      return null;
  }
}
function applyLimits(calls) {
  let pings = 0;
  let emotes = 0;
  let pastes = 0;
  let fills = 0;
  let events = 0;
  let opens = 0;
  return calls.filter((c) => {
    if (c.tool === "ping") return pings++ < MAX_PINGS;
    if (c.tool === "emote") return emotes++ < MAX_EMOTES;
    if (c.tool === "paste") return pastes++ < 1;
    if (c.tool === "fill") return fills++ < 1;
    if (c.tool === "event") return events++ < 1;
    if (c.tool === "open") return opens++ < MAX_OPENS;
    return true;
  });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
exports.AGENT_PRESETS = AGENT_PRESETS;
exports.AGENT_PRESET_IDS = AGENT_PRESET_IDS;
exports.BRIDGE_LINE_MAX = BRIDGE_LINE_MAX;
exports.BRIDGE_VERSION = BRIDGE_VERSION;
exports.BridgeServer = BridgeServer;
exports.CONNECT_APPS = CONNECT_APPS;
exports.CONSENT_TOOL = CONSENT_TOOL;
exports.DEFAULT_CLICK_EMOTE = DEFAULT_CLICK_EMOTE;
exports.DEFAULT_EMOTE_WHEEL = DEFAULT_EMOTE_WHEEL;
exports.EMOTE_CATALOG = EMOTE_CATALOG;
exports.MATE_PINGS = MATE_PINGS;
exports.MAX_EMOTES = MAX_EMOTES;
exports.MAX_PINGS = MAX_PINGS;
exports.agentPrompt = agentPrompt;
exports.applyLimits = applyLimits;
exports.bridgeCommand = bridgeCommand;
exports.bridgeLocation = bridgeLocation;
exports.bridgePath = bridgePath;
exports.commonjsGlobal = commonjsGlobal;
exports.connectSnippet = connectSnippet;
exports.dataDirFor = dataDirFor;
exports.encodeLine = encodeLine;
exports.eventIcs = eventIcs;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
exports.mcpAddLine = mcpAddLine;
exports.parseConsent = parseConsent;
exports.parseFromApp = parseFromApp;
exports.parseToolCall = parseToolCall;
exports.pkg = pkg;
exports.platformOf = platformOf;
exports.posixQuote = posixQuote;
exports.presetForClient = presetForClient;
exports.tableHtml = tableHtml;
exports.tableTsv = tableTsv;
exports.toolDefs = toolDefs;
exports.userConfigSnippet = userConfigSnippet;
exports.visitorToolDefs = visitorToolDefs;
exports.writeTokenFile = writeTokenFile;
