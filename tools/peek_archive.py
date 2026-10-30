"""列出 / 提取 PyInstaller onefile 归档里的文件（只读，不改原 exe）。

用法：
    python tools/peek_archive.py <exe> [--list] [--get 名字前缀] [--out 目录]
"""
from __future__ import annotations

import os
import struct
import sys
import zlib

MAGIC = b"MEI\x0c\x0b\x0a\x0b\x0e"


def parse(path: str):
    d = open(path, "rb").read()
    j = d.rfind(MAGIC)
    if j < 0:
        raise SystemExit("不是 PyInstaller 归档")
    pkglen, tocoff, toclen, pyver = struct.unpack("!iiii", d[j + 8:j + 24])
    start = j + 24 - pkglen
    raw = d[start + tocoff:start + tocoff + toclen]
    pos = 0
    out = []
    while pos + 4 <= len(raw):
        elen = struct.unpack("!i", raw[pos:pos + 4])[0]
        if elen <= 0 or pos + 4 + elen > len(raw) + 4:
            break
        p = pos + 4
        off, clen, ulen, flag, typ = struct.unpack("!iiiiB", raw[p:p + 17])
        p += 17
        name = raw[p:pos + 4 + elen].split(b"\x00")[0].decode("utf8", "replace")
        out.append({"name": name, "off": off, "clen": clen, "ulen": ulen,
                    "flag": flag, "typ": chr(typ) if typ < 128 else str(typ)})
        pos += 4 + elen
    return d, start, out, pyver


def read(d: bytes, start: int, e: dict) -> bytes:
    blob = d[start + e["off"]:start + e["off"] + e["clen"]]
    if e["flag"]:
        blob = zlib.decompress(blob)
    return blob


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    path = sys.argv[1]
    d, start, entries, pyver = parse(path)
    if "--list" in sys.argv or len(sys.argv) == 2:
        print(f"共 {len(entries)} 项，Python {pyver >> 8}.{pyver & 0xFF}")
        for e in entries:
            if e["typ"] in ("s", "m", "M", "z"):
                print(f"{e['typ']} {e['ulen']:>9} {e['name']}")
        return
    if "--get" in sys.argv:
        prefix = sys.argv[sys.argv.index("--get") + 1]
        outdir = sys.argv[sys.argv.index("--out") + 1] if "--out" in sys.argv else "_extract"
        os.makedirs(outdir, exist_ok=True)
        n = 0
        for e in entries:
            if e["name"].startswith(prefix):
                dst = os.path.join(outdir, os.path.basename(e["name"]))
                with open(dst, "wb") as f:
                    f.write(read(d, start, e))
                n += 1
        print(f"导出 {n} 个到 {outdir}")


if __name__ == "__main__":
    main()
