# lolPing 房间音效同步源码

基础源码为 `darrenprx/lolPing` 的 PR #131 提交 `94c3816089d1cecd7fb4f8646f75af1585952592`（MIT；许可见 `../lolping/LICENSE`）。

在该提交的源码树运行 `git apply changes.patch`，并将本目录的 `emoteSoundTransfer.ts` 放入 `src/main/`、两个 `.test.ts` 放入 `tests/main/`。补丁增加声音协议、传输缓存、接收端播放和音频长度保护；保留原动图传输。

构建后，可用 `node runtime/lolping/adapt-lolping-room-v07.cjs <lolPing构建目录>` 生成桌宠主进程适配文件。适配脚本校验构建产物哈希；依赖或构建结果变化时必须重新审查适配，不能直接绕过校验。

本地播放最多 5 秒；声音经大小、类型和 SHA-256 校验后缓存。网络动效开关同时控制网络音效，双方均须安装兼容版本。`room-v06` 保留供回退。
