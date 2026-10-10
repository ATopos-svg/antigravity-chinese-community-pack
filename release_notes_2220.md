# 🚀 Antigravity 社区全平台深度汉化包 v2.22.0 正式发布

本次发布深度跟进并完整适配 Google 官方最新跨代跃迁推送的 **Antigravity v2.22.0** 正式版（跳过 `2.19.x` ~ `2.21.x`，从 `2.18.1` 直接升级至内部版本 `2.22.0.0`）。

---

## ✨ Antigravity 2.22.0 官方更新亮点与汉化适配

### 1. 🖱️ 全新操作系统级原生右键上下文菜单（Native Context Menu）及递归汉化
- **官方新增**：2.22.0 在主进程 (`ipcHandlers.js`) 与预加载沙箱 (`preload.js`) 中新增了 `window:show-context-menu` 与 `window:close-context-menu` 通道，前端渲染层可通过 `electronNative.showContextMenu(items)` 直接弹出操作系统级原生右键菜单（支持无限层级 `submenu`、复选框 `checked`、快捷键 `accelerator`）。
- **深度汉化**：由于原生菜单脱离了 HTML DOM 树，常规 DOM 观察器无法触及。我们在 `preload.js` 的 `electronNativeAPI.showContextMenu` 入口注入了轻量级递归翻译拦截器，自动复用中文词库与正则引擎，实现原生右键菜单（含剪切、复制、粘贴、分屏、终端操作、文件树操作等）**顶层与多级子菜单 100% 汉化**。

### 2. 📂 新增文件拖拽真实物理路径解析接口 (`webUtils.getPathForFile`)
- **官方新增**：在 `preload.js` 的 `electronNativeAPI` 中暴露了 Electron `webUtils.getPathForFile(file)` 接口，使向聊天框或工作区拖拽本地文件时能直接解析出底层操作系统的真实绝对路径。
- **无损兼容**：补丁完整保留该原生桥接接口，零损耗透传。

### 3. 🔔 系统托盘（System Tray）左键单击快速唤起聚焦
- **官方优化**：`tray.js` 的 `createTray(actions, onClick)` 在 2.22.0 中新增了 `onClick` 回调并在 `main.js` 中绑定了窗口聚焦逻辑。现在在 Windows 与 Linux 系统下，**直接用鼠标左键单击右下角托盘图标**即可立即唤起并置顶 Antigravity 主窗口（`app.focus({ steal: true })`），无需再右键点击「打开窗口」。
- **完整汉化**：托盘悬停提示、右键菜单（`打开窗口`、`新建窗口`、`设置...`、`退出`）以及动态活动智能体计数（`没有正在运行的智能体` / `{count} 个智能体正在运行`）全部保持地道中文显示。

### 4. 🛠️ 内置 `chrome-devtools-mcp` 组件升级与防白屏规范打包
- **官方升级**：内置 `node_modules/chrome-devtools-mcp` 外部解包模块从 293 个文件扩展至 347 个文件。
- **防白屏保障**：严格遵循 `--unpack-dir "node_modules/chrome-devtools-mcp"` 规范打包（核心包体积 ~4.67 MB），彻底杜绝因双重打包导致的启动白屏问题，并通过全部 **120 项自动化测试断言（100% PASS）**。

---

## 📦 全平台极速安装说明（Windows / macOS / Linux）

下载附件中的 **`Antigravity-Chinese-Pack-v2.22.0.zip`** 并解压：

- **🪟 Windows**：直接双击运行 `一键安装汉化.bat`（如需还原双击 `一键恢复官方英文.bat`）。
- **🍎 macOS**：直接双击运行 `一键安装汉化-macOS.command`（内置自动清除 Gatekeeper 隔离属性与本地重签名）。
- **🐧 Linux**：在终端运行 `bash 一键安装汉化-Linux.sh`。
