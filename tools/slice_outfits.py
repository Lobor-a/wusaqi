"""把 4 张 3x3 的造型图切成 36 张透明 PNG，并做「本体归一化」。

归一化是重点：36 张图是分别画的，头大头小、落地高矮都不一样，
直接换装会像换了一只兔子。所以每张都按 **头宽** 统一缩放，
再把 **头心对齐画布中线**、**脚底对齐同一条基线**：

    1. 边缘洪水填充去绿底（不按颜色抠，青蛙/恐龙装不会被掏空）
    2. 收 1px + 柔化，去掉 JPEG 边缘的绿边
    3. 量出「头最宽一行」的宽度与中心、内容最低点
    4. 缩放 = 目标头宽 / 实测头宽（超宽的道具会反过来压低缩放，避免裁切）
    5. 头心 x → 180，脚底 y → 344，画布固定 360x360

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

CANVAS = 360          # 画布边长（和旧素材一致）
BASELINE = 344        # 脚底基线
HEAD_W = 250          # 归一化后的统一头宽
MAX_W = 352           # 缩放后内容最大宽度，超了就把缩放压下来（宁可小一点也别被裁）
MAX_H = BASELINE      # 长耳朵 + 高帽子的套会被头宽放大到超高，这里封顶，避免裁掉耳朵


def cutout(cell: Image.Image) -> Image.Image:
    """去绿底，返回带 alpha 的图。"""
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
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    out = rgb.convert("RGBA")
    out.putalpha(mask)
    return out


def face_anchor(img: Image.Image) -> tuple[int, float, int, int]:
    """量头部：返回（头宽、头心 x、头最宽行 y、内容底 y），坐标是 img 自己的像素。"""
    px = img.split()[3].load()
    w, h = img.size
    rows = []
    for y in range(h):
        xs = [x for x in range(w) if px[x, y] > 120]
        if xs:
            rows.append((y, min(xs), max(xs)))
    if not rows:
        raise ValueError("空白图")
    top, bottom = rows[0][0], rows[-1][0]
    span = max(1, bottom - top)
    lo, hi = top + int(span * 0.12), top + int(span * 0.58)
    band = [r for r in rows if lo <= r[0] <= hi] or rows
    y_head, x0, x1 = max(band, key=lambda r: r[2] - r[1])
    return (x1 - x0), (x0 + x1) / 2, y_head, bottom


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
        print("切完", os.path.basename(sheet), f"{len(items)} 套")

    print(f"\n{'#':>3} {'头宽':>5} {'缩放':>6} {'贴图宽':>6} {'贴图高':>6} {'受限':>4}")
    made = []
    for idx, cut in enumerate(items, start=1):
        head_w, head_cx, head_y, bottom = face_anchor(cut)
        s = HEAD_W / head_w
        limit = ""
        if cut.width * s > MAX_W:
            s = MAX_W / cut.width
            limit = "宽"
        if cut.height * s > MAX_H:
            s = MAX_H / cut.height
            limit = "高"
        nw, nh = max(1, round(cut.width * s)), max(1, round(cut.height * s))
        im = cut.resize((nw, nh), Image.LANCZOS)

        # 头心 x 落在 180，脚底落在 344
        x = round(CANVAS / 2 - head_cx * s)
        y = round(BASELINE - nh - (cut.height - 1 - bottom) * s)
        if nw <= CANVAS:
            x = max(min(x, CANVAS - nw), 0)
        else:
            x = (CANVAS - nw) // 2
        if nh <= CANVAS:
            y = max(min(y, CANVAS - nh), 0)
        else:
            y = (CANVAS - nh) // 2

        canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
        canvas.alpha_composite(im, (x, y))
        canvas.save(os.path.join(ASSETS, f"{idx:02d}.png"))
        print(f"{idx:>3} {head_w:>5} {s:>6.3f} {nw:>6} {nh:>6} {limit:>4}")
        made.append(canvas)

    # 校验图 1：36 套叠在一起，看头是不是重合
    over = Image.new("RGBA", (CANVAS, CANVAS), (250, 250, 252, 255))
    for c in made:
        over.alpha_composite(c)
    over.save(os.path.join(SHOTS, "overlay_all.png"))

    # 校验图 2：真实大小网格（浅灰底）
    cols, pad, size = 6, 8, 222
    rows_n = (len(made) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * (size + pad) + pad, rows_n * (size + pad) + pad), (236, 238, 243))
    for i, c in enumerate(made):
        t = Image.new("RGBA", (size, size), (236, 238, 243, 255))
        t.alpha_composite(c.resize((size, size), Image.LANCZOS))
        sheet.paste(t.convert("RGB"), (pad + (i % cols) * (size + pad), pad + (i // cols) * (size + pad)))
    sheet.save(os.path.join(SHOTS, "new_outfits.png"))
    print("校验图：", os.path.join(SHOTS, "overlay_all.png"), "/", os.path.join(SHOTS, "new_outfits.png"))


if __name__ == "__main__":
    main()
