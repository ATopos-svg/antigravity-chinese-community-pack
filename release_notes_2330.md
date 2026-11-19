# 🚀 Antigravity 社区全平台深度汉化包 v2.33.0 正式发布

本次发布全面跟进 Google 官方最新推送的 **Antigravity v2.33.0** 重大功能版本（内部版本 `2.33.0.0`），基于官方 `2.33.0` 原生 `app.asar` 与 `language_server.exe`（194.3MB）全量重新提取校验并构建全平台中文补丁！

---

## ✨ Antigravity 2.33.0 官方更新适配与全量汉化特性

### 1. 🌐 浏览器数据清理与按站点 Cookie 管理
- 完整汉化新版 `Browsing Data`（浏览数据）、`Cookies by Site`（按站点管理 Cookie）、`Clear Browsing Data?`（确认清除浏览数据？）以及清除失败与站点 Cookie 独立删除提示。

### 2. 🖥️ SSH 远程主机连接 & 桌面控制浮窗 (HUD)
- **原生模块精译**：新增汉化 `remote/disconnectedPage.js`（SSH 断开连接/重启/重连引导页与操作按钮 `重新连接`、`停止服务器`、`关闭`）及 `computer/hud.js` 桌面控制浮窗（`Antigravity 桌面控制浮窗 (HUD)`、`停止`）。
- **SSH 与远程工作流**：补齐 `Connect to SSH Host…`、`Stop SSH Server…`、`SSH Config`、`Hidden hosts`、`Remote Projects`、`New Worktree` / `Previous Worktrees`、`Open on phone` / `Open on another device`（跨设备扫码接力）等全量词条。

### 3. ⌨️ 键位映射方案、插件套装与多智能体控制
- **键位与快捷键**：汉化 `Keybinding Scheme`（`VS Code Default` / `Antigravity (AGY) Style`）、`Customize Shortcuts`、`Toggle Word Wrap`、`Side Question Selection`、`Jump to Previous/Next Prompt`、`Pin / Unpin Conversation` 等。
- **插件套装与智能体运行控制**：覆盖插件套装 (`Curated sets of plugins...` / `Review contents` / `Add anyway`)、多智能体控制（`Main Agent`、`Filter agents`、`All agents`、`Stop all agents`、`Pause` / `Resume`）与评论草稿恢复（`Resume X comment drafts`）。
- **延续全量精准翻译能力**：完整保留常规设置布局/权限、规划斜杠提示上下文识别、语音模式与 Gemini Live 音色选择器、外观对比度/字体、自动化空白态跨节点聚合以及 WebHID/USB/Serial、弹窗安全证书详情。

### 4. 🛡️ 防白屏规范打包 & 自动化验证
- **严格防白屏规范**：基于官方 `2.33.0` 原生目录树携带 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包，完整保留全部卸载组件；全部自动化测试套件（v2.33.0 专项 27 项 + v2.31.2 设置/自动化空白态/DOM 树 81 项 + v2.31.0 前后端专项 67 项 + 界面截图 76 项 + 执行策略 44 项 = **295 项**）**100% 通过**。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.33.0.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
