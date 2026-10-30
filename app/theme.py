"""共用常量、路径、配色、提示音、开机自启。

这个模块不依赖界面，reminders.py / wardrobe.py / pet.py 都从这里取东西。
"""
from __future__ import annotations

import json
import math
import os
import sys
import time
from array import array

APP_NAME = "兔兔桌宠"
APP_TITLE = "兔兔桌宠 · 提醒版"
VERSION = "提醒版 1.0"

# 三档大小（窗口是正方形，边长）
SIZES = {"small": 172, "mid": 222, "big": 288}
SIZE_LABELS = {"small": "小", "mid": "中", "big": "大"}

# 亲密度等级
LEVELS = [(0, "刚认识"), (10, "眼熟"), (30, "朋友"), (60, "好朋友"), (100, "最好的朋友")]

CHAT = [
    "今天的胡萝卜特别甜～",
    "你在忙什么呀？",
    "要不要休息一下眼睛？",
    "我刚刚打了个小盹",
    "再摸一下头嘛",
    "这个功能是你的新衣裳吗？好漂亮",
    "据说盯着屏幕太久会长出兔耳朵",
    "我已经陪你很久啦",
    "窗外的云在动",
    "有点想吃草莓蛋糕",
    "记得喝水哦",
    "我在这儿，不走",
]

PAT_LINES = ["唔……好舒服", "再摸一下嘛", "嘿嘿", "耳朵要塌下来了"]
FEED_LINES = ["咔嚓咔嚓……好吃！", "胡萝卜是兔子的浪漫", "再来一根也不嫌多"]
GREET_LINES = ["我回来啦，今天也要一起加油～", "启动啦，右键可以给我换衣服", "想我了吗？"]

INK = "#43261E"
PINK = "#FF8FB1"
PINK_SOFT = "#FFD3E0"
CREAM = "#FFFDF6"
BG = "#FFF8FB"


# ---------------------------------------------------------------- 路径
def app_dir() -> str:
    """exe / 脚本所在目录（配置、日志写在这里）。"""
    if getattr(sys, "frozen", False):
        return os.path.dirname(os.path.abspath(sys.executable))
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def resource(rel: str) -> str:
    """打包进 exe 的只读资源路径。"""
    base = getattr(sys, "_MEIPASS", None)
    if base:
        p = os.path.join(base, rel)
        if os.path.exists(p):
            return p
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), rel)


CONFIG_PATH = os.path.join(app_dir(), "pet_config.json")
REMINDER_PATH = os.path.join(app_dir(), "reminders.json")
ERROR_LOG = os.path.join(app_dir(), "error.log")
QUIT_LOG = os.path.join(app_dir(), "quit.log")


def load_outfits() -> list[dict]:
    """读取 36 套造型目录。"""
    try:
        with open(resource("assets/catalog.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
        out = []
        for item in data:
            out.append(
                {
                    "id": int(item.get("id", len(out))),
                    "name": item.get("name", "造型"),
                    "tag": item.get("tag", ""),
                    "path": resource("assets/outfits/" + item["file"]),
                }
            )
        if out:
            return out
    except Exception:
        pass
    return [{"id": 0, "name": "兔兔", "tag": "", "path": resource("assets/rabbit.png")}]


OUTFITS = load_outfits()
OUTFIT_COUNT = len(OUTFITS)


def outfit_at(index: int) -> dict:
    if not OUTFITS:
        raise RuntimeError("no outfit")
    return OUTFITS[max(0, min(int(index), len(OUTFITS) - 1))]


# ---------------------------------------------------------------- 提示音
_CHIME_CACHE: bytes | None = None


def chime(melody: str = "soft") -> bytes:
    """当场合成一小段铃音（wav 字节），不依赖外部音频文件。"""
    global _CHIME_CACHE
    if melody == "soft" and _CHIME_CACHE is not None:
        return _CHIME_CACHE

    rate = 44100
    if melody == "soft":
        notes = [(784.0, 0.00), (1046.5, 0.16), (1318.5, 0.32)]
        dur, decay, vol = 1.05, 5.2, 0.26
    else:  # bright
        notes = [(880.0, 0.00), (1174.7, 0.12), (1567.98, 0.26), (2093.0, 0.40)]
        dur, decay, vol = 1.2, 6.0, 0.24

    buf = array("h")
    for i in range(int(rate * dur)):
        t = i / rate
        v = 0.0
        for freq, start in notes:
            if t >= start:
                u = t - start
                env = math.exp(-u * decay) * min(1.0, u * 220.0)
                v += math.sin(2 * math.pi * freq * u) * env
        v *= vol
        buf.append(int(max(-1.0, min(1.0, v)) * 32767))

    pcm = buf.tobytes()
    header = (
        b"RIFF"
        + (36 + len(pcm)).to_bytes(4, "little")
        + b"WAVEfmt "
        + (16).to_bytes(4, "little")
        + (1).to_bytes(2, "little")
        + (1).to_bytes(2, "little")
        + rate.to_bytes(4, "little")
        + (rate * 2).to_bytes(4, "little")
        + (2).to_bytes(2, "little")
        + (16).to_bytes(2, "little")
        + b"data"
        + len(pcm).to_bytes(4, "little")
        + pcm
    )
    if melody == "soft":
        _CHIME_CACHE = header
    return header


def play_chime(melody: str = "soft") -> None:
    try:
        import winsound

        winsound.PlaySound(chime(melody), winsound.SND_MEMORY | winsound.SND_ASYNC | winsound.SND_NODEFAULT)
    except Exception:
        try:
            import winsound

            winsound.MessageBeep(winsound.MB_ICONASTERISK)
        except Exception:
            pass


# ---------------------------------------------------------------- 开机自启
_RUN_KEY = r"Software\Microsoft\Windows\CurrentVersion\Run"
_RUN_NAME = "TutuPetReminder"


def _launch_command() -> str:
    if getattr(sys, "frozen", False):
        return f'"{os.path.abspath(sys.executable)}"'
    py = sys.executable
    script = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pet.py")
    return f'"{py}" "{script}"'


def autostart_enabled() -> bool:
    try:
        import winreg

        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, _RUN_KEY) as k:
            winreg.QueryValueEx(k, _RUN_NAME)
        return True
    except Exception:
        return False


def set_autostart(on: bool) -> bool:
    try:
        import winreg

        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, _RUN_KEY, 0, winreg.KEY_SET_VALUE) as k:
            if on:
                winreg.SetValueEx(k, _RUN_NAME, 0, winreg.REG_SZ, _launch_command())
            else:
                try:
                    winreg.DeleteValue(k, _RUN_NAME)
                except FileNotFoundError:
                    pass
        return True
    except Exception:
        return False


# ---------------------------------------------------------------- 样式
QSS = f"""
QDialog, QWidget#page {{
    background: {BG};
    color: {INK};
}}
QLabel {{
    color: {INK};
    font-family: "Microsoft YaHei UI";
    font-size: 12px;
}}
QLabel#h1 {{
    font-size: 17px;
    font-weight: 700;
}}
QLabel#hint {{
    color: #9C8177;
    font-size: 11px;
}}
QLabel#preview {{
    background: #FFFFFF;
    border: 2px solid {PINK_SOFT};
    border-radius: 14px;
}}
QPushButton {{
    background: #FFFFFF;
    border: 2px solid {PINK_SOFT};
    border-radius: 11px;
    padding: 6px 12px;
    color: {INK};
    font-family: "Microsoft YaHei UI";
    font-size: 12px;
}}
QPushButton:hover {{
    background: #FFF0F5;
    border-color: {PINK};
}}
QPushButton:pressed {{
    background: {PINK_SOFT};
}}
QPushButton#primary {{
    background: {PINK};
    border: 2px solid {PINK};
    color: #FFFFFF;
    font-weight: 700;
}}
QPushButton#primary:hover {{
    background: #FF7CA4;
}}
QPushButton#ghost {{
    background: transparent;
    border: 2px dashed {PINK_SOFT};
}}
QLineEdit, QSpinBox, QTimeEdit, QComboBox {{
    background: #FFFFFF;
    border: 2px solid {PINK_SOFT};
    border-radius: 10px;
    padding: 4px 8px;
    color: {INK};
    font-family: "Microsoft YaHei UI";
    font-size: 12px;
    selection-background-color: {PINK_SOFT};
}}
QLineEdit:focus, QSpinBox:focus, QTimeEdit:focus, QComboBox:focus {{
    border-color: {PINK};
}}
QComboBox QAbstractItemView {{
    background: #FFFFFF;
    border: 2px solid {PINK_SOFT};
    border-radius: 8px;
    padding: 4px;
    outline: none;
    selection-background-color: {PINK_SOFT};
    selection-color: {INK};
}}
QCheckBox {{
    color: {INK};
    font-family: "Microsoft YaHei UI";
    font-size: 12px;
    spacing: 6px;
}}
QScrollArea {{
    border: none;
    background: transparent;
}}
QScrollBar:vertical {{
    background: transparent;
    width: 9px;
    margin: 2px;
}}
QScrollBar::handle:vertical {{
    background: {PINK_SOFT};
    border-radius: 4px;
    min-height: 28px;
}}
QScrollBar::add-line, QScrollBar::sub-line {{
    height: 0;
}}
QFrame#card {{
    background: #FFFFFF;
    border: 2px solid {PINK_SOFT};
    border-radius: 14px;
}}
QFrame#sep {{
    background: {PINK_SOFT};
    max-height: 2px;
    border: none;
}}
QMenu {{
    background: {CREAM};
    border: 2px solid {PINK_SOFT};
    border-radius: 10px;
    padding: 6px;
    font-family: "Microsoft YaHei UI";
    font-size: 12px;
    color: {INK};
}}
QMenu::item {{
    padding: 6px 22px 6px 14px;
    border-radius: 7px;
}}
QMenu::item:selected {{
    background: {PINK_SOFT};
}}
QMenu::separator {{
    height: 1px;
    background: #F2DFE6;
    margin: 5px 8px;
}}
"""


def dt_text(ts: float) -> str:
    if not ts:
        return "—"
    return time.strftime("%m-%d %H:%M", time.localtime(ts))
