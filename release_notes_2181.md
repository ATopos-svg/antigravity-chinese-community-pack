# Antigravity 社区中文补丁 v2.18.1 正式发布

本版本第一时间深度适配 Google 于 2026.09 最新推送的 **Antigravity v2.18.1** 正式版（发布时间戳 2026-09-29，本地自动静默更新生效）！

## 🚀 核心更新亮点 (Highlights)

1. **🖥️ 重磅新增：系统托盘 (System Tray) 与运行中智能体计数**：
   - 官方正式引入系统托盘模块（`dist/tray.js`）及图标模板（`trayTemplate.png`）；
   - 深度汉化系统托盘上下文菜单，实时精准显示活动智能体状态：
     - `没有正在运行的智能体` (`No agents running`)；
     - `{count} 个智能体正在运行` (`{count} agents running`)；
   - 支持从系统托盘一键快速唤起/聚焦窗口或安全退出应用。

2. **🛑 全面汉化原生退出二次确认弹窗 (Confirm Quit)**：
   - 当用户关闭应用或从托盘选择退出时，官方新增了带智能体防中断保护的二次确认弹窗；
   - 100% 纯正简体中文呈现：
     - 标题：`确认退出` (`Confirm Quit`)；
     - 内容：`您确定要退出吗？` (`Are you sure you want to quit?`)；
     - 提示：`当前可能有正在运行的智能体或后台任务。` (`There may be agents or background tasks running.`)；
     - 按钮：`取消` / `退出`。

3. **🐧 持续完善 WSL 2 原生集成与启动 Splash 汉化**：
   - 保持 2.18.1 官方原生 WSL 架构的完整兼容；
   - 菜单栏无缝汉化：`连接到 WSL` (`Connect to WSL`) 与 `在本地重新打开` (`Reopen Locally`)；
   - 独立环境配置加载窗持续精译：`正在配置 WSL 环境：{distro}`。

4. **⚡ 架构升级与环境加载**：
   - 引入 `shell-env` 原生环境变量捕获库，完美继承终端 PATH 与开发环境配置；
   - 保持官方全部 11 大核心 API 体系（`updaterAPI`, `dialogAPI`, `notificationAPI`, `storageAPI`, `logsAPI`, `extensionsAPI`, `deepLinkAPI`, `agentAPI`, `electronNativeAPI`, `ideAPI`, `wslAPI`）及 ConnectRPC 通信栈完整对接，零死锁、零冲突。

5. **🛡️ 严格执行防白屏规范打包准则（~4.8MB）与 120 项全量自动化测试**：
   - 严格遵循 `--unpack-dir "node_modules/chrome-devtools-mcp"` 打包规则，彻底杜绝 21MB 异常膨胀与 CDP 超时白屏；
   - 覆盖 MCP 市场 59 项、UI 核心 38 项、Flutter 官方技能 23 项，共计 120 项自动化测试断言 100% PASS。

6. **💻 全平台 Windows / macOS / Linux 一键极速部署与秒级还原**：
   - Windows：双击运行《一键安装汉化.bat》；
   - macOS：双击运行《一键安装汉化-macOS.command》（内置签名去隔离修复）；
   - Linux：终端运行 `bash 一键安装汉化-Linux.sh`；
   - 各平台均配备对应的一键毫秒级还原官方英文脚本。

---

## 📦 压缩包附件说明
- **`Antigravity-Chinese-Pack-v2.18.1.zip`**：全平台通用绿色免编译补丁包，解压即用。
