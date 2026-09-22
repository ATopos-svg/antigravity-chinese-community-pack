# Antigravity 社区中文补丁 v2.15.1 正式发布

本版本第一时间深度适配 Google 于 2026.09 推送的 **Antigravity v2.15.1** 最新正式版（时间戳 2026-09-20，本地自动更新生效）！

## 🚀 核心更新亮点 (Highlights)

1. **⚡ 深度跟进 2.15.1 官方最新版本**：
   - 适配 Google 官方推送的 `2.15.1` 最新二进制核心架构；
   - 保持官方全部 10 大 API 接口 (`updaterAPI`, `dialogAPI`, `notificationAPI`, `storageAPI`, `logsAPI`, `extensionsAPI`, `deepLinkAPI`, `agentAPI`, `electronNativeAPI`, `ideAPI`) 及 ConnectRPC 通信栈完整对接，零死锁、零冲突。

2. **🪄 全面汉化独立「Antigravity IDE」欢迎向导与初始化**：
   - 针对 2.15.1 官方新增的独立编辑器安装向导 (`wizardHtml.js`) 进行全景简体中文适配；
   - 涵盖环境初始化（"正在初始化环境…"）、欢迎页（"欢迎体验全新的 Antigravity！"）及下载选项按钮。

3. **🧩 MCP 服务市场 45+ 款主流扩展与搜索中心全量精译**：
   - 全面覆盖官方最新 MCP 市场全量卡片：包括 Cloud Audit Manager、GitLab Orbit、Mobbin、GKE、AlloyDB、Knowledge Catalog、Bigtable Admin、Google Cloud CLI、Figma Dev Mode、GitHub、PostHog、Stripe、Notion、Linear、Airweave、SonarQube、Netlify、Sequential Thinking、ArizeTracing 等；
   - 搜索栏（`按名称搜索 MCP 服务`）、分类标签、参数输入项与调用描述 100% 自然中文呈现。

4. **🛡️ 120 项全量自动化测试 100% PASS**：
   - 运行覆盖 MCP 服务市场 59 项专项测试、UI 核心词汇 38 项测试、Flutter 官方技能 23 项测试，共计 120 项断言全部通过，稳定可靠。

5. **💻 全平台 Windows / macOS / Linux 一键极速部署与还原**：
   - Windows：双击运行《一键安装汉化.bat》；
   - macOS：双击运行《一键安装汉化-macOS.command》（内置签名去隔离修复）；
   - Linux：终端运行 `bash 一键安装汉化-Linux.sh`；
   - 各平台均配备对应的一键毫秒级还原官方英文脚本。

---

## 📦 压缩包附件说明
- **`Antigravity-Chinese-Pack-v2.15.1.zip`**：全平台通用绿色免编译补丁包，解压即用。
