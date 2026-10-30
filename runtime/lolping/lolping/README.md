# lolPing 桌宠集成

来源：本机 `D:\work\lolPing` 的 lolPing 0.5.0，作者 Danrui Meng。上游项目：https://github.com/darrenprx/lolPing 。来源版本及安装包 ASAR 的 SHA-256 保存在 `SOURCE.json`。

`vendor/` 保留上游打包的页面、预加载脚本和资源。`vendor/out/main/integrated.cjs` 由 `scripts/import-lolping.mjs` 生成；适配逻辑集中在导入脚本中，避免直接修改大型生成文件。原版 `index.js` 保留用于对照，集成入口不会执行它。

适配包括：

- 由桌宠控制应用生命周期与唯一托盘，设置页通过宠物右键菜单和托盘打开。
- 复用原版轮盘、表情、音效、自定义图片、房间和原生输入监听。
- 原生监听使用 `native/hook-helper.exe`，页面资源始终从导入目录读取。
- lolPing 与桌宠桥接协议由 `desktop-protocols.js` 在启动前一次注册，避免分别注册时覆盖读取权限，导致已有表情和音效误报缺失。
- 信号、表情和轮盘在显示前重新置顶，显示后每 5 秒复查一次；保持点击穿透，不抢焦点。窗口关闭和退出时释放定时器。
- 设置由桌宠保存在项目 `data/lolping/`，首次运行时尝试复制旧用户设置。
- lolPing 的开机启动选项映射到桌宠 `启动.vbs`。
- 关闭独立应用的自动更新器，避免它更新或重启桌宠安装文件。
- 剪贴板读写兼容 Electron 的同步或异步返回值。
- 退出时关闭覆盖层、输入监听、房间连接并写完设置，然后交回桌宠退出流程。

重新导入：

```powershell
node scripts/import-lolping.mjs D:\work\lolPing
```

只重新生成主进程适配、不覆盖页面和素材时，使用 `node scripts/import-lolping.mjs D:\work\lolPing --main-only`。

导入脚本只支持验证过的 0.5.0 版本，源安装目录只读。当前导入的是 Windows 原生监听程序；其他平台需要相应平台的上游二进制和运行验证。

许可证见同目录 `LICENSE`。上游源代码采用 MIT；信号图标、音效等 Riot Games 素材保留上游的版权说明。
