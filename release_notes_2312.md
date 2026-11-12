# 🚀 Antigravity 社区全平台深度汉化包 v2.31.2 正式发布

本次发布迅速跟进 Google 官方最新热更推送的 **Antigravity v2.31.2** 正式版（内部版本 `2.31.2.0`），基于官方 `2.31.2` 原生 `app.asar` 与 `language_server.exe` 全量重新提取校验并构建全平台中文补丁！

---

## ✨ Antigravity 2.31.2 官方更新说明与全量汉化特性

### 1. 🔄 基于官方 2.31.2 热更新版本无损重建
- **底层版本对齐**：Google 官方在 2.31.0 之后紧接着推送了 `2.31.2` 热更新（含主客户端 Electron 壳升级及 `language_server.exe` 二进制更新至 188.8MB），修复并增强客户端运行时稳定性；经对比，前端 React Web 包与核心主进程 `dist/` 模块接口 100% 兼容 `2.31.0` 全量汉化方案。
- **元数据与原版包同步**：安装包内附带的 `app.asar.chinese` 与 `app.asar.original` 均已全面基于官方 **2.31.2** 原包重建与同步，确保一键安装与一键还原版本号严格一致。

### 2. 🎯 延续并补齐 v2.31.2 全量设置与前后端精译覆盖
- **补齐常规设置（布局、权限、语音与规划提示）精译**：
  - **界面布局卡片 (`Interface Layout`)**：完整汉化 `Knowledge Work`（知识工作）、`Software Engineering`（软件工程）及对应描述。
  - **全局权限与 `^Configure\s+` 防半截混杂修复**：将通用前缀正则移至完整短语字典之后执行，彻底修复 `配置 global allowed and denied resource permissions. Learn more.` 混杂问题，补齐 `权限预设`、`本机`、`远程对话`、`权限详情`、`了解更多` 等全部词条。
  - **规划提示上下文识别 (`Type / and select plan...`)**：在 `plan-command-fyi-alert` 节点中将前置动作词 `Type` 精准译为`输入`（而不误伤表格列头 `Type -> 类型`），并与 `并选择 plan 即可让智能体生成实施计划。` 完整衔接。
  - **语音模式与 Gemini Live 音色选择器 (`Voice mode`)**：完整汉化 `语音模式`、`语音音色`、`麦克风`、`系统默认`、`调整 Antigravity 语音播报的音量大小。`、录音管理弹窗及全部 6 种音色性格标签。
- **补齐外观设置 (`Appearance`)**：新增 `Contrast`（对比度）、`Strong`（高对比度）、`Font`（界面字体）、`System UI`（系统默认 (System UI)）与 `Font Size`（字体大小）完整汉化。
- **新增 WebHID / WebUSB / Web Serial 与弹窗安全架构**：`deviceChooser.js`、`webviewPopupSecurity.js`、地址栏安全芯片、站点 Cookie 清理与证书详情、网页 `window.prompt()` 原生接管卡片 100% 中文精译。
- **浏览器设置重构与 `Auto` 自动执行模式**：彻底解决早期 `Built-in 浏览器设置` / `浏览器设置 Subagent` 混杂问题，适配新版浏览器设置、`Auto` 执行策略、Hub UI 缩放菜单（`实际大小`、`放大`、`缩小`）、45+ 项前端快捷键命令与完整设置/开发者标志注册表。
- **主进程系统组件精译**：全面覆盖系统托盘计数、二次确认退出弹窗、macOS Dock 菜单、`updater.js` 更新提示、`ipcHandlers.js` 目录选择对话框、`webauthn.js` 通行密钥弹窗与 WSL 配置引导。

### 3. 🛡️ 防白屏规范打包 & 自动化验证
- **严格防白屏规范**：携带 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包，完整保留全部 347 项卸载组件；全部自动化测试套件（v2.31.2 设置与 DOM 树 63 项 + v2.31.0 前后端专项 67 项 + 界面截图 76 项 + 执行策略 44 项 = **250 项**）**100% 通过**。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.31.2.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
