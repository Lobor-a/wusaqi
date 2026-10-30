"""提醒系统：数据、调度、设置界面。

设计要点
--------
* 提醒两种类型：`clock`（每天/指定星期的固定时刻）和 `interval`（每隔 N 分钟）。
* 提醒数据单独存 reminders.json，不会和旧版的 pet_config.json 打架。
* 触发时交给 PetWindow 的 on_fire 回调，由兔兔说话 + 响铃 + 给两个按钮
  （「知道啦」/「N 分钟后再提醒」）。
"""
from __future__ import annotations

import datetime as dt
import json
import os
import time
import uuid
from typing import Callable

from PySide6.QtCore import QTime, Qt
from PySide6.QtWidgets import (
    QCheckBox,
    QComboBox,
    QDialog,
    QFrame,
    QGridLayout,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QPushButton,
    QScrollArea,
    QSpinBox,
    QTimeEdit,
    QVBoxLayout,
    QWidget,
)

import theme

WEEK_CN = ["一", "二", "三", "四", "五", "六", "日"]


# ------------------------------------------------------------------ 预设
def preset(name: str, kind: str, when: str, text: str, every: int = 0, days=None, enabled=True) -> dict:
    return {
        "id": uuid.uuid4().hex[:8],
        "name": name,
        "kind": kind,
        "time": when if kind == "clock" else "23:00",
        "every": every,
        "days": list(days or []),
        "text": text,
        "enabled": enabled,
        "sound": True,
        "snooze": 5,
        "last_key": "",
        "last_ts": 0.0,
        "snooze_ts": 0.0,
    }


PRESETS: list[tuple[str, Callable[[], dict]]] = [
    ("🛏 睡觉", lambda: preset("睡觉提醒", "clock", "23:00", "该睡觉啦，{name}～再不睡就变成小熊猫了")),
    ("☀ 起床", lambda: preset("起床提醒", "clock", "07:30", "起床啦{name}！今天也要元气满满哦")),
    ("💧 喝水", lambda: preset("喝水提醒", "interval", "", "喝口水吧{name}，嗓子干干的我会心疼", every=60)),
    ("🧍 久坐", lambda: preset("久坐提醒", "interval", "", "站起来伸个懒腰吧{name}，走两步再坐下", every=45)),
    ("🍚 吃饭", lambda: preset("吃饭提醒", "clock", "12:00", "到饭点啦{name}，别让胃空着")),
    ("👀 护眼", lambda: preset("护眼提醒", "interval", "", "看看窗外的远处，让眼睛休息 20 秒", every=20)),
    ("🌙 晚安", lambda: preset("晚安提醒", "clock", "22:30", "早点洗漱吧{name}，我给你留着被窝～")),
]


def seed_items() -> list[dict]:
    """第一次运行时给几条能立刻用起来的提醒。"""
    a = PRESETS[0][1]()
    b = PRESETS[2][1]()
    c = PRESETS[3][1]()
    c["enabled"] = False
    return [a, b, c]


# ------------------------------------------------------------------ 描述
def schedule_text(r: dict) -> str:
    if r.get("kind") == "interval":
        every = int(r.get("every") or 0)
        if every % 60 == 0 and every >= 60:
            return f"每 {every // 60} 小时"
        return f"每 {every} 分钟"
    days = sorted(int(d) for d in (r.get("days") or []))
    if not days:
        d = "每天"
    elif days == [0, 1, 2, 3, 4]:
        d = "工作日"
    elif days == [5, 6]:
        d = "周末"
    else:
        d = "周" + "、".join(WEEK_CN[i] for i in days)
    return f"{d} {r.get('time', '00:00')}"


def render_text(r: dict, who: str) -> str:
    text = (r.get("text") or r.get("name") or "时间到啦").strip()
    text = text.replace("{name}", who or "你")
    if who and "{name}" not in (r.get("text") or "") and not text.startswith(who):
        # 没写占位符也不硬塞称呼，保持原文案
        pass
    return text


# ------------------------------------------------------------------ 数据
class ReminderStore:
    def __init__(self, path: str | None = None):
        self.path = path or theme.REMINDER_PATH
        self.data = {"name": "", "muted_until": 0.0, "items": []}
        self.fresh = False
        self.load()

    def load(self) -> None:
        fresh = not os.path.exists(self.path)
        self.fresh = fresh
        if not fresh:
            try:
                with open(self.path, "r", encoding="utf-8") as f:
                    raw = json.load(f)
                if isinstance(raw, dict):
                    self.data["name"] = raw.get("name", "") or ""
                    self.data["muted_until"] = float(raw.get("muted_until") or 0)
                    items = raw.get("items")
                    if isinstance(items, list):
                        self.data["items"] = [self._fix(i) for i in items if isinstance(i, dict)]
            except Exception:
                pass
        else:
            self.data["items"] = seed_items()
            self.save()

    @staticmethod
    def _fix(r: dict) -> dict:
        base = preset(r.get("name", "提醒"), r.get("kind", "clock"), r.get("time", "23:00"), r.get("text", ""))
        base.update({k: v for k, v in r.items() if v is not None})
        base["id"] = str(base.get("id") or uuid.uuid4().hex[:8])
        base["kind"] = "interval" if base.get("kind") == "interval" else "clock"
        try:
            base["every"] = max(1, int(base.get("every") or 60))
        except Exception:
            base["every"] = 60
        base["days"] = [int(d) for d in (base.get("days") or []) if 0 <= int(d) <= 6]
        base["snooze"] = max(0, int(base.get("snooze") or 0))
        base["enabled"] = bool(base.get("enabled", True))
        base["sound"] = bool(base.get("sound", True))
        return base

    def save(self) -> None:
        try:
            tmp = self.path + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(self.data, f, ensure_ascii=False, indent=2)
            os.replace(tmp, self.path)
        except Exception:
            pass

    # -- 便捷访问
    @property
    def items(self) -> list[dict]:
        return self.data["items"]

    @property
    def who(self) -> str:
        return (self.data.get("name") or "").strip()

    @who.setter
    def who(self, v: str) -> None:
        self.data["name"] = (v or "").strip()
        self.save()

    @property
    def muted_until(self) -> float:
        return float(self.data.get("muted_until") or 0)

    def mute(self, minutes: float) -> None:
        self.data["muted_until"] = time.time() + minutes * 60
        self.save()

    def unmute(self) -> None:
        self.data["muted_until"] = 0
        self.save()

    def is_muted(self) -> bool:
        return self.muted_until > time.time()

    def add(self, r: dict) -> None:
        r["last_ts"] = time.time()
        self.items.append(r)
        self.save()

    def remove(self, rid: str) -> None:
        self.data["items"] = [r for r in self.items if r["id"] != rid]
        self.save()

    def get(self, rid: str) -> dict | None:
        for r in self.items:
            if r["id"] == rid:
                return r
        return None

    def replace(self, r: dict) -> None:
        for i, old in enumerate(self.items):
            if old["id"] == r["id"]:
                r["last_ts"] = old.get("last_ts", time.time())
                self.items[i] = r
                break
        self.save()


# ------------------------------------------------------------------ 调度
class ReminderEngine:
    """每 5 秒被叫一次，判断有没有到点的提醒。"""

    def __init__(self, store: ReminderStore, on_fire: Callable[[dict], None]):
        self.store = store
        self.on_fire = on_fire
        self._last_tick = 0.0

    def tick(self) -> None:
        now = dt.datetime.now()
        ts = time.time()
        if ts - self._last_tick < 3:
            return
        self._last_tick = ts

        changed = False
        muted = self.store.is_muted()
        for r in list(self.store.items):
            if not r.get("enabled", True):
                continue

            # 稍后提醒到点
            snooze_ts = float(r.get("snooze_ts") or 0)
            if snooze_ts and ts >= snooze_ts:
                r["snooze_ts"] = 0
                r["last_ts"] = ts
                changed = True
                if not muted:
                    self.on_fire(r)
                continue

            if r.get("kind") == "interval":
                every = max(1, int(r.get("every") or 60)) * 60
                last = float(r.get("last_ts") or 0) or ts
                if not r.get("last_ts"):
                    r["last_ts"] = ts
                    changed = True
                elif ts - last >= every:
                    r["last_ts"] = ts
                    changed = True
                    if not muted:
                        self.on_fire(r)
                continue

            # 固定时刻（到点后 10 分钟内都算数，电脑刚从睡眠里醒过来也能补上）
            hhmm = str(r.get("time") or "23:00")
            try:
                hh, mm = (int(x) for x in hhmm.split(":"))
            except Exception:
                continue
            sched = now.replace(hour=hh, minute=mm, second=0, microsecond=0)
            late = (now - sched).total_seconds()
            if not (0 <= late <= 600):
                continue
            days = r.get("days") or []
            if days and now.weekday() not in [int(d) for d in days]:
                continue
            key = sched.strftime("%Y-%m-%d %H:%M")
            if r.get("last_key") == key:
                continue
            r["last_key"] = key
            r["last_ts"] = ts
            changed = True
            if not muted:
                self.on_fire(r)

        if changed:
            self.store.save()

    def next_hint(self, r: dict) -> str:
        """给设置界面显示「下次大概什么时候」。"""
        now = dt.datetime.now()
        if r.get("kind") == "interval":
            last = float(r.get("last_ts") or now.timestamp())
            nxt = dt.datetime.fromtimestamp(last + max(1, int(r.get("every") or 60)) * 60)
        else:
            try:
                hh, mm = (int(x) for x in str(r.get("time") or "23:00").split(":"))
            except Exception:
                hh, mm = 23, 0
            days = [int(d) for d in (r.get("days") or [])]
            for i in range(0, 8):
                cand = (now + dt.timedelta(days=i)).replace(hour=hh, minute=mm, second=0, microsecond=0)
                if cand <= now:
                    continue
                if days and cand.weekday() not in days:
                    continue
                nxt = cand
                break
            else:
                nxt = now
        if self.store.is_muted():
            return "已静音"
        return nxt.strftime("%m-%d %H:%M")


# ------------------------------------------------------------------ 界面
def _sep() -> QFrame:
    f = QFrame()
    f.setObjectName("sep")
    f.setFixedHeight(2)
    return f


class ReminderEditDialog(QDialog):
    def __init__(self, parent=None, data: dict | None = None, who: str = ""):
        super().__init__(parent)
        self.setWindowTitle("提醒详情")
        self.setMinimumWidth(430)
        self.setStyleSheet(theme.QSS)
        self.who = who
        self._data = json.loads(json.dumps(data)) if data else preset("新提醒", "clock", "22:00", "时间到啦{name}～")

        lay = QVBoxLayout(self)
        lay.setContentsMargins(18, 16, 18, 16)
        lay.setSpacing(10)

        title = QLabel("编辑提醒")
        title.setObjectName("h1")
        lay.addWidget(title)

        # 名称
        row = QHBoxLayout()
        row.addWidget(QLabel("名称"))
        self.ed_name = QLineEdit(self._data.get("name", ""))
        self.ed_name.setPlaceholderText("例如：该睡觉了")
        row.addWidget(self.ed_name, 1)
        lay.addLayout(row)

        # 类型
        row = QHBoxLayout()
        row.addWidget(QLabel("重复"))
        self.cb_kind = QComboBox()
        self.cb_kind.addItems(["每天定时", "每隔一段时间"])
        self.cb_kind.setCurrentIndex(1 if self._data.get("kind") == "interval" else 0)
        self.cb_kind.setFixedWidth(150)
        row.addWidget(self.cb_kind)
        lay.addLayout(row)

        # 定时
        self.box_clock = QWidget()
        bc = QVBoxLayout(self.box_clock)
        bc.setContentsMargins(0, 0, 0, 0)
        bc.setSpacing(8)

        r1 = QHBoxLayout()
        r1.addWidget(QLabel("时间"))
        self.te_time = QTimeEdit()
        self.te_time.setDisplayFormat("HH:mm")
        try:
            hh, mm = (int(x) for x in str(self._data.get("time", "22:00")).split(":"))
        except Exception:
            hh, mm = 22, 0
        self.te_time.setTime(QTime(hh, mm))
        self.te_time.setFixedWidth(110)
        r1.addWidget(self.te_time)
        r1.addStretch(1)
        bc.addLayout(r1)

        r2 = QHBoxLayout()
        r2.setSpacing(6)
        r2.addWidget(QLabel("星期"))
        self.day_boxes: list[QPushButton] = []
        sel = [int(d) for d in (self._data.get("days") or [])]
        for i, cn in enumerate(WEEK_CN):
            b = QPushButton(cn)
            b.setCheckable(True)
            b.setCursor(Qt.PointingHandCursor)
            b.setFixedSize(34, 28)
            b.setChecked(i in sel)
            b.setStyleSheet(
                "QPushButton{border:2px solid #FFD3E0;border-radius:9px;background:#FFF;"
                "color:#43261E;font-size:11px;padding:0;}"
                "QPushButton:hover{background:#FFF0F5;}"
                "QPushButton:checked{background:#FF8FB1;border-color:#FF8FB1;color:#FFF;font-weight:700;}"
            )
            self.day_boxes.append(b)
            r2.addWidget(b)
        r2.addStretch(1)
        for label, days in (("每天", []), ("工作日", [0, 1, 2, 3, 4]), ("周末", [5, 6])):
            qb = QPushButton(label)
            qb.setCursor(Qt.PointingHandCursor)
            qb.setFixedHeight(28)
            qb.clicked.connect(lambda _=False, d=days: self._set_days(d))
            r2.addWidget(qb)
        bc.addLayout(r2)
        hint = QLabel("全部不选 = 每天；只选一~五 = 只在工作日提醒")
        hint.setObjectName("hint")
        bc.addWidget(hint)
        lay.addWidget(self.box_clock)

        # 间隔
        self.box_every = QWidget()
        be = QHBoxLayout(self.box_every)
        be.setContentsMargins(0, 0, 0, 0)
        be.addWidget(QLabel("每隔"))
        self.sp_every = QSpinBox()
        self.sp_every.setRange(1, 720)
        self.sp_every.setSuffix(" 分钟")
        self.sp_every.setValue(int(self._data.get("every") or 60))
        self.sp_every.setFixedWidth(120)
        be.addWidget(self.sp_every)
        be.addStretch(1)
        lay.addWidget(self.box_every)

        # 文案
        lay.addWidget(_sep())
        row = QHBoxLayout()
        row.addWidget(QLabel("说"))
        self.ed_text = QLineEdit(self._data.get("text", ""))
        self.ed_text.setPlaceholderText("它会说的那句话，{name} 会替换成称呼")
        row.addWidget(self.ed_text, 1)
        lay.addLayout(row)
        tipp = QLabel(f"当前称呼：{who or '（未设置，可用「提醒设置」里填）'}；例：{{name}}，该睡觉啦")
        tipp.setObjectName("hint")
        lay.addWidget(tipp)

        # 选项
        row = QHBoxLayout()
        self.ck_sound = QCheckBox("响铃")
        self.ck_sound.setChecked(bool(self._data.get("sound", True)))
        row.addWidget(self.ck_sound)
        row.addSpacing(12)
        row.addWidget(QLabel("稍后提醒"))
        self.sp_snooze = QSpinBox()
        self.sp_snooze.setRange(0, 120)
        self.sp_snooze.setSuffix(" 分钟")
        self.sp_snooze.setValue(int(self._data.get("snooze") or 0))
        self.sp_snooze.setFixedWidth(110)
        row.addWidget(self.sp_snooze)
        row.addStretch(1)
        lay.addLayout(row)

        # 按钮
        btns = QHBoxLayout()
        self.btn_test = QPushButton("让它说一遍")
        self.btn_test.clicked.connect(self._test)
        btns.addWidget(self.btn_test)
        btns.addStretch(1)
        b_cancel = QPushButton("取消")
        b_cancel.clicked.connect(self.reject)
        btns.addWidget(b_cancel)
        b_ok = QPushButton("保存")
        b_ok.setObjectName("primary")
        b_ok.clicked.connect(self._accept)
        btns.addWidget(b_ok)
        lay.addLayout(btns)

        self.on_test: Callable[[str], None] | None = None
        self.cb_kind.currentIndexChanged.connect(self._sync_kind)
        self._sync_kind()

    def _set_days(self, days: list[int]) -> None:
        for i, b in enumerate(self.day_boxes):
            b.setChecked(i in days)

    def _sync_kind(self) -> None:
        interval = self.cb_kind.currentIndex() == 1
        self.box_clock.setVisible(not interval)
        self.box_every.setVisible(interval)
        self.adjustSize()

    def _collect(self) -> dict:
        d = dict(self._data)
        d["name"] = self.ed_name.text().strip() or "提醒"
        d["kind"] = "interval" if self.cb_kind.currentIndex() == 1 else "clock"
        t = self.te_time.time()
        d["time"] = f"{t.hour():02d}:{t.minute():02d}"
        d["days"] = [i for i, cb in enumerate(self.day_boxes) if cb.isChecked()]
        d["every"] = int(self.sp_every.value())
        d["text"] = self.ed_text.text().strip()
        d["sound"] = self.ck_sound.isChecked()
        d["snooze"] = int(self.sp_snooze.value())
        d["enabled"] = True
        return ReminderStore._fix(d)

    def _test(self) -> None:
        d = self._collect()
        if self.on_test:
            self.on_test(render_text(d, self.who))

    def _accept(self) -> None:
        if not self.ed_text.text().strip():
            self.ed_text.setText("时间到啦{name}～")
        self._result = self._collect()
        self.accept()

    def result_data(self) -> dict:
        return getattr(self, "_result", self._collect())


class ReminderDialog(QDialog):
    """提醒设置面板。"""

    def __init__(self, parent, store: ReminderStore, engine: ReminderEngine,
                 on_test: Callable[[str], None] | None = None):
        super().__init__(parent)
        self.store = store
        self.engine = engine
        self.on_test = on_test
        self.changed = False

        self.setWindowTitle("提醒设置")
        self.setMinimumSize(520, 560)
        self.setStyleSheet(theme.QSS)

        lay = QVBoxLayout(self)
        lay.setContentsMargins(20, 18, 20, 16)
        lay.setSpacing(10)

        head = QHBoxLayout()
        t = QLabel("⏰ 提醒设置")
        t.setObjectName("h1")
        head.addWidget(t)
        head.addStretch(1)
        self.lb_mute = QLabel("")
        self.lb_mute.setObjectName("hint")
        head.addWidget(self.lb_mute)
        lay.addLayout(head)

        sub = QLabel("到点了兔兔会跳出来喊你，可以自己选时间、星期和它要说的话。")
        sub.setObjectName("hint")
        lay.addWidget(sub)

        # 称呼
        row = QHBoxLayout()
        row.addWidget(QLabel("称呼"))
        self.ed_who = QLineEdit(store.who)
        self.ed_who.setPlaceholderText("提醒里用 {name} 时会替换成这个，例如：宝贝 / 小李")
        self.ed_who.textChanged.connect(self._who_changed)
        row.addWidget(self.ed_who, 1)
        lay.addLayout(row)

        lay.addWidget(_sep())

        # 列表
        self.scroll = QScrollArea()
        self.scroll.setWidgetResizable(True)
        self.holder = QWidget()
        self.holder.setObjectName("page")
        self.list_lay = QVBoxLayout(self.holder)
        self.list_lay.setContentsMargins(0, 0, 4, 0)
        self.list_lay.setSpacing(8)
        self.scroll.setWidget(self.holder)
        lay.addWidget(self.scroll, 1)

        # 快速添加
        q = QLabel("快速添加")
        lay.addWidget(q)
        grid = QGridLayout()
        grid.setSpacing(8)
        for i, (label, maker) in enumerate(PRESETS):
            b = QPushButton(label)
            b.clicked.connect(lambda _=False, m=maker: self._quick_add(m))
            grid.addWidget(b, i // 4, i % 4)
        lay.addLayout(grid)

        # 底部
        btns = QHBoxLayout()
        b_add = QPushButton("＋ 自定义提醒")
        b_add.setObjectName("ghost")
        b_add.clicked.connect(self._add_custom)
        btns.addWidget(b_add)
        btns.addWidget(QPushButton("试听铃声", clicked=lambda: theme.play_chime()))
        btns.addStretch(1)
        self.b_mute = QPushButton()
        self.b_mute.clicked.connect(self._toggle_mute)
        btns.addWidget(self.b_mute)
        b_close = QPushButton("完成")
        b_close.setObjectName("primary")
        b_close.clicked.connect(self.accept)
        btns.addWidget(b_close)
        lay.addLayout(btns)

        self._rebuild()

    # -- 内部
    def _who_changed(self, text: str) -> None:
        self.store.who = text
        self.changed = True

    def _quick_add(self, maker) -> None:
        r = maker()
        r["text"] = render_text(r, self.store.who)
        self.store.add(r)
        self.changed = True
        self._rebuild()

    def _add_custom(self) -> None:
        dlg = ReminderEditDialog(self, None, self.store.who)
        dlg.on_test = self.on_test
        if dlg.exec():
            self.store.add(dlg.result_data())
            self.changed = True
            self._rebuild()

    def _edit(self, r: dict) -> None:
        dlg = ReminderEditDialog(self, r, self.store.who)
        dlg.on_test = self.on_test
        if dlg.exec():
            self.store.replace(dlg.result_data())
            self.changed = True
            self._rebuild()

    def _toggle_mute(self) -> None:
        if self.store.is_muted():
            self.store.unmute()
        else:
            self.store.mute(60)
        self._rebuild()

    def _rebuild(self) -> None:
        while self.list_lay.count():
            item = self.list_lay.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        if not self.store.items:
            empty = QLabel("还没有提醒，下面点一个「🛏 睡觉」试试～")
            empty.setObjectName("hint")
            self.list_lay.addWidget(empty)

        for r in list(self.store.items):
            self.list_lay.addWidget(self._row(r))

        self.list_lay.addStretch(1)

        muted = self.store.is_muted()
        self.b_mute.setText("🔕 取消静音" if muted else "🔕 静音 1 小时")
        self.lb_mute.setText("静音中，到点只记录不打扰" if muted else "")

    def _row(self, r: dict) -> QWidget:
        card = QFrame()
        card.setObjectName("card")
        lay = QHBoxLayout(card)
        lay.setContentsMargins(12, 10, 12, 10)
        lay.setSpacing(10)

        ck = QCheckBox()
        ck.setChecked(bool(r.get("enabled", True)))
        ck.stateChanged.connect(lambda s, rr=r: self._toggle(rr, bool(s)))
        lay.addWidget(ck)

        col = QVBoxLayout()
        col.setSpacing(2)
        name = QLabel(f"{r.get('name', '提醒')}")
        name.setStyleSheet("font-weight:700;font-size:13px;")
        col.addWidget(name)
        info = QLabel(f"{schedule_text(r)} · 下次 {self.engine.next_hint(r)}")
        info.setObjectName("hint")
        col.addWidget(info)
        txt = QLabel(render_text(r, self.store.who))
        txt.setWordWrap(True)
        txt.setStyleSheet("color:#7A5F55;font-size:11px;")
        col.addWidget(txt)
        lay.addLayout(col, 1)

        b_edit = QPushButton("改")
        b_edit.setFixedWidth(46)
        b_edit.clicked.connect(lambda _=False, rr=r: self._edit(rr))
        lay.addWidget(b_edit)

        b_del = QPushButton("删")
        b_del.setFixedWidth(46)
        b_del.clicked.connect(lambda _=False, rr=r: self._del(rr))
        lay.addWidget(b_del)
        return card

    def _toggle(self, r: dict, on: bool) -> None:
        r["enabled"] = on
        r["last_ts"] = time.time()
        self.store.save()
        self.changed = True

    def _del(self, r: dict) -> None:
        self.store.remove(r["id"])
        self.changed = True
        self._rebuild()
