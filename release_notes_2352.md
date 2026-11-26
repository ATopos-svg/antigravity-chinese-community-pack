# 🚀 Antigravity 社区全平台深度汉化包 v2.35.2 正式发布

本次发布迅速跟进 Google 官方最新热更推送的 **Antigravity v2.35.2** 正式版（内部版本 `2.35.2.0`），基于官方 `2.35.2` 原生 `app.asar` 与 `language_server.exe` 全量重新提取校验并构建全平台中文补丁！

---

## ✨ Antigravity 2.35.2 官方更新说明与全量汉化特性

### 1. 🔄 基于官方 2.35.2 热更新版本无损重建
- **底层版本对齐**：Google 官方在 `2.35.1` 之后紧接着推送了 `2.35.2` 热更新，修复客户端细节并更新元数据；随包附带的 `app.asar.chinese` 与 `app.asar.original` 均已同步为官方 **2.35.2** 对应版本，确保一键安装与一键还原版本号严格一致。

### 2. 🎯 延续 v2.35.x 全量精译覆盖
- **智能调度设置 (`Orchestrator Settings`) & 语音听写语言 (`Dictation languages`)**：完整覆盖规划调度/执行模型选择、语音听写多语言列表与重置逻辑。
- **侧边栏自定义、收件箱模式 (`Inbox Mode`) 与插件权限**：完整覆盖 `Customize Sidebar`、`Working Section`、`Auto-Resolve`、`Plugin permissions` 及 40+ 项 Sentence case 设置词条。
- **添加上下文菜单与插件详情页**：完整汉化 `Add Context`（`添加上下文`、`文件`、`@ 引用`、`快捷操作`、`云端硬盘 (Drive)`、`去登录`）、`Context Providers`（`上下文提供程序`）、`Used for:`（`用于：`）及 Google Drive 示例提示词。
- **原生模块适配**：完整覆盖 `browserStream/`、`remote/disconnectedPage.js`、`deviceChooser.js`、`webviewPopupSecurity.js`、`ipcHandlers.js`、`updater.js` 等原生弹窗与错误提示。

### 3. 🛡️ 防白屏规范打包 & 自动化验证
- **严格防白屏规范**：携带 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包，完整保留全部 377 项解包组件；全部 6 套自动化测试共 **350 项** **100% 通过**。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.35.2.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
