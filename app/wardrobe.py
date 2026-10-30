"""换装衣橱：左边实时预览，右边 36 套完整造型。"""
from __future__ import annotations

import random

from PySide6.QtCore import QSize, Qt
from PySide6.QtGui import QIcon, QPixmap
from PySide6.QtWidgets import (
    QDialog,
    QHBoxLayout,
    QLabel,
    QPushButton,
    QScrollArea,
    QToolButton,
    QVBoxLayout,
    QWidget,
)

import theme

_thumbs: dict[tuple[int, int], QPixmap] = {}
PER_ROW = 5


def thumb(index: int, size: int = 76) -> QPixmap:
    key = (index, size)
    if key not in _thumbs:
        pm = QPixmap(theme.outfit_at(index)["path"])
        _thumbs[key] = pm.scaled(size, size, Qt.KeepAspectRatio, Qt.SmoothTransformation)
    return _thumbs[key]


class WardrobeDialog(QDialog):
    def __init__(self, parent, current: int, on_apply):
        super().__init__(parent)
        self.on_apply = on_apply
        self.current = int(current)
        self.selected = self.current
        self.setWindowTitle("换装衣橱")
        self.setMinimumSize(880, 640)
        self.setStyleSheet(theme.QSS)

        root = QVBoxLayout(self)
        root.setContentsMargins(18, 16, 18, 16)
        root.setSpacing(12)

        head = QHBoxLayout()
        t = QLabel("👗 换装衣橱")
        t.setObjectName("h1")
        head.addWidget(t)
        head.addStretch(1)
        cnt = QLabel(f"共 {theme.OUTFIT_COUNT} 套完整造型")
        cnt.setObjectName("hint")
        head.addWidget(cnt)
        root.addLayout(head)

        body = QHBoxLayout()
        body.setSpacing(18)

        # 左：预览
        left = QVBoxLayout()
        left.setSpacing(10)
        self.preview = QLabel()
        self.preview.setObjectName("preview")
        self.preview.setFixedSize(260, 260)
        self.preview.setAlignment(Qt.AlignCenter)
        left.addWidget(self.preview)

        self.name = QLabel()
        self.name.setAlignment(Qt.AlignCenter)
        self.name.setStyleSheet("font-size:15px;font-weight:700;")
        left.addWidget(self.name)

        self.tag = QLabel()
        self.tag.setAlignment(Qt.AlignCenter)
        self.tag.setObjectName("hint")
        left.addWidget(self.tag)

        left.addStretch(1)

        b_wear = QPushButton("穿上它")
        b_wear.setObjectName("primary")
        b_wear.setMinimumHeight(40)
        b_wear.clicked.connect(self._wear)
        left.addWidget(b_wear)

        b_rand = QPushButton("🎲 随机一套")
        b_rand.clicked.connect(self._random)
        left.addWidget(b_rand)

        b_close = QPushButton("关闭")
        b_close.clicked.connect(self.reject)
        left.addWidget(b_close)
        body.addLayout(left)

        # 右：格子
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        holder = QWidget()
        holder.setObjectName("page")
        grid = QVBoxLayout(holder)
        grid.setContentsMargins(0, 0, 8, 0)
        grid.setSpacing(10)
        self.buttons: list[QToolButton] = []
        row = None
        for i in range(theme.OUTFIT_COUNT):
            if i % PER_ROW == 0:
                row = QHBoxLayout()
                row.setSpacing(10)
                grid.addLayout(row)
            b = QToolButton()
            b.setToolButtonStyle(Qt.ToolButtonTextUnderIcon)
            b.setCheckable(True)
            b.setFixedSize(100, 112)
            b.setIcon(QIcon(thumb(i)))
            b.setIconSize(QSize(74, 74))
            b.setText(theme.outfit_at(i)["name"])
            b.setCursor(Qt.PointingHandCursor)
            b.setStyleSheet(
                "QToolButton{border:2px solid #F2DFE6;border-radius:13px;background:#FFFFFF;"
                "padding:5px 2px 6px 2px;font-size:10px;color:#7A5F55;}"
                "QToolButton:hover{border-color:#FF8FB1;background:#FFF7FA;}"
                "QToolButton:checked{border:3px solid #FF8FB1;background:#FFF0F5;color:#43261E;}"
            )
            b.clicked.connect(lambda _=False, idx=i: self._select(idx))
            self.buttons.append(b)
            row.addWidget(b)
        if row is not None:
            row.addStretch(1)
        grid.addStretch(1)
        scroll.setWidget(holder)
        body.addWidget(scroll, 1)

        root.addLayout(body, 1)
        self._select(self.current)

    def _select(self, idx: int) -> None:
        self.selected = idx
        for i, b in enumerate(self.buttons):
            b.setChecked(i == idx)
        data = theme.outfit_at(idx)
        pm = QPixmap(data["path"]).scaled(244, 244, Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.preview.setPixmap(pm)
        self.name.setText(data["name"])
        self.tag.setText(f"#{data['tag']}" if data.get("tag") else "")

    def _random(self) -> None:
        self._select(random.randrange(max(1, theme.OUTFIT_COUNT)))
        self._wear()

    def _wear(self) -> None:
        self.current = self.selected
        self.on_apply(self.selected)
        self.accept()
