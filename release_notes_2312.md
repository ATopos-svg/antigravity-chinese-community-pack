# 🚀 Antigravity 社区全平台深度汉化包 v2.31.2 正式发布

本次发布迅速跟进 Google 官方最新热更推送的 **Antigravity v2.31.2** 正式版（内部版本 `2.31.2.0`），基于官方 `2.31.2` 原生 `app.asar` 与 `language_server.exe` 全量重新提取校验并构建全平台中文补丁！

---

## ✨ Antigravity 2.31.2 官方更新说明与全量汉化特性

### 1. 🔄 基于官方 2.31.2 热更新版本无损重建
- **底层版本对齐**：Google 官方在 2.31.0 之后紧接着推送了 `2.31.2` 热更新（含主客户端 Electron 壳升级及 `language_server.exe` 二进制更新至 188.8MB），修复并增强客户端运行时稳定性；经对比，前端 React Web 包与核心主进程 `dist/` 模块接口 100% 兼容 `2.31.0` 全量汉化方案。
- **元数据与原版包同步**：安装包内附带的 `app.asar.chinese` 与 `app.asar.original` 均已全面基于官方 **2.31.2** 原包重建与同步，确保一键安装与一键还原版本号严格一致。

### 2. 🎯 延续 v2.31.x 全量精译覆盖
- **新增 WebHID / WebUSB / Web Serial 与弹窗安全架构**：`deviceChooser.js`、`webviewPopupSecurity.js`、地址栏安全芯片、站点 Cookie 清理与证书详情、网页 `window.prompt()` 原生接管卡片 100% 中文精译。
- **浏览器设置重构与 `Auto` 自动执行模式**：彻底解决早期 `Built-in 浏览器设置` / `浏览器设置 Subagent` 混杂问题，适配新版浏览器设置、`Auto` 执行策略、Hub UI 缩放菜单（`实际大小`、`放大`、`缩小`）、45+ 项前端快捷键命令与完整设置/开发者标志注册表。
- **主进程系统组件精译**：全面覆盖系统托盘计数、二次确认退出弹窗、macOS Dock 菜单、`updater.js` 更新提示、`ipcHandlers.js` 目录选择对话框、`webauthn.js` 通行密钥弹窗与 WSL 配置引导。

### 3. 🛡️ 防白屏规范打包 & 自动化验证
- **严格防白屏规范**：携带 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包，完整保留全部 347 项卸载组件；全部自动化测试套件（执行策略 44 项 + 界面截图 76 项 + v2.31.x 前后端专项 67 项）**100% 通过**。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.31.2.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
