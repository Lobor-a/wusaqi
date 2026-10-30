# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['D:/2026-10-29-20-07-04/兔兔桌宠_提醒版/app/pet.py'],
    pathex=['D:/2026-10-29-20-07-04/兔兔桌宠_提醒版/app'],
    binaries=[],
    datas=[('D:/2026-10-29-20-07-04/兔兔桌宠_提醒版/app/assets', 'assets')],
    hiddenimports=['PySide6.QtNetwork'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['tkinter', 'unittest'],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='兔兔桌宠_提醒版',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['D:/2026-10-29-20-07-04/兔兔桌宠_提醒版/build/app.ico'],
)
