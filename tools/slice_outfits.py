"""把 4 张 3x3 的造型图切成 36 张透明 PNG，写入 app/assets/outfits/。

背景是纯绿 #90EE90，用「从边缘洪水填充 + 腐蚀」去底，
这样连体睡衣那种本来就偏绿的布料不会被误删。

用法：python tools/slice_outfits.py [图1 图2 图3 图4]
不传参数时用下面的默认路径。
"""
from __future__ import annotations

import os
import sys

from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(HERE, "app", "assets", "outfits")
SHOTS = os.path.join(HERE, "app", "_shots")

SHEETS = [
    r"C:\Users\Administrator\.workbuddy\clipboard-images\clipboard-2026-10-30T13-18-20-019Z-4fa9a90a.jpg",
    r"C:\Users\Administrator\.workbuddy\clipboard-images\clipboard-2026-10-30T13-18-20-021Z-367a1ce1.jpg",
    r"C:\Users\Administrator\.workbuddy\clipboard-images\clipboard-2026-10-30T13-18-20-022Z-48c8effd.jpg",
    r"C:\Users\Administrator\.workbuddy\clipboard-images\clipboard-2026-10-30T13-18-20-023Z-a4c01495.jpg",
]

CANVAS = 360          # 和现有素材一致
BASELINE = 344        # 现有素材内容底边大约在 y=344
TARGET_H = 330        # 最高的那套在画布里占多高


def cutout(cell: Image.Image) -> Image.Image:
    """去绿底，返回带 alpha 的图（未裁剪）。"""
    rgb = cell.convert("RGB")
    work = rgb.copy()
    w, h = work.size
    seeds = [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3),
             (w // 2, 2), (w // 2, h - 3), (2, h // 2), (w - 3, h // 2)]
    for s in seeds:
        try:
            ImageDraw.floodfill(work, s, (255, 0, 255), thresh=70)
        except Exception:
            pass

    bg = work.load()
    mask = Image.new("L", (w, h), 255)
    mp = mask.load()
    for y in range(h):
        for x in range(w):
            if bg[x, y] == (255, 0, 255):
                mp[x, y] = 0

    # 收 1px 再柔化，去掉 JPEG 边缘那圈绿边
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    out = rgb.convert("RGBA")
    out.putalpha(mask)
    return out


def main() -> None:
    os.makedirs(ASSETS, exist_ok=True)
    os.makedirs(SHOTS, exist_ok=True)

    sheets = sys.argv[1:] or SHEETS
    items = []
    for sheet in sheets:
        im = Image.open(sheet).convert("RGB")
        cw, ch = im.width // 3, im.height // 3
        for r in range(3):
            for c in range(3):
                cell = im.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
                cut = cutout(cell)
                bbox = cut.getbbox()
                if bbox is None:
                    raise SystemExit("空图：" + sheet)
                items.append(cut.crop(bbox))
        print("切完", os.path.basename(sheet))

    max_h = max(i.height for i in items)
    s = TARGET_H / max_h
    print(f"共 {len(items)} 套，最高 {max_h}px，统一缩放 {s:.3f}")

    for idx, cut in enumerate(items, start=1):
        nw, nh = max(1, round(cut.width * s)), max(1, round(cut.height * s))
        im = cut.resize((nw, nh), Image.LANCZOS)
        canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
        x = (CANVAS - nw) // 2
        y = min(BASELINE - nh, CANVAS - nh)
        canvas.alpha_composite(im, (max(0, x), max(0, y)))
        canvas.save(os.path.join(ASSETS, f"{idx:02d}.png"))
        print(f"{idx:02d}.png  {nw}x{nh}")

    # 预览表：紫底 + 2 倍放大，方便肉眼看绿边
    cols, pad = 6, 8
    size = 180
    rows = (len(items) + cols - 1) // cols
    sheet = Image.new("RGBA", (cols * (size + pad) + pad, rows * (size + pad) + pad), (120, 80, 160, 255))
    for i in range(len(items)):
        p = Image.open(os.path.join(ASSETS, f"{i + 1:02d}.png")).resize((size, size), Image.LANCZOS)
        x = pad + (i % cols) * (size + pad)
        y = pad + (i // cols) * (size + pad)
        sheet.alpha_composite(p, (x, y))
    sheet.save(os.path.join(SHOTS, "new_outfits.png"))
    print("预览：", os.path.join(SHOTS, "new_outfits.png"))


if __name__ == "__main__":
    main()
