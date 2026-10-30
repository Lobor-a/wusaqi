"""打包成包含 lolPing 运行组件的程序目录。

用法：  python build.py
产物：  dist/兔兔桌宠/兔兔桌宠.exe
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
NAME = "兔兔桌宠"


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
    electron = os.environ.get("TUTU_ELECTRON_DIR", os.path.join(os.path.expanduser("~"), ".dsh", "electron"))
    if not os.path.isfile(os.path.join(electron, "electron.exe")):
        print("未找到 Electron：请设置 TUTU_ELECTRON_DIR 指向 Electron 运行目录。")
        return 1
    args = [
        sys.executable,
        "-m",
        "PyInstaller",
        "--noconfirm",
        "--clean",
        "--onedir",
        "--windowed",
        "--name",
        NAME,
        "--specpath",
        os.path.join(HERE, "build"),
        "--paths",
        APP,
        "--add-data",
        f"{os.path.join(APP, 'assets')};assets",
        "--add-data",
        f"{os.path.join(HERE, 'runtime', 'lolping')};runtime/lolping",
        "--add-data",
        f"{electron};runtime/electron",
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
    # Poppler's ICU has incompatible exports with the Windows ICU used by Qt.
    # Do not let PyInstaller collect it from this machine's PATH.
    env = os.environ.copy()
    env["PATH"] = os.pathsep.join(
        p for p in env.get("PATH", "").split(os.pathsep)
        if "poppler" not in p.lower()
    )
    r = subprocess.run(args, cwd=HERE, env=env)
    if r.returncode == 0:
        exe = os.path.join(HERE, "dist", NAME, NAME + ".exe")
        print("OK ->", exe, os.path.getsize(exe) // 1024 // 1024, "MB")
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
