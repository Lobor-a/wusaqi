"""动作系统：单帧立绘也能活起来。

思路
----
素材是每套造型一张 360×360 的静态图，没有逐帧动画。所以这里用「程序化动作」：
把图片当成一张贴纸，在绘制时施加位移 / 挤压拉伸 / 旋转 / 翻转，再叠一层粒子
（心心、星星、灰尘、音符、zzz…），组合出待机小动作和互动反应。

* Pose  —— 一帧的姿态：dx/dy（相对窗口宽高的位移）、sx/sy（缩放）、rot（角度）
* ACTIONS —— 动作表：名字 -> (时长, 姿态函数, 特效触发点)
* Animator —— 播放器：推进时间、触发粒子、把呼吸感叠加到姿态上
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass

from PySide6.QtCore import QPointF, QRectF, Qt
from PySide6.QtGui import QColor, QFont, QPainter


# ------------------------------------------------------------------ 基础
@dataclass
class Pose:
    dx: float = 0.0      # 相对窗口宽度的横向偏移
    dy: float = 0.0      # 相对窗口高度的纵向偏移（负=向上）
    sx: float = 1.0      # 横向缩放
    sy: float = 1.0      # 纵向缩放
    rot: float = 0.0     # 旋转角度（度，正=顺时针）


def ease_out(t: float) -> float:
    return 1 - (1 - t) ** 3


def ease_in_out(t: float) -> float:
    return 0.5 - 0.5 * math.cos(math.pi * t)


def ease_out_back(t: float) -> float:
    c = 1.70158
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2


def damp(t: float) -> float:
    """衰减振荡包络：猛地动一下然后慢慢停住。"""
    return math.exp(-3.2 * t) * math.cos(t * math.pi * 3.0)


# ------------------------------------------------------------------ 姿态函数
def p_hop(t: float) -> Pose:
    s = math.sin(math.pi * t)
    sq = 0.12 * (1 - s)
    return Pose(dy=-0.10 * s, sy=1 - sq * 0.7, sx=1 + sq)


def p_land(t: float) -> Pose:
    k = math.exp(-6 * t) * math.cos(t * math.pi * 4.2)
    return Pose(sy=1 - 0.26 * k, sx=1 + 0.20 * k, dy=0.04 * abs(k))


def p_turn(t: float) -> Pose:
    """原地转身：横向缩放扫过 0，看起来像转过去了。"""
    flip = math.cos(2 * math.pi * t)
    return Pose(sx=flip if abs(flip) > 0.12 else math.copysign(0.12, flip),
                dy=-0.06 * math.sin(math.pi * t), sy=1 + 0.02 * math.sin(math.pi * t))


def p_look(t: float) -> Pose:
    s = math.sin(2 * math.pi * t)
    return Pose(dx=0.05 * s, rot=3.5 * s, dy=-0.005 * abs(s))


def p_tilt(t: float) -> Pose:
    if t < 0.25:
        k = ease_out(t / 0.25)
    elif t < 0.75:
        k = 1.0 + 0.04 * math.sin((t - 0.25) * 12)
    else:
        k = 1 - ease_out((t - 0.75) / 0.25)
    return Pose(rot=-8 * k, dx=-0.012 * k)


def p_wiggle(t: float) -> Pose:
    a = math.sin(6 * math.pi * t) * (1 - t)
    return Pose(rot=7 * a, dx=0.018 * a, dy=-0.01 * abs(a))


def p_shake(t: float) -> Pose:
    a = damp(t) * 6
    return Pose(rot=a, sx=1 + 0.02 * a / 7, sy=1 - 0.01 * a / 7)


def p_stretch(t: float) -> Pose:
    if t < 0.3:
        k = ease_out(t / 0.3)
        return Pose(sy=1 - 0.10 * k, sx=1 + 0.08 * k)
    if t < 0.68:
        k = ease_out((t - 0.3) / 0.18)
        hold = 1.0 + 0.03 * math.sin((t - 0.5) * 20)
        return Pose(sy=(0.90 + 0.22 * k) * hold, sx=(1.08 - 0.16 * k) * (2 - hold), dy=-0.05 * k)
    k = ease_in_out((t - 0.68) / 0.32)
    return Pose(sy=1.12 - 0.12 * k, sx=0.92 + 0.08 * k, dy=-0.05 * (1 - k))


def p_yawn(t: float) -> Pose:
    if t < 0.35:
        k = ease_out(t / 0.35)
        return Pose(sy=1 + 0.07 * k, sx=1 - 0.04 * k, dy=-0.02 * k, rot=-2 * k)
    if t < 0.7:
        k = ease_in_out((t - 0.35) / 0.35)
        return Pose(sy=1.07 - 0.05 * k, sx=0.96 + 0.04 * k, dy=-0.02 * (1 - k), rot=-2 + 4 * k)
    k = ease_in_out((t - 0.7) / 0.3)
    return Pose(rot=2 - 2 * k, sy=1.02 - 0.02 * k)


def p_nod(t: float) -> Pose:
    k = math.sin(t * math.pi * 4) * (1 - t)
    return Pose(dy=0.045 * abs(k), sy=1 - 0.06 * abs(k), sx=1 + 0.04 * abs(k), rot=1.5 * k)


def p_dizzy(t: float) -> Pose:
    a = math.sin(2 * math.pi * 3.5 * t) * (1 - t) * 0.9
    return Pose(rot=9 * a, dx=0.03 * a, sy=1 - 0.02 * abs(a))


def p_pat(t: float) -> Pose:
    """被摸头：先缩一下，再舒服地左右晃。"""
    if t < 0.18:
        k = ease_out(t / 0.18)
        return Pose(sy=1 - 0.12 * k, sx=1 + 0.10 * k)
    if t < 0.62:
        k = math.sin((t - 0.18) * 22) * (1 - (t - 0.18) / 0.44)
        return Pose(rot=6 * k, sy=0.96 + 0.03 * abs(k), sx=1.04 - 0.03 * abs(k))
    k = ease_out_back((t - 0.62) / 0.38)
    return Pose(sy=0.96 + 0.04 * k, sx=1.04 - 0.04 * k)


def p_eat(t: float) -> Pose:
    """吃东西：一口一口地点头。"""
    if t < 0.12:
        k = ease_out(t / 0.12)
        return Pose(dy=0.02 * k, sy=1 - 0.05 * k, sx=1 + 0.04 * k)
    if t < 0.78:
        k = math.sin((t - 0.12) * math.pi * 9)
        return Pose(dy=0.018 * abs(k), sy=1 - 0.035 * abs(k), sx=1 + 0.03 * abs(k), rot=1.5 * k)
    k = ease_out((t - 0.78) / 0.22)
    return Pose(dy=0.014 * (1 - k), sy=0.97 + 0.03 * k, sx=1.03 - 0.03 * k)


def p_alert(t: float) -> Pose:
    """提醒到点：弹起来 + 抖两下。"""
    up = math.sin(math.pi * min(1.0, t * 1.6))
    a = damp(t) * 6
    return Pose(dy=-0.09 * up, sy=1 + 0.05 * up, sx=1 - 0.03 * up, rot=a)


def p_cheer(t: float) -> Pose:
    k = math.sin(math.pi * t)
    return Pose(dy=-0.09 * k, sy=1 + 0.05 * k, rot=6 * math.sin(4 * math.pi * t) * (1 - t))


# 名字 -> (时长秒, 姿态函数, 粒子触发 [(进度, 种类, 数量)])
ACTIONS: dict[str, tuple[float, object, list]] = {
    "hop": (0.62, p_hop, [(0.0, "dust", 3)]),
    "land": (0.45, p_land, []),
    "jump_spin": (0.85, p_cheer, [(0.0, "dust", 4), (0.15, "sparkle", 5)]),
    "turn": (0.75, p_turn, []),
    "look": (1.7, p_look, []),
    "tilt": (1.0, p_tilt, []),
    "wiggle": (0.6, p_wiggle, []),
    "shake": (0.5, p_shake, []),
    "stretch": (1.35, p_stretch, [(0.4, "sparkle", 4)]),
    "yawn": (1.9, p_yawn, [(0.45, "zzz", 2)]),
    "nod": (0.6, p_nod, []),
    "dizzy": (1.3, p_dizzy, [(0.0, "star", 4)]),
    "pat": (0.95, p_pat, [(0.05, "heart", 4)]),
    "eat": (1.25, p_eat, [(0.1, "carrot", 2), (0.75, "heart", 2)]),
    "alert": (0.9, p_alert, [(0.0, "exclaim", 1)]),
    "cheer": (1.1, p_cheer, [(0.1, "note", 3), (0.4, "sparkle", 3)]),
}

# 给菜单用的中文名
ACTION_LABELS = [
    ("hop", "蹦一下"),
    ("jump_spin", "开心蹦跳"),
    ("turn", "原地转身"),
    ("look", "左右张望"),
    ("tilt", "歪歪头"),
    ("wiggle", "甩甩身子"),
    ("shake", "抖一抖"),
    ("stretch", "伸懒腰"),
    ("yawn", "打个哈欠"),
    ("nod", "点点头"),
    ("cheer", "转圈撒花"),
    ("dizzy", "晕一下"),
]

# 待机时会自己玩的小动作：(动作名, 可能说的话)
IDLE_ACTIONS = [
    ("look", ""),
    ("tilt", ""),
    ("wiggle", ""),
    ("stretch", "伸个懒腰～"),
    ("yawn", "哈啊～有点困了"),
    ("turn", ""),
    ("nod", ""),
    ("shake", ""),
    ("hop", ""),
]


# ------------------------------------------------------------------ 粒子
class Particle:
    __slots__ = ("kind", "x", "y", "vx", "vy", "life", "ttl", "size", "rot", "spin")

    def __init__(self, kind, x, y, vx, vy, ttl, size):
        self.kind = kind
        self.x, self.y = x, y
        self.vx, self.vy = vx, vy
        self.ttl = ttl
        self.life = ttl
        self.size = size
        self.rot = random.uniform(-18, 18)
        self.spin = random.uniform(-90, 90)

    def step(self, dt: float) -> bool:
        self.life -= dt
        self.x += self.vx * dt
        self.y += self.vy * dt
        self.vy += 26 * dt if self.kind in ("heart", "note", "zzz") else 90 * dt
        self.rot += self.spin * dt
        return self.life > 0


_CHAR = {
    "heart": ("♥", QColor(255, 124, 164)),
    "sparkle": ("✦", QColor(255, 201, 77)),
    "note": ("♪", QColor(124, 156, 255)),
    "zzz": ("z", QColor(150, 128, 118)),
    "exclaim": ("!", QColor(255, 143, 177)),
    "star": ("✩", QColor(255, 176, 92)),
    "carrot": ("🥕", QColor(255, 160, 90)),
    "dust": ("", QColor(206, 192, 184)),
}


class Animator:
    """动作播放器：一次只播一个主动作，呼吸感始终叠在上面。"""

    def __init__(self) -> None:
        self.name: str | None = None
        self.t = 0.0
        self.dur = 0.0
        self.breath = 0.0
        self.particles: list[Particle] = []
        self._fired: set[int] = set()
        self._rect = QRectF(0, 0, 100, 100)
        self.extra_rot = 0.0  # 拖动时的惯性倾斜

    # -- 播放
    def play(self, name: str, force: bool = False) -> bool:
        if name not in ACTIONS:
            return False
        if self.name and not force:
            # 正在播的动作还剩得多，就先不打断；剩得少就直接接上
            remaining = ACTIONS[self.name][0] - self.t
            if self.name == name or remaining > 0.22:
                return False
        self.name = name
        self.t = 0.0
        self.dur = ACTIONS[name][0]
        self._fired.clear()
        # 在动作开始处按姿态函数补算粒子位置，避免第一帧没有参照
        return True

    @property
    def busy(self) -> bool:
        return self.name is not None

    def stop(self) -> None:
        self.name = None
        self.t = 0.0

    # -- 每帧
    def update(self, dt: float) -> None:
        dt = max(0.0, min(dt, 0.08))
        self.breath += dt
        self.extra_rot *= max(0.0, 1 - dt * 6)

        if self.name:
            self.t += dt
            self.dur = max(ACTIONS[self.name][0], 1e-6)
            progress = min(1.0, self.t / self.dur)
            for i, (at, kind, count) in enumerate(ACTIONS[self.name][2]):
                if progress >= at and i not in self._fired:
                    self._fired.add(i)
                    self._spawn(kind, count)
            if self.t >= self.dur:
                self.name = None
                self.t = 0.0

        self.particles = [p for p in self.particles if p.step(dt)]

    def _spawn(self, kind: str, count: int) -> None:
        r = self._rect
        if r.width() <= 1:
            return
        for _ in range(count):
            if kind in ("zzz", "exclaim", "note"):
                x = r.right() - r.width() * random.uniform(0.12, 0.30)
                y = r.top() + r.height() * random.uniform(0.12, 0.30)
            elif kind in ("heart", "star"):
                x = r.center().x() + random.uniform(-r.width() * 0.35, r.width() * 0.35)
                y = r.top() + r.height() * random.uniform(0.15, 0.45)
            elif kind == "carrot":
                x = r.center().x() + random.uniform(-0.06, 0.06) * r.width()
                y = r.top() + r.height() * 0.62
            elif kind == "dust":
                x = r.center().x() + random.uniform(-0.32, 0.32) * r.width()
                y = r.bottom() - r.height() * 0.03
            else:
                x = r.center().x()
                y = r.center().y()

            if kind == "dust":
                vx = random.uniform(-38, 38)
                vy = random.uniform(-26, -8)
                ttl = random.uniform(0.32, 0.6)
            elif kind in ("heart", "note", "zzz"):
                vx = random.uniform(-14, 14)
                vy = random.uniform(-44, -26)
                ttl = random.uniform(0.9, 1.5)
            elif kind == "carrot":
                vx = random.uniform(-10, 10)
                vy = random.uniform(-30, -18)
                ttl = 0.8
            else:
                vx = random.uniform(-30, 30)
                vy = random.uniform(-42, -14)
                ttl = random.uniform(0.55, 1.0)
            size = {
                "heart": random.uniform(15, 22),
                "sparkle": random.uniform(13, 19),
                "note": random.uniform(15, 21),
                "zzz": random.uniform(13, 18),
                "exclaim": 26,
                "star": random.uniform(14, 20),
                "carrot": random.uniform(16, 21),
                "dust": random.uniform(3, 6),
            }.get(kind, 12)
            self.particles.append(Particle(kind, x, y, vx, vy, ttl, size))

    # -- 取姿态
    def pose(self, grounded: bool = True, sleeping: bool = False) -> Pose:
        p = Pose()
        if self.name:
            fn = ACTIONS[self.name][1]
            p = fn(min(1.0, self.t / self.dur))

        # 呼吸：站着时轻轻起伏，睡着时更慢更大
        if sleeping:
            b = 1 + 0.022 * math.sin(self.breath * 1.5)
        elif grounded:
            b = 1 + 0.013 * math.sin(self.breath * 2.4)
        else:
            b = 1.0
        p.sy *= b
        p.rot += self.extra_rot
        return p

    # -- 画粒子
    def draw(self, painter: QPainter, rect: QRectF) -> None:
        self._rect = QRectF(rect)
        if not self.particles:
            return
        painter.save()
        painter.setRenderHint(QPainter.Antialiasing, True)
        # 粒子大小跟着兔兔的大小一起缩放
        k = max(0.8, min(1.7, rect.width() / 200.0)) if rect.width() > 1 else 1.0
        for pt in self.particles:
            ch, color = _CHAR.get(pt.kind, ("•", QColor(0, 0, 0)))
            a = max(0.0, min(1.0, pt.life / pt.ttl))
            if pt.kind == "dust":
                c = QColor(color)
                c.setAlphaF(0.55 * a)
                painter.setPen(Qt.NoPen)
                painter.setBrush(c)
                painter.drawEllipse(QPointF(pt.x, pt.y), pt.size * k, pt.size * 0.7 * k)
                continue
            c = QColor(color)
            c.setAlphaF(min(1.0, a * 1.4))
            painter.setPen(c)
            f = QFont("Microsoft YaHei UI")
            f.setPixelSize(int(pt.size * k * (0.8 + 0.35 * (1 - a))))
            f.setBold(pt.kind in ("exclaim", "heart"))
            painter.setFont(f)
            painter.translate(QPointF(pt.x, pt.y))
            if pt.rot:
                painter.rotate(pt.rot)
            painter.drawText(QPointF(-pt.size * k * 0.35, 0), ch)
            if pt.rot:
                painter.rotate(-pt.rot)
            painter.translate(QPointF(-pt.x, -pt.y))
        painter.restore()

    # -- 便捷
    def burst(self, kind: str, count: int = 4) -> None:
        self._spawn(kind, count)


def label_of(name: str) -> str:
    for k, v in ACTION_LABELS:
        if k == name:
            return v
    return name
