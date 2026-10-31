import { r as reactExports, u as useFluent, a as useEventCallback, K as Keys, R as RootAPI, g as getTabsterOnElement, d as dom, b as augmentAttribute, c as addListener, e as removeListener, W as WeakHTMLElement, T as TabsterPart, M as ModalizerActiveEvent, f as ModalizerInactiveEvent, h as dispatchEvent, D as DummyInputManager, i as DummyInputManagerPriorities, j as getDummyInputContainer, F as FocusedElementState, n as nativeFocus, A as AsyncFocusSources, k as RestorerTypes, l as RestorerRestoreFocusEventName, m as RestorerRestoreFocusEvent, o as createKeyborg, p as disposeKeyborg, q as useTabster, s as useId, t as useTabsterAttributes, v as TABSTER_ATTRIBUTE_NAME, w as requireScheduler, x as useIsomorphicLayoutEffect, y as isHTMLElement$1, z as useMergedRefs, B as createFluentIcon, C as useMotionBehaviourContext, E as useChildElement, G as useMotionImperativeRef, H as useAnimateAtoms, I as useIsReducedMotion, J as createMotionComponent, S as SLOT_ELEMENT_TYPE_SYMBOL, L as SLOT_RENDER_FUNCTION_SYMBOL, N as motionTokens, O as canUseDOM, _ as __styles, P as useFocusVisible, Q as useThemeClassName, U as mergeClasses, V as React, X as requireReactDom, Y as Space, Z as ArrowDown, $ as ArrowUp, a0 as Enter, a1 as Escape, a2 as Home, a3 as End, a4 as PageUp, a5 as PageDown, a6 as Tab, a7 as useControllableState, a8 as always, a9 as getIntrinsicElementProps, aa as mergeCallbacks, ab as jsx, ac as useCustomStyleHook, ad as Checkmark12Filled, ae as optional, af as jsxs, ag as isResolvedShorthand, ah as useFieldControlProps_unstable, ai as ArrowLeft, aj as ArrowRight, ak as useFieldContext_unstable, al as DismissRegular, am as getPartitionedNativeProps, an as __resetStyles, ao as Label, ap as useFocusWithin, aq as useOverrides, ar as ChevronUp16Regular, as as ChevronDown16Regular, at as useFocusFinders, au as getReactElementRef, av as useARIAButtonProps, aw as Dismiss20Regular, ax as jsxRuntimeExports, ay as Switch, az as ChevronDown20Regular, aA as Button, aB as ArrowDownload24Regular, aC as ProgressBar, aD as ArrowSync24Regular, aE as Text, aF as Emoji24Regular, aG as ResizeLarge24Regular, aH as Input, aI as ArrowUp16Regular, aJ as ArrowDown16Regular, aK as Globe24Regular, aL as ClipboardPaste24Regular, aM as PlugConnected24Regular, aN as ShieldKeyhole24Regular, aO as History24Regular, aP as Dismiss24Regular, aQ as Checkbox, aR as Checkmark24Regular, aS as People24Regular, aT as CheckboxChecked24Regular, aU as Chat24Regular, aV as PeopleCommunity24Regular, aW as Delete24Regular, aX as LockClosed24Regular, aY as Warning24Regular, aZ as createLightTheme, a_ as createDarkTheme, a$ as FluentProvider, b0 as webDarkTheme, b1 as webLightTheme, b2 as ArrowMove24Regular, b3 as Power24Regular, b4 as Timer24Regular, b5 as Rocket24Regular, b6 as LocalLanguage24Regular, b7 as clientExports } from "./ProgressBar-D2t9L2tr.js";
import { s as strings, T as TAG_COLORS, t as tagColorCss, b as tagHex, c as tagRgbFromHex, r as readableTagRgb, d as resolveLang, L as LANGUAGE_NAMES, e as LANGUAGE_PREFS } from "./i18n-Bn0BgxO2.js";
import { L as LIMITS, c as codeToVk, d as eventMods, H as HOTKEY_PRIMARY_MODS, k as keyboardTriggers, t as triggerVk, U as UNSAFE_TRIGGER_VKS, v as vkLabel, f as triggerLabel, g as sameTrigger, e as emoteFxContent, h as separateAskKey, M as MAX_RULES, i as canDoubleTap, T as TIMEOUT_DEFAULT_S, j as MAX_FOLDERS, P as PATH_MAX, l as TAG_NAME_MAX, I as INTENT_LABEL_MAX, m as INTENT_INSTRUCTION_MAX, n as isBuiltin, q as featureGroups, r as featureOn, u as hotkeyParts, w as hotkeyLabel } from "./emoteFx-Dz2VkEKA.js";
import { I as INPUT_MAX_BYTES, S as SOUND_MAX_BYTES, o as SOUND_MAX_S, q as INPUT_MAX_SIDE, A as ANIM_MAX_BYTES, r as ANIM_MAX_SIDE, u as STILL_MAX_BYTES, v as STILL_SIDE, w as STILL_FALLBACK_SIDE, x as EMOTE_FX_VARIANTS, E as EMOTE_DURATION_S, h as EMOTE_CATALOG, y as emoteName, e as emoteIconUrl, b as customStillUrl, d as customHash, M as MAX_CUSTOM_EMOTES, z as DEFAULT_CLICK_EMOTE, B as DEFAULT_EMOTE_WHEEL, G as ALL_PINGS, H as isPingId, t as textureUrl, L as LOGO_TEXTURE, D as DEFAULT_CLICK_PING, J as DEFAULT_WHEEL } from "./pings-Ce34JV4E.js";
import { c as clampNameInput } from "./roomProtocol-Drasuf7-.js";
const DEFAULT_ROOM_MEDIA = {
  stun: "stun:stun.l.google.com:19302"
};
const object = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const URL_RE = /^(stun|turn|turns):(?:[a-z0-9.-]+|\[[a-f0-9:]+\])(?::[0-9]{1,5})?(?:\?transport=(?:udp|tcp))?$/i;
function normalizeRoomMedia(raw) {
  const r = object(raw) ? raw : {};
  const url = (v, kind, fallback) => {
    if (v === "") return "";
    const prefix = kind === "turn" ? /^turns?:/ : /^stun:/;
    return typeof v === "string" && v.length <= 256 && URL_RE.test(v) && prefix.test(v) ? v : fallback;
  };
  return {
    enabled: r.enabled === true,
    stun: url(r.stun, "stun", DEFAULT_ROOM_MEDIA.stun),
    turn: url(r.turn, "turn", ""),
    username: typeof r.username === "string" ? r.username.slice(0, 256) : "",
    relayOnly: r.relayOnly === true
  };
}
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
const DISPLAY_TOOLS = ["say", "ping", "emote", "answer"];
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
function text(v) {
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
  return o ? parsed(text(o.session_id)) : {};
}
function initLine(line) {
  const o = jsonLine(line);
  return o && (o.type === "init" || o.subtype === "init") ? parsed(text(o.session_id)) : {};
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
function tomlTable(env) {
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
  const error = failed ? text(o.result) ?? text(o.subtype) ?? "error" : void 0;
  return parsed(text(o.session_id), error);
}
function codexParse(line) {
  const o = jsonLine(line);
  if (!o) return {};
  switch (o.type) {
    case "thread.started":
      return parsed(text(o.thread_id));
    case "error":
      return parsed(void 0, text(o.message));
    case "turn.failed":
      return parsed(void 0, text(obj(o.error).message) ?? "error");
    default:
      return {};
  }
}
function dshParse(line) {
  const o = jsonLine(line);
  if (!o) return {};
  if (o.type === "session") return parsed(text(o.sessionId));
  if (o.type === "error") return parsed(void 0, text(o.message));
  if (o.type === "turn_end") {
    const reason = obj(o.reason);
    if (reason.kind === "error") return parsed(void 0, text(reason.message) ?? "error");
  }
  return {};
}
function opencodeParse(line) {
  const o = jsonLine(line);
  return o ? parsed(text(o.sessionID)) : {};
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
      `mcp_servers.lolping.env=${tomlTable(s.bridge.env)}`,
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
const PUT_ACTIONS = ["paste", "fill", "event", "open"];
const AGENT_MARK = ":agent:";
function parsePermissionKey(key) {
  const mark = key.lastIndexOf(AGENT_MARK);
  if (mark > 0 && key.length > mark + AGENT_MARK.length) {
    return { profileId: key.slice(0, mark), action: "agent", tool: key.slice(mark + AGENT_MARK.length) };
  }
  const at = key.lastIndexOf(":");
  const action = key.slice(at + 1);
  const known = PUT_ACTIONS.find((a) => a === action);
  return at > 0 && known ? { profileId: key.slice(0, at), action: known } : null;
}
const PROVIDERS = [
  { id: "anthropic", name: "Anthropic", group: "cloud", protocol: "anthropic", baseUrl: "https://api.anthropic.com" },
  { id: "deepseek", name: "DeepSeek", group: "cloud", protocol: "openai", baseUrl: "https://api.deepseek.com" },
  {
    id: "doubao",
    name: "Doubao",
    group: "cloud",
    protocol: "openai",
    baseUrl: "https://ark.cn-beijing.volces.com/api/v3"
  },
  { id: "glm", name: "GLM", group: "cloud", protocol: "openai", baseUrl: "https://open.bigmodel.cn/api/paas/v4" },
  {
    id: "gemini",
    name: "Google Gemini",
    group: "cloud",
    protocol: "openai",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai"
  },
  { id: "kimi", name: "Kimi", group: "cloud", protocol: "openai", baseUrl: "https://api.moonshot.cn/v1" },
  { id: "minimax", name: "MiniMax", group: "cloud", protocol: "openai", baseUrl: "https://api.minimaxi.com/v1" },
  { id: "mistral", name: "Mistral", group: "cloud", protocol: "openai", baseUrl: "https://api.mistral.ai/v1" },
  { id: "openai", name: "OpenAI", group: "cloud", protocol: "openai", baseUrl: "https://api.openai.com/v1" },
  { id: "openrouter", name: "OpenRouter", group: "cloud", protocol: "openai", baseUrl: "https://openrouter.ai/api/v1" },
  {
    id: "qwen",
    name: "Qwen",
    group: "cloud",
    protocol: "openai",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  { id: "xai", name: "xAI", group: "cloud", protocol: "openai", baseUrl: "https://api.x.ai/v1" },
  { id: "lmstudio", name: "LM Studio", group: "local", protocol: "openai", baseUrl: "http://localhost:1234/v1" },
  { id: "ollama", name: "Ollama", group: "local", protocol: "openai", baseUrl: "http://localhost:11434/v1" },
  { id: "custom", name: "Custom", group: "cloud", protocol: "openai", baseUrl: "" }
];
const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]"];
function needsKey(p) {
  if (p.provider === "ollama" || p.provider === "lmstudio") return false;
  if (p.provider !== "custom") return true;
  try {
    return !LOCAL_HOSTS.includes(new URL(p.baseUrl).hostname);
  } catch {
    return true;
  }
}
const VISION_PATTERNS = [
  [/gpt-4o|gpt-4\.1|gpt-4\.5|gpt-4-turbo|gpt-4.*vision|gpt-5/, true],
  [/(^|\/)o(1-mini|1-preview|3-mini)/, false],
  [/(^|\/)o(1|3|4)(-|$)/, true],
  [/claude-(3|[4-9]|(opus|sonnet|haiku)-[4-9])/, true],
  [/gemini|gemma-?3/, true],
  [/qwen.*-vl|qvq|qwen.*omni/, true],
  [/doubao.*vision|doubao-seed/, true],
  [/glm-\d(\.\d)?v/, true],
  [/(moonshot|kimi).*vision/, true],
  [/grok.*vision|grok-4/, true],
  [/llava|pixtral|minicpm-v|llama-?3\.2.*vision|llama-?4|deepseek-vl/, true],
  [/gpt-3\.5|gpt-4(-\d{4}|-32k)?$|claude-(2|instant)/, false],
  [/qwen-(max|plus|turbo|long|coder)|qwen3-(max|coder)|qwq/, false],
  [/glm-(4-|4\.[5-7](-|$)|z1)/, false],
  [/moonshot-v1-(\d+k|auto)$|kimi-k2(-|$)/, false],
  [/doubao-(1[-.]5-)?(pro|lite)/, false],
  [/grok-(2|3)(-|$)|grok-code|grok-beta/, false],
  [/codestral|minimax-m\d|abab/, false]
];
function visionGuess(model) {
  const name = model.trim().toLowerCase();
  if (name === "") return null;
  for (const [pattern, vision] of VISION_PATTERNS) if (pattern.test(name)) return vision;
  return null;
}
function placeOnSlot(wheel, id, slot) {
  const from = wheel.indexOf(id);
  if (from >= 0) return swapSlots(wheel, from, slot);
  const next = [...wheel];
  next[slot] = id;
  return next;
}
function swapSlots(wheel, a, b) {
  const next = [...wheel];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}
function dropPatch(wheel, center, src, target) {
  if (target === "center") return src.id === center ? null : { center: src.id };
  if (src.from === "slot") return src.slot === target ? null : { wheel: swapSlots(wheel, src.slot, target) };
  return wheel[target] === src.id ? null : { wheel: placeOnSlot(wheel, src.id, target) };
}
function useBrowserTimer(setTimer, cancelTimer) {
  const id = reactExports.useRef(void 0);
  const set = reactExports.useCallback((fn, delay) => {
    if (id.current !== void 0) {
      cancelTimer(id.current);
    }
    id.current = setTimer(fn, delay);
    return id.current;
  }, [
    cancelTimer,
    setTimer
  ]);
  const cancel = reactExports.useCallback(() => {
    if (id.current !== void 0) {
      cancelTimer(id.current);
      id.current = void 0;
    }
  }, [
    cancelTimer
  ]);
  reactExports.useEffect(() => cancel, [
    cancel
  ]);
  return [
    set,
    cancel
  ];
}
const PortalMountNodeContext = reactExports.createContext(void 0);
PortalMountNodeContext.Provider;
function usePortalMountNode$1() {
  return reactExports.useContext(PortalMountNodeContext);
}
function useFirstMount() {
  const isFirst = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    }
  }, []);
  return isFirst.current;
}
function useForceUpdate() {
  return reactExports.useReducer((x) => x + 1, 0)[1];
}
const DEFAULT_CONTAINS = (parent, child) => !!(parent === null || parent === void 0 ? void 0 : parent.contains(child));
const useOnClickOutside = (options) => {
  const { targetDocument } = useFluent();
  const win = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView;
  const { refs, callback, element, disabled, disabledFocusOnIframe, contains = DEFAULT_CONTAINS } = options;
  const timeoutId = reactExports.useRef(void 0);
  useIFrameFocus({
    element,
    disabled: disabledFocusOnIframe || disabled,
    callback,
    refs,
    contains
  });
  const isMouseDownInsideRef = reactExports.useRef(false);
  const listener = useEventCallback((ev) => {
    if (isMouseDownInsideRef.current) {
      isMouseDownInsideRef.current = false;
      return;
    }
    const target = ev.composedPath()[0];
    const isOutside = refs.every((ref) => !contains(ref.current || null, target));
    if (isOutside && !disabled) {
      callback(ev);
    }
  });
  const handleMouseDown = useEventCallback((ev) => {
    isMouseDownInsideRef.current = refs.some((ref) => contains(ref.current || null, ev.target));
  });
  reactExports.useEffect(() => {
    if (disabled) {
      return;
    }
    let currentEvent = getWindowEvent(win);
    const conditionalHandler = (event) => {
      if (event === currentEvent) {
        currentEvent = void 0;
        return;
      }
      listener(event);
    };
    element === null || element === void 0 ? void 0 : element.addEventListener("click", conditionalHandler, true);
    element === null || element === void 0 ? void 0 : element.addEventListener("touchstart", conditionalHandler, true);
    element === null || element === void 0 ? void 0 : element.addEventListener("contextmenu", conditionalHandler, true);
    element === null || element === void 0 ? void 0 : element.addEventListener("mousedown", handleMouseDown, true);
    timeoutId.current = win === null || win === void 0 ? void 0 : win.setTimeout(() => {
      currentEvent = void 0;
    }, 1);
    return () => {
      element === null || element === void 0 ? void 0 : element.removeEventListener("click", conditionalHandler, true);
      element === null || element === void 0 ? void 0 : element.removeEventListener("touchstart", conditionalHandler, true);
      element === null || element === void 0 ? void 0 : element.removeEventListener("contextmenu", conditionalHandler, true);
      element === null || element === void 0 ? void 0 : element.removeEventListener("mousedown", handleMouseDown, true);
      win === null || win === void 0 ? void 0 : win.clearTimeout(timeoutId.current);
      currentEvent = void 0;
    };
  }, [
    listener,
    element,
    disabled,
    handleMouseDown,
    win
  ]);
};
const getWindowEvent = (target) => {
  if (target) {
    var _target_ownerDocument_defaultView, _target_ownerDocument;
    if (typeof target.window === "object" && target.window === target) {
      return target.event;
    }
    var _target_ownerDocument_defaultView_event;
    return (_target_ownerDocument_defaultView_event = (_target_ownerDocument = target.ownerDocument) === null || _target_ownerDocument === void 0 ? void 0 : (_target_ownerDocument_defaultView = _target_ownerDocument.defaultView) === null || _target_ownerDocument_defaultView === void 0 ? void 0 : _target_ownerDocument_defaultView.event) !== null && _target_ownerDocument_defaultView_event !== void 0 ? _target_ownerDocument_defaultView_event : void 0;
  }
  return void 0;
};
const FUI_FRAME_EVENT = "fuiframefocus";
const useIFrameFocus = (options) => {
  const { disabled, element: targetDocument, callback, contains = DEFAULT_CONTAINS, pollDuration = 100, refs } = options;
  const timeoutRef = reactExports.useRef(void 0);
  const listener = useEventCallback((e) => {
    const isOutside = refs.every((ref) => !contains(ref.current || null, e.target));
    if (isOutside && !disabled) {
      callback(e);
    }
  });
  reactExports.useEffect(() => {
    if (disabled) {
      return;
    }
    targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.addEventListener(FUI_FRAME_EVENT, listener, true);
    return () => {
      targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.removeEventListener(FUI_FRAME_EVENT, listener, true);
    };
  }, [
    targetDocument,
    disabled,
    listener
  ]);
  reactExports.useEffect(() => {
    var _targetDocument_defaultView;
    if (disabled) {
      return;
    }
    timeoutRef.current = targetDocument === null || targetDocument === void 0 ? void 0 : (_targetDocument_defaultView = targetDocument.defaultView) === null || _targetDocument_defaultView === void 0 ? void 0 : _targetDocument_defaultView.setInterval(() => {
      const activeElement = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.activeElement;
      if ((activeElement === null || activeElement === void 0 ? void 0 : activeElement.tagName) === "IFRAME" || (activeElement === null || activeElement === void 0 ? void 0 : activeElement.tagName) === "WEBVIEW") {
        const event = new CustomEvent(FUI_FRAME_EVENT, {
          bubbles: true
        });
        activeElement.dispatchEvent(event);
      }
    }, pollDuration);
    return () => {
      var _targetDocument_defaultView2;
      targetDocument === null || targetDocument === void 0 ? void 0 : (_targetDocument_defaultView2 = targetDocument.defaultView) === null || _targetDocument_defaultView2 === void 0 ? void 0 : _targetDocument_defaultView2.clearInterval(timeoutRef.current);
    };
  }, [
    targetDocument,
    disabled,
    pollDuration
  ]);
};
const setTimeoutNoop = (_callback) => -1;
const clearTimeoutNoop = (_handle) => void 0;
function useTimeout() {
  const { targetDocument } = useFluent();
  const win = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView;
  const setTimerFn = win ? win.setTimeout : setTimeoutNoop;
  const clearTimerFn = win ? win.clearTimeout : clearTimeoutNoop;
  return useBrowserTimer(setTimerFn, clearTimerFn);
}
const clamp$2 = (value, min2, max2) => Math.max(min2, Math.min(max2, value || 0));
const getPercentInRange = (value, min2, max2) => {
  return max2 === min2 ? 0 : (value - min2) / (max2 - min2) * 100;
};
function isFluentTrigger(element) {
  return Boolean(element.type.isFluentTriggerComponent);
}
function applyTriggerPropsToChildren(children, triggerChildProps) {
  if (typeof children === "function") {
    return children(triggerChildProps);
  } else if (children) {
    return cloneTriggerTree(children, triggerChildProps);
  }
  return children || null;
}
function cloneTriggerTree(child, triggerProps) {
  if (!reactExports.isValidElement(child) || child.type === reactExports.Fragment) {
    throw new Error("A trigger element must be a single element for this component. Please ensure that you're not using React Fragments.");
  }
  if (isFluentTrigger(child)) {
    const grandchild = cloneTriggerTree(child.props.children, triggerProps);
    return reactExports.cloneElement(child, void 0, grandchild);
  } else {
    return reactExports.cloneElement(child, triggerProps);
  }
}
function getTriggerChild(children) {
  if (!reactExports.isValidElement(children)) {
    return null;
  }
  return isFluentTrigger(children) ? getTriggerChild(
    // FIXME: This casting should be unnecessary as isFluentTrigger is a guard type method,
    // but for some reason it's failing on build
    children.props.children
  ) : children;
}
function setVirtualParent(child, parent) {
  if (!child) {
    return;
  }
  Object.assign(child, {
    _virtual: {
      parent
    }
  });
}
let _wasFocusedCounter = 0;
const _ariaHidden = "aria-hidden";
class ModalizerDummyManager extends DummyInputManager {
  constructor(element, tabster, sys) {
    super(tabster, element, DummyInputManagerPriorities.Modalizer, sys);
    this._setHandlers((dummyInput, isBackward) => {
      const el = element.get();
      const container = el && RootAPI.getRoot(tabster, el)?.getElement();
      const input = dummyInput.input;
      let toFocus;
      if (container && input) {
        const dummyContainer = getDummyInputContainer(input);
        const ctx = RootAPI.getTabsterContext(tabster, dummyContainer || input);
        if (ctx) {
          toFocus = FocusedElementState.findNextTabbable(tabster, ctx, container, input, void 0, isBackward, true)?.element;
        }
        if (toFocus) {
          nativeFocus(toFocus);
        }
      }
    });
  }
}
class Modalizer extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys, activeElements) {
    super(tabster, element, props);
    this._wasFocused = 0;
    this.userId = props.id;
    this._onDispose = onDispose;
    this._activeElements = activeElements;
    if (!tabster.controlTab) {
      this.dummyManager = new ModalizerDummyManager(this._element, tabster, sys);
    }
  }
  makeActive(isActive) {
    if (this._isActive !== isActive) {
      this._isActive = isActive;
      const element = this.getElement();
      if (element) {
        const activeElements = this._activeElements;
        const index = activeElements.map((e) => e.get()).indexOf(element);
        if (isActive) {
          if (index < 0) {
            activeElements.push(new WeakHTMLElement(element));
          }
        } else {
          if (index >= 0) {
            activeElements.splice(index, 1);
          }
        }
      }
      this._dispatchEvent(isActive);
    }
  }
  focused(noIncrement) {
    if (!noIncrement) {
      this._wasFocused = ++_wasFocusedCounter;
    }
    return this._wasFocused;
  }
  setProps(props) {
    if (props.id) {
      this.userId = props.id;
    }
    this._props = { ...props };
  }
  dispose() {
    this.makeActive(false);
    this._onDispose(this);
    this.dummyManager?.dispose();
    delete this.dummyManager;
    this._activeElements = [];
    this._remove();
  }
  isActive() {
    return !!this._isActive;
  }
  contains(element) {
    return dom.nodeContains(this.getElement(), element);
  }
  findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility) {
    const modalizerElement = this.getElement();
    if (!modalizerElement) {
      return null;
    }
    const tabster = this._tabster;
    let next = null;
    let outOfDOMOrder = false;
    let uncontrolled;
    const container = currentElement && RootAPI.getRoot(tabster, currentElement)?.getElement();
    if (container) {
      const findProps = {
        container,
        currentElement,
        referenceElement,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      next = tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      if (!next && this._props.isTrapped && tabster.modalizer?.activeId) {
        next = tabster.focusable[isBackward ? "findLast" : "findFirst"]({
          container,
          ignoreAccessibility,
          useActiveModalizer: true
        }, findPropsOut);
        if (next === null) {
          next = currentElement;
        }
        outOfDOMOrder = true;
      } else {
        outOfDOMOrder = !!findPropsOut.outOfDOMOrder;
      }
      uncontrolled = findPropsOut.uncontrolled;
    }
    return {
      element: next,
      uncontrolled,
      outOfDOMOrder
    };
  }
  _dispatchEvent(isActive, allElements) {
    const element = this.getElement();
    let defaultPrevented = false;
    if (element) {
      const elements = allElements ? this._activeElements.map((e) => e.get()) : [element];
      for (const el of elements) {
        if (el) {
          const eventDetail = {
            id: this.userId,
            element
          };
          const event = isActive ? new ModalizerActiveEvent(eventDetail) : new ModalizerInactiveEvent(eventDetail);
          dispatchEvent(el, event);
          if (event.defaultPrevented) {
            defaultPrevented = true;
          }
        }
      }
    }
    return defaultPrevented;
  }
  _remove() {
  }
}
class ModalizerAPI {
  constructor(tabster, alwaysAccessibleSelector, accessibleCheck) {
    this._onModalizerDispose = (modalizer) => {
      const id = modalizer.id;
      const userId = modalizer.userId;
      const part = this._parts[userId];
      delete this._modalizers[id];
      if (part) {
        delete part[id];
        if (Object.keys(part).length === 0) {
          delete this._parts[userId];
          const activationHistory = this._activationHistory;
          const cleanActivationHistory = [];
          let prevHistoryItem;
          for (let i = activationHistory.length; i--; ) {
            const modalizerUserIdFromHistory = activationHistory[i];
            if (modalizerUserIdFromHistory === userId) {
              continue;
            }
            if (modalizerUserIdFromHistory !== prevHistoryItem) {
              prevHistoryItem = modalizerUserIdFromHistory;
              if (modalizerUserIdFromHistory || cleanActivationHistory.length > 0) {
                cleanActivationHistory.unshift(modalizerUserIdFromHistory);
              }
            }
          }
          this._activationHistory = cleanActivationHistory;
          if (this.activeId === userId) {
            const prevActiveId = cleanActivationHistory[0];
            const prevActive = prevActiveId ? Object.values(this._parts[prevActiveId])[0] : void 0;
            this.setActive(prevActive);
          }
        }
      }
    };
    this._onKeyDown = (event) => {
      if (event.key !== Keys.Escape) {
        return;
      }
      const tabster2 = this._tabster;
      const element = tabster2.focusedElement.getFocusedElement();
      if (element) {
        const ctx = RootAPI.getTabsterContext(tabster2, element);
        const modalizer = ctx?.modalizer;
        if (ctx && !ctx.groupper && modalizer?.isActive() && !ctx.ignoreKeydown(event)) {
          const activeId = modalizer.userId;
          if (activeId) {
            const part = this._parts[activeId];
            if (part) {
              const focusedSince = Object.keys(part).map((id) => {
                const m = part[id];
                const el = m.getElement();
                let groupper;
                if (el) {
                  groupper = getTabsterOnElement(tabster2, el)?.groupper;
                }
                return m && el && groupper ? {
                  el,
                  focusedSince: m.focused(true)
                } : { focusedSince: 0 };
              }).filter((f) => f.focusedSince > 0).sort((a, b) => a.focusedSince > b.focusedSince ? -1 : a.focusedSince < b.focusedSince ? 1 : 0);
              if (focusedSince.length) {
                const groupperElement = focusedSince[0].el;
                if (groupperElement) {
                  tabster2.groupper?.handleKeyPress(groupperElement, event, true);
                }
              }
            }
          }
        }
      }
    };
    this._onFocus = (focusedElement, detail) => {
      const tabster2 = this._tabster;
      const ctx = focusedElement && RootAPI.getTabsterContext(tabster2, focusedElement);
      if (!ctx || !focusedElement) {
        return;
      }
      const augmentedMap = this._augMap;
      for (let e = focusedElement; e; e = dom.getParentElement(e)) {
        if (augmentedMap.has(e)) {
          augmentedMap.delete(e);
          augmentAttribute(tabster2, e, _ariaHidden);
        }
      }
      let modalizer = ctx.modalizer;
      const tabsterOnFocusedElement = getTabsterOnElement(tabster2, focusedElement);
      const modalizerOnFocusedElement = tabsterOnFocusedElement?.modalizer;
      if (modalizerOnFocusedElement) {
        modalizerOnFocusedElement.focused();
        if (modalizerOnFocusedElement.userId === this.activeId && tabsterOnFocusedElement.groupper) {
          const parentElement = tabster2.getParent(focusedElement);
          const parentModalizer = parentElement && RootAPI.getTabsterContext(tabster2, parentElement)?.modalizer;
          if (parentModalizer) {
            modalizer = parentModalizer;
          } else {
            this.setActive(void 0);
            return;
          }
        }
      }
      modalizer?.focused();
      if (modalizer?.userId === this.activeId) {
        this.currentIsOthersAccessible = modalizer?.getProps().isOthersAccessible;
        return;
      }
      if (detail.isFocusedProgrammatically || this.currentIsOthersAccessible || modalizer?.getProps().isAlwaysAccessible) {
        this.setActive(modalizer);
      } else {
        const win2 = this._win();
        win2.clearTimeout(this._restoreModalizerFocusTimer);
        this._restoreModalizerFocusTimer = win2.setTimeout(() => this._restoreModalizerFocus(focusedElement), 100);
      }
    };
    this._tabster = tabster;
    this._win = tabster.getWindow;
    this._modalizers = {};
    this._parts = {};
    this._augMap = /* @__PURE__ */ new WeakMap();
    this._aug = [];
    this._alwaysAccessibleSelector = alwaysAccessibleSelector;
    this._accessibleCheck = accessibleCheck;
    this._activationHistory = [];
    this.activeElements = [];
    if (!tabster.controlTab) {
      tabster.root.addDummyInputs();
    }
    const win = this._win();
    addListener(win, "keydown", this._onKeyDown, true);
    tabster.queueInit(() => {
      this._tabster.focusedElement.subscribe(this._onFocus);
    });
  }
  dispose() {
    const win = this._win();
    removeListener(win, "keydown", this._onKeyDown, true);
    Object.keys(this._modalizers).forEach((modalizerId) => {
      if (this._modalizers[modalizerId]) {
        this._modalizers[modalizerId].dispose();
        delete this._modalizers[modalizerId];
      }
    });
    win.clearTimeout(this._restoreModalizerFocusTimer);
    win.clearTimeout(this._hiddenUpdateTimer);
    this._parts = {};
    delete this.activeId;
    this.activeElements = [];
    this._augMap = /* @__PURE__ */ new WeakMap();
    this._aug = [];
    this._tabster.focusedElement.unsubscribe(this._onFocus);
  }
  createModalizer(element, props, sys) {
    const modalizer = new Modalizer(this._tabster, element, this._onModalizerDispose, props, sys, this.activeElements);
    const id = modalizer.id;
    const userId = props.id;
    this._modalizers[id] = modalizer;
    let part = this._parts[userId];
    if (!part) {
      part = this._parts[userId] = {};
    }
    part[id] = modalizer;
    const focusedElement = this._tabster.focusedElement.getFocusedElement() ?? null;
    if (element !== focusedElement && dom.nodeContains(element, focusedElement)) {
      if (userId !== this.activeId) {
        this.setActive(modalizer);
      } else {
        modalizer.makeActive(true);
      }
    }
    return modalizer;
  }
  isAugmented(element) {
    return this._augMap.has(element);
  }
  hiddenUpdate() {
    if (this._hiddenUpdateTimer) {
      return;
    }
    this._hiddenUpdateTimer = this._win().setTimeout(() => {
      delete this._hiddenUpdateTimer;
      this._hiddenUpdate();
    }, 250);
  }
  setActive(modalizer) {
    const userId = modalizer?.userId;
    const activeId = this.activeId;
    if (activeId === userId) {
      return;
    }
    this.activeId = userId;
    if (activeId) {
      const part = this._parts[activeId];
      if (part) {
        for (const id of Object.keys(part)) {
          part[id].makeActive(false);
        }
      }
    }
    if (userId) {
      const part = this._parts[userId];
      if (part) {
        for (const id of Object.keys(part)) {
          part[id].makeActive(true);
        }
      }
    }
    this.currentIsOthersAccessible = modalizer?.getProps().isOthersAccessible;
    this.hiddenUpdate();
    const activationHistory = this._activationHistory;
    if (activationHistory[0] !== userId && (userId !== void 0 || activationHistory.length > 0)) {
      activationHistory.unshift(userId);
    }
  }
  focus(elementFromModalizer, noFocusFirst, noFocusDefault) {
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, elementFromModalizer);
    const modalizer = ctx?.modalizer;
    if (modalizer) {
      this.setActive(modalizer);
      const props = modalizer.getProps();
      const modalizerRoot = modalizer.getElement();
      if (modalizerRoot) {
        if (noFocusFirst === void 0) {
          noFocusFirst = props.isNoFocusFirst;
        }
        if (!noFocusFirst && tabster.keyboardNavigation.isNavigatingWithKeyboard() && tabster.focusedElement.focusFirst({
          container: modalizerRoot
        })) {
          return true;
        }
        if (noFocusDefault === void 0) {
          noFocusDefault = props.isNoFocusDefault;
        }
        if (!noFocusDefault && tabster.focusedElement.focusDefault(modalizerRoot)) {
          return true;
        }
        tabster.focusedElement.resetFocus(modalizerRoot);
      }
    }
    return false;
  }
  activate(modalizerElementOrContainer) {
    const modalizerToActivate = modalizerElementOrContainer ? RootAPI.getTabsterContext(this._tabster, modalizerElementOrContainer)?.modalizer : void 0;
    if (!modalizerElementOrContainer || modalizerToActivate) {
      this.setActive(modalizerToActivate);
      return true;
    }
    return false;
  }
  acceptElement(element, state) {
    const modalizerUserId = state.modalizerUserId;
    const currentModalizer = state.currentCtx?.modalizer;
    if (modalizerUserId) {
      for (const e of this.activeElements) {
        const el = e.get();
        if (el && (dom.nodeContains(element, el) || el === element)) {
          return NodeFilter.FILTER_SKIP;
        }
      }
    }
    const ret = modalizerUserId === currentModalizer?.userId || !modalizerUserId && currentModalizer?.getProps().isAlwaysAccessible ? void 0 : NodeFilter.FILTER_SKIP;
    if (ret !== void 0) {
      state.skippedFocusable = true;
    }
    return ret;
  }
  _hiddenUpdate() {
    const tabster = this._tabster;
    const body = tabster.getWindow().document.body;
    const activeId = this.activeId;
    const parts = this._parts;
    const visibleElements = [];
    const hiddenElements = [];
    const alwaysAccessibleSelector = this._alwaysAccessibleSelector;
    const alwaysAccessibleElements = alwaysAccessibleSelector ? Array.from(dom.querySelectorAll(body, alwaysAccessibleSelector)) : [];
    const activeModalizerElements = [];
    for (const userId of Object.keys(parts)) {
      const modalizerParts = parts[userId];
      for (const id of Object.keys(modalizerParts)) {
        const modalizer = modalizerParts[id];
        const el = modalizer.getElement();
        const props = modalizer.getProps();
        const isAlwaysAccessible = props.isAlwaysAccessible;
        if (el) {
          if (userId === activeId) {
            activeModalizerElements.push(el);
            if (!this.currentIsOthersAccessible) {
              visibleElements.push(el);
            }
          } else if (isAlwaysAccessible) {
            alwaysAccessibleElements.push(el);
          } else {
            hiddenElements.push(el);
          }
        }
      }
    }
    const augmentedMap = this._augMap;
    const allVisibleElements = visibleElements.length > 0 ? [...visibleElements, ...alwaysAccessibleElements] : void 0;
    const newAugmented = [];
    const newAugmentedMap = /* @__PURE__ */ new WeakMap();
    const toggle = (element, hide2) => {
      const tagName = element.tagName;
      if (tagName === "SCRIPT" || tagName === "STYLE") {
        return;
      }
      let isAugmented = false;
      if (augmentedMap.has(element)) {
        if (hide2) {
          isAugmented = true;
        } else {
          augmentedMap.delete(element);
          augmentAttribute(tabster, element, _ariaHidden);
        }
      } else if (hide2 && !this._accessibleCheck?.(element, activeModalizerElements) && augmentAttribute(tabster, element, _ariaHidden, "true")) {
        augmentedMap.set(element, true);
        isAugmented = true;
      }
      if (isAugmented) {
        newAugmented.push(new WeakHTMLElement(element));
        newAugmentedMap.set(element, true);
      }
    };
    const walk = (element) => {
      for (let el = dom.getFirstElementChild(element); el; el = dom.getNextElementSibling(el)) {
        let skip = false;
        let containsModalizer = false;
        let containedByModalizer = false;
        if (allVisibleElements) {
          const elParent = tabster.getParent(el);
          for (const c of allVisibleElements) {
            if (el === c) {
              skip = true;
              break;
            }
            if (dom.nodeContains(el, c)) {
              containsModalizer = true;
              break;
            } else if (dom.nodeContains(c, elParent)) {
              containedByModalizer = true;
            }
          }
          if (containsModalizer || el.__tabsterElementFlags?.noDirectAriaHidden) {
            walk(el);
          } else if (!skip && !containedByModalizer) {
            toggle(el, true);
          }
        } else {
          toggle(el, false);
        }
      }
    };
    if (!allVisibleElements) {
      alwaysAccessibleElements.forEach((e) => toggle(e, false));
    }
    hiddenElements.forEach((e) => toggle(e, true));
    if (body) {
      walk(body);
    }
    this._aug?.map((e) => e.get()).forEach((e) => {
      if (e && !newAugmentedMap.get(e)) {
        toggle(e, false);
      }
    });
    this._aug = newAugmented;
    this._augMap = newAugmentedMap;
  }
  /**
   * Called when an element is focused outside of an active modalizer.
   * Attempts to pull focus back into the active modalizer
   * @param outsideElement - An element being focused outside of the modalizer
   */
  _restoreModalizerFocus(outsideElement) {
    const ownerDocument = outsideElement?.ownerDocument;
    if (!outsideElement || !ownerDocument) {
      return;
    }
    const focusedElement = this._tabster.focusedElement.getFocusedElement();
    const focusedElementModalizer = focusedElement && RootAPI.getTabsterContext(this._tabster, focusedElement)?.modalizer;
    if (!focusedElement || focusedElement && focusedElementModalizer?.userId === this.activeId) {
      return;
    }
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, outsideElement);
    const modalizer = ctx?.modalizer;
    const activeId = this.activeId;
    if (!modalizer && !activeId || modalizer && activeId === modalizer.userId) {
      return;
    }
    const container = ctx?.root.getElement();
    if (container) {
      let toFocus = tabster.focusable.findFirst({
        container,
        useActiveModalizer: true
      });
      if (toFocus) {
        if (outsideElement.compareDocumentPosition(toFocus) & document.DOCUMENT_POSITION_PRECEDING) {
          toFocus = tabster.focusable.findLast({
            container,
            useActiveModalizer: true
          });
          if (!toFocus) {
            throw new Error("Something went wrong.");
          }
        }
        tabster.focusedElement.focus(toFocus);
        return;
      }
    }
    outsideElement.blur();
  }
}
function getModalizer(tabster, alwaysAccessibleSelector, accessibleCheck) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.modalizer) {
    const api2 = new ModalizerAPI(tabsterCore, alwaysAccessibleSelector, accessibleCheck);
    tabsterCore.modalizer = api2;
    tabsterCore.attrHandlers.set("modalizer", (element, existingModalizer, newProps, oldProps, sys) => {
      if (existingModalizer) {
        if (newProps.id && oldProps?.id !== newProps.id) {
          existingModalizer.dispose();
          return api2.createModalizer(element, newProps, sys);
        }
        existingModalizer.setProps(newProps);
        return existingModalizer;
      }
      return api2.createModalizer(element, newProps, sys);
    });
  }
  return tabsterCore.modalizer;
}
class Restorer extends TabsterPart {
  constructor(tabster, element, props) {
    super(tabster, element, props);
    this._hasFocus = false;
    this._onFocusOut = (e) => {
      const element2 = this._element?.get();
      if (element2 && e.relatedTarget === null) {
        dispatchEvent(element2, new RestorerRestoreFocusEvent());
      }
      if (element2 && !dom.nodeContains(element2, e.relatedTarget)) {
        this._hasFocus = false;
      }
    };
    this._onFocusIn = () => {
      this._hasFocus = true;
    };
    if (this._props.type === RestorerTypes.Source) {
      const element2 = this._element?.get();
      addListener(element2, "focusout", this._onFocusOut);
      addListener(element2, "focusin", this._onFocusIn);
      this._hasFocus = dom.nodeContains(element2, element2 && dom.getActiveElement(element2.ownerDocument));
    }
  }
  dispose() {
    if (this._props.type === RestorerTypes.Source) {
      const element = this._element?.get();
      removeListener(element, "focusout", this._onFocusOut);
      removeListener(element, "focusin", this._onFocusIn);
      if (this._hasFocus) {
        const doc = this._tabster.getWindow().document;
        dispatchEvent(doc.body, new RestorerRestoreFocusEvent());
      }
    }
  }
}
class History {
  static {
    this.DEPTH = 10;
  }
  constructor(getWindow2) {
    this._stack = [];
    this._getWindow = getWindow2;
  }
  /**
   * Push a weak element to the top of the history stack.
   * If the stack is full, the bottom weak element is removed.
   * If the element is already at the top of the stack, it is not duplicated.
   */
  push(element) {
    if (this._stack[this._stack.length - 1]?.get() === element) {
      return;
    }
    if (this._stack.length > History.DEPTH) {
      this._stack.shift();
    }
    this._stack.push(new WeakHTMLElement(element));
  }
  /**
   * Pop the first element from the history that satisfies the callback.
   * The history is searched from the top to the bottom (from the most recent to the least recent).
   *
   * If a weak reference to the element is broken,
   * or the element is no longer in the DOM,
   * the element is removed from the top of the stack while popping.
   *
   * If no matching element is found, undefined is returned.
   * If the stack is empty, undefined is returned.
   */
  pop(filter = () => true) {
    const doc = this._getWindow().document;
    for (let index = this._stack.length - 1; index >= 0; index--) {
      const maybeElement = this._stack.pop()?.get();
      if (maybeElement && dom.nodeContains(doc.body, dom.getParentElement(maybeElement)) && filter(maybeElement)) {
        return maybeElement;
      }
    }
    return void 0;
  }
}
class RestorerAPI {
  constructor(tabster) {
    this._onRestoreFocus = (e) => {
      this._focusedElementState.cancelAsyncFocus(AsyncFocusSources.Restorer);
      const source = e.composedPath()[0];
      if (source) {
        const sourceId = getTabsterOnElement(this._tabster, source)?.restorer?.getProps().id;
        this._focusedElementState.requestAsyncFocus(AsyncFocusSources.Restorer, () => this._restoreFocus(source, sourceId), 0);
      }
    };
    this._onFocusIn = (element) => {
      if (!element) {
        return;
      }
      const tabsterAttribute = getTabsterOnElement(this._tabster, element);
      if (tabsterAttribute?.restorer?.getProps().type !== RestorerTypes.Target) {
        return;
      }
      this._history.push(element);
    };
    this._restoreFocus = (source, sourceId) => {
      const doc = this._getWindow().document;
      if (dom.getActiveElement(doc) !== doc.body) {
        return;
      }
      if (
        // clicking on any empty space focuses body - this is can be a false positive
        !this._keyboardNavState.isNavigatingWithKeyboard() && // Source no longer exists on DOM - always restore focus
        dom.nodeContains(doc.body, source)
      ) {
        return;
      }
      const getId = (element) => {
        const restorerProps = getTabsterOnElement(this._tabster, element)?.restorer?.getProps();
        return restorerProps ? restorerProps.id : null;
      };
      this._history.pop((target) => sourceId === getId(target))?.focus();
    };
    this._tabster = tabster;
    this._getWindow = tabster.getWindow;
    addListener(this._getWindow(), RestorerRestoreFocusEventName, this._onRestoreFocus);
    this._history = new History(this._getWindow);
    this._keyboardNavState = tabster.keyboardNavigation;
    this._focusedElementState = tabster.focusedElement;
    this._focusedElementState.subscribe(this._onFocusIn);
  }
  dispose() {
    const win = this._getWindow();
    this._focusedElementState.unsubscribe(this._onFocusIn);
    this._focusedElementState.cancelAsyncFocus(AsyncFocusSources.Restorer);
    removeListener(win, RestorerRestoreFocusEventName, this._onRestoreFocus);
  }
  createRestorer(element, props) {
    const restorer = new Restorer(this._tabster, element, props);
    if (props.type === RestorerTypes.Target && dom.getActiveElement(element.ownerDocument) === element) {
      this._history.push(element);
    }
    return restorer;
  }
}
function getRestorer(tabster) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.restorer) {
    const api2 = new RestorerAPI(tabsterCore);
    tabsterCore.restorer = api2;
    tabsterCore.attrHandlers.set("restorer", (element, existingRestorer, newProps) => {
      if (existingRestorer) {
        existingRestorer.setProps(newProps);
        return existingRestorer;
      }
      return api2.createRestorer(element, newProps);
    });
  }
  return tabsterCore.restorer;
}
function useKeyborgRef() {
  const { targetDocument } = useFluent();
  const keyborgRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const targetWindow = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView;
    if (targetWindow) {
      const keyborg = createKeyborg(targetWindow);
      keyborgRef.current = keyborg;
      return () => {
        disposeKeyborg(keyborg);
        keyborgRef.current = null;
      };
    }
  }, [
    targetDocument
  ]);
  return keyborgRef;
}
function useOnKeyboardNavigationChange(callback) {
  const keyborgRef = useKeyborgRef();
  const eventCallback = useEventCallback(callback);
  reactExports.useEffect(() => {
    const keyborg = keyborgRef.current;
    if (keyborg) {
      const cb = (next) => {
        eventCallback(next);
      };
      keyborg.subscribe(cb);
      cb(keyborg.isNavigatingWithKeyboard());
      return () => {
        keyborg.unsubscribe(cb);
      };
    }
  }, [
    keyborgRef,
    eventCallback
  ]);
}
const DangerousNeverHiddenAttribute = "data-tabster-never-hide";
const tabsterAccessibleCheck = (element) => {
  return element.hasAttribute(DangerousNeverHiddenAttribute);
};
function initTabsterModules(tabster) {
  getModalizer(tabster, void 0, tabsterAccessibleCheck);
  getRestorer(tabster);
}
const useModalAttributes = (options = {}) => {
  const { trapFocus, alwaysFocusable, legacyTrapFocus } = options;
  useTabster(initTabsterModules);
  const id = useId("modal-", options.id);
  const modalAttributes = useTabsterAttributes({
    restorer: {
      type: RestorerTypes.Source
    },
    ...trapFocus && {
      modalizer: {
        id,
        isOthersAccessible: !trapFocus,
        isAlwaysAccessible: alwaysFocusable,
        isTrapped: legacyTrapFocus && trapFocus
      }
    }
  });
  const triggerAttributes = useTabsterAttributes({
    restorer: {
      type: RestorerTypes.Target
    }
  });
  return {
    modalAttributes,
    triggerAttributes
  };
};
const useMergedTabsterAttributes_unstable = (...attributes) => {
  const stringAttributes = [];
  let key = "";
  for (const attribute of attributes) {
    const value = attribute === null || attribute === void 0 ? void 0 : attribute[TABSTER_ATTRIBUTE_NAME];
    if (value) {
      stringAttributes.push(value);
      key += value + MERGE_KEY_SEPARATOR;
    }
  }
  return reactExports.useMemo(
    () => ({
      [TABSTER_ATTRIBUTE_NAME]: mergeAttributes(stringAttributes)
    }),
    // `key` fully captures the contents of `stringAttributes`, which is rebuilt
    // on every render and therefore cannot be a dependency itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      key
    ]
  );
};
const MERGE_KEY_SEPARATOR = "\0";
const mergeAttributes = (stringAttributes) => {
  if (stringAttributes.length === 0) {
    return void 0;
  }
  if (stringAttributes.length === 1) {
    return stringAttributes[0];
  }
  return JSON.stringify(Object.assign({}, ...stringAttributes.map(safelyParseJSON)));
};
const safelyParseJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
};
function useSetKeyboardNavigation() {
  const keyborgRef = useKeyborgRef();
  return reactExports.useCallback((isNavigatingWithKeyboard) => {
    var _keyborgRef_current;
    (_keyborgRef_current = keyborgRef.current) === null || _keyborgRef_current === void 0 ? void 0 : _keyborgRef_current.setVal(isNavigatingWithKeyboard);
  }, [
    keyborgRef
  ]);
}
var schedulerExports = requireScheduler();
const createProvider = (Original) => {
  const Provider = (props) => {
    const valueRef = reactExports.useRef(props.value);
    const contextValue = reactExports.useRef(null);
    if (!contextValue.current) {
      contextValue.current = {
        value: valueRef,
        listeners: []
      };
    }
    useIsomorphicLayoutEffect(() => {
      valueRef.current = props.value;
      schedulerExports.unstable_runWithPriority(schedulerExports.unstable_NormalPriority, () => {
        contextValue.current.listeners.forEach((listener) => {
          listener(props.value);
        });
      });
    }, [
      props.value
    ]);
    return reactExports.createElement(Original, {
      value: contextValue.current
    }, props.children);
  };
  return Provider;
};
const createContext = (defaultValue) => {
  const context = reactExports.createContext({
    value: {
      current: defaultValue
    },
    listeners: [],
    isDefault: true
  });
  context.Provider = createProvider(context.Provider);
  delete context.Consumer;
  return context;
};
const useContextSelector = (context, selectorFn) => {
  const contextValue = reactExports.useContext(context);
  const { value: valueRef, listeners } = contextValue;
  const valueAtRender = selectorFn(valueRef.current);
  const [, forceUpdate] = reactExports.useReducer((x) => x + 1, 0);
  const selectorFnRef = reactExports.useRef(selectorFn);
  const lastValueAtRender = reactExports.useRef(valueAtRender);
  useIsomorphicLayoutEffect(() => {
    selectorFnRef.current = selectorFn;
    lastValueAtRender.current = valueAtRender;
  });
  useIsomorphicLayoutEffect(() => {
    const listener = (payload) => {
      try {
        const nextSelectedValue = selectorFnRef.current(payload);
        if (!Object.is(lastValueAtRender.current, nextSelectedValue)) {
          forceUpdate();
        }
      } catch {
      }
    };
    listeners.push(listener);
    listener(valueRef.current);
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, [
    listeners,
    valueRef
  ]);
  return valueAtRender;
};
function useHasParentContext(context) {
  const contextValue = reactExports.useContext(context);
  return !contextValue.isDefault;
}
const noop = () => void 0;
const activeDescendantContextDefaultValue = {
  controller: {
    active: noop,
    blur: noop,
    find: noop,
    first: noop,
    focus: noop,
    focusLastActive: noop,
    scrollActiveIntoView: noop,
    last: noop,
    next: noop,
    prev: noop,
    showAttributes: noop,
    hideAttributes: noop,
    showFocusVisibleAttributes: noop,
    hideFocusVisibleAttributes: noop
  }
};
const ActiveDescendantContext = reactExports.createContext(void 0);
const ActiveDescendantContextProvider = ActiveDescendantContext.Provider;
const useActiveDescendantContext = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(ActiveDescendantContext)) !== null && _React_useContext !== void 0 ? _React_useContext : activeDescendantContextDefaultValue;
};
const useHasParentActiveDescendantContext = () => !!reactExports.useContext(ActiveDescendantContext);
function useOptionWalker(options) {
  const { matchOption } = options;
  const { targetDocument } = useFluent();
  const treeWalkerRef = reactExports.useRef(null);
  const listboxRef = reactExports.useRef(null);
  const optionFilter = reactExports.useCallback((node) => {
    if (isHTMLElement$1(node) && matchOption(node)) {
      return NodeFilter.FILTER_ACCEPT;
    }
    return NodeFilter.FILTER_SKIP;
  }, [
    matchOption
  ]);
  const setListbox = reactExports.useCallback((el) => {
    if (el && targetDocument) {
      listboxRef.current = el;
      treeWalkerRef.current = targetDocument.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, optionFilter);
    } else {
      listboxRef.current = null;
      treeWalkerRef.current = null;
    }
  }, [
    targetDocument,
    optionFilter
  ]);
  const optionWalker = reactExports.useMemo(() => ({
    first: () => {
      if (!treeWalkerRef.current || !listboxRef.current) {
        return null;
      }
      treeWalkerRef.current.currentNode = listboxRef.current;
      return treeWalkerRef.current.firstChild();
    },
    last: () => {
      if (!treeWalkerRef.current || !listboxRef.current) {
        return null;
      }
      treeWalkerRef.current.currentNode = listboxRef.current;
      return treeWalkerRef.current.lastChild();
    },
    next: () => {
      if (!treeWalkerRef.current) {
        return null;
      }
      return treeWalkerRef.current.nextNode();
    },
    prev: () => {
      if (!treeWalkerRef.current) {
        return null;
      }
      return treeWalkerRef.current.previousNode();
    },
    find: (predicate, startFrom) => {
      if (!treeWalkerRef.current || !listboxRef.current) {
        return null;
      }
      const start = startFrom ? targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.getElementById(startFrom) : null;
      treeWalkerRef.current.currentNode = start !== null && start !== void 0 ? start : listboxRef.current;
      let cur = treeWalkerRef.current.currentNode;
      while (cur && !predicate(cur.id)) {
        cur = treeWalkerRef.current.nextNode();
      }
      return cur;
    },
    setCurrent: (el) => {
      if (!treeWalkerRef.current) {
        return;
      }
      treeWalkerRef.current.currentNode = el;
    }
  }), [
    targetDocument
  ]);
  return {
    optionWalker,
    listboxCallbackRef: setListbox
  };
}
const ACTIVEDESCENDANT_ATTRIBUTE = "data-activedescendant";
const ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE = "data-activedescendant-focusvisible";
const scrollIntoView = (target) => {
  if (!target) {
    return;
  }
  const scrollParent = findScrollableParent(target.parentElement);
  if (!scrollParent) {
    return;
  }
  const { offsetHeight } = target;
  const offsetTop = getTotalOffsetTop(target, scrollParent);
  const { scrollMarginTop, scrollMarginBottom } = getScrollMargins(target);
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;
  const isAbove = offsetTop - scrollMarginTop < scrollTop;
  const isBelow = offsetTop + offsetHeight + scrollMarginBottom > scrollTop + parentOffsetHeight;
  const buffer = 2;
  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop - scrollMarginTop - buffer);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop + offsetHeight + scrollMarginBottom - parentOffsetHeight + buffer);
  }
};
const findScrollableParent = (element) => {
  if (!element) {
    return null;
  }
  if (element.scrollHeight > element.offsetHeight) {
    return element;
  }
  return findScrollableParent(element.parentElement);
};
const getTotalOffsetTop = (element, scrollParent) => {
  if (!element || element === scrollParent) {
    return 0;
  }
  if (element.contains(scrollParent)) {
    return scrollParent.offsetTop * -1;
  }
  return element.offsetTop + getTotalOffsetTop(element.offsetParent, scrollParent);
};
const getScrollMargins = (element) => {
  var _element_ownerDocument;
  const win = (_element_ownerDocument = element.ownerDocument) === null || _element_ownerDocument === void 0 ? void 0 : _element_ownerDocument.defaultView;
  if (!win) {
    return {
      scrollMarginTop: 0,
      scrollMarginBottom: 0
    };
  }
  const computedStyles = win.getComputedStyle(element);
  var _getIntValueOfComputedStyle;
  const scrollMarginTop = (_getIntValueOfComputedStyle = getIntValueOfComputedStyle(computedStyles.scrollMarginTop)) !== null && _getIntValueOfComputedStyle !== void 0 ? _getIntValueOfComputedStyle : getIntValueOfComputedStyle(computedStyles.scrollMarginBlockStart);
  var _getIntValueOfComputedStyle1;
  const scrollMarginBottom = (_getIntValueOfComputedStyle1 = getIntValueOfComputedStyle(computedStyles.scrollMarginBottom)) !== null && _getIntValueOfComputedStyle1 !== void 0 ? _getIntValueOfComputedStyle1 : getIntValueOfComputedStyle(computedStyles.scrollMarginBlockEnd);
  return {
    scrollMarginTop,
    scrollMarginBottom
  };
};
const getIntValueOfComputedStyle = (computedStyle) => {
  return computedStyle ? parseInt(computedStyle, 10) : 0;
};
const createActiveDescendantChangeEvent = (detail) => new CustomEvent("activedescendantchange", {
  bubbles: true,
  cancelable: false,
  composed: true,
  detail
});
function useActiveDescendant(options) {
  const { imperativeRef, matchOption: matchOptionUnstable } = options;
  const focusVisibleRef = reactExports.useRef(false);
  const shouldShowFocusVisibleAttrRef = reactExports.useRef(true);
  const activeIdRef = reactExports.useRef(null);
  const lastActiveIdRef = reactExports.useRef(null);
  const activeParentRef = reactExports.useRef(null);
  const attributeVisibilityRef = reactExports.useRef(true);
  const removeAttribute = reactExports.useCallback(() => {
    var _activeParentRef_current;
    (_activeParentRef_current = activeParentRef.current) === null || _activeParentRef_current === void 0 ? void 0 : _activeParentRef_current.removeAttribute("aria-activedescendant");
  }, []);
  const setAttribute = reactExports.useCallback((id) => {
    if (id) {
      activeIdRef.current = id;
    }
    if (attributeVisibilityRef.current && activeIdRef.current) {
      var _activeParentRef_current;
      (_activeParentRef_current = activeParentRef.current) === null || _activeParentRef_current === void 0 ? void 0 : _activeParentRef_current.setAttribute("aria-activedescendant", activeIdRef.current);
    }
  }, []);
  useOnKeyboardNavigationChange((isNavigatingWithKeyboard) => {
    focusVisibleRef.current = isNavigatingWithKeyboard;
    const active = getActiveDescendant();
    if (!active) {
      return;
    }
    if (isNavigatingWithKeyboard && shouldShowFocusVisibleAttrRef.current) {
      active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, "");
    } else {
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }
  });
  const matchOption = useEventCallback(matchOptionUnstable);
  const listboxRef = reactExports.useRef(null);
  const { optionWalker, listboxCallbackRef } = useOptionWalker({
    matchOption
  });
  const getActiveDescendant = reactExports.useCallback(() => {
    var _listboxRef_current;
    return (_listboxRef_current = listboxRef.current) === null || _listboxRef_current === void 0 ? void 0 : _listboxRef_current.querySelector(`#${activeIdRef.current}`);
  }, [
    listboxRef
  ]);
  const setShouldShowFocusVisibleAttribute = reactExports.useCallback((shouldShow) => {
    shouldShowFocusVisibleAttrRef.current = shouldShow;
    const active = getActiveDescendant();
    if (!active) {
      return;
    }
    if (shouldShow && focusVisibleRef.current) {
      active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, "");
    } else {
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }
  }, [
    getActiveDescendant
  ]);
  const blurActiveDescendant = reactExports.useCallback(() => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }
    removeAttribute();
    lastActiveIdRef.current = activeIdRef.current;
    activeIdRef.current = null;
    var _active_id;
    return (_active_id = active === null || active === void 0 ? void 0 : active.id) !== null && _active_id !== void 0 ? _active_id : null;
  }, [
    getActiveDescendant,
    removeAttribute
  ]);
  const focusActiveDescendant = reactExports.useCallback((nextActive) => {
    if (!nextActive) {
      return;
    }
    const previousActiveId = blurActiveDescendant();
    scrollIntoView(nextActive);
    setAttribute(nextActive.id);
    nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, "");
    if (focusVisibleRef.current && shouldShowFocusVisibleAttrRef.current) {
      nextActive.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, "");
    }
    const event = createActiveDescendantChangeEvent({
      id: nextActive.id,
      previousId: previousActiveId
    });
    nextActive.dispatchEvent(event);
  }, [
    blurActiveDescendant,
    setAttribute
  ]);
  const controller = reactExports.useMemo(() => ({
    first: ({ passive } = {}) => {
      const first = optionWalker.first();
      if (!passive) {
        focusActiveDescendant(first);
      }
      return first === null || first === void 0 ? void 0 : first.id;
    },
    last: ({ passive } = {}) => {
      const last = optionWalker.last();
      if (!passive) {
        focusActiveDescendant(last);
      }
      return last === null || last === void 0 ? void 0 : last.id;
    },
    next: ({ passive } = {}) => {
      const active = getActiveDescendant();
      if (!active) {
        return;
      }
      optionWalker.setCurrent(active);
      const next = optionWalker.next();
      if (!passive) {
        focusActiveDescendant(next);
      }
      return next === null || next === void 0 ? void 0 : next.id;
    },
    prev: ({ passive } = {}) => {
      const active = getActiveDescendant();
      if (!active) {
        return;
      }
      optionWalker.setCurrent(active);
      const next = optionWalker.prev();
      if (!passive) {
        focusActiveDescendant(next);
      }
      return next === null || next === void 0 ? void 0 : next.id;
    },
    blur: () => {
      blurActiveDescendant();
    },
    active: () => {
      var _getActiveDescendant;
      return (_getActiveDescendant = getActiveDescendant()) === null || _getActiveDescendant === void 0 ? void 0 : _getActiveDescendant.id;
    },
    focus: (id) => {
      if (!listboxRef.current) {
        return;
      }
      const target = listboxRef.current.querySelector(`#${id}`);
      if (target) {
        focusActiveDescendant(target);
      }
    },
    focusLastActive: () => {
      if (!listboxRef.current || !lastActiveIdRef.current) {
        return;
      }
      const target = listboxRef.current.querySelector(`#${lastActiveIdRef.current}`);
      if (target) {
        focusActiveDescendant(target);
        return true;
      }
    },
    find(predicate, { passive, startFrom } = {}) {
      const target = optionWalker.find(predicate, startFrom);
      if (!passive) {
        focusActiveDescendant(target);
      }
      return target === null || target === void 0 ? void 0 : target.id;
    },
    scrollActiveIntoView: () => {
      if (!listboxRef.current) {
        return;
      }
      const active = getActiveDescendant();
      if (!active) {
        return;
      }
      scrollIntoView(active);
    },
    showAttributes() {
      attributeVisibilityRef.current = true;
      setAttribute();
    },
    hideAttributes() {
      attributeVisibilityRef.current = false;
      removeAttribute();
    },
    showFocusVisibleAttributes() {
      setShouldShowFocusVisibleAttribute(true);
    },
    hideFocusVisibleAttributes() {
      setShouldShowFocusVisibleAttribute(false);
    }
  }), [
    optionWalker,
    listboxRef,
    setAttribute,
    removeAttribute,
    focusActiveDescendant,
    blurActiveDescendant,
    getActiveDescendant,
    setShouldShowFocusVisibleAttribute
  ]);
  reactExports.useImperativeHandle(imperativeRef, () => controller);
  return {
    listboxRef: useMergedRefs(listboxRef, listboxCallbackRef),
    activeParentRef,
    controller
  };
}
const Speaker2Regular = /* @__PURE__ */ createFluentIcon("Speaker2Regular", "1em", ["M12 3a1 1 0 0 0-1.68-.73l-3.88 3.6A.5.5 0 0 1 6.1 6H3.5C2.67 6 2 6.67 2 7.5v5c0 .83.67 1.5 1.5 1.5h2.6a.5.5 0 0 1 .34.13l3.88 3.6a1 1 0 0 0 1.68-.74zM7.12 6.6 11 3v14l-3.88-3.6A1.5 1.5 0 0 0 6.1 13H3.5a.5.5 0 0 1-.5-.5v-5c0-.28.22-.5.5-.5h2.6c.38 0 .75-.14 1.02-.4m8.14-1.97a.5.5 0 0 1 .7.04 8 8 0 0 1 0 10.66.5.5 0 0 1-.74-.66 7 7 0 0 0 0-9.34.5.5 0 0 1 .04-.7m-1.18 8.3a.5.5 0 0 1-.18-.68 4.5 4.5 0 0 0 0-4.5.5.5 0 1 1 .86-.5 5.5 5.5 0 0 1 0 5.5.5.5 0 0 1-.68.18"]);
const SpeakerMuteRegular = /* @__PURE__ */ createFluentIcon("SpeakerMuteRegular", "1em", ["M12 3a1 1 0 0 0-1.68-.73l-3.88 3.6A.5.5 0 0 1 6.1 6H3.5C2.67 6 2 6.67 2 7.5v5c0 .83.67 1.5 1.5 1.5h2.6a.5.5 0 0 1 .34.13l3.88 3.6a1 1 0 0 0 1.68-.74zM7.12 6.6 11 3v14l-3.88-3.6A1.5 1.5 0 0 0 6.1 13H3.5a.5.5 0 0 1-.5-.5v-5c0-.28.22-.5.5-.5h2.6c.38 0 .75-.14 1.02-.4m6.02 1.05c.2-.2.51-.2.71 0l1.65 1.64 1.64-1.64a.5.5 0 1 1 .71.7L16.2 10l1.65 1.65a.5.5 0 1 1-.7.7l-1.65-1.64-1.65 1.64a.5.5 0 1 1-.7-.7L14.78 10l-1.65-1.65a.5.5 0 0 1 0-.7"]);
const EditRegular = /* @__PURE__ */ createFluentIcon("EditRegular", "1em", ["M17.18 2.93a2.97 2.97 0 0 0-4.26-.06l-9.37 9.38q-.5.5-.66 1.2l-.88 3.94a.5.5 0 0 0 .6.6l3.93-.87c.46-.1.9-.34 1.23-.68l9.36-9.36a2.97 2.97 0 0 0 .05-4.15m-3.55.65a1.97 1.97 0 1 1 2.8 2.8l-.68.66-2.8-2.79zm-1.38 1.38 2.8 2.8-7.99 7.97q-.31.31-.74.41l-3.16.7.7-3.18q.1-.41.4-.7z"]);
const CheckmarkFilled = /* @__PURE__ */ createFluentIcon("CheckmarkFilled", "1em", ["M7.03 13.9 3.56 10a.75.75 0 0 0-1.12 1l4 4.5c.29.32.79.34 1.09.03l10.5-10.5a.75.75 0 0 0-1.06-1.06z"]);
const ChevronDownRegular = /* @__PURE__ */ createFluentIcon("ChevronDownRegular", "1em", ["M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0"]);
const Code24Regular = /* @__PURE__ */ createFluentIcon("Code24Regular", "24", ["M15.05 1.5a.75.75 0 0 1 1.4.5l-7.5 20.5a.75.75 0 0 1-1.4-.5zM6.2 6.22a.75.75 0 0 1 1.08 1.04L2.8 12l4.5 4.73a.75.75 0 0 1-1.08 1.04l-5-5.25a.75.75 0 0 1 0-1.04zm10.52-.02a.75.75 0 0 1 1.06.02l5 5.25c.28.3.28.75 0 1.04l-5 5.25a.75.75 0 0 1-1.08-1.04L21.2 12l-4.5-4.73a.75.75 0 0 1 .02-1.06"]);
const DataPie24Regular = /* @__PURE__ */ createFluentIcon("DataPie24Regular", "24", ["M12.73 2.22a.8.8 0 0 1 .54-.22A9 9 0 0 1 22 10.73a.75.75 0 0 1-.75.77h-8a.75.75 0 0 1-.75-.75v-8q0-.32.23-.53M14 3.57V10h6.43A7.5 7.5 0 0 0 14 3.57m-3 1.2a.75.75 0 0 0-.82-.75 9 9 0 1 0 9.78 9.8.75.75 0 0 0-.75-.82h-5.96C12.01 13 11 12 11 10.75zm-7.5 8.21a7.5 7.5 0 0 1 6-7.35v5.12a3.75 3.75 0 0 0 3.75 3.75h5.1A7.5 7.5 0 0 1 3.5 12.98"]);
const DataUsage24Regular = /* @__PURE__ */ createFluentIcon("DataUsage24Regular", "24", ["M18.25 3A2.75 2.75 0 0 1 21 5.75v12.5A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75A2.75 2.75 0 0 1 5.75 3zm0 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.7-.56-1.25-1.25-1.25M7.75 9c.38 0 .7.28.74.64l.01.1v6.51a.75.75 0 0 1-1.5.1v-6.6c0-.42.34-.75.75-.75m8.5-2c.38 0 .7.27.74.63l.01.1v8.54c0 .4-.34.73-.75.73a.74.74 0 0 1-.74-.63l-.01-.1V7.73c0-.4.34-.73.75-.73m-4.27 5c.37 0 .67.26.73.62v.1l.04 3.54c0 .4-.32.73-.73.74a.73.73 0 0 1-.73-.62v-.1l-.04-3.55c0-.4.32-.73.73-.73"]);
const Desktop24Regular = /* @__PURE__ */ createFluentIcon("Desktop24Regular", "24", ["M6.75 22a.75.75 0 0 1-.1-1.5H8.5V18H4.25c-1.2 0-2.17-.92-2.24-2.1L2 15.76V5.25c0-1.2.93-2.17 2.1-2.24L4.25 3h15.5c1.19 0 2.16.93 2.24 2.1v10.65c0 1.2-.92 2.17-2.09 2.25h-4.4v2.5h1.75a.75.75 0 0 1 .1 1.5H6.75M14 18h-4v2.5h4zm5.75-13.5H4.25c-.38 0-.7.28-.74.65l-.01.1v10.5c0 .38.28.7.65.75h15.6c.38 0 .7-.28.74-.65V5.25c0-.38-.27-.7-.64-.74z"]);
const DocumentText24Regular = /* @__PURE__ */ createFluentIcon("DocumentText24Regular", "24", ["M8.75 11.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm0 2.75a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm0 2.75a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm4.84-14.41L19.4 8.4A2 2 0 0 1 20 9.83V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6.17c.52 0 1.05.22 1.42.59M18 20.5a.5.5 0 0 0 .5-.5V10H14a2 2 0 0 1-2-2V3.5H6a.5.5 0 0 0-.5.5v16c0 .27.22.5.5.5zm-.62-12L13.5 4.62V8c0 .28.22.5.5.5z"]);
const Speaker224Regular = /* @__PURE__ */ createFluentIcon("Speaker224Regular", "24", ["M15 4.25a1.25 1.25 0 0 0-2.08-.93L8.42 7.3a.8.8 0 0 1-.49.19H4.25C3.01 7.5 2 8.5 2 9.75v4.5c0 1.24 1 2.25 2.25 2.25h3.68q.28 0 .5.19l4.49 3.99c.8.72 2.08.14 2.08-.93zM9.42 8.43l4.08-3.62v14.38l-4.08-3.63A2.3 2.3 0 0 0 7.93 15H4.25a.75.75 0 0 1-.75-.75v-4.5c0-.42.34-.75.75-.75h3.68c.55 0 1.08-.2 1.5-.57M19 5.9a.75.75 0 0 1 1.05.15 10 10 0 0 1 0 11.9.75.75 0 1 1-1.2-.9 8.5 8.5 0 0 0 0-10.1.75.75 0 0 1 .15-1.05m-1.85 2.47a.75.75 0 0 1 1.02.3 7 7 0 0 1 0 6.66.75.75 0 0 1-1.32-.72 5.5 5.5 0 0 0 0-5.22.75.75 0 0 1 .3-1.02"]);
const SpeakerMute24Regular = /* @__PURE__ */ createFluentIcon("SpeakerMute24Regular", "24", ["M12.92 3.32c.8-.72 2.08-.15 2.08.93v15.5a1.25 1.25 0 0 1-2.08.93l-4.5-4a.8.8 0 0 0-.49-.18H4.25C3.01 16.5 2 15.49 2 14.25v-4.5C2 8.5 3 7.5 4.25 7.5h3.68q.28 0 .5-.2zm.58 1.49L9.42 8.43c-.4.37-.94.57-1.49.57H4.25a.75.75 0 0 0-.75.75v4.5c0 .41.34.75.75.75h3.68c.55 0 1.08.2 1.5.56l4.07 3.63zm2.72 4.4c.3-.28.77-.28 1.06 0L19 10.95l1.72-1.72a.75.75 0 1 1 1.06 1.06L20.06 12l1.72 1.72a.75.75 0 0 1-1.06 1.06L19 13.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L17.94 12l-1.72-1.72a.75.75 0 0 1 0-1.06"]);
const Settings24Regular = /* @__PURE__ */ createFluentIcon("Settings24Regular", "24", ["M12.01 2.25q1.11.01 2.18.25c.32.07.55.33.59.65l.17 1.53a1.38 1.38 0 0 0 1.92 1.11l1.4-.61c.3-.13.64-.06.85.17a10 10 0 0 1 2.2 3.8c.1.3 0 .63-.26.82l-1.25.92a1.38 1.38 0 0 0 0 2.22l1.25.92c.26.19.36.52.27.82a10 10 0 0 1-2.2 3.8.75.75 0 0 1-.85.17l-1.4-.62a1.38 1.38 0 0 0-1.93 1.12l-.17 1.52a.75.75 0 0 1-.58.65 9.5 9.5 0 0 1-4.4 0 .75.75 0 0 1-.57-.65l-.17-1.52a1.38 1.38 0 0 0-1.93-1.11l-1.4.62a.75.75 0 0 1-.85-.18 10 10 0 0 1-2.2-3.8c-.1-.3 0-.63.26-.82l1.25-.92a1.38 1.38 0 0 0 0-2.22l-1.24-.92a.75.75 0 0 1-.28-.82 10 10 0 0 1 2.2-3.8c.23-.23.57-.3.86-.17l1.4.62c.4.17.86.15 1.25-.08.38-.22.63-.6.68-1.04l.17-1.53a.75.75 0 0 1 .58-.65q1.08-.24 2.2-.25m0 1.5q-.67 0-1.35.12l-.11.97a2.9 2.9 0 0 1-4.03 2.33l-.9-.4A8 8 0 0 0 4.29 9.1l.8.59a2.88 2.88 0 0 1 0 4.64l-.8.59a8 8 0 0 0 1.35 2.32l.9-.4a2.88 2.88 0 0 1 4.02 2.32l.1.99q1.35.22 2.7 0l.1-.99a2.88 2.88 0 0 1 4.02-2.32l.9.4a8 8 0 0 0 1.35-2.32l-.8-.59a2.88 2.88 0 0 1 0-4.64l.8-.59a8 8 0 0 0-1.35-2.32l-.9.4q-.55.24-1.15.24c-1.47 0-2.7-1.1-2.86-2.57l-.11-.97q-.68-.11-1.34-.12M12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5m0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5"]);
const Bot24Regular = /* @__PURE__ */ createFluentIcon("Bot24Regular", "24", ["M17.75 14C19 14 20 15 20 16.25v.9c0 1.1-.47 2.14-1.3 2.85q-2.36 2-6.7 2t-6.7-2A3.8 3.8 0 0 1 4 17.16v-.91C4 15 5.01 14 6.25 14zm0 1.5H6.25a.75.75 0 0 0-.75.75v.9c0 .66.29 1.29.79 1.71Q8.17 20.5 12 20.5q3.83-.01 5.72-1.64c.5-.43.78-1.05.78-1.7v-.91a.75.75 0 0 0-.75-.75M11.9 2h.1c.38 0 .7.28.74.65l.01.1v.75h3.5c1.24 0 2.25 1 2.25 2.25v4.5c0 1.25-1 2.25-2.25 2.25h-8.5c-1.24 0-2.25-1-2.25-2.25v-4.5c0-1.24 1-2.25 2.25-2.25h3.5v-.75c0-.38.28-.7.65-.74L12 2zm4.35 3h-8.5a.75.75 0 0 0-.75.75v4.5c0 .42.34.75.75.75h8.5c.41 0 .75-.33.75-.75v-4.5a.75.75 0 0 0-.75-.75m-6.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5m4.5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5"]);
const Color24Regular = /* @__PURE__ */ createFluentIcon("Color24Regular", "24", ["M3.84 5.86C6.78 1.94 12.87.8 17.2 3.5c4.28 2.66 5.86 7.77 4.1 12.57-1.65 4.54-6.01 6.33-9.16 4.05-1.17-.85-1.63-1.92-1.85-3.66l-.1-.99-.05-.4c-.12-.93-.31-1.35-.7-1.57-.54-.3-.9-.3-1.6-.03l-.35.14-.18.08c-1.01.44-1.69.6-2.54.42l-.2-.05-.17-.04c-2.78-.87-3.2-4.65-.56-8.16m.98 6.71.13.04.13.03c.44.09.81.02 1.44-.24l.6-.26c1.2-.5 1.98-.54 3.04.05.92.51 1.28 1.3 1.46 2.66l.06.46.05.53.05.43c.17 1.36.48 2.09 1.24 2.64 2.28 1.65 5.54.3 6.87-3.35 1.52-4.15.18-8.51-3.48-10.79s-8.9-1.3-11.37 1.99c-2.08 2.76-1.82 5.28-.22 5.81m11.23-1.99a1.25 1.25 0 1 1 2.41-.65 1.25 1.25 0 0 1-2.41.65m.5 3.49a1.25 1.25 0 1 1 2.4-.65 1.25 1.25 0 0 1-2.4.65m-2.48-6.5a1.25 1.25 0 1 1 2.41-.64 1.25 1.25 0 0 1-2.41.65m-.03 9a1.25 1.25 0 1 1 2.42-.64 1.25 1.25 0 0 1-2.42.65m-3.5-9.96a1.25 1.25 0 1 1 2.42-.65 1.25 1.25 0 0 1-2.42.65"]);
const Server24Regular = /* @__PURE__ */ createFluentIcon("Server24Regular", "24", ["M9.25 6a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zM8.5 17.75c0-.41.34-.75.75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75M9.25 14a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zM6 5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3zm3-1.5c-.83 0-1.5.67-1.5 1.5v14c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5V5c0-.83-.67-1.5-1.5-1.5z"]);
const Person24Regular = /* @__PURE__ */ createFluentIcon("Person24Regular", "24", ["M17.75 14C19 14 20 15 20 16.25v.57c0 .9-.32 1.76-.9 2.44Q16.74 22.01 12 22q-4.74.01-7.1-2.74a3.8 3.8 0 0 1-.9-2.43v-.58C4 15 5.01 14 6.25 14zm0 1.5H6.25a.75.75 0 0 0-.75.75v.58c0 .53.2 1.05.54 1.46C7.3 19.76 9.26 20.5 12 20.5q4.09 0 5.96-2.21c.35-.41.54-.93.54-1.47v-.57a.75.75 0 0 0-.75-.75M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7"]);
const Apps24Regular = /* @__PURE__ */ createFluentIcon("Apps24Regular", "24", ["m18.5 2.33 3.17 3.18c.88.88.88 2.3 0 3.18l-2.58 2.59A2.25 2.25 0 0 1 21 13.5v5.25C21 20 20 21 18.75 21H5.25C4.01 21 3 20 3 18.75V5.25C3 4.01 4 3 5.25 3h5.25c1.13 0 2.06.83 2.23 1.92l2.58-2.59c.88-.88 2.3-.88 3.18 0m-14 16.42c0 .41.34.75.75.75h6v-6.75H4.5zm8.25.75h6c.41 0 .75-.34.75-.75V13.5a.75.75 0 0 0-.75-.75h-6zm-2.25-15H5.25a.75.75 0 0 0-.75.75v6h6.75v-6a.75.75 0 0 0-.75-.75m2.25 4.81v1.94h1.94zm3.62-5.92L13.2 6.57c-.3.3-.3.77 0 1.06l3.18 3.18c.3.3.77.3 1.06 0l3.18-3.18c.3-.3.3-.77 0-1.06l-3.18-3.18a.75.75 0 0 0-1.06 0"]);
const AppsListDetail24Regular = /* @__PURE__ */ createFluentIcon("AppsListDetail24Regular", "24", ["M4.25 4C3.01 4 2 5 2 6.25v2.5C2 9.99 3 11 4.25 11h2.5C7.99 11 9 10 9 8.75v-2.5C9 5.01 8 4 6.75 4zM3.5 6.25c0-.41.34-.75.75-.75h2.5c.41 0 .75.34.75.75v2.5c0 .41-.34.75-.75.75h-2.5a.75.75 0 0 1-.75-.75zM11.25 5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5zm-7 5C3.01 13 2 14 2 15.25v2.5C2 18.99 3 20 4.25 20h2.5C7.99 20 9 19 9 17.75v-2.5C9 14.01 8 13 6.75 13zm-.75 2.25c0-.41.34-.75.75-.75h2.5c.41 0 .75.34.75.75v2.5c0 .41-.34.75-.75.75h-2.5a.75.75 0 0 1-.75-.75zM11.25 14a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5z"]);
const Save24Regular = /* @__PURE__ */ createFluentIcon("Save24Regular", "24", ["M3 5.75A2.75 2.75 0 0 1 5.75 3h9.96c.87 0 1.7.34 2.3.95L20.05 6c.6.6.95 1.43.95 2.3v9.96A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25C6 13.01 7 12 8.25 12h7.5c1.24 0 2.25 1 2.25 2.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.29c0-.47-.18-.91-.51-1.24L16.95 5q-.4-.4-.95-.49v2.73c0 1.24-1 2.25-2.25 2.25h-4.5C8.01 9.5 7 8.5 7 7.25V4.5zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25zm-8-15v2.75c0 .41.34.75.75.75h4.5c.41 0 .75-.34.75-.75V4.5z"]);
const Info24Regular = /* @__PURE__ */ createFluentIcon("Info24Regular", "24", ["M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20m0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17m0 7c.41 0 .75.34.75.75v5a.75.75 0 0 1-1.5 0v-5c0-.41.34-.75.75-.75M12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"]);
const Image24Regular = /* @__PURE__ */ createFluentIcon("Image24Regular", "24", ["M17.75 3C19.55 3 21 4.46 21 6.25v11.5c0 1.8-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 0 1 3 17.75V6.25C3 4.45 4.46 3 6.25 3zm.58 16.4-5.8-5.69a.75.75 0 0 0-.97-.07l-.08.07-5.81 5.7q.28.09.58.09h11.5q.3 0 .58-.1l-5.8-5.69zm-.58-14.9H6.25c-.97 0-1.75.78-1.75 1.75v11.5q0 .3.1.6l5.83-5.7a2.25 2.25 0 0 1 3.02-.12l.12.11 5.83 5.7q.1-.27.1-.59V6.25c0-.97-.78-1.75-1.75-1.75m-2.5 2a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5m0 1.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"]);
const ImageAdd24Regular = /* @__PURE__ */ createFluentIcon("ImageAdd24Regular", "24", ["M12 6.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0M7 7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 1 0V6h2.5a.5.5 0 0 1 0 1zm10.75-2.5h-5.06a7 7 0 0 0-.71-1.5h5.77C19.55 3 21 4.46 21 6.25v11.5c0 1.8-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 0 1 3 17.75v-5.77q.7.45 1.5.7v5.07q0 .3.1.6l5.83-5.7a2.25 2.25 0 0 1 3.02-.12l.12.11 5.83 5.7q.1-.27.1-.59V6.25c0-.97-.78-1.75-1.75-1.75m.58 14.9-5.8-5.69a.75.75 0 0 0-.97-.07l-.08.07-5.81 5.7q.28.09.58.09h11.5q.3 0 .58-.1M15.25 6.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5m0 1.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"]);
const Eye24Regular = /* @__PURE__ */ createFluentIcon("Eye24Regular", "24", ["M12 9a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0-5a10 10 0 0 1 9.7 7.56.75.75 0 1 1-1.45.37 8.5 8.5 0 0 0-16.5 0 .75.75 0 0 1-1.45-.36A10 10 0 0 1 12 5.5"]);
const Cursor24Regular = /* @__PURE__ */ createFluentIcon("Cursor24Regular", "24", ["M5.5 3.48A1.5 1.5 0 0 1 7.92 2.3L21.44 12.8a1.5 1.5 0 0 1-.93 2.69h-6.85c-.5 0-.98.23-1.3.62l-4.18 5.3a1.5 1.5 0 0 1-2.68-.93zM20.51 14 7 3.48V20.5l4.2-5.3c.59-.75 1.5-1.2 2.46-1.2z"]);
const CursorClick24Regular = /* @__PURE__ */ createFluentIcon("CursorClick24Regular", "24", ["M9.25 2c.41 0 .75.34.75.75v2.5a.75.75 0 0 1-1.5 0v-2.5c0-.41.34-.75.75-.75M4.47 3.97c.3-.3.77-.3 1.06 0l1.75 1.75a.75.75 0 1 1-1.06 1.06L4.47 5.03a.75.75 0 0 1 0-1.06m9.56 0c.3.3.3.77 0 1.06l-1.75 1.75a.75.75 0 1 1-1.06-1.06l1.75-1.75c.3-.3.77-.3 1.06 0M2.5 8.75c0-.41.34-.75.75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m8.18-.26a1.32 1.32 0 0 0-2.18 1v11.27c0 1.21 1.5 1.78 2.3.88l2.62-2.92c.27-.31.66-.5 1.07-.5l3.84-.16a1.32 1.32 0 0 0 .8-2.32zM10 20.29V9.89l7.81 6.69-3.38.13c-.82.03-1.59.4-2.13 1z"]);
const MusicNote224Regular = /* @__PURE__ */ createFluentIcon("MusicNote224Regular", "24", ["M19.7 2.15q.3.23.3.6V16.5a3.5 3.5 0 1 1-1.5-2.87V7.76L10 10.3v8.19a3.5 3.5 0 1 1-1.5-2.87V5.75c0-.33.22-.62.53-.72l10-3a.8.8 0 0 1 .67.12M10 8.75l8.5-2.56V3.76L10 6.3zM6.5 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4m8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0"]);
const Games24Regular = /* @__PURE__ */ createFluentIcon("Games24Regular", "24", ["M15 5a7 7 0 0 1 .24 14H9a7 7 0 0 1-.24-14H15m0 1.5H9a5.5 5.5 0 0 0-.22 11H15a5.5 5.5 0 0 0 .22-11zM8 9c.41 0 .75.34.75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 1 1 0-1.5h1.5v-1.5c0-.41.34-.75.75-.75m6.75 3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5m2-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5"]);
const Pin24Regular = /* @__PURE__ */ createFluentIcon("Pin24Regular", "24", ["m16.24 2.93 4.83 4.83a2.75 2.75 0 0 1-.72 4.4l-4.87 2.44a.8.8 0 0 0-.37.42l-1.44 4.17a1.25 1.25 0 0 1-2.07.48l-3.1-3.1L4.06 21H3v-1.06l4.44-4.44-3.1-3.1c-.66-.66-.4-1.77.47-2.07l4.17-1.44q.28-.1.42-.37l2.44-4.87a2.75 2.75 0 0 1 4.4-.72m3.77 5.89-4.83-4.83c-.6-.6-1.62-.44-2 .33l-2.44 4.87c-.26.52-.72.93-1.27 1.12l-3.8 1.3 6.71 6.71 1.31-3.79c.2-.55.6-1.01 1.12-1.27l4.87-2.44c.77-.38.93-1.4.33-2"]);
const ScanText24Regular = /* @__PURE__ */ createFluentIcon("ScanText24Regular", "24", ["M5.25 3.5c-.97 0-1.75.78-1.75 1.75v3a.75.75 0 0 1-1.5 0v-3C2 3.45 3.46 2 5.25 2h3a.75.75 0 0 1 0 1.5zm0 17c-.97 0-1.75-.78-1.75-1.75v-3a.75.75 0 0 0-1.5 0v3C2 20.55 3.46 22 5.25 22h3a.75.75 0 0 0 0-1.5zM20.5 5.25c0-.97-.78-1.75-1.75-1.75h-3a.75.75 0 0 1 0-1.5h3C20.55 2 22 3.46 22 5.25v3a.75.75 0 0 1-1.5 0zM18.75 20.5c.97 0 1.75-.78 1.75-1.75v-3a.75.75 0 0 1 1.5 0v3c0 1.8-1.46 3.25-3.25 3.25h-3a.75.75 0 0 1 0-1.5zM7.75 7a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5zM7 11.75c0-.41.34-.75.75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75M7.75 15a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5z"]);
const TextEditStyle24Regular = /* @__PURE__ */ createFluentIcon("TextEditStyle24Regular", "24", ["M20.06 8.45a3.2 3.2 0 0 1 0 4.55l-7.12 7.1q-.4.4-.94.57l-4.3 1.29a1 1 0 0 1-1.24-1.27l1.36-4.22q.17-.52.56-.9l7.13-7.13a3.2 3.2 0 0 1 4.55 0m-3.5 1.05-7.12 7.13a1 1 0 0 0-.19.3l-1.07 3.32 3.38-1.02q.18-.05.32-.18L19 11.94a1.72 1.72 0 1 0-2.43-2.44m-8.4-7.13.04.1 3.25 8.25-1.15 1.16L9.56 10H5.44l-1 2.52a.75.75 0 0 1-.87.45l-.1-.03a.75.75 0 0 1-.45-.87l.03-.1 3.76-9.5a.75.75 0 0 1 1.34-.1M7.5 4.79 6.04 8.5h2.92z"]);
const TextField24Regular = /* @__PURE__ */ createFluentIcon("TextField24Regular", "24", ["M15.5 7.5h-2.75v9h.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5h.5v-9H8.5v.75a.75.75 0 1 1-1.5 0v-1.5c0-.41.34-.75.75-.75h8.5c.41 0 .75.34.75.75v1.5a.75.75 0 0 1-1.5 0zM5.75 3A3.75 3.75 0 0 0 2 6.75v10.5A3.75 3.75 0 0 0 5.75 21h12.5A3.75 3.75 0 0 0 22 17.25V6.75A3.75 3.75 0 0 0 18.25 3zM3.5 6.75c0-1.24 1-2.25 2.25-2.25h12.5c1.24 0 2.25 1 2.25 2.25v10.5c0 1.24-1 2.25-2.25 2.25H5.75c-1.24 0-2.25-1-2.25-2.25z"]);
const Keyboard24Regular = /* @__PURE__ */ createFluentIcon("Keyboard24Regular", "24", ["M19.75 5C20.99 5 22 6 22 7.25v9.5C22 18 20.99 19 19.75 19H4.25C3.01 19 2 18 2 16.75v-9.5C2 6.01 3 5 4.25 5zm0 1.5H4.25a.75.75 0 0 0-.75.75v9.5c0 .42.34.75.75.75h15.5c.41 0 .75-.33.75-.75v-9.5a.75.75 0 0 0-.75-.75m-13 8h10.5a.75.75 0 0 1 .1 1.5H6.75a.75.75 0 0 1-.1-1.5zh10.5zM16.5 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2m-6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2m-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2m6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2M6 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"]);
const Sparkle24Regular = /* @__PURE__ */ createFluentIcon("Sparkle24Regular", "24", ["M8.67 15.73q.37.27.83.27a1.4 1.4 0 0 0 1.33-.88l.61-1.86a2.9 2.9 0 0 1 1.82-1.81l1.78-.58a1.44 1.44 0 0 0-.06-2.74l-1.75-.57a2.9 2.9 0 0 1-1.82-1.82l-.58-1.78a1.45 1.45 0 0 0-2.73.02l-.59 1.8a2.9 2.9 0 0 1-1.77 1.78l-1.77.57a1.44 1.44 0 0 0 .01 2.73l1.76.57a2.9 2.9 0 0 1 1.82 1.83l.58 1.77q.15.44.53.7m-.38-4.25-.36-.4A4.4 4.4 0 0 0 6.21 10l-1.6-.5 1.61-.53A4.4 4.4 0 0 0 8.95 6.2l.52-1.58.51 1.59a4.4 4.4 0 0 0 2.79 2.77l1.61.52-1.58.52a4.4 4.4 0 0 0-2.78 2.77l-.51 1.59-.52-1.59q-.25-.71-.7-1.3m8.04 9.3q-.29-.2-.4-.55l-.34-1a1.3 1.3 0 0 0-.82-.83l-.99-.32A1.15 1.15 0 0 1 13 17a1.1 1.1 0 0 1 .77-1.08l1-.33a1.3 1.3 0 0 0 .8-.82l.33-.99a1.14 1.14 0 0 1 2.16-.02l.33 1.01a1.3 1.3 0 0 0 .82.82l.99.32a1.14 1.14 0 0 1 .04 2.17l-1.01.33a1.3 1.3 0 0 0-.82.82l-.32.99a1.14 1.14 0 0 1-1.76.56M15.3 17a2.8 2.8 0 0 1 1.7 1.7 2.8 2.8 0 0 1 1.7-1.7 2.8 2.8 0 0 1-1.72-1.7A2.8 2.8 0 0 1 15.3 17"]);
const ErrorCircle24Regular = /* @__PURE__ */ createFluentIcon("ErrorCircle24Regular", "24", ["M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20m0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17m0 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2M12 7c.37 0 .69.28.74.65v4.6a.75.75 0 0 1-1.48.1l-.01-.1v-4.5c0-.41.33-.75.74-.75"]);
const TopSpeed24Regular = /* @__PURE__ */ createFluentIcon("TopSpeed24Regular", "24", ["M6.54 5.48a8.5 8.5 0 0 1 4.71-1.95v1.72a.75.75 0 0 0 1.5 0V3.53a8.5 8.5 0 0 1 7.74 7.97h-1.74a.75.75 0 0 0 0 1.5h1.7a8.5 8.5 0 0 1-3.17 5.67.75.75 0 0 0 .94 1.16A10 10 0 0 0 22 12a10 10 0 1 0-16.23 7.83.75.75 0 0 0 .96-1.16A8.7 8.7 0 0 1 3.56 13h1.69a.75.75 0 0 0 0-1.5H3.51c.11-1.88.84-3.6 1.97-4.96l1.24 1.24a.75.75 0 0 0 1.06-1.06zm10.22 1.15a.65.65 0 0 0-.8.02l-.23.18-4.21 3.6-1.1 1.05c-.66.8-.52 1.98.3 2.62s2.03.5 2.68-.3q.14-.19.32-.5l.46-.8a153 153 0 0 0 2.62-4.85l.13-.24a.6.6 0 0 0-.17-.78"]);
const PresenceGroupChildContext = reactExports.createContext(void 0);
PresenceGroupChildContext.Provider;
function useMountedState(visible = false, unmountOnExit = false) {
  const mountedRef = reactExports.useRef(unmountOnExit ? visible : true);
  const forceUpdate = useForceUpdate();
  const setMounted = reactExports.useCallback((newValue) => {
    if (mountedRef.current !== newValue) {
      mountedRef.current = newValue;
      forceUpdate();
    }
  }, [
    forceUpdate
  ]);
  reactExports.useEffect(() => {
    if (visible) {
      mountedRef.current = visible;
    }
  });
  return [
    visible || mountedRef.current,
    setMounted
  ];
}
const PRESENCE_MOTION_DEFINITION = /* @__PURE__ */ Symbol("PRESENCE_MOTION_DEFINITION");
const INTERRUPTABLE_MOTION_SYMBOL = /* @__PURE__ */ Symbol.for("interruptablePresence");
function createPresenceComponent(value) {
  return Object.assign((props) => {
    const itemContext = reactExports.useContext(PresenceGroupChildContext);
    const merged = {
      ...itemContext,
      ...props
    };
    const skipMotions = useMotionBehaviourContext() === "skip";
    const { appear, children, imperativeRef, onExit, onMotionFinish, onMotionStart, onMotionCancel, visible, unmountOnExit, ..._rest } = merged;
    const params = _rest;
    const [mounted, setMounted] = useMountedState(visible, unmountOnExit);
    const [child, childRef] = useChildElement(children, mounted);
    const handleRef = useMotionImperativeRef(imperativeRef);
    const optionsRef = reactExports.useRef({
      appear,
      params,
      skipMotions
    });
    const animateAtoms = useAnimateAtoms();
    const isFirstMount = useFirstMount();
    const isReducedMotion = useIsReducedMotion();
    const handleMotionStart = useEventCallback((direction) => {
      onMotionStart === null || onMotionStart === void 0 ? void 0 : onMotionStart(null, {
        direction
      });
    });
    const handleMotionFinish = useEventCallback((direction) => {
      onMotionFinish === null || onMotionFinish === void 0 ? void 0 : onMotionFinish(null, {
        direction
      });
      if (direction === "exit" && unmountOnExit) {
        setMounted(false);
        onExit === null || onExit === void 0 ? void 0 : onExit();
      }
    });
    const handleMotionCancel = useEventCallback((direction) => {
      onMotionCancel === null || onMotionCancel === void 0 ? void 0 : onMotionCancel(null, {
        direction
      });
    });
    useIsomorphicLayoutEffect(() => {
      optionsRef.current = {
        appear,
        params,
        skipMotions
      };
    });
    useIsomorphicLayoutEffect(
      () => {
        const element = childRef.current;
        if (!element) {
          return;
        }
        let handle;
        function cleanup() {
          if (!handle) {
            return;
          }
          if (IS_EXPERIMENTAL_INTERRUPTIBLE_MOTION && handle.isRunning()) {
            return;
          }
          handle.cancel();
          handleRef.current = void 0;
        }
        const presenceMotion = typeof value === "function" ? value({
          element,
          ...optionsRef.current.params
        }) : value;
        const IS_EXPERIMENTAL_INTERRUPTIBLE_MOTION = presenceMotion[INTERRUPTABLE_MOTION_SYMBOL];
        if (IS_EXPERIMENTAL_INTERRUPTIBLE_MOTION) {
          handle = handleRef.current;
          if (handle && handle.isRunning()) {
            handle.reverse();
            return cleanup;
          }
        }
        const atoms = visible ? presenceMotion.enter : presenceMotion.exit;
        const direction = visible ? "enter" : "exit";
        const applyInitialStyles = !optionsRef.current.appear && isFirstMount;
        const skipAnimationByConfig = optionsRef.current.skipMotions;
        if (!applyInitialStyles) {
          handleMotionStart(direction);
        }
        handle = animateAtoms(element, atoms, {
          isReducedMotion: isReducedMotion()
        });
        if (applyInitialStyles) {
          handle.finish();
          return cleanup;
        }
        handleRef.current = handle;
        handle.setMotionEndCallbacks(() => handleMotionFinish(direction), () => handleMotionCancel(direction));
        if (skipAnimationByConfig) {
          handle.finish();
        }
        return cleanup;
      },
      // Excluding `isFirstMount` from deps to prevent re-triggering the animation on subsequent renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        animateAtoms,
        childRef,
        handleRef,
        isReducedMotion,
        handleMotionFinish,
        handleMotionStart,
        handleMotionCancel,
        visible
      ]
    );
    reactExports.useEffect(() => {
      if (unmountOnExit && !mounted) {
        var _handleRef_current;
        (_handleRef_current = handleRef.current) === null || _handleRef_current === void 0 ? void 0 : _handleRef_current.dispose();
      }
    }, [
      handleRef,
      unmountOnExit,
      mounted
    ]);
    if (mounted) {
      return child;
    }
    return null;
  }, {
    // Heads up!
    // Always normalize it to a function to simplify types
    [PRESENCE_MOTION_DEFINITION]: typeof value === "function" ? value : () => value
  }, {
    // Wrap `enter` in its own motion component as a static method, e.g. <Fade.In>
    In: createMotionComponent(
      // If we have a motion function, wrap it to forward the runtime params and pick `enter`.
      // Otherwise, pass the `enter` motion object directly.
      typeof value === "function" ? (...args) => value(...args).enter : value.enter
    ),
    // Wrap `exit` in its own motion component as a static method, e.g. <Fade.Out>
    Out: createMotionComponent(
      // If we have a motion function, wrap it to forward the runtime params and pick `exit`.
      // Otherwise, pass the `exit` motion object directly.
      typeof value === "function" ? (...args) => value(...args).exit : value.exit
    )
  });
}
function createPresenceFnVariant(presenceFn, variantParams) {
  const variantFn = (runtimeParams) => presenceFn({
    ...variantParams,
    ...runtimeParams
  });
  return variantFn;
}
function createPresenceComponentVariant(component, variantParams) {
  const originalFn = component[PRESENCE_MOTION_DEFINITION];
  const variantFn = createPresenceFnVariant(originalFn, variantParams);
  return createPresenceComponent(variantFn);
}
const MotionRefForwarderContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useMotionForwardedRef() {
  return reactExports.useContext(MotionRefForwarderContext);
}
const MotionRefForwarder = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(MotionRefForwarderContext.Provider, {
    value: ref
  }, props.children);
});
MotionRefForwarder.displayName = "MotionRefForwarder";
const MotionRefForwarderReset = (props) => {
  return /* @__PURE__ */ reactExports.createElement(MotionRefForwarderContext.Provider, {
    value: void 0
  }, props.children);
};
MotionRefForwarderReset.displayName = "MotionRefForwarderReset";
function presenceMotionSlot(motion, options) {
  const { as, children, ...rest } = motion !== null && motion !== void 0 ? motion : {};
  if (motion === null) {
    const isUnmounted = !options.defaultProps.visible && options.defaultProps.unmountOnExit;
    const renderFn = (_, props) => isUnmounted ? null : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, props.children);
    return {
      [SLOT_RENDER_FUNCTION_SYMBOL]: renderFn,
      [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType
    };
  }
  const propsWithMetadata = {
    ...options.defaultProps,
    ...rest,
    [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType
  };
  if (typeof children === "function") {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = children;
  }
  return propsWithMetadata;
}
const fadeAtom$1 = ({ direction, duration, easing = motionTokens.curveLinear, delay = 0, outOpacity = 0, inOpacity = 1 }) => {
  const keyframes = [
    {
      opacity: outOpacity
    },
    {
      opacity: inOpacity
    }
  ];
  if (direction === "exit") {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay,
    // Applying opacity backwards and forwards in time is important
    // to avoid a bug where a delayed animation is not hidden when it should be.
    fill: "both"
  };
};
const fadePresenceFn = ({ duration = motionTokens.durationNormal, easing = motionTokens.curveEasyEase, delay = 0, exitDuration = duration, exitEasing = easing, exitDelay = delay, outOpacity = 0, inOpacity = 1 }) => {
  return {
    enter: fadeAtom$1({
      direction: "enter",
      duration,
      easing,
      delay,
      outOpacity,
      inOpacity
    }),
    exit: fadeAtom$1({
      direction: "exit",
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      outOpacity,
      inOpacity
    })
  };
};
const Fade = createPresenceComponent(fadePresenceFn);
createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationFast
});
const FadeRelaxed = createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationGentle
});
const scaleAtom = ({ direction, duration, easing = motionTokens.curveLinear, delay = 0, outScale = 0.9, inScale = 1 }) => {
  const keyframes = [
    {
      scale: outScale
    },
    {
      scale: inScale
    }
  ];
  if (direction === "exit") {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay
  };
};
const scalePresenceFn = ({ duration = motionTokens.durationGentle, easing = motionTokens.curveDecelerateMax, delay = 0, exitDuration = motionTokens.durationNormal, exitEasing = motionTokens.curveAccelerateMax, exitDelay = delay, outScale = 0.9, inScale = 1, animateOpacity = true }) => {
  const enterAtoms = [
    scaleAtom({
      direction: "enter",
      duration,
      easing,
      delay,
      outScale,
      inScale
    })
  ];
  const exitAtoms = [
    scaleAtom({
      direction: "exit",
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      outScale,
      inScale
    })
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom$1({
      direction: "enter",
      duration,
      easing,
      delay
    }));
    exitAtoms.push(fadeAtom$1({
      direction: "exit",
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay
    }));
  }
  return {
    enter: enterAtoms,
    exit: exitAtoms
  };
};
const Scale = createPresenceComponent(scalePresenceFn);
createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
  exitDuration: motionTokens.durationFast
});
createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  exitDuration: motionTokens.durationGentle
});
const DATA_POSITIONING_INTERSECTING = "data-popper-is-intersecting";
const DATA_POSITIONING_ESCAPED = "data-popper-escaped";
const DATA_POSITIONING_HIDDEN = "data-popper-reference-hidden";
const DATA_POSITIONING_PLACEMENT = "data-popper-placement";
const POSITIONING_END_EVENT = "fui-positioningend";
const DEFAULT_CONFIGURATION = ({ options }) => {
  return options;
};
const PositioningConfigurationContext = reactExports.createContext(void 0);
PositioningConfigurationContext.Provider;
const usePositioningConfiguration = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(PositioningConfigurationContext)) !== null && _React_useContext !== void 0 ? _React_useContext : DEFAULT_CONFIGURATION;
};
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp$1(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  var _padding$top, _padding$right, _padding$bottom, _padding$left;
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const alignment = getAlignment(placement);
  if (alignment) {
    coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
  }
  return coords;
}
async function detectOverflow$1(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) && await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow: detectOverflow$1
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$1 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp$1(minPadding, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const clampCoord = (axis, coord) => clamp$1(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
      if (checkMainAxis) {
        mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
      }
      if (checkCrossAxis) {
        crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const limitShift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      var _rawOffset$mainAxis, _rawOffset$crossAxis;
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
        crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
const size$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const shiftData = state.middlewareData.shift;
      const noShift = !shiftData;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (shiftData != null && shiftData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if (shiftData != null && shiftData.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        if (isYAxis) {
          availableWidth = width - 2 * max(overflow.left, overflow.right);
        } else {
          availableHeight = height - 2 * max(overflow.top, overflow.bottom);
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode$1(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode$1(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode$1(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode$1(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, []));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement && offsetParent) {
    const win = getWindow(domElement);
    const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
  const scroll = getNodeScroll(html);
  const body = html.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(html);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) {
    rootBoundary = "viewport";
  }
  const isLayoutViewport = rootBoundary === "layoutViewport";
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x = -visualViewport.offsetLeft;
        y = -visualViewport.offsetTop;
      }
    } else {
      width = visualViewport.width;
      height = visualViewport.height;
      if (layoutRelativeClientCoords) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
    if (gutter <= SCROLLBAR_MAX) {
      width -= gutter;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = getScale(element);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
    rect = getViewportRect(element, strategy, clippingAncestor);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, []).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let lastKeptComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode$1(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
    const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      lastKeptComputedStyle = computedStyle;
    }
    currentNode = getParentNode$1(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  if (!isOffsetParentAnElement && documentElement) {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode$1(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode$1(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
const detectOverflow = detectOverflow$1;
const offset$1 = offset$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const size = size$1;
const hide = hide$1;
const arrow = arrow$1;
const limitShift = limitShift$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = options != null ? options : {};
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
function parseFloatingUIPlacement(placement) {
  const tokens = placement.split("-");
  return {
    side: tokens[0],
    alignment: tokens[1]
  };
}
const getParentNode = (node) => {
  if (node.nodeName === "HTML") {
    return node;
  }
  return node.parentNode || node.host;
};
const getStyleComputedProperty = (node) => {
  var _node_ownerDocument;
  if (node.nodeType !== 1) {
    return {};
  }
  const targetWindow = (_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0 ? void 0 : _node_ownerDocument.defaultView;
  if (targetWindow) {
    return targetWindow.getComputedStyle(node, null);
  }
  return {};
};
const getScrollParent = (node) => {
  const parentNode = node && getParentNode(node);
  if (!parentNode) return document.body;
  switch (parentNode.nodeName) {
    case "HTML":
    case "BODY":
      return parentNode.ownerDocument.body;
    case "#document":
      return parentNode.body;
  }
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(parentNode);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return parentNode;
  }
  return getScrollParent(parentNode);
};
const hasScrollParent = (node) => {
  var _scrollParentElement_ownerDocument;
  const scrollParentElement = getScrollParent(node);
  return scrollParentElement ? scrollParentElement !== ((_scrollParentElement_ownerDocument = scrollParentElement.ownerDocument) === null || _scrollParentElement_ownerDocument === void 0 ? void 0 : _scrollParentElement_ownerDocument.body) : false;
};
function getBoundary(element, boundary) {
  if (boundary === "window") {
    return element === null || element === void 0 ? void 0 : element.ownerDocument.documentElement;
  }
  if (boundary === "clippingParents") {
    return "clippingAncestors";
  }
  if (boundary === "scrollParent") {
    let boundariesNode = getScrollParent(element);
    if (boundariesNode.nodeName === "BODY") {
      boundariesNode = element === null || element === void 0 ? void 0 : element.ownerDocument.documentElement;
    }
    return boundariesNode;
  }
  return boundary;
}
function toFloatingUIPadding(padding, isRtl) {
  if (typeof padding === "number") {
    return padding;
  }
  const { start, end, ...verticalPadding } = padding;
  const paddingObject = verticalPadding;
  const left = isRtl ? "end" : "start";
  const right = isRtl ? "start" : "end";
  if (padding[left]) {
    paddingObject.left = padding[left];
  }
  if (padding[right]) {
    paddingObject.right = padding[right];
  }
  return paddingObject;
}
const getPositionMap$1 = (rtl) => ({
  above: "top",
  below: "bottom",
  before: rtl ? "right" : "left",
  after: rtl ? "left" : "right"
});
const getAlignmentMap$1 = () => ({
  start: "start",
  end: "end",
  top: "start",
  bottom: "end",
  center: void 0
});
const shouldAlignToCenter = (p, a) => {
  const positionedVertically = p === "above" || p === "below";
  const alignedVertically = a === "top" || a === "bottom";
  return positionedVertically && alignedVertically || !positionedVertically && !alignedVertically;
};
const toFloatingUIPlacement = (align, position, rtl) => {
  const alignment = shouldAlignToCenter(position, align) ? "center" : align;
  const computedPosition = position && getPositionMap$1(rtl)[position];
  const computedAlignment = alignment && getAlignmentMap$1()[alignment];
  if (computedPosition && computedAlignment) {
    return `${computedPosition}-${computedAlignment}`;
  }
  return computedPosition;
};
const getPositionMap = () => ({
  top: "above",
  bottom: "below",
  right: "after",
  left: "before"
});
const getAlignmentMap = (position) => {
  if (position === "above" || position === "below") {
    return {
      start: "start",
      end: "end"
    };
  }
  return {
    start: "top",
    end: "bottom"
  };
};
const fromFloatingUIPlacement = (placement) => {
  const { side, alignment: floatingUIAlignment } = parseFloatingUIPlacement(placement);
  const position = getPositionMap()[side];
  const alignment = floatingUIAlignment && getAlignmentMap(position)[floatingUIAlignment];
  return {
    position,
    alignment
  };
};
const shorthandLookup = {
  above: {
    position: "above",
    align: "center"
  },
  "above-start": {
    position: "above",
    align: "start"
  },
  "above-end": {
    position: "above",
    align: "end"
  },
  below: {
    position: "below",
    align: "center"
  },
  "below-start": {
    position: "below",
    align: "start"
  },
  "below-end": {
    position: "below",
    align: "end"
  },
  before: {
    position: "before",
    align: "center"
  },
  "before-top": {
    position: "before",
    align: "top"
  },
  "before-bottom": {
    position: "before",
    align: "bottom"
  },
  after: {
    position: "after",
    align: "center"
  },
  "after-top": {
    position: "after",
    align: "top"
  },
  "after-bottom": {
    position: "after",
    align: "bottom"
  }
};
function resolvePositioningShorthand(shorthand) {
  if (shorthand === void 0 || shorthand === null) {
    return {};
  }
  if (typeof shorthand === "string") {
    return shorthandLookup[shorthand];
  }
  return shorthand;
}
function useCallbackRef(initialValue, callback, skipInitialResolve) {
  const isFirst = reactExports.useRef(true);
  const [ref] = reactExports.useState(() => ({
    // value
    value: initialValue,
    // last callback
    callback,
    // "memoized" public interface
    facade: {
      get current() {
        return ref.value;
      },
      set current(value) {
        const last = ref.value;
        if (last !== value) {
          ref.value = value;
          ref.callback(value, last);
        }
      }
    }
  }));
  useIsomorphicLayoutEffect(() => {
    isFirst.current = false;
  }, []);
  ref.callback = callback;
  return ref.facade;
}
function debounce(fn) {
  let pending;
  return () => {
    if (!pending) {
      pending = new Promise((resolve) => {
        Promise.resolve().then(() => {
          pending = void 0;
          resolve(fn());
        });
      });
    }
    return pending;
  };
}
function writeArrowUpdates(options) {
  const { arrow: arrow2, middlewareData } = options;
  if (!middlewareData.arrow || !arrow2) {
    return;
  }
  const { x: arrowX, y: arrowY } = middlewareData.arrow;
  Object.assign(arrow2.style, {
    left: arrowX !== null && arrowX !== void 0 ? `${arrowX}px` : "",
    top: arrowY !== null && arrowY !== void 0 ? `${arrowY}px` : ""
  });
}
function writeContainerUpdates(options) {
  var _middlewareData_hide, _middlewareData_hide1, _container_ownerDocument_defaultView;
  const { container, placement, middlewareData, strategy, lowPPI, coordinates, useTransform = true } = options;
  if (!container) {
    return;
  }
  container.setAttribute(DATA_POSITIONING_PLACEMENT, placement);
  container.removeAttribute(DATA_POSITIONING_INTERSECTING);
  if (middlewareData.intersectionObserver.intersecting) {
    container.setAttribute(DATA_POSITIONING_INTERSECTING, "");
  }
  container.removeAttribute(DATA_POSITIONING_ESCAPED);
  if ((_middlewareData_hide = middlewareData.hide) === null || _middlewareData_hide === void 0 ? void 0 : _middlewareData_hide.escaped) {
    container.setAttribute(DATA_POSITIONING_ESCAPED, "");
  }
  container.removeAttribute(DATA_POSITIONING_HIDDEN);
  if ((_middlewareData_hide1 = middlewareData.hide) === null || _middlewareData_hide1 === void 0 ? void 0 : _middlewareData_hide1.referenceHidden) {
    container.setAttribute(DATA_POSITIONING_HIDDEN, "");
  }
  const devicePixelRatio = ((_container_ownerDocument_defaultView = container.ownerDocument.defaultView) === null || _container_ownerDocument_defaultView === void 0 ? void 0 : _container_ownerDocument_defaultView.devicePixelRatio) || 1;
  const x = Math.round(coordinates.x * devicePixelRatio) / devicePixelRatio;
  const y = Math.round(coordinates.y * devicePixelRatio) / devicePixelRatio;
  Object.assign(container.style, {
    position: strategy
  });
  if (useTransform) {
    Object.assign(container.style, {
      transform: lowPPI ? `translate(${x}px, ${y}px)` : `translate3d(${x}px, ${y}px, 0)`
    });
    return;
  }
  Object.assign(container.style, {
    left: `${x}px`,
    top: `${y}px`
  });
}
const normalizeAutoSize = (autoSize) => {
  switch (autoSize) {
    case "always":
    case true:
      return {
        applyMaxWidth: true,
        applyMaxHeight: true
      };
    case "width-always":
    case "width":
      return {
        applyMaxWidth: true,
        applyMaxHeight: false
      };
    case "height-always":
    case "height":
      return {
        applyMaxWidth: false,
        applyMaxHeight: true
      };
    default:
      return false;
  }
};
function listScrollParents(node) {
  const scrollParents = [];
  let cur = node;
  while (cur) {
    const scrollParent = getScrollParent(cur);
    if (node.ownerDocument.body === scrollParent) {
      scrollParents.push(scrollParent);
      break;
    }
    if (scrollParent.nodeName === "BODY" && scrollParent !== node.ownerDocument.body) {
      break;
    }
    scrollParents.push(scrollParent);
    cur = scrollParent;
  }
  return scrollParents;
}
function createResizeObserver(targetWindow, callback) {
  return new targetWindow.ResizeObserver(callback);
}
function isLayoutViewportUnavailable(container) {
  const { clientWidth, clientHeight } = container.ownerDocument.documentElement;
  return clientWidth === 0 && clientHeight === 0;
}
function createPositionManager(options) {
  let isDestroyed = false;
  const { container, target, arrow: arrow2, strategy, middleware, placement, useTransform = true, disableUpdateOnResize = false } = options;
  const targetWindow = container.ownerDocument.defaultView;
  if (!target || !container || !targetWindow) {
    return {
      updatePosition: () => void 0,
      dispose: () => void 0
    };
  }
  const resizeObserver = disableUpdateOnResize ? null : createResizeObserver(targetWindow, (entries) => {
    const shouldUpdateOnResize = entries.every((entry) => {
      return entry.contentRect.width > 0 && entry.contentRect.height > 0;
    });
    if (shouldUpdateOnResize) {
      updatePosition();
    }
  });
  let isFirstUpdate = true;
  const scrollParents = /* @__PURE__ */ new Set();
  Object.assign(container.style, {
    position: "fixed",
    left: 0,
    top: 0,
    margin: 0
  });
  const forceUpdate = () => {
    if (isDestroyed) {
      return;
    }
    if (isFirstUpdate) {
      listScrollParents(container).forEach((scrollParent) => scrollParents.add(scrollParent));
      if (isHTMLElement$1(target)) {
        listScrollParents(target).forEach((scrollParent) => scrollParents.add(scrollParent));
      }
      scrollParents.forEach((scrollParent) => {
        scrollParent.addEventListener("scroll", updatePosition, {
          passive: true
        });
      });
      resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(container);
      if (isHTMLElement$1(target)) {
        resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(target);
      }
      isFirstUpdate = false;
    }
    Object.assign(container.style, {
      position: strategy
    });
    computePosition(target, container, {
      placement,
      middleware,
      strategy
    }).then(({ x, y, middlewareData, placement: computedPlacement }) => {
      var _positioningMiddlewareData_hide, _positioningMiddlewareData_hide1;
      if (isDestroyed) {
        return;
      }
      const positioningMiddlewareData = isLayoutViewportUnavailable(container) ? {
        ...middlewareData,
        hide: {
          ...middlewareData.hide,
          escaped: false,
          referenceHidden: false
        }
      } : middlewareData;
      writeArrowUpdates({
        arrow: arrow2,
        middlewareData: positioningMiddlewareData
      });
      writeContainerUpdates({
        container,
        middlewareData: positioningMiddlewareData,
        placement: computedPlacement,
        coordinates: {
          x,
          y
        },
        lowPPI: ((targetWindow === null || targetWindow === void 0 ? void 0 : targetWindow.devicePixelRatio) || 1) <= 1,
        strategy,
        useTransform
      });
      var _positioningMiddlewareData_hide_escaped, _positioningMiddlewareData_hide_referenceHidden;
      container.dispatchEvent(new CustomEvent(POSITIONING_END_EVENT, {
        detail: {
          // Cast from Floating UI's Placement to the Fluent-owned PositioningPlacement.
          // These are equivalent string unions; the cast avoids leaking @floating-ui/dom
          // types into the public API surface.
          placement: computedPlacement,
          escaped: (_positioningMiddlewareData_hide_escaped = (_positioningMiddlewareData_hide = positioningMiddlewareData.hide) === null || _positioningMiddlewareData_hide === void 0 ? void 0 : _positioningMiddlewareData_hide.escaped) !== null && _positioningMiddlewareData_hide_escaped !== void 0 ? _positioningMiddlewareData_hide_escaped : false,
          referenceHidden: (_positioningMiddlewareData_hide_referenceHidden = (_positioningMiddlewareData_hide1 = positioningMiddlewareData.hide) === null || _positioningMiddlewareData_hide1 === void 0 ? void 0 : _positioningMiddlewareData_hide1.referenceHidden) !== null && _positioningMiddlewareData_hide_referenceHidden !== void 0 ? _positioningMiddlewareData_hide_referenceHidden : false
        }
      }));
    }).catch((err) => {
    });
  };
  const updatePosition = debounce(() => forceUpdate());
  const dispose = () => {
    isDestroyed = true;
    if (targetWindow) {
      targetWindow.removeEventListener("scroll", updatePosition);
      targetWindow.removeEventListener("resize", updatePosition);
    }
    scrollParents.forEach((scrollParent) => {
      scrollParent.removeEventListener("scroll", updatePosition);
    });
    scrollParents.clear();
    resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect();
  };
  if (targetWindow) {
    targetWindow.addEventListener("scroll", updatePosition, {
      passive: true
    });
    targetWindow.addEventListener("resize", updatePosition);
  }
  updatePosition();
  return {
    updatePosition,
    dispose
  };
}
function coverTarget() {
  return {
    name: "coverTarget",
    fn: (middlewareArguments) => {
      const { placement, rects, x, y } = middlewareArguments;
      const basePlacement = parseFloatingUIPlacement(placement).side;
      const newCoords = {
        x,
        y
      };
      switch (basePlacement) {
        case "bottom":
          newCoords.y -= rects.reference.height;
          break;
        case "top":
          newCoords.y += rects.reference.height;
          break;
        case "left":
          newCoords.x += rects.reference.width;
          break;
        case "right":
          newCoords.x -= rects.reference.width;
          break;
      }
      return newCoords;
    }
  };
}
function flip(options) {
  const { hasScrollableElement, flipBoundary, container, fallbackPositions = [], isRtl } = options;
  const fallbackPlacements = fallbackPositions.reduce((acc, shorthand) => {
    const { position, align } = resolvePositioningShorthand(shorthand);
    const placement = toFloatingUIPlacement(align, position, isRtl);
    if (placement) {
      acc.push(placement);
    }
    return acc;
  }, []);
  return flip$1({
    ...hasScrollableElement && {
      boundary: "clippingAncestors"
    },
    ...flipBoundary && {
      altBoundary: true,
      boundary: getBoundary(container, flipBoundary)
    },
    fallbackStrategy: "bestFit",
    ...fallbackPlacements.length && {
      fallbackPlacements
    }
  });
}
function intersecting() {
  return {
    name: "intersectionObserver",
    fn: async (middlewareArguments) => {
      const floatingRect = middlewareArguments.rects.floating;
      const altOverflow = await detectOverflow(middlewareArguments, {
        altBoundary: true
      });
      const isIntersectingTop = altOverflow.top < floatingRect.height && altOverflow.top > 0;
      const isIntersectingBottom = altOverflow.bottom < floatingRect.height && altOverflow.bottom > 0;
      const isIntersecting = isIntersectingTop || isIntersectingBottom;
      return {
        data: {
          intersecting: isIntersecting
        }
      };
    }
  };
}
const resetMaxSize = (autoSize) => ({
  name: "resetMaxSize",
  fn({ middlewareData, elements }) {
    var _middlewareData_resetMaxSize;
    if ((_middlewareData_resetMaxSize = middlewareData.resetMaxSize) === null || _middlewareData_resetMaxSize === void 0 ? void 0 : _middlewareData_resetMaxSize.maxSizeAlreadyReset) {
      return {};
    }
    const { applyMaxWidth, applyMaxHeight } = autoSize;
    if (applyMaxWidth) {
      elements.floating.style.removeProperty("box-sizing");
      elements.floating.style.removeProperty("max-width");
      elements.floating.style.removeProperty("width");
    }
    if (applyMaxHeight) {
      elements.floating.style.removeProperty("box-sizing");
      elements.floating.style.removeProperty("max-height");
      elements.floating.style.removeProperty("height");
    }
    return {
      data: {
        maxSizeAlreadyReset: true
      },
      reset: {
        rects: true
      }
    };
  }
});
function maxSize(autoSize, options) {
  const { container, overflowBoundary, overflowBoundaryPadding, isRtl } = options;
  return size({
    ...overflowBoundaryPadding && {
      padding: toFloatingUIPadding(overflowBoundaryPadding, isRtl)
    },
    ...overflowBoundary && {
      altBoundary: true,
      boundary: getBoundary(container, overflowBoundary)
    },
    apply({ availableHeight, availableWidth, elements, rects }) {
      const applyMaxSizeStyles = (apply, dimension, availableSize) => {
        if (!apply) {
          return;
        }
        elements.floating.style.setProperty("box-sizing", "border-box");
        elements.floating.style.setProperty(`max-${dimension}`, `${availableSize}px`);
        if (rects.floating[dimension] > availableSize) {
          elements.floating.style.setProperty(dimension, `${availableSize}px`);
          const axis = dimension === "width" ? "x" : "y";
          if (!elements.floating.style.getPropertyValue(`overflow-${axis}`)) {
            elements.floating.style.setProperty(`overflow-${axis}`, "auto");
          }
        }
      };
      const { applyMaxWidth, applyMaxHeight } = autoSize;
      applyMaxSizeStyles(applyMaxWidth, "width", availableWidth);
      applyMaxSizeStyles(applyMaxHeight, "height", availableHeight);
    }
  });
}
function getFloatingUIOffset(rawOffset) {
  if (!rawOffset) {
    return rawOffset;
  }
  if (typeof rawOffset === "number" || typeof rawOffset === "object") {
    return rawOffset;
  }
  return ({ rects: { floating, reference }, placement }) => {
    const { position, alignment } = fromFloatingUIPlacement(placement);
    return rawOffset({
      positionedRect: floating,
      targetRect: reference,
      position,
      alignment
    });
  };
}
function offset(offsetValue) {
  const floatingUIOffset = getFloatingUIOffset(offsetValue);
  return offset$1(floatingUIOffset);
}
function shift(options) {
  const { hasScrollableElement, shiftToCoverTarget, disableTether, overflowBoundary, container, overflowBoundaryPadding, isRtl } = options;
  return shift$1({
    ...hasScrollableElement && {
      boundary: "clippingAncestors"
    },
    ...shiftToCoverTarget && {
      crossAxis: true,
      limiter: limitShift({
        crossAxis: true,
        mainAxis: false
      })
    },
    ...disableTether && {
      crossAxis: disableTether === "all",
      limiter: limitShift({
        crossAxis: disableTether !== "all",
        mainAxis: false
      })
    },
    ...overflowBoundaryPadding && {
      padding: toFloatingUIPadding(overflowBoundaryPadding, isRtl)
    },
    ...overflowBoundary && {
      altBoundary: true,
      boundary: getBoundary(container, overflowBoundary)
    }
  });
}
const matchTargetSizeCssVar = "--fui-match-target-size";
function matchTargetSize() {
  return {
    name: "matchTargetSize",
    fn: async (middlewareArguments) => {
      const { rects: { reference: referenceRect, floating: floatingRect }, elements: { floating: floatingElement }, middlewareData: { matchTargetSize: { matchTargetSizeAttempt = false } = {} } } = middlewareArguments;
      if (referenceRect.width === floatingRect.width || matchTargetSizeAttempt) {
        return {};
      }
      const { width } = referenceRect;
      floatingElement.style.setProperty(matchTargetSizeCssVar, `${width}px`);
      if (!floatingElement.style.width) {
        floatingElement.style.width = `var(${matchTargetSizeCssVar})`;
      }
      return {
        data: {
          matchTargetSizeAttempt: true
        },
        reset: {
          rects: true
        }
      };
    }
  };
}
function usePositioningConfigFn(configFn, options) {
  const {
    align,
    arrowPadding,
    autoSize,
    coverTarget: coverTarget2,
    disableUpdateOnResize,
    flipBoundary,
    offset: offset2,
    overflowBoundary,
    pinned,
    position,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
    strategy,
    overflowBoundaryPadding,
    fallbackPositions,
    useTransform,
    matchTargetSize: matchTargetSize2,
    shiftToCoverTarget
  } = options;
  return reactExports.useCallback((container, arrow2) => {
    return configFn({
      container,
      arrow: arrow2,
      options: {
        autoSize,
        disableUpdateOnResize,
        matchTargetSize: matchTargetSize2,
        offset: offset2,
        strategy,
        coverTarget: coverTarget2,
        flipBoundary,
        overflowBoundary,
        useTransform,
        overflowBoundaryPadding,
        pinned,
        arrowPadding,
        align,
        fallbackPositions,
        shiftToCoverTarget,
        position,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        unstable_disableTether
      }
    });
  }, [
    autoSize,
    disableUpdateOnResize,
    matchTargetSize2,
    offset2,
    strategy,
    coverTarget2,
    flipBoundary,
    overflowBoundary,
    useTransform,
    overflowBoundaryPadding,
    pinned,
    arrowPadding,
    align,
    fallbackPositions,
    shiftToCoverTarget,
    position,
    unstable_disableTether,
    configFn
  ]);
}
function usePositioningOptions(options) {
  const { dir, targetDocument } = useFluent();
  const isRtl = dir === "rtl";
  const configFn = usePositioningConfigFn(usePositioningConfiguration(), options);
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionFixed
  } = options;
  return reactExports.useCallback((container, arrow$12) => {
    const hasScrollableElement = hasScrollParent(container);
    const optionsAfterEnhancement = configFn(container, arrow$12);
    const {
      autoSize,
      disableUpdateOnResize,
      matchTargetSize: matchTargetSize$1,
      offset: offset$12,
      coverTarget: coverTarget$1,
      flipBoundary,
      overflowBoundary,
      useTransform,
      overflowBoundaryPadding,
      pinned,
      position,
      arrowPadding,
      strategy,
      align,
      fallbackPositions,
      shiftToCoverTarget,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_disableTether
    } = optionsAfterEnhancement;
    const normalizedAutoSize = normalizeAutoSize(autoSize);
    const middleware = [
      normalizedAutoSize && resetMaxSize(normalizedAutoSize),
      matchTargetSize$1 && matchTargetSize(),
      offset$12 && offset(offset$12),
      coverTarget$1 && coverTarget(),
      !pinned && flip({
        container,
        flipBoundary,
        hasScrollableElement,
        isRtl,
        fallbackPositions
      }),
      shift({
        container,
        hasScrollableElement,
        overflowBoundary,
        disableTether: unstable_disableTether,
        overflowBoundaryPadding,
        isRtl,
        shiftToCoverTarget
      }),
      normalizedAutoSize && maxSize(normalizedAutoSize, {
        container,
        overflowBoundary,
        overflowBoundaryPadding,
        isRtl
      }),
      intersecting(),
      arrow$12 && arrow({
        element: arrow$12,
        padding: arrowPadding
      }),
      hide({
        strategy: "referenceHidden"
      }),
      hide({
        strategy: "escaped"
      }),
      false
    ].filter(Boolean);
    const placement = toFloatingUIPlacement(align, position, isRtl);
    return {
      placement,
      middleware,
      strategy: (strategy !== null && strategy !== void 0 ? strategy : positionFixed) ? "fixed" : "absolute",
      disableUpdateOnResize,
      useTransform
    };
  }, [
    configFn,
    isRtl,
    targetDocument,
    positionFixed
  ]);
}
function usePositioning(options) {
  const managerRef = reactExports.useRef(null);
  const targetRef = reactExports.useRef(null);
  const overrideTargetRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const arrowRef = reactExports.useRef(null);
  const { enabled = true } = options;
  const resolvePositioningOptions = usePositioningOptions(options);
  const updatePositionManager = reactExports.useCallback(() => {
    if (managerRef.current) {
      managerRef.current.dispose();
    }
    managerRef.current = null;
    var _overrideTargetRef_current;
    const target = (_overrideTargetRef_current = overrideTargetRef.current) !== null && _overrideTargetRef_current !== void 0 ? _overrideTargetRef_current : targetRef.current;
    if (enabled && canUseDOM() && target && containerRef.current) {
      managerRef.current = createPositionManager({
        container: containerRef.current,
        target,
        arrow: arrowRef.current,
        ...resolvePositioningOptions(containerRef.current, arrowRef.current)
      });
    }
  }, [
    enabled,
    resolvePositioningOptions
  ]);
  const setOverrideTarget = useEventCallback((target) => {
    overrideTargetRef.current = target;
    updatePositionManager();
  });
  reactExports.useImperativeHandle(options.positioningRef, () => ({
    updatePosition: () => {
      var _managerRef_current;
      return (_managerRef_current = managerRef.current) === null || _managerRef_current === void 0 ? void 0 : _managerRef_current.updatePosition();
    },
    setTarget: (target) => {
      if (options.target && false) ;
      setOverrideTarget(target);
    }
  }), [
    options.target,
    setOverrideTarget
  ]);
  useIsomorphicLayoutEffect(() => {
    var _options_target;
    setOverrideTarget((_options_target = options.target) !== null && _options_target !== void 0 ? _options_target : null);
  }, [
    options.target,
    setOverrideTarget
  ]);
  useIsomorphicLayoutEffect(() => {
    updatePositionManager();
  }, [
    updatePositionManager
  ]);
  const setTarget = useCallbackRef(null, (target) => {
    if (targetRef.current !== target) {
      targetRef.current = target;
      updatePositionManager();
    }
  });
  const onPositioningEnd = useEventCallback((e) => {
    var _options_onPositioningEnd;
    return (_options_onPositioningEnd = options.onPositioningEnd) === null || _options_onPositioningEnd === void 0 ? void 0 : _options_onPositioningEnd.call(options, e);
  });
  const setContainer = useCallbackRef(null, (container) => {
    if (containerRef.current !== container) {
      var _containerRef_current;
      (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.removeEventListener(POSITIONING_END_EVENT, onPositioningEnd);
      container === null || container === void 0 ? void 0 : container.addEventListener(POSITIONING_END_EVENT, onPositioningEnd);
      containerRef.current = container;
      updatePositionManager();
    }
  });
  const setArrow = useCallbackRef(null, (arrow2) => {
    if (arrowRef.current !== arrow2) {
      arrowRef.current = arrow2;
      updatePositionManager();
    }
  });
  return {
    targetRef: setTarget,
    containerRef: setContainer,
    arrowRef: setArrow
  };
}
function toMountNodeProps(mountNode) {
  if (isHTMLElement$1(mountNode)) {
    return {
      element: mountNode
    };
  }
  if (typeof mountNode === "object") {
    if (mountNode === null) {
      return {
        element: null
      };
    }
    return mountNode;
  }
  return {};
}
const usePortalMountNodeStylesStyles = /* @__PURE__ */ __styles({
  root: {
    qhf8xq: "f1euv43f",
    Bhzewxz: "f15twtuk",
    oyh7mz: ["f1vgc2s3", "f1e31b4d"],
    j35jbq: ["f1e31b4d", "f1vgc2s3"],
    Bj3rh1h: "f494woh"
  }
}, {
  d: [".f1euv43f{position:absolute;}", ".f15twtuk{top:0;}", ".f1vgc2s3{left:0;}", ".f1e31b4d{right:0;}", ".f494woh{z-index:1000000;}"]
});
const useInsertionEffect = React["useInsertionEffect"];
const useLegacyElementFactory = (options) => {
  const { className, dir, focusVisibleRef, targetNode } = options;
  const targetElement = reactExports.useMemo(() => {
    if (targetNode === void 0 || options.disabled) {
      return null;
    }
    const element = targetNode.ownerDocument.createElement("div");
    targetNode.appendChild(element);
    return element;
  }, [
    targetNode,
    options.disabled
  ]);
  reactExports.useMemo(() => {
    if (!targetElement) {
      return;
    }
    targetElement.className = className;
    targetElement.setAttribute("dir", dir);
    targetElement.setAttribute("data-portal-node", "true");
    focusVisibleRef.current = targetElement;
  }, [
    className,
    dir,
    targetElement,
    focusVisibleRef
  ]);
  reactExports.useEffect(() => {
    return () => {
      targetElement === null || targetElement === void 0 ? void 0 : targetElement.remove();
    };
  }, [
    targetElement
  ]);
  return targetElement;
};
const initializeElementFactory = () => {
  let currentElement = void 0;
  function get(targetRoot, forceCreation) {
    if (currentElement) {
      return currentElement;
    }
    if (forceCreation) {
      currentElement = targetRoot.ownerDocument.createElement("div");
      targetRoot.appendChild(currentElement);
    }
    return currentElement;
  }
  function dispose() {
    if (currentElement) {
      currentElement.remove();
      currentElement = void 0;
    }
  }
  return {
    get,
    dispose
  };
};
const useModernElementFactory = (options) => {
  "use no memo";
  const { className, dir, focusVisibleRef, targetNode } = options;
  const [elementFactory] = reactExports.useState(initializeElementFactory);
  const elementProxy = reactExports.useMemo(() => {
    if (targetNode === void 0 || options.disabled) {
      return null;
    }
    return new Proxy({}, {
      get(_, property) {
        if (property === "nodeType") {
          return 1;
        }
        if (property === "remove") {
          const targetElement2 = elementFactory.get(targetNode, false);
          if (targetElement2) {
            const portalHasNoChildren = targetElement2.childNodes.length === 0;
            if (portalHasNoChildren) {
              elementFactory.dispose();
            }
          }
          return () => {
          };
        }
        const targetElement = elementFactory.get(targetNode, true);
        const targetProperty = targetElement ? targetElement[property] : void 0;
        if (typeof targetProperty === "function") {
          return targetProperty.bind(targetElement);
        }
        return targetProperty;
      },
      set(_, property, value) {
        const ignoredProperty = property === "_virtual" || property === "focusVisible";
        const targetElement = ignoredProperty ? elementFactory.get(targetNode, false) : elementFactory.get(targetNode, true);
        if (ignoredProperty && !targetElement) {
          return true;
        }
        if (targetElement) {
          Object.assign(targetElement, {
            [property]: value
          });
          return true;
        }
        return false;
      }
    });
  }, [
    elementFactory,
    targetNode,
    options.disabled
  ]);
  useInsertionEffect(() => {
    if (!elementProxy) {
      return;
    }
    const classesToApply = className.split(" ").filter(Boolean);
    elementProxy.classList.add(...classesToApply);
    elementProxy.setAttribute("dir", dir);
    elementProxy.setAttribute("data-portal-node", "true");
    focusVisibleRef.current = elementProxy;
    return () => {
      elementProxy.classList.remove(...classesToApply);
      elementProxy.removeAttribute("dir");
    };
  }, [
    className,
    dir,
    elementProxy,
    focusVisibleRef
  ]);
  reactExports.useEffect(() => {
    return () => {
      elementProxy === null || elementProxy === void 0 ? void 0 : elementProxy.remove();
    };
  }, [
    elementProxy
  ]);
  return elementProxy;
};
const useElementFactory = useInsertionEffect ? useModernElementFactory : useLegacyElementFactory;
const usePortalMountNode = (options) => {
  "use no memo";
  const { targetDocument, dir } = useFluent();
  const mountNode = usePortalMountNode$1();
  const focusVisibleRef = useFocusVisible();
  const classes = usePortalMountNodeStylesStyles();
  const themeClassName = useThemeClassName();
  const factoryOptions = {
    dir,
    disabled: options.disabled,
    focusVisibleRef,
    className: mergeClasses(themeClassName, classes.root, options.className),
    targetNode: mountNode !== null && mountNode !== void 0 ? mountNode : targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.body
  };
  return useElementFactory(factoryOptions);
};
const usePortal_unstable = (props) => {
  const { element, className } = toMountNodeProps(props.mountNode);
  const virtualParentRootRef = reactExports.useRef(null);
  const fallbackElement = usePortalMountNode({
    disabled: !!element,
    className
  });
  const mountNode = element !== null && element !== void 0 ? element : fallbackElement;
  const state = {
    children: props.children,
    mountNode,
    virtualParentRootRef
  };
  reactExports.useEffect(() => {
    if (!mountNode) {
      return;
    }
    const virtualParent = virtualParentRootRef.current;
    const isVirtualParentInsideChild = mountNode.contains(virtualParent);
    if (virtualParent && !isVirtualParentInsideChild) {
      setVirtualParent(mountNode, virtualParent);
      return () => {
        setVirtualParent(mountNode, void 0);
      };
    }
  }, [
    virtualParentRootRef,
    mountNode
  ]);
  return state;
};
var reactDomExports = requireReactDom();
const renderPortal_unstable = (state) => {
  return /* @__PURE__ */ reactExports.createElement("span", {
    hidden: true,
    ref: state.virtualParentRootRef
  }, state.mountNode && /* @__PURE__ */ reactDomExports.createPortal(/* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, state.children, /* @__PURE__ */ reactExports.createElement("span", {
    hidden: true
  })), state.mountNode));
};
const Portal = (props) => {
  const state = usePortal_unstable(props);
  return renderPortal_unstable(state);
};
Portal.displayName = "Portal";
const ComboboxContext = createContext({
  activeOption: void 0,
  appearance: "outline",
  focusVisible: false,
  open: false,
  registerOption() {
    return () => void 0;
  },
  selectedOptions: [],
  selectOption() {
  },
  setActiveOption() {
  },
  setOpen() {
  },
  size: "medium"
});
ComboboxContext.Provider;
const listboxContextDefaultValue = {
  activeOption: void 0,
  focusVisible: false,
  multiselect: false,
  getOptionById() {
    return void 0;
  },
  getOptionsMatchingValue() {
    return [];
  },
  registerOption() {
    return () => void 0;
  },
  selectedOptions: [],
  onOptionClick() {
  },
  onActiveDescendantChange() {
  },
  selectOption() {
  },
  setActiveOption() {
  }
};
const ListboxContext = createContext(void 0);
const useListboxContext_unstable = (selector) => useContextSelector(ListboxContext, (ctx = listboxContextDefaultValue) => selector(ctx));
const ListboxProvider = ListboxContext.Provider;
function useComboboxContextValues(state) {
  const { appearance, open, getOptionById, getOptionsMatchingValue, registerOption, selectedOptions, selectOption, setOpen, size: size2, activeDescendantController, onOptionClick, onActiveDescendantChange } = state;
  const combobox = {
    activeOption: void 0,
    appearance,
    focusVisible: false,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption: () => null,
    setOpen,
    size: size2
  };
  const listbox = {
    activeOption: void 0,
    focusVisible: false,
    getOptionById,
    getOptionsMatchingValue,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption: () => null,
    onOptionClick,
    onActiveDescendantChange
  };
  const activeDescendant = reactExports.useMemo(() => ({
    controller: activeDescendantController
  }), [
    activeDescendantController
  ]);
  return {
    combobox,
    activeDescendant,
    listbox
  };
}
function useListboxContextValues(state) {
  const hasListboxContext = useHasParentContext(ListboxContext);
  const { getOptionById, getOptionsMatchingValue, multiselect, registerOption, selectedOptions, selectOption, activeDescendantController } = state;
  const parentRegisterOption = useListboxContext_unstable((ctx) => ctx.registerOption);
  const onOptionClick = useListboxContext_unstable((ctx) => ctx.onOptionClick);
  const onActiveDescendantChange = useListboxContext_unstable((ctx) => ctx.onActiveDescendantChange);
  const registerOptionValue = hasListboxContext ? parentRegisterOption : registerOption;
  const listbox = {
    activeOption: void 0,
    focusVisible: false,
    getOptionById,
    getOptionsMatchingValue,
    multiselect,
    registerOption: registerOptionValue,
    selectedOptions,
    selectOption,
    setActiveOption: () => void 0,
    onOptionClick,
    onActiveDescendantChange
  };
  const activeDescendant = reactExports.useMemo(() => ({
    controller: activeDescendantController
  }), [
    activeDescendantController
  ]);
  return {
    listbox,
    activeDescendant
  };
}
function getDropdownActionFromKey(e, options = {}) {
  const { open = true, multiselect = false } = options;
  const code = e.key;
  const { altKey, ctrlKey, key, metaKey } = e;
  if (key.length === 1 && code !== Space && !altKey && !ctrlKey && !metaKey) {
    return "Type";
  }
  if (!open) {
    if (code === ArrowDown || code === ArrowUp || code === Enter || code === Space) {
      return "Open";
    }
    return "None";
  }
  if (code === ArrowUp && altKey || code === Enter || !multiselect && code === Space) {
    return "CloseSelect";
  }
  if (multiselect && code === Space) {
    return "Select";
  }
  if (code === Escape) {
    return "Close";
  }
  if (code === ArrowDown) {
    return "Next";
  }
  if (code === ArrowUp) {
    return "Previous";
  }
  if (code === Home) {
    return "First";
  }
  if (code === End) {
    return "Last";
  }
  if (code === PageUp) {
    return "PageUp";
  }
  if (code === PageDown) {
    return "PageDown";
  }
  if (code === Tab) {
    return "Tab";
  }
  return "None";
}
const useOptionCollection = () => {
  const optionsById = reactExports.useRef(/* @__PURE__ */ new Map());
  const collectionAPI = reactExports.useMemo(() => {
    const getCount = () => optionsById.current.size;
    const getOptionAtIndex = () => void 0;
    const getIndexOfId = () => -1;
    const getOptionById = (id) => {
      return optionsById.current.get(id);
    };
    const getOptionsMatchingText = (matcher) => {
      return Array.from(optionsById.current.values()).filter(({ text: text2 }) => matcher(text2));
    };
    const getOptionsMatchingValue = (matcher) => {
      const matches = [];
      for (const option of optionsById.current.values()) {
        if (matcher(option.value)) {
          matches.push(option);
        }
      }
      return matches;
    };
    return {
      getCount,
      getOptionAtIndex,
      getIndexOfId,
      getOptionById,
      getOptionsMatchingText,
      getOptionsMatchingValue
    };
  }, []);
  const registerOption = reactExports.useCallback((option) => {
    optionsById.current.set(option.id, option);
    return () => optionsById.current.delete(option.id);
  }, []);
  return {
    ...collectionAPI,
    // eslint-disable-next-line react-hooks/refs
    options: Array.from(optionsById.current.values()),
    registerOption
  };
};
const useSelection = (props) => {
  const { defaultSelectedOptions, multiselect, onOptionSelect } = props;
  const [selectedOptions, setSelectedOptions] = useControllableState({
    state: props.selectedOptions,
    defaultState: defaultSelectedOptions,
    initialState: []
  });
  const selectOption = reactExports.useCallback((event, option) => {
    if (option.disabled) {
      return;
    }
    let newSelection = [
      option.value
    ];
    if (multiselect) {
      const selectedIndex = selectedOptions.findIndex((o) => o === option.value);
      if (selectedIndex > -1) {
        newSelection = [
          ...selectedOptions.slice(0, selectedIndex),
          ...selectedOptions.slice(selectedIndex + 1)
        ];
      } else {
        newSelection = [
          ...selectedOptions,
          option.value
        ];
      }
    }
    setSelectedOptions(newSelection);
    onOptionSelect === null || onOptionSelect === void 0 ? void 0 : onOptionSelect(event, {
      optionValue: option.value,
      optionText: option.text,
      selectedOptions: newSelection
    });
  }, [
    onOptionSelect,
    multiselect,
    selectedOptions,
    setSelectedOptions
  ]);
  const clearSelection = (event) => {
    setSelectedOptions([]);
    onOptionSelect === null || onOptionSelect === void 0 ? void 0 : onOptionSelect(event, {
      optionValue: void 0,
      optionText: void 0,
      selectedOptions: []
    });
  };
  return {
    clearSelection,
    selectOption,
    selectedOptions
  };
};
function isComboboxOptionElement(element) {
  return element.role === "option" || element.role === "menuitemcheckbox";
}
const UNSAFE_noLongerUsed = {
  activeOption: void 0,
  focusVisible: false,
  setActiveOption: () => null
};
const useListbox_unstable = (props, ref) => {
  const { multiselect, disableAutoFocus = false } = props;
  const optionCollection = useOptionCollection();
  const { listboxRef: activeDescendantListboxRef, activeParentRef, controller } = useActiveDescendant({
    matchOption: isComboboxOptionElement
  });
  const hasListboxContext = useHasParentContext(ListboxContext);
  const onActiveDescendantChange = useListboxContext_unstable((ctx) => ctx.onActiveDescendantChange);
  const contextGetOptionById = useListboxContext_unstable((ctx) => ctx.getOptionById);
  const contextGetOptionsMatchingValue = useListboxContext_unstable((ctx) => ctx.getOptionsMatchingValue);
  const getOptionById = hasListboxContext ? contextGetOptionById : optionCollection.getOptionById;
  const getOptionsMatchingValue = hasListboxContext ? contextGetOptionsMatchingValue : optionCollection.getOptionsMatchingValue;
  const listenerRef = reactExports.useMemo(() => {
    let element = null;
    const listener = (untypedEvent) => {
      const event = untypedEvent;
      onActiveDescendantChange === null || onActiveDescendantChange === void 0 ? void 0 : onActiveDescendantChange(event);
    };
    return (el) => {
      if (!el) {
        element === null || element === void 0 ? void 0 : element.removeEventListener("activedescendantchange", listener);
        return;
      }
      element = el;
      element.addEventListener("activedescendantchange", listener);
    };
  }, [
    onActiveDescendantChange
  ]);
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = reactExports.useState(false);
  useOnKeyboardNavigationChange(setIsNavigatingWithKeyboard);
  const activeDescendantContext = useActiveDescendantContext();
  const hasParentActiveDescendantContext = useHasParentActiveDescendantContext();
  const activeDescendantController = hasParentActiveDescendantContext ? activeDescendantContext.controller : controller;
  const { clearSelection, selectedOptions, selectOption } = useSelection(props);
  const onKeyDown = (event) => {
    const action = getDropdownActionFromKey(event, {
      open: true
    });
    const activeOptionId = activeDescendantController.active();
    const activeOption = activeOptionId ? getOptionById(activeOptionId) : null;
    switch (action) {
      case "First":
      case "Last":
      case "Next":
      case "Previous":
      case "PageDown":
      case "PageUp":
      case "CloseSelect":
      case "Select":
        event.preventDefault();
        break;
    }
    switch (action) {
      case "Next":
        if (activeOption) {
          activeDescendantController.next();
        } else {
          activeDescendantController.first();
        }
        break;
      case "Previous":
        if (activeOption) {
          activeDescendantController.prev();
        } else {
          activeDescendantController.first();
        }
        break;
      case "PageUp":
      case "First":
        activeDescendantController.first();
        break;
      case "PageDown":
      case "Last":
        activeDescendantController.last();
        break;
      case "Select":
      case "CloseSelect":
        activeOption && selectOption(event, activeOption);
        break;
    }
  };
  const contextSelectedOptions = useListboxContext_unstable((ctx) => ctx.selectedOptions);
  const contextSelectOption = useListboxContext_unstable((ctx) => ctx.selectOption);
  const optionContextValues = hasListboxContext ? {
    selectedOptions: contextSelectedOptions,
    selectOption: contextSelectOption,
    ...UNSAFE_noLongerUsed
  } : {
    selectedOptions,
    selectOption,
    ...UNSAFE_noLongerUsed
  };
  reactExports.useEffect(() => {
    if (hasParentActiveDescendantContext) {
      return;
    }
    activeDescendantController.hideFocusVisibleAttributes();
    if (!disableAutoFocus) {
      if (!multiselect && optionContextValues.selectedOptions.length > 0) {
        const selectedOption = getOptionsMatchingValue((v) => v === optionContextValues.selectedOptions[0]).pop();
        if (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.id) {
          activeDescendantController.focus(selectedOption.id);
        }
      } else {
        activeDescendantController.first();
      }
    }
    return () => {
      activeDescendantController.blur();
    };
  }, []);
  const onFocus = reactExports.useCallback(() => {
    if (hasParentActiveDescendantContext) {
      return;
    }
    activeDescendantController.showFocusVisibleAttributes();
    if (isNavigatingWithKeyboard) {
      activeDescendantController.scrollActiveIntoView();
    }
  }, [
    activeDescendantController,
    hasParentActiveDescendantContext,
    isNavigatingWithKeyboard
  ]);
  const onBlur = reactExports.useCallback(() => {
    if (hasParentActiveDescendantContext) {
      return;
    }
    activeDescendantController.hideFocusVisibleAttributes();
  }, [
    activeDescendantController,
    hasParentActiveDescendantContext
  ]);
  const state = {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: useMergedRefs(ref, activeParentRef, activeDescendantListboxRef, listenerRef),
      role: multiselect ? "menu" : "listbox",
      tabIndex: 0,
      ...props
    }), {
      elementType: "div"
    }),
    standalone: !hasListboxContext,
    multiselect,
    clearSelection,
    activeDescendantController,
    onActiveDescendantChange,
    ...optionCollection,
    ...optionContextValues
  };
  state.root.onKeyDown = useEventCallback(mergeCallbacks(state.root.onKeyDown, onKeyDown));
  state.root.onFocus = useEventCallback(mergeCallbacks(state.root.onFocus, onFocus));
  state.root.onBlur = useEventCallback(mergeCallbacks(state.root.onBlur, onBlur));
  return state;
};
const renderListbox_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(ActiveDescendantContextProvider, {
    value: contextValues.activeDescendant,
    children: /* @__PURE__ */ jsx(ListboxContext.Provider, {
      value: contextValues.listbox,
      children: /* @__PURE__ */ jsx(state.root, {})
    })
  });
};
const listboxClassNames = {
  root: "fui-Listbox"
};
const useStyles$9 = /* @__PURE__ */ __styles({
  root: {
    De3pzq: "fxugw4r",
    B7ck84d: "f1ewtqcl",
    mc9l5x: "f22iagw",
    Beiy3e4: "f1vx9l62",
    Bf4jedk: "f3hsy1e",
    Bmxbyg5: "f5zp4f",
    Bw0xxkn: 0,
    oeaueh: 0,
    Bpd4iqm: 0,
    Befb4lg: "f1iepc6i",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1t35pdg",
    Belr9w4: "fiut8dr"
  }
}, {
  d: [".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".f1ewtqcl{box-sizing:border-box;}", ".f22iagw{display:flex;}", ".f1vx9l62{flex-direction:column;}", ".f3hsy1e{min-width:160px;}", ".f5zp4f{overflow-y:auto;}", [".f1iepc6i{outline:1px solid var(--colorTransparentStroke);}", {
    p: -1
  }], [".f1t35pdg{padding:var(--spacingHorizontalXS);}", {
    p: -1
  }], ".fiut8dr{row-gap:var(--spacingHorizontalXXS);}"]
});
const useListboxStyles_unstable = (state) => {
  const styles = useStyles$9();
  state.root.className = mergeClasses(listboxClassNames.root, styles.root, state.root.className);
  return state;
};
const Listbox = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useListbox_unstable(props, ref);
  const contextValues = useListboxContextValues(state);
  useListboxStyles_unstable(state);
  useCustomStyleHook("useListboxStyles_unstable")(state);
  return renderListbox_unstable(state, contextValues);
});
Listbox.displayName = "Listbox";
function getTextString(text2, children) {
  if (text2 !== void 0) {
    return text2;
  }
  let textString = "";
  let hasNonStringChild = false;
  reactExports.Children.forEach(children, (child) => {
    if (typeof child === "string") {
      textString += child;
    } else {
      hasNonStringChild = true;
    }
  });
  if (hasNonStringChild) {
    console.warn("Provide a `text` prop to Option components when they contain non-string children.");
  }
  return textString;
}
const useOption_unstable = (props, ref) => {
  const state = useOptionBase_unstable(props, ref);
  let CheckIcon = /* @__PURE__ */ reactExports.createElement(CheckmarkFilled, null);
  if (state.multiselect) {
    CheckIcon = state.selected ? /* @__PURE__ */ reactExports.createElement(Checkmark12Filled, null) : "";
  }
  if (state.checkIcon) {
    var _state_checkIcon;
    var _children;
    (_children = (_state_checkIcon = state.checkIcon).children) !== null && _children !== void 0 ? _children : _state_checkIcon.children = CheckIcon;
  }
  return state;
};
const useOptionBase_unstable = (props, ref) => {
  const { children, disabled, text: text2, value } = props;
  const optionRef = reactExports.useRef(null);
  const optionText = getTextString(text2, children);
  const optionValue = value !== null && value !== void 0 ? value : optionText;
  const id = useId("fluent-option", props.id);
  const optionData = reactExports.useMemo(() => ({
    id,
    disabled,
    text: optionText,
    value: optionValue
  }), [
    id,
    disabled,
    optionText,
    optionValue
  ]);
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const multiselect = useListboxContext_unstable((ctx) => ctx.multiselect);
  const registerOption = useListboxContext_unstable((ctx) => ctx.registerOption);
  const selected = useListboxContext_unstable((ctx) => {
    const selectedOptions = ctx.selectedOptions;
    return optionValue !== void 0 && selectedOptions.find((o) => o === optionValue) !== void 0;
  });
  const selectOption = useListboxContext_unstable((ctx) => ctx.selectOption);
  const onOptionClick = useListboxContext_unstable((ctx) => ctx.onOptionClick);
  const onClick = (event) => {
    var _props_onClick;
    if (disabled) {
      event.preventDefault();
      return;
    }
    activeDescendantController.focus(id);
    selectOption(event, optionData);
    onOptionClick(event);
    (_props_onClick = props.onClick) === null || _props_onClick === void 0 ? void 0 : _props_onClick.call(props, event);
  };
  reactExports.useEffect(() => {
    if (id && optionRef.current) {
      return registerOption(optionData, optionRef.current);
    }
  }, [
    id,
    optionData,
    registerOption
  ]);
  const semanticProps = multiselect ? {
    role: "menuitemcheckbox",
    "aria-checked": selected
  } : {
    role: "option",
    "aria-selected": selected
  };
  return {
    components: {
      root: "div",
      checkIcon: "span"
    },
    root: always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: useMergedRefs(ref, optionRef),
      "aria-disabled": disabled ? "true" : void 0,
      id,
      ...semanticProps,
      ...props,
      onClick
    }), {
      elementType: "div"
    }),
    checkIcon: optional(props.checkIcon, {
      renderByDefault: true,
      defaultProps: {
        "aria-hidden": "true"
      },
      elementType: "span"
    }),
    disabled,
    multiselect,
    selected,
    // no longer used
    focusVisible: false,
    active: false
  };
};
const renderOption_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.checkIcon && /* @__PURE__ */ jsx(state.checkIcon, {}),
      state.root.children
    ]
  });
};
const optionClassNames = {
  root: "fui-Option",
  checkIcon: "fui-Option__checkIcon"
};
const useStyles$8 = /* @__PURE__ */ __styles({
  root: {
    Bt984gj: "f122n59",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    sj55zd: "f19n0e5",
    i8kkvl: "f1ufnopg",
    Bceei9c: "f1k6fduh",
    mc9l5x: "f22iagw",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bg96gwp: "f1i3iumi",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "fm5eomj",
    qhf8xq: "f10pi13n"
  },
  interactive: {
    Jwef8y: "f1knas48",
    Bi91k9c: "feu1g3u",
    zqbkvg: "fo79ri9",
    h82x05: ["f1osiabc", "f1e8le25"],
    cqj998: "f1yusjty",
    j3hlsh: ["f1e8le25", "f1osiabc"],
    ecr2s2: "fb40n2d",
    lj723h: "f1g4hkjv",
    Btxx2vb: "f1lnr2zp",
    sltcwy: ["f1ogfk9z", "f1g7j8ec"],
    dnwvvm: "fiuf46r",
    Blyvkvs: ["f1g7j8ec", "f1ogfk9z"]
  },
  active: {
    Bowz1zl: "f11vrvdw",
    oxogb1: "f17hxjb7",
    Ix2sn8: "f1dha69c",
    q7v32p: "f1lm7500",
    B7cbj04: 0,
    Bewtojm: 0,
    b50fsz: 0,
    B1wzb3v: 0,
    Bqwk70n: 0,
    B37u8z8: 0,
    avt0cx: 0,
    f0sref: 0,
    B9fkznv: 0,
    Be3o27t: 0,
    Bertapg: 0,
    B53xpsf: 0,
    Bsv72rj: 0,
    B39dzdd: 0,
    Btq9bd3: 0,
    Bqfxd14: 0,
    atup0s: "fo7xqb",
    Fffuxt: 0,
    Bttcd12: 0,
    Beitzug: 0,
    Bqougee: 0,
    B86i8pi: "f1kurthe",
    Bhijsxg: "fwq15dy",
    kktds4: "f1pb3wry",
    Bmau3bo: ["ftjv2f4", "f1flhb1f"],
    npektv: ["f1flhb1f", "ftjv2f4"]
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    Bceei9c: "f158kwzp",
    B7iucu3: "f1cyfu5x"
  },
  selected: {},
  checkIcon: {
    Bnnss6s: "fi64zpg",
    Be2twd7: "fod5ikn",
    Frg6f3: ["f18b9hdq", "fn6qj8t"],
    t21cq0: ["f1xk557c", "f1h9en5y"],
    Bcdw1i0: "fd7fpy0",
    Bo70h7d: "fvc9v3g"
  },
  selectedCheck: {
    Bcdw1i0: "f1022m68"
  },
  multiselectCheck: {
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f1l3cf7o",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "fq9zq91",
    B7ck84d: "f1ewtqcl",
    mc9l5x: "f22iagw",
    Bt984gj: "f122n59",
    Brf1p80: "f4d9j23",
    Bkfmm31: "f1w9h62z",
    Be2twd7: "f1ugzwwg",
    Bqenvij: "fd461yt",
    a9b677: "fjw5fx7",
    Bcdw1i0: "f1022m68"
  },
  selectedMultiselectCheck: {
    De3pzq: "ftywsgz",
    sj55zd: "fqpbvvt",
    g2u3we: "f3xi7mh",
    h3c5rm: ["ftovhe4", "f1wczvin"],
    B9xav0g: "f68vbr6",
    zhjwy3: ["f1wczvin", "ftovhe4"]
  },
  checkDisabled: {
    sj55zd: "f1s2aq7o",
    B7iucu3: "f1cyfu5x"
  },
  multiselectCheckDisabled: {
    g2u3we: "f1r1t4y1",
    h3c5rm: ["fmj8ijw", "figx54m"],
    B9xav0g: "f360ss8",
    zhjwy3: ["figx54m", "fmj8ijw"]
  }
}, {
  d: [".f122n59{align-items:center;}", [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".f19n0e5{color:var(--colorNeutralForeground1);}", ".f1ufnopg{column-gap:var(--spacingHorizontalXS);}", ".f1k6fduh{cursor:pointer;}", ".f22iagw{display:flex;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", [".fm5eomj{padding:var(--spacingVerticalSNudge) var(--spacingHorizontalS);}", {
    p: -1
  }], ".f10pi13n{position:relative;}", '.f11vrvdw[data-activedescendant-focusvisible]::after{content:"";}', ".f17hxjb7[data-activedescendant-focusvisible]::after{position:absolute;}", ".f1dha69c[data-activedescendant-focusvisible]::after{pointer-events:none;}", ".f1lm7500[data-activedescendant-focusvisible]::after{z-index:1;}", [".fo7xqb[data-activedescendant-focusvisible]::after{border:2px solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".f1kurthe[data-activedescendant-focusvisible]::after{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fwq15dy[data-activedescendant-focusvisible]::after{top:-2px;}", ".f1pb3wry[data-activedescendant-focusvisible]::after{bottom:-2px;}", ".ftjv2f4[data-activedescendant-focusvisible]::after{left:-2px;}", ".f1flhb1f[data-activedescendant-focusvisible]::after{right:-2px;}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f158kwzp{cursor:default;}", ".fi64zpg{flex-shrink:0;}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".f18b9hdq{margin-left:calc(var(--spacingHorizontalXXS) * -1);}", ".fn6qj8t{margin-right:calc(var(--spacingHorizontalXXS) * -1);}", ".f1xk557c{margin-right:var(--spacingHorizontalXXS);}", ".f1h9en5y{margin-left:var(--spacingHorizontalXXS);}", ".fd7fpy0{visibility:hidden;}", ".fvc9v3g svg{display:block;}", ".f1022m68{visibility:visible;}", [".f1l3cf7o{border:var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);}", {
    p: -2
  }], [".fq9zq91{border-radius:var(--borderRadiusSmall);}", {
    p: -1
  }], ".f1ewtqcl{box-sizing:border-box;}", ".f4d9j23{justify-content:center;}", ".f1w9h62z{fill:currentColor;}", ".f1ugzwwg{font-size:12px;}", ".fd461yt{height:16px;}", ".fjw5fx7{width:16px;}", ".ftywsgz{background-color:var(--colorCompoundBrandBackground);}", ".fqpbvvt{color:var(--colorNeutralForegroundInverted);}", ".f3xi7mh{border-top-color:var(--colorCompoundBrandBackground);}", ".ftovhe4{border-right-color:var(--colorCompoundBrandBackground);}", ".f1wczvin{border-left-color:var(--colorCompoundBrandBackground);}", ".f68vbr6{border-bottom-color:var(--colorCompoundBrandBackground);}", ".f1r1t4y1{border-top-color:var(--colorNeutralForegroundDisabled);}", ".fmj8ijw{border-right-color:var(--colorNeutralForegroundDisabled);}", ".figx54m{border-left-color:var(--colorNeutralForegroundDisabled);}", ".f360ss8{border-bottom-color:var(--colorNeutralForegroundDisabled);}"],
  h: [".f1knas48:hover{background-color:var(--colorNeutralBackground1Hover);}", ".feu1g3u:hover{color:var(--colorNeutralForeground1Hover);}", ".fo79ri9:hover .fui-Option__checkIcon{border-top-color:var(--colorNeutralForeground1Hover);}", ".f1osiabc:hover .fui-Option__checkIcon{border-right-color:var(--colorNeutralForeground1Hover);}", ".f1e8le25:hover .fui-Option__checkIcon{border-left-color:var(--colorNeutralForeground1Hover);}", ".f1yusjty:hover .fui-Option__checkIcon{border-bottom-color:var(--colorNeutralForeground1Hover);}"],
  a: [".fb40n2d:active{background-color:var(--colorNeutralBackground1Pressed);}", ".f1g4hkjv:active{color:var(--colorNeutralForeground1Pressed);}", ".f1lnr2zp:active .fui-Option__checkIcon{border-top-color:var(--colorNeutralForeground1Hover);}", ".f1ogfk9z:active .fui-Option__checkIcon{border-right-color:var(--colorNeutralForeground1Hover);}", ".f1g7j8ec:active .fui-Option__checkIcon{border-left-color:var(--colorNeutralForeground1Hover);}", ".fiuf46r:active .fui-Option__checkIcon{border-bottom-color:var(--colorNeutralForeground1Hover);}"],
  m: [["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useOptionStyles_unstable = (state) => {
  const {
    disabled,
    multiselect,
    selected
  } = state;
  const styles = useStyles$8();
  state.root.className = mergeClasses(optionClassNames.root, styles.root, !disabled && styles.interactive, styles.active, disabled && styles.disabled, selected && styles.selected, state.root.className);
  if (state.checkIcon) {
    state.checkIcon.className = mergeClasses(optionClassNames.checkIcon, styles.checkIcon, multiselect && styles.multiselectCheck, selected && styles.selectedCheck, selected && multiselect && styles.selectedMultiselectCheck, disabled && styles.checkDisabled, disabled && multiselect && styles.multiselectCheckDisabled, state.checkIcon.className);
  }
  return state;
};
const Option = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useOption_unstable(props, ref);
  useOptionStyles_unstable(state);
  useCustomStyleHook("useOptionStyles_unstable")(state);
  return renderOption_unstable(state);
});
Option.displayName = "Option";
const useComboboxBaseState = (props) => {
  const { appearance = "outline", disableAutoFocus, children, clearable = false, editable = false, inlinePopup = false, mountNode = void 0, multiselect, onOpenChange, size: size2 = "medium", activeDescendantController, freeform = false, disabled = false, onActiveOptionChange = null } = props;
  const optionCollection = useOptionCollection();
  const { getOptionsMatchingValue } = optionCollection;
  const { getOptionById } = optionCollection;
  const getActiveOption = reactExports.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : void 0;
  }, [
    activeDescendantController,
    getOptionById
  ]);
  const UNSAFE_activeOption = getActiveOption();
  const UNSAFE_setActiveOption = reactExports.useCallback((option) => {
    let nextOption = void 0;
    if (typeof option === "function") {
      const activeOption = getActiveOption();
      nextOption = option(activeOption);
    }
    if (nextOption) {
      activeDescendantController.focus(nextOption.id);
    } else {
      activeDescendantController.blur();
    }
  }, [
    activeDescendantController,
    getActiveOption
  ]);
  const [focusVisible, setFocusVisible] = reactExports.useState(false);
  const [hasFocus, setHasFocus] = reactExports.useState(false);
  const ignoreNextBlur = reactExports.useRef(false);
  const isFirstMount = useFirstMount();
  const [controllableValue, setValue] = useControllableState({
    state: props.value,
    initialState: void 0
  });
  const { selectedOptions, selectOption: baseSelectOption, clearSelection } = useSelection(props);
  const selectOption = reactExports.useCallback((ev, option) => {
    reactDomExports.unstable_batchedUpdates(() => {
      setValue(void 0);
      baseSelectOption(ev, option);
    });
  }, [
    setValue,
    baseSelectOption
  ]);
  const value = reactExports.useMemo(() => {
    if (controllableValue !== void 0) {
      return controllableValue;
    }
    if (isFirstMount && props.defaultValue !== void 0) {
      return props.defaultValue;
    }
    const selectedOptionsText = getOptionsMatchingValue((optionValue) => {
      return selectedOptions.includes(optionValue);
    }).map((option) => option.text);
    if (multiselect) {
      return editable ? "" : selectedOptionsText.join(", ");
    }
    return selectedOptionsText[0];
  }, [
    controllableValue,
    editable,
    getOptionsMatchingValue,
    multiselect,
    selectedOptions
  ]);
  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false
  });
  const setOpen = reactExports.useCallback((event, newState) => {
    if (disabled || newState === open) {
      return;
    }
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(event, {
      open: newState
    });
    reactDomExports.unstable_batchedUpdates(() => {
      if (!newState && !freeform) {
        setValue(void 0);
      }
      setOpenState(newState);
    });
  }, [
    disabled,
    freeform,
    onOpenChange,
    open,
    setOpenState,
    setValue
  ]);
  reactExports.useEffect(() => {
    if (open) {
      if (!multiselect && selectedOptions.length > 0) {
        const selectedOption = getOptionsMatchingValue((v) => v === selectedOptions[0]).pop();
        if (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.id) {
          activeDescendantController.focus(selectedOption.id);
        }
      }
    } else {
      activeDescendantController.blur();
    }
  }, [
    open,
    activeDescendantController
  ]);
  reactExports.useEffect(() => {
    if (open && !disableAutoFocus && !activeDescendantController.active()) {
      activeDescendantController.first();
    }
  }, [
    open,
    children,
    disableAutoFocus,
    activeDescendantController,
    getOptionById
  ]);
  const onActiveDescendantChange = useEventCallback((event) => {
    const previousOption = event.detail.previousId ? optionCollection.getOptionById(event.detail.previousId) : null;
    const nextOption = optionCollection.getOptionById(event.detail.id);
    onActiveOptionChange === null || onActiveOptionChange === void 0 ? void 0 : onActiveOptionChange(event, {
      event,
      type: "change",
      previousOption,
      nextOption
    });
  });
  return {
    ...optionCollection,
    freeform,
    disabled,
    selectOption,
    clearSelection,
    selectedOptions,
    activeOption: UNSAFE_activeOption,
    appearance,
    clearable,
    focusVisible,
    ignoreNextBlur,
    inlinePopup,
    mountNode,
    open,
    hasFocus,
    setActiveOption: UNSAFE_setActiveOption,
    setFocusVisible,
    setHasFocus,
    setOpen,
    setValue,
    size: size2,
    value,
    multiselect,
    onOptionClick: useEventCallback((e) => {
      if (!multiselect) {
        setOpen(e, false);
      }
    }),
    onActiveDescendantChange
  };
};
function useComboboxPositioning(props) {
  const { positioning } = props;
  const fallbackPositions = [
    "above",
    "after",
    "after-top",
    "before",
    "before-top"
  ];
  const popperOptions = {
    position: "below",
    align: "start",
    offset: {
      crossAxis: 0,
      mainAxis: 2
    },
    fallbackPositions,
    matchTargetSize: "width",
    autoSize: true,
    ...resolvePositioningShorthand(positioning)
  };
  const { targetRef, containerRef } = usePositioning(popperOptions);
  return [
    containerRef,
    targetRef
  ];
}
function useListboxSlot(listboxSlotFromProp, ref, options) {
  const { state: { multiselect }, triggerRef, defaultProps } = options;
  const listboxId = useId("fluent-listbox", isResolvedShorthand(listboxSlotFromProp) ? listboxSlotFromProp.id : void 0);
  const listboxSlot = optional(listboxSlotFromProp, {
    renderByDefault: true,
    elementType: Listbox,
    defaultProps: {
      id: listboxId,
      multiselect,
      tabIndex: void 0,
      ...defaultProps
    }
  });
  const fieldControlProps = useFieldControlProps_unstable({
    id: listboxId
  }, {
    supportsLabelFor: true
  });
  if (listboxSlot && !listboxSlot["aria-label"] && !listboxSlot["aria-labelledby"] && fieldControlProps["aria-labelledby"]) {
    listboxSlot["aria-labelledby"] = fieldControlProps["aria-labelledby"];
  }
  const onMouseDown = useEventCallback(mergeCallbacks((event) => {
    event.preventDefault();
  }, listboxSlot === null || listboxSlot === void 0 ? void 0 : listboxSlot.onMouseDown));
  const onClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks((event) => {
      var _triggerRef_current;
      event.preventDefault();
      (_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.focus();
    }, listboxSlot === null || listboxSlot === void 0 ? void 0 : listboxSlot.onClick)
  );
  const listboxRef = useMergedRefs(listboxSlot === null || listboxSlot === void 0 ? void 0 : listboxSlot.ref, ref);
  if (listboxSlot) {
    listboxSlot.ref = listboxRef;
    listboxSlot.onMouseDown = onMouseDown;
    listboxSlot.onClick = onClick;
  }
  return listboxSlot;
}
function useTriggerSlot(triggerSlotFromProp, ref, options) {
  const { state: { open, setOpen, setHasFocus }, defaultProps, elementType, activeDescendantController, shouldCloseOnBlur } = options;
  const trigger = always(triggerSlotFromProp, {
    defaultProps: {
      type: "text",
      "aria-expanded": open,
      role: "combobox",
      ...typeof defaultProps === "object" && defaultProps
    },
    elementType
  });
  const triggerRef = reactExports.useRef(null);
  trigger.ref = useMergedRefs(triggerRef, trigger.ref, ref);
  trigger.onBlur = mergeCallbacks((event) => {
    var _shouldCloseOnBlur;
    if ((_shouldCloseOnBlur = shouldCloseOnBlur === null || shouldCloseOnBlur === void 0 ? void 0 : shouldCloseOnBlur(event)) !== null && _shouldCloseOnBlur !== void 0 ? _shouldCloseOnBlur : true) {
      setOpen(event, false);
      setHasFocus(false);
    }
  }, trigger.onBlur);
  trigger.onFocus = mergeCallbacks((event) => {
    if (event.target === event.currentTarget) {
      setHasFocus(true);
    }
  }, trigger.onFocus);
  trigger.onClick = mergeCallbacks((event) => {
    setOpen(event, !open);
  }, trigger.onClick);
  trigger.onKeyDown = mergeCallbacks(useTriggerKeydown({
    activeDescendantController,
    ...options.state
  }), trigger.onKeyDown);
  return trigger;
}
function useTriggerKeydown(options) {
  const { activeDescendantController, getOptionById, setOpen, selectOption, multiselect, open } = options;
  const getActiveOption = reactExports.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : void 0;
  }, [
    activeDescendantController,
    getOptionById
  ]);
  const first = () => {
    activeDescendantController.first();
  };
  const last = () => {
    activeDescendantController.last();
  };
  const next = (activeOption) => {
    if (activeOption) {
      activeDescendantController.next();
    } else {
      activeDescendantController.first();
    }
  };
  const previous = (activeOption) => {
    if (activeOption) {
      activeDescendantController.prev();
    } else {
      activeDescendantController.first();
    }
  };
  const pageUp = () => {
    for (let i = 0; i < 10; i++) {
      activeDescendantController.prev();
    }
  };
  const pageDown = () => {
    for (let i = 0; i < 10; i++) {
      activeDescendantController.next();
    }
  };
  const setKeyboardNavigation = useSetKeyboardNavigation();
  return useEventCallback((e) => {
    const action = getDropdownActionFromKey(e, {
      open,
      multiselect
    });
    const activeOption = getActiveOption();
    switch (action) {
      case "First":
      case "Last":
      case "Next":
      case "Previous":
      case "PageDown":
      case "PageUp":
      case "Open":
      case "Close":
      case "CloseSelect":
      case "Select":
        e.preventDefault();
        break;
    }
    setKeyboardNavigation(true);
    switch (action) {
      case "First":
        first();
        break;
      case "Last":
        last();
        break;
      case "Next":
        next(activeOption);
        break;
      case "Previous":
        previous(activeOption);
        break;
      case "PageDown":
        pageDown();
        break;
      case "PageUp":
        pageUp();
        break;
      case "Open":
        setOpen(e, true);
        break;
      case "Close":
        e.stopPropagation();
        setOpen(e, false);
        break;
      case "CloseSelect":
        !multiselect && !(activeOption === null || activeOption === void 0 ? void 0 : activeOption.disabled) && setOpen(e, false);
      // fallthrough
      case "Select":
        activeOption && selectOption(e, activeOption);
        break;
      case "Tab":
        !multiselect && activeOption && selectOption(e, activeOption);
        break;
    }
  });
}
function useInputTriggerSlot(triggerFromProps, ref, options) {
  const { state: { open, value, selectOption, setValue, multiselect, selectedOptions, clearSelection, getOptionById, setOpen }, freeform, defaultProps, activeDescendantController, shouldCloseOnBlur } = options;
  const onBlur = (event) => {
    if (!open && !freeform) {
      const activeOptionId = activeDescendantController.active();
      const activeOption = activeOptionId ? getOptionById(activeOptionId) : null;
      if (value && activeOption && value.trim().toLowerCase() === (activeOption === null || activeOption === void 0 ? void 0 : activeOption.text.toLowerCase())) {
        selectOption(event, activeOption);
      }
      setValue(void 0);
    }
  };
  const getOptionFromInput = (inputValue) => {
    const searchString = inputValue === null || inputValue === void 0 ? void 0 : inputValue.trim().toLowerCase();
    if (!searchString || searchString.length === 0) {
      activeDescendantController.blur();
      return;
    }
    const matcher = (optionText) => optionText.toLowerCase().indexOf(searchString) === 0;
    const match = activeDescendantController.find((id) => {
      const option = getOptionById(id);
      return !!option && matcher(option.text);
    });
    if (!match) {
      activeDescendantController.blur();
      return void 0;
    }
    return getOptionById(match);
  };
  const onChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    const matchingOption = getOptionFromInput(inputValue);
    if (!multiselect && selectedOptions.length === 1 && (inputValue.length < 1 || !matchingOption)) {
      clearSelection(event);
    }
  };
  const trigger = useTriggerSlot(triggerFromProps, ref, {
    state: options.state,
    defaultProps,
    elementType: "input",
    activeDescendantController,
    shouldCloseOnBlur
  });
  trigger.onChange = mergeCallbacks(trigger.onChange, onChange);
  trigger.onBlur = mergeCallbacks(trigger.onBlur, onBlur);
  const [hideActiveDescendant, setHideActiveDescendant] = reactExports.useState(false);
  const isTyping = reactExports.useRef(false);
  const defaultOnKeyDown = trigger.onKeyDown;
  const onKeyDown = useEventCallback((event) => {
    if (!open && getDropdownActionFromKey(event) === "Type") {
      setOpen(event, true);
    }
    if (event.key === ArrowLeft || event.key === ArrowRight) {
      setHideActiveDescendant(true);
    } else {
      setHideActiveDescendant(false);
    }
    const action = getDropdownActionFromKey(event, {
      open,
      multiselect
    });
    if (action === "Type") {
      isTyping.current = true;
    } else if (action === "Open" && event.key !== " " || action === "Next" || action === "Previous" || action === "First" || action === "Last" || action === "PageUp" || action === "PageDown") {
      isTyping.current = false;
    }
    if ((isTyping.current || !open) && event.key === " ") {
      var _triggerFromProps_onKeyDown;
      triggerFromProps === null || triggerFromProps === void 0 ? void 0 : (_triggerFromProps_onKeyDown = triggerFromProps.onKeyDown) === null || _triggerFromProps_onKeyDown === void 0 ? void 0 : _triggerFromProps_onKeyDown.call(triggerFromProps, event);
      return;
    }
    defaultOnKeyDown === null || defaultOnKeyDown === void 0 ? void 0 : defaultOnKeyDown(event);
  });
  trigger.onKeyDown = onKeyDown;
  if (hideActiveDescendant) {
    trigger["aria-activedescendant"] = void 0;
  }
  return trigger;
}
function useTabsterEscapeIgnore(props, shouldIgnoreEscape) {
  const ignoreEscapeKeyAttribute = useTabsterAttributes({
    focusable: {
      ignoreKeydown: {
        Escape: shouldIgnoreEscape
      }
    }
  });
  return useMergedTabsterAttributes_unstable(ignoreEscapeKeyAttribute, typeof props === "object" ? props : {});
}
function useComboboxExpandIconSlot(expandIconFromProps, options) {
  const defaultExpandIconId = useId("combobox-chevron-");
  const { disabled, hideFromTabOrder, open, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, triggerLabelledBy } = options;
  const expandIcon = optional(expandIconFromProps, {
    renderByDefault: true,
    defaultProps: {
      "aria-disabled": disabled ? "true" : void 0,
      "aria-expanded": open,
      role: "button",
      tabIndex: disabled ? -1 : 0
    },
    elementType: "span"
  });
  if (!expandIcon) {
    return void 0;
  }
  if (disabled || hideFromTabOrder) {
    expandIcon.tabIndex = -1;
  }
  const hasExpandLabel = expandIcon["aria-label"] || expandIcon["aria-labelledby"];
  if (!hasExpandLabel) {
    if (triggerLabelledBy || ariaLabelledBy) {
      var _expandIcon_id;
      const expandIconId = (_expandIcon_id = expandIcon.id) !== null && _expandIcon_id !== void 0 ? _expandIcon_id : defaultExpandIconId;
      expandIcon.id = expandIconId;
      expandIcon["aria-labelledby"] = `${expandIcon.id} ${triggerLabelledBy !== null && triggerLabelledBy !== void 0 ? triggerLabelledBy : ariaLabelledBy}`.trim();
      expandIcon["aria-label"] = "Open";
    } else if (ariaLabel) {
      expandIcon["aria-label"] = `Open ${ariaLabel}`;
    } else {
      expandIcon["aria-label"] = "Open";
    }
  }
  return expandIcon;
}
const useComboboxBase_unstable = (props, ref) => {
  var _state_expandIcon, _state_expandIcon1, _state_expandIcon2, _state_clearIcon, _state_clearIcon1;
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true
  });
  const { listboxRef: activeDescendantListboxRef, activeParentRef, controller: activeDescendantController } = useActiveDescendant({
    matchOption: isComboboxOptionElement
  });
  const comboboxInternalState = useComboboxBaseState({
    ...props,
    editable: true,
    activeDescendantController
  });
  const { appearance: _appearance, size: _size, ...baseState } = comboboxInternalState;
  const { clearable, clearSelection, disabled, multiselect, open, selectedOptions, setOpen, value, hasFocus } = baseState;
  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);
  const { disableAutoFocus = false, freeform, inlinePopup } = props;
  const expandIconRef = reactExports.useRef(null);
  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "children"
    ]
  });
  const triggerRef = reactExports.useRef(null);
  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: comboboxInternalState,
    triggerRef,
    defaultProps: {
      children: props.children,
      disableAutoFocus
    }
  });
  var _props_input;
  const triggerSlot = useInputTriggerSlot((_props_input = props.input) !== null && _props_input !== void 0 ? _props_input : {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: comboboxInternalState,
    freeform,
    defaultProps: {
      type: "text",
      value: value !== null && value !== void 0 ? value : "",
      "aria-controls": open ? listbox === null || listbox === void 0 ? void 0 : listbox.id : void 0,
      ...triggerNativeProps
    },
    activeDescendantController,
    shouldCloseOnBlur: (event) => !expandIconRef.current || event.relatedTarget !== expandIconRef.current
  });
  const rootSlot = always(props.root, {
    defaultProps: {
      "aria-owns": !inlinePopup && open ? listbox === null || listbox === void 0 ? void 0 : listbox.id : void 0,
      ...rootNativeProps
    },
    elementType: "div"
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);
  rootSlot.onBlur = mergeCallbacks(rootSlot.onBlur, (event) => {
    if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
      if (event.target !== event.currentTarget.querySelector("input")) {
        comboboxInternalState.setOpen(event, false);
      }
      comboboxInternalState.setHasFocus(false);
    }
  });
  const showClearIcon = selectedOptions.length > 0 && !disabled && clearable && !multiselect;
  const state = {
    components: {
      root: "div",
      input: "input",
      expandIcon: "span",
      listbox: Listbox,
      clearIcon: "span"
    },
    root: rootSlot,
    input: triggerSlot,
    listbox: open || hasFocus ? listbox : void 0,
    clearIcon: optional(props.clearIcon, {
      defaultProps: {
        "aria-hidden": "true"
      },
      elementType: "span",
      renderByDefault: true
    }),
    expandIcon: useComboboxExpandIconSlot(props.expandIcon, {
      disabled,
      hideFromTabOrder: showClearIcon,
      open,
      "aria-label": props["aria-label"],
      "aria-labelledby": props["aria-labelledby"],
      triggerLabelledBy: triggerSlot["aria-labelledby"]
    }),
    showClearIcon,
    activeDescendantController,
    ...baseState
  };
  const { targetDocument } = useFluent();
  useOnClickOutside({
    element: targetDocument,
    callback: (event) => setOpen(event, false),
    refs: [
      triggerRef,
      comboboxPopupRef,
      comboboxTargetRef
    ],
    disabled: !open
  });
  const { onMouseDown: onIconMouseDown } = state.expandIcon || {};
  const onExpandIconMouseDown = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(onIconMouseDown, (event) => {
      var _triggerRef_current;
      event.preventDefault();
      if (!state.disabled) {
        state.setOpen(event, !state.open);
      }
      (_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.focus();
    })
  );
  const onExpandIconClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks((_state_expandIcon = state.expandIcon) === null || _state_expandIcon === void 0 ? void 0 : _state_expandIcon.onClick, (event) => {
      if (event.detail === 0) {
        var _triggerRef_current;
        event.preventDefault();
        if (!state.disabled) {
          state.setOpen(event, !state.open);
        }
        (_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.focus();
      }
    })
  );
  const onExpandIconKeyDown = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks((_state_expandIcon1 = state.expandIcon) === null || _state_expandIcon1 === void 0 ? void 0 : _state_expandIcon1.onKeyDown, (event) => {
      if (state.open && event.key === "Escape") {
        var _triggerRef_current;
        event.preventDefault();
        event.stopPropagation();
        state.setOpen(event, false);
        (_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.focus();
        return;
      }
      if (!state.disabled && (event.key === "Enter" || event.key === " ")) {
        var _triggerRef_current1;
        event.preventDefault();
        state.setOpen(event, !state.open);
        (_triggerRef_current1 = triggerRef.current) === null || _triggerRef_current1 === void 0 ? void 0 : _triggerRef_current1.focus();
      }
    })
  );
  const expandIconSlotRef = useMergedRefs((_state_expandIcon2 = state.expandIcon) === null || _state_expandIcon2 === void 0 ? void 0 : _state_expandIcon2.ref, expandIconRef);
  if (state.expandIcon) {
    state.expandIcon.ref = expandIconSlotRef;
    state.expandIcon.onMouseDown = onExpandIconMouseDown;
    state.expandIcon.onClick = onExpandIconClick;
    state.expandIcon.onKeyDown = onExpandIconKeyDown;
  }
  const onClearIconMouseDown = useEventCallback(mergeCallbacks((_state_clearIcon = state.clearIcon) === null || _state_clearIcon === void 0 ? void 0 : _state_clearIcon.onMouseDown, (ev) => {
    ev.preventDefault();
  }));
  const onClearIconClick = useEventCallback(mergeCallbacks((_state_clearIcon1 = state.clearIcon) === null || _state_clearIcon1 === void 0 ? void 0 : _state_clearIcon1.onClick, (ev) => {
    clearSelection(ev);
  }));
  if (state.clearIcon) {
    state.clearIcon.onMouseDown = onClearIconMouseDown;
    state.clearIcon.onClick = onClearIconClick;
  }
  if (multiselect) {
    state.clearIcon = void 0;
  }
  return state;
};
const useCombobox_unstable = (props, ref) => {
  const fieldContext = useFieldContext_unstable();
  var _fieldContext_size;
  const { appearance = "outline", size: size2 = (_fieldContext_size = fieldContext === null || fieldContext === void 0 ? void 0 : fieldContext.size) !== null && _fieldContext_size !== void 0 ? _fieldContext_size : "medium", ...baseProps } = props;
  const baseState = useComboboxBase_unstable(baseProps, ref);
  if (baseState.clearIcon) {
    var _baseState_clearIcon;
    var _children;
    (_children = (_baseState_clearIcon = baseState.clearIcon).children) !== null && _children !== void 0 ? _children : _baseState_clearIcon.children = /* @__PURE__ */ reactExports.createElement(DismissRegular, null);
  }
  if (baseState.expandIcon) {
    var _baseState_expandIcon;
    var _children1;
    (_children1 = (_baseState_expandIcon = baseState.expandIcon).children) !== null && _children1 !== void 0 ? _children1 : _baseState_expandIcon.children = /* @__PURE__ */ reactExports.createElement(ChevronDownRegular, null);
  }
  return {
    ...baseState,
    appearance,
    size: size2,
    input: {
      ...useTabsterEscapeIgnore(baseState.input, baseState.open),
      ...baseState.input
    }
  };
};
const renderCombobox_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: /* @__PURE__ */ jsx(ActiveDescendantContextProvider, {
      value: contextValues.activeDescendant,
      children: /* @__PURE__ */ jsx(ListboxProvider, {
        value: contextValues.listbox,
        children: /* @__PURE__ */ jsxs(ComboboxContext.Provider, {
          value: contextValues.combobox,
          children: [
            /* @__PURE__ */ jsx(state.input, {}),
            state.clearIcon && /* @__PURE__ */ jsx(state.clearIcon, {}),
            state.expandIcon && /* @__PURE__ */ jsx(state.expandIcon, {}),
            state.listbox && (state.inlinePopup ? /* @__PURE__ */ jsx(state.listbox, {}) : /* @__PURE__ */ jsx(Portal, {
              mountNode: state.mountNode,
              children: /* @__PURE__ */ jsx(state.listbox, {})
            }))
          ]
        })
      })
    })
  });
};
const comboboxClassNames = {
  root: "fui-Combobox",
  input: "fui-Combobox__input",
  expandIcon: "fui-Combobox__expandIcon",
  clearIcon: "fui-Combobox__clearIcon",
  listbox: "fui-Combobox__listbox"
};
const useStyles$7 = /* @__PURE__ */ __styles({
  root: {
    Bt984gj: "f122n59",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    B7ck84d: "f1ewtqcl",
    i8kkvl: "f14mj54c",
    mc9l5x: "fwk3njj",
    Budl1dq: "fz17x9o",
    Brf1p80: "f1869bpl",
    Bf4jedk: "f1exfvgq",
    qhf8xq: "f10pi13n",
    ha4doy: "fmrv4ls",
    Bbr2w1p: "f14a1fxs",
    Bduesf4: "f3e99gv",
    Bpq79vn: "fhljsf7",
    li1rpt: "f1gw3sf2",
    Bsft5z2: "f13zj6fq",
    E3zdtr: "f1mdlcz9",
    Eqx8gd: ["f1a7op3", "f1cjjd47"],
    By385i5: "f1gboi2j",
    B1piin3: ["f1cjjd47", "f1a7op3"],
    Dlnsje: "f145g4dw",
    d9w3h3: ["f1kp91vd", "f1ibwz09"],
    B3778ie: ["f1ibwz09", "f1kp91vd"],
    B1q35kw: 0,
    Bw17bha: 0,
    Bcgy8vk: 0,
    Bjuhk93: "f1mnjydx",
    Gjdm7m: "f13evtba",
    b1kco5: "f1yk9hq",
    Ba2ppi3: "fhwpy7i",
    F2fol1: "f14ee0xe",
    lck23g: "f1xhbsuh",
    wi16st: "fsrmcvb",
    ywj3b2: "f1t3k7v9",
    umuwi5: "fjw5xc1",
    Blcqepd: "f1xdyd5c",
    nplu4u: "fatpbeo",
    Bioka5o: "fb7uyps",
    Bnupc0a: "fx04xgm",
    bing71: "f1c7in40",
    Bercvud: "f1ibeo51"
  },
  listbox: {
    E5pizo: "f1hg901r",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    Bxyxcbc: "fmmk62d",
    B7ck84d: "f1ewtqcl"
  },
  listboxCollapsed: {
    mc9l5x: "fjseox"
  },
  inlineListbox: {
    Bj3rh1h: "f19g0ac"
  },
  small: {
    Bqenvij: "frvgh55",
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  medium: {
    Bqenvij: "f1d2rq10",
    z189sj: ["f11gcy0p", "f1ng84yb"]
  },
  large: {
    i8kkvl: "f1rjii52",
    Bqenvij: "fbhnoac",
    z189sj: ["fw5db7e", "f1uw59to"]
  },
  outline: {
    De3pzq: "fxugw4r",
    Bgfg5da: 0,
    B9xav0g: "f1c1zstj",
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "fhz96rm"
  },
  outlineInteractive: {
    Bgoe8wy: "fvcxoqz",
    Bwzppfd: ["f1ub3y4t", "f1m52nbi"],
    oetu4i: "f1l4zc64",
    gg5e9n: ["f1m52nbi", "f1ub3y4t"],
    B6oc9vd: "fvs00aa",
    ak43y8: ["f1assf6x", "f4ruux4"],
    wmxk5l: "f1z0osm6",
    B50zh58: ["f4ruux4", "f1assf6x"],
    Bvq3b66: "f1b473iu",
    Brahy3i: ["f381qr8", "ft4skwv"],
    zoxjo1: "f1qzcrsd",
    an54nd: ["ft4skwv", "f381qr8"]
  },
  underline: {
    De3pzq: "f1c21dwh",
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    Bgfg5da: "f9ez7ne",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "fokr779"
  },
  "filled-lighter": {
    De3pzq: "fxugw4r",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f88035w"
  },
  "filled-darker": {
    De3pzq: "f16xq7d1",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f88035w"
  },
  invalid: {
    tvckwq: "fs4k3qj",
    gk2u95: ["fcee079", "fmyw78r"],
    hhx65j: "f1fgmyf4",
    Bxowmz0: ["fmyw78r", "fcee079"]
  },
  invalidUnderline: {
    hhx65j: "f1fgmyf4"
  },
  disabled: {
    Bceei9c: "fdrzuqr",
    De3pzq: "f1c21dwh",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    Bcq6wej: "f9dbb4x",
    Jcjdmf: ["f3qs60o", "f5u9ap2"],
    sc4o1m: "fwd1oij",
    Bosien3: ["f5u9ap2", "f3qs60o"]
  }
}, {
  d: [".f122n59{align-items:center;}", [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".f1ewtqcl{box-sizing:border-box;}", ".f14mj54c{column-gap:var(--spacingHorizontalXXS);}", ".fwk3njj{display:inline-grid;}", ".fz17x9o{grid-template-columns:1fr auto;}", ".f1869bpl{justify-content:space-between;}", ".f1exfvgq{min-width:250px;}", ".f10pi13n{position:relative;}", ".fmrv4ls{vertical-align:middle;}", ".f1gw3sf2::after{box-sizing:border-box;}", '.f13zj6fq::after{content:"";}', ".f1mdlcz9::after{position:absolute;}", ".f1a7op3::after{left:-1px;}", ".f1cjjd47::after{right:-1px;}", ".f1gboi2j::after{bottom:-1px;}", ".f145g4dw::after{height:max(2px, var(--borderRadiusMedium));}", ".f1kp91vd::after{border-bottom-left-radius:var(--borderRadiusMedium);}", ".f1ibwz09::after{border-bottom-right-radius:var(--borderRadiusMedium);}", [".f1mnjydx::after{border-bottom:var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);}", {
    p: -1
  }], ".f13evtba::after{clip-path:inset(calc(100% - 2px) 0 0 0);}", ".f1yk9hq::after{transform:scaleX(0);}", ".fhwpy7i::after{transition-property:transform;}", ".f14ee0xe::after{transition-duration:var(--durationUltraFast);}", ".f1xhbsuh::after{transition-delay:var(--curveAccelerateMid);}", ".f1hg901r{box-shadow:var(--shadow16);}", [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fmmk62d{max-height:80vh;}", ".fjseox{display:none;}", ".f19g0ac{z-index:1;}", ".frvgh55{height:24px;}", ".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".f1d2rq10{height:32px;}", ".f11gcy0p{padding-right:var(--spacingHorizontalMNudge);}", ".f1ng84yb{padding-left:var(--spacingHorizontalMNudge);}", ".f1rjii52{column-gap:var(--spacingHorizontalSNudge);}", ".fbhnoac{height:40px;}", ".fw5db7e{padding-right:var(--spacingHorizontalM);}", ".f1uw59to{padding-left:var(--spacingHorizontalM);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", [".fhz96rm{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);}", {
    p: -2
  }], ".f1c1zstj{border-bottom-color:var(--colorNeutralStrokeAccessible);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".f9ez7ne{border-bottom:var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);}", {
    p: -1
  }], [".fokr779{border-radius:0;}", {
    p: -1
  }], [".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}", {
    p: -2
  }], ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", [".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}", {
    p: -2
  }], ".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}", ".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}", ".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}", ".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}", ".fdrzuqr{cursor:not-allowed;}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}"],
  w: [".f14a1fxs:focus-within{outline-width:2px;}", ".f3e99gv:focus-within{outline-style:solid;}", ".fhljsf7:focus-within{outline-color:transparent;}", ".fjw5xc1:focus-within::after{transform:scaleX(1);}", ".f1xdyd5c:focus-within::after{transition-property:transform;}", ".fatpbeo:focus-within::after{transition-duration:var(--durationNormal);}", ".fb7uyps:focus-within::after{transition-delay:var(--curveDecelerateMid);}", ".f1ibeo51:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".f1b473iu:focus-within{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f381qr8:focus-within{border-right-color:var(--colorNeutralStroke1Pressed);}", ".ft4skwv:focus-within{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1qzcrsd:focus-within{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"],
  m: [["@media screen and (prefers-reduced-motion: reduce){.fsrmcvb::after{transition-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f1t3k7v9::after{transition-delay:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.fx04xgm:focus-within::after{transition-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f1c7in40:focus-within::after{transition-delay:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]],
  h: [".fvcxoqz:hover{border-top-color:var(--colorNeutralStroke1Hover);}", ".f1ub3y4t:hover{border-right-color:var(--colorNeutralStroke1Hover);}", ".f1m52nbi:hover{border-left-color:var(--colorNeutralStroke1Hover);}", ".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}"],
  a: [".fvs00aa:active{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f1assf6x:active{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f4ruux4:active{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1z0osm6:active{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"]
});
const useInputStyles$3 = /* @__PURE__ */ __styles({
  input: {
    qb2dma: "f1ub7u0d",
    De3pzq: "f1c21dwh",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f3bhgqh",
    sj55zd: "f19n0e5",
    Bahqtrf: "fk6fouc",
    Brovlpu: "ftqa4ok",
    yvdlaj: "fwyc1cq",
    B3o7kgh: "f13ta7ih"
  },
  small: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["fxe2rs", "f1gflqzi"]
  },
  medium: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["fzy81xo", "f58b53b"]
  },
  large: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "figsok6",
    Bg96gwp: "faaz57k",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["f1kdav7a", "footqm6"]
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    De3pzq: "f1c21dwh",
    Bceei9c: "fdrzuqr",
    yvdlaj: "fahhnxm"
  }
}, {
  d: [".f1ub7u0d{align-self:stretch;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".f3bhgqh{border:none;}", {
    p: -2
  }], ".f19n0e5{color:var(--colorNeutralForeground1);}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fwyc1cq::-webkit-input-placeholder{color:var(--colorNeutralForeground4);}", ".fwyc1cq::-moz-placeholder{color:var(--colorNeutralForeground4);}", ".f13ta7ih::-webkit-input-placeholder{opacity:1;}", ".f13ta7ih::-moz-placeholder{opacity:1;}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", [".fxe2rs{padding:0 0 0 calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], [".f1gflqzi{padding:0 calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS)) 0 0;}", {
    p: -1
  }], ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", [".fzy81xo{padding:0 0 0 calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], [".f58b53b{padding:0 calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS)) 0 0;}", {
    p: -1
  }], ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", [".f1kdav7a{padding:0 0 0 calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}", {
    p: -1
  }], [".footqm6{padding:0 calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge)) 0 0;}", {
    p: -1
  }], ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}"],
  f: [".ftqa4ok:focus{outline-style:none;}"]
});
const useIconStyles$1 = /* @__PURE__ */ __styles({
  icon: {
    B7ck84d: "f1ewtqcl",
    sj55zd: "fxkbij4",
    Bceei9c: "f1k6fduh",
    mc9l5x: "ftgm304",
    Be2twd7: "f1pp30po",
    qhf8xq: "f10pi13n",
    Bo70h7d: "fvc9v3g",
    Bsft5z2: "f13zj6fq",
    E3zdtr: "f1mdlcz9",
    bn5sak: "frwkxtg",
    By385i5: "fo72kxq",
    Eqx8gd: ["f1n6gb5g", "f15yvnhg"],
    B1piin3: ["f15yvnhg", "f1n6gb5g"]
  },
  hidden: {
    mc9l5x: "fjseox"
  },
  visuallyHidden: {
    Bh84pgu: "f1ekcaio",
    Bqenvij: "f1mpe4l3",
    jrapky: 0,
    Frg6f3: 0,
    t21cq0: 0,
    B6of3ja: 0,
    B74szlk: "f1jlpb2r",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1c5fvqg",
    a9b677: "frkrog8",
    qhf8xq: "f1euv43f"
  },
  small: {
    Be2twd7: "f4ybsrx",
    Frg6f3: ["f1h9en5y", "f1xk557c"],
    B1piin3: ["f1gwjbcf", "f1rbysb6"]
  },
  medium: {
    Be2twd7: "fe5j1ua",
    Frg6f3: ["f1h9en5y", "f1xk557c"],
    B1piin3: ["fpsl3z4", "f1po37t9"]
  },
  large: {
    Be2twd7: "f1rt2boy",
    Frg6f3: ["f1t5qyk5", "f1ikr372"],
    B1piin3: ["f1je5ipm", "fb53jzl"]
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    Bceei9c: "fdrzuqr"
  }
}, {
  d: [".f1ewtqcl{box-sizing:border-box;}", ".fxkbij4{color:var(--colorNeutralStrokeAccessible);}", ".f1k6fduh{cursor:pointer;}", ".ftgm304{display:block;}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f10pi13n{position:relative;}", ".fvc9v3g svg{display:block;}", '.f13zj6fq::after{content:"";}', ".f1mdlcz9::after{position:absolute;}", ".frwkxtg::after{top:0;}", ".fo72kxq::after{bottom:0;}", ".f1n6gb5g::after{left:0;}", ".f15yvnhg::after{right:0;}", ".fjseox{display:none;}", ".f1ekcaio{clip:rect(0px, 0px, 0px, 0px);}", ".f1mpe4l3{height:1px;}", [".f1jlpb2r{margin:-1px;}", {
    p: -1
  }], [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], [".f1c5fvqg{padding:0px;}", {
    p: -1
  }], ".frkrog8{width:1px;}", ".f1euv43f{position:absolute;}", ".f4ybsrx{font-size:16px;}", ".f1h9en5y{margin-left:var(--spacingHorizontalXXS);}", ".f1xk557c{margin-right:var(--spacingHorizontalXXS);}", ".f1gwjbcf::after{right:calc(-1 * var(--spacingHorizontalSNudge));}", ".f1rbysb6::after{left:calc(-1 * var(--spacingHorizontalSNudge));}", ".fe5j1ua{font-size:20px;}", ".fpsl3z4::after{right:calc(-1 * var(--spacingHorizontalMNudge));}", ".f1po37t9::after{left:calc(-1 * var(--spacingHorizontalMNudge));}", ".f1rt2boy{font-size:24px;}", ".f1t5qyk5{margin-left:var(--spacingHorizontalSNudge);}", ".f1ikr372{margin-right:var(--spacingHorizontalSNudge);}", ".f1je5ipm::after{right:calc(-1 * var(--spacingHorizontalM));}", ".fb53jzl::after{left:calc(-1 * var(--spacingHorizontalM));}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}"]
});
const useComboboxStyles_unstable = (state) => {
  const {
    appearance,
    open,
    size: size2,
    showClearIcon
  } = state;
  const invalid = `${state.input["aria-invalid"]}` === "true";
  const disabled = state.input.disabled;
  const styles = useStyles$7();
  const iconStyles = useIconStyles$1();
  const inputStyles = useInputStyles$3();
  state.root.className = mergeClasses(comboboxClassNames.root, styles.root, styles[appearance], styles[size2], !disabled && appearance === "outline" && styles.outlineInteractive, invalid && appearance !== "underline" && styles.invalid, invalid && appearance === "underline" && styles.invalidUnderline, disabled && styles.disabled, state.root.className);
  state.input.className = mergeClasses(comboboxClassNames.input, inputStyles.input, inputStyles[size2], disabled && inputStyles.disabled, state.input.className);
  if (state.listbox) {
    state.listbox.className = mergeClasses(comboboxClassNames.listbox, styles.listbox, state.inlinePopup && styles.inlineListbox, !open && styles.listboxCollapsed, state.listbox.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(comboboxClassNames.expandIcon, iconStyles.icon, iconStyles[size2], disabled && iconStyles.disabled, showClearIcon && iconStyles.visuallyHidden, state.expandIcon.className);
  }
  if (state.clearIcon) {
    state.clearIcon.className = mergeClasses(comboboxClassNames.clearIcon, iconStyles.icon, iconStyles[size2], disabled && iconStyles.disabled, !showClearIcon && iconStyles.hidden, state.clearIcon.className);
  }
  return state;
};
const Combobox = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useCombobox_unstable(props, ref);
  const contextValues = useComboboxContextValues(state);
  useComboboxStyles_unstable(state);
  useCustomStyleHook("useComboboxStyles_unstable")(state);
  return renderCombobox_unstable(state, contextValues);
});
Combobox.displayName = "Combobox";
function useButtonTriggerSlot(triggerFromProps, ref, options) {
  const { state: { open, setOpen, getOptionById }, defaultProps, activeDescendantController } = options;
  const searchString = reactExports.useRef("");
  const [setKeyTimeout, clearKeyTimeout] = useTimeout();
  const moveToNextMatchingOption = (matcher, opt = {
    startFromNext: false
  }) => {
    const { startFromNext } = opt;
    const activeOptionId = activeDescendantController.active();
    const nextInOrder = activeDescendantController.find((id) => {
      const option = getOptionById(id);
      return !!option && matcher(option.text);
    }, {
      startFrom: startFromNext ? activeDescendantController.next({
        passive: true
      }) : activeOptionId
    });
    if (nextInOrder) {
      return nextInOrder;
    }
    return activeDescendantController.find((id) => {
      const option = getOptionById(id);
      return !!option && matcher(option.text);
    });
  };
  const moveToNextMatchingOptionWithSameCharacterHandling = () => {
    if (moveToNextMatchingOption((optionText) => {
      return optionText.toLocaleLowerCase().indexOf(searchString.current) === 0;
    }, {
      // Slowly pressing the same key will cycle through options
      startFromNext: searchString.current.length === 1
    })) {
      return;
    }
    if (allCharactersSame(searchString.current) && moveToNextMatchingOption((optionText) => {
      return optionText.toLocaleLowerCase().indexOf(searchString.current[0]) === 0;
    }, {
      // if the search is all the same letter, cycle through options starting with that letter
      startFromNext: true
    })) {
      return;
    }
    activeDescendantController.blur();
  };
  const onTriggerKeyDown = (ev) => {
    clearKeyTimeout();
    if (getDropdownActionFromKey(ev) === "Type") {
      searchString.current += ev.key.toLowerCase();
      setKeyTimeout(() => {
        searchString.current = "";
      }, 500);
      if (open) {
        moveToNextMatchingOptionWithSameCharacterHandling();
      }
      !open && setOpen(ev, true);
    }
  };
  const trigger = useTriggerSlot(triggerFromProps, ref, {
    state: options.state,
    defaultProps,
    elementType: "button",
    activeDescendantController
  });
  trigger.onKeyDown = mergeCallbacks(onTriggerKeyDown, trigger.onKeyDown);
  return trigger;
}
function allCharactersSame(str) {
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      return false;
    }
  }
  return true;
}
const useDropdownBase_unstable = (props, ref) => {
  var _state_clearButton;
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true
  });
  const { listboxRef: activeDescendantListboxRef, activeParentRef, controller: activeDescendantController } = useActiveDescendant({
    matchOption: isComboboxOptionElement
  });
  const dropdownInternalState = useComboboxBaseState({
    ...props,
    activeDescendantController,
    freeform: false
  });
  const { appearance: _appearance, size: _size, freeform: _freeform, ...baseState } = dropdownInternalState;
  const { clearable, clearSelection, disabled, hasFocus, multiselect, open, selectedOptions, setOpen } = baseState;
  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: "button",
    excludedPropNames: [
      "children"
    ]
  });
  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);
  const triggerRef = reactExports.useRef(null);
  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: dropdownInternalState,
    triggerRef,
    defaultProps: {
      children: props.children
    }
  });
  const { targetDocument } = useFluent();
  useOnClickOutside({
    element: targetDocument,
    callback: (event) => setOpen(event, false),
    refs: [
      triggerRef,
      comboboxPopupRef,
      comboboxTargetRef
    ],
    disabled: !open
  });
  var _props_button;
  const trigger = useButtonTriggerSlot((_props_button = props.button) !== null && _props_button !== void 0 ? _props_button : {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: dropdownInternalState,
    defaultProps: {
      type: "button",
      // tabster navigation breaks if the button is disabled and tabIndex is 0
      tabIndex: triggerNativeProps.disabled ? void 0 : 0,
      children: baseState.value || props.placeholder,
      "aria-controls": open ? listbox === null || listbox === void 0 ? void 0 : listbox.id : void 0,
      ...triggerNativeProps
    },
    activeDescendantController
  });
  const rootSlot = always(props.root, {
    defaultProps: {
      "aria-owns": !props.inlinePopup && open ? listbox === null || listbox === void 0 ? void 0 : listbox.id : void 0,
      children: props.children,
      ...rootNativeProps
    },
    elementType: "div"
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);
  const showClearButton = selectedOptions.length > 0 && !disabled && clearable && !multiselect;
  const state = {
    components: {
      root: "div",
      button: "button",
      clearButton: "button",
      expandIcon: "span",
      listbox: Listbox
    },
    root: rootSlot,
    button: trigger,
    listbox: open || hasFocus ? listbox : void 0,
    clearButton: optional(props.clearButton, {
      defaultProps: {
        "aria-label": "Clear selection",
        // Safari doesn't allow to focus an element with this
        // when the element is not visible (display: none) we need to remove it to avoid tabster issues
        tabIndex: showClearButton ? 0 : void 0,
        type: "button"
      },
      elementType: "button",
      renderByDefault: true
    }),
    expandIcon: optional(props.expandIcon, {
      renderByDefault: true,
      elementType: "span"
    }),
    placeholderVisible: !baseState.value && !!props.placeholder,
    showClearButton,
    activeDescendantController,
    ...baseState
  };
  const onClearButtonClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks((_state_clearButton = state.clearButton) === null || _state_clearButton === void 0 ? void 0 : _state_clearButton.onClick, (ev) => {
      var _triggerRef_current;
      clearSelection(ev);
      (_triggerRef_current = triggerRef.current) === null || _triggerRef_current === void 0 ? void 0 : _triggerRef_current.focus();
    })
  );
  if (state.clearButton) {
    state.clearButton.onClick = onClearButtonClick;
  }
  if (multiselect) {
    state.clearButton = void 0;
  }
  return state;
};
const useDropdown_unstable = (props, ref) => {
  const fieldContext = useFieldContext_unstable();
  var _fieldContext_size;
  const { appearance = "outline", size: size2 = (_fieldContext_size = fieldContext === null || fieldContext === void 0 ? void 0 : fieldContext.size) !== null && _fieldContext_size !== void 0 ? _fieldContext_size : "medium", ...baseProps } = props;
  const baseState = useDropdownBase_unstable(baseProps, ref);
  if (baseState.clearButton) {
    var _baseState_clearButton;
    var _children;
    (_children = (_baseState_clearButton = baseState.clearButton).children) !== null && _children !== void 0 ? _children : _baseState_clearButton.children = /* @__PURE__ */ reactExports.createElement(DismissRegular, null);
  }
  if (baseState.expandIcon) {
    var _baseState_expandIcon;
    var _children1;
    (_children1 = (_baseState_expandIcon = baseState.expandIcon).children) !== null && _children1 !== void 0 ? _children1 : _baseState_expandIcon.children = /* @__PURE__ */ reactExports.createElement(ChevronDownRegular, null);
  }
  return {
    ...baseState,
    appearance,
    size: size2,
    button: {
      ...useTabsterEscapeIgnore(baseState.button, baseState.open),
      ...baseState.button
    }
  };
};
const renderDropdown_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: /* @__PURE__ */ jsx(ActiveDescendantContextProvider, {
      value: contextValues.activeDescendant,
      children: /* @__PURE__ */ jsx(ListboxContext.Provider, {
        value: contextValues.listbox,
        children: /* @__PURE__ */ jsxs(ComboboxContext.Provider, {
          value: contextValues.combobox,
          children: [
            /* @__PURE__ */ jsxs(state.button, {
              children: [
                state.button.children,
                state.expandIcon && /* @__PURE__ */ jsx(state.expandIcon, {})
              ]
            }),
            state.clearButton && /* @__PURE__ */ jsx(state.clearButton, {}),
            state.listbox && (state.inlinePopup ? /* @__PURE__ */ jsx(state.listbox, {}) : /* @__PURE__ */ jsx(Portal, {
              mountNode: state.mountNode,
              children: /* @__PURE__ */ jsx(state.listbox, {})
            }))
          ]
        })
      })
    })
  });
};
const dropdownClassNames = {
  root: "fui-Dropdown",
  button: "fui-Dropdown__button",
  clearButton: "fui-Dropdown__clearButton",
  expandIcon: "fui-Dropdown__expandIcon",
  listbox: "fui-Dropdown__listbox"
};
const useStyles$6 = /* @__PURE__ */ __styles({
  root: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    B7ck84d: "f1ewtqcl",
    mc9l5x: "ftuwxu6",
    Bf4jedk: "f1exfvgq",
    qhf8xq: "f10pi13n",
    ha4doy: "fmrv4ls",
    Bbr2w1p: "f14a1fxs",
    Bduesf4: "f3e99gv",
    Bpq79vn: "fhljsf7",
    li1rpt: "f1gw3sf2",
    Bsft5z2: "f13zj6fq",
    E3zdtr: "f1mdlcz9",
    Eqx8gd: ["f1a7op3", "f1cjjd47"],
    By385i5: "f1gboi2j",
    B1piin3: ["f1cjjd47", "f1a7op3"],
    Dlnsje: "ffyw7fx",
    d9w3h3: ["f1kp91vd", "f1ibwz09"],
    B3778ie: ["f1ibwz09", "f1kp91vd"],
    B1q35kw: 0,
    Bw17bha: 0,
    Bcgy8vk: 0,
    Bjuhk93: "f1mnjydx",
    Gjdm7m: "f13evtba",
    b1kco5: "f1yk9hq",
    Ba2ppi3: "fhwpy7i",
    F2fol1: "f14ee0xe",
    lck23g: "f1xhbsuh",
    wi16st: "fsrmcvb",
    ywj3b2: "f1t3k7v9",
    umuwi5: "fjw5xc1",
    Blcqepd: "f1xdyd5c",
    nplu4u: "fatpbeo",
    Bioka5o: "fb7uyps",
    Bnupc0a: "fx04xgm",
    bing71: "f1c7in40",
    Bercvud: "f1ibeo51",
    Br277j9: "f18qfb8s",
    Btis473: "f1m082s7"
  },
  listbox: {
    B7ck84d: "f1ewtqcl",
    E5pizo: "f1hg901r",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    Bxyxcbc: "fmmk62d"
  },
  listboxCollapsed: {
    mc9l5x: "fjseox"
  },
  inlineListbox: {
    Bj3rh1h: "f19g0ac"
  },
  button: {
    Bt984gj: "f122n59",
    De3pzq: "f1c21dwh",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f3bhgqh",
    B7ck84d: "f1ewtqcl",
    sj55zd: "f19n0e5",
    i8kkvl: "f14mj54c",
    Bceei9c: "f1k6fduh",
    mc9l5x: "f13qh94s",
    Bahqtrf: "fk6fouc",
    Budl1dq: "f12nh0o2",
    Brf1p80: "f1869bpl",
    fsow6f: ["f1o700av", "fes3tcz"],
    a9b677: "fly5x3f",
    Brovlpu: "ftqa4ok"
  },
  placeholder: {
    sj55zd: "fxc4j92"
  },
  small: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["fye6m5k", "f3cq2dl"]
  },
  medium: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["f14ev680", "f58uxzw"]
  },
  large: {
    i8kkvl: "f1rjii52",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "figsok6",
    Bg96gwp: "faaz57k",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["f139mn7i", "f1v3q0m"]
  },
  outline: {
    De3pzq: "fxugw4r",
    Bgfg5da: 0,
    B9xav0g: "f1c1zstj",
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "fhz96rm"
  },
  outlineInteractive: {
    Bgoe8wy: "fvcxoqz",
    Bwzppfd: ["f1ub3y4t", "f1m52nbi"],
    oetu4i: "f1l4zc64",
    gg5e9n: ["f1m52nbi", "f1ub3y4t"],
    B6oc9vd: "fvs00aa",
    ak43y8: ["f1assf6x", "f4ruux4"],
    wmxk5l: "f1z0osm6",
    B50zh58: ["f4ruux4", "f1assf6x"],
    Bvq3b66: "f1b473iu",
    Brahy3i: ["f381qr8", "ft4skwv"],
    zoxjo1: "f1qzcrsd",
    an54nd: ["ft4skwv", "f381qr8"]
  },
  underline: {
    De3pzq: "f1c21dwh",
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    Bgfg5da: "f9ez7ne",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "fokr779"
  },
  "filled-lighter": {
    De3pzq: "fxugw4r",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f88035w"
  },
  "filled-darker": {
    De3pzq: "f16xq7d1",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f88035w"
  },
  invalid: {
    tvckwq: "fs4k3qj",
    gk2u95: ["fcee079", "fmyw78r"],
    hhx65j: "f1fgmyf4",
    Bxowmz0: ["fmyw78r", "fcee079"]
  },
  invalidUnderline: {
    hhx65j: "f1fgmyf4"
  },
  disabled: {
    Bceei9c: "fdrzuqr",
    De3pzq: "f1c21dwh",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    Bcq6wej: "f9dbb4x",
    Jcjdmf: ["f3qs60o", "f5u9ap2"],
    sc4o1m: "fwd1oij",
    Bosien3: ["f5u9ap2", "f3qs60o"]
  },
  disabledText: {
    sj55zd: "f1s2aq7o",
    Bceei9c: "fdrzuqr"
  },
  hidden: {
    mc9l5x: "fjseox"
  }
}, {
  d: [[".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".f1ewtqcl{box-sizing:border-box;}", ".ftuwxu6{display:inline-flex;}", ".f1exfvgq{min-width:250px;}", ".f10pi13n{position:relative;}", ".fmrv4ls{vertical-align:middle;}", ".f1gw3sf2::after{box-sizing:border-box;}", '.f13zj6fq::after{content:"";}', ".f1mdlcz9::after{position:absolute;}", ".f1a7op3::after{left:-1px;}", ".f1cjjd47::after{right:-1px;}", ".f1gboi2j::after{bottom:-1px;}", ".ffyw7fx::after{height:max(var(--strokeWidthThick), var(--borderRadiusMedium));}", ".f1kp91vd::after{border-bottom-left-radius:var(--borderRadiusMedium);}", ".f1ibwz09::after{border-bottom-right-radius:var(--borderRadiusMedium);}", [".f1mnjydx::after{border-bottom:var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);}", {
    p: -1
  }], ".f13evtba::after{clip-path:inset(calc(100% - 2px) 0 0 0);}", ".f1yk9hq::after{transform:scaleX(0);}", ".fhwpy7i::after{transition-property:transform;}", ".f14ee0xe::after{transition-duration:var(--durationUltraFast);}", ".f1xhbsuh::after{transition-delay:var(--curveAccelerateMid);}", ".f1hg901r{box-shadow:var(--shadow16);}", [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fmmk62d{max-height:80vh;}", ".fjseox{display:none;}", ".f19g0ac{z-index:1;}", ".f122n59{align-items:center;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".f3bhgqh{border:none;}", {
    p: -2
  }], ".f19n0e5{color:var(--colorNeutralForeground1);}", ".f14mj54c{column-gap:var(--spacingHorizontalXXS);}", ".f1k6fduh{cursor:pointer;}", ".f13qh94s{display:grid;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".f12nh0o2{grid-template-columns:[content] 1fr [icon] auto [end];}", ".f1869bpl{justify-content:space-between;}", ".f1o700av{text-align:left;}", ".fes3tcz{text-align:right;}", ".fly5x3f{width:100%;}", ".fxc4j92{color:var(--colorNeutralForeground4);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", [".fye6m5k{padding:3px var(--spacingHorizontalSNudge) 3px calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], [".f3cq2dl{padding:3px calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS)) 3px var(--spacingHorizontalSNudge);}", {
    p: -1
  }], ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", [".f14ev680{padding:5px var(--spacingHorizontalMNudge) 5px calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], [".f58uxzw{padding:5px calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS)) 5px var(--spacingHorizontalMNudge);}", {
    p: -1
  }], ".f1rjii52{column-gap:var(--spacingHorizontalSNudge);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", [".f139mn7i{padding:7px var(--spacingHorizontalM) 7px calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}", {
    p: -1
  }], [".f1v3q0m{padding:7px calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge)) 7px var(--spacingHorizontalM);}", {
    p: -1
  }], ".fxugw4r{background-color:var(--colorNeutralBackground1);}", [".fhz96rm{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);}", {
    p: -2
  }], ".f1c1zstj{border-bottom-color:var(--colorNeutralStrokeAccessible);}", [".f9ez7ne{border-bottom:var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);}", {
    p: -1
  }], [".fokr779{border-radius:0;}", {
    p: -1
  }], [".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}", {
    p: -2
  }], ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", [".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}", {
    p: -2
  }], ".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}", ".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}", ".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}", ".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}", ".fdrzuqr{cursor:not-allowed;}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}"],
  w: [".f14a1fxs:focus-within{outline-width:2px;}", ".f3e99gv:focus-within{outline-style:solid;}", ".fhljsf7:focus-within{outline-color:transparent;}", ".fjw5xc1:focus-within::after{transform:scaleX(1);}", ".f1xdyd5c:focus-within::after{transition-property:transform;}", ".fatpbeo:focus-within::after{transition-duration:var(--durationNormal);}", ".fb7uyps:focus-within::after{transition-delay:var(--curveDecelerateMid);}", ".f1ibeo51:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".f1b473iu:focus-within{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f381qr8:focus-within{border-right-color:var(--colorNeutralStroke1Pressed);}", ".ft4skwv:focus-within{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1qzcrsd:focus-within{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"],
  m: [["@media screen and (prefers-reduced-motion: reduce){.fsrmcvb::after{transition-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f1t3k7v9::after{transition-delay:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.fx04xgm:focus-within::after{transition-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f1c7in40:focus-within::after{transition-delay:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]],
  t: ["@supports selector(:has(*)){.f18qfb8s:has(.fui-Dropdown__clearButton:focus)::after{border-bottom-color:initial;}}", "@supports selector(:has(*)){.f1m082s7:has(.fui-Dropdown__clearButton:focus)::after{transform:scaleX(0);}}"],
  f: [".ftqa4ok:focus{outline-style:none;}"],
  h: [".fvcxoqz:hover{border-top-color:var(--colorNeutralStroke1Hover);}", ".f1ub3y4t:hover{border-right-color:var(--colorNeutralStroke1Hover);}", ".f1m52nbi:hover{border-left-color:var(--colorNeutralStroke1Hover);}", ".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}"],
  a: [".fvs00aa:active{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f1assf6x:active{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f4ruux4:active{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1z0osm6:active{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"]
});
const useIconStyles = /* @__PURE__ */ __styles({
  icon: {
    B7ck84d: "f1ewtqcl",
    sj55zd: "fxkbij4",
    mc9l5x: "ftgm304",
    Be2twd7: "f1pp30po",
    Br312pm: "f12w6cgp",
    Bw0ie65: "f8bv1bt",
    Bo70h7d: "fvc9v3g"
  },
  small: {
    Be2twd7: "f4ybsrx",
    Frg6f3: ["f1h9en5y", "f1xk557c"]
  },
  medium: {
    Be2twd7: "fe5j1ua",
    Frg6f3: ["f1h9en5y", "f1xk557c"]
  },
  large: {
    Be2twd7: "f1rt2boy",
    Frg6f3: ["f1t5qyk5", "f1ikr372"]
  },
  disabled: {
    sj55zd: "f1s2aq7o"
  }
}, {
  d: [".f1ewtqcl{box-sizing:border-box;}", ".fxkbij4{color:var(--colorNeutralStrokeAccessible);}", ".ftgm304{display:block;}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f12w6cgp{grid-column-start:icon;}", ".f8bv1bt{grid-column-end:end;}", ".fvc9v3g svg{display:block;}", ".f4ybsrx{font-size:16px;}", ".f1h9en5y{margin-left:var(--spacingHorizontalXXS);}", ".f1xk557c{margin-right:var(--spacingHorizontalXXS);}", ".fe5j1ua{font-size:20px;}", ".f1rt2boy{font-size:24px;}", ".f1t5qyk5{margin-left:var(--spacingHorizontalSNudge);}", ".f1ikr372{margin-right:var(--spacingHorizontalSNudge);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}"]
});
const useBaseClearButtonStyle = /* @__PURE__ */ __resetStyles("rticfuj", "r1vp6jef", {
  r: [".rticfuj{align-self:center;background-color:var(--colorTransparentBackground);border:none;cursor:pointer;height:fit-content;margin:0;margin-right:var(--spacingHorizontalMNudge);padding:0;position:relative;}", ".rticfuj:focus{outline-style:none;}", ".rticfuj:focus-visible{outline-style:none;}", ".rticfuj[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.rticfuj[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".r1vp6jef{align-self:center;background-color:var(--colorTransparentBackground);border:none;cursor:pointer;height:fit-content;margin:0;margin-left:var(--spacingHorizontalMNudge);padding:0;position:relative;}", ".r1vp6jef:focus{outline-style:none;}", ".r1vp6jef:focus-visible{outline-style:none;}", ".r1vp6jef[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.r1vp6jef[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.rticfuj[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media (forced-colors: active){.r1vp6jef[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]
});
const useDropdownStyles_unstable = (state) => {
  const {
    appearance,
    open,
    placeholderVisible,
    showClearButton,
    size: size2
  } = state;
  const invalid = `${state.button["aria-invalid"]}` === "true";
  const disabled = state.button.disabled;
  const styles = useStyles$6();
  const iconStyles = useIconStyles();
  const clearButtonStyle = useBaseClearButtonStyle();
  state.root.className = mergeClasses(dropdownClassNames.root, styles.root, styles[appearance], !disabled && appearance === "outline" && styles.outlineInteractive, invalid && appearance !== "underline" && styles.invalid, invalid && appearance === "underline" && styles.invalidUnderline, disabled && styles.disabled, state.root.className);
  state.button.className = mergeClasses(dropdownClassNames.button, styles.button, styles[size2], placeholderVisible && styles.placeholder, disabled && styles.disabledText, state.button.className);
  if (state.listbox) {
    state.listbox.className = mergeClasses(dropdownClassNames.listbox, styles.listbox, state.inlinePopup && styles.inlineListbox, !open && styles.listboxCollapsed, state.listbox.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(dropdownClassNames.expandIcon, iconStyles.icon, iconStyles[size2], disabled && iconStyles.disabled, showClearButton && styles.hidden, state.expandIcon.className);
  }
  if (state.clearButton) {
    state.clearButton.className = mergeClasses(dropdownClassNames.clearButton, clearButtonStyle, iconStyles.icon, iconStyles[size2], disabled && iconStyles.disabled, !showClearButton && styles.hidden, state.clearButton.className);
  }
  return state;
};
const Dropdown = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDropdown_unstable(props, ref);
  const contextValues = useComboboxContextValues(state);
  useDropdownStyles_unstable(state);
  useCustomStyleHook("useDropdownStyles_unstable")(state);
  return renderDropdown_unstable(state, contextValues);
});
Dropdown.displayName = "Dropdown";
const useOptionGroup_unstable = (props, ref) => {
  const labelId = useId("group-label");
  const { label } = props;
  return {
    components: {
      root: "div",
      label: "span"
    },
    root: always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      role: "group",
      "aria-labelledby": label ? labelId : void 0,
      ...props
    }), {
      elementType: "div"
    }),
    label: optional(label, {
      defaultProps: {
        id: labelId,
        role: "presentation"
      },
      elementType: "span"
    })
  };
};
const renderOptionGroup_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.label && /* @__PURE__ */ jsx(state.label, {
        children: state.label.children
      }),
      state.root.children
    ]
  });
};
const optionGroupClassNames = {
  root: "fui-OptionGroup",
  label: "fui-OptionGroup__label"
};
const useStyles$5 = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "f22iagw",
    Beiy3e4: "f1vx9l62",
    Belr9w4: "fiut8dr",
    B8lkq7l: "f1xxzjds",
    eii1in: 0,
    H93o2g: 0,
    Gwp8xu: 0,
    Bd39igo: "f16cmn8k",
    om0q45: "f5642y",
    Hl9o3s: "ffdf81h",
    sl1c2c: 0,
    z4hxbw: 0,
    B0i58d9: 0,
    Bi9x0x4: 0,
    Bgurq3m: "f1bsn9kn"
  },
  label: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    sj55zd: "f11d4kpn",
    mc9l5x: "ftgm304",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "fwrc4pm",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1mpq0zz"
  }
}, {
  d: [".f22iagw{display:flex;}", ".f1vx9l62{flex-direction:column;}", ".fiut8dr{row-gap:var(--spacingHorizontalXXS);}", '.f1xxzjds:not(:last-child)::after{content:"";}', [".f16cmn8k:not(:last-child)::after{border-bottom:var(--strokeWidthThin) solid var(--colorNeutralStroke2);}", {
    p: -1
  }], ".f5642y:not(:last-child)::after{display:block;}", ".ffdf81h:not(:last-child)::after{padding-bottom:var(--spacingHorizontalXS);}", [".f1bsn9kn:not(:last-child)::after{margin:0 calc(var(--spacingHorizontalXS) * -1) var(--spacingVerticalXS);}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".f11d4kpn{color:var(--colorNeutralForeground3);}", ".ftgm304{display:block;}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", [".f1mpq0zz{padding:var(--spacingHorizontalS) var(--spacingHorizontalSNudge);}", {
    p: -1
  }]]
});
const useOptionGroupStyles_unstable = (state) => {
  const styles = useStyles$5();
  state.root.className = mergeClasses(optionGroupClassNames.root, styles.root, state.root.className);
  if (state.label) {
    state.label.className = mergeClasses(optionGroupClassNames.label, styles.label, state.label.className);
  }
  return state;
};
const OptionGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useOptionGroup_unstable(props, ref);
  useOptionGroupStyles_unstable(state);
  useCustomStyleHook("useOptionGroupStyles_unstable")(state);
  return renderOptionGroup_unstable(state);
});
OptionGroup.displayName = "OptionGroup";
const RadioGroupContext = reactExports.createContext(void 0);
const radioGroupContextDefaultValue = {};
RadioGroupContext.Provider;
const useRadioGroupContextValue_unstable = () => reactExports.useContext(RadioGroupContext) || radioGroupContextDefaultValue;
const renderRadioGroup_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(RadioGroupContext.Provider, {
    value: contextValues.radioGroup,
    children: /* @__PURE__ */ jsx(state.root, {})
  });
};
const useRadioGroup_unstable = (props, ref) => {
  const { layout = "vertical", ...baseProps } = props;
  const state = useRadioGroupBase_unstable(baseProps, ref);
  return {
    layout,
    ...state
  };
};
const useRadioGroupBase_unstable = (props, ref) => {
  props = useFieldControlProps_unstable(props);
  const generatedName = useId("radiogroup-");
  const { name = generatedName, value, defaultValue, disabled, onChange, required } = props;
  return {
    name,
    value,
    defaultValue,
    disabled,
    required,
    components: {
      root: "div"
    },
    root: {
      ref,
      role: "radiogroup",
      ...always(getIntrinsicElementProps(
        "div",
        props,
        /*excludedPropNames:*/
        [
          "onChange",
          "name"
        ]
      ), {
        elementType: "div"
      }),
      onChange: useEventCallback((ev) => {
        if (onChange && isHTMLElement$1(ev.target, {
          constructorName: "HTMLInputElement"
        }) && ev.target.type === "radio") {
          onChange(ev, {
            value: ev.target.value
          });
        }
      })
    }
  };
};
const radioGroupClassNames = {
  root: "fui-RadioGroup"
};
const useStyles$4 = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "f22iagw",
    Bt984gj: "f6jr5hl"
  },
  vertical: {
    Beiy3e4: "f1vx9l62"
  }
}, {
  d: [".f22iagw{display:flex;}", ".f6jr5hl{align-items:flex-start;}", ".f1vx9l62{flex-direction:column;}"]
});
const useRadioGroupStyles_unstable = (state) => {
  const styles = useStyles$4();
  state.root.className = mergeClasses(radioGroupClassNames.root, styles.root, state.layout === "vertical" && styles.vertical, state.root.className);
  return state;
};
const useRadioGroupContextValues = (state) => {
  const { name, value, defaultValue, disabled, layout, required } = state;
  const ariaDescribedBy = state.root["aria-describedby"];
  const radioGroup = reactExports.useMemo(() => ({
    name,
    value,
    defaultValue,
    disabled,
    layout,
    required,
    "aria-describedby": ariaDescribedBy
  }), [
    name,
    value,
    defaultValue,
    disabled,
    layout,
    required,
    ariaDescribedBy
  ]);
  return {
    radioGroup
  };
};
const RadioGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useRadioGroup_unstable(props, ref);
  const contextValues = useRadioGroupContextValues(state);
  useRadioGroupStyles_unstable(state);
  useCustomStyleHook("useRadioGroupStyles_unstable")(state);
  return renderRadioGroup_unstable(state, contextValues);
});
RadioGroup.displayName = "RadioGroup";
const renderRadio_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      /* @__PURE__ */ jsx(state.input, {}),
      /* @__PURE__ */ jsx(state.indicator, {}),
      state.label && /* @__PURE__ */ jsx(state.label, {})
    ]
  });
};
const useRadio_unstable = (props, ref) => {
  const state = useRadioBase_unstable(props, ref);
  return {
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: {
      ...state.components,
      label: Label
    },
    label: optional(props.label, {
      defaultProps: {
        ...state.label
      },
      elementType: Label
    })
  };
};
const useRadioBase_unstable = (props, ref) => {
  const group = useRadioGroupContextValue_unstable();
  const { name = group.name, checked = group.value !== void 0 ? group.value === props.value : void 0, defaultChecked = group.defaultValue !== void 0 ? group.defaultValue === props.value : void 0, labelPosition = group.layout === "horizontal-stacked" ? "below" : "after", disabled = group.disabled, required = group.required, "aria-describedby": ariaDescribedBy = group["aria-describedby"], onChange } = props;
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "checked",
      "defaultChecked",
      "onChange"
    ]
  });
  const root = always(props.root, {
    defaultProps: {
      ref: useFocusWithin(),
      ...nativeProps.root
    },
    elementType: "span"
  });
  const input = always(props.input, {
    defaultProps: {
      ref,
      type: "radio",
      id: useId("radio-", nativeProps.primary.id),
      name,
      checked,
      defaultChecked,
      disabled,
      required,
      "aria-describedby": ariaDescribedBy,
      ...nativeProps.primary
    },
    elementType: "input"
  });
  input.onChange = mergeCallbacks(input.onChange, (ev) => onChange === null || onChange === void 0 ? void 0 : onChange(ev, {
    value: ev.currentTarget.value
  }));
  const label = optional(props.label, {
    defaultProps: {
      htmlFor: input.id,
      disabled: input.disabled
    },
    elementType: "label"
  });
  const indicator = always(props.indicator, {
    defaultProps: {
      "aria-hidden": true
    },
    elementType: "div"
  });
  return {
    labelPosition,
    components: {
      root: "span",
      input: "input",
      label: "label",
      indicator: "div"
    },
    root,
    input,
    label,
    indicator
  };
};
const radioClassNames = {
  root: "fui-Radio",
  indicator: "fui-Radio__indicator",
  input: "fui-Radio__input",
  label: "fui-Radio__label"
};
const useRootBaseClassName$1 = /* @__PURE__ */ __resetStyles("r1siqwd8", "rmnplyc", {
  r: [".r1siqwd8{display:inline-flex;position:relative;}", ".r1siqwd8:focus{outline-style:none;}", ".r1siqwd8:focus-visible{outline-style:none;}", ".r1siqwd8[data-fui-focus-within]:focus-within{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r1siqwd8[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".rmnplyc{display:inline-flex;position:relative;}", ".rmnplyc:focus{outline-style:none;}", ".rmnplyc:focus-visible{outline-style:none;}", ".rmnplyc[data-fui-focus-within]:focus-within{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.rmnplyc[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r1siqwd8[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media (forced-colors: active){.rmnplyc[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]
});
const useRootStyles$4 = /* @__PURE__ */ __styles({
  vertical: {
    Beiy3e4: "f1vx9l62",
    Bt984gj: "f122n59"
  }
}, {
  d: [".f1vx9l62{flex-direction:column;}", ".f122n59{align-items:center;}"]
});
const useInputBaseClassName = /* @__PURE__ */ __resetStyles("rg1upok", "rzwdzb4", {
  r: [".rg1upok{position:absolute;left:0;top:0;width:calc(16px + 2 * var(--spacingHorizontalS));height:100%;box-sizing:border-box;margin:0;opacity:0;}", ".rg1upok:enabled{cursor:pointer;}", ".rg1upok:enabled~.fui-Radio__label{cursor:pointer;}", ".rg1upok:enabled:not(:checked)~.fui-Radio__label{color:var(--colorNeutralForeground3);}", ".rg1upok:enabled:not(:checked)~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeAccessible);}", ".rg1upok:enabled:not(:checked):hover~.fui-Radio__label{color:var(--colorNeutralForeground2);}", ".rg1upok:enabled:not(:checked):hover~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeAccessibleHover);}", ".rg1upok:enabled:not(:checked):hover:active~.fui-Radio__label{color:var(--colorNeutralForeground1);}", ".rg1upok:enabled:not(:checked):hover:active~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeAccessiblePressed);}", ".rg1upok:enabled:checked~.fui-Radio__label{color:var(--colorNeutralForeground1);}", ".rg1upok:enabled:checked~.fui-Radio__indicator{border-color:var(--colorCompoundBrandStroke);color:var(--colorCompoundBrandForeground1);}", ".rg1upok:enabled:checked:hover~.fui-Radio__indicator{border-color:var(--colorCompoundBrandStrokeHover);color:var(--colorCompoundBrandForeground1Hover);}", ".rg1upok:enabled:checked:hover:active~.fui-Radio__indicator{border-color:var(--colorCompoundBrandStrokePressed);color:var(--colorCompoundBrandForeground1Pressed);}", ".rg1upok:disabled~.fui-Radio__label{color:var(--colorNeutralForegroundDisabled);cursor:default;}", ".rg1upok:disabled~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeDisabled);color:var(--colorNeutralForegroundDisabled);}", ".rzwdzb4{position:absolute;right:0;top:0;width:calc(16px + 2 * var(--spacingHorizontalS));height:100%;box-sizing:border-box;margin:0;opacity:0;}", ".rzwdzb4:enabled{cursor:pointer;}", ".rzwdzb4:enabled~.fui-Radio__label{cursor:pointer;}", ".rzwdzb4:enabled:not(:checked)~.fui-Radio__label{color:var(--colorNeutralForeground3);}", ".rzwdzb4:enabled:not(:checked)~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeAccessible);}", ".rzwdzb4:enabled:not(:checked):hover~.fui-Radio__label{color:var(--colorNeutralForeground2);}", ".rzwdzb4:enabled:not(:checked):hover~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeAccessibleHover);}", ".rzwdzb4:enabled:not(:checked):hover:active~.fui-Radio__label{color:var(--colorNeutralForeground1);}", ".rzwdzb4:enabled:not(:checked):hover:active~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeAccessiblePressed);}", ".rzwdzb4:enabled:checked~.fui-Radio__label{color:var(--colorNeutralForeground1);}", ".rzwdzb4:enabled:checked~.fui-Radio__indicator{border-color:var(--colorCompoundBrandStroke);color:var(--colorCompoundBrandForeground1);}", ".rzwdzb4:enabled:checked:hover~.fui-Radio__indicator{border-color:var(--colorCompoundBrandStrokeHover);color:var(--colorCompoundBrandForeground1Hover);}", ".rzwdzb4:enabled:checked:hover:active~.fui-Radio__indicator{border-color:var(--colorCompoundBrandStrokePressed);color:var(--colorCompoundBrandForeground1Pressed);}", ".rzwdzb4:disabled~.fui-Radio__label{color:var(--colorNeutralForegroundDisabled);cursor:default;}", ".rzwdzb4:disabled~.fui-Radio__indicator{border-color:var(--colorNeutralStrokeDisabled);color:var(--colorNeutralForegroundDisabled);}"],
  s: ["@media (forced-colors: active){.rg1upok:enabled:not(:checked)~.fui-Radio__indicator{border-color:ButtonBorder;}}", "@media (forced-colors: active){.rg1upok:enabled:checked~.fui-Radio__indicator{border-color:Highlight;color:Highlight;}.rg1upok:enabled:checked~.fui-Radio__indicator::after{background-color:Highlight;}}", "@media (forced-colors: active){.rg1upok:disabled~.fui-Radio__label{color:GrayText;}}", "@media (forced-colors: active){.rg1upok:disabled~.fui-Radio__indicator{border-color:GrayText;color:GrayText;}.rg1upok:disabled~.fui-Radio__indicator::after{background-color:GrayText;}}", "@media (forced-colors: active){.rzwdzb4:enabled:not(:checked)~.fui-Radio__indicator{border-color:ButtonBorder;}}", "@media (forced-colors: active){.rzwdzb4:enabled:checked~.fui-Radio__indicator{border-color:Highlight;color:Highlight;}.rzwdzb4:enabled:checked~.fui-Radio__indicator::after{background-color:Highlight;}}", "@media (forced-colors: active){.rzwdzb4:disabled~.fui-Radio__label{color:GrayText;}}", "@media (forced-colors: active){.rzwdzb4:disabled~.fui-Radio__indicator{border-color:GrayText;color:GrayText;}.rzwdzb4:disabled~.fui-Radio__indicator::after{background-color:GrayText;}}"]
});
const useInputStyles$2 = /* @__PURE__ */ __styles({
  below: {
    a9b677: "fly5x3f",
    Bqenvij: "f1je6zif"
  },
  defaultIndicator: {
    Blbys7f: "f9ma1gx"
  },
  customIndicator: {
    Bj53wkj: "f12zxao0"
  }
}, {
  d: [".fly5x3f{width:100%;}", ".f1je6zif{height:calc(16px + 2 * var(--spacingVerticalS));}", '.f9ma1gx:checked~.fui-Radio__indicator::after{content:"";}', ".f12zxao0:not(:checked)~.fui-Radio__indicator>*{opacity:0;}"]
});
const useIndicatorBaseClassName = /* @__PURE__ */ __resetStyles("rwtekvw", null, [".rwtekvw{position:relative;width:16px;height:16px;font-size:12px;box-sizing:border-box;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;border:var(--strokeWidthThin) solid;border-radius:var(--borderRadiusCircular);margin:var(--spacingVerticalS) var(--spacingHorizontalS);fill:currentColor;pointer-events:none;}", ".rwtekvw::after{position:absolute;width:16px;height:16px;border-radius:var(--borderRadiusCircular);transform:scale(0.625);background-color:currentColor;}"]);
const useLabelStyles$1 = /* @__PURE__ */ __styles({
  base: {
    qb2dma: "f7nlbp4",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1f5q0n8"
  },
  after: {
    uwmqm3: ["fruq291", "f7x41pl"],
    B6of3ja: "fjzwpt6",
    jrapky: "fh6j2fo"
  },
  below: {
    z8tnut: "f1ywm7hm",
    fsow6f: "f17mccla"
  }
}, {
  d: [".f7nlbp4{align-self:center;}", [".f1f5q0n8{padding:var(--spacingVerticalS) var(--spacingHorizontalS);}", {
    p: -1
  }], ".fruq291{padding-left:var(--spacingHorizontalXS);}", ".f7x41pl{padding-right:var(--spacingHorizontalXS);}", ".fjzwpt6{margin-top:calc((16px - var(--lineHeightBase300)) / 2);}", ".fh6j2fo{margin-bottom:calc((16px - var(--lineHeightBase300)) / 2);}", ".f1ywm7hm{padding-top:var(--spacingVerticalXS);}", ".f17mccla{text-align:center;}"]
});
const useRadioStyles_unstable = (state) => {
  const {
    labelPosition
  } = state;
  const rootBaseClassName = useRootBaseClassName$1();
  const rootStyles = useRootStyles$4();
  state.root.className = mergeClasses(radioClassNames.root, rootBaseClassName, labelPosition === "below" && rootStyles.vertical, state.root.className);
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles$2();
  state.input.className = mergeClasses(radioClassNames.input, inputBaseClassName, labelPosition === "below" && inputStyles.below, state.indicator.children ? inputStyles.customIndicator : inputStyles.defaultIndicator, state.input.className);
  const indicatorBaseClassName = useIndicatorBaseClassName();
  state.indicator.className = mergeClasses(radioClassNames.indicator, indicatorBaseClassName, state.indicator.className);
  const labelStyles = useLabelStyles$1();
  if (state.label) {
    state.label.className = mergeClasses(radioClassNames.label, labelStyles.base, labelStyles[labelPosition], state.label.className);
  }
  return state;
};
const Radio = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useRadio_unstable(props, ref);
  useRadioStyles_unstable(state);
  useCustomStyleHook("useRadioStyles_unstable")(state);
  return renderRadio_unstable(state);
});
Radio.displayName = "Radio";
const sliderCSSVars = {
  sliderDirectionVar: `--fui-Slider--direction`,
  sliderProgressVar: `--fui-Slider--progress`,
  sliderStepsPercentVar: `--fui-Slider--steps-percent`
};
const { sliderStepsPercentVar, sliderProgressVar, sliderDirectionVar } = sliderCSSVars;
const useSliderState_unstable = (state, props) => {
  const { min: min2 = 0, max: max2 = 100, step } = props;
  const { dir } = useFluent();
  const [currentValue, setCurrentValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: 0
  });
  const clampedValue = clamp$2(currentValue, min2, max2);
  const valuePercent = getPercentInRange(clampedValue, min2, max2);
  const inputOnChange = state.input.onChange;
  const propsOnChange = props.onChange;
  const onChange = useEventCallback((ev) => {
    const newValue = Number(ev.target.value);
    setCurrentValue(clamp$2(newValue, min2, max2));
    if (inputOnChange && inputOnChange !== propsOnChange) {
      inputOnChange(ev);
    } else if (propsOnChange) {
      propsOnChange(ev, {
        value: newValue
      });
    }
  });
  const stepPercent = step && step > 0 ? `${step * 100 / (max2 - min2)}%` : void 0;
  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? "0deg" : dir === "ltr" ? "90deg" : "270deg",
    [sliderProgressVar]: `${valuePercent}%`,
    // Set the sliderStepsPercentVar only if defined - fixes SSR errors in React 18
    ...stepPercent !== void 0 && {
      [sliderStepsPercentVar]: stepPercent
    }
  };
  state.root.style = {
    ...rootVariables,
    ...state.root.style
  };
  state.input.value = clampedValue;
  state.input.onChange = onChange;
  return state;
};
const useSlider_unstable = (props, ref) => {
  const { size: size2 = "medium", ...baseProps } = props;
  const baseState = useSliderBase_unstable(baseProps, ref);
  return {
    ...baseState,
    size: size2
  };
};
const useSliderBase_unstable = (props, ref) => {
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true
  });
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "onChange"
    ]
  });
  const {
    disabled,
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb
  } = props;
  const state = {
    disabled,
    vertical,
    components: {
      input: "input",
      rail: "div",
      root: "div",
      thumb: "div"
    },
    root: always(root, {
      defaultProps: nativeProps.root,
      elementType: "div"
    }),
    input: always(input, {
      defaultProps: {
        id: useId("slider-", props.id),
        ref,
        ...nativeProps.primary,
        type: "range",
        orient: vertical ? "vertical" : void 0
      },
      elementType: "input"
    }),
    rail: always(rail, {
      elementType: "div"
    }),
    thumb: always(thumb, {
      elementType: "div"
    })
  };
  if (state.input["aria-orientation"] === void 0) {
    state.input["aria-orientation"] = state.vertical ? "vertical" : "horizontal";
  }
  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin());
  useSliderState_unstable(state, props);
  return state;
};
const renderSlider_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      /* @__PURE__ */ jsx(state.input, {}),
      /* @__PURE__ */ jsx(state.rail, {}),
      /* @__PURE__ */ jsx(state.thumb, {})
    ]
  });
};
const sliderClassNames = {
  root: "fui-Slider",
  rail: "fui-Slider__rail",
  thumb: "fui-Slider__thumb",
  input: "fui-Slider__input"
};
const useRootStyles$3 = /* @__PURE__ */ __styles({
  root: {
    qhf8xq: "f10pi13n",
    mc9l5x: "fwk3njj",
    lpbzjs: "f1sdsnyy",
    Bt984gj: "f122n59",
    B7hvi0a: "f1oiokrs"
  },
  small: {
    Bi64ftq: "f1agqo6f",
    Bslxy2k: "f1mmvox9",
    Ba19x4e: "f1i7ztpd",
    sshi5w: "f1pha7fy"
  },
  medium: {
    Bi64ftq: "f1a78h9h",
    Bslxy2k: "fh1udnr",
    Ba19x4e: "fuok0yf",
    sshi5w: "f1nxs5xn"
  },
  horizontal: {
    Bf4jedk: "fyvtabn",
    wkccdc: "fgfd48t",
    Budl1dq: "f4t5rw1"
  },
  vertical: {
    sshi5w: "f1pzv1zu",
    wkccdc: "fktlcaf",
    Budl1dq: "fiadc6h"
  },
  enabled: {
    B7wi8oa: "f4l8x3l",
    B250r6j: "f671q34",
    Bpmy4es: "fvfzmw5",
    Buw9y6v: "faw1t00",
    Bq939m0: "fxdgx5",
    gjzr1t: "fii04fa",
    tg7hqu: "f36hzz8",
    qhf704: "fdjsfay",
    Blfvze: "f1fen33d",
    genz7u: "f1c6b0w1",
    Brgvh4e: "f1rq9b4z",
    Bsjyjqp: "f4xxiul"
  },
  disabled: {
    Bpmy4es: "foojseg",
    B7wi8oa: "f1lgdqhv",
    B250r6j: "f1veetlj",
    qhf704: "fn4acdm",
    Blfvze: "f4s8dx0",
    genz7u: "f1wil5xy"
  },
  focusIndicatorHorizontal: {
    Brovlpu: "ftqa4ok",
    B486eqv: "f2hkw1w",
    Bssx7fj: "f1b1k54r",
    uh7if5: ["f4ne723", "fqqcjud"],
    clntm0: "fh7aioi",
    Dlk2r6: ["fqqcjud", "f4ne723"],
    h6p2u: "f1ufm4qn",
    I6qiy5: ["f1qnwcb4", "fgrk5zm"],
    yzno9d: "fi52z01",
    By0wis0: ["fgrk5zm", "f1qnwcb4"],
    B2j2mmj: "ffht0p2",
    wigs8: "f1p0ul1q",
    pbfy6t: "f1c901ms",
    B0v4ure: "f1alokd7",
    Byrf0fs: 0,
    Bsiemmq: 0,
    Bwckmig: 0,
    skfxo0: 0,
    Iidy0u: 0,
    B98u21t: 0,
    Bvwlmkc: 0,
    jo1ztg: 0,
    Ba1iezr: 0,
    Blmvk6g: 0,
    B24cy0v: 0,
    Bil7v7r: 0,
    Br3gin4: 0,
    nr063g: 0,
    ghq09: 0,
    Bbgo44z: 0,
    Bseh09z: "fmj8fco",
    az1dzo: 0,
    Ba3ybja: 0,
    B6352mv: 0,
    vppk2z: 0,
    Biaj6j7: "f1iwowo3",
    B2pnrqr: "f1pffoy2",
    B29w5g4: ["f1dfga45", "f63jj3o"],
    Bhhzhcn: "fs6b7xr",
    Bec0n69: ["f63jj3o", "f1dfga45"]
  },
  focusIndicatorVertical: {
    Brovlpu: "ftqa4ok",
    B486eqv: "f2hkw1w",
    Bssx7fj: "f1b1k54r",
    uh7if5: ["f4ne723", "fqqcjud"],
    clntm0: "fh7aioi",
    Dlk2r6: ["fqqcjud", "f4ne723"],
    h6p2u: "f1ufm4qn",
    I6qiy5: ["f1qnwcb4", "fgrk5zm"],
    yzno9d: "fi52z01",
    By0wis0: ["fgrk5zm", "f1qnwcb4"],
    B2j2mmj: "ffht0p2",
    wigs8: "f1p0ul1q",
    pbfy6t: "f1c901ms",
    B0v4ure: "f1alokd7",
    Byrf0fs: 0,
    Bsiemmq: 0,
    Bwckmig: 0,
    skfxo0: 0,
    Iidy0u: 0,
    B98u21t: 0,
    Bvwlmkc: 0,
    jo1ztg: 0,
    Ba1iezr: 0,
    Blmvk6g: 0,
    B24cy0v: 0,
    Bil7v7r: 0,
    Br3gin4: 0,
    nr063g: 0,
    ghq09: 0,
    Bbgo44z: 0,
    Bseh09z: "fmj8fco",
    az1dzo: 0,
    Ba3ybja: 0,
    B6352mv: 0,
    vppk2z: 0,
    Biaj6j7: "f1iwowo3",
    B2pnrqr: "f1pffoy2",
    B29w5g4: ["fm5xmfm", "femsgmt"],
    Bhhzhcn: "fs6b7xr",
    Bec0n69: ["femsgmt", "fm5xmfm"]
  }
}, {
  d: [".f10pi13n{position:relative;}", ".fwk3njj{display:inline-grid;}", ".f1sdsnyy{touch-action:none;}", ".f122n59{align-items:center;}", ".f1oiokrs{justify-items:center;}", ".f1agqo6f{--fui-Slider__thumb--size:16px;}", ".f1mmvox9{--fui-Slider__inner-thumb--radius:5px;}", ".f1i7ztpd{--fui-Slider__rail--size:2px;}", ".f1pha7fy{min-height:24px;}", ".f1a78h9h{--fui-Slider__thumb--size:20px;}", ".fh1udnr{--fui-Slider__inner-thumb--radius:6px;}", ".fuok0yf{--fui-Slider__rail--size:4px;}", ".f1nxs5xn{min-height:32px;}", ".fyvtabn{min-width:120px;}", ".fgfd48t{grid-template-rows:1fr var(--fui-Slider__thumb--size) 1fr;}", ".f4t5rw1{grid-template-columns:1fr calc(100% - var(--fui-Slider__thumb--size)) 1fr;}", ".f1pzv1zu{min-height:120px;}", ".fktlcaf{grid-template-rows:1fr calc(100% - var(--fui-Slider__thumb--size)) 1fr;}", ".fiadc6h{grid-template-columns:1fr var(--fui-Slider__thumb--size) 1fr;}", ".f4l8x3l{--fui-Slider__rail--color:var(--colorNeutralStrokeAccessible);}", ".f671q34{--fui-Slider__progress--color:var(--colorCompoundBrandBackground);}", ".fvfzmw5{--fui-Slider__thumb--color:var(--colorCompoundBrandBackground);}", ".foojseg{--fui-Slider__thumb--color:var(--colorNeutralForegroundDisabled);}", ".f1lgdqhv{--fui-Slider__rail--color:var(--colorNeutralBackgroundDisabled);}", ".f1veetlj{--fui-Slider__progress--color:var(--colorNeutralForegroundDisabled);}", ".f1b1k54r[data-fui-focus-within]:focus-within{border-top-color:transparent;}", ".f4ne723[data-fui-focus-within]:focus-within{border-right-color:transparent;}", ".fqqcjud[data-fui-focus-within]:focus-within{border-left-color:transparent;}", ".fh7aioi[data-fui-focus-within]:focus-within{border-bottom-color:transparent;}", '.ffht0p2[data-fui-focus-within]:focus-within::after{content:"";}', ".f1p0ul1q[data-fui-focus-within]:focus-within::after{position:absolute;}", ".f1c901ms[data-fui-focus-within]:focus-within::after{pointer-events:none;}", ".f1alokd7[data-fui-focus-within]:focus-within::after{z-index:1;}", [".fmj8fco[data-fui-focus-within]:focus-within::after{border:2px solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".f1iwowo3[data-fui-focus-within]:focus-within::after{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".f1pffoy2[data-fui-focus-within]:focus-within::after{top:calc(0px - 2px - -2px);}", ".f1dfga45[data-fui-focus-within]:focus-within::after{right:calc(0px - 2px - -4px);}", ".f63jj3o[data-fui-focus-within]:focus-within::after{left:calc(0px - 2px - -4px);}", ".fs6b7xr[data-fui-focus-within]:focus-within::after{bottom:calc(0px - 2px - -2px);}", [".fmj8fco[data-fui-focus-within]:focus-within::after{border:2px solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".f1iwowo3[data-fui-focus-within]:focus-within::after{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fm5xmfm[data-fui-focus-within]:focus-within::after{right:calc(0px - 2px - 4px);}", ".femsgmt[data-fui-focus-within]:focus-within::after{left:calc(0px - 2px - 4px);}"],
  h: [".faw1t00:hover{--fui-Slider__thumb--color:var(--colorCompoundBrandBackgroundHover);}", ".fxdgx5:hover{--fui-Slider__progress--color:var(--colorCompoundBrandBackgroundHover);}"],
  a: [".fii04fa:active{--fui-Slider__thumb--color:var(--colorCompoundBrandBackgroundPressed);}", ".f36hzz8:active{--fui-Slider__progress--color:var(--colorCompoundBrandBackgroundPressed);}"],
  m: [["@media (forced-colors: active){.fdjsfay{--fui-Slider__rail--color:CanvasText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1fen33d{--fui-Slider__thumb--color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1c6b0w1{--fui-Slider__progress--color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1rq9b4z:hover{--fui-Slider__thumb--color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f4xxiul:hover{--fui-Slider__progress--color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fn4acdm{--fui-Slider__rail--color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f4s8dx0{--fui-Slider__thumb--color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1wil5xy{--fui-Slider__progress--color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ufm4qn[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1qnwcb4[data-fui-focus-within]:focus-within::after{border-right-color:Highlight;}.fgrk5zm[data-fui-focus-within]:focus-within::after{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fi52z01[data-fui-focus-within]:focus-within::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }]],
  f: [".ftqa4ok:focus{outline-style:none;}"],
  i: [".f2hkw1w:focus-visible{outline-style:none;}"]
});
const useRailStyles = /* @__PURE__ */ __styles({
  rail: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f1kijzfu",
    Bkecrkj: "f1aehjj5",
    Ijaq50: "faunodf",
    nk6f5a: "f88nxoq",
    Br312pm: "fd46tj4",
    Bw0ie65: "f1e2fz10",
    qhf8xq: "f10pi13n",
    Bvjb7m6: "fdgv6k0",
    Bcmaq0h: "fizngqt",
    Bpd4iqm: "fpvhumw",
    oeaueh: "f1yog68k",
    Bw0xxkn: "f13sgyd8",
    Ftih45: "fzhtfnv",
    Brfgrao: "f1j7ml58",
    Bbn5juq: "fx36ao7",
    Bses4cn: "fddlh2i"
  },
  horizontal: {
    a9b677: "fly5x3f",
    Bqenvij: "f1cy86ho",
    Fbdkly: ["f1heqfse", "fkh49vu"],
    mdwyqc: ["fkh49vu", "f1heqfse"],
    Baz25je: "f16tdq4e"
  },
  vertical: {
    a9b677: "fqxfnkd",
    Bqenvij: "f1l02sjl",
    Ccq8qp: "f1rik0od",
    Bciustq: "f14xwovp",
    lawp4y: "fdehrcx"
  }
}, {
  d: [[".f1kijzfu{border-radius:var(--borderRadiusXLarge);}", {
    p: -1
  }], ".f1aehjj5{pointer-events:none;}", ".faunodf{grid-row-start:2;}", ".f88nxoq{grid-row-end:2;}", ".fd46tj4{grid-column-start:2;}", ".f1e2fz10{grid-column-end:2;}", ".f10pi13n{position:relative;}", ".fdgv6k0{forced-color-adjust:none;}", ".fizngqt{background-image:linear-gradient(\n      var(--fui-Slider--direction),\n      var(--fui-Slider__progress--color) 0%,\n      var(--fui-Slider__progress--color) var(--fui-Slider--progress),\n      var(--fui-Slider__rail--color) var(--fui-Slider--progress)\n    );}", ".fpvhumw{outline-width:1px;}", ".f1yog68k{outline-style:solid;}", ".f13sgyd8{outline-color:var(--colorTransparentStroke);}", ".fzhtfnv::before{content:'';}", ".f1j7ml58::before{position:absolute;}", ".fx36ao7::before{background-image:repeating-linear-gradient(\n        var(--fui-Slider--direction),\n        #0000 0%,\n        #0000 calc(var(--fui-Slider--steps-percent) - 1px),\n        var(--colorNeutralBackground1) calc(var(--fui-Slider--steps-percent) - 1px),\n        var(--colorNeutralBackground1) var(--fui-Slider--steps-percent)\n      );}", ".fly5x3f{width:100%;}", ".f1cy86ho{height:var(--fui-Slider__rail--size);}", ".f1heqfse::before{left:-1px;}", ".fkh49vu::before{right:-1px;}", ".f16tdq4e::before{height:var(--fui-Slider__rail--size);}", ".fqxfnkd{width:var(--fui-Slider__rail--size);}", ".f1l02sjl{height:100%;}", ".f1rik0od::before{width:var(--fui-Slider__rail--size);}", ".f14xwovp::before{top:-1px;}", ".fdehrcx::before{bottom:-1px;}"],
  m: [["@media (forced-colors: active){.fddlh2i::before{background-image:repeating-linear-gradient(\n          var(--fui-Slider--direction),\n          #0000 0%,\n          #0000 calc(var(--fui-Slider--steps-percent) - 1px),\n          HighlightText calc(var(--fui-Slider--steps-percent) - 1px),\n          HighlightText var(--fui-Slider--steps-percent)\n        );}}", {
    m: "(forced-colors: active)"
  }]]
});
const useThumbStyles = /* @__PURE__ */ __styles({
  thumb: {
    B2lzsem: "ftx3jue",
    Ijaq50: "faunodf",
    nk6f5a: "f88nxoq",
    Br312pm: "fd46tj4",
    Bw0ie65: "f1e2fz10",
    qhf8xq: "f1euv43f",
    a9b677: "f174ca62",
    Bqenvij: "f1yfdkfd",
    Bkecrkj: "f1aehjj5",
    oeaueh: "f1s6fcnf",
    Bvjb7m6: "fdgv6k0",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f44lkw9",
    E5pizo: "fof7hq0",
    De3pzq: "foksa45",
    Brfgrao: "f1j7ml58",
    Bciustq: "f14u7mkt",
    Fbdkly: ["f5zrw40", "f1ks5ppg"],
    lawp4y: "fto0uou",
    mdwyqc: ["f1ks5ppg", "f5zrw40"],
    r59vdv: 0,
    Budzafs: 0,
    ck0cow: 0,
    n07z76: 0,
    Gng75u: "fielpny",
    Bcvre1j: "fyl8oag",
    Ftih45: "fzhtfnv",
    Bcgcnre: 0,
    Bqjgrrk: 0,
    qa3bma: 0,
    y0oebl: 0,
    Biqmznv: 0,
    Bm6vgfq: 0,
    Bbv0w2i: 0,
    uvfttm: 0,
    eqrjj: 0,
    Bk5zm6e: 0,
    m598lv: 0,
    B4f6apu: 0,
    ydt019: 0,
    Bq4z7u6: 0,
    Bdkvgpv: 0,
    B0qfbqy: 0,
    kj8mxx: "f1fsco4d"
  },
  disabled: {
    Bcgcnre: 0,
    Bqjgrrk: 0,
    qa3bma: 0,
    y0oebl: 0,
    Biqmznv: 0,
    Bm6vgfq: 0,
    Bbv0w2i: 0,
    uvfttm: 0,
    eqrjj: 0,
    Bk5zm6e: 0,
    m598lv: 0,
    B4f6apu: 0,
    ydt019: 0,
    Bq4z7u6: 0,
    Bdkvgpv: 0,
    B0qfbqy: 0,
    kj8mxx: "f1pv9hn4"
  },
  horizontal: {
    Bz10aip: ["f13gfj74", "f1nfknbn"],
    oyh7mz: ["foa2ioz", "fjmilum"]
  },
  vertical: {
    Bz10aip: "f5cv5a3",
    B5kzvoi: "f1k2fpdo"
  }
}, {
  d: [".ftx3jue{--fui-Slider__thumb--position:clamp(var(--fui-Slider__inner-thumb--radius), var(--fui-Slider--progress), calc(100% - var(--fui-Slider__inner-thumb--radius)));}", ".faunodf{grid-row-start:2;}", ".f88nxoq{grid-row-end:2;}", ".fd46tj4{grid-column-start:2;}", ".f1e2fz10{grid-column-end:2;}", ".f1euv43f{position:absolute;}", ".f174ca62{width:var(--fui-Slider__thumb--size);}", ".f1yfdkfd{height:var(--fui-Slider__thumb--size);}", ".f1aehjj5{pointer-events:none;}", ".f1s6fcnf{outline-style:none;}", ".fdgv6k0{forced-color-adjust:none;}", [".f44lkw9{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }], ".fof7hq0{box-shadow:0 0 0 calc(var(--fui-Slider__thumb--size) * .2) var(--colorNeutralBackground1) inset;}", ".foksa45{background-color:var(--fui-Slider__thumb--color);}", ".f1j7ml58::before{position:absolute;}", ".f14u7mkt::before{top:0px;}", ".f5zrw40::before{left:0px;}", ".f1ks5ppg::before{right:0px;}", ".fto0uou::before{bottom:0px;}", [".fielpny::before{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }], ".fyl8oag::before{box-sizing:border-box;}", ".fzhtfnv::before{content:'';}", [".f1fsco4d::before{border:calc(var(--fui-Slider__thumb--size) * .05) solid var(--colorNeutralStroke1);}", {
    p: -2
  }], [".f1pv9hn4::before{border:calc(var(--fui-Slider__thumb--size) * .05) solid var(--colorNeutralForegroundDisabled);}", {
    p: -2
  }], ".f13gfj74{transform:translateX(-50%);}", ".f1nfknbn{transform:translateX(50%);}", ".foa2ioz{left:var(--fui-Slider__thumb--position);}", ".fjmilum{right:var(--fui-Slider__thumb--position);}", ".f5cv5a3{transform:translateY(50%);}", ".f1k2fpdo{bottom:var(--fui-Slider__thumb--position);}"]
});
const useInputStyles$1 = /* @__PURE__ */ __styles({
  input: {
    Bceei9c: "f1k6fduh",
    abs64n: "fk73vx1",
    Ijaq50: "f16hsg94",
    nk6f5a: "f1nzqi2z",
    Br312pm: "fwpfdsa",
    Bw0ie65: "fuur7zz",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1mk8lai",
    jrapky: 0,
    Frg6f3: 0,
    t21cq0: 0,
    B6of3ja: 0,
    B74szlk: "f1s184ao"
  },
  disabled: {
    Bceei9c: "f158kwzp"
  },
  horizontal: {
    Bqenvij: "f1yfdkfd",
    a9b677: "fly5x3f"
  },
  vertical: {
    Bqenvij: "f1l02sjl",
    a9b677: "f174ca62",
    wtfg9d: "f135tqni",
    By3ymbm: ["f114o3fk", "f1o9w1zd"],
    B1e78rk: "f1jr0wcp"
  }
}, {
  d: [".f1k6fduh{cursor:pointer;}", ".fk73vx1{opacity:0;}", ".f16hsg94{grid-row-start:1;}", ".f1nzqi2z{grid-row-end:-1;}", ".fwpfdsa{grid-column-start:1;}", ".fuur7zz{grid-column-end:-1;}", [".f1mk8lai{padding:0;}", {
    p: -1
  }], [".f1s184ao{margin:0;}", {
    p: -1
  }], ".f158kwzp{cursor:default;}", ".f1yfdkfd{height:var(--fui-Slider__thumb--size);}", ".fly5x3f{width:100%;}", ".f1l02sjl{height:100%;}", ".f174ca62{width:var(--fui-Slider__thumb--size);}"],
  t: ["@supports (writing-mode: sideways-lr){.f135tqni{writing-mode:vertical-lr;}}", "@supports (writing-mode: sideways-lr){.f114o3fk{direction:rtl;}.f1o9w1zd{direction:ltr;}}", "@supports not (writing-mode: sideways-lr){.f1jr0wcp{-webkit-appearance:slider-vertical;}}"]
});
const useSliderStyles_unstable = (state) => {
  const rootStyles = useRootStyles$3();
  const railStyles = useRailStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles$1();
  const isVertical = state.vertical;
  state.root.className = mergeClasses(sliderClassNames.root, rootStyles.root, isVertical ? rootStyles.focusIndicatorVertical : rootStyles.focusIndicatorHorizontal, rootStyles[state.size], isVertical ? rootStyles.vertical : rootStyles.horizontal, state.disabled ? rootStyles.disabled : rootStyles.enabled, state.root.className);
  state.rail.className = mergeClasses(sliderClassNames.rail, railStyles.rail, isVertical ? railStyles.vertical : railStyles.horizontal, state.rail.className);
  state.thumb.className = mergeClasses(sliderClassNames.thumb, thumbStyles.thumb, isVertical ? thumbStyles.vertical : thumbStyles.horizontal, state.disabled && thumbStyles.disabled, state.thumb.className);
  state.input.className = mergeClasses(sliderClassNames.input, inputStyles.input, isVertical ? inputStyles.vertical : inputStyles.horizontal, state.disabled && inputStyles.disabled, state.input.className);
  return state;
};
const Slider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSlider_unstable(props, ref);
  useSliderStyles_unstable(state);
  useCustomStyleHook("useSliderStyles_unstable")(state);
  return renderSlider_unstable(state);
});
Slider.displayName = "Slider";
const clamp = (value, min2, max2) => {
  let nextValue = value;
  if (min2 !== void 0) {
    if (max2 !== void 0 && min2 > max2) {
      return value;
    }
    nextValue = Math.max(min2, nextValue);
  }
  if (max2 !== void 0) {
    nextValue = Math.min(max2, nextValue);
  }
  return nextValue;
};
const getBound = (value, min2, max2) => {
  if (min2 !== void 0 && value === min2) {
    if (max2 === min2) {
      return "both";
    }
    return "min";
  } else if (max2 !== void 0 && value === max2) {
    return "max";
  }
  return "none";
};
function calculatePrecision(value) {
  const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
  if (!groups) {
    return 0;
  }
  if (groups[1]) {
    return -groups[1].length;
  }
  if (groups[2]) {
    return groups[2].length;
  }
  return 0;
}
function precisionRound(value, precision, base = 10) {
  const exp = base ** precision;
  return Math.round(value * exp) / exp;
}
const DEFAULT_SPIN_DELAY_MS = 300;
const MIN_SPIN_DELAY_MS = 80;
const MAX_SPIN_TIME_MS = 1e3;
const lerp = (start, end, percent) => start + (end - start) * percent;
const useSpinButtonBase_unstable = (props, ref) => {
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true
  });
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "defaultValue",
      "max",
      "min",
      "onChange",
      "value"
    ]
  });
  const { value, displayValue, defaultValue, min: min2, max: max2, step = 1, stepPage = 1, precision: precisionFromProps, onChange, root, input, incrementButton, decrementButton } = props;
  const precision = reactExports.useMemo(() => {
    return precisionFromProps !== null && precisionFromProps !== void 0 ? precisionFromProps : Math.max(calculatePrecision(step), 0);
  }, [
    precisionFromProps,
    step
  ]);
  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: 0
  });
  const inputRef = reactExports.useRef(null);
  const isControlled = value !== void 0;
  const [textValue, setTextValue] = reactExports.useState(void 0);
  const [keyboardSpinState, setKeyboardSpinState] = reactExports.useState("rest");
  const internalState = reactExports.useRef({
    value: currentValue,
    spinState: "rest",
    spinTime: 0,
    spinDelay: DEFAULT_SPIN_DELAY_MS,
    atBound: currentValue !== null ? getBound(precisionRound(currentValue, precision), min2, max2) : "none"
  });
  const [setStepTimeout, clearStepTimeout] = useTimeout();
  const stepValue = (e, direction, startFrom) => {
    let startValue = internalState.current.value;
    if (startFrom) {
      const num = parseFloat(startFrom);
      if (!isNaN(num)) {
        startValue = num;
      }
    }
    const val = startValue;
    const dir = direction === "up" || direction === "upPage" ? 1 : -1;
    const stepSize = direction === "upPage" || direction === "downPage" ? stepPage : step;
    if (val === null) {
      const stepStart = min2 === void 0 ? 0 : min2;
      const nullStep = clamp(stepStart + stepSize * dir, min2, max2);
      commit(e, nullStep);
      return;
    }
    let newValue = val + stepSize * dir;
    if (!Number.isNaN(newValue)) {
      newValue = clamp(newValue, min2, max2);
    }
    commit(e, newValue);
    if (internalState.current.spinState !== "rest") {
      setStepTimeout(() => {
        internalState.current.spinTime += internalState.current.spinDelay;
        internalState.current.spinDelay = lerp(DEFAULT_SPIN_DELAY_MS, MIN_SPIN_DELAY_MS, internalState.current.spinTime / MAX_SPIN_TIME_MS);
        stepValue(e, direction);
      }, internalState.current.spinDelay);
    }
  };
  const handleInputChange = (e) => {
    if (!internalState.current.previousTextValue) {
      internalState.current.previousTextValue = textValue !== null && textValue !== void 0 ? textValue : String(currentValue);
    }
    const newValue = e.target.value;
    setTextValue(newValue);
    if (inputRef.current) {
      inputRef.current.ariaValueNow = newValue;
    }
  };
  const handleIncrementMouseDown = (e) => {
    commit(e, currentValue, textValue);
    internalState.current.spinState = "up";
    stepValue(e, "up");
  };
  const handleDecrementMouseDown = (e) => {
    commit(e, currentValue, textValue);
    internalState.current.spinState = "down";
    stepValue(e, "down");
  };
  const handleStepMouseUpOrLeave = (e) => {
    clearStepTimeout();
    internalState.current.spinState = "rest";
    internalState.current.spinDelay = DEFAULT_SPIN_DELAY_MS;
    internalState.current.spinTime = 0;
  };
  const handleBlur = (e) => {
    commit(e, currentValue, textValue);
    internalState.current.previousTextValue = void 0;
  };
  const handleKeyDown = (e) => {
    let nextKeyboardSpinState = "rest";
    if (e.currentTarget.readOnly) {
      return;
    }
    if (e.key === ArrowUp) {
      stepValue(e, "up", textValue);
      nextKeyboardSpinState = "up";
    } else if (e.key === ArrowDown) {
      stepValue(e, "down", textValue);
      nextKeyboardSpinState = "down";
    } else if (e.key === PageUp) {
      e.preventDefault();
      stepValue(e, "upPage", textValue);
      nextKeyboardSpinState = "up";
    } else if (e.key === PageDown) {
      e.preventDefault();
      stepValue(e, "downPage", textValue);
      nextKeyboardSpinState = "down";
    } else if (!e.shiftKey && e.key === Home && min2 !== void 0) {
      commit(e, min2);
      nextKeyboardSpinState = "down";
    } else if (!e.shiftKey && e.key === End && max2 !== void 0) {
      commit(e, max2);
      nextKeyboardSpinState = "up";
    } else if (e.key === Enter) {
      commit(e, currentValue, textValue);
      internalState.current.previousTextValue = void 0;
    } else if (e.key === Escape) {
      if (internalState.current.previousTextValue) {
        setTextValue(void 0);
        internalState.current.previousTextValue = void 0;
      }
    }
    if (keyboardSpinState !== nextKeyboardSpinState) {
      setKeyboardSpinState(nextKeyboardSpinState);
    }
  };
  const handleKeyUp = (e) => {
    if (keyboardSpinState !== "rest") {
      setKeyboardSpinState("rest");
      internalState.current.spinState = "rest";
    }
  };
  const commit = (e, newValue, newDisplayValue) => {
    const valueChanged = newValue !== void 0 && currentValue !== newValue;
    const displayValueChanged = newDisplayValue !== void 0 && internalState.current.previousTextValue !== void 0 && internalState.current.previousTextValue !== newDisplayValue;
    let roundedValue;
    if (valueChanged) {
      roundedValue = precisionRound(newValue, precision);
      setCurrentValue(roundedValue);
      internalState.current.value = roundedValue;
    } else if (displayValueChanged && !isControlled) {
      const nextValue = parseFloat(newDisplayValue);
      if (!isNaN(nextValue)) {
        setCurrentValue(precisionRound(nextValue, precision));
        internalState.current.value = precisionRound(nextValue, precision);
      }
    }
    if (valueChanged || displayValueChanged) {
      onChange === null || onChange === void 0 ? void 0 : onChange(e, {
        value: roundedValue,
        displayValue: newDisplayValue
      });
    }
    setTextValue(void 0);
  };
  let valueToDisplay;
  if (textValue !== void 0) {
    valueToDisplay = textValue;
  } else if (value === null || currentValue === null) {
    valueToDisplay = displayValue !== null && displayValue !== void 0 ? displayValue : "";
    internalState.current.value = null;
    internalState.current.atBound = "none";
  } else {
    const roundedValue = precisionRound(currentValue, precision);
    internalState.current.value = roundedValue;
    internalState.current.atBound = getBound(roundedValue, min2, max2);
    if (isControlled) {
      valueToDisplay = displayValue !== null && displayValue !== void 0 ? displayValue : String(roundedValue);
    } else {
      valueToDisplay = String(roundedValue);
    }
  }
  const state = {
    spinState: keyboardSpinState,
    // eslint-disable-next-line react-hooks/refs
    atBound: internalState.current.atBound,
    components: {
      root: "span",
      input: "input",
      incrementButton: "button",
      decrementButton: "button"
    },
    root: always(root, {
      defaultProps: nativeProps.root,
      elementType: "span"
    }),
    input: always(input, {
      defaultProps: {
        autoComplete: "off",
        role: "spinbutton",
        type: "text",
        ...nativeProps.primary
      },
      elementType: "input"
    }),
    incrementButton: always(incrementButton, {
      defaultProps: {
        tabIndex: -1,
        disabled: nativeProps.primary.readOnly || nativeProps.primary.disabled || // eslint-disable-next-line react-hooks/refs
        internalState.current.atBound === "max" || // eslint-disable-next-line react-hooks/refs
        internalState.current.atBound === "both",
        "aria-label": "Increment value",
        type: "button"
      },
      elementType: "button"
    }),
    decrementButton: always(decrementButton, {
      defaultProps: {
        tabIndex: -1,
        disabled: nativeProps.primary.readOnly || nativeProps.primary.disabled || // eslint-disable-next-line react-hooks/refs
        internalState.current.atBound === "min" || // eslint-disable-next-line react-hooks/refs
        internalState.current.atBound === "both",
        "aria-label": "Decrement value",
        type: "button"
      },
      elementType: "button"
    })
  };
  state.input.value = valueToDisplay;
  state.input.ref = useMergedRefs(inputRef, ref);
  state.input["aria-valuemin"] = min2;
  state.input["aria-valuemax"] = max2;
  var _internalState_current_value;
  state.input["aria-valuenow"] = (_internalState_current_value = internalState.current.value) !== null && _internalState_current_value !== void 0 ? _internalState_current_value : void 0;
  var _state_input_ariavaluetext;
  state.input["aria-valuetext"] = (_state_input_ariavaluetext = state.input["aria-valuetext"]) !== null && _state_input_ariavaluetext !== void 0 ? _state_input_ariavaluetext : value !== void 0 && displayValue || void 0;
  state.input.onChange = mergeCallbacks(state.input.onChange, handleInputChange);
  state.input.onInput = mergeCallbacks(state.input.onInput, handleInputChange);
  state.input.onBlur = mergeCallbacks(state.input.onBlur, handleBlur);
  state.input.onKeyDown = mergeCallbacks(state.input.onKeyDown, handleKeyDown);
  state.input.onKeyUp = mergeCallbacks(state.input.onKeyUp, handleKeyUp);
  state.incrementButton.onMouseDown = mergeCallbacks(handleIncrementMouseDown, state.incrementButton.onMouseDown);
  state.incrementButton.onMouseUp = mergeCallbacks(state.incrementButton.onMouseUp, handleStepMouseUpOrLeave);
  state.incrementButton.onMouseLeave = mergeCallbacks(state.incrementButton.onMouseLeave, handleStepMouseUpOrLeave);
  state.decrementButton.onMouseDown = mergeCallbacks(handleDecrementMouseDown, state.decrementButton.onMouseDown);
  state.decrementButton.onMouseUp = mergeCallbacks(state.decrementButton.onMouseUp, handleStepMouseUpOrLeave);
  state.decrementButton.onMouseLeave = mergeCallbacks(state.decrementButton.onMouseLeave, handleStepMouseUpOrLeave);
  return state;
};
const useSpinButton_unstable = (props, ref) => {
  var _state_incrementButton, _state_decrementButton;
  const overrides = useOverrides();
  var _overrides_inputDefaultAppearance;
  const { appearance = (_overrides_inputDefaultAppearance = overrides.inputDefaultAppearance) !== null && _overrides_inputDefaultAppearance !== void 0 ? _overrides_inputDefaultAppearance : "outline", size: size2 = "medium", ...baseProps } = props;
  const state = useSpinButtonBase_unstable(baseProps, ref);
  var _children;
  (_children = (_state_incrementButton = state.incrementButton).children) !== null && _children !== void 0 ? _children : _state_incrementButton.children = /* @__PURE__ */ reactExports.createElement(ChevronUp16Regular, null);
  var _children1;
  (_children1 = (_state_decrementButton = state.decrementButton).children) !== null && _children1 !== void 0 ? _children1 : _state_decrementButton.children = /* @__PURE__ */ reactExports.createElement(ChevronDown16Regular, null);
  return {
    ...state,
    appearance,
    size: size2
  };
};
const renderSpinButton_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      /* @__PURE__ */ jsx(state.input, {}),
      /* @__PURE__ */ jsx(state.incrementButton, {}),
      /* @__PURE__ */ jsx(state.decrementButton, {})
    ]
  });
};
const spinButtonClassNames = {
  root: "fui-SpinButton",
  input: "fui-SpinButton__input",
  incrementButton: "fui-SpinButton__incrementButton",
  decrementButton: "fui-SpinButton__decrementButton"
};
const spinButtonExtraClassNames = {
  buttonActive: "fui-SpinButton__button_active"
};
const useRootClassName = /* @__PURE__ */ __resetStyles("r109xulx", "r1h2jnch", {
  r: [".r109xulx{display:inline-grid;grid-template-columns:1fr 24px;grid-template-rows:1fr 1fr;column-gap:var(--spacingHorizontalXS);row-gap:0;position:relative;isolation:isolate;vertical-align:middle;background-color:var(--colorNeutralBackground1);min-height:32px;padding:0 0 0 var(--spacingHorizontalMNudge);border-radius:var(--borderRadiusMedium);}", '.r109xulx::before{content:"";box-sizing:border-box;position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:10;border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);border-radius:var(--borderRadiusMedium);}', '.r109xulx::after{box-sizing:border-box;content:"";position:absolute;right:0;bottom:0;left:0;z-index:20;height:max(2px, var(--borderRadiusMedium));border-bottom-left-radius:var(--borderRadiusMedium);border-bottom-right-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}', ".r109xulx:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}", ".r109xulx:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".r109xulx:focus-within{outline:2px solid transparent;}", ".r1h2jnch{display:inline-grid;grid-template-columns:1fr 24px;grid-template-rows:1fr 1fr;column-gap:var(--spacingHorizontalXS);row-gap:0;position:relative;isolation:isolate;vertical-align:middle;background-color:var(--colorNeutralBackground1);min-height:32px;padding:0 var(--spacingHorizontalMNudge) 0 0;border-radius:var(--borderRadiusMedium);}", '.r1h2jnch::before{content:"";box-sizing:border-box;position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none;z-index:10;border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);border-radius:var(--borderRadiusMedium);}', '.r1h2jnch::after{box-sizing:border-box;content:"";position:absolute;left:0;bottom:0;right:0;z-index:20;height:max(2px, var(--borderRadiusMedium));border-bottom-right-radius:var(--borderRadiusMedium);border-bottom-left-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}', ".r1h2jnch:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}", ".r1h2jnch:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".r1h2jnch:focus-within{outline:2px solid transparent;}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.r109xulx::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r109xulx:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r1h2jnch::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r1h2jnch:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}"]
});
const useRootStyles$2 = /* @__PURE__ */ __styles({
  small: {
    sshi5w: "f1pha7fy",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm",
    uwmqm3: ["f1f5gg8d", "f1vdfbxk"]
  },
  medium: {},
  outline: {},
  outlineInteractive: {
    Bo3r8zu: "f1w2y1rc",
    Hpvxnh: ["f1gofhvl", "f18htlvq"],
    Bx11ytk: "ffcnd28",
    B1rg0w0: ["f18htlvq", "f1gofhvl"],
    Bsg1tlv: "f6lmxco",
    Brjw370: ["fcoc0mf", "f15r4wkl"],
    xcfy85: "f1ipdth8",
    Bcc6kan: ["f15r4wkl", "fcoc0mf"]
  },
  underline: {
    B0qfbqy: "f1o236ok",
    B4f6apu: ["faeg28l", "f64aojp"],
    y0oebl: "fdw6hkg",
    uvfttm: ["f64aojp", "faeg28l"],
    r59vdv: 0,
    Budzafs: 0,
    ck0cow: 0,
    n07z76: 0,
    Gng75u: "f1xyh2jw"
  },
  underlineInteractive: {
    Bx11ytk: "ffcnd28",
    xcfy85: "f1ipdth8",
    d9w3h3: 0,
    B3778ie: 0,
    B4j8arr: 0,
    Bl18szs: 0,
    Blrzh8d: "fkp7w9h"
  },
  filled: {
    Bcgcnre: 0,
    Bqjgrrk: 0,
    qa3bma: 0,
    y0oebl: 0,
    Biqmznv: 0,
    Bm6vgfq: 0,
    Bbv0w2i: 0,
    uvfttm: 0,
    eqrjj: 0,
    Bk5zm6e: 0,
    m598lv: 0,
    B4f6apu: 0,
    ydt019: 0,
    Bq4z7u6: 0,
    Bdkvgpv: 0,
    B0qfbqy: 0,
    kj8mxx: "f1kc0wz4"
  },
  "filled-darker": {
    De3pzq: "f16xq7d1"
  },
  "filled-lighter": {
    De3pzq: "fxugw4r"
  },
  filledInteractive: {
    B05mzqr: "f1xqt08",
    tb9y6h: ["fzt5lgo", "f8tv3r9"],
    jcehpj: "fyhrops",
    B23o0hn: ["f8tv3r9", "fzt5lgo"]
  },
  invalid: {
    emecyz: "fl48pg9",
    lz0pba: ["f1a168p3", "f1pvdymy"],
    Bo1k74p: "f11knvgl",
    Ba322q7: ["f1pvdymy", "f1a168p3"]
  },
  disabled: {
    Bceei9c: "fdrzuqr",
    De3pzq: "f1c21dwh",
    Bq4z7u6: "f1a0lfh7",
    Bk5zm6e: ["f1p2ejm6", "fmzytvz"],
    Bqjgrrk: "fas2e61",
    Bm6vgfq: ["fmzytvz", "f1p2ejm6"],
    Bvljrlq: "f1p5b8em",
    Cqojjj: ["fs6f9xf", "f11b7h5x"],
    G3zxag: "f1vrn6tw",
    H8270r: ["f11b7h5x", "fs6f9xf"]
  }
}, {
  d: [".f1pha7fy{min-height:24px;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1f5gg8d{padding-left:var(--spacingHorizontalS);}", ".f1vdfbxk{padding-right:var(--spacingHorizontalS);}", ".f1o236ok::before{border-top-width:0;}", ".faeg28l::before{border-right-width:0;}", ".f64aojp::before{border-left-width:0;}", ".fdw6hkg::before{border-bottom-width:1px;}", [".f1xyh2jw::before{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], [".fkp7w9h::after{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], [".f1kc0wz4::before{border:1px solid var(--colorTransparentStroke);}", {
    p: -2
  }], ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".fl48pg9:not(:focus-within)::before,.fl48pg9:hover:not(:focus-within)::before{border-top-color:var(--colorPaletteRedBorder2);}", ".f1a168p3:not(:focus-within)::before,.f1a168p3:hover:not(:focus-within)::before{border-right-color:var(--colorPaletteRedBorder2);}", ".f1pvdymy:not(:focus-within)::before,.f1pvdymy:hover:not(:focus-within)::before{border-left-color:var(--colorPaletteRedBorder2);}", ".f11knvgl:not(:focus-within)::before,.f11knvgl:hover:not(:focus-within)::before{border-bottom-color:var(--colorPaletteRedBorder2);}", ".fdrzuqr{cursor:not-allowed;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1a0lfh7::before{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1p2ejm6::before{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fmzytvz::before{border-left-color:var(--colorNeutralStrokeDisabled);}", ".fas2e61::before{border-bottom-color:var(--colorNeutralStrokeDisabled);}"],
  h: [".f1w2y1rc:hover::before{border-top-color:var(--colorNeutralStroke1Hover);}", ".f1gofhvl:hover::before{border-right-color:var(--colorNeutralStroke1Hover);}", ".f18htlvq:hover::before{border-left-color:var(--colorNeutralStroke1Hover);}", ".ffcnd28:hover::before{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}", ".f1xqt08:hover::before,.f1xqt08:focus-within::before{border-top-color:var(--colorTransparentStrokeInteractive);}", ".fzt5lgo:hover::before,.fzt5lgo:focus-within::before{border-right-color:var(--colorTransparentStrokeInteractive);}", ".f8tv3r9:hover::before,.f8tv3r9:focus-within::before{border-left-color:var(--colorTransparentStrokeInteractive);}", ".fyhrops:hover::before,.fyhrops:focus-within::before{border-bottom-color:var(--colorTransparentStrokeInteractive);}"],
  a: [".f6lmxco:active::before,.f6lmxco:focus-within::before{border-top-color:var(--colorNeutralStroke1Pressed);}", ".fcoc0mf:active::before,.fcoc0mf:focus-within::before{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f15r4wkl:active::before,.f15r4wkl:focus-within::before{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1ipdth8:active::before,.f1ipdth8:focus-within::before{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"],
  m: [["@media (forced-colors: active){.f1p5b8em::before{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f11b7h5x::before{border-left-color:GrayText;}.fs6f9xf::before{border-right-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1vrn6tw::before{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useInputClassName = /* @__PURE__ */ __resetStyles("r1ljrqje", null, [".r1ljrqje{grid-column-start:1;grid-column-end:2;grid-row-start:1;grid-row-end:3;outline-style:none;border:0;padding:0;color:var(--colorNeutralForeground1);background-color:transparent;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;width:100%;}", ".r1ljrqje::-webkit-input-placeholder{color:var(--colorNeutralForeground4);opacity:1;}", ".r1ljrqje::-moz-placeholder{color:var(--colorNeutralForeground4);opacity:1;}", ".r1ljrqje::placeholder{color:var(--colorNeutralForeground4);opacity:1;}"]);
const useInputStyles = /* @__PURE__ */ __styles({
  disabled: {
    sj55zd: "f1s2aq7o",
    Bceei9c: "fdrzuqr",
    De3pzq: "f1c21dwh",
    yvdlaj: "fahhnxm"
  }
}, {
  d: [".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}"]
});
const useBaseButtonClassName = /* @__PURE__ */ __resetStyles("r1g4chgs", null, [".r1g4chgs{display:inline-flex;width:24px;align-items:center;justify-content:center;border:0;position:absolute;outline-style:none;height:16px;background-color:transparent;color:var(--colorNeutralForeground3);grid-column-start:2;border-radius:0;padding:0 5px 0 5px;}", ".r1g4chgs:active{outline-style:none;}", ".r1g4chgs:enabled:hover{cursor:pointer;color:var(--colorNeutralForeground3Hover);background-color:var(--colorSubtleBackgroundHover);}", ".r1g4chgs:enabled:active{color:var(--colorNeutralForeground3Pressed);background-color:var(--colorSubtleBackgroundPressed);}", ".r1g4chgs:enabled.fui-SpinButton__button_active{color:var(--colorNeutralForeground3Pressed);background-color:var(--colorSubtleBackgroundPressed);}", ".r1g4chgs:disabled{cursor:not-allowed;color:var(--colorNeutralForegroundDisabled);}"]);
const useButtonStyles = /* @__PURE__ */ __styles({
  increment: {
    Ijaq50: "f16hsg94",
    B7oj6ja: ["f1jar5jt", "fyu767a"],
    z8tnut: "f10ra9hq",
    Byoj8tv: "f1brlhvm"
  },
  decrement: {
    Ijaq50: "faunodf",
    Bbmb7ep: ["f1aa9q02", "f16jpd5f"],
    z8tnut: "f1sl3k7w",
    Byoj8tv: "f1y2xyjm"
  },
  incrementButtonSmall: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["f4lv8q1", "fm3uwd2"],
    Bqenvij: "fvblgha"
  },
  decrementButtonSmall: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: ["f1q86st8", "frkrfqj"],
    Bqenvij: "fvblgha"
  },
  outline: {},
  underline: {
    De3pzq: "f3rmtva",
    sj55zd: "f11d4kpn",
    r4wkhp: "f1no7wuu",
    B95qlz1: "f1bifk9c",
    p743kt: "fp1zg4s",
    B7xitij: "fo6hitd",
    B6siaa6: "f1wiab75",
    Ba9qmo4: "fj9zm5z",
    Dyrjrp: "f1cqwcg4"
  },
  "filled-darker": {
    De3pzq: "f3rmtva",
    sj55zd: "f11d4kpn",
    r4wkhp: "f1no7wuu",
    B95qlz1: "fwwxidx",
    p743kt: "fp1zg4s",
    B7xitij: "f14i52sd",
    B6siaa6: "f1wiab75",
    Ba9qmo4: "fwry2ka",
    Dyrjrp: "f1cqwcg4"
  },
  "filled-lighter": {
    De3pzq: "f3rmtva",
    sj55zd: "f11d4kpn",
    r4wkhp: "f1no7wuu",
    B95qlz1: "f1yywxnv",
    drw0cw: "fzaa11h",
    idzz8t: "f4fpmm9",
    Dyrjrp: "f1cqwcg4"
  }
}, {
  d: [".f16hsg94{grid-row-start:1;}", ".f1jar5jt{border-top-right-radius:var(--borderRadiusMedium);}", ".fyu767a{border-top-left-radius:var(--borderRadiusMedium);}", ".f10ra9hq{padding-top:4px;}", ".f1brlhvm{padding-bottom:1px;}", ".faunodf{grid-row-start:2;}", ".f1aa9q02{border-bottom-right-radius:var(--borderRadiusMedium);}", ".f16jpd5f{border-bottom-left-radius:var(--borderRadiusMedium);}", ".f1sl3k7w{padding-top:1px;}", ".f1y2xyjm{padding-bottom:4px;}", [".f4lv8q1{padding:3px 6px 0px 4px;}", {
    p: -1
  }], [".fm3uwd2{padding:3px 4px 0px 6px;}", {
    p: -1
  }], ".fvblgha{height:12px;}", [".f1q86st8{padding:0px 6px 3px 4px;}", {
    p: -1
  }], [".frkrfqj{padding:0px 4px 3px 6px;}", {
    p: -1
  }], ".f3rmtva{background-color:transparent;}", ".f11d4kpn{color:var(--colorNeutralForeground3);}", ".f1no7wuu:enabled:hover{color:var(--colorNeutralForeground3Hover);}", ".f1bifk9c:enabled:hover{background-color:var(--colorSubtleBackgroundHover);}", ".fp1zg4s:enabled:active{color:var(--colorNeutralForeground3Pressed);}", ".fo6hitd:enabled:active{background-color:var(--colorSubtleBackgroundPressed);}", ".f1wiab75:enabled.fui-SpinButton__button_active{color:var(--colorNeutralForeground3Pressed);}", ".fj9zm5z:enabled.fui-SpinButton__button_active{background-color:var(--colorSubtleBackgroundPressed);}", ".f1cqwcg4:disabled{color:var(--colorNeutralForegroundDisabled);}", ".fwwxidx:enabled:hover{background-color:var(--colorNeutralBackground3Hover);}", ".f14i52sd:enabled:active{background-color:var(--colorNeutralBackground3Pressed);}", ".fwry2ka:enabled.fui-SpinButton__button_active{background-color:var(--colorNeutralBackground3Pressed);}", ".f1yywxnv:enabled:hover{background-color:var(--colorNeutralBackground1Hover);}", ".fzaa11h:enabled:active,.fzaa11h:enabled.fui-SpinButton__button_active{color:var(--colorNeutralForeground3Pressed);}", ".f4fpmm9:enabled:active,.f4fpmm9:enabled.fui-SpinButton__button_active{background-color:var(--colorNeutralBackground1Pressed);}"]
});
const useSpinButtonStyles_unstable = (state) => {
  const {
    appearance,
    spinState,
    size: size2
  } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input["aria-invalid"]}` === "true";
  const filled = appearance.startsWith("filled");
  const rootStyles = useRootStyles$2();
  const buttonStyles = useButtonStyles();
  const inputStyles = useInputStyles();
  state.root.className = mergeClasses(spinButtonClassNames.root, useRootClassName(), rootStyles[size2], rootStyles[appearance], filled && rootStyles.filled, !disabled && appearance === "outline" && rootStyles.outlineInteractive, !disabled && appearance === "underline" && rootStyles.underlineInteractive, !disabled && filled && rootStyles.filledInteractive, !disabled && invalid && rootStyles.invalid, disabled && rootStyles.disabled, state.root.className);
  state.incrementButton.className = mergeClasses(spinButtonClassNames.incrementButton, spinState === "up" && `${spinButtonExtraClassNames.buttonActive}`, useBaseButtonClassName(), buttonStyles.increment, buttonStyles[appearance], size2 === "small" && buttonStyles.incrementButtonSmall, state.incrementButton.className);
  state.decrementButton.className = mergeClasses(spinButtonClassNames.decrementButton, spinState === "down" && `${spinButtonExtraClassNames.buttonActive}`, useBaseButtonClassName(), buttonStyles.decrement, buttonStyles[appearance], size2 === "small" && buttonStyles.decrementButtonSmall, state.decrementButton.className);
  state.input.className = mergeClasses(spinButtonClassNames.input, useInputClassName(), disabled && inputStyles.disabled, state.input.className);
  return state;
};
const SpinButton = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSpinButton_unstable(props, ref);
  useSpinButtonStyles_unstable(state);
  useCustomStyleHook("useSpinButtonStyles_unstable")(state);
  return renderSpinButton_unstable(state);
});
SpinButton.displayName = "SpinButton";
const SpinnerContext = reactExports.createContext(void 0);
const SpinnerContextDefaultValue = {};
SpinnerContext.Provider;
const useSpinnerContext = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(SpinnerContext)) !== null && _React_useContext !== void 0 ? _React_useContext : SpinnerContextDefaultValue;
};
const useSpinner_unstable = (props, ref) => {
  const { size: contextSize } = useSpinnerContext();
  const { appearance = "primary", size: size2 = contextSize !== null && contextSize !== void 0 ? contextSize : "medium", ...baseProps } = props;
  const baseState = useSpinnerBase_unstable(baseProps, ref);
  return {
    ...baseState,
    appearance,
    size: size2,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      label: Label
    },
    label: optional(props.label, {
      defaultProps: baseState.label,
      elementType: Label
    })
  };
};
const useSpinnerBase_unstable = (props, ref) => {
  const { delay = 0, labelPosition = "after" } = props;
  const baseId = useId("spinner");
  const { role = "progressbar", ...rest } = props;
  const nativeRoot = always(getIntrinsicElementProps("div", {
    // FIXME:
    // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
    // but since it would be a breaking change to fix it, we are casting ref to it's proper type
    ref,
    role,
    ...rest
  }), {
    elementType: "div"
  });
  const [isShownAfterDelay, setIsShownAfterDelay] = reactExports.useState(false);
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();
  reactExports.useEffect(() => {
    if (delay <= 0) {
      return;
    }
    setDelayTimeout(() => {
      setIsShownAfterDelay(true);
    }, delay);
    return () => {
      clearDelayTimeout();
    };
  }, [
    setDelayTimeout,
    clearDelayTimeout,
    delay
  ]);
  const labelShorthand = optional(props.label, {
    defaultProps: {
      id: baseId
    },
    renderByDefault: false,
    elementType: "label"
  });
  const spinnerShortHand = optional(props.spinner, {
    renderByDefault: true,
    elementType: "span"
  });
  if (labelShorthand && nativeRoot && !nativeRoot["aria-labelledby"]) {
    nativeRoot["aria-labelledby"] = labelShorthand.id;
  }
  const state = {
    delay,
    labelPosition,
    shouldRenderSpinner: !delay || isShownAfterDelay,
    components: {
      root: "div",
      spinner: "span",
      spinnerTail: "span",
      label: "label"
    },
    root: nativeRoot,
    spinner: spinnerShortHand,
    spinnerTail: always(props.spinnerTail, {
      elementType: "span"
    }),
    label: labelShorthand
  };
  return state;
};
const renderSpinner_unstable = (state) => {
  const { labelPosition, shouldRenderSpinner } = state;
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.label && shouldRenderSpinner && (labelPosition === "above" || labelPosition === "before") && /* @__PURE__ */ jsx(state.label, {}),
      state.spinner && shouldRenderSpinner && /* @__PURE__ */ jsx(state.spinner, {
        children: state.spinnerTail && /* @__PURE__ */ jsx(state.spinnerTail, {})
      }),
      state.label && shouldRenderSpinner && (labelPosition === "below" || labelPosition === "after") && /* @__PURE__ */ jsx(state.label, {})
    ]
  });
};
const spinnerClassNames = {
  root: "fui-Spinner",
  spinner: "fui-Spinner__spinner",
  spinnerTail: "fui-Spinner__spinnerTail",
  label: "fui-Spinner__label"
};
const useRootBaseClassName = /* @__PURE__ */ __resetStyles("rpp59a7", null, [".rpp59a7{display:flex;align-items:center;justify-content:center;line-height:0;gap:8px;overflow:hidden;min-width:min-content;}"]);
const useRootStyles$1 = /* @__PURE__ */ __styles({
  vertical: {
    Beiy3e4: "f1vx9l62"
  }
}, {
  d: [".f1vx9l62{flex-direction:column;}"]
});
const useSpinnerBaseClassName = /* @__PURE__ */ __resetStyles("rvgcg50", "r15nd2jo", {
  r: [".rvgcg50{position:relative;flex-shrink:0;-webkit-mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);background-color:var(--colorBrandStroke2Contrast);color:var(--colorBrandStroke1);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-name:rb7n1on;}", "@keyframes rb7n1on{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}", ".r15nd2jo{position:relative;flex-shrink:0;-webkit-mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);mask-image:radial-gradient(closest-side, transparent calc(100% - var(--fui-Spinner--strokeWidth) - 1px), white calc(100% - var(--fui-Spinner--strokeWidth)) calc(100% - 1px), transparent 100%);background-color:var(--colorBrandStroke2Contrast);color:var(--colorBrandStroke1);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;animation-name:r1gx3jof;}", "@keyframes r1gx3jof{0%{transform:rotate(0deg);}100%{transform:rotate(-360deg);}}"],
  s: ["@media screen and (forced-colors: active){.rvgcg50{background-color:HighlightText;color:Highlight;forced-color-adjust:none;}}", "@media screen and (prefers-reduced-motion: reduce){.rvgcg50{animation-duration:1.8s;}}", "@media screen and (forced-colors: active){.r15nd2jo{background-color:HighlightText;color:Highlight;forced-color-adjust:none;}}", "@media screen and (prefers-reduced-motion: reduce){.r15nd2jo{animation-duration:1.8s;}}"]
});
const useSpinnerTailBaseClassName = /* @__PURE__ */ __resetStyles("rxov3xa", "r1o544mv", {
  r: [".rxov3xa{position:absolute;display:block;width:100%;height:100%;-webkit-mask-image:conic-gradient(transparent 105deg, white 105deg);mask-image:conic-gradient(transparent 105deg, white 105deg);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:var(--curveEasyEase);animation-name:r15mim6k;}", '.rxov3xa::before,.rxov3xa::after{content:"";position:absolute;display:block;width:100%;height:100%;animation:inherit;background-image:conic-gradient(currentcolor 135deg, transparent 135deg);}', "@keyframes r15mim6k{0%{transform:rotate(-135deg);}50%{transform:rotate(0deg);}100%{transform:rotate(225deg);}}", ".rxov3xa::before{animation-name:r18vhmn8;}", "@keyframes r18vhmn8{0%{transform:rotate(0deg);}50%{transform:rotate(105deg);}100%{transform:rotate(0deg);}}", ".rxov3xa::after{animation-name:rkgrvoi;}", "@keyframes rkgrvoi{0%{transform:rotate(0deg);}50%{transform:rotate(225deg);}100%{transform:rotate(0deg);}}", ".r1o544mv{position:absolute;display:block;width:100%;height:100%;-webkit-mask-image:conic-gradient(transparent 105deg, white 105deg);mask-image:conic-gradient(transparent 105deg, white 105deg);animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:var(--curveEasyEase);animation-name:r109gmi5;}", '.r1o544mv::before,.r1o544mv::after{content:"";position:absolute;display:block;width:100%;height:100%;animation:inherit;background-image:conic-gradient(currentcolor 135deg, transparent 135deg);}', "@keyframes r109gmi5{0%{transform:rotate(135deg);}50%{transform:rotate(0deg);}100%{transform:rotate(-225deg);}}", ".r1o544mv::before{animation-name:r17whflh;}", "@keyframes r17whflh{0%{transform:rotate(0deg);}50%{transform:rotate(-105deg);}100%{transform:rotate(0deg);}}", ".r1o544mv::after{animation-name:re4odhl;}", "@keyframes re4odhl{0%{transform:rotate(0deg);}50%{transform:rotate(-225deg);}100%{transform:rotate(0deg);}}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.rxov3xa{animation-iteration-count:0;background-image:conic-gradient(transparent 120deg, currentcolor 360deg);}.rxov3xa::before,.rxov3xa::after{content:none;}}", "@media screen and (prefers-reduced-motion: reduce){.r1o544mv{animation-iteration-count:0;background-image:conic-gradient(transparent 120deg, currentcolor 360deg);}.r1o544mv::before,.r1o544mv::after{content:none;}}"]
});
const useSpinnerStyles = /* @__PURE__ */ __styles({
  inverted: {
    De3pzq: "fr407j0",
    sj55zd: "f1f7voed"
  },
  rtlTail: {
    btxmck: "f179dep3",
    gb5jj2: "fbz9ihp",
    Bdya8wy: "f1pme1qz"
  },
  "extra-tiny": {
    Bqenvij: "fd461yt",
    a9b677: "fjw5fx7",
    qmp6fs: "f1v3ph3m"
  },
  tiny: {
    Bqenvij: "fjamq6b",
    a9b677: "f64fuq3",
    qmp6fs: "f1v3ph3m"
  },
  "extra-small": {
    Bqenvij: "frvgh55",
    a9b677: "fq4mcun",
    qmp6fs: "f1v3ph3m"
  },
  small: {
    Bqenvij: "fxldao9",
    a9b677: "f1w9dchk",
    qmp6fs: "f1v3ph3m"
  },
  medium: {
    Bqenvij: "f1d2rq10",
    a9b677: "f1szoe96",
    qmp6fs: "fb52u90"
  },
  large: {
    Bqenvij: "f8ljn23",
    a9b677: "fpdz1er",
    qmp6fs: "fb52u90"
  },
  "extra-large": {
    Bqenvij: "fbhnoac",
    a9b677: "feqmc2u",
    qmp6fs: "fb52u90"
  },
  huge: {
    Bqenvij: "f1ft4266",
    a9b677: "fksc0bp",
    qmp6fs: "fa3u9ii"
  }
}, {
  d: [".fr407j0{background-color:var(--colorNeutralStrokeAlpha2);}", ".f1f7voed{color:var(--colorNeutralStrokeOnBrand2);}", ".f179dep3{-webkit-mask-image:conic-gradient(white 255deg, transparent 255deg);mask-image:conic-gradient(white 255deg, transparent 255deg);}", ".fbz9ihp::before,.fbz9ihp::after{background-image:conic-gradient(transparent 225deg, currentcolor 225deg);}", ".fd461yt{height:16px;}", ".fjw5fx7{width:16px;}", ".f1v3ph3m{--fui-Spinner--strokeWidth:var(--strokeWidthThick);}", ".fjamq6b{height:20px;}", ".f64fuq3{width:20px;}", ".frvgh55{height:24px;}", ".fq4mcun{width:24px;}", ".fxldao9{height:28px;}", ".f1w9dchk{width:28px;}", ".f1d2rq10{height:32px;}", ".f1szoe96{width:32px;}", ".fb52u90{--fui-Spinner--strokeWidth:var(--strokeWidthThicker);}", ".f8ljn23{height:36px;}", ".fpdz1er{width:36px;}", ".fbhnoac{height:40px;}", ".feqmc2u{width:40px;}", ".f1ft4266{height:44px;}", ".fksc0bp{width:44px;}", ".fa3u9ii{--fui-Spinner--strokeWidth:var(--strokeWidthThickest);}"],
  m: [["@media screen and (prefers-reduced-motion: reduce){.f1pme1qz{background-image:conic-gradient(currentcolor 0deg, transparent 240deg);}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }]]
});
const useLabelStyles = /* @__PURE__ */ __styles({
  inverted: {
    sj55zd: "fonrgv7"
  },
  "extra-tiny": {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi"
  },
  tiny: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi"
  },
  "extra-small": {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi"
  },
  small: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi"
  },
  medium: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "faaz57k"
  },
  large: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "faaz57k"
  },
  "extra-large": {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "faaz57k"
  },
  huge: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "f1pp30po",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "f106mvju"
  }
}, {
  d: [".fonrgv7{color:var(--colorNeutralForegroundStaticInverted);}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f106mvju{line-height:var(--lineHeightBase500);}"]
});
const useSpinnerStyles_unstable = (state) => {
  const {
    labelPosition,
    size: size2,
    appearance
  } = state;
  const {
    dir
  } = useFluent();
  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles$1();
  const spinnerBaseClassName = useSpinnerBaseClassName();
  const spinnerStyles = useSpinnerStyles();
  const spinnerTailBaseClassName = useSpinnerTailBaseClassName();
  const labelStyles = useLabelStyles();
  state.root.className = mergeClasses(spinnerClassNames.root, rootBaseClassName, (labelPosition === "above" || labelPosition === "below") && rootStyles.vertical, state.root.className);
  if (state.spinner) {
    state.spinner.className = mergeClasses(spinnerClassNames.spinner, spinnerBaseClassName, spinnerStyles[size2], appearance === "inverted" && spinnerStyles.inverted, state.spinner.className);
  }
  if (state.spinnerTail) {
    state.spinnerTail.className = mergeClasses(spinnerClassNames.spinnerTail, spinnerTailBaseClassName, dir === "rtl" && spinnerStyles.rtlTail, state.spinnerTail.className);
  }
  if (state.label) {
    state.label.className = mergeClasses(spinnerClassNames.label, labelStyles[size2], appearance === "inverted" && labelStyles.inverted, state.label.className);
  }
  return state;
};
const Spinner = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSpinner_unstable(props, ref);
  useSpinnerStyles_unstable(state);
  useCustomStyleHook("useSpinnerStyles_unstable")(state);
  return renderSpinner_unstable(state);
});
Spinner.displayName = "Spinner";
const renderTextarea_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: /* @__PURE__ */ jsx(state.textarea, {})
  });
};
const useTextarea_unstable = (props, ref) => {
  const overrides = useOverrides();
  const fieldContext = useFieldContext_unstable();
  var _fieldContext_size, _overrides_inputDefaultAppearance;
  const { size: size2 = (_fieldContext_size = fieldContext === null || fieldContext === void 0 ? void 0 : fieldContext.size) !== null && _fieldContext_size !== void 0 ? _fieldContext_size : "medium", appearance = (_overrides_inputDefaultAppearance = overrides.inputDefaultAppearance) !== null && _overrides_inputDefaultAppearance !== void 0 ? _overrides_inputDefaultAppearance : "outline", ...baseProps } = props;
  const baseState = useTextareaBase_unstable(baseProps, ref);
  return {
    ...baseState,
    size: size2,
    appearance
  };
};
const useTextareaBase_unstable = (props, ref) => {
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true
  });
  const { resize = "none", onChange } = props;
  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: void 0
  });
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "textarea",
    excludedPropNames: [
      "onChange",
      "value",
      "defaultValue"
    ]
  });
  const state = {
    resize,
    components: {
      root: "span",
      textarea: "textarea"
    },
    textarea: always(props.textarea, {
      defaultProps: {
        ref,
        ...nativeProps.primary
      },
      elementType: "textarea"
    }),
    root: always(props.root, {
      defaultProps: nativeProps.root,
      elementType: "span"
    })
  };
  state.textarea.value = value;
  state.textarea.onChange = useEventCallback((ev) => {
    const newValue = ev.target.value;
    onChange === null || onChange === void 0 ? void 0 : onChange(ev, {
      value: newValue
    });
    setValue(newValue);
  });
  return state;
};
const textareaClassNames = {
  root: "fui-Textarea",
  textarea: "fui-Textarea__textarea"
};
const useRootStyles = /* @__PURE__ */ __styles({
  base: {
    mc9l5x: "ftuwxu6",
    B7ck84d: "f1ewtqcl",
    qhf8xq: "f10pi13n",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1yiegib",
    jrapky: 0,
    Frg6f3: 0,
    t21cq0: 0,
    B6of3ja: 0,
    B74szlk: "f1s184ao",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    ha4doy: "f12kltsn"
  },
  disabled: {
    De3pzq: "f1c21dwh",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "ff3nzm7",
    Bcq6wej: "f9dbb4x",
    Jcjdmf: ["f3qs60o", "f5u9ap2"],
    sc4o1m: "fwd1oij",
    Bosien3: ["f5u9ap2", "f3qs60o"]
  },
  interactive: {
    li1rpt: "f1gw3sf2",
    Bsft5z2: "f13zj6fq",
    E3zdtr: "f1mdlcz9",
    Eqx8gd: ["f1a7op3", "f1cjjd47"],
    By385i5: "f1gboi2j",
    B1piin3: ["f1cjjd47", "f1a7op3"],
    Dlnsje: "ffyw7fx",
    d9w3h3: ["f1kp91vd", "f1ibwz09"],
    B3778ie: ["f1ibwz09", "f1kp91vd"],
    B1q35kw: 0,
    Bw17bha: 0,
    Bcgy8vk: 0,
    Bjuhk93: "f1mnjydx",
    Gjdm7m: "fj2g8qd",
    b1kco5: "f1yk9hq",
    Ba2ppi3: "fhwpy7i",
    F2fol1: "f14ee0xe",
    lck23g: "f1xhbsuh",
    wi16st: "fsrmcvb",
    ywj3b2: "f1t3k7v9",
    umuwi5: "fjw5xc1",
    Blcqepd: "f1xdyd5c",
    nplu4u: "fatpbeo",
    Bioka5o: "fb7uyps",
    Bnupc0a: "fx04xgm",
    bing71: "f1c7in40",
    Bercvud: "f1ibeo51",
    Bbr2w1p: "f1vnc8sk",
    Bduesf4: "f3e99gv",
    Bpq79vn: "fhljsf7"
  },
  filled: {
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f88035w",
    q7v0qe: "ftmjh5b",
    kmh5ft: ["f17blpuu", "fsrcdbj"],
    nagaa4: "f1tpwn32",
    B1yhkcb: ["fsrcdbj", "f17blpuu"]
  },
  "filled-darker": {
    De3pzq: "f16xq7d1"
  },
  "filled-lighter": {
    De3pzq: "fxugw4r"
  },
  "filled-darker-shadow": {
    De3pzq: "f16xq7d1",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f1gmd7mu",
    E5pizo: "fyed02w"
  },
  "filled-lighter-shadow": {
    De3pzq: "fxugw4r",
    Bgfg5da: 0,
    B9xav0g: 0,
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "f1gmd7mu",
    E5pizo: "fyed02w"
  },
  outline: {
    De3pzq: "fxugw4r",
    Bgfg5da: 0,
    B9xav0g: "f1c1zstj",
    oivjwe: 0,
    Bn0qgzm: 0,
    B4g9neb: 0,
    zhjwy3: 0,
    wvpqe5: 0,
    ibv6hh: 0,
    u1mtju: 0,
    h3c5rm: 0,
    vrafjx: 0,
    Bekrc4i: 0,
    i8vvqc: 0,
    g2u3we: 0,
    icvyot: 0,
    B4j52fo: 0,
    irswps: "fhz96rm"
  },
  outlineInteractive: {
    kzujx5: 0,
    oetu4i: "f1l4zc64",
    gvrnp0: 0,
    xv9156: 0,
    jek2p4: 0,
    gg5e9n: 0,
    Beu9t3s: 0,
    dt87k2: 0,
    Bt1vbvt: 0,
    Bwzppfd: 0,
    Bop6t4b: 0,
    B2zwrfe: 0,
    Bwp2tzp: 0,
    Bgoe8wy: 0,
    Bf40cpq: 0,
    ckks6v: 0,
    Baalond: "f9mts5e",
    v2iqwr: 0,
    wmxk5l: "f1z0osm6",
    Bj33j0h: 0,
    Bs0cc2w: 0,
    qwjtx1: 0,
    B50zh58: 0,
    f7epvg: 0,
    e1hlit: 0,
    B7mkhst: 0,
    ak43y8: 0,
    Bbcopvn: 0,
    Bvecx4l: 0,
    lwioe0: 0,
    B6oc9vd: 0,
    e2sjt0: 0,
    uqwnxt: 0,
    asj8p9: "f1acnei2",
    Br8fjdy: 0,
    zoxjo1: "f1so894s",
    Bt3ojkv: 0,
    B7pmvfx: 0,
    Bfht2n1: 0,
    an54nd: 0,
    t1ykpo: 0,
    Belqbek: 0,
    bbt1vd: 0,
    Brahy3i: 0,
    r7b1zc: 0,
    rexu52: 0,
    ovtnii: 0,
    Bvq3b66: 0,
    Bawrxx6: 0,
    Bbs6y8j: 0,
    B2qpgjt: "f19ezbcq"
  },
  invalid: {
    tvckwq: "fs4k3qj",
    gk2u95: ["fcee079", "fmyw78r"],
    hhx65j: "f1fgmyf4",
    Bxowmz0: ["fmyw78r", "fcee079"]
  }
}, {
  d: [".ftuwxu6{display:inline-flex;}", ".f1ewtqcl{box-sizing:border-box;}", ".f10pi13n{position:relative;}", [".f1yiegib{padding:0 0 var(--strokeWidthThick) 0;}", {
    p: -1
  }], [".f1s184ao{margin:0;}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".f12kltsn{vertical-align:top;}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".ff3nzm7{border:var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);}", {
    p: -2
  }], ".f1gw3sf2::after{box-sizing:border-box;}", '.f13zj6fq::after{content:"";}', ".f1mdlcz9::after{position:absolute;}", ".f1a7op3::after{left:-1px;}", ".f1cjjd47::after{right:-1px;}", ".f1gboi2j::after{bottom:-1px;}", ".ffyw7fx::after{height:max(var(--strokeWidthThick), var(--borderRadiusMedium));}", ".f1kp91vd::after{border-bottom-left-radius:var(--borderRadiusMedium);}", ".f1ibwz09::after{border-bottom-right-radius:var(--borderRadiusMedium);}", [".f1mnjydx::after{border-bottom:var(--strokeWidthThick) solid var(--colorCompoundBrandStroke);}", {
    p: -1
  }], ".fj2g8qd::after{clip-path:inset(calc(100% - var(--strokeWidthThick)) 0 0 0);}", ".f1yk9hq::after{transform:scaleX(0);}", ".fhwpy7i::after{transition-property:transform;}", ".f14ee0xe::after{transition-duration:var(--durationUltraFast);}", ".f1xhbsuh::after{transition-delay:var(--curveAccelerateMid);}", [".f88035w{border:var(--strokeWidthThin) solid var(--colorTransparentStroke);}", {
    p: -2
  }], ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", [".f1gmd7mu{border:var(--strokeWidthThin) solid var(--colorTransparentStrokeInteractive);}", {
    p: -2
  }], ".fyed02w{box-shadow:var(--shadow2);}", [".f1gmd7mu{border:var(--strokeWidthThin) solid var(--colorTransparentStrokeInteractive);}", {
    p: -2
  }], [".fhz96rm{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);}", {
    p: -2
  }], ".f1c1zstj{border-bottom-color:var(--colorNeutralStrokeAccessible);}", ".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}", ".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}", ".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}", ".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}"],
  m: [["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.fsrmcvb::after{transition-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f1t3k7v9::after{transition-delay:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.fx04xgm:focus-within::after{transition-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f1c7in40:focus-within::after{transition-delay:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }]],
  w: [".fjw5xc1:focus-within::after{transform:scaleX(1);}", ".f1xdyd5c:focus-within::after{transition-property:transform;}", ".fatpbeo:focus-within::after{transition-duration:var(--durationNormal);}", ".fb7uyps:focus-within::after{transition-delay:var(--curveDecelerateMid);}", ".f1ibeo51:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".f1vnc8sk:focus-within{outline-width:var(--strokeWidthThick);}", ".f3e99gv:focus-within{outline-style:solid;}", ".fhljsf7:focus-within{outline-color:transparent;}", [".f19ezbcq:focus-within{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Pressed);}", {
    p: -2
  }], ".f1so894s:focus-within{border-bottom-color:var(--colorCompoundBrandStroke);}"],
  h: [".ftmjh5b:hover,.ftmjh5b:focus-within{border-top-color:var(--colorTransparentStrokeInteractive);}", ".f17blpuu:hover,.f17blpuu:focus-within{border-right-color:var(--colorTransparentStrokeInteractive);}", ".fsrcdbj:hover,.fsrcdbj:focus-within{border-left-color:var(--colorTransparentStrokeInteractive);}", ".f1tpwn32:hover,.f1tpwn32:focus-within{border-bottom-color:var(--colorTransparentStrokeInteractive);}", [".f9mts5e:hover{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Hover);}", {
    p: -2
  }], ".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}"],
  a: [[".f1acnei2:active{border:var(--strokeWidthThin) solid var(--colorNeutralStroke1Pressed);}", {
    p: -2
  }], ".f1z0osm6:active{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"]
});
const useTextareaStyles = /* @__PURE__ */ __styles({
  base: {
    icvyot: "f1ern45e",
    vrafjx: ["f1n71otn", "f1deefiw"],
    oivjwe: "f1h8hb77",
    wvpqe5: ["f1deefiw", "f1n71otn"],
    jrapky: 0,
    Frg6f3: 0,
    t21cq0: 0,
    B6of3ja: 0,
    B74szlk: "f1s184ao",
    De3pzq: "f3rmtva",
    B7ck84d: "f1ewtqcl",
    sj55zd: "f19n0e5",
    Bh6795r: "fqerorx",
    Bahqtrf: "fk6fouc",
    Bqenvij: "f1l02sjl",
    yvdlaj: "fwyc1cq",
    B3o7kgh: "f13ta7ih",
    oeaueh: "f1s6fcnf"
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    Bceei9c: "fdrzuqr",
    yvdlaj: "fahhnxm"
  },
  small: {
    sshi5w: "f1w5jphr",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1pnffij",
    Bxyxcbc: "f192z54u",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  },
  medium: {
    sshi5w: "fvmd9f",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1ww82xo",
    Bxyxcbc: "f1if7ixc",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi"
  },
  large: {
    sshi5w: "f1kfson",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f15hvtkj",
    Bxyxcbc: "f3kip1f",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "figsok6",
    Bg96gwp: "faaz57k"
  }
}, {
  d: [".f1ern45e{border-top-style:none;}", ".f1n71otn{border-right-style:none;}", ".f1deefiw{border-left-style:none;}", ".f1h8hb77{border-bottom-style:none;}", [".f1s184ao{margin:0;}", {
    p: -1
  }], ".f3rmtva{background-color:transparent;}", ".f1ewtqcl{box-sizing:border-box;}", ".f19n0e5{color:var(--colorNeutralForeground1);}", ".fqerorx{flex-grow:1;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".f1l02sjl{height:100%;}", ".fwyc1cq::-webkit-input-placeholder{color:var(--colorNeutralForeground4);}", ".fwyc1cq::-moz-placeholder{color:var(--colorNeutralForeground4);}", ".f13ta7ih::-webkit-input-placeholder{opacity:1;}", ".f13ta7ih::-moz-placeholder{opacity:1;}", ".f1s6fcnf{outline-style:none;}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".f1w5jphr{min-height:40px;}", [".f1pnffij{padding:var(--spacingVerticalXS) calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], ".f192z54u{max-height:200px;}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fvmd9f{min-height:52px;}", [".f1ww82xo{padding:var(--spacingVerticalSNudge) calc(var(--spacingHorizontalMNudge) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], ".f1if7ixc{max-height:260px;}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".f1kfson{min-height:64px;}", [".f15hvtkj{padding:var(--spacingVerticalS) calc(var(--spacingHorizontalM) + var(--spacingHorizontalXXS));}", {
    p: -1
  }], ".f3kip1f{max-height:320px;}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}"]
});
const useTextareaResizeStyles = /* @__PURE__ */ __styles({
  none: {
    B3rzk8w: "f1o1s39h"
  },
  both: {
    B3rzk8w: "f1pxm0xe"
  },
  horizontal: {
    B3rzk8w: "fq6nmtn"
  },
  vertical: {
    B3rzk8w: "f1f5ktr4"
  }
}, {
  d: [".f1o1s39h{resize:none;}", ".f1pxm0xe{resize:both;}", ".fq6nmtn{resize:horizontal;}", ".f1f5ktr4{resize:vertical;}"]
});
const useTextareaStyles_unstable = (state) => {
  const {
    size: size2,
    appearance,
    resize
  } = state;
  const disabled = state.textarea.disabled;
  const invalid = `${state.textarea["aria-invalid"]}` === "true";
  const filled = appearance.startsWith("filled");
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(textareaClassNames.root, rootStyles.base, disabled && rootStyles.disabled, !disabled && filled && rootStyles.filled, !disabled && rootStyles[appearance], !disabled && rootStyles.interactive, !disabled && appearance === "outline" && rootStyles.outlineInteractive, !disabled && invalid && rootStyles.invalid, state.root.className);
  const textareaStyles = useTextareaStyles();
  const textareaResizeStyles = useTextareaResizeStyles();
  state.textarea.className = mergeClasses(textareaClassNames.textarea, textareaStyles.base, textareaStyles[size2], textareaResizeStyles[resize], disabled && textareaStyles.disabled, state.textarea.className);
  return state;
};
const Textarea = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useTextarea_unstable(props, ref);
  useTextareaStyles_unstable(state);
  useCustomStyleHook("useTextareaStyles_unstable")(state);
  return renderTextarea_unstable(state);
});
Textarea.displayName = "Textarea";
const useHTMLNoScrollStyles = /* @__PURE__ */ __resetStyles("r6pzz3z", null, [".r6pzz3z{overflow-y:hidden;overflow-y:clip;scrollbar-gutter:stable;}"]);
const useBodyNoScrollStyles = /* @__PURE__ */ __resetStyles("r144vlu9", null, [".r144vlu9{overflow-y:hidden;}"]);
function useDisableBodyScroll() {
  const htmlNoScrollStyles = useHTMLNoScrollStyles();
  const bodyNoScrollStyles = useBodyNoScrollStyles();
  const { targetDocument } = useFluent();
  const disableBodyScroll = reactExports.useCallback(() => {
    var _targetDocument_defaultView;
    if (!targetDocument) {
      return;
    }
    var _targetDocument_defaultView_innerHeight;
    const isHorizontalScrollbarVisible = (
      // When the window is a fractional height, `innerHeight` always rounds down but `clientHeight` rounds either up or down depending on the value.
      // To properly compare the body clientHeight to the window innerHeight, manually round down the fractional value to match innerHeight's calculation.
      Math.floor(targetDocument.body.getBoundingClientRect().height) > ((_targetDocument_defaultView_innerHeight = (_targetDocument_defaultView = targetDocument.defaultView) === null || _targetDocument_defaultView === void 0 ? void 0 : _targetDocument_defaultView.innerHeight) !== null && _targetDocument_defaultView_innerHeight !== void 0 ? _targetDocument_defaultView_innerHeight : 0)
    );
    if (!isHorizontalScrollbarVisible) {
      return;
    }
    targetDocument.documentElement.classList.add(htmlNoScrollStyles);
    targetDocument.body.classList.add(bodyNoScrollStyles);
    return;
  }, [
    targetDocument,
    htmlNoScrollStyles,
    bodyNoScrollStyles
  ]);
  const enableBodyScroll = reactExports.useCallback(() => {
    if (!targetDocument) {
      return;
    }
    targetDocument.documentElement.classList.remove(htmlNoScrollStyles);
    targetDocument.body.classList.remove(bodyNoScrollStyles);
  }, [
    targetDocument,
    htmlNoScrollStyles,
    bodyNoScrollStyles
  ]);
  return {
    disableBodyScroll,
    enableBodyScroll
  };
}
function useFocusFirstElement(open, modalType) {
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();
  const dialogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) {
      return;
    }
    const element = dialogRef.current && findFirstFocusable(dialogRef.current);
    if (element) {
      element.focus();
    } else {
      var _dialogRef_current;
      (_dialogRef_current = dialogRef.current) === null || _dialogRef_current === void 0 ? void 0 : _dialogRef_current.focus();
    }
  }, [
    findFirstFocusable,
    open,
    modalType,
    targetDocument
  ]);
  return dialogRef;
}
const defaultContextValue$1 = {
  open: false,
  inertTrapFocus: false,
  modalType: "modal",
  isNestedDialog: false,
  unmountOnClose: true,
  dialogRef: {
    current: null
  },
  requestOpenChange() {
  }
};
const DialogContext = createContext(void 0);
const DialogProvider = DialogContext.Provider;
const useDialogContext_unstable = (selector) => useContextSelector(DialogContext, (ctx = defaultContextValue$1) => selector(ctx));
const defaultContextValue = false;
const DialogSurfaceContext = reactExports.createContext(void 0);
const DialogSurfaceProvider = DialogSurfaceContext.Provider;
const useDialogSurfaceContext_unstable = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(DialogSurfaceContext)) !== null && _React_useContext !== void 0 ? _React_useContext : defaultContextValue;
};
const DialogBackdropContext = reactExports.createContext(void 0);
DialogBackdropContext.Provider;
const useDialogBackdropContext_unstable = () => {
  return reactExports.useContext(DialogBackdropContext);
};
const DialogSurfaceMotion = createPresenceComponentVariant(Scale, {
  outScale: 0.85,
  easing: motionTokens.curveDecelerateMid,
  duration: motionTokens.durationGentle,
  exitEasing: motionTokens.curveAccelerateMin,
  exitDuration: motionTokens.durationGentle
});
const useDialog_unstable = (props) => {
  const { children, modalType = "modal", onOpenChange, inertTrapFocus = false, unmountOnClose = true } = props;
  const dialogTitleId = useId("dialog-title-");
  const [trigger, content] = childrenToTriggerAndContent(children);
  const [open, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false
  });
  const requestOpenChange = useEventCallback((data) => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(data.event, data);
    if (!data.event.isDefaultPrevented()) {
      setOpen(data.open);
    }
  });
  const dialogRef = useFocusFirstElement(open, modalType);
  const { modalAttributes, triggerAttributes } = useModalAttributes({
    trapFocus: modalType !== "non-modal",
    legacyTrapFocus: !inertTrapFocus
  });
  const isNestedDialog = useHasParentContext(DialogContext);
  return {
    components: {
      surfaceMotion: DialogSurfaceMotion
    },
    inertTrapFocus,
    open,
    modalType,
    content,
    trigger,
    requestOpenChange,
    dialogTitleId,
    isNestedDialog,
    unmountOnClose,
    dialogRef,
    modalAttributes,
    triggerAttributes,
    surfaceMotion: presenceMotionSlot(props.surfaceMotion, {
      elementType: DialogSurfaceMotion,
      defaultProps: {
        visible: open,
        appear: unmountOnClose,
        unmountOnExit: unmountOnClose
      }
    })
  };
};
function childrenToTriggerAndContent(children) {
  const childrenArray = reactExports.Children.toArray(children);
  switch (childrenArray.length) {
    // case where there's a trigger followed by content
    case 2:
      return childrenArray;
    // case where there's only content
    case 1:
      return [
        void 0,
        childrenArray[0]
      ];
    // unknown case
    default:
      return [
        void 0,
        void 0
      ];
  }
}
const renderDialog_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(DialogProvider, {
    value: contextValues.dialog,
    children: /* @__PURE__ */ jsxs(DialogSurfaceProvider, {
      value: contextValues.dialogSurface,
      children: [
        state.trigger,
        state.content && /* @__PURE__ */ jsx(state.surfaceMotion, {
          children: /* @__PURE__ */ jsx(MotionRefForwarder, {
            children: state.content
          })
        })
      ]
    })
  });
};
function useDialogContextValues_unstable(state) {
  const { modalType, open, dialogRef, dialogTitleId, isNestedDialog, inertTrapFocus, requestOpenChange, modalAttributes, triggerAttributes, unmountOnClose } = state;
  const dialog = reactExports.useMemo(() => ({
    open,
    modalType,
    dialogRef,
    dialogTitleId,
    isNestedDialog,
    inertTrapFocus,
    modalAttributes,
    triggerAttributes,
    unmountOnClose,
    requestOpenChange
  }), [
    open,
    modalType,
    dialogRef,
    dialogTitleId,
    isNestedDialog,
    inertTrapFocus,
    modalAttributes,
    triggerAttributes,
    unmountOnClose,
    requestOpenChange
  ]);
  const dialogSurface = false;
  return {
    dialog,
    dialogSurface
  };
}
const Dialog = /* @__PURE__ */ reactExports.memo((props) => {
  const state = useDialog_unstable(props);
  const contextValues = useDialogContextValues_unstable(state);
  return renderDialog_unstable(state, contextValues);
});
Dialog.displayName = "Dialog";
const useDialogTrigger_unstable = (props) => {
  const isInsideSurfaceDialog = useDialogSurfaceContext_unstable();
  const { children, disableButtonEnhancement = false, action = isInsideSurfaceDialog ? "close" : "open" } = props;
  const child = getTriggerChild(children);
  const requestOpenChange = useDialogContext_unstable((ctx) => ctx.requestOpenChange);
  const { triggerAttributes } = useModalAttributes();
  const handleClick = useEventCallback((event) => {
    var _child_props_onClick, _child_props;
    child === null || child === void 0 ? void 0 : (_child_props_onClick = (_child_props = child.props).onClick) === null || _child_props_onClick === void 0 ? void 0 : _child_props_onClick.call(_child_props, event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        type: "triggerClick",
        open: action === "open"
      });
    }
  });
  const triggerChildProps = {
    ...child === null || child === void 0 ? void 0 : child.props,
    ref: getReactElementRef(child),
    onClick: handleClick,
    ...triggerAttributes
  };
  const ariaButtonTriggerChildProps = useARIAButtonProps((child === null || child === void 0 ? void 0 : child.type) === "button" || (child === null || child === void 0 ? void 0 : child.type) === "a" ? child.type : "div", {
    ...triggerChildProps,
    type: "button"
  });
  return {
    children: applyTriggerPropsToChildren(children, disableButtonEnhancement ? triggerChildProps : ariaButtonTriggerChildProps)
  };
};
const renderDialogTrigger_unstable = (state) => state.children;
const DialogTrigger = (props) => {
  const state = useDialogTrigger_unstable(props);
  return renderDialogTrigger_unstable(state);
};
DialogTrigger.displayName = "DialogTrigger";
DialogTrigger.isFluentTriggerComponent = true;
const useDialogActions_unstable = (props, ref) => {
  const { position = "end", fluid = false } = props;
  return {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps("div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    }),
    position,
    fluid
  };
};
const renderDialogActions_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const dialogActionsClassNames = {
  root: "fui-DialogActions"
};
const useResetStyles$1 = /* @__PURE__ */ __resetStyles("rhfpeu0", null, {
  r: [".rhfpeu0{gap:8px;height:fit-content;box-sizing:border-box;display:flex;grid-row-start:3;grid-row-end:3;}"],
  s: ["@media screen and (max-width: 480px){.rhfpeu0{flex-direction:column;justify-self:stretch;}}"]
});
const useStyles$3 = /* @__PURE__ */ __styles({
  gridPositionEnd: {
    Bdqf98w: "f1a7i8kp",
    Br312pm: "fd46tj4",
    Bw0ie65: "fsyjsko",
    Btsd7tp: "f1n00o3b",
    ufxxby: "f1mvsp37",
    Bq5p579: "flbz1vp"
  },
  gridPositionStart: {
    Bdqf98w: "fsxvdwy",
    Br312pm: "fwpfdsa",
    Bw0ie65: "f1e2fz10",
    Ew0qkd: "f119phc2",
    ufxxby: "f1j719yo",
    Bq5p579: "flbz1vp"
  },
  fluidStart: {
    Bw0ie65: "fsyjsko"
  },
  fluidEnd: {
    Br312pm: "fwpfdsa"
  }
}, {
  d: [".f1a7i8kp{justify-self:end;}", ".fd46tj4{grid-column-start:2;}", ".fsyjsko{grid-column-end:4;}", ".fsxvdwy{justify-self:start;}", ".fwpfdsa{grid-column-start:1;}", ".f1e2fz10{grid-column-end:2;}"],
  m: [["@media screen and (max-width: 480px){.f1n00o3b{grid-column-start:1;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.f1mvsp37{grid-row-start:4;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.flbz1vp{grid-row-end:auto;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.f119phc2{grid-column-end:4;}}", {
    m: "screen and (max-width: 480px)"
  }], ["@media screen and (max-width: 480px){.f1j719yo{grid-row-start:3;}}", {
    m: "screen and (max-width: 480px)"
  }]]
});
const useDialogActionsStyles_unstable = (state) => {
  const resetStyles = useResetStyles$1();
  const styles = useStyles$3();
  state.root.className = mergeClasses(dialogActionsClassNames.root, resetStyles, state.position === "start" && styles.gridPositionStart, state.position === "end" && styles.gridPositionEnd, state.fluid && state.position === "start" && styles.fluidStart, state.fluid && state.position === "end" && styles.fluidEnd, state.root.className);
  return state;
};
const DialogActions = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogActions_unstable(props, ref);
  useDialogActionsStyles_unstable(state);
  useCustomStyleHook("useDialogActionsStyles_unstable")(state);
  return renderDialogActions_unstable(state);
});
DialogActions.displayName = "DialogActions";
const useDialogBody_unstable = (props, ref) => {
  var _props_as;
  return {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : "div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    })
  };
};
const renderDialogBody_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const dialogBodyClassNames = {
  root: "fui-DialogBody"
};
const useResetStyles = /* @__PURE__ */ __resetStyles("rhwx3p8", null, {
  r: [".rhwx3p8{overflow:unset;gap:8px;display:grid;max-height:calc(100vh - 2 * 24px);max-height:calc(100dvh - 2 * 24px);box-sizing:border-box;grid-template-rows:auto 1fr;grid-template-columns:1fr 1fr auto;}"],
  s: ["@media screen and (max-width: 480px){.rhwx3p8{max-width:100vw;grid-template-rows:auto 1fr auto;}}", "@media screen and (max-height: 359px){.rhwx3p8{max-height:unset;}}"]
});
const useDialogBodyStyles_unstable = (state) => {
  const resetStyles = useResetStyles();
  state.root.className = mergeClasses(dialogBodyClassNames.root, resetStyles, state.root.className);
  return state;
};
const DialogBody = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogBody_unstable(props, ref);
  useDialogBodyStyles_unstable(state);
  useCustomStyleHook("useDialogBodyStyles_unstable")(state);
  return renderDialogBody_unstable(state);
});
DialogBody.displayName = "DialogBody";
const dialogTitleClassNames = {
  root: "fui-DialogTitle",
  action: "fui-DialogTitle__action"
};
const useRootResetStyles = /* @__PURE__ */ __resetStyles("rxjm636", null, [".rxjm636{font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase500);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase500);margin:0;grid-row-start:1;grid-row-end:1;grid-column-start:1;grid-column-end:3;}"]);
const useStyles$2 = /* @__PURE__ */ __styles({
  rootWithoutAction: {
    Bw0ie65: "fsyjsko"
  }
}, {
  d: [".fsyjsko{grid-column-end:4;}"]
});
const useActionResetStyles = /* @__PURE__ */ __resetStyles("r13kcrze", null, [".r13kcrze{grid-row-start:1;grid-row-end:1;grid-column-start:3;justify-self:end;align-self:start;}"]);
const useDialogTitleInternalStyles = /* @__PURE__ */ __resetStyles("r2avt6e", "roj2bbc", {
  r: [".r2avt6e{overflow:visible;padding:0;border-style:none;position:relative;box-sizing:content-box;background-color:inherit;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer;line-height:0;-webkit-appearance:button;text-align:unset;}", ".r2avt6e:focus{outline-style:none;}", ".r2avt6e:focus-visible{outline-style:none;}", ".r2avt6e[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r2avt6e[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".roj2bbc{overflow:visible;padding:0;border-style:none;position:relative;box-sizing:content-box;background-color:inherit;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer;line-height:0;-webkit-appearance:button;text-align:unset;}", ".roj2bbc:focus{outline-style:none;}", ".roj2bbc:focus-visible{outline-style:none;}", ".roj2bbc[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.roj2bbc[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r2avt6e[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media (forced-colors: active){.roj2bbc[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]
});
const useDialogTitleStyles_unstable = (state) => {
  const rootResetStyles = useRootResetStyles();
  const actionResetStyles = useActionResetStyles();
  const styles = useStyles$2();
  state.root.className = mergeClasses(dialogTitleClassNames.root, rootResetStyles, !state.action && styles.rootWithoutAction, state.root.className);
  if (state.action) {
    state.action.className = mergeClasses(dialogTitleClassNames.action, actionResetStyles, state.action.className);
  }
  return state;
};
const useDialogTitle_unstable = (props, ref) => {
  const { action } = props;
  const modalType = useDialogContext_unstable((ctx) => ctx.modalType);
  const internalStyles = useDialogTitleInternalStyles();
  return {
    components: {
      root: "h2",
      action: "div"
    },
    root: always(getIntrinsicElementProps("h2", {
      ref,
      id: useDialogContext_unstable((ctx) => ctx.dialogTitleId),
      ...props
    }), {
      elementType: "h2"
    }),
    action: optional(action, {
      renderByDefault: modalType === "non-modal",
      defaultProps: {
        children: /* @__PURE__ */ reactExports.createElement(DialogTrigger, {
          disableButtonEnhancement: true,
          action: "close"
        }, /* @__PURE__ */ reactExports.createElement("button", {
          type: "button",
          className: internalStyles,
          // TODO: find a better way to add internal labels
          "aria-label": "close"
        }, /* @__PURE__ */ reactExports.createElement(Dismiss20Regular, null)))
      },
      elementType: "div"
    })
  };
};
const renderDialogTitle_unstable = (state) => {
  return /* @__PURE__ */ jsxs(reactExports.Fragment, {
    children: [
      /* @__PURE__ */ jsx(state.root, {
        children: state.root.children
      }),
      state.action && /* @__PURE__ */ jsx(state.action, {})
    ]
  });
};
const DialogTitle = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogTitle_unstable(props, ref);
  useDialogTitleStyles_unstable(state);
  useCustomStyleHook("useDialogTitleStyles_unstable")(state);
  return renderDialogTitle_unstable(state);
});
DialogTitle.displayName = "DialogTitle";
const DialogBackdropMotion = FadeRelaxed;
const useDialogSurface_unstable = (props, ref) => {
  const contextRef = useMotionForwardedRef();
  const modalType = useDialogContext_unstable((ctx) => ctx.modalType);
  const isNestedDialog = useDialogContext_unstable((ctx) => ctx.isNestedDialog);
  const backdropOverride = useDialogBackdropContext_unstable();
  const treatBackdropAsNested = backdropOverride !== null && backdropOverride !== void 0 ? backdropOverride : isNestedDialog;
  const modalAttributes = useDialogContext_unstable((ctx) => ctx.modalAttributes);
  const dialogRef = useDialogContext_unstable((ctx) => ctx.dialogRef);
  const requestOpenChange = useDialogContext_unstable((ctx) => ctx.requestOpenChange);
  const dialogTitleID = useDialogContext_unstable((ctx) => ctx.dialogTitleId);
  const open = useDialogContext_unstable((ctx) => ctx.open);
  const unmountOnClose = useDialogContext_unstable((ctx) => ctx.unmountOnClose);
  const handledBackdropClick = useEventCallback((event) => {
    if (isResolvedShorthand(props.backdrop)) {
      var _props_backdrop_onClick, _props_backdrop;
      (_props_backdrop_onClick = (_props_backdrop = props.backdrop).onClick) === null || _props_backdrop_onClick === void 0 ? void 0 : _props_backdrop_onClick.call(_props_backdrop, event);
    }
    if (modalType === "modal" && !event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        open: false,
        type: "backdropClick"
      });
    }
  });
  const handleKeyDown = useEventCallback((event) => {
    var _props_onKeyDown;
    (_props_onKeyDown = props.onKeyDown) === null || _props_onKeyDown === void 0 ? void 0 : _props_onKeyDown.call(props, event);
    if (event.key === Escape && !event.isDefaultPrevented()) {
      requestOpenChange({
        event,
        open: false,
        type: "escapeKeyDown"
      });
      event.preventDefault();
    }
  });
  const backdrop = optional(props.backdrop, {
    renderByDefault: modalType !== "non-modal",
    defaultProps: {
      "aria-hidden": "true"
    },
    elementType: "div"
  });
  const backdropAppearance = backdrop === null || backdrop === void 0 ? void 0 : backdrop.appearance;
  if (backdrop) {
    backdrop.onClick = handledBackdropClick;
    delete backdrop.appearance;
  }
  const { disableBodyScroll, enableBodyScroll } = useDisableBodyScroll();
  useIsomorphicLayoutEffect(() => {
    if (!open) {
      enableBodyScroll();
      return;
    }
    if (isNestedDialog || modalType === "non-modal") {
      return;
    }
    disableBodyScroll();
    return () => enableBodyScroll();
  }, [
    open,
    modalType,
    isNestedDialog,
    disableBodyScroll,
    enableBodyScroll
  ]);
  return {
    components: {
      backdrop: "div",
      root: "div",
      backdropMotion: DialogBackdropMotion
    },
    open,
    backdrop,
    isNestedDialog,
    treatBackdropAsNested,
    backdropAppearance,
    unmountOnClose,
    mountNode: props.mountNode,
    root: always(getIntrinsicElementProps("div", {
      tabIndex: -1,
      role: modalType === "alert" ? "alertdialog" : "dialog",
      "aria-modal": modalType !== "non-modal",
      "aria-labelledby": props["aria-label"] ? void 0 : dialogTitleID,
      "aria-hidden": !unmountOnClose && !open ? true : void 0,
      ...props,
      ...modalAttributes,
      onKeyDown: handleKeyDown,
      // FIXME:
      // `DialogSurfaceElement` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: useMergedRefs(ref, contextRef, dialogRef)
    }), {
      elementType: "div"
    }),
    backdropMotion: presenceMotionSlot(props.backdropMotion, {
      elementType: DialogBackdropMotion,
      defaultProps: {
        appear: unmountOnClose,
        visible: open
      }
    }),
    // Deprecated properties
    transitionStatus: void 0
  };
};
const renderDialogSurface_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsxs(Portal, {
    mountNode: state.mountNode,
    children: [
      state.backdrop && // TODO: state.backdropMotion is non nullable, but assertSlots asserts it as nullable
      // FIXME: this should be resolved by properly splitting props and state slots declaration
      state.backdropMotion && /* @__PURE__ */ jsx(state.backdropMotion, {
        children: /* @__PURE__ */ jsx(state.backdrop, {})
      }),
      /* @__PURE__ */ jsx(MotionRefForwarderReset, {
        children: /* @__PURE__ */ jsx(DialogSurfaceProvider, {
          value: contextValues.dialogSurface,
          children: /* @__PURE__ */ jsx(state.root, {})
        })
      })
    ]
  });
};
const dialogSurfaceClassNames = {
  root: "fui-DialogSurface",
  backdrop: "fui-DialogSurface__backdrop"
};
const useRootBaseStyle = /* @__PURE__ */ __resetStyles("r1u3t6p6", "r5coedp", {
  r: [".r1u3t6p6{inset:0;padding:24px;margin:auto;border-style:none;overflow:unset;border:1px solid var(--colorTransparentStroke);border-radius:var(--borderRadiusXLarge);display:block;-webkit-user-select:unset;-moz-user-select:unset;user-select:unset;visibility:unset;position:fixed;height:fit-content;max-width:600px;max-height:100vh;max-height:100dvh;box-sizing:border-box;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);box-shadow:var(--shadow64);}", ".r1u3t6p6:focus{outline-style:none;}", ".r1u3t6p6:focus-visible{outline-style:none;}", ".r1u3t6p6[data-fui-focus-visible]{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r1u3t6p6[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".r5coedp{inset:0;padding:24px;margin:auto;border-style:none;overflow:unset;border:1px solid var(--colorTransparentStroke);border-radius:var(--borderRadiusXLarge);display:block;-webkit-user-select:unset;-moz-user-select:unset;user-select:unset;visibility:unset;position:fixed;height:fit-content;max-width:600px;max-height:100vh;max-height:100dvh;box-sizing:border-box;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);box-shadow:var(--shadow64);}", ".r5coedp:focus{outline-style:none;}", ".r5coedp:focus-visible{outline-style:none;}", ".r5coedp[data-fui-focus-visible]{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.r5coedp[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r1u3t6p6[data-fui-focus-visible]::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media screen and (max-width: 480px){.r1u3t6p6{max-width:100vw;}}", "@media screen and (max-height: 359px){.r1u3t6p6{overflow-y:auto;padding-right:calc(24px - 4px);border-right-width:4px;border-top-width:4px;border-bottom-width:4px;}}", "@media (forced-colors: active){.r5coedp[data-fui-focus-visible]::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}", "@media screen and (max-width: 480px){.r5coedp{max-width:100vw;}}", "@media screen and (max-height: 359px){.r5coedp{overflow-y:auto;padding-left:calc(24px - 4px);border-left-width:4px;border-top-width:4px;border-bottom-width:4px;}}"]
});
const useBackdropBaseStyle = /* @__PURE__ */ __resetStyles("r1e18s3l", null, [".r1e18s3l{inset:0px;background-color:var(--colorBackgroundOverlay);position:fixed;}"]);
const useStyles$1 = /* @__PURE__ */ __styles({
  nestedDialogBackdrop: {
    De3pzq: "f1c21dwh"
  },
  dialogHidden: {
    Bkecrkj: "f1aehjj5"
  }
}, {
  d: [".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1aehjj5{pointer-events:none;}"]
});
const useDialogSurfaceStyles_unstable = (state) => {
  const {
    root,
    backdrop,
    open,
    unmountOnClose,
    treatBackdropAsNested,
    backdropAppearance
  } = state;
  const rootBaseStyle = useRootBaseStyle();
  const backdropBaseStyle = useBackdropBaseStyle();
  const styles = useStyles$1();
  const isBackdropTransparent = backdropAppearance ? backdropAppearance === "transparent" : treatBackdropAsNested;
  const mountedAndClosed = !unmountOnClose && !open;
  root.className = mergeClasses(dialogSurfaceClassNames.root, rootBaseStyle, mountedAndClosed && styles.dialogHidden, root.className);
  if (backdrop) {
    backdrop.className = mergeClasses(dialogSurfaceClassNames.backdrop, backdropBaseStyle, mountedAndClosed && styles.dialogHidden, isBackdropTransparent && styles.nestedDialogBackdrop, backdrop.className);
  }
  return state;
};
function useDialogSurfaceContextValues_unstable(state) {
  const dialogSurface = true;
  return {
    dialogSurface
  };
}
const DialogSurface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogSurface_unstable(props, ref);
  const contextValues = useDialogSurfaceContextValues_unstable();
  useDialogSurfaceStyles_unstable(state);
  useCustomStyleHook("useDialogSurfaceStyles_unstable")(state);
  return renderDialogSurface_unstable(state, contextValues);
});
DialogSurface.displayName = "DialogSurface";
const useDialogContent_unstable = (props, ref) => {
  var _props_as;
  return {
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : "div", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "div"
    })
  };
};
const renderDialogContent_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const dialogContentClassNames = {
  root: "fui-DialogContent"
};
const useStyles = /* @__PURE__ */ __resetStyles("r1v5zwsm", null, {
  r: [".r1v5zwsm{padding:var(--strokeWidthThick);margin:calc(var(--strokeWidthThick) * -1);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);overflow-y:auto;min-height:32px;box-sizing:border-box;grid-row-start:2;grid-row-end:2;grid-column-start:1;grid-column-end:4;}"],
  s: ["@media screen and (max-height: 359px){.r1v5zwsm{overflow-y:unset;}}"]
});
const useDialogContentStyles_unstable = (state) => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles, state.root.className);
  return state;
};
const DialogContent = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useDialogContent_unstable(props, ref);
  useDialogContentStyles_unstable(state);
  useCustomStyleHook("useDialogContentStyles_unstable")(state);
  return renderDialogContent_unstable(state);
});
DialogContent.displayName = "DialogContent";
const api = window.settingsApi;
const TextContext = reactExports.createContext(strings("en"));
const useText = () => reactExports.useContext(TextContext);
function checkNote(s, t, formatTime) {
  if (s.phase !== "idle" || s.lastCheck === null) return null;
  return `${t.upToDate} · ${t.checkedAt(formatTime(s.lastCheck))}`;
}
const formatCheckTime = (ms, lang) => new Date(ms).toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit" });
const sizeValuesForOrientation = (orientation, element) => {
  const sizeName = orientation === "horizontal" ? "maxWidth" : "maxHeight";
  const overflowName = orientation === "horizontal" ? "overflowX" : "overflowY";
  const measuredSize = orientation === "horizontal" ? element.scrollWidth : element.scrollHeight;
  const toSize = `${measuredSize}px`;
  return {
    sizeName,
    overflowName,
    toSize
  };
};
const sizeEnterAtom = ({ orientation, duration, easing, element, outSize = "0", delay = 0 }) => {
  const { sizeName, overflowName, toSize } = sizeValuesForOrientation(orientation, element);
  return {
    keyframes: [
      {
        [sizeName]: outSize,
        [overflowName]: "hidden"
      },
      {
        [sizeName]: toSize,
        offset: 0.9999,
        [overflowName]: "hidden"
      },
      {
        [sizeName]: "unset",
        [overflowName]: "unset"
      }
    ],
    duration,
    easing,
    delay,
    fill: "both"
  };
};
const sizeExitAtom = ({ orientation, duration, easing, element, delay = 0, outSize = "0" }) => {
  const { sizeName, overflowName, toSize } = sizeValuesForOrientation(orientation, element);
  return {
    keyframes: [
      {
        [sizeName]: toSize,
        [overflowName]: "hidden"
      },
      {
        [sizeName]: outSize,
        [overflowName]: "hidden"
      }
    ],
    duration,
    easing,
    delay,
    fill: "both"
  };
};
const whitespaceValuesForOrientation = (orientation) => {
  if (orientation === "horizontal") {
    return {
      paddingStart: "paddingInlineStart",
      paddingEnd: "paddingInlineEnd",
      marginStart: "marginInlineStart",
      marginEnd: "marginInlineEnd"
    };
  }
  return {
    paddingStart: "paddingBlockStart",
    paddingEnd: "paddingBlockEnd",
    marginStart: "marginBlockStart",
    marginEnd: "marginBlockEnd"
  };
};
const whitespaceAtom = ({ direction, orientation, duration, easing, delay = 0 }) => {
  const { paddingStart, paddingEnd, marginStart, marginEnd } = whitespaceValuesForOrientation(orientation);
  const offset2 = direction === "enter" ? 0 : 1;
  const keyframes = [
    {
      [paddingStart]: "0",
      [paddingEnd]: "0",
      [marginStart]: "0",
      [marginEnd]: "0",
      offset: offset2
    }
  ];
  return {
    keyframes,
    duration,
    easing,
    delay,
    fill: "both"
  };
};
const fadeAtom = ({ direction, duration, easing = motionTokens.curveLinear, delay = 0, outOpacity = 0, inOpacity = 1 }) => {
  const keyframes = [
    {
      opacity: outOpacity
    },
    {
      opacity: inOpacity
    }
  ];
  if (direction === "exit") {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay,
    // Applying opacity backwards and forwards in time is important
    // to avoid a bug where a delayed animation is not hidden when it should be.
    fill: "both"
  };
};
const collapsePresenceFn = ({
  element,
  // Primary duration controls (simple API)
  duration = motionTokens.durationNormal,
  exitDuration = duration,
  // Granular duration controls with smart defaults (advanced API)
  sizeDuration = duration,
  opacityDuration = sizeDuration,
  exitSizeDuration = exitDuration,
  exitOpacityDuration = exitSizeDuration,
  // Other timing controls
  easing = motionTokens.curveEasyEaseMax,
  delay = 0,
  exitEasing = easing,
  exitDelay = delay,
  staggerDelay = 0,
  exitStaggerDelay = staggerDelay,
  // Animation controls
  animateOpacity = true,
  orientation = "vertical",
  outSize = "0px"
}) => {
  const enterAtoms = [
    // Apply global delay to size atom - size expansion starts first
    sizeEnterAtom({
      orientation,
      duration: sizeDuration,
      easing,
      element,
      outSize,
      delay
    }),
    whitespaceAtom({
      direction: "enter",
      orientation,
      duration: sizeDuration,
      easing,
      delay
    })
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({
      direction: "enter",
      duration: opacityDuration,
      easing,
      delay: delay + staggerDelay
    }));
  }
  const exitAtoms = [];
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({
      direction: "exit",
      duration: exitOpacityDuration,
      easing: exitEasing,
      delay: exitDelay
    }));
  }
  exitAtoms.push(sizeExitAtom({
    orientation,
    duration: exitSizeDuration,
    easing: exitEasing,
    element,
    delay: exitDelay + exitStaggerDelay,
    outSize
  }), whitespaceAtom({
    direction: "exit",
    orientation,
    duration: exitSizeDuration,
    easing: exitEasing,
    delay: exitDelay + exitStaggerDelay
  }));
  return {
    enter: enterAtoms,
    exit: exitAtoms
  };
};
const Collapse = createPresenceComponent(collapsePresenceFn);
createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationFast
});
createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlower
});
createPresenceComponentVariant(Collapse, {
  // Enter timing per motion design spec
  sizeDuration: motionTokens.durationNormal,
  opacityDuration: motionTokens.durationSlower,
  staggerDelay: motionTokens.durationNormal,
  // Exit timing per motion design spec
  exitSizeDuration: motionTokens.durationNormal,
  exitOpacityDuration: motionTokens.durationSlower,
  exitStaggerDelay: motionTokens.durationSlower,
  // Easing per motion design spec
  easing: motionTokens.curveEasyEase,
  exitEasing: motionTokens.curveEasyEase
});
function SettingRow(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card${props.dim ? " dim" : ""}${props.className ? ` ${props.className}` : ""}`, children: [
    props.icon === null ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: props.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      props.title,
      props.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: props.description }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ctl", children: props.children })
  ] });
}
function OnOffSwitch(props) {
  const t = useText();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Switch,
    {
      checked: props.checked,
      disabled: props.disabled,
      "aria-label": props.label,
      onChange: (_, d) => props.onChange(d.checked),
      label: props.checked ? t.on : t.off,
      labelPosition: "before"
    }
  );
}
function SwitchRow(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: props.icon, title: props.title, description: props.description, dim: props.dim, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OnOffSwitch, { checked: props.checked, disabled: props.disabled, onChange: props.onChange }) });
}
function ExpanderRow(props) {
  const [open, setOpen] = reactExports.useState(props.defaultOpen ?? false);
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card expander${open ? " open" : ""}${props.dim ? " dim" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "expHead", onClick: () => setOpen(!open), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: props.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: `${id}-title`, children: props.title }),
        props.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: props.description }) : null
      ] }),
      props.control ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ctl", onClick: (e) => e.stopPropagation(), children: props.control }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "expChevron",
          "aria-expanded": open,
          "aria-controls": `${id}-body`,
          "aria-labelledby": `${id}-title`,
          onClick: (e) => {
            e.stopPropagation();
            setOpen(!open);
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown20Regular, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapse, { visible: open, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `${id}-body`, className: "expBody", inert: !open, children: props.children }) })
  ] });
}
function SliderRow(props) {
  const { min: min2, max: max2, step } = LIMITS[props.limit];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { icon: props.icon, title: props.title, description: props.description, dim: props.dim, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: min2, max: max2, step, value: props.value, onChange: (_, d) => props.onChange(d.value), style: { width: 200 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: props.format(props.value) })
  ] });
}
const MAC$1 = api.platform === "mac";
function AboutSection({ icon, update }) {
  const t = useText();
  const [about, setAbout] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void api.getAbout().then(setAbout);
  }, [t]);
  if (!about) return null;
  const note = update ? checkNote(update, t, (ms) => formatCheckTime(ms, t.lang)) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SettingRow,
      {
        icon,
        title: t.about,
        description: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          t.aboutDesc(about.version),
          note ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: note }) : null
        ] }),
        children: [
          update ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              disabled: update.phase === "checking" || update.phase === "downloading" || update.phase === "installing",
              onClick: () => void api.checkForUpdates(),
              children: update.phase === "checking" ? t.checking : t.checkForUpdates
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.openProjectPage(), children: t.githubPage }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.openSettingsFolder(), children: t.openSettingsFolder })
        ]
      }
    ),
    update ? /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateCard, { update }) : null,
    about.problems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card notes", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.problems }),
      about.problems.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "desc", children: [
        "• ",
        p
      ] }, p))
    ] }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card notes", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.knownLimitations }),
      about.limitations.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "desc", children: [
        "• ",
        l
      ] }, l))
    ] }) })
  ] });
}
function UpdateCard({ update }) {
  const t = useText();
  if (update.phase === "available") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card update", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownload24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.updateAvailable(update.version) }),
        MAC$1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.updateMacSteps }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: () => void api.startUpdate(), children: t.updateNow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.openReleasePage(), children: t.whatsNew })
      ] })
    ] });
  }
  if (update.phase === "downloading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card update", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownload24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.downloadingUpdate(update.percent) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { className: "updateBar", value: update.percent, max: 100, "aria-label": t.downloadingUpdate(update.percent) })
      ] })
    ] });
  }
  if (update.phase === "installing") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card update", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowSync24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.installingUpdate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { className: "updateBar", "aria-label": t.installingUpdate })
      ] })
    ] });
  }
  if (update.phase === "error") {
    const retry = update.retry === "check" ? () => void api.checkForUpdates() : () => void api.startUpdate();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card update failed", role: "alert", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorCircle24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lbl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "warnText", children: update.message }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: retry, children: t.retry }),
        update.retry === "download" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.openReleasePage(), children: t.whatsNew }) : null
      ] })
    ] });
  }
  return null;
}
const ascii$1 = (s) => [...s].map((c) => c.charCodeAt(0));
const startsWith$1 = (b, at, sig) => b.length >= at + sig.length && sig.every((v, i) => b[at + i] === v);
function sniffAudio(bytes) {
  if (startsWith$1(bytes, 0, ascii$1("OggS"))) return "ogg";
  if (startsWith$1(bytes, 0, ascii$1("RIFF")) && startsWith$1(bytes, 8, ascii$1("WAVE"))) return "wav";
  if (startsWith$1(bytes, 0, ascii$1("ID3"))) return "mp3";
  if (bytes.length >= 2 && bytes[0] === 255 && (bytes[1] & 224) === 224 && (bytes[1] & 6) !== 0) return "mp3";
  return null;
}
const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
const startsWith = (b, at, sig) => b.length >= at + sig.length && sig.every((v, i) => b[at + i] === v);
const ascii = (s) => [...s].map((c) => c.charCodeAt(0));
const RIFF = ascii("RIFF");
const WEBP = ascii("WEBP");
const GIF87 = ascii("GIF87a");
const GIF89 = ascii("GIF89a");
const u16 = (b, at) => b[at] | b[at + 1] << 8;
const u24 = (b, at) => b[at] | b[at + 1] << 8 | b[at + 2] << 16;
function sniffImage(bytes) {
  if (startsWith(bytes, 0, PNG_SIGNATURE)) return "png";
  if (startsWith(bytes, 0, [255, 216, 255])) return "jpeg";
  if (startsWith(bytes, 0, GIF87) || startsWith(bytes, 0, GIF89)) return "gif";
  if (startsWith(bytes, 0, RIFF) && startsWith(bytes, 8, WEBP)) return "webp";
  return null;
}
function webpSize(bytes) {
  if (sniffImage(bytes) !== "webp") return null;
  if (startsWith(bytes, 12, ascii("VP8 "))) {
    if (bytes.length < 30 || !startsWith(bytes, 23, [157, 1, 42])) return null;
    return sized(u16(bytes, 26) & 16383, u16(bytes, 28) & 16383);
  }
  if (startsWith(bytes, 12, ascii("VP8L"))) {
    if (bytes.length < 25 || bytes[20] !== 47) return null;
    const bits = (bytes[21] | bytes[22] << 8 | bytes[23] << 16 | bytes[24] << 24) >>> 0;
    return { width: (bits & 16383) + 1, height: (bits >>> 14 & 16383) + 1 };
  }
  if (startsWith(bytes, 12, ascii("VP8X"))) {
    if (bytes.length < 30) return null;
    return { width: u24(bytes, 24) + 1, height: u24(bytes, 27) + 1 };
  }
  return null;
}
function skipSubBlocks(b, at) {
  while (at < b.length) {
    const length = b[at];
    at += 1 + length;
    if (length === 0) break;
  }
  return at;
}
function gifExtent(bytes) {
  if (sniffImage(bytes) !== "gif" || bytes.length < 10) return null;
  let width = u16(bytes, 6);
  let height = u16(bytes, 8);
  let at = 13;
  if (bytes.length > 10 && (bytes[10] & 128) !== 0) at += 3 << (bytes[10] & 7) + 1;
  while (at < bytes.length) {
    const block = bytes[at];
    if (block === 33) {
      at = skipSubBlocks(bytes, at + 2);
    } else if (block === 44) {
      if (at + 10 > bytes.length) break;
      width = Math.max(width, u16(bytes, at + 1) + u16(bytes, at + 5));
      height = Math.max(height, u16(bytes, at + 3) + u16(bytes, at + 7));
      const packed = bytes[at + 9];
      at += 10;
      if ((packed & 128) !== 0) at += 3 << (packed & 7) + 1;
      at = skipSubBlocks(bytes, at + 1);
    } else {
      break;
    }
  }
  return sized(width, height);
}
const sized = (width, height) => width > 0 && height > 0 ? { width, height } : null;
const be16 = (b, at) => b[at] << 8 | b[at + 1];
const be32 = (b, at) => (b[at] << 24 | b[at + 1] << 16 | b[at + 2] << 8 | b[at + 3]) >>> 0;
function pngSize(b) {
  if (b.length < 24 || !startsWith(b, 12, ascii("IHDR"))) return null;
  return sized(be32(b, 16), be32(b, 20));
}
function jpegSize(b) {
  let i = 2;
  while (i < b.length - 1) {
    if (b[i] !== 255) {
      i++;
      continue;
    }
    const marker = b[i + 1];
    if (marker === 255) {
      i++;
      continue;
    }
    if (marker === 0 || marker === 1 || marker >= 208 && marker <= 217) {
      i += 2;
      continue;
    }
    if (marker === 218) return null;
    if (i + 4 > b.length) return null;
    const length = be16(b, i + 2);
    if (length < 2) return null;
    if (marker >= 192 && marker <= 207 && marker !== 196 && marker !== 200 && marker !== 204) {
      return length >= 8 && i + 9 <= b.length ? sized(be16(b, i + 7), be16(b, i + 5)) : null;
    }
    i += 2 + length;
  }
  return null;
}
function imageSize(bytes) {
  switch (sniffImage(bytes)) {
    case "png":
      return pngSize(bytes);
    case "jpeg":
      return jpegSize(bytes);
    case "gif":
      return gifExtent(bytes);
    case "webp":
      return webpSize(bytes);
    default:
      return null;
  }
}
const QUALITIES = [0.85, 0.75, 0.65, 0.55, 0.45];
const MIME = { png: "image/png", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp" };
const fail = (error) => ({ ok: false, error });
function stillAttempts() {
  return [STILL_SIDE, STILL_FALLBACK_SIDE].flatMap((side) => QUALITIES.map((quality) => ({ side, quality })));
}
function fitSize(w, h, side) {
  const scale = Math.min(1, side / Math.max(w, h));
  return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
}
function checkInput(bytes) {
  if (!sniffImage(bytes)) return "type";
  return bytes.length > INPUT_MAX_BYTES ? "size" : null;
}
function checkDimensions(bytes) {
  const size2 = imageSize(bytes);
  if (!size2) return "type";
  return Math.max(size2.width, size2.height) > INPUT_MAX_SIDE ? "size" : null;
}
function checkAnimation(bytes, width, height) {
  return bytes.length > ANIM_MAX_BYTES || Math.max(width, height) > ANIM_MAX_SIDE ? "animSize" : null;
}
const nameFromFile = (fileName) => fileName.replace(/(.)\.[^.]*$/, "$1");
async function encodeStill(frame) {
  let canvas = null;
  for (const { side, quality } of stillAttempts()) {
    const size2 = fitSize(frame.displayWidth, frame.displayHeight, side);
    if (!canvas || canvas.width !== size2.width || canvas.height !== size2.height) {
      canvas = new OffscreenCanvas(size2.width, size2.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(frame, 0, 0, size2.width, size2.height);
    }
    const blob = await canvas.convertToBlob({ type: "image/webp", quality });
    if (blob.type === "image/webp" && blob.size <= STILL_MAX_BYTES) return new Uint8Array(await blob.arrayBuffer());
  }
  return null;
}
async function prepareEmote(file) {
  if (file.size > INPUT_MAX_BYTES) {
    return fail(sniffImage(new Uint8Array(await file.slice(0, 16).arrayBuffer())) ? "size" : "type");
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const bad = checkInput(bytes) ?? checkDimensions(bytes);
  if (bad) return fail(bad);
  const type = sniffImage(bytes);
  let decoder = null;
  let frame = null;
  try {
    decoder = new ImageDecoder({ data: bytes, type: MIME[type] });
    await Promise.all([decoder.tracks.ready, decoder.completed]);
    const frames = decoder.tracks.selectedTrack?.frameCount ?? 1;
    frame = (await decoder.decode({ frameIndex: 0 })).image;
    const animated = (type === "gif" || type === "webp") && frames > 1;
    if (animated) {
      const tooBig = checkAnimation(bytes, frame.displayWidth, frame.displayHeight);
      if (tooBig) return fail(tooBig);
    }
    const still = await encodeStill(frame);
    if (!still) return fail("detail");
    const name = nameFromFile(file.name);
    return { ok: true, file: animated ? { name, still, anim: bytes } : { name, still } };
  } catch {
    return fail("type");
  } finally {
    frame?.close();
    decoder?.close();
  }
}
function checkSound(head, size2, seconds) {
  if (!sniffAudio(head)) return "type";
  if (size2 > SOUND_MAX_BYTES) return "size";
  return seconds !== null && seconds > SOUND_MAX_S + 0.05 ? "long" : null;
}
async function prepareSound(file) {
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const early = checkSound(head, file.size, null);
  if (early) return { ok: false, error: early };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ctx = new OfflineAudioContext(1, 1, 44100);
  try {
    const decoded = await ctx.decodeAudioData(bytes.slice().buffer);
    const long = checkSound(head, bytes.length, decoded.duration);
    return long ? { ok: false, error: long } : { ok: true, bytes };
  } catch {
    return { ok: false, error: "type" };
  }
}
const MODIFIER_CODES = /* @__PURE__ */ new Set(["ControlLeft", "ControlRight", "AltLeft", "AltRight", "ShiftLeft", "ShiftRight", "MetaLeft", "MetaRight"]);
function evaluateKeyDown(e, rules) {
  if (e.repeat) return { kind: "ignore" };
  if (e.code === "Escape") return { kind: "cancel" };
  if (MODIFIER_CODES.has(e.code)) return { kind: "ignore" };
  const vk = codeToVk(e.code);
  if (vk === null) return { kind: "hint", hint: "hintUnusable" };
  if (rules.platform === "mac" && vk === 20) return { kind: "hint", hint: "hintUnusable" };
  if (rules.forbiddenVks?.includes(vk)) return { kind: "hint", hint: "hintNotTrigger" };
  const mods = rules.requireModifier ? eventMods(e) : 0;
  if (rules.requireModifier && (mods & HOTKEY_PRIMARY_MODS) === 0) return { kind: "hint", hint: "hintNeedModifier" };
  return { kind: "capture", mods, vk };
}
function KeyCapture(props) {
  const t = useText();
  const [listening, setListening] = reactExports.useState(props.autoListen === true);
  const [hint, setHint] = reactExports.useState(null);
  const buttonRef = reactExports.useRef(null);
  const listeningRef = reactExports.useRef(props.autoListen === true);
  reactExports.useEffect(() => {
    void api.setCapturing(listening);
  }, [listening]);
  reactExports.useEffect(() => () => void api.setCapturing(false), []);
  reactExports.useEffect(() => {
    if (!props.autoListen) return;
    const timer = setTimeout(() => buttonRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, []);
  const finish = (cancelled) => {
    const wasListening = listeningRef.current;
    listeningRef.current = false;
    setListening(false);
    setHint(null);
    if (cancelled && wasListening) props.onCancel?.();
  };
  const onKeyDown = (e) => {
    if (!listening) return;
    e.preventDefault();
    e.stopPropagation();
    const outcome = evaluateKeyDown(e, {
      platform: api.platform,
      requireModifier: props.requireModifier,
      forbiddenVks: props.forbiddenVks
    });
    switch (outcome.kind) {
      case "cancel":
        return finish(true);
      case "hint":
        return setHint(t[outcome.hint]);
      case "capture":
        finish(false);
        return props.onCapture({ mods: outcome.mods, vk: outcome.vk });
      case "ignore":
        return;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        ref: buttonRef,
        appearance: listening ? "outline" : "secondary",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EditRegular, {}),
        iconPosition: "after",
        onClick: () => {
          listeningRef.current = true;
          setListening(true);
        },
        onBlur: () => finish(true),
        onKeyDown,
        onKeyUp: (e) => {
          if (e.code === "Space") e.preventDefault();
        },
        children: listening ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc keyListen", children: hint ?? t.pressKey }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "keys", children: props.parts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: p }, p)) })
      }
    ),
    props.error ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: 200, style: { color: "var(--colorPaletteRedForeground1)" }, children: props.error }) : null
  ] });
}
const KEYBOARD = keyboardTriggers(api.platform);
function TriggerPicker({ value, onChange, offOption, blocked }) {
  const t = useText();
  const isCustom = typeof value === "object";
  const [choosingCustom, setChoosingCustom] = reactExports.useState(false);
  const showCustom = isCustom || choosingCustom;
  const selected = showCustom ? "custom" : value;
  const blockedKeys = blocked === void 0 ? [] : Array.isArray(blocked) ? blocked : [blocked];
  const isBlocked = (k) => blockedKeys.some((b) => sameTrigger(k, b));
  const blockedVks = blockedKeys.flatMap((b) => {
    const vk = triggerVk(b);
    return vk === null ? [] : [vk];
  });
  const forbiddenVks = [
    ...UNSAFE_TRIGGER_VKS,
    ...api.platform === "linux" ? [20] : [],
    ...blockedVks
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showCustom ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      KeyCapture,
      {
        parts: isCustom ? [vkLabel(value.vk, api.platform)] : [t.chooseKey],
        requireModifier: false,
        forbiddenVks,
        autoListen: choosingCustom,
        onCancel: () => setChoosingCustom(false),
        onCapture: (c) => {
          setChoosingCustom(false);
          onChange({ vk: c.vk });
        }
      },
      choosingCustom ? "choosing" : "idle"
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Dropdown,
      {
        style: { minWidth: 170 },
        value: showCustom ? t.customKey : value === "off" ? t.emoteKeyOff : triggerLabel(value, t.lang, api.platform),
        selectedOptions: [selected],
        onOptionSelect: (_, d) => {
          if (d.optionValue === "custom") {
            setChoosingCustom(true);
          } else if (d.optionValue) {
            setChoosingCustom(false);
            onChange(d.optionValue);
          }
        },
        children: [
          offOption ? /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: "off", text: t.emoteKeyOff, children: t.emoteKeyOff }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(OptionGroup, { label: t.keyboard, children: KEYBOARD.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: k, disabled: isBlocked(k), children: triggerLabel(k, t.lang, api.platform) }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(OptionGroup, { label: t.mouse, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Option, { value: "mouse4", text: t.mouse4, disabled: isBlocked("mouse4"), children: [
              t.mouse4,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc inline", children: t.mouseBack })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Option, { value: "mouse5", text: t.mouse5, disabled: isBlocked("mouse5"), children: [
              t.mouse5,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc inline", children: t.mouseForward })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: "custom", text: t.customKeyMenu, children: t.customKeyMenu })
        ]
      }
    )
  ] });
}
const STAGE_PX = 88;
const ART_PX = 44;
const LOOP_MS = EMOTE_DURATION_S * 1e3 + 400;
function FxPicker({ target, onPick, onClose }) {
  const t = useText();
  const panel = reactExports.useRef(null);
  const [pos, setPos] = reactExports.useState({ left: target.x, top: target.y });
  const [tick, setTick] = reactExports.useState(0);
  reactExports.useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      left: Math.min(Math.max(8, target.x), window.innerWidth - r.width - 8),
      top: Math.min(Math.max(8, target.y), window.innerHeight - r.height - 8)
    });
  }, [target]);
  reactExports.useEffect(() => {
    const away = (e) => {
      if (!panel.current?.contains(e.target)) onClose();
    };
    const key = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", away);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("mousedown", away);
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);
  reactExports.useEffect(() => {
    const iv = setInterval(() => setTick((n) => n + 1), LOOP_MS);
    return () => clearInterval(iv);
  }, []);
  const pick = (fx) => {
    onPick(target.id, fx);
    onClose();
  };
  const tiles = [];
  for (let v = 0; v < EMOTE_FX_VARIANTS; v++) {
    const fx = v === 0 ? void 0 : v;
    tiles.push(
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `fxCell${(target.fx ?? 0) === v ? " current" : ""}`, onClick: () => pick(fx), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FxStage, { v, url: target.url, tick }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fxName", children: t.fxNames[v] })
      ] }, v)
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: panel, className: "fxPicker", "aria-label": t.fxMenuTitle, style: { left: pos.left, top: pos.top }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fxPickerTitle", children: t.fxMenuTitle }),
    tiles
  ] });
}
function FxStage({ v, url, tick }) {
  const stage = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const root = document.createElement("div");
    root.className = "emote";
    root.style.left = "50%";
    root.style.top = "50%";
    root.style.setProperty("--size", `${ART_PX}px`);
    root.style.setProperty("--dur", `${EMOTE_DURATION_S}s`);
    root.append(emoteFxContent(v, url));
    el.replaceChildren(root);
  }, [v, url, tick]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fxStage", style: { width: STAGE_PX, height: STAGE_PX }, ref: stage, "aria-hidden": true });
}
const SIZE = 300;
const C = SIZE / 2;
const R_IN = 52;
const R_OUT = 146;
const R_ICON = 100;
const GAP = 0.035;
const pt = (r, a) => `${C + r * Math.sin(a)},${C - r * Math.cos(a)}`;
const wedgePath = (i) => {
  const a0 = (i - 0.5) * Math.PI / 4 + GAP;
  const a1 = (i + 0.5) * Math.PI / 4 - GAP;
  return `M${pt(R_IN, a0)} A${R_IN},${R_IN} 0 0 1 ${pt(R_IN, a1)} L${pt(R_OUT, a1)} A${R_OUT},${R_OUT} 0 0 0 ${pt(R_OUT, a0)}Z`;
};
const activate = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};
function WheelEditor({
  wheel,
  center,
  centerOn,
  trigger,
  pool,
  defaults,
  labels,
  poolExtra,
  onDropFiles,
  onFxPick,
  fxIds,
  fxFor,
  onChange,
  onPreview
}) {
  const t = useText();
  const [picked, setPicked] = reactExports.useState(null);
  const [hot, setHot] = reactExports.useState(null);
  const [filesOver, setFilesOver] = reactExports.useState(false);
  const [fxPicker, setFxPicker] = reactExports.useState(null);
  const drag = reactExports.useRef(null);
  const isFxPickable = (id) => fxIds?.includes(id) ?? false;
  const openFx = (id, e) => {
    if (!onFxPick || !isFxPickable(id)) return;
    e.preventDefault();
    setPicked(null);
    setFxPicker({ id, x: e.clientX, y: e.clientY, url: icon(id) ?? "", fx: fxFor?.(id) });
  };
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setPicked(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const apply = (src, target) => {
    const patch = dropPatch(wheel, center, src, target);
    if (patch) onChange(patch);
    setPicked(null);
  };
  const clickTarget = (target, here) => {
    if (picked) apply(picked, target);
    else setPicked(here);
  };
  const dragProps = (src) => ({
    draggable: true,
    onDragStart: (e) => {
      drag.current = src;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", src.id);
    },
    onDragEnd: () => {
      drag.current = null;
      setHot(null);
    }
  });
  const dropProps = (target) => ({
    onDragOver: (e) => {
      if (!drag.current) return;
      e.preventDefault();
      setHot(target);
    },
    onDragLeave: () => setHot((h) => h === target ? null : h),
    onDrop: (e) => {
      e.preventDefault();
      setHot(null);
      if (drag.current) apply(drag.current, target);
      drag.current = null;
    }
  });
  const takesFiles = (e) => onDropFiles !== void 0 && !drag.current && e.dataTransfer.types.includes("Files");
  const fileDropProps = {
    onDragOver: (e) => {
      if (!takesFiles(e)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      setFilesOver(true);
    },
    onDragLeave: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFilesOver(false);
    },
    onDrop: (e) => {
      setFilesOver(false);
      if (!takesFiles(e)) return;
      e.preventDefault();
      onDropFiles?.([...e.dataTransfer.files]);
    }
  };
  const fxTip = isFxPickable(center) || pool.some((p) => isFxPickable(p.id));
  const byId = new Map(pool.map((p) => [p.id, p]));
  const name = (id) => byId.get(id)?.name ?? "?";
  const icon = (id) => byId.get(id)?.icon;
  const isPicked = (match) => picked !== null && match(picked) ? " picked" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card wheelEditor", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "weHead", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        labels.title,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: labels.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            setPicked(null);
            onChange({ wheel: [...defaults.wheel], center: defaults.center });
          },
          children: t.wheelReset
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "weBody", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "weWheel", style: { width: SIZE, height: SIZE }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: `0 0 ${SIZE} ${SIZE}`, width: SIZE, height: SIZE, children: wheel.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: wedgePath(i),
            className: `weWedge${hot === i ? " hot" : ""}`,
            ...dropProps(i),
            onClick: () => clickTarget(i, { from: "slot", id, slot: i })
          },
          i
        )) }),
        wheel.map((id, i) => {
          const a = i * Math.PI / 4;
          const label = t.wheelSlotLabel(t.slotNames[i], name(id));
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": label,
              title: label,
              className: `weSlot${hot === i ? " hot" : ""}${isPicked((p) => p.from === "slot" && p.slot === i)}`,
              style: { left: C + R_ICON * Math.sin(a), top: C - R_ICON * Math.cos(a) },
              ...dragProps({ from: "slot", id, slot: i }),
              ...dropProps(i),
              onClick: () => clickTarget(i, { from: "slot", id, slot: i }),
              onKeyDown: activate(() => clickTarget(i, { from: "slot", id, slot: i })),
              onContextMenu: (e) => openFx(id, e),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon(id), alt: "" }, id)
            },
            i
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-label": t.wheelCenterLabel(trigger, name(center)),
            title: t.wheelCenterLabel(trigger, name(center)),
            className: `weCenter${hot === "center" ? " hot" : ""}${centerOn ? "" : " off"}${isPicked((p) => p.from === "center")}`,
            ...dragProps({ from: "center", id: center }),
            ...dropProps("center"),
            onClick: () => clickTarget("center", { from: "center", id: center }),
            onKeyDown: activate(() => clickTarget("center", { from: "center", id: center })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon(center), alt: "" }, center),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.wheelCenter })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `wePool${filesOver ? " filesOver" : ""}`, ...fileDropProps, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wePoolTitle", children: labels.poolTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: labels.poolDesc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weTiles", children: pool.map((p) => {
          const slot = wheel.indexOf(p.id);
          const pick = () => {
            onPreview(p.id);
            setPicked((cur) => cur?.from === "pool" && cur.id === p.id ? null : { from: "pool", id: p.id });
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `weCell${p.onRemove ? " removable" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "button",
                tabIndex: 0,
                className: `weTile${isPicked((s) => s.from === "pool" && s.id === p.id)}`,
                ...dragProps({ from: "pool", id: p.id }),
                onClick: pick,
                onKeyDown: activate(pick),
                onContextMenu: (e) => openFx(p.id, e),
                children: [
                  p.badge ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weNew", children: p.badge }) : null,
                  slot >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weWhere", children: t.slotNames[slot] }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.icon, alt: "" }),
                  p.name
                ]
              }
            ),
            p.tool ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `weTool${p.tool.on ? " on" : ""}`,
                "aria-label": p.tool.label,
                title: p.tool.label,
                onClick: p.tool.onClick,
                children: p.tool.icon
              }
            ) : null,
            p.onRemove ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "weRemove",
                "aria-label": t.removeImage(p.name),
                title: t.removeImage(p.name),
                onClick: p.onRemove,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(DismissRegular, {})
              }
            ) : null
          ] }, p.id);
        }) }),
        poolExtra
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weHint", "aria-live": "polite", children: picked ? t.wheelPickHint(name(picked.id)) : fxTip ? t.fxHint : " " }),
    fxPicker && onFxPick ? /* @__PURE__ */ jsxRuntimeExports.jsx(FxPicker, { target: fxPicker, onPick: onFxPick, onClose: () => setFxPicker(null) }) : null
  ] });
}
const ACCEPT = "image/png,image/jpeg,image/gif,image/webp";
const ACCEPT_SOUND = "audio/mpeg,audio/ogg,audio/wav,.mp3,.ogg,.wav";
function importMessage(t, error, file) {
  switch (error) {
    case "type":
      return t.importErrType(file);
    case "size":
      return t.importErrSize(file);
    case "animSize":
      return t.importErrAnimSize(file);
    case "detail":
      return t.importErrDetail(file);
    case "full":
      return t.importErrFull;
    case "duplicate":
      return t.importErrDuplicate(file);
    default:
      return t.importErrDisk(file);
  }
}
function soundMessage(t, error, file) {
  switch (error) {
    case "type":
      return t.soundErrType(file);
    case "size":
      return t.soundErrSize(file);
    case "long":
      return t.soundErrLong(file);
    default:
      return t.importErrDisk(file);
  }
}
async function soundFile(id, file) {
  try {
    const prepared = await prepareSound(file);
    if (!prepared.ok) return prepared.error;
    const result = await api.setEmoteSound(id, prepared.bytes);
    return result.ok ? null : result.error;
  } catch {
    return "disk";
  }
}
async function importFile(file) {
  try {
    const prepared = await prepareEmote(file);
    if (!prepared.ok) return prepared.error;
    const result = await api.importEmote(prepared.file);
    return result.ok ? null : result.error;
  } catch {
    return "disk";
  }
}
function useImports(t) {
  const [busy, setBusy] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState([]);
  const queue = reactExports.useRef(Promise.resolve());
  reactExports.useEffect(() => {
    const refuse = (e) => {
      if (e.defaultPrevented || !e.dataTransfer?.types.includes("Files")) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "none";
    };
    window.addEventListener("dragover", refuse);
    window.addEventListener("drop", refuse);
    return () => {
      window.removeEventListener("dragover", refuse);
      window.removeEventListener("drop", refuse);
    };
  }, []);
  const importFiles = (files) => {
    if (files.length === 0) return;
    queue.current = queue.current.then(async () => {
      setBusy(true);
      const batch = [];
      for (const file of files) {
        const error = await importFile(file);
        if (error) batch.push(importMessage(t, error, file.name));
        setErrors([...batch]);
      }
      setBusy(false);
    });
  };
  const importSound = (id, file) => {
    queue.current = queue.current.then(async () => {
      setBusy(true);
      const error = await soundFile(id, file);
      setErrors(error ? [soundMessage(t, error, file.name)] : []);
      setBusy(false);
    });
  };
  return { busy, errors, importFiles, importSound, clearErrors: () => setErrors([]) };
}
function emotePatch(p) {
  const patch = {};
  if (p.wheel) patch.emoteWheel = p.wheel;
  if (p.center) patch.clickEmoteId = p.center;
  return patch;
}
function EmoteSection({ settings: s, update, lengthUnit }) {
  const t = useText();
  const [keyError, setKeyError] = reactExports.useState(null);
  const keys = JSON.stringify([s.trigger, s.emoteTrigger, s.toggleHotkey]);
  reactExports.useEffect(() => setKeyError(null), [keys]);
  const keyOff = s.emoteTrigger === "off";
  const askKey = separateAskKey(s);
  const custom = typeof s.emoteTrigger === "object";
  const key = s.emoteTrigger === "off" ? t.emoteKey : triggerLabel(s.emoteTrigger, t.lang, api.platform);
  const { busy, errors, importFiles, importSound, clearErrors } = useImports(t);
  const picker = reactExports.useRef(null);
  const soundPicker = reactExports.useRef(null);
  const soundFor = reactExports.useRef(null);
  const soundTool = (c) => c.sound ? {
    label: t.removeSound(c.name),
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Speaker2Regular, {}),
    on: true,
    onClick: () => {
      clearErrors();
      void api.setEmoteSound(c.id, null);
    }
  } : {
    label: t.addSound(c.name),
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SpeakerMuteRegular, {}),
    on: false,
    onClick: () => {
      soundFor.current = c.id;
      soundPicker.current?.click();
    }
  };
  const pool = [
    ...EMOTE_CATALOG.map((e) => ({ id: e.slug, icon: emoteIconUrl(e.slug), name: emoteName(e.slug, t.lang, s.customEmotes) })),
    ...s.customEmotes.map((c) => ({
      id: c.id,
      icon: customStillUrl(customHash(c.id)),
      name: c.name,
      tool: soundTool(c),
      onRemove: () => {
        clearErrors();
        void api.removeEmote(c.id);
      }
    }))
  ];
  const importer = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "weImport", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "weImportRow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "tiny" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImageAdd24Regular, {}), disabled: busy, onClick: () => picker.current?.click(), children: t.addImage }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.yourImages(s.customEmotes.length, MAX_CUSTOM_EMOTES) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.addImageDesc }),
    errors.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weImportError", role: "alert", children: e }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: picker,
        type: "file",
        accept: ACCEPT,
        multiple: true,
        hidden: true,
        onChange: (e) => {
          const files = [...e.target.files ?? []];
          e.target.value = "";
          importFiles(files);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: soundPicker,
        type: "file",
        accept: ACCEPT_SOUND,
        hidden: true,
        onChange: (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file && soundFor.current) importSound(soundFor.current, file);
        }
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Emoji24Regular, {}),
        title: t.emoteKey,
        description: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          keyOff ? t.emoteKeyOffDesc : t.emoteKeyDesc,
          custom ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.customKeyNote }) : null
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriggerPicker,
          {
            value: s.emoteTrigger,
            offOption: true,
            blocked: [s.trigger, ...askKey ? [askKey] : []],
            onChange: (k) => void update({ emoteTrigger: k }).then((r) => setKeyError(r.ok ? null : r.error))
          }
        )
      }
    ),
    keyError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rowError", role: "alert", children: keyError }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CursorClick24Regular, {}),
        title: t.emoteClick(key),
        description: t.emoteClickDesc(key),
        checked: s.emoteClick,
        onChange: (v) => void update({ emoteClick: v }),
        dim: keyOff
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderRow,
      {
        limit: "emoteSizePx",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ResizeLarge24Regular, {}),
        title: t.emoteSize,
        value: s.emoteSizePx,
        format: (v) => `${v} ${lengthUnit}`,
        onChange: (v) => void update({ emoteSizePx: v }),
        dim: keyOff
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Speaker224Regular, {}),
        title: t.emoteSound,
        description: t.emoteSoundDesc,
        checked: s.emoteSound,
        onChange: (v) => void update({ emoteSound: v }),
        dim: keyOff
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WheelEditor,
      {
        wheel: s.emoteWheel,
        center: s.clickEmoteId,
        centerOn: s.emoteClick && !keyOff,
        trigger: key,
        pool,
        poolExtra: importer,
        onDropFiles: importFiles,
        onFxPick: (id, fx) => void api.setEmoteFx(id, fx),
        fxIds: s.customEmotes.map((c) => c.id),
        fxFor: (id) => s.customEmotes.find((c) => c.id === id)?.fx,
        defaults: { wheel: DEFAULT_EMOTE_WHEEL, center: DEFAULT_CLICK_EMOTE },
        labels: { title: t.emoteWheelTitle, desc: t.emoteWheelDesc(key), poolTitle: t.allEmotes, poolDesc: t.allEmotesDesc },
        onChange: (patch) => void update(emotePatch(patch)),
        onPreview: (ref) => void api.previewEmote(ref)
      }
    )
  ] });
}
const EDITOR_INTENTS = ["omw", "danger"];
const same = (a, b) => a.toLowerCase() === b.toLowerCase();
function moveRule(rules, index, by) {
  const to = index + by;
  if (index < 0 || index >= rules.length || to < 0 || to >= rules.length) return [...rules];
  const next = [...rules];
  [next[index], next[to]] = [next[to], next[index]];
  return next;
}
function addRule(rules, app, profile) {
  const name = app.trim();
  if (name === "" || rules.length >= MAX_RULES) return [...rules];
  return [...rules, { app: name, titleContains: "", intents: [], profile }];
}
function editorRules(editors, rules, agent) {
  if (agent === null) return { kind: "noAgent" };
  if (editors.length === 0) return { kind: "noEditors" };
  const next = [...rules];
  for (const app of editors) {
    if (next.length >= MAX_RULES) break;
    if (next.some((r) => same(r.app, app))) continue;
    next.push({ app, titleContains: "", intents: [...EDITOR_INTENTS], profile: agent });
  }
  const added = next.length - rules.length;
  return added === 0 ? { kind: "exists" } : { kind: "added", rules: next, added };
}
function firstRunSteps(platform2, screenAccess) {
  return platform2 === "mac" && screenAccess === false ? ["askKey", "profile", "screen", "done"] : ["askKey", "profile", "done"];
}
function wordsHow(t, askKey) {
  if (t.askClick) return "click";
  return t.askDoubleTap && canDoubleTap(askKey) ? "doubleTap" : null;
}
class TeammateChanges {
  constructor(start, send) {
    this.send = send;
    this.latest = start;
    this.known.add(start);
  }
  send;
  latest;
  tail = Promise.resolve();
  /** Settings this chain started from or got back: a render with one it has since moved past is not news. */
  known = /* @__PURE__ */ new WeakSet();
  /** The settings the card rendered with: newer ones from elsewhere are built on from now on. */
  seen(t) {
    if (this.known.has(t)) return;
    this.latest = t;
  }
  change(c) {
    const run = this.tail.then(async () => {
      const p = typeof c === "function" ? c(this.latest) : c;
      if (!p) return;
      const r = await this.send({ ...this.latest, ...p });
      this.known.add(r.settings.teammate);
      this.latest = r.settings.teammate;
    });
    this.tail = run.catch(() => void 0);
    return run;
  }
}
const TIMEOUT_MIN_MINUTES = 1;
const TIMEOUT_MAX_MINUTES = 30;
const CUSTOM_COMMAND = "my-agent";
function newAgentProfile(o) {
  const preset = o.preset === "custom" ? null : AGENT_PRESETS[o.preset];
  return {
    id: o.id,
    kind: "agent",
    name: preset ? preset.name : o.customName,
    tagColor: o.tagColor,
    tagColorCustom: null,
    preset: o.preset,
    command: preset ? preset.bin : CUSTOM_COMMAND,
    customArgs: preset ? [] : ["{prompt}"],
    folder: { kind: "editor", folders: [] },
    timeoutS: TIMEOUT_DEFAULT_S
  };
}
function defaultAfterAdd(current, added) {
  return current ?? (added.kind === "agent" && added.preset === "custom" ? null : added.id);
}
const clampMinutes = (m) => Math.min(TIMEOUT_MAX_MINUTES, Math.max(TIMEOUT_MIN_MINUTES, Math.round(m)));
const timeoutMinutes = (seconds) => clampMinutes(seconds / 60);
const timeoutSeconds = (minutes) => Number.isFinite(minutes) ? clampMinutes(minutes) * 60 : TIMEOUT_DEFAULT_S;
function withFolder(folders, path) {
  const full = folders.length >= MAX_FOLDERS;
  return full || path === "" || path.length > PATH_MAX || folders.includes(path) ? [...folders] : [...folders, path];
}
function agentNotes(preset) {
  if (preset === "custom") return [];
  const p = AGENT_PRESETS[preset];
  const notes = [{ kind: "approvals", approvals: p.approvals }];
  if (!p.checked) notes.push({ kind: "untested" });
  if (p.mcp === "user") notes.push({ kind: "addMcp", file: p.userConfig ?? null, bin: p.bin });
  if (preset === "dsh") notes.push({ kind: "dsh" });
  return notes;
}
function Swatches({ label, color, onPick }) {
  const t = useText();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swatches", role: "radiogroup", "aria-label": label, children: TAG_COLORS.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": color === i,
      "aria-label": t.roomColorLabel(i + 1),
      className: `swatch${color === i ? " sel" : ""}`,
      style: { background: c },
      onClick: () => onPick(i)
    },
    c
  )) });
}
function DraftInput({ value, onSave, maxLength, placeholder, width }) {
  const [draft, setDraft] = reactExports.useState(value);
  reactExports.useEffect(() => setDraft(value), [value]);
  const save = () => {
    if (draft !== value) onSave(draft);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      value: draft,
      maxLength,
      placeholder,
      style: { width: width ?? 260 },
      onChange: (_, d) => setDraft(d.value),
      onBlur: save,
      onKeyDown: (e) => e.key === "Enter" && save()
    }
  );
}
function linesOf(text2) {
  const body = text2.replace(/(\r?\n)+$/, "");
  return body === "" ? [] : body.split(/\r?\n/);
}
function CheckResult({ r }) {
  const t = useText();
  const m = t.teammate.settings;
  if (r.ok) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.agentFound(r.version) });
  const text2 = r.reason === "notFound" ? m.agentNotFound : r.reason === "timeout" ? m.agentCheckTimeout : m.agentCheckFailed(r.detail);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weImportError", children: text2 });
}
function FolderRows({ p, onChange }) {
  const t = useText();
  const m = t.teammate.settings;
  const [mode, setMode] = reactExports.useState(p.folder.kind);
  reactExports.useEffect(() => setMode(p.folder.kind), [p.folder.kind]);
  const fixed = p.folder.kind === "fixed" ? p.folder.path : "";
  const folders = p.folder.kind === "editor" ? p.folder.folders : [];
  const browse = async () => api.pickTeammateFolder();
  const pickFixed = async () => {
    const path = await browse();
    if (path !== null) onChange({ folder: { kind: "fixed", path } });
  };
  const addFolder = async () => {
    const path = await browse();
    if (path !== null) onChange({ folder: { kind: "editor", folders: withFolder(folders, path) } });
  };
  const choose = (next) => {
    setMode(next);
    if (next === "editor" && p.folder.kind !== "editor") onChange({ folder: { kind: "editor", folders: [] } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.agentFolder }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateStack", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        RadioGroup,
        {
          layout: "horizontal",
          value: mode,
          "aria-label": m.agentFolder,
          onChange: (_, d) => choose(d.value === "fixed" ? "fixed" : "editor"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "fixed", label: m.agentFolderFixed }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "editor", label: m.agentFolderEditor })
          ]
        }
      ),
      mode === "fixed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: fixed ? "matePath" : "desc", children: fixed || m.agentFolderNone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void pickFixed(), children: m.browse })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.agentFolderEditorDesc }),
        folders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.agentFoldersEmpty }) : null,
        folders.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "matePath", children: f }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "small",
              appearance: "subtle",
              "aria-label": m.removeFolderLabel(f),
              onClick: () => onChange({ folder: { kind: "editor", folders: folders.filter((x) => x !== f) } }),
              children: m.removeFolder
            }
          )
        ] }, f)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mateRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void addFolder(), children: m.addFolder }) })
      ] })
    ] })
  ] });
}
function AgentNotes({ p }) {
  const t = useText();
  const m = t.teammate.settings;
  const [copied, setCopied] = reactExports.useState(false);
  const copy = async () => {
    const snippet = await api.getTeammateAgentSnippet(p.id);
    if (snippet === null) return;
    try {
      await navigator.clipboard.writeText(snippet.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: agentNotes(p.preset).map((n) => {
    switch (n.kind) {
      case "approvals":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc mateNote", children: m.agentApprovals[n.approvals] }, n.kind);
      case "untested":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc mateNote", children: m.agentUntested }, n.kind);
      case "dsh":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc mateNote", children: m.agentDsh }, n.kind);
      case "addMcp":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow mateNote", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: n.file !== null ? m.agentAddMcpFile(n.file) : m.agentAddMcpCommand(n.bin) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => void copy(), children: copied ? m.agentSnippetCopied : m.agentCopySnippet })
        ] }, n.kind);
    }
  }) });
}
function AgentProfileCard({ p, open, onChange, onRemove }) {
  const t = useText();
  const m = t.teammate.settings;
  const preset = p.preset === "custom" ? null : AGENT_PRESETS[p.preset];
  const [checking, setChecking] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [commandReset, setCommandReset] = reactExports.useState(0);
  const saved = p.customArgs.join("\n");
  const [args, setArgs] = reactExports.useState(saved);
  reactExports.useEffect(() => setArgs(saved), [saved]);
  reactExports.useEffect(() => setResult(null), [p.command]);
  const check = async () => {
    setChecking(true);
    setResult(await api.checkTeammateAgent(p.id));
    setChecking(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExpanderRow,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Code24Regular, {}),
      title: p.name || preset?.name || m.agentCustom,
      defaultOpen: open,
      description: `${preset?.name ?? m.agentCustom} · ${p.command}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "expPane", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateFields", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.profileName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DraftInput, { value: p.name, maxLength: 60, onSave: (name) => onChange({ name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.tagColor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Swatches,
            {
              label: m.tagColor,
              color: p.tagColorCustom ? -1 : p.tagColor,
              onPick: (i) => onChange({ tagColor: i, tagColorCustom: null })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.agentCommand }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DraftInput, { value: p.command, maxLength: 1024, width: 300, onSave: (v) => {
              if (v.trim() === "") setCommandReset((n) => n + 1);
              else onChange({ command: v.trim() });
            } }, commandReset),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: checking, onClick: () => void check(), children: checking ? m.checking : m.agentCheck }),
            result ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckResult, { r: result }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.agentCheckDesc })
          ] }),
          preset === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.agentArgs }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateStack", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: args,
                  resize: "vertical",
                  rows: 3,
                  "aria-label": m.agentArgs,
                  style: { width: "100%", fontFamily: "monospace" },
                  onChange: (_, d) => setArgs(d.value),
                  onBlur: () => {
                    const lines = linesOf(args);
                    if (lines.join("\n") !== saved) onChange({ customArgs: lines });
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.agentArgsDesc })
            ] })
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderRows, { p, onChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.agentTimeout }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SpinButton,
              {
                min: 1,
                max: 30,
                step: 1,
                value: timeoutMinutes(p.timeoutS),
                style: { width: 90 },
                "aria-label": m.agentTimeout,
                onChange: (_, d) => {
                  const minutes = d.value ?? Number(d.displayValue);
                  if (Number.isFinite(minutes)) onChange({ timeoutS: timeoutSeconds(minutes) });
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.agentTimeoutUnit })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AgentNotes, { p }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mateRow mateNote", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "subtle", onClick: onRemove, children: m.removeProfile }) })
      ] })
    }
  );
}
const everywhere = (path) => ({ win: path, mac: path, linux: path });
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
function ConnectApps() {
  const t = useText();
  const m = t.teammate.settings;
  const [copied, setCopied] = reactExports.useState(null);
  const [failed, setFailed] = reactExports.useState(null);
  const copy = async (id) => {
    setCopied(null);
    setFailed(null);
    const snippet = await api.getTeammateConnectSnippet(id);
    try {
      if (snippet === null) throw new Error("no snippet");
      await navigator.clipboard.writeText(snippet.text);
      setCopied(id);
    } catch {
      setFailed(id);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: null, title: m.connectTitle, description: m.connectDesc, children: null }),
    CONNECT_APPS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: null, title: m.connectName[a.id], description: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "matePath", children: a.file ? a.file[api.platform] : m.connectPage[a.page] }),
      failed === a.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weImportError", children: m.connectFailed }) : null
    ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", "aria-label": m.connectCopyLabel(m.connectName[a.id]), onClick: () => void copy(a.id), children: copied === a.id ? m.connectCopied : m.connectCopy }) }, a.id))
  ] });
}
function uniqueApps(...lists) {
  const seen = /* @__PURE__ */ new Set();
  return lists.flat().filter((a) => {
    const key = a.toLowerCase();
    if (a === "" || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function AppField({ value, suggestions, onSave }) {
  const t = useText();
  const [draft, setDraft] = reactExports.useState(value);
  reactExports.useEffect(() => setDraft(value), [value]);
  const commit = (v) => {
    const next = v.trim();
    if (next === "") setDraft(value);
    else if (next !== value) onSave(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Combobox,
    {
      freeform: true,
      value: draft,
      placeholder: t.teammate.settings.ruleAppPlaceholder,
      style: { width: 260 },
      "aria-label": t.teammate.settings.ruleApp,
      selectedOptions: [value],
      maxLength: 200,
      onChange: (e) => setDraft(e.target.value),
      onBlur: () => commit(draft),
      onOptionSelect: (_, d) => {
        if (!d.optionValue) return;
        setDraft(d.optionValue);
        commit(d.optionValue);
      },
      children: suggestions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: a, children: a }, a))
    }
  );
}
function RuleRow({ rule, index, count, profiles, suggestions, change, move, remove }) {
  const t = useText();
  const m = t.teammate.settings;
  const profile = profiles.find((p) => p.id === rule.profile);
  const pings = rule.intents.length === 0 ? m.ruleAllPings : rule.intents.map((id) => t.pingNames[id]).join(t.teammate.ui.listSep);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRule", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateHead", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: rule.app }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "small",
          appearance: "subtle",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp16Regular, {}),
          disabled: index === 0,
          "aria-label": m.ruleUp(rule.app),
          title: m.ruleUp(rule.app),
          onClick: () => move(-1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "small",
          appearance: "subtle",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown16Regular, {}),
          disabled: index === count - 1,
          "aria-label": m.ruleDown(rule.app),
          title: m.ruleDown(rule.app),
          onClick: () => move(1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", appearance: "subtle", "aria-label": m.ruleRemoveLabel(rule.app), onClick: remove, children: m.ruleRemove })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateFields", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.ruleApp }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppField, { value: rule.app, suggestions, onSave: (app) => change({ app }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.ruleTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DraftInput,
        {
          value: rule.titleContains,
          maxLength: 200,
          placeholder: m.ruleTitlePlaceholder,
          onSave: (titleContains) => change({ titleContains: titleContains.trim() })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.rulePings }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Dropdown,
        {
          multiselect: true,
          style: { minWidth: 260 },
          value: pings,
          selectedOptions: rule.intents,
          "aria-label": m.rulePings,
          onOptionSelect: (_, d) => change({ intents: d.selectedOptions.filter(isPingId) }),
          children: ALL_PINGS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: p.id, text: t.pingNames[p.id], children: t.pingNames[p.id] }, p.id))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.ruleProfile }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Dropdown,
        {
          style: { minWidth: 260 },
          value: profile?.name ?? m.noProfile,
          selectedOptions: [rule.profile],
          "aria-label": m.ruleProfile,
          onOptionSelect: (_, d) => d.optionValue && change({ profile: d.optionValue }),
          children: profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: p.id, text: p.name, children: p.name }, p.id))
        }
      )
    ] })
  ] });
}
function RulesCard({ s, patch }) {
  const t = useText();
  const m = t.teammate.settings;
  const [recent, setRecent] = reactExports.useState([]);
  const [editors, setEditors] = reactExports.useState([]);
  const [draft, setDraft] = reactExports.useState("");
  const [note, setNote] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const load = () => void api.getTeammateRecentApps().then(setRecent);
    load();
    void api.getTeammateEditors().then(setEditors);
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);
  const suggestions = uniqueApps(recent, editors);
  const agent = s.profiles.find((p) => p.kind === "agent")?.id ?? null;
  const fallback = s.defaultProfile ?? s.profiles[0]?.id ?? null;
  const setRules = (rules) => {
    setNote(null);
    patch({ rules });
  };
  const suggest = async () => {
    const found = await api.getTeammateEditors();
    setEditors(found);
    const r = editorRules(found, s.rules, agent);
    if (r.kind === "added") {
      patch({ rules: r.rules });
      setNote(m.ruleSuggestAdded(r.added));
    } else {
      setNote(r.kind === "noAgent" ? m.ruleSuggestNoAgent : r.kind === "noEditors" ? m.ruleSuggestNoEditors : m.ruleSuggestExists);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExpanderRow,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AppsListDetail24Regular, {}),
      title: m.rules,
      description: s.rules.length === 0 ? `${m.rulesDesc} ${m.rulesEmpty}` : m.rulesDesc,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "expPane", children: [
        s.rules.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RuleRow,
          {
            rule: r,
            index: i,
            count: s.rules.length,
            profiles: s.profiles,
            suggestions,
            change: (p) => setRules(s.rules.map((x, j) => j === i ? { ...x, ...p } : x)),
            move: (by) => setRules(moveRule(s.rules, i, by)),
            remove: () => setRules(s.rules.filter((_, j) => j !== i))
          },
          i
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRule", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Combobox,
              {
                freeform: true,
                value: draft,
                placeholder: m.ruleAppPlaceholder,
                style: { width: 260 },
                "aria-label": m.ruleApp,
                selectedOptions: [],
                maxLength: 200,
                onChange: (e) => setDraft(e.target.value),
                onOptionSelect: (_, d) => d.optionValue && setDraft(d.optionValue),
                children: suggestions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: a, children: a }, a))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: draft.trim() === "" || fallback === null, onClick: () => {
              if (fallback === null) return;
              setRules(addRule(s.rules, draft, fallback));
              setDraft("");
            }, children: m.ruleAdd }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void suggest(), children: m.ruleSuggest })
          ] }),
          note ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", role: "status", children: note }) : null
        ] })
      ] })
    }
  );
}
const INSTRUCTIONS_MAX = 2e3;
const KEEP_DAYS = [7, 30, 90, 365, null];
const KEY_MAX = 4096;
const ASK_KEYS = ["win", "alt", "ctrl", "shift", "mouse5", "mouse4"];
const newProfileId = () => `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
function ProfileCard({ p, open, onChange, onRemove }) {
  const t = useText();
  const m = t.teammate.settings;
  const provider = PROVIDERS.find((x) => x.id === p.provider);
  const [hasKey, setHasKey] = reactExports.useState(false);
  const [key, setKey] = reactExports.useState("");
  const [keyError, setKeyError] = reactExports.useState(null);
  const [checking, setChecking] = reactExports.useState(false);
  const [check, setCheck] = reactExports.useState(null);
  const [models, setModels] = reactExports.useState([]);
  const [model, setModel] = reactExports.useState(p.model);
  reactExports.useEffect(() => setModel(p.model), [p.model]);
  reactExports.useEffect(() => {
    void api.hasTeammateKey(p.id).then(setHasKey);
  }, [p.id]);
  const saveKey = async (value) => {
    const r = await api.setTeammateKey(p.id, value);
    setKeyError(r.ok ? null : m.keyUnavailable);
    if (r.ok) setKey("");
    setHasKey(await api.hasTeammateKey(p.id));
  };
  const checkKey = async () => {
    setChecking(true);
    const r = await api.checkTeammateKey(p.id);
    setChecking(false);
    if (r.ok) {
      setModels(r.models);
      setCheck({ ok: true, text: m.checkOk(r.models.length) });
    } else {
      const line = r.error === "auth" ? m.checkAuth : r.error === "network" ? m.checkNetwork : m.checkOther;
      setCheck({ ok: false, text: r.message && r.message !== line ? `${line} ${r.message}` : line });
    }
  };
  const keyless = !needsKey(p);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExpanderRow,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot24Regular, {}),
      title: p.name || provider?.name,
      defaultOpen: open,
      description: [provider?.name, p.model].filter(Boolean).join(" · "),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "expPane", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateFields", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.profileName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DraftInput, { value: p.name, maxLength: 60, onSave: (name) => onChange({ name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.baseUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DraftInput,
            {
              value: p.baseUrl,
              maxLength: 2048,
              width: 360,
              onSave: (baseUrl) => onChange({ baseUrl: baseUrl.trim() })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.key }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                autoComplete: "off",
                value: key,
                maxLength: KEY_MAX,
                style: { width: 260 },
                placeholder: hasKey ? m.keySavedPlaceholder : keyless ? m.keyNotNeeded : m.keyPlaceholder,
                onChange: (_, d) => setKey(d.value),
                onKeyDown: (e) => e.key === "Enter" && key.trim() && void saveKey(key)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !key.trim(), onClick: () => void saveKey(key), children: m.saveKey }),
            hasKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "subtle", onClick: () => void saveKey(""), children: m.removeKey }) : null
          ] }),
          keyError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weImportError", children: keyError })
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !hasKey && !keyless || checking, onClick: () => void checkKey(), children: checking ? m.checking : m.checkKey }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: check && !check.ok ? "weImportError" : "desc", children: check ? check.text : m.checkKeyDesc })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.model }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Combobox,
            {
              freeform: true,
              value: model,
              placeholder: m.modelPlaceholder,
              style: { width: 260 },
              selectedOptions: p.model ? [p.model] : [],
              onChange: (e) => setModel(e.target.value),
              onBlur: () => model.trim() !== p.model && onChange({ model: model.trim() }),
              onOptionSelect: (_, d) => {
                if (!d.optionValue) return;
                setModel(d.optionValue);
                onChange({ model: d.optionValue });
              },
              children: models.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: id, children: id }, id))
            }
          ),
          visionGuess(p.model) === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weImportError", children: m.modelNoVision })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mateRow mateNote", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "subtle", onClick: onRemove, children: m.removeProfile }) })
      ] })
    }
  );
}
function IntentRow({ id, override, patch }) {
  const t = useText();
  const m = t.teammate.settings;
  const def = t.teammate.intent[id];
  const icon = ALL_PINGS.find((p) => p.id === id)?.icon;
  const [label, setLabel] = reactExports.useState(override?.label ?? "");
  const [instruction, setInstruction] = reactExports.useState(override?.instruction ?? "");
  reactExports.useEffect(() => setLabel(override?.label ?? ""), [override?.label]);
  reactExports.useEffect(() => setInstruction(override?.instruction ?? ""), [override?.instruction]);
  const save = (next) => {
    const o = {};
    const merged = { ...override, ...next };
    if (merged.enabled === false) o.enabled = false;
    if (merged.label) o.label = merged.label;
    if (merged.instruction) o.instruction = merged.instruction;
    patch(Object.keys(o).length > 0 ? o : null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateIntent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mateIntentName", children: [
      icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: textureUrl(icon), alt: "" }) : null,
      t.pingNames[id]
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Switch,
      {
        checked: override?.enabled ?? true,
        "aria-label": t.pingNames[id],
        onChange: (_, d) => save({ enabled: d.checked })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: label,
        maxLength: INTENT_LABEL_MAX,
        placeholder: def.label,
        "aria-label": m.intentLabel,
        onChange: (_, d) => setLabel(d.value),
        onBlur: () => label.trim() !== (override?.label ?? "") && save({ label: label.trim() })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        value: instruction,
        maxLength: INTENT_INSTRUCTION_MAX,
        placeholder: def.instruction,
        resize: "vertical",
        "aria-label": m.intentInstruction,
        onChange: (_, d) => setInstruction(d.value),
        onBlur: () => instruction !== (override?.instruction ?? "") && save({ instruction })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", appearance: "subtle", disabled: !override, onClick: () => patch(null), children: m.intentReset })
  ] });
}
function InstructionsCard() {
  const t = useText();
  const m = t.teammate.settings;
  const [saved, setSaved] = reactExports.useState("");
  const [draft, setDraft] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void api.getTeammateInstructions().then((text2) => {
      setSaved(text2);
      setDraft(text2);
    });
  }, []);
  const save = async () => {
    const r = await api.setTeammateInstructions(draft);
    setError(r.ok ? null : m.instructionsUnavailable);
    if (r.ok) setSaved(draft);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ExpanderRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TextEditStyle24Regular, {}), title: m.instructions, description: m.instructionsDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "expPane", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        className: "mateInstructions",
        value: draft,
        maxLength: INSTRUCTIONS_MAX,
        placeholder: m.instructionsPlaceholder,
        resize: "vertical",
        "aria-label": m.instructions,
        onChange: (_, d) => setDraft(d.value)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateRow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: draft === saved, onClick: () => void save(), children: draft === saved && saved ? m.instructionsSaved : m.instructionsSave }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.instructionsCount(draft.length, INSTRUCTIONS_MAX) }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "weImportError", children: error }) : null
    ] })
  ] }) });
}
function PermissionsCard({ s, patch }) {
  const t = useText();
  const m = t.teammate.settings;
  const rows = s.permissions.flatMap((key) => {
    const k = parsePermissionKey(key);
    const profile = k && s.profiles.find((p) => p.id === k.profileId);
    if (!k || !profile) return [];
    const text2 = k.action === "agent" ? m.agentPermission(profile.name, k.tool) : m.permissionLine(profile.name, m.permissionActions[k.action]);
    return [{ key, text: text2 }];
  });
  if (rows.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldKeyhole24Regular, {}), title: m.permissions, description: m.permissionsEmpty, children: null });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ExpanderRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldKeyhole24Regular, {}), title: m.permissions, description: m.permissionsCount(rows.length), children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: null, title: r.text, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      size: "small",
      appearance: "subtle",
      "aria-label": m.permissionRemoveLabel(r.text),
      onClick: () => patch({ permissions: s.permissions.filter((p) => p !== r.key) }),
      children: m.permissionRemove
    }
  ) }, r.key)) });
}
function UsageRow() {
  const t = useText();
  const m = t.teammate.settings;
  const [usage, setUsage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const load = () => void api.getTeammateUsage().then(setUsage);
    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);
  const n = (v) => v.toLocaleString(t.lang);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DataUsage24Regular, {}), title: m.usage, description: m.usageDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: usage ? m.usageValue(n(usage.input), n(usage.output)) : "" }) });
}
function HistoryRows({ s, patch, secrets }) {
  const t = useText();
  const m = t.teammate.settings;
  const [confirm, setConfirm] = reactExports.useState(false);
  const [cleared, setCleared] = reactExports.useState(null);
  const h = s.history;
  const description = !secrets ? m.secretsUnavailable : h.paused ? m.historyPaused : m.historyDesc;
  const keepLabel = (d) => d === null ? m.keepForever : m.keepDays(d);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ExpanderRow,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History24Regular, {}),
      title: m.history,
      description,
      dim: !secrets,
      control: /* @__PURE__ */ jsxRuntimeExports.jsx(
        OnOffSwitch,
        {
          checked: h.on && secrets,
          disabled: !secrets,
          label: m.history,
          onChange: (on) => patch({ history: { ...h, on } })
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { icon: null, title: m.keepFor, dim: !h.on || !secrets, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Dropdown,
            {
              style: { minWidth: 170 },
              value: keepLabel(h.keepDays),
              selectedOptions: [String(h.keepDays)],
              onOptionSelect: (_, d) => {
                const days = KEEP_DAYS.find((k) => String(k) === d.optionValue);
                if (days !== void 0) patch({ history: { ...h, keepDays: days } });
              },
              children: KEEP_DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: String(d), text: keepLabel(d), children: keepLabel(d) }, String(d)))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.teammateHistory(h.paused ? "resume" : "pause"), children: h.paused ? m.resumeHistory : m.pauseHistory }),
          confirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: () => {
            setConfirm(false);
            void api.teammateHistory("clear").then(setCleared);
          }, children: m.clearHistoryConfirm }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
            setCleared(null);
            setConfirm(true);
          }, children: m.clearHistory }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.teammateHistory("open"), children: m.openHistory })
        ] }),
        cleared === null ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cleared ? "rowNote" : "rowError", role: "status", children: cleared ? m.historyCleared : m.historyClearFailed })
      ]
    }
  );
}
function ScreenAccessCard() {
  const t = useText();
  const m = t.teammate.settings;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card permission", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldKeyhole24Regular, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: m.screenTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.screenWhy }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "desc", children: m.screenSteps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: step }, step)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: () => void api.openScreenRecording(), children: m.screenOpen }) })
    ] })
  ] });
}
function AddProfileMenu({ mate, patch, onAdded }) {
  const t = useText();
  const m = t.teammate.settings;
  const addProfile = (id) => {
    const preset = PROVIDERS.find((p) => p.id === id);
    if (!preset) return;
    const profile = {
      id: newProfileId(),
      kind: "builtin",
      name: preset.name,
      tagColor: mate.tagColor,
      tagColorCustom: null,
      provider: preset.id,
      protocol: preset.protocol,
      baseUrl: preset.baseUrl,
      model: ""
    };
    onAdded(profile.id);
    patch({ profiles: [...mate.profiles, profile], defaultProfile: defaultAfterAdd(mate.defaultProfile, profile) });
  };
  const addAgent = (preset) => {
    const profile = newAgentProfile({ id: newProfileId(), preset, customName: m.agentCustom, tagColor: mate.tagColor });
    onAdded(profile.id);
    patch({ profiles: [...mate.profiles, profile], defaultProfile: defaultAfterAdd(mate.defaultProfile, profile) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dropdown,
    {
      style: { minWidth: 190 },
      placeholder: m.addProfile,
      value: "",
      selectedOptions: [],
      onOptionSelect: (_, d) => {
        const agent = AGENT_PRESET_IDS.find((id) => `agent:${id}` === d.optionValue);
        if (agent) addAgent(agent);
        else if (d.optionValue === "agent:custom") addAgent("custom");
        else {
          const preset = PROVIDERS.find((p) => p.id === d.optionValue);
          if (preset) addProfile(preset.id);
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OptionGroup, { label: m.providerCloud, children: PROVIDERS.filter((p) => p.group === "cloud").map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: p.id, children: p.name }, p.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OptionGroup, { label: m.providerLocal, children: PROVIDERS.filter((p) => p.group === "local").map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: p.id, children: p.name }, p.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(OptionGroup, { label: m.providerAgents, children: [
          AGENT_PRESET_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: `agent:${id}`, text: AGENT_PRESETS[id].name, children: m.agentOption(AGENT_PRESETS[id].name, AGENT_PRESETS[id].checked) }, id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: "agent:custom", text: m.agentCustom, children: m.agentCustom })
        ] })
      ]
    }
  );
}
function ProfileCards({ mate, patch, open }) {
  const changeProfile = (id, p) => patch({ profiles: mate.profiles.map((x) => x.id === id && isBuiltin(x) ? { ...x, ...p } : x) });
  const changeAgent = (id, p) => patch({ profiles: mate.profiles.map((x) => x.id === id && x.kind === "agent" ? { ...x, ...p } : x) });
  const removeProfile = (id) => {
    if (mate.profiles.some((x) => x.id === id && isBuiltin(x))) void api.setTeammateKey(id, "");
    const profiles = mate.profiles.filter((x) => x.id !== id);
    patch({
      profiles,
      defaultProfile: mate.defaultProfile === id ? profiles[0]?.id ?? null : mate.defaultProfile,
      deepProfile: mate.deepProfile === id ? null : mate.deepProfile
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: mate.profiles.map((p) => p.kind === "agent" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    AgentProfileCard,
    {
      p,
      open: open(p.id),
      onChange: (x) => changeAgent(p.id, x),
      onRemove: () => removeProfile(p.id)
    },
    p.id
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProfileCard,
    {
      p,
      open: open(p.id),
      onChange: (x) => changeProfile(p.id, x),
      onRemove: () => removeProfile(p.id)
    },
    p.id
  )) });
}
function AskKeyRows({ s, patch, words }) {
  const t = useText();
  const m = t.teammate.settings;
  const mate = s.teammate;
  const same2 = mate.askTrigger === "same";
  const askKey = mate.askTrigger === "same" ? s.trigger : mate.askTrigger;
  const askLabel = triggerLabel(askKey, t.lang, api.platform);
  const ownAskKey = ASK_KEYS.find((k) => !sameTrigger(k, s.trigger) && !sameTrigger(k, s.emoteTrigger)) ?? "win";
  const mac = api.platform === "mac";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}),
        title: m.askKeySame,
        description: same2 ? m.askKeySameNote : void 0,
        checked: same2,
        onChange: (on) => patch({ askTrigger: on ? "same" : ownAskKey })
      }
    ),
    same2 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}), title: m.askKey, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriggerPicker,
      {
        value: askKey,
        blocked: [s.emoteTrigger, s.trigger],
        onChange: (k) => {
          if (k !== "off") patch({ askTrigger: k });
        }
      }
    ) }),
    words === "all" || !mac ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CursorClick24Regular, {}),
        title: m.askClick(askLabel),
        description: m.askClickDesc,
        checked: mate.askClick,
        onChange: (askClick) => patch({ askClick })
      }
    ) : null,
    (words === "all" || mac) && canDoubleTap(askKey) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CursorClick24Regular, {}),
        title: m.askDoubleTap(askLabel),
        description: m.askDoubleTapDesc,
        checked: mate.askDoubleTap,
        onChange: (askDoubleTap) => patch({ askDoubleTap })
      }
    ) : null
  ] });
}
function TeammateSection({ settings: s, update }) {
  const t = useText();
  const m = t.teammate.settings;
  const mate = s.teammate;
  const patch = (p) => void update({ teammate: { ...mate, ...p } });
  const same2 = mate.askTrigger === "same";
  const askLabel = triggerLabel(mate.askTrigger === "same" ? s.trigger : mate.askTrigger, t.lang, api.platform);
  const profileName = (id) => mate.profiles.find((p) => p.id === id)?.name ?? m.noProfile;
  const [secrets, setSecrets] = reactExports.useState(true);
  const [screenAccess, setScreenAccess] = reactExports.useState(null);
  const [added, setAdded] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const load = () => void api.getTeammateStatus().then((st) => {
      setSecrets(st.secretsAvailable);
      setScreenAccess(st.screenAccess);
    });
    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);
  const reads = [
    { key: "marks", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanText24Regular, {}), title: m.readMarks, description: m.readMarksDesc },
    { key: "systemText", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TextField24Regular, {}), title: m.readSystemText, description: m.readSystemTextDesc },
    { key: "files", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentText24Regular, {}), title: m.readFiles, description: m.readFilesDesc },
    { key: "webPdfs", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe24Regular, {}), title: m.readWebPdfs, description: m.readWebPdfsDesc },
    { key: "clipboardForForms", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardPaste24Regular, {}), title: m.readFormPaste, description: m.readFormPasteDesc }
  ];
  const readsOn = reads.filter((r) => mate.context[r.key]).length;
  const patchIntent = (id, o) => {
    const intents = { ...mate.intents };
    if (o) intents[id] = o;
    else delete intents[id];
    patch({ intents });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    screenAccess === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScreenAccessCard, {}) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card mate", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateHead", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        m.profiles,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: mate.profiles.length > 0 ? m.profilesDesc : `${m.profilesDesc} ${m.noProfiles}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddProfileMenu, { mate, patch, onAdded: setAdded })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCards, { mate, patch, open: (id) => id === added }),
    mate.profiles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot24Regular, {}), title: m.defaultProfile, description: m.defaultProfileDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Dropdown,
        {
          style: { minWidth: 190 },
          value: profileName(mate.defaultProfile),
          selectedOptions: mate.defaultProfile ? [mate.defaultProfile] : [],
          onOptionSelect: (_, d) => d.optionValue && patch({ defaultProfile: d.optionValue }),
          children: mate.profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: p.id, children: p.name }, p.id))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkle24Regular, {}), title: m.deepProfile, description: m.deepProfileDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Dropdown,
        {
          style: { minWidth: 190 },
          value: mate.deepProfile ? profileName(mate.deepProfile) : m.useDefault,
          selectedOptions: [mate.deepProfile ?? ""],
          onOptionSelect: (_, d) => patch({ deepProfile: d.optionValue ? d.optionValue : null }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: "", text: m.useDefault, children: m.useDefault }),
            mate.profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: p.id, children: p.name }, p.id))
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RulesCard, { s: mate, patch })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpanderRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}),
        title: m.askKey,
        description: m.askKeyDesc,
        control: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: same2 ? m.askKeySame : askLabel }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AskKeyRows, { s, patch, words: "all" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ExpanderRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Person24Regular, {}),
        title: m.tagName,
        description: m.tagNameDesc,
        control: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tagPreview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tagDot", style: { background: tagColorCss(mate.tagColor, mate.tagColorCustom) } }),
          mate.tagName
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Person24Regular, {}), title: m.profileName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DraftInput, { value: mate.tagName, maxLength: TAG_NAME_MAX, width: 140, onSave: (tagName) => patch({ tagName }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Color24Regular, {}), title: m.tagColor, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Swatches,
            {
              label: m.tagColor,
              color: mate.tagColorCustom ? -1 : mate.tagColor,
              onPick: (i) => patch({ tagColor: i, tagColorCustom: null })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExpanderRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye24Regular, {}), title: m.reads, description: m.readsOn(readsOn, reads.length), children: reads.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: r.icon,
        title: r.title,
        description: r.description,
        checked: mate.context[r.key],
        onChange: (v) => patch({ context: { ...mate.context, [r.key]: v } })
      },
      r.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExpanderRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkle24Regular, {}), title: m.intents, description: m.intentsDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "expPane", children: ALL_PINGS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(IntentRow, { id: p.id, override: mate.intents[p.id], patch: (o) => patchIntent(p.id, o) }, p.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstructionsCard, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsCard, { s: mate, patch }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpanderRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlugConnected24Regular, {}),
        title: m.agentsPing,
        description: m.agentsPingDesc,
        control: /* @__PURE__ */ jsxRuntimeExports.jsx(
          OnOffSwitch,
          {
            checked: mate.agentsCanPing,
            label: m.agentsPing,
            onChange: (agentsCanPing) => patch({ agentsCanPing })
          }
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectApps, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Emoji24Regular, {}),
        title: m.emotes,
        description: m.emotesDesc,
        checked: mate.emotes,
        onChange: (emotes) => patch({ emotes })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicNote224Regular, {}),
        title: m.receiptSound,
        description: m.receiptSoundDesc,
        checked: mate.receiptSound,
        onChange: (receiptSound) => patch({ receiptSound })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryRows, { s: mate, patch, secrets }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UsageRow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc roomNote", children: m.privacy })
  ] });
}
function FirstRunDialog({ settings: s, update, onClose }) {
  const t = useText();
  const f = t.teammate.firstRun;
  const m = t.teammate.settings;
  const mate = s.teammate;
  const [changes] = reactExports.useState(() => new TeammateChanges(mate, (next2) => update({ teammate: next2 })));
  reactExports.useEffect(() => changes.seen(mate), [changes, mate]);
  const patch = (p) => void changes.change(p);
  const [step, setStep] = reactExports.useState("askKey");
  const [screenAccess, setScreenAccess] = reactExports.useState(null);
  const [needScreen, setNeedScreen] = reactExports.useState(false);
  const [editors, setEditors] = reactExports.useState([]);
  const [sendEditors, setSendEditors] = reactExports.useState(true);
  const [added, setAdded] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const load = () => void api.getTeammateStatus().then((st) => {
      setScreenAccess(st.screenAccess);
      if (st.screenAccess === false) setNeedScreen(true);
    });
    load();
    void api.getTeammateEditors().then(setEditors);
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);
  const steps = firstRunSteps(api.platform, needScreen ? false : screenAccess);
  const index = Math.max(0, steps.indexOf(step));
  const last = index === steps.length - 1;
  const agent = [...added].reverse().find((id) => mate.profiles.some((p) => p.id === id && p.kind === "agent")) ?? null;
  const askKey = mate.askTrigger === "same" ? s.trigger : mate.askTrigger;
  const askLabel = triggerLabel(askKey, t.lang, api.platform);
  const how = wordsHow(mate, askKey);
  const finish = onClose;
  const next = () => {
    if (step === "profile" && agent !== null && sendEditors) {
      void changes.change((latest) => {
        const r = editorRules(editors, latest.rules, agent);
        return r.kind === "added" ? { rules: r.rules } : null;
      });
    }
    const to = steps[index + 1];
    if (to) setStep(to);
    else finish();
  };
  const back = () => {
    const to = steps[index - 1];
    if (to) setStep(to);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, modalType: "modal", onOpenChange: (_, d) => !d.open && finish(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogSurface, { style: { width: "min(720px, calc(100vw - 32px))", maxWidth: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "subtle", "aria-label": f.close, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dismiss24Regular, {}), onClick: finish }), children: f.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "firstRunStep", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: f.steps[step] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: f.stepOf(index + 1, steps.length) })
      ] }),
      step === "askKey" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc firstRunIntro", children: f.askKeyIntro }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AskKeyRows, { s, patch, words: "platform" })
      ] }) : null,
      step === "profile" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc firstRunIntro", children: f.profileIntro }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card mate", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mateHead", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot24Regular, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
            m.profiles,
            mate.profiles.length > 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: m.noProfiles })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddProfileMenu,
            {
              mate,
              patch,
              onAdded: (id) => setAdded((ids) => [...ids, id])
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCards, { mate, patch, open: (id) => added.includes(id) }),
        agent !== null && editors.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: sendEditors,
            onChange: (_, d) => setSendEditors(d.checked === true),
            label: f.editors(
              mate.profiles.find((p) => p.id === agent)?.name ?? "",
              t.teammate.intent.omw.label,
              t.teammate.intent.danger.label
            )
          }
        ) : null
      ] }) : null,
      step === "screen" ? screenAccess === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScreenAccessCard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkmark24Regular, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lbl", children: f.screenOn })
      ] }) : null,
      step === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lbl", children: f.ready(askLabel) })
        ] }),
        how === null ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CursorClick24Regular, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lbl", children: how === "click" ? f.readyClick(askLabel) : f.readyDoubleTap(askLabel) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History24Regular, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lbl", children: f.readyKept })
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogActions, { children: [
      last ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "subtle", onClick: finish, children: f.skip }),
      index > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: back, children: f.back }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: next, children: last ? f.done : f.next })
    ] })
  ] }) }) });
}
const ICONS = {
  teammate: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot24Regular, {}),
  emotes: /* @__PURE__ */ jsxRuntimeExports.jsx(Emoji24Regular, {}),
  rooms: /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleCommunity24Regular, {}),
  roomText: /* @__PURE__ */ jsxRuntimeExports.jsx(Chat24Regular, {}),
  roomVotes: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxChecked24Regular, {}),
  roomPanel: /* @__PURE__ */ jsxRuntimeExports.jsx(People24Regular, {})
};
const showTeammate = () => {
  requestAnimationFrame(() => document.getElementById("teammate")?.scrollIntoView({ behavior: "smooth" }));
};
function FeaturesSection({ settings: s, update }) {
  const t = useText();
  const [firstRun, setFirstRun] = reactExports.useState(false);
  const set = (id, v) => {
    const features = { ...s.features, [id]: v };
    const first = id === "teammate" && v && !s.teammate.firstRunDone;
    void update(first ? { features, teammate: { ...s.teammate, firstRunDone: true } } : { features }).then((r) => {
      if (!r.ok || !v || id !== "teammate") return;
      showTeammate();
      if (first) setFirstRun(true);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    firstRun ? /* @__PURE__ */ jsxRuntimeExports.jsx(FirstRunDialog, { settings: s, update, onClose: () => setFirstRun(false) }) : null,
    featureGroups(api.platform).filter(({ id }) => id !== "teammate").map(({ id, parts }) => {
      if (parts.length === 0) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SwitchRow,
          {
            icon: ICONS[id],
            title: t.featureTitle[id],
            description: t.featureDesc[id],
            checked: s.features[id],
            onChange: (v) => set(id, v)
          },
          id
        );
      }
      const off = !s.features[id];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpanderRow,
        {
          icon: ICONS[id],
          title: t.featureTitle[id],
          description: t.featureDesc[id],
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(OnOffSwitch, { checked: s.features[id], label: t.featureTitle[id], onChange: (v) => set(id, v) }),
          children: parts.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SwitchRow,
            {
              icon: ICONS[part],
              title: t.featureTitle[part],
              dim: off,
              disabled: off,
              description: off ? `${t.featureDesc[part]} ${t.featureNeedsRooms}` : t.featureDesc[part],
              checked: s.features[part],
              onChange: (v) => set(part, v)
            },
            part
          ))
        },
        id
      );
    })
  ] });
}
function PermissionCard({ stale }) {
  const t = useText();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card permission", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldKeyhole24Regular, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: stale ? t.permStaleTitle : t.permTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "desc", children: (stale ? t.permStaleSteps : t.permSteps).map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: step }, step)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: () => void api.openAccessibility(), children: t.permOpen }),
        stale ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.retryHelper(), children: t.permRetry }) : null
      ] })
    ] })
  ] });
}
function useRoomState() {
  const [room, setRoom] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let pushed = false;
    const off = api.onRoom((s) => {
      pushed = true;
      setRoom(s);
    });
    void api.getRoom().then((s) => {
      if (!pushed) setRoom(s);
    });
    return off;
  }, []);
  return room;
}
function ServerRow({ field, title, value, save }) {
  const t = useText();
  const [draft, setDraft] = reactExports.useState(value);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => setDraft(value), [value]);
  const commit = () => {
    const clean = draft.trim();
    if (normalizeRoomMedia({ [field]: clean })[field] !== clean) {
      setError(true);
      return;
    }
    setError(false);
    if (clean !== value) save(clean);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { className: "roomMediaField", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server24Regular, {}), title, description: error ? t.roomMediaServerInvalid : void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      "aria-label": title,
      value: draft,
      onChange: (_, d) => {
        setDraft(d.value);
        setError(false);
      },
      onBlur: commit,
      onKeyDown: (e) => {
        if (e.key === "Enter") commit();
      }
    }
  ) });
}
function RoomMediaSection({ settings: s, room, update }) {
  const t = useText();
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const patch = (value) => void update({ roomMedia: { ...s.roomMedia, ...value } });
  const save = async (value) => {
    setBusy(true);
    try {
      const ok = await api.setRoomTurnCredential(value);
      setError(!ok);
      if (ok) setPassword("");
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe24Regular, {}),
        title: t.roomMediaTitle,
        description: t.roomMediaPrivacy,
        checked: s.roomMedia.enabled,
        onChange: (enabled) => patch({ enabled })
      }
    ),
    s.roomMedia.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ServerRow, { field: "stun", title: t.roomStun, value: s.roomMedia.stun, save: (stun) => patch({ stun }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ServerRow, { field: "turn", title: t.roomTurn, value: s.roomMedia.turn, save: (turn) => patch({ turn }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { className: "roomMediaField", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server24Regular, {}), title: t.roomTurnUser, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "aria-label": t.roomTurnUser,
          value: s.roomMedia.username,
          maxLength: 256,
          onChange: (_, d) => patch({ username: d.value })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SettingRow,
        {
          className: "roomMediaField",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LockClosed24Regular, {}),
          title: t.roomTurnPassword,
          description: !room.mediaSecretsAvailable ? t.roomTurnUnavailable : error ? t.roomTurnError : room.turnConfigured ? t.roomTurnSaved : t.roomTurnEmpty,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "aria-label": t.roomTurnPassword,
                type: "password",
                value: password,
                maxLength: 4096,
                autoComplete: "new-password",
                disabled: busy || !room.mediaSecretsAvailable,
                onChange: (_, d) => setPassword(d.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Save24Regular, {}),
                "aria-label": t.roomTurnSave,
                title: t.roomTurnSave,
                disabled: busy || !password || !room.mediaSecretsAvailable,
                onClick: () => void save(password)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Delete24Regular, {}),
                "aria-label": t.roomTurnClear,
                title: t.roomTurnClear,
                disabled: busy || !room.turnConfigured,
                onClick: () => void save("")
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LockClosed24Regular, {}),
          title: t.roomRelayOnly,
          description: t.roomRelayOnlyDesc,
          checked: s.roomMedia.relayOnly,
          onChange: (relayOnly) => patch({ relayOnly })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowSync24Regular, {}), title: t.roomMediaRetry, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowSync24Regular, {}),
          "aria-label": t.roomMediaRetry,
          title: t.roomMediaRetry,
          onClick: () => void api.retryRoomMedia()
        }
      ) })
    ] }) : null
  ] });
}
const { max: LIMIT_MAX } = LIMITS.incomingPingLimit;
const toSlider = (limit) => limit === 0 ? LIMIT_MAX + 1 : limit;
const fromSlider = (v) => v > LIMIT_MAX ? 0 : v;
const TEXT_STYLES = ["spot", "danmaku"];
function NameRow({ value, onSave }) {
  const t = useText();
  const [draft, setDraft] = reactExports.useState(value);
  reactExports.useEffect(() => setDraft(value), [value]);
  const save = () => {
    if (draft !== value) onSave(draft);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Person24Regular, {}), title: t.roomName, description: t.roomNameDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      value: draft,
      style: { width: 190 },
      onChange: (_, d) => setDraft(clampNameInput(d.value)),
      onBlur: save,
      onKeyDown: (e) => e.key === "Enter" && save()
    }
  ) });
}
function JoinCard() {
  const t = useText();
  const [code, setCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const touched = reactExports.useRef(false);
  reactExports.useEffect(() => {
    void api.clipboardRoomCode().then((c) => {
      if (c && !touched.current) setCode(c);
    });
  }, []);
  const join = async () => {
    setBusy(true);
    const r = await api.joinRoom(code);
    setBusy(false);
    setError(r.ok ? null : r.error === "mistyped" ? t.roomMistyped : r.error === "failed" ? t.roomJoinFailed : t.roomInvalid);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card roomJoin", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleCommunity24Regular, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      t.roomJoinTitle,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.roomJoinDesc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.roomNetworkHint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "PING-XXXXX-XXXXX",
          value: code,
          style: { width: 190 },
          onChange: (_, d) => {
            touched.current = true;
            setCode(d.value);
            setError(null);
          },
          onKeyDown: (e) => e.key === "Enter" && void join()
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", disabled: busy || !code.trim(), onClick: () => void join(), children: t.roomJoin }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy, onClick: () => {
        setBusy(true);
        void api.createRoom().finally(() => setBusy(false));
      }, children: t.roomCreate })
    ] }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "roomError", children: error }) : null
  ] });
}
function MemberRow({ m, room }) {
  const t = useText();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "member", children: [
    !m.self && room.audience?.mode === "selected" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        disabled: !m.direct,
        "aria-label": m.name,
        checked: room.audience.peers.includes(m.peer),
        onChange: (_, d) => void api.setRoomAudience({ mode: "selected", peers: d.checked ? [...room.audience?.peers ?? [], m.peer] : (room.audience?.peers ?? []).filter((p) => p !== m.peer) })
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tagDot", style: { background: tagColorCss(m.color, m.rgb) } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "memberName", children: [
      m.name,
      m.self ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "desc inline", children: [
        "(",
        t.roomYou,
        ")"
      ] }) : null,
      m.noEmotes ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.memberOldNoEmotes }) : null,
      m.noChat ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.memberNoChat }) : null,
      m.textOff ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.memberTextOff }) : null,
      m.votesOff ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.memberVotesOff }) : null,
      !m.self && !m.direct && room.audience?.mode === "selected" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.roomDirectUpgrade }) : null,
      !m.self && m.media && m.media !== "off" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.roomMediaStatus[m.media] }) : null
    ] }),
    m.self ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${m.path}`, children: t.roomPath[m.path] }),
    m.status === "paused" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: t.roomPaused }) : null,
    m.status === "muted" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: t.roomMutedBadge }) : null,
    m.needsUpdate ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bad", children: t.roomNeedsUpdate }) : null,
    m.self ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", appearance: m.muted ? "primary" : "secondary", onClick: () => void api.muteMember(m.peer, !m.muted), children: m.muted ? t.roomUnmuteMember : t.roomMuteMember })
  ] });
}
function InRoom({ room, allowInternet }) {
  const t = useText();
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);
  const alone = room.members.length <= 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleCommunity24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "roomCode", children: room.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: room.phase === "joining" ? t.roomJoining : t.roomShareDesc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctl", children: [
        room.phase === "joining" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "tiny" }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          void api.copyRoomCode();
          setCopied(true);
        }, children: copied ? t.roomCopied : t.roomCopy }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.leaveRoom(), children: t.roomLeave })
      ] })
    ] }),
    room.lan === "unavailable" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card permission", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Warning24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.roomLanUnavailable }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.roomLanUnavailableDesc })
      ] })
    ] }) : null,
    room.internet === "unavailable" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card permission", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Warning24Regular, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t.roomInternetUnavailable }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.roomInternetUnavailableDesc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void api.retryInternet(), children: t.roomRetry }) })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { className: "roomAudience", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleCommunity24Regular, {}), title: t.roomAudience, description: t.roomAudienceDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      RadioGroup,
      {
        layout: "horizontal",
        value: room.audience?.mode ?? "all",
        "aria-label": t.roomAudience,
        onChange: (_, d) => {
          if (d.value === "all" || d.value === "selected" || d.value === "self")
            void api.setRoomAudience({ mode: d.value, peers: room.audience?.peers ?? [] });
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "all", label: t.roomAudienceModes.all }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "selected", label: t.roomAudienceModes.selected }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "self", label: t.roomAudienceModes.self })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card members", children: [
      room.members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberRow, { m, room }, m.peer)),
      alone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "desc roomWaiting", children: [
        room.lonely ? `${t.roomWaiting} ${t.roomLonely}` : t.roomWaiting,
        room.lonely && !allowInternet ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "warnText", children: [
          " ",
          t.roomLonelyInternetOff
        ] }) : null
      ] }) : null,
      room.clockSkew ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "desc roomWaiting warnText", children: t.roomClockSkew }) : null
    ] })
  ] });
}
const textStyleLabel = (t, style) => style === "danmaku" ? t.roomTextStyleDanmaku : t.roomTextStyleSpot;
function RoomSection({ settings: s, update }) {
  const t = useText();
  const room = useRoomState();
  const [textKeyError, setTextKeyError] = reactExports.useState(null);
  const [panelKeyError, setPanelKeyError] = reactExports.useState(null);
  if (!room) return null;
  const pickerValue = tagHex(s.tagColorCustom ?? tagRgbFromHex(TAG_COLORS[s.tagColor] ?? TAG_COLORS[0]) ?? [255, 255, 255]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NameRow, { value: s.displayName, onSave: (displayName) => void update({ displayName }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Color24Regular, {}), title: t.roomColor, description: t.roomColorCustomHint, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "swatches", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swatchRow", role: "radiogroup", "aria-label": t.roomColor, children: TAG_COLORS.map((c, i) => {
        const on = !s.tagColorCustom && s.tagColor === i;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": on,
            "aria-label": t.roomColorLabel(i + 1),
            className: `swatch${on ? " sel" : ""}`,
            style: { background: c },
            onClick: () => void update({ tagColor: i, tagColorCustom: null })
          },
          c
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          className: `swatch custom${s.tagColorCustom ? " sel" : " unset"}`,
          title: t.roomColorCustom,
          style: s.tagColorCustom ? { background: tagColorCss(s.tagColor, s.tagColorCustom) } : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "color",
              value: pickerValue,
              "aria-label": t.roomColorCustom,
              onChange: (e) => {
                const picked = tagRgbFromHex(e.target.value);
                if (picked) void update({ tagColorCustom: readableTagRgb(picked) });
              }
            }
          )
        }
      )
    ] }) }),
    room.phase === "idle" ? /* @__PURE__ */ jsxRuntimeExports.jsx(JoinCard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(InRoom, { room, allowInternet: s.allowInternet }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SpeakerMute24Regular, {}),
        title: t.roomMute,
        description: t.roomMuteDesc,
        checked: s.roomMuted,
        onChange: (v) => void update({ roomMuted: v })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TopSpeed24Regular, {}), title: t.roomLimit, description: t.roomLimitDesc, dim: s.roomMuted, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 1,
          max: LIMIT_MAX + 1,
          step: 1,
          value: toSlider(s.incomingPingLimit),
          style: { width: 200 },
          onChange: (_, d) => void update({ incomingPingLimit: fromSlider(d.value) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: t.roomLimitValue(s.incomingPingLimit) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image24Regular, {}),
        title: t.friendEmotes,
        description: t.friendEmotesDesc,
        checked: s.friendEmotes,
        onChange: (v) => void update({ friendEmotes: v })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe24Regular, {}),
        title: t.roomInternet,
        description: t.roomInternetDesc,
        checked: s.allowInternet,
        onChange: (v) => void update({ allowInternet: v })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoomMediaSection, { settings: s, room, update }),
    featureOn(s, "roomText") ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Chat24Regular, {}), title: t.roomTextStyle, description: t.roomTextStyleDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Dropdown,
        {
          style: { minWidth: 170 },
          value: textStyleLabel(t, s.roomTextStyle),
          selectedOptions: [s.roomTextStyle],
          onOptionSelect: (_, d) => {
            const style = TEXT_STYLES.find((v) => v === d.optionValue);
            if (style) void update({ roomTextStyle: style });
          },
          children: TEXT_STYLES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: v, text: textStyleLabel(t, v), children: textStyleLabel(t, v) }, v))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}), title: t.textShortcut, description: t.textShortcutDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        KeyCapture,
        {
          parts: hotkeyParts(s.textHotkey, api.platform),
          requireModifier: true,
          error: textKeyError,
          onCapture: async (c) => {
            const result = await update({ textHotkey: c });
            setTextKeyError(result.ok ? null : result.error);
          }
        }
      ) })
    ] }) : null,
    featureOn(s, "roomPanel") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingRow,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}),
        title: t.panelKey,
        description: t.panelKeyDesc(vkLabel(s.panelKey, api.platform)),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          KeyCapture,
          {
            parts: [vkLabel(s.panelKey, api.platform)],
            requireModifier: false,
            error: panelKeyError,
            onCapture: async (c) => {
              const result = await update({ panelKey: c.vk });
              setPanelKeyError(result.ok ? null : result.error);
            }
          }
        )
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(SwitchRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowSync24Regular, {}), title: t.roomRejoin, checked: s.rejoinRoom, onChange: (v) => void update({ rejoinRoom: v }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Desktop24Regular, {}), title: t.roomDisplays, description: t.roomDisplaysDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "displays", children: room.displays.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "#",
      d.number,
      d.primary ? ` ${t.roomPrimary}` : "",
      " · ",
      d.width,
      "×",
      d.height
    ] }, d.number)) }) }),
    featureOn(s, "teammate") && s.teammate.askTrigger === "same" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "desc roomNote warnText", children: t.teammate.settings.askKeySameNote }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "desc roomNote", children: [
      t.roomPrivacy,
      " ",
      t.roomHelp
    ] })
  ] });
}
function StatusCard({ settings, status }) {
  const t = useText();
  const failed = status.helper === "failed";
  const noAccess = status.helper === "noAccess";
  const dot = failed || noAccess ? " failed" : status.enabled ? "" : " off";
  const title = failed ? t.statusHelperStopped : noAccess ? t.statusNoAccess : status.enabled ? t.statusOn : t.statusOff;
  const hint = failed ? t.statusFailedHint : noAccess ? t.statusNoAccessHint : t.statusHint(triggerLabel(settings.trigger, t.lang, api.platform), hotkeyLabel(settings.toggleHotkey, api.platform), status.enabled);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card status", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `dot${dot}` }, dot),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "statusPing", src: textureUrl(LOGO_TEXTURE), alt: "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lbl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { fontSize: 16 }, children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ctl", children: noAccess && api.platform === "mac" ? null : failed || noAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { appearance: "primary", onClick: () => void api.retryHelper(), children: t.restartHelper }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: status.enabled, onChange: (_, d) => void api.setEnabled(d.checked), label: status.enabled ? t.on : t.off, labelPosition: "before" }) })
  ] });
}
const macBlue = {
  10: "#00122b",
  20: "#001d45",
  30: "#002960",
  40: "#00357a",
  50: "#004295",
  60: "#004faf",
  70: "#006ae6",
  80: "#007aff",
  90: "#2b8cff",
  100: "#4f9eff",
  110: "#6eb0ff",
  120: "#8cc1ff",
  130: "#a9d2ff",
  140: "#c6e2ff",
  150: "#e2f0ff",
  160: "#f2f8ff"
};
const macFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif';
const macOverrides = {
  fontFamilyBase: macFont,
  borderRadiusSmall: "4px",
  borderRadiusMedium: "6px",
  borderRadiusLarge: "10px"
};
const macLightTheme = { ...createLightTheme(macBlue), ...macOverrides };
const macDarkTheme = { ...createDarkTheme(macBlue), ...macOverrides, colorBrandBackground: "#0a84ff" };
function barFrames(from, to, size2) {
  if (from === to) return [];
  const px = (v) => `${v}px`;
  return [
    { top: px(from), height: px(size2) },
    { top: px(Math.min(from, to)), height: px(Math.abs(to - from) + size2), offset: 0.5 },
    { top: px(to), height: px(size2) }
  ];
}
function useAppState() {
  const [settings, setSettings] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void api.getSettings().then(setSettings);
    void api.getStatus().then(setStatus);
    const offSettings = api.onSettings(setSettings);
    const offStatus = api.onStatus(setStatus);
    return () => {
      offSettings();
      offStatus();
    };
  }, []);
  const update = reactExports.useCallback(async (patch) => {
    const result = await api.setSettings(patch);
    setSettings(result.settings);
    return result;
  }, []);
  return { settings, status, update };
}
function useUpdateState() {
  const [state, setState] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let pushed = false;
    const off = api.onUpdate((s) => {
      pushed = true;
      setState(s);
    });
    void api.getUpdate().then((s) => {
      if (!pushed) setState(s);
    });
    return off;
  }, []);
  return state;
}
const PLATFORM = api.platform;
const MAC = PLATFORM === "mac";
const LENGTH_UNIT = MAC ? "pt" : "px";
const SECTIONS = [
  { id: "trigger", label: (t) => t.navTrigger, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cursor24Regular, {}) },
  { id: "toggle", label: (t) => t.navToggle, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}) },
  { id: "pings", label: (t) => t.navPings, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Speaker224Regular, {}) },
  { id: "wheel", label: (t) => t.navWheel, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DataPie24Regular, {}) },
  { id: "emotes", label: (t) => t.navEmotes, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Emoji24Regular, {}), feature: "emotes" },
  { id: "room", label: (t) => t.navRoom, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleCommunity24Regular, {}), feature: "rooms" },
  { id: "teammate", label: (t) => t.navTeammate, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkle24Regular, {}), feature: "teammate" },
  { id: "features", label: (t) => t.navFeatures, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Apps24Regular, {}) },
  { id: "app", label: (t) => t.navApp, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings24Regular, {}) }
];
const BAR_PX = 16;
const ENTRANCE_MS = 900;
const NEW_PINGS = /* @__PURE__ */ new Set(["bait", "visioncleared", "missingflip"]);
function pingPatch(p) {
  const patch = {};
  if (p.wheel) patch.wheel = p.wheel;
  if (p.center) patch.clickPingId = p.center;
  return patch;
}
function useDarkMode() {
  const query = "(prefers-color-scheme: dark)";
  const [dark, setDark] = reactExports.useState(() => matchMedia(query).matches);
  reactExports.useEffect(() => {
    const m = matchMedia(query);
    const onChange = () => setDark(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return dark;
}
function App() {
  const dark = useDarkMode();
  const { settings, status, update } = useAppState();
  reactExports.useEffect(() => {
    document.documentElement.dataset.platform = PLATFORM;
  }, []);
  const theme = MAC ? dark ? macDarkTheme : macLightTheme : dark ? webDarkTheme : webLightTheme;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FluentProvider, { theme, style: { background: "transparent", height: "100%" }, children: settings && status ? /* @__PURE__ */ jsxRuntimeExports.jsx(TextContext.Provider, { value: strings(resolveLang(settings.language, navigator.language), PLATFORM), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPage, { settings, status, update }) }) : null });
}
function SettingsPage({ settings: s, status, update }) {
  const t = useText();
  reactExports.useEffect(() => {
    document.documentElement.lang = t.lang;
  }, [t]);
  const mainRef = reactExports.useRef(null);
  const updateState = useUpdateState() ?? null;
  const [active, setActive] = reactExports.useState(SECTIONS[0].id);
  const sections = SECTIONS.filter((sec) => !sec.feature || featureOn(s, sec.feature));
  const off = !status.enabled || status.helper === "failed";
  const trigger = triggerLabel(s.trigger, t.lang, PLATFORM);
  const [hotkeyError, setHotkeyError] = reactExports.useState(null);
  const [triggerError, setTriggerError] = reactExports.useState(null);
  const askKey = separateAskKey(s);
  const mouseTrigger = s.trigger === "mouse4" || s.trigger === "mouse5";
  const customTrigger = typeof s.trigger === "object";
  const pingPool = ALL_PINGS.map((p) => ({
    id: p.id,
    icon: textureUrl(p.icon),
    name: t.pingNames[p.id],
    badge: NEW_PINGS.has(p.id) ? t.wheelNew : void 0
  }));
  const [entering, setEntering] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setEntering(false), ENTRANCE_MS);
    return () => clearTimeout(timer);
  }, []);
  const jumping = reactExports.useRef(false);
  const show = (id) => {
    const main = mainRef.current;
    const el = document.getElementById(id);
    if (!main || !el) return;
    const max2 = main.scrollHeight - main.clientHeight;
    const target = Math.min(max2, el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop);
    jumping.current = Math.abs(target - main.scrollTop) > 1;
    if (sections.some((sec) => sec.id === id)) setActive(id);
    el.scrollIntoView({ behavior: "smooth" });
  };
  const showRef = reactExports.useRef(show);
  showRef.current = show;
  reactExports.useEffect(() => {
    const initial = location.hash.slice(1);
    if (initial) requestAnimationFrame(() => showRef.current(initial));
    return api.onShowSection((id) => showRef.current(id));
  }, []);
  const navRef = reactExports.useRef(null);
  const barRef = reactExports.useRef(null);
  const barTop = reactExports.useRef(null);
  const navIds = sections.map((sec) => sec.id).join();
  reactExports.useLayoutEffect(() => {
    const item = navRef.current?.querySelector(`[data-section="${active}"]`);
    const bar = barRef.current;
    if (!item || !bar) return;
    const top = item.offsetTop + (item.offsetHeight - BAR_PX) / 2;
    const from = barTop.current;
    barTop.current = top;
    bar.style.top = `${top}px`;
    if (from === null || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bar.animate(barFrames(from, top, BAR_PX), { duration: motionTokens.durationSlow, easing: motionTokens.curveDecelerateMid });
  }, [active, navIds]);
  const onScroll = () => {
    const main = mainRef.current;
    if (!main || jumping.current) return;
    let current = sections[0].id;
    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el && el.offsetTop - main.offsetTop - 40 <= main.scrollTop) current = sec.id;
    }
    setActive(current);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `app${entering ? " entering" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: textureUrl(LOGO_TEXTURE), alt: "" }),
      "lolPing"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "side", ref: navRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "navBar", ref: barRef }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: textureUrl("pingwheel_basicpingrender"), alt: "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "lolPing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.tagline })
        ] })
      ] }),
      sections.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "data-section": sec.id, className: `navItem${active === sec.id ? " sel" : ""}`, onClick: () => show(sec.id), children: [
        sec.icon,
        sec.label(t)
      ] }, sec.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "content", ref: mainRef, onScroll, onScrollEnd: () => {
      jumping.current = false;
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "pageTitle", children: t.pageTitle }),
      MAC && status.helper === "noAccess" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionCard, { stale: status.staleAccess === true }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { settings: s, status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "trigger", children: t.navTrigger }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cursor24Regular, {}),
          title: t.triggerKey,
          dim: off,
          description: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            mouseTrigger ? t.triggerMouseDesc : t.triggerKeyDesc,
            customTrigger ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "desc", children: t.customKeyNote }) : null
          ] }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriggerPicker,
            {
              value: s.trigger,
              blocked: [s.emoteTrigger, ...askKey ? [askKey] : []],
              onChange: (k) => {
                if (k !== "off") void update({ trigger: k }).then((r) => setTriggerError(r.ok ? null : r.error));
              }
            }
          )
        }
      ),
      triggerError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rowError", role: "alert", children: triggerError }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderRow,
        {
          limit: "dragThresholdPx",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowMove24Regular, {}),
          title: t.dragDistance,
          description: t.dragDistanceDesc,
          value: s.dragThresholdPx,
          format: (v) => `${v} ${LENGTH_UNIT}`,
          onChange: (v) => void update({ dragThresholdPx: v }),
          dim: off
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CursorClick24Regular, {}),
          title: t.clickPing(trigger),
          description: t.clickPingDesc(trigger),
          checked: s.clickPing,
          onChange: (v) => void update({ clickPing: v }),
          dim: off
        }
      ),
      PLATFORM === "win" && // only the Windows helper has a fullscreen probe
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Games24Regular, {}),
          title: t.gameCheck,
          description: t.gameCheckDesc,
          checked: s.gameCheck,
          onChange: (v) => void update({ gameCheck: v }),
          dim: off
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "toggle", children: t.navToggle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard24Regular, {}), title: t.toggleShortcut, description: t.toggleShortcutDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        KeyCapture,
        {
          parts: hotkeyParts(s.toggleHotkey, PLATFORM),
          requireModifier: true,
          error: hotkeyError,
          onCapture: async (c) => {
            const result = await update({ toggleHotkey: c });
            setHotkeyError(result.ok ? null : result.error);
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Power24Regular, {}),
          title: t.startEnabled,
          description: t.startEnabledDesc,
          checked: s.enabledOnStart,
          onChange: (v) => void update({ enabledOnStart: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "pings", children: t.navPings }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderRow,
        {
          limit: "pingSizePx",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ResizeLarge24Regular, {}),
          title: t.pingSize,
          value: s.pingSizePx,
          format: (v) => `${v} ${LENGTH_UNIT}`,
          onChange: (v) => void update({ pingSizePx: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderRow,
        {
          limit: "pingDurationS",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer24Regular, {}),
          title: t.pingDuration,
          description: t.pingDurationDesc,
          value: s.pingDurationS,
          format: (v) => `${v.toFixed(1)} s`,
          onChange: (v) => void update({ pingDurationS: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin24Regular, {}),
          title: t.keepLastPing,
          description: t.keepLastPingDesc,
          checked: s.keepLastPing,
          onChange: (v) => void update({ keepLastPing: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderRow,
        {
          limit: "volume",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Speaker224Regular, {}),
          title: t.volume,
          value: s.volume,
          format: (v) => `${v}`,
          onChange: (v) => void update({ volume: v }),
          dim: s.muted
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SwitchRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SpeakerMute24Regular, {}), title: t.mute, checked: s.muted, onChange: (v) => void update({ muted: v }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicNote224Regular, {}),
          title: t.tickSound,
          description: t.tickSoundDesc,
          checked: s.tickSound,
          onChange: (v) => void update({ tickSound: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "wheel", children: t.navWheel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderRow,
        {
          limit: "wheelSizePx",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ResizeLarge24Regular, {}),
          title: t.wheelSize,
          description: t.wheelSizeDesc,
          value: s.wheelSizePx,
          format: (v) => `${v} ${LENGTH_UNIT}`,
          onChange: (v) => void update({ wheelSizePx: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        WheelEditor,
        {
          wheel: s.wheel,
          center: s.clickPingId,
          centerOn: s.clickPing,
          trigger,
          pool: pingPool,
          defaults: { wheel: DEFAULT_WHEEL, center: DEFAULT_CLICK_PING },
          labels: { title: t.wheelTitle, desc: t.wheelDesc(trigger), poolTitle: t.allPings, poolDesc: t.allPingsDesc },
          onChange: (patch) => void update(pingPatch(patch)),
          onPreview: (id) => void api.previewPing(id)
        }
      ),
      featureOn(s, "emotes") ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "emotes", children: t.navEmotes }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmoteSection, { settings: s, update, lengthUnit: LENGTH_UNIT })
      ] }) : null,
      featureOn(s, "rooms") ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "room", children: t.navRoom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoomSection, { settings: s, update })
      ] }) : null,
      featureOn(s, "teammate") ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "teammate", children: t.navTeammate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TeammateSection, { settings: s, update })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "features", children: t.navFeatures }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, { settings: s, update }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section", id: "app", children: t.navApp }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket24Regular, {}),
          title: t.launchAtStartup,
          description: t.launchAtStartupDesc,
          checked: s.launchAtStartup,
          onChange: (v) => void update({ launchAtStartup: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LocalLanguage24Regular, {}), title: t.language, description: t.languageDesc, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Dropdown,
        {
          style: { minWidth: 170 },
          value: s.language === "auto" ? t.languageAuto : LANGUAGE_NAMES[s.language],
          selectedOptions: [s.language],
          onOptionSelect: (_, d) => void update({ language: d.optionValue }),
          children: LANGUAGE_PREFS.map((pref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Option, { value: pref, text: pref === "auto" ? t.languageAuto : LANGUAGE_NAMES[pref], children: pref === "auto" ? t.languageAuto : LANGUAGE_NAMES[pref] }, pref))
        }
      ) }),
      updateState ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowSync24Regular, {}),
          title: t.autoUpdateCheck,
          description: t.autoUpdateCheckDesc,
          checked: s.autoUpdateCheck,
          onChange: (v) => void update({ autoUpdateCheck: v })
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info24Regular, {}), update: updateState })
    ] })
  ] });
}
clientExports.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
