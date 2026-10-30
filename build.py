"""打包成单文件 exe。

用法：  python build.py
产物：  dist/兔兔桌宠_提醒版.exe
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(HERE, "app")
ICON_PNG = os.path.join(APP, "assets", "icon256.png")
ICON_ICO = os.path.join(HERE, "build", "app.ico")
NAME = "兔兔桌宠_提醒版"


def make_icon() -> str:
    os.makedirs(os.path.dirname(ICON_ICO), exist_ok=True)
    try:
        from PIL import Image

        im = Image.open(ICON_PNG).convert("RGBA")
        im.save(ICON_ICO, sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)])
        return ICON_ICO
    except Exception as e:  # 没装 pillow 也能打包，只是没图标
        print("跳过图标：", e)
        return ""


def main() -> int:
    icon = make_icon()
    args = [
        sys.executable,
        "-m",
        "PyInstaller",
        "--noconfirm",
        "--clean",
        "--onefile",
        "--windowed",
        "--name",
        NAME,
        "--paths",
        APP,
        "--add-data",
        f"{os.path.join(APP, 'assets')};assets",
        "--hidden-import",
        "PySide6.QtNetwork",
        "--exclude-module",
        "tkinter",
        "--exclude-module",
        "unittest",
        os.path.join(APP, "pet.py"),
    ]
    if icon:
        args[-1:-1] = ["--icon", icon]
    print(" ".join(args))
    r = subprocess.run(args, cwd=HERE)
    if r.returncode == 0:
        exe = os.path.join(HERE, "dist", NAME + ".exe")
        print("OK ->", exe, os.path.getsize(exe) // 1024 // 1024, "MB")
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
