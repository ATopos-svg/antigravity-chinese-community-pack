# 🚀 Antigravity 社区全平台深度汉化包 v2.35.1 正式发布

本次发布迅速跟进 Google 官方最新推送的 **Antigravity v2.35.1** 正式版（内部版本 `2.35.1.0`），基于官方 `2.35.1` 原生 `app.asar` 与 `language_server.exe`（198.7MB）全量重新提取校验并构建全平台中文补丁！

---

## ✨ Antigravity 2.35.1 官方更新适配与全量汉化特性

### 1. 🤖 智能调度设置 (`Orchestrator Settings`) & 语音听写语言 (`Dictation languages`)
- 完整汉化全新 `Orchestrator Settings`（规划调度模型 `Orchestrator Model` 与执行模型 `Executor Model` 选择、默认服务端智能路由与自定义固定模型说明）。
- 完整汉化语音听写多语言限制列表（`Dictation languages`、`Auto-detect (browser defaults)`、`Reset to auto` 与搜索语言占位提示）。

### 2. 📂 侧边栏自定义、收件箱模式 (`Inbox Mode`) 与插件权限
- **侧边栏与收件箱**：完整精译 `Customize Sidebar`、`Working Section`、`Auto-Resolve`、`Show Automations` / `Show Plugins`、`Needs Input` / `Needs attention` / `Stalled`、`Manual Order`、`Last Activity`。
- **插件权限管理**：覆盖 `Plugin permissions`、`Allowed by you`、`Included with plugin`、`Revoke all`、`Manage permissions`。
- **全面兼容 Sentence case 设置词条**：针对 2.35.1 将大量设置项重命名为句首大写格式（如 `Enter to send`、`Enable terminal sandbox`、`Terminal placement`、`Open links in`、`Browsing data` 等 40+ 项）完成全量补齐。

### 3. 🌐 原生 `browserStream` 模块与全量兼容性
- 适配 2.35.1 新增的 `browserStream/browserViewerTabDriver.js` 与 `browserStream/capturePage.js` 原生提示；移除对官方已下线旧 `computer/hud.js` 的强依赖。
- 严格携带 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包，完整保留全部解包组件；全部 6 套自动化测试共 **338 项** **100% 通过**。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.35.1.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
