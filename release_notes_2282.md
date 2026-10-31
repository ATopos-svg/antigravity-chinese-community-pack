# 🚀 Antigravity 社区全平台深度汉化包 v2.28.2 正式发布

本次发布深度跟进并完整适配 Google 官方最新重大跨代跃迁推送的 **Antigravity v2.28.2** 正式版（跳过 `2.27.x` 直接升级至内部版本 `2.28.2.0`）。

---

## ✨ Antigravity 2.28.2 官方更新亮点与汉化适配

### 1. ⚡ 底层推理引擎与多媒体编码器全面扩容
- **核心语言服务器升级**：`bin/language_server.exe` 从 177.8MB 进一步扩容至 **182.8MB**，带来更强大的复杂长程多步工程规划与代码审查能力。
- **WebM 原生编码器优化**：`bin/webm_encoder.exe` 同步迭代，为智能体多模态屏幕录制、动图分析与视频回放提供高效的原生硬件加速。

### 2. 🛡️ 安全脚本沙箱（Script Jail）与 WebView 浏览器安全态势感知
- **全新安全脚本隔离沙箱**：官方新增 `scriptJail.js` 与 `scriptJailPreload.js`，通过专属的受限 Session 与 MessagePort 通道执行动态脚本（`runScriptInJail`、`abortScriptJail`），防止不可信代码越权。
- **内置浏览器安全感知与多标签页支持**：官方新增 `webviewBrowser.js` 与 `webviewSecurityState.js`，在渲染层新增 `subscribeWebviewSecurityState`、`onWebviewOpenNewTab` 与 `onWebviewFaviconUpdated` 接口。
- **无损透传原生 API**：汉化补丁以 2.28.2 原版 `preload.js` 为基座，100% 完整保留新增的原生桥接接口，零冲突、零损耗。

### 3. 🔑 原生 Passkey（通行密钥）选择对话框与主进程全链路汉化
- **WebAuthn / Passkey 原生对话框精译**：针对 2.28.2 新增的 WebAuthn 身份验证组件（`webauthn.js`），实现原生通行密钥选择对话框 100% 中文展示（`选择通行密钥 (Passkey)`、`登录至 ...`、`选择一个通行密钥账号以继续：`、`取消`）。
- **系统托盘动态计数**：主进程 `tray.js` 动态智能体计数原生汉化（`没有正在运行的智能体` / `{count} 个智能体正在运行`）。
- **退出二次确认**：主进程 `main.js` 退出二次确认对话框（`确认退出`、`您确定要退出吗？`、`当前可能有正在运行的智能体或后台任务。`）与 macOS Dock 右键菜单（`新建窗口`）原生汉化。
- **WSL 缺失警告与环境 Splash 窗**：WSL 异常警告对话框（`未找到 WSL 发行版`）及首次初始化独立 Splash 窗（`正在配置 WSL 环境`）原生精译。
- **Antigravity IDE 欢迎向导**：独立代码编辑器欢迎与引导向导（`wizardHtml.js`）全面汉化。

### 4. 🎯 快捷执行模式、275+ 技能与 MCP 生态深度覆盖
- **执行安全策略精译**：聊天输入框安全策略菜单（`所有命令均需手动审核批准`、`执行敏感操作前进行确认`、`无限制自动执行所有命令`等）100% 精译。
- **全量技能与市场**：完整覆盖 275 项官方技能卡片与 45+ 款官方与社区 MCP 服务市场卡片说明。

### 5. 🛡️ 防白屏规范打包与 120 项全量自动化测试验证
- **规范打包**：严格遵循 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包防白屏（核心包体积 ~4.68MB），彻底杜绝白屏问题。
- **自动化测试**：44 项安全执行策略测试与 76 项高精界面截图对比测试全部通过（**100% PASS**）。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.28.2.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
