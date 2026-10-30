"""打包便携单文件 exe（不内嵌 Electron / lolPing 运行组件）。

和 build.py 的区别：
  - build.py 产物是 onedir 目录（~520MB，内嵌 Electron，lolPing 可用）
  - 本脚本产物是单个 exe（~50MB，lolPing 不可用时只给提示，不影响其它功能）

用法：  python tools/build_portable.py
产物：  dist_portable/兔兔桌宠.exe
"""
from __future__ import annotations

import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
APP = os.path.join(ROOT, "app")
ICON_PNG = os.path.join(APP, "assets", "icon256.png")
ICON_ICO = os.path.join(ROOT, "build", "app.ico")
NAME = "兔兔桌宠"


def make_icon() -> str:
    os.makedirs(os.path.dirname(ICON_ICO), exist_ok=True)
    try:
        from PIL import Image

        Image.open(ICON_PNG).convert("RGBA").save(
            ICON_ICO, sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
        )
        return ICON_ICO
    except Exception as e:
        print("跳过图标：", e)
        return ""


def main() -> int:
    icon = make_icon()
    args = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm", "--clean", "--onefile", "--windowed",
        "--name", NAME,
        "--distpath", os.path.join(ROOT, "dist_portable"),
        "--workpath", os.path.join(ROOT, "build", "portable"),
        "--specpath", os.path.join(ROOT, "build", "portable"),
        "--paths", APP,
        "--add-data", f"{os.path.join(APP, 'assets')};assets",
        "--hidden-import", "PySide6.QtNetwork",
        "--exclude-module", "tkinter",
        "--exclude-module", "unittest",
        os.path.join(APP, "pet.py"),
    ]
    if icon:
        args[-1:-1] = ["--icon", icon]
    env = os.environ.copy()
    env["PATH"] = os.pathsep.join(
        p for p in env.get("PATH", "").split(os.pathsep) if "poppler" not in p.lower()
    )
    r = subprocess.run(args, cwd=ROOT, env=env)
    if r.returncode == 0:
        exe = os.path.join(ROOT, "dist_portable", NAME + ".exe")
        print("OK ->", exe, os.path.getsize(exe) // 1024 // 1024, "MB")
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
