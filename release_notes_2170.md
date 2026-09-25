# Antigravity 社区中文补丁 v2.17.0 正式发布

本版本第一时间深度适配 Google 于 2026.09 最新推送的 **Antigravity v2.17.0** 重大更新（跨代跃迁，时间戳 2026-09-23，本地自动更新生效）！

## 🚀 核心更新亮点 (Highlights)

1. **⚡ 跨代升级，深度适配 2.17.0 官方核心架构**：
   - 适配 Google 官方最新推送的 `2.17.0` 二进制核心，完整支持官方 11 大 API 接口体系（新增 `wslAPI: { getState, connect }`）；
   - 保留 ConnectRPC 高速通信栈与原生沙箱隔离，零死锁、零网络超时、极速启动。

2. **🐧 重磅支持：官方全新 WSL 原生集成与启动 Splash 汉化**：
   - 深度适配 2.17.0 新增的 WSL 原生管理（`dist/wsl.js`）与菜单项（`连接到 WSL` / `Connect to WSL`、`在本地重新打开` / `Reopen Locally`）；
   - 全面汉化新增的无边框环境配置启动窗口 (`dist/provisionSplash.js`，"正在配置 WSL 环境：{distro}")。

3. **🪄 全景汉化独立「Antigravity IDE」欢迎向导与环境初始化**：
   - 持续跟进独立编辑器安装向导 (`wizardHtml.js`) 全景简体中文适配；
   - 涵盖环境初始化（"正在初始化环境…"）、欢迎页（"欢迎体验全新的 Antigravity！"）及下载引导选项。

4. **🧩 MCP 服务市场 45+ 款主流扩展与搜索中心全量精译**：
   - 全面覆盖官方最新 MCP 市场全量卡片：包括 Cloud Audit Manager、GitLab Orbit、Mobbin、GKE、AlloyDB、Knowledge Catalog、Bigtable Admin、Google Cloud CLI、Figma Dev Mode、GitHub、PostHog、Stripe、Notion、Linear、Airweave、SonarQube、Netlify、Sequential Thinking、ArizeTracing 等；
   - 搜索栏（`按名称搜索 MCP 服务`）、分类标签、参数输入项与调用描述 100% 自然中文呈现。

5. **🛡️ 严格执行规范防白屏打包准则（~4.8MB）与 120 项全量测试**：
   - 坚决遵循 `--unpack-dir` 规范打包，彻底杜绝 21MB 异常膨胀与 CDP 语言服务器超时白屏；
   - 运行覆盖 MCP 市场 59 项、UI 核心 38 项、Flutter 官方技能 23 项，共计 120 项自动化测试断言 100% PASS。

6. **💻 全平台 Windows / macOS / Linux 一键极速部署与还原**：
   - Windows：双击运行《一键安装汉化.bat》；
   - macOS：双击运行《一键安装汉化-macOS.command》（内置签名去隔离修复）；
   - Linux：终端运行 `bash 一键安装汉化-Linux.sh`；
   - 各平台均配备对应的一键毫秒级还原官方英文脚本。

---

## 📦 压缩包附件说明
- **`Antigravity-Chinese-Pack-v2.17.0.zip`**：全平台通用绿色免编译补丁包，解压即用。
