const fs = require('fs');
const path = require('path');

const scratchDir = "C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\c4d6a0c9-989a-4af1-a5b9-9fed69fcd143\\scratch";

// 1. 读取四个技能批次
const b1 = JSON.parse(fs.readFileSync(path.join(scratchDir, "skills_batch_1.json"), "utf8"));
const b2 = JSON.parse(fs.readFileSync(path.join(scratchDir, "skills_batch_2.json"), "utf8"));
const b3 = JSON.parse(fs.readFileSync(path.join(scratchDir, "skills_batch_3.json"), "utf8"));
const b4 = JSON.parse(fs.readFileSync(path.join(scratchDir, "skills_batch_4.json"), "utf8"));

const allSkills = [...b1, ...b2, ...b3, ...b4, {
    en: 'Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment.',
    zh: '规范与 GitHub 的交互准则。当命令因代理环境限制而失败时，向用户申请执行权限。'
}];
console.log("Total skills loaded:", allSkills.length);

const skillPhrasePairs = [];
for (const item of allSkills) {
    const en = item.en.trim();
    const zh = item.zh.trim();
    if (!en || !zh) continue;

    skillPhrasePairs.push([en, zh]);

    const enSentences = en.split(/(?<=[.?!])\s+/).filter(s => s.length > 20);
    const zhSentences = zh.split(/(?<=[。？！])\s*/).filter(s => s.length > 5);

    if (enSentences.length === zhSentences.length && enSentences.length > 1) {
        for (let i = 0; i < enSentences.length; i++) {
            skillPhrasePairs.push([enSentences[i], zhSentences[i]]);
        }
    }
}

console.log("Total skill phrase pairs generated:", skillPhrasePairs.length);

// 2. 读取官方纯净 preload.js
const cleanDir = "C:\\Users\\Lenovo\\AppData\\Local\\Temp\\agy_2151_extract";
const officialPreload = fs.readFileSync(path.join(cleanDir, "dist", "preload.js"), "utf8");

const marker = "// ==========================================";
let baseCode = officialPreload;
if (baseCode.includes(marker)) {
    baseCode = baseCode.substring(0, baseCode.indexOf(marker)).trim();
}

// 3. UI 菜单、系统按钮与基础短语
const UI_PHRASES = [
    // === 智能体设置与权限策略 (Agent Settings & Permissions - 用户重点反馈) ===
    ["Controls the actions the agent can take.", "控制智能体可以执行的操作范围。"],
    ["Outside of folders file access policy", "工作目录外文件访问策略"],
    ["Configures how the agent tries to access files outside of its working folders.", "配置智能体尝试访问其工作目录之外的文件时的处理策略。"],
    ["Terminal Command Auto Execution Policy", "终端命令自动执行策略"],
    ["Terminal Command Auto Execution", "终端命令自动执行策略"],
    ["Terminal Command Execution Policy", "终端命令执行策略"],
    ["Terminal Command Execution", "终端命令执行策略"],
    ["Terminal Command Auto", "终端命令自动执行"],
    ["Controls whether terminal commands require your approval before running.", "控制运行终端命令前是否需要您的审核与批准。"],
    ["Whether the agent asks you to review its documents.", "智能体生成或修改产物文档时是否请求您审核。"],
    ["Modify permissions for file, terminal, and MCP tools.", "修改文件、终端以及 MCP 工具的权限。"],
    ["Require review", "需要审核"],
    ["Always Allow", "始终允许"],
    ["active conversations.", "个活动会话。"],
    ["active conversations", "个活动会话"],
    ["active conversation", "个活动会话"],
    ["Learn more about Fast Mode", "了解更多关于 极速模式"],
    ["Learn more about Planning Mode", "了解更多关于 规划模式"],
    ["Learn more about Task Mode", "了解更多关于 任务模式"],
    ["Policy Presets", "策略预设"],

    // === 2.14.0 新增: 沙箱模式 (Sandbox Mode) ===
    ["Enable Sandbox Mode (Preview)", "启用沙箱模式（预览）"],
    ["Enable Sandbox Mode", "启用沙箱模式"],
    ["Sandbox Mode (Preview)", "沙箱模式（预览）"],
    ["Sandbox Mode", "沙箱模式"],
    ["Restricts agent tools to a secure, isolated local sandbox.", "将智能体工具限制在安全、隔离的本地沙箱环境中。"],
    ["Restricts agent tools to a secure, isolated local sandbox", "将智能体工具限制在安全、隔离的本地沙箱环境中"],
    ["Restricts agent tools to a secure, isolated sandbox.", "将智能体工具限制在安全、隔离的沙箱环境中。"],
    ["Restricts agent tools to a secure, isolated sandbox", "将智能体工具限制在安全、隔离的沙箱环境中"],
    ["secure, isolated local sandbox", "安全、隔离的本地沙箱"],
    ["isolated local sandbox", "隔离的本地沙箱"],
    ["local sandbox", "本地沙箱"],
    ["Terminal Sandboxing", "终端沙箱机制"],
    ["Terminal sandboxing per project", "针对每个项目的终端沙箱机制"],

    // === 2.12.2 Hotfix 3 用户新截图针对性深度补齐 ===
    // 1. 规则与热重载 (Rules & Hot Reload - 图 1)
    ["Proactively connect to running Dart/Flutter apps and trigger hot reload or hot restart upon editing .dart files under lib/.", "编辑 lib/ 目录下的 .dart 文件时，主动连接正在运行的 Dart/Flutter 应用并触发热重载或热重启。"],
    ["Proactively connect to running Dart/Flutter apps and trigger hot reload or hot restart upon editing .dart files under lib/", "编辑 lib/ 目录下的 .dart 文件时，主动连接正在运行的 Dart/Flutter 应用并触发热重载或热重启"],
    ["Proactively connect to apps and hot reload", "主动连接正在运行的应用并执行热重载"],
    ["Proactively connect to running Dart/Flutter apps", "主动连接正在运行的 Dart/Flutter 应用"],
    ["trigger hot reload or hot restart upon editing .dart files under lib/.", "在编辑 lib/ 目录下的 .dart 文件时触发热重载或热重启。"],
    ["trigger hot reload or hot restart upon editing .dart files under lib/", "在编辑 lib/ 目录下的 .dart 文件时触发热重载或热重启"],
    ["trigger hot reload or hot restart", "触发热重载或热重启"],
    ["hot reload or hot restart", "热重载或热重启"],
    ["hot reload", "热重载"],
    ["hot restart", "热重启"],

    // 2. 项目文件夹与权限设置 (Project Folders - 图 2)
    ["Manage project folders, agent settings, and permissions.", "管理项目文件夹、智能体设置及权限。"],
    ["Manage project folders, agent settings, and permissions", "管理项目文件夹、智能体设置及权限"],
    ["Manage project folders", "管理项目文件夹"],
    ["agent settings, and permissions", "智能体设置及权限"],
    ["Folders", "文件夹"],

    // 3. 浏览器子代理与执行策略 (Browser Subagent & Javascript Policy - 图 3)
    ["Configure the browser subagent. It requires Google Chrome to be installed. Type /browser in chat to use it.", "配置浏览器子代理。需要安装 Google Chrome。在对话输入框中输入 /browser 即可唤起浏览器子代理。"],
    ["Configure the browser subagent. It requires Google Chrome to be installed.", "配置浏览器子代理。需要安装 Google Chrome。"],
    ["Configure the browser subagent.", "配置浏览器子代理。"],
    ["Configure the browser subagent", "配置浏览器子代理"],
    ["It requires Google Chrome to be installed.", "需要安装 Google Chrome。"],
    ["It requires Google Chrome to be installed", "需要安装 Google Chrome"],
    ["Google Chrome to be installed", "安装 Google Chrome"],
    ["Block all browser JavaScript execution.", "阻止所有浏览器 JavaScript 执行。"],
    ["Block all browser JavaScript execution", "阻止所有浏览器 JavaScript 执行"],
    ["Prompt for approval before running browser scripts.", "运行浏览器脚本前提示审核与批准。"],
    ["Prompt for approval before running browser scripts", "运行浏览器脚本前提示审核与批准"],
    ["Allow full browser script execution without prompting.", "允许完整执行浏览器脚本且无需提示。"],
    ["Allow full browser script execution without prompting", "允许完整执行浏览器脚本且无需提示"],
    ["Browser Javascript Execution Policy", "浏览器 Javascript 执行策略"],
    ["Browser Javascript Policy", "浏览器 Javascript 执行策略"],
    ["Browser Actuation Rules", "浏览器操作执行规则"],
    ["Browser Actuation Permissions", "浏览器操作执行权限"],
    ["Browser Settings", "浏览器设置"],

    // 4. Flutter 技能多行换行与复杂引号兼容补全 (图 5)
    ["Replace the usage of `expect` and similar functions from `package:matcher` to `package:checks` equivalents.", "将测试中的 expect 及 package:matcher 相关断言函数替换为现代 package:checks 等效项。"],
    ["Replace the usage of `expect` and similar functions from `package:matcher`\nto `package:checks` equivalents.", "将测试中的 expect 及 package:matcher 相关断言函数替换为现代 package:checks 等效项。"],
    ["Replace the usage of expect and similar functions from package:matcher to package:checks equivalents.", "将测试中的 expect 及 package:matcher 相关断言函数替换为现代 package:checks 等效项。"],
    ["Replace the usage of `expect` and similar functions from `package:matcher`", "将测试中的 expect 及 package:matcher 相关断言函数"],
    ["Replace the usage of `expect` and similar functions", "将 expect 及类似断言函数"],
    ["from `package:matcher` to `package:checks` equivalents.", "从 package:matcher 替换为现代 package:checks 等效项。"],
    ["from `package:matcher` to `package:checks` equivalents", "从 package:matcher 替换为现代 package:checks 等效项"],
    ["to `package:checks` equivalents.", "替换为现代 package:checks 等效项。"],
    ["to `package:checks` equivalents", "替换为现代 package:checks 等效项"],
    ["Guides agents in compiling and packaging C/C++ source code into dynamic or static libraries (Code Assets) using Dart's Native Assets hook system (via hook/build.dart and hook/link.dart utilizing package:hooks and package:native_toolchain_c). Use when a user asks to: 'setup native assets', 'compile C/C++ source code', 'bundle dynamic libraries', 'build native C code', 'link native assets', 'implement build.dart or link.dart hooks', or 'integrate C/C++ interop in Dart/Flutter'. Helps agents avoid manual toolchain orchestration and configures secure hash-validated binary downloads or advanced linker tree-shaking with package:record_use mapping.", "指导智能体使用 Dart 原生资产 (Native Assets) 钩子系统将 C/C++ 源码编译并打包为动态或静态库。当要求配置或链接原生资产、编译 C/C++ 代码、或在 Dart/Flutter 中集成 C/C++ 互操作时使用。"],
    ["Rules and formatting guidelines for writing Dart /// API documentation and doc comments. Use when documenting Dart code, writing doc comments for any Dart declaration (libraries, classes, methods, variables, etc.), or when instructed to follow the Effective Dart documentation guidelines.", "编写 Dart /// API 文档与注释的规范与格式指南。在为 Dart 代码编写文档注释（库、类、方法、变量等）或遵循 Effective Dart 文档准则时使用。"],

    // === 用户截图实测深度汉化补充 (2.12.2 Hotfix 2) ===
    // 1. Google Maps Platform 长描述与片段
    ["Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal routes.", "使用 Google Maps Platform 构建与设计基于地理位置的原型应用。集成交互式地图、搜索与查看地点详情、计算最优路径。"],
    ["Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal...", "使用 Google Maps Platform 构建与设计基于地理位置的原型应用。集成交互式地图、搜索与查看地点详情、计算最优路径等..."],
    ["Build and prototype location-aware applications with Google Maps Platform.", "使用 Google Maps Platform 构建与设计基于地理位置的原型应用。"],
    ["Integrate interactive maps, search and inspect Places details, calculate optimal routes.", "集成交互式地图、搜索与查看地点详情、计算最优路径。"],
    ["Integrate interactive maps, search and inspect Places details, calculate optimal routes", "集成交互式地图、搜索与查看地点详情、计算最优路径"],
    ["Integrate interactive maps, search and inspect Places details, calculate optimal...", "集成交互式地图、搜索与查看地点详情、计算最优路径等..."],
    ["Integrate interactive maps", "集成交互式地图"],
    ["search and inspect Places details", "搜索与查看地点详情"],
    ["calculate optimal routes", "计算最优路径"],
    ["location-aware applications", "基于地理位置的应用"],

    // 2. Gemini API 完整描述、截断与原子子短语
    ["Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and real-time audio/video.", "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频等能力。"],
    ["Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and real-...", "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频等能力..."],
    ["Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and real...", "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频等能力..."],
    ["Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and real-time streaming.", "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体与实时流。"],
    ["Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and...", "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体等功能。"],
    ["text generation, multi-turn chat, streaming, function calling, managed agents, and real-time audio/video", "文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频"],
    ["text generation, multi-turn chat, streaming, function calling, managed agents, and real-", "文本生成、多轮对话、流式传输、函数调用、托管智能体与实时音视频..."],
    ["text generation, multi-turn chat, streaming, function calling, managed agents", "文本生成、多轮对话、流式传输、函数调用与托管智能体"],
    ["real-time audio/video", "实时音视频"],
    ["real-time audio", "实时音频"],
    ["real-time video", "实时视频"],
    ["text generation", "文本生成"],
    ["multi-turn chat", "多轮对话"],
    ["function calling", "函数调用"],
    ["managed agents", "托管智能体"],

    // 3. 本地权限 (Local Permissions) 与工作区说明
    ["Local Permissions", "本地权限"],
    ["Global Permissions", "全局权限"],
    ["Workspace Permissions", "工作区权限"],
    ["Also includes global settings when working in this project. Learn more.", "在当前项目中工作时，同时继承并应用全局设置。了解更多。"],
    ["Also includes global settings when working in this project.", "在当前项目中工作时，同时继承并应用全局设置。"],
    ["Also includes global settings when working in this project", "在当前项目中工作时，同时继承并应用全局设置"],
    ["Also includes global settings when working", "在当前项目中工作时，同时继承并应用全局设置"],
    ["Also includes global settings", "同时继承并应用全局设置"],
    ["when working in this project", "在当前项目中工作时"],
    ["global settings when working", "全局设置（在当前项目中工作时）"],
    ["global settings", "全局设置"],

    // 4. 继承设置 (Inherit Settings) 与下拉菜单
    ["Inherit General Settings", "继承全局常规设置"],
    ["Inherit General", "继承常规设置"],
    ["Inherit Global Settings", "继承全局设置"],
    ["Inherit Workspace Settings", "继承工作区设置"],
    ["Inherits your General Settings settings when working in this project.", "在当前项目中工作时，直接继承并沿用您的全局常规设置。"],
    ["Inherits your General Settings settings when working in this project", "在当前项目中工作时，直接继承并沿用您的全局常规设置"],
    ["Inherits your General settings when working in this project.", "在当前项目中工作时，直接继承并沿用您的全局常规设置。"],
    ["Inherits your General settings when working in this project", "在当前项目中工作时，直接继承并沿用您的全局常规设置"],
    ["Inherits your Global settings when working in this project.", "在当前项目中工作时，直接继承并沿用您的全局设置。"],
    ["Inherits your Global settings when working in this project", "在当前项目中工作时，直接继承并沿用您的全局设置"],
    ["Inherits your General Settings settings", "继承您的全局常规设置"],
    ["Inherits your General settings", "继承您的常规设置"],
    ["Inherits your 常规设置 settings when working （仅当前项目）", "在当前项目中工作时，直接继承并沿用您的全局常规设置"],
    ["Inherits your 常规设置 settings when working （仅当前项目） .", "在当前项目中工作时，直接继承并沿用您的全局常规设置。"],
    ["Inherits your 常规设置 settings when working", "在当前项目中工作时，直接继承并沿用您的常规设置"],
    ["Inherits your 常规设置 settings", "继承您的常规设置"],
    ["Inherit 常规设置", "继承常规设置"],
    ["Inherit Global Settings", "继承全局设置"],
    ["Inherit Global", "继承全局设置"],
    ["Inherit Workspace Settings", "继承工作区设置"],
    ["Inherit Workspace", "继承工作区设置"],
    ["Inherits your", "继承您的"],
    ["Inherit", "继承"],
    ["Enabled", "已启用"],

    // 5. 插件标题
    ["Dart and Flutter", "Dart 与 Flutter"],
    ["Google Maps Platform", "Google Maps 平台"],
    // 2.12.2 新增 IDE 分拆引导与硬件设置
    ["Welcome to the new Antigravity!", "欢迎体验全新的 Antigravity！"],
    ["Antigravity has been redesigned to put agents first with new capabilities. If you'd still like a code editor, you can download it as a separate app named Antigravity IDE.", "Antigravity 现已全面重塑，以智能体为第一核心并赋予全新能力。如果您仍需要代码编辑器，可下载独立的“Antigravity IDE”伴侣应用。"],
    ["Download the Antigravity IDE", "下载 Antigravity IDE"],
    ["Explore the new Antigravity", "开始探索全新 Antigravity"],
    ["Setting up…", "正在配置…"],
    ["Keep Computer Awake", "保持电脑清醒（防止休眠）"],
    ["Prevent the computer from going to sleep while tasks are running.", "在任务运行期间防止计算机进入睡眠状态。"],
    ["Antigravity IDE", "Antigravity IDE"],
    // 2.11.0 新增高级设置与自动更新
    ["Automatic Check for Updates", "自动检查更新"],
    ["Automatically prompt you to restart the app when a new update is available. When disabled, you can check for updates manually from the app menu.", "当有新版本可用时，自动提示您重启应用完成更新。关闭后，您可以通过应用菜单手动检查更新。"],
    ["Automatically prompt you to restart the app when a new update is available.", "当有新版本可用时，自动提示您重启应用完成更新。"],
    ["When disabled, you can check for updates manually from the app menu.", "关闭后，您可以通过应用菜单手动检查更新。"],
    ["Check for Updates", "检查更新"],
    ["Advanced Settings", "高级设置"],

    // 权限与命令执行确认对话框 (交互式 Permission Modal)
    ["Allow running this command?", "允许运行此命令吗？"],
    ["Allow reading this file?", "允许读取此文件吗？"],
    ["Allow writing to this file?", "允许写入此文件吗？"],
    ["Allow editing this file?", "允许编辑此文件吗？"],
    ["Yes, allow this time", "允许，仅本次允许"],
    ["No (tell the agent what to do instead)", "拒绝（告诉智能体改做什么）"],
    ["tell the agent what to do instead", "告诉智能体改做什么"],
    ["in this conversation", "（仅当前会话）"],
    ["in this project", "（仅当前项目）"],
    ["Yes, and always allow", "允许，并始终允许"],

    // 会话与项目删除确认对话框 (Delete Confirmation Modals)
    ["Are you sure you want to delete this conversation? This action cannot be undone.", "您确定要删除此会话吗？此操作无法撤销。"],
    ["Are you sure you want to delete this conversation?", "您确定要删除此会话吗？"],
    ["This action cannot be undone.", "此操作无法撤销。"],
    ["This action cannot be undone", "此操作无法撤销"],
    ["Delete Conversation", "删除会话"],
    ["Delete conversation", "删除会话"],
    ["Are you sure you want to delete this project? This action cannot be undone.", "您确定要删除此项目吗？此操作无法撤销。"],
    ["Are you sure you want to delete this project?", "您确定要删除此项目吗？"],
    ["Are you sure you want to delete this task? This action cannot be undone.", "您确定要删除此任务吗？此操作无法撤销。"],
    ["Are you sure you want to delete this task?", "您确定要删除此任务吗？"],
    ["Are you sure you want to delete this artifact? This action cannot be undone.", "您确定要删除此产物文档吗？此操作无法撤销。"],
    ["Are you sure you want to delete this artifact?", "您确定要删除此产物文档吗？"],

    // === 智能体运行错误提示横幅 (Agent Terminated Banner) ===
    ["Agent terminated due to error", "智能体因错误而终止"],
    ["You can prompt the model to try again or start a new conversation if the error persists.", "您可以提示模型重试，若错误持续存在，请开启新会话。"],
    ["You can prompt the model to try again or start a new conversation if the error persists", "您可以提示模型重试，若错误持续存在，请开启新会话"],
    ["See our troubleshooting guide for more help.", "查看我们的 故障排除指南 获取更多帮助。"],
    ["See our troubleshooting guide for more help", "查看我们的 故障排除指南 获取更多帮助"],
    ["See our troubleshooting_guide for more help.", "查看我们的 故障排除指南 获取更多帮助。"],
    ["See our troubleshooting_guide for more help", "查看我们的 故障排除指南 获取更多帮助"],
    ["troubleshooting guide", "故障排除指南"],
    ["troubleshooting_guide", "故障排除指南"],
    ["for more help.", "获取更多帮助。"],
    ["for more help", "获取更多帮助"],
    ["See our", "查看我们的"],
    ["Copy debug info", "复制调试信息"],
    ["Copy Debug Info", "复制调试信息"],

    // === 窗口与编辑器分屏菜单 (Window & Split Menu) ===
    ["Split Right", "向右分屏"],
    ["Split Down", "向下分屏"],
    ["Split Left", "向左分屏"],
    ["Split Up", "向上分屏"],
    ["Replace With New", "替换为新建"],
    ["Replace with New", "替换为新建"],
    ["Replace with new", "替换为新建"],
    ["Split", "分屏"],

    // Custom Agents & Plugins & MCP Empty State
    ["Custom Agents", "自定义代理"],
    ["Expert at reviewing Flutter code for accessibility (a11y) issues. Invoke this agent to perform an a11y review of a codebase, pending changes, or PR.", "擅长审查 Flutter 代码中的无障碍 (a11y) 问题。调用此子代理以对代码库、待提交改动或 PR 进行无障碍审计。"],
    ["Expert at reviewing Flutter code for accessibility (a11y) issues.", "擅长审查 Flutter 代码中的无障碍 (a11y) 问题。"],
    ["Invoke this agent to perform an a11y review of a codebase, pending changes, or PR.", "调用此子代理以对代码库、待提交改动或 PR 进行无障碍审计。"],
    ["No MCP servers installed", "未安装任何 MCP 服务器"],
    ["Use 添加 MCP to browse the store, or add a custom server via the MCP config.", "点击“添加 MCP”浏览应用商店，或通过 MCP 配置文件添加自定义服务器。"],
    ["Use Add MCP to browse the store, or add a custom server via the MCP config.", "点击“添加 MCP”浏览应用商店，或通过 MCP 配置文件添加自定义服务器。"],
    ["Browse and enable plugins from the Build With Google catalog.", "浏览并启用 Build With Google 目录中的官方插件。"],
    ["Provides guidelines and best practices for querying and defining property graphs and semantic graphs in BigQuery using GQL (Graph Query Language).", "提供使用 GQL (图查询语言) 在 BigQuery 中查询和定义属性图与语义图的指南与最佳实践。"],
    ["Provides BigQuery SQL query optimization techniques, execution best practices, and performance tuning rules for high-efficiency querying.", "提供用于高效查询的 BigQuery SQL 优化技术、执行最佳实践和性能调优规则。"],
    ["Build modern data apps, dashboards, and interactive reports using either React + Vite or Streamlit.", "使用 React + Vite 或 Streamlit 构建现代数据应用、仪表板和交互式报告。"],
    ["Includes optional Gemini Data Analytics chat integration for an AI powered \"chat with your data\" experience.", "包含可选的 Gemini 数据分析聊天集成，实现 AI 驱动的“与数据对话”体验。"],
    ["Includes optional Gemini Data Analytics chat integration for an AI powered 'chat with your data' experience.", "包含可选的 Gemini 数据分析聊天集成，实现 AI 驱动的“与数据对话”体验。"],
    ["Includes optional Gemini Data Analytics chat integration for an AI powered", "包含可选的 Gemini 数据分析聊天集成，实现 AI 驱动的"],
    ["chat with your data", "与数据对话"],

    // 主题与预设风格
    ["One Light", "One 浅色"],
    ["Solarized Light", "Solarized 浅色"],
    ["One Dark", "One 深色"],
    ["Solarized Dark", "Solarized 深色"],

    // 界面菜单与提示框 (优先整句替换)
    ["A high-risk mode that disables all safety barriers. The agent operates with full system access, auto-executes all terminal commands, and reads or writes to all local files without review prompts.", "关闭所有安全屏障的高风险模式。智能体将以完全系统权限运行，自动执行所有终端命令，读写所有本地文件且无需人工审核确认。"],
    ["Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:", "请详细描述您遇到的问题。您的反馈越具体详实，团队就能越快为您处理。建议包含以下信息："],
    ["Configure when follow-up messages are sent.", "配置何时发送后续排队消息。"],
    ["Configure the agent's visual theme and display preferences.", "配置智能体的界面视觉主题与显示偏好。"],
    ["Configure the browser subagent. It requires Google Chrome to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.", "配置浏览器子代理。需安装 Google Chrome。在对话输入框中输入 /browser 即可唤起浏览器子代理。"],
    ["Configure the browser subagent. It requires ", "配置浏览器子代理。需安装 "],
    ["to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.", "。在对话输入框中输入 /browser 即可唤起浏览器子代理。"],
    ["The browser subagent can be invoked by typing /browser in the conversation input box.", "在对话输入框中输入 /browser 即可唤起浏览器子代理。"],
    ["Controls whether the agent can run custom JavaScript to automate complex browser actions.", "控制智能体是否可以运行自定义 JavaScript 来自动化执行复杂的浏览器操作。"],
    ["Configure allowed and denied URLs for browser actuation.", "配置允许和拒绝浏览器进行自动化操作的 URL 规则。"],
    ["Work with local agents from another device.", "允许从其他局域网或远程设备连接并协作本地智能体。"],
    ["Manage Antigravity app settings.", "管理 Antigravity 客户端应用设置。"],
    ["Please list the steps to reproduce the issue", "请列出复现该问题的具体操作步骤..."],
    ["Describe the bug you encountered...", "请描述您遇到的问题细节..."],
    ["Review and approve the implementation plan before the agent proceeds.", "请在智能体继续执行前审核并批准实施计划。"],
    ["Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in Settings.", "插件是技能和 MCP 的打包集合，可帮助 Antigravity 智能体与 Google 开发者产品协同工作。您随时可以在“设置”中修改您的选择。"],
    ["Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and...", "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体等功能。"],
    ["Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal...", "使用 Google Maps Platform 构建基于地理位置的应用。集成交互式地图、地点搜索与详情查看、最优路径规划等。"],
    ["Skills providing tailored instructions for happy path Dart and Flutter development workflows.", "为 Dart 与 Flutter 顺畅开发流程提供量身定制的技能指引。"],
    ["Specialized suite of skills for data engineers and database practitioners on Google Cloud", "专为 Google Cloud 数据工程师和数据库运维人员量身打造的专业技能套件。"],
    ["Prototype, build & run modern apps users love with Firebase's backend, AI, and operational infrastructure.", "利用 Firebase 的后端、AI 及运维基础设施，快速原型设计、构建并运行现代应用程序。"],
    ["Reliable automation, in-depth debugging, and performance analysis in Chrome using Chrome DevTools and Puppeteer", "利用 Chrome DevTools 和 Puppeteer 在 Chrome 中实现可靠的自动化测试、深度调试与性能分析。"],
    ["When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.", "开启后，当模型基础配额耗尽时，Antigravity 将使用您的 AI 积分继续处理请求。系统始终优先消耗基础免费配额。"],
    ["The breakdown below shows token usage from customizations like skills, rules, and MCP. If the budget is exceeded, large customizations will be truncated automatically.", "下方展示了技能、规则和 MCP 等自定义配置占用的 Token 额度。若超出预算，大型扩展将被自动截断。"],
    ["Keep the app accessible from the menu bar and running in the background when all windows are closed.", "当所有窗口关闭后，保持应用在后台运行并可从托盘快速访问。"],
    ["When toggled on, Antigravity collects usage data to help Google enhance performance and features.", "开启后，Antigravity 将收集匿名使用数据以帮助 Google 持续优化产品性能与功能体验。"],
    ["Requires manual review for all terminal commands and file accesses outside of the working folders.", "对所有终端命令及工作目录之外的文件访问均需手动审核确认。"],
    ["Ask anything, @ to mention, / for skills and commands", "向智能体提问，输入 @ 引用上下文，输入 / 唤起技能与命令"],
    ["Ask anything, @ to mention, / for actions", "向智能体提问，输入 @ 引用上下文，输入 / 唤起快捷操作"],
    ["Keep your coding agent up to date with the latest web best practices.", "让您的编程智能体掌握最新的 Web 前端开发最佳实践与规范。"],
    ["All terminal commands require review. The agent can read or write to any file in the machine.", "所有终端命令需要审核确认。智能体可读写本机上的任意文件。"],
    ["Receive product updates, tips, and promotions from Google Antigravity via email.", "通过电子邮件接收 Google Antigravity 的产品更新、使用技巧及相关资讯。"],
    ["To modify notification settings, open your operating system's system preferences.", "如需修改系统通知设置，请打开您操作系统的系统设置面板。"],
    ["You currently don't have any MCP Servers installed. Add an MCP server above or add a custom one via the MCP Config.", "您当前尚未安装任何 MCP 服务器。请点击上方按钮添加，或通过 MCP Config 配置文件添加自定义服务器。"],
    ["Specifies Agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.", "配置智能体在生成产物文档（如实施计划、回顾）时是否请求审核。"],
    ["Choose a predefined security preset for the agent. This controls terminal auto-execution policy, and file access policy.", "为智能体选择预设安全级别，控制终端自动执行策略和文件访问权限。"],
    ["Disables all safety barriers for maximal iteration velocity.", "关闭所有安全审核屏障，实现最高效的自动化迭代速度。"],
    ["Prevent the computer from sleeping while the app is running.", "在应用运行期间防止计算机进入睡眠状态。"],
    ["Configure external tools via Model Context Protocol.", "配置通过模型上下文协议 (MCP) 提供的外部工具权限。"],
    ["Core tools and knowledge required to develop for Android", "开发 Android 应用所需的核心工具与专业知识库。"],
    ["Using the Antigravity Python SDK to build AI agents", "使用 Antigravity Python SDK 构建自定义 AI 智能体应用。"],
    ["Curated collection of agent skills for science.", "为科学研究与数据分析精心挑选的智能体技能合集。"],
    ["You can upgrade to a Google AI Ultra plan to receive higher rate limits.", "您可以升级至 Google AI Ultra 方案以获取更高的速率与配额上限。"],
    ["Configure allowed commands outside the sandbox.", "配置允许在沙箱外部直接执行的命令规则。"],
    ["Configure agent execution, queued message delivery, and permissions.", "配置智能体执行、队列消息发送及权限策略。"],
    ["Configure allowed and denied paths for file reads and writes.", "配置允许或拒绝读取与写入的文件路径。"],
    ["Configure allowed and denied URLs for reading.", "配置允许或拒绝访问的网络链接。"],
    ["Configure allowed terminal commands.", "配置允许执行的终端命令行规则。"],
    ["Configure the maximum width of the conversation panel.", "配置对话面板的最大显示宽度。"],
    ["Display and preserve intermediate thinking steps.", "展示并保留智能体的中间思考与推理步骤。"],
    ["Select light, dark, or inherit system settings.", "选择浅色、深色主题或跟随系统设置。"],
    ["Configure default behaviors, skills, and MCP servers.", "配置默认行为规范、技能与 MCP 服务器。"],
    ["Manually customize individual settings.", "手动自定义各项安全与权限细节。"],
    ["Manage your plan, credentials, and general preferences.", "管理您的方案套餐、凭证与常规偏好设置。"],
    ["Manage your model quota and credits.", "管理您的模型配额与积分。"],
    ["Ask Antigravity a question or give it a task...", "向 Antigravity 提问或分配任务..."],
    ["Type / for slash commands, @ to mention context", "输入 / 唤起命令，输入 @ 引用文件或上下文"],
    ["Agent is waiting for your response", "智能体正在等待您的确认"],
    ["Agent is waiting for approval", "智能体正在等待您的批准"],
    ["Always allow in this workspace", "在此工作区始终允许"],
    ["Always allow for this session", "本次会话始终允许"],
    ["Agent wants to execute a command:", "智能体请求执行以下命令:"],
    ["Agent wants to run a command:", "智能体请求运行以下命令:"],
    ["Agent wants to execute:", "智能体请求执行:"],
    ["Agent wants to edit files:", "智能体请求编辑以下文件:"],
    ["Agent wants to read files:", "智能体请求读取以下文件:"],
    ["Review Implementation Plan", "审核实施计划"],
    ["Approve and Proceed", "批准并继续执行"],
    ["Approve & Proceed", "批准并继续执行"],
    ["Proceed with Plan", "按计划继续执行"],
    ["Waiting for user approval", "等待用户确认"],
    ["Waiting for approval", "等待用户确认"],
    ["Waiting for review", "等待用户审核"],
    ["Allow this command?", "允许执行此命令？"],
    ["Allow this action?", "允许执行此操作？"],
    ["What would you like to build?", "您想要构建什么？"],
    ["You have used some of your weekly limit, it will fully refresh in", "已消耗部分周配额，将在以下时间后完全重置:"],
    ["You have used some of your 5-hour limit, it will fully refresh in", "已消耗部分5小时配额，将在以下时间后完全重置:"],
    ["Build with Antigravity Plugins", "使用 Antigravity 插件扩展"],
    ["Build With Google Plugins", "使用 Google 官方插件扩展"],

    // 命令面板与菜单栏项目 (全词优先)
    ["Collapse All Folders", "折叠所有文件夹"],
    ["Expand All Folders", "展开所有文件夹"],
    ["Open Keyboard Shortcuts", "打开快捷键指南"],
    ["Open Keyboard 快捷键", "打开快捷键指南"],
    ["Provide feedback", "意见与反馈"],
    ["Next Aux Pane Tab", "下一个辅助面板标签页"],
    ["Previous Aux Pane Tab", "上一个辅助面板标签页"],
    ["Download Diagnostics", "下载诊断日志"],
    ["Toggle Sidebar", "切换侧边栏"],
    ["Toggle Auxiliary Pane", "切换辅助面板"],
    ["New Terminal Tab", "新建终端标签页"],
    ["Split Terminal", "拆分终端"],
    ["Create Project", "新建项目"],
    ["Open Command Palette", "打开命令面板"],
    ["Open 命令面板", "打开命令面板"],
    ["Open Project Picker", "打开项目选择器"],
    ["打开项目 Picker", "打开项目选择器"],
    ["Open Conversation Picker", "打开会话选择器"],
    ["Open Conversation History", "打开历史会话记录"],
    ["Open 历史会话记录", "打开历史会话记录"],
    ["Open Settings", "打开设置"],
    ["Toggle Project Selector", "切换项目选择器"],
    ["Toggle Model Selector", "切换模型选择器"],
    ["Toggle Voice Recording", "切换语音录制"],
    ["Toggle Environment Selector", "切换环境选择器"],
    ["Toggle Terminal", "切换终端"],
    ["Select Next Conversation", "选择下一个会话"],
    ["Select Previous Conversation", "选择上一个会话"],
    ["Find in Pane", "在面板中查找"],
    ["File Picker", "文件选择器"],
    ["Focus Input", "聚焦输入框"],
    ["Close Tab", "关闭标签页"],
    ["New Editor Window", "新建编辑器窗口"],
    ["Go Forward", "前进"],
    ["Go Back", "返回"],
    ["Zoom In", "放大"],
    ["Zoom Out", "缩小"],
    ["Reset Zoom", "重置缩放"],
    ["New Window", "新建窗口"],
    ["Close Window", "关闭窗口"],
    ["Type to search...", "输入以搜索..."],
    ["to navigate", "导航"],
    ["to select", "选择"],
    ["Browser Javascript Execution Policy", "浏览器 Javascript 执行策略"],
    ["Browser Javascript Policy", "浏览器 Javascript 执行策略"],
    ["Browser Actuation Rules", "浏览器操作执行规则"],
    ["Browser Actuation Permissions", "浏览器操作执行权限"],
    ["Browser Settings", "浏览器设置"],
    ["Actuation Permissions", "操作与执行权限"],
    ["Actuation Rules", "操作执行规则"],
    ["Allow/deny agent command execution outside the sandbox.", "允许或拒绝智能体在沙箱外部执行命令。"],
    ["External tools the agent can call via Model Context Protocol.", "智能体可通过模型上下文协议 (MCP) 调用的外部工具。"],
    ["Commands Outside Sandbox", "沙箱外命令执行"],
    ["Open System Preferences", "打开系统偏好设置"],
    ["← Back", "← 返回"],
    ["Enable Remote Control", "启用远程控制"],
    ["Remote Control", "远程控制"],
    ["Device Name", "设备名称"],
    ["Device name", "设备名称"],
    ["Scan the code to open this device in ", "扫描二维码在 "],
    ["Scan the code to open this device in", "扫描二维码在"],
    [", or copy link.", "，或复制链接。"],
    ["or copy link.", "或复制链接。"],
    ["copy link", "复制链接"],
    ["Copy link", "复制链接"],
    ["Copy Link", "复制链接"],
    ["Application Settings", "应用设置"],
    ["Application", "应用设置"],
    ["Always Proceed", "始终自动执行"],
    ["Always proceed", "始终自动执行"],
    ["Request Review", "请求审核"],
    ["Request review", "请求审核"],
    ["Light Theme", "浅色主题"],
    ["Dark Theme", "深色主题"],
    ["Default Light", "默认浅色"],
    ["Default Dark", "默认深色"],
    ["Notification Settings", "系统通知设置"],
    ["Maximum number of attachments reached", "已达到单次附件上传数量上限"],
    ["Maximum attachments reached", "已达到单次附件上传数量上限"],
    ["Attachment limit reached", "已达到附件限制"],
    ["Invalid Media", "附件无效"],
    ["File too large", "文件体积过大"],
    ["Unsupported file type", "不支持的文件类型"],
    ["Failed to upload", "上传失败"],
    ["Drop files to attach", "释放以添加附件"],
    ["Remove attachment", "移除附件"],
    ["Dismiss", "知道了"],
    ["Keyboard shortcuts", "快捷键指南"],
    ["Terminal Commands", "终端命令执行"],
    ["Keep In Menu Bar", "保持后台运行 (托盘)"],
    ["Marketing Emails", "接收产品动态邮件"],
    ["Enable Telemetry", "启用使用情况统计 (遥测)"],
    ["Advanced Settings", "高级设置"],
    ["Show 2 breakdowns", "查看 2 项用量明细"],
    ["Show breakdowns", "查看用量明细"],
    ["Installed MCP Servers", "已安装的 MCP 服务器"],
    ["No MCP Servers", "暂无 MCP 服务器"],
    ["Prevent Sleep", "防止系统休眠"],
    ["Add MCP +", "添加 MCP +"],
    ["Add MCP", "添加 MCP"],
    ["Full machine", "整机访问模式"],
    ["Turbo mode", "极速模式"],
    ["Turbo Mode", "极速模式 (Turbo)"],
    ["MCP Tools", "MCP 工具调用"],
    ["Chrome DevTools", "Chrome 开发者工具"],
    ["Review Changes", "审查代码改动"],
    ["Accept Changes", "接受改动"],
    ["Reject Changes", "拒绝改动"],
    ["Discard Changes", "丢弃改动"],
    ["Keep Changes", "保留改动"],
    ["Apply Changes", "应用改动"],
    ["Always allow", "始终允许"],
    ["Allow command", "允许执行"],
    ["Deny command", "拒绝执行"],
    ["Approve Plan", "批准计划"],
    ["Reject Plan", "拒绝计划"],
    ["Side by Side Diff", "双栏差异对比"],
    ["Side-by-side Diff", "双栏差异对比"],
    ["Inline Diff", "行内差异对比"],
    ["View Diff", "查看差异对比"],
    ["Agent paused", "智能体已暂停"],
    ["Agent finished", "智能体执行完成"],
    ["Thinking...", "思考中..."],
    ["Running command...", "正在执行命令..."],
    ["Reading file...", "正在读取文件..."],
    ["Editing file...", "正在编辑文件..."],
    ["Searching codebase...", "正在搜索代码库..."],
    ["Searching web...", "正在检索网页..."],
    ["Refresh", "刷新"],
    ["Open MCP Config", "打开 MCP 配置文件"],
    ["Enable AI Credit Overages", "启用 AI 积分超额扣费"],
    ["Weekly Limit Remaining", "本周剩余配额"],
    ["Five Hour Limit Remaining", "5小时周期剩余配额"],
    ["Claude and GPT models", "Claude 与 GPT 系列模型"],
    ["Gemini models", "Gemini 系列模型"],
    ["Your Plan: Google AI Pro", "当前方案: Google AI Pro"],
    ["Model Credits", "模型积分与充值"],
    ["Verbose Agent Chat", "完整思考推理过程"],
    ["Conversation Width", "对话面板显示宽度"],
    ["Token Usage", "Token 用量统计"],
    ["Queued Messages", "消息排队策略"],
    ["Send Immediately", "立即发送"],
    ["Security Preset", "安全策略预设"],
    ["Artifact Review Policy", "产物审核策略"],
    ["Artifact Review Mode", "产物审核模式"],
    ["File Permissions", "文件访问权限"],
    ["File Access Rules", "文件访问规则"],
    ["Network Permissions", "网络访问权限"],
    ["Network Access Rules", "网络访问规则"],
    ["Agent Settings", "智能体设置"],
    ["Agent Behavior", "智能体行为"],
    ["Skills & Customizations", "技能与自定义"],
    ["Scheduled Tasks", "计划与定时任务"],
    ["New Conversation", "新建对话"],
    ["New chat", "新建对话"],
    ["New Chat", "新建对话"],
    ["Conversation History", "历史会话记录"],
    ["Recent Projects", "最近项目"],
    ["Close Project", "关闭项目"],
    ["Open Project", "打开项目"],
    ["Open Workspace", "打开工作区"],
    ["Implementation Plan", "实施计划"],
    ["Planning Mode", "规划模式"],
    ["Files Changed", "改动文件"],
    ["Background Tasks", "后台任务"],
    ["Terminal Sandbox", "终端沙箱"],
    ["Tool Execution Policy", "工具执行策略"],
    ["Non-Workspace File Access", "跨工作区文件访问"],
    ["Internet Access Policy", "互联网访问策略"],
    ["Model Selection", "模型选择"],
    ["Global Settings", "全局设置"],
    ["Project Settings", "项目设置"],
    ["Run in background", "后台保持运行"],
    ["Keep computer awake", "防止系统休眠"],
    ["Auto-check for updates", "自动检查更新"],
    ["Always proceed", "始终自动执行"],
    ["Request review", "请求审核"],
    ["Proceed in sandbox", "仅在沙箱执行"],
    ["Always Ask", "每次询问"],
    ["Agent decides", "智能体决定"],
    ["Asks for review", "请求审核"],
    ["Toggle Developer Tools", "切换开发者工具"],
    ["Check for updates", "检查更新..."],
    ["Open Antigravity", "打开 Antigravity"],
    ["Kill Task", "终止任务"],
    ["Kill All", "终止全部"],
    ["View Logs", "查看日志"],
    ["Accept All", "全部接受"],
    ["Revert All", "全部放弃"],
    ["Provide Feedback", "意见与反馈"],
    ["Submit Feedback", "提交反馈"],
    ["Send Feedback", "发送反馈"],
    ["Shortcuts", "快捷键"],
    ["Not in Project", "未归属项目"],
    ["Conversations", "历史会话"],
    ["Customizations", "自定义扩展"],
    ["Appearance", "外观设置"],
    ["Models", "模型配置"],
    ["General Settings", "常规设置"],
    ["General", "常规设置"],
    ["Account", "账号设置"],
    ["Browser", "浏览器设置"],
    ["App Settings", "应用设置"],
    ["Chat Settings", "对话设置"],
    ["about Turbo mode", "极速模式的相关说明"],
    ["about", "关于"],
    ["Plugin: ", "插件: "],
    ["Plugin:", "插件:"],
    // === MCP 服务市场与扩展管理 (MCP Server Marketplace & Management - 45+ 款服务全覆盖) ===
    // 0. 通用控件与搜索栏
    ["Search MCP servers by name", "按名称搜索 MCP 服务"],
    ["Search MCP servers", "搜索 MCP 服务"],
    ["Search MCP server", "搜索 MCP 服务"],
    ["Configured MCP Servers", "已配置的 MCP 服务"],
    ["Available MCP Servers", "可用 MCP 服务"],
    ["Installed MCP Servers", "已安装的 MCP 服务"],
    ["No MCP servers found", "未找到匹配的 MCP 服务"],
    ["Custom MCP Server", "自定义 MCP 服务"],
    ["Add custom MCP server", "添加自定义 MCP 服务"],
    ["Add Custom Server", "添加自定义服务"],
    ["Manage MCP Servers", "管理 MCP 服务"],
    ["MCP Servers", "MCP 服务"],
    ["MCP Server", "MCP 服务"],

    // 1. 截图 1 (云审计、AI 运维、数据集成与体验设计)
    ["The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the us-central1 region.", "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查 us-central1 区域内的资源登记状态。"],
    ["The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the us-central1...", "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查 us-central1 区域内的资源登记状态..."],
    ["The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the europe-west1 region.", "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查 europe-west1 区域内的资源登记状态。"],
    ["The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the europe-...", "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查 europe-west1 区域内的资源登记状态..."],
    ["The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses", "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查资源登记状态"],

    ["Investigate and fix software issues using AI-powered root cause analysis. This MCP server connects to your Antimetal account to search issues, read investigative reports, and monitor resolutions.", "使用 AI 驱动的根本原因分析调查并修复软件问题。该 MCP 服务连接到您的 Antimetal 账户以检索问题、阅读调查报告并监控解决方案。"],
    ["Investigate and fix software issues using AI-powered root cause analysis. This MCP server connects to your Antimetal account to search issues, read investigative...", "使用 AI 驱动的根本原因分析调查并修复软件问题。该 MCP 服务连接到您的 Antimetal 账户以检索问题、阅读调查报告..."],
    ["Investigate and fix software issues using AI-powered root cause analysis.", "使用 AI 驱动的根本原因分析调查并修复软件问题。"],

    ["Query and act on your marketing, analytics, CRM, e-commerce, and warehouse data across 325+ connectors (Meta Ads, Google Ads, TikTok Ads, GA4, HubSpot, etc.).", "跨 325+ 个连接器（Meta Ads、Google Ads、TikTok Ads、GA4、HubSpot 等）查询并处理您的营销、分析、CRM、电商及数据仓库数据。"],
    ["Query and act on your marketing, analytics, CRM, e-commerce, and warehouse data across 325+ connectors (Meta Ads, Google Ads, TikTok Ads, GA4, HubSpot,...", "跨 325+ 个连接器（Meta Ads、Google Ads、TikTok Ads、GA4、HubSpot 等）查询并处理您的营销、分析、CRM、电商及数据仓库数据..."],
    ["Query and act on your marketing, analytics, CRM, e-commerce, and warehouse data across 325+ connectors", "跨 325+ 个连接器查询并处理您的营销、分析、CRM、电商及数据仓库数据"],

    ["Query your GitLab SDLC as a knowledge graph. Orbit indexes groups, projects, source code, merge requests, pipelines, work items, and security findings into a graph.", "将您的 GitLab 软件开发生命周期 (SDLC) 作为知识图谱进行查询。Orbit 将群组、项目、源码、合并请求、流水线、工作项和安全发现编入图谱索引。"],
    ["Query your GitLab SDLC as a knowledge graph. Orbit indexes groups, projects, source code, merge requests, pipelines, work items, and security findings into a...", "将您的 GitLab 软件开发生命周期 (SDLC) 作为知识图谱进行查询。Orbit 将群组、项目、源码、合并请求、流水线、工作项和安全发现编入图谱索引..."],
    ["Query your GitLab SDLC as a knowledge graph.", "将您的 GitLab 软件开发生命周期 (SDLC) 作为知识图谱进行查询。"],

    ["Enable Antigravity to deploy apps to Google Cloud Run.", "使 Antigravity 能够将应用程序部署到 Google Cloud Run。"],
    ["Enable Antigravity to deploy apps to Google Cloud Run", "使 Antigravity 能够将应用程序部署到 Google Cloud Run"],

    ["Ask questions. Get answers. The MCP is a server your coding agent talks to. Ask a question in English. It runs the query against your PostHog data. The answer lands right back in your chat.", "提出问题，获取答案。该 MCP 是智能体与之交互的服务器。用自然语言提问，它将针对您的 PostHog 数据执行查询并将答案直接返回到对话中。"],
    ["Ask questions. Get answers. The MCP is a server your coding agent talks to. Ask a question in English. It runs the query against your PostHog data. The answer lands...", "提出问题，获取答案。该 MCP 是智能体与之交互的服务器。用自然语言提问，它将针对您的 PostHog 数据执行查询并将答案直接返回到对话中..."],
    ["Ask questions. Get answers. The MCP is a server your coding agent talks to.", "提出问题，获取答案。该 MCP 是智能体与之交互的服务器。"],

    ["Search and reference over 600,000 real-world app screens, user flows, and UI patterns from Mobbin directly within your AI tools.", "直接在您的 AI 工具中搜索并参考 Mobbin 上超过 600,000 个真实应用的界面、用户交互流程和 UI 设计模式。"],
    ["Search and reference over 600,000 real-world app screens, user flows, and UI patterns from Mobbin directly within your AI tools", "直接在您的 AI 工具中搜索并参考 Mobbin 上超过 600,000 个真实应用的界面、用户交互流程和 UI 设计模式"],

    // 2. 截图 2 (云原生基础设施与官方开发栈)
    ["The Wiz MCP Server connects multiple security data sources through a central host and server setup. This creates a single, contextual view of your security posture—allowing AI agents to analyze risks, evaluate misconfigurations, and help you remediate issues across your cloud environments.", "Wiz MCP 服务通过集中式主机和服务器设置连接多个安全数据源，为您的安全状况创建统一、上下文关联的全局视图——允许 AI 智能体分析风险、评估错误配置并帮助您跨云环境修复安全问题。"],
    ["The Wiz MCP Server connects multiple security data sources through a central host and server setup. This creates a single, contextual view of your security posture—...", "Wiz MCP 服务通过集中式主机和服务器设置连接多个安全数据源，为您的安全状况创建统一、上下文关联的全局视图——..."],
    ["The Wiz MCP Server connects multiple security data sources through a central host and server setup.", "Wiz MCP 服务通过集中式主机和服务器设置连接多个安全数据源。"],

    ["Google Kubernetes Engine (Remote)", "Google Kubernetes Engine (远程)"],
    ["The GKE remote MCP server provides read write access to your GKE Kubernetes resources. It allows an AI agent to inspect and observe your environment.", "GKE 远程 MCP 服务提供对 GKE Kubernetes 资源的读写访问权限。它允许 AI 智能体检查和观测您的集群环境。"],
    ["The GKE remote MCP server provides read write access to your GKE Kubernetes resources.", "GKE 远程 MCP 服务提供对 GKE Kubernetes 资源的读写访问权限。"],

    ["The Dart and Flutter MCP server exposes Dart (and Flutter) development tool actions to compatible AI-assistant clients.", "Dart 与 Flutter MCP 服务向兼容的 AI 助手客户端暴露 Dart（及 Flutter）开发工具操作。"],
    ["The Dart 与 Flutter MCP server exposes Dart (and Flutter) development tool actions to compatible AI-assistant clients.", "Dart 与 Flutter MCP 服务向兼容的 AI 助手客户端暴露 Dart（及 Flutter）开发工具操作。"],

    ["The Firebase Model Context Protocol (MCP) Server gives AI-powered development tools the ability to work with your Firebase projects and your app's codebase.", "Firebase 模型上下文协议 (MCP) 服务使 AI 开发工具能够与您的 Firebase 项目和应用程序代码库无缝协同工作。"],

    ["The Genkit Model Context Protocol (MCP) Server gives AI-powered development tools the ability to build, debug and inspect your Genkit app.", "Genkit 模型上下文协议 (MCP) 服务使 AI 开发工具能够构建、调试和检查您的 Genkit 应用程序。"],

    ["The gopls Model Context Protocol (MCP) server provides tools for semantic code analysis, live diagnostics, and transformation of your Go codebase.", "gopls 模型上下文协议 (MCP) 服务为您的 Go 代码库提供语义代码分析、实时诊断与代码转换工具。"],

    ["Interact with your BigQuery data using natural language. This MCP server allows you to securely connect to your datasets to search the datasets, inspect table schemas, and run SQL queries.", "使用自然语言与您的 BigQuery 数据交互。该 MCP 服务允许您安全连接到数据集以搜索数据、检查数据表结构并执行 SQL 查询。"],
    ["Interact with your BigQuery data using natural language. This MCP server allows you to securely connect to your datasets to search the datasets, inspect table...", "使用自然语言与您的 BigQuery 数据交互。该 MCP 服务允许您安全连接到数据集以搜索数据、检查数据表结构..."],

    ["The AlloyDB for PostgreSQL remote MCP server lets you access and run AlloyDB tools to manage AlloyDB clusters and instances, manage users, create and restore backups, and execute queries.", "AlloyDB for PostgreSQL 远程 MCP 服务允许您访问并运行 AlloyDB 工具来管理 AlloyDB 集群和实例、管理用户、创建和恢复备份并执行查询。"],
    ["The AlloyDB for PostgreSQL remote MCP server lets you access and run AlloyDB tools to manage AlloyDB clusters and instances, manage users, create and restore...", "AlloyDB for PostgreSQL 远程 MCP 服务允许您访问并运行 AlloyDB 工具来管理 AlloyDB 集群和实例、管理用户、创建和恢复备份..."],

    ["Google Cloud Bigtable Admin", "Google Cloud Bigtable 管理"],
    ["The Bigtable Admin remote MCP server lets you manage Bigtable resources.", "Bigtable Admin 远程 MCP 服务允许您管理 Bigtable 资源。"],

    ["Google Cloud CLI (Preview)", "Google Cloud CLI (预览)"],
    ["Manage Google Cloud resources with natural language. This MCP server provides tools to run gcloud CLI commands safely.", "使用自然语言管理 Google Cloud 资源。该 MCP 服务提供安全运行 gcloud CLI 命令的工具。"],
    ["Manage Google Cloud resources with natural language.", "使用自然语言管理 Google Cloud 资源。"],
    ["Manage Google Cloud resources with natural...", "使用自然语言管理 Google Cloud 资源..."],

    // 3. 截图 3 (数据库、API 平台与协作工具)
    ["The Cloud SQL remote MCP server lets you access and run Cloud SQL tools to manage Cloud SQL instances, manage users, create and restore backups, administer databases, and monitor performance.", "Cloud SQL 远程 MCP 服务允许您访问并运行 Cloud SQL 工具来管理 Cloud SQL 实例、管理用户、创建和恢复备份、管理数据库并监控性能。"],
    ["The Cloud SQL remote MCP server lets you access and run Cloud SQL tools to manage Cloud SQL instances, manage users, create and restore backups, administ...", "Cloud SQL 远程 MCP 服务允许您访问并运行 Cloud SQL 工具来管理 Cloud SQL 实例、管理用户、创建和恢复备份、管理数据库..."],

    ["The Spanner remote MCP server lets you access and run Spanner tools to create, manage, and query Spanner resources from your AI-enabled development environment.", "Spanner 远程 MCP 服务允许您通过支持 AI 的开发环境访问并运行 Spanner 工具来创建、管理和查询 Spanner 资源。"],
    ["The Spanner remote MCP server lets you access and run Spanner tools to create, manage, and query Spanner resources from your AI-enabled development...", "Spanner 远程 MCP 服务允许您通过支持 AI 的开发环境访问并运行 Spanner 工具来创建、管理和查询 Spanner 资源..."],

    ["Google Cloud Apigee API hub", "Google Cloud Apigee API 中心"],
    ["The Apigee API hub remote MCP server lets you manage the APIs, versions, specs, operations, deployments, attributes, external APIs, and dependencies registered in Apigee API hub.", "Apigee API hub 远程 MCP 服务允许您管理在 Apigee API hub 中注册的 API、版本、规范、操作、部署、属性、外部 API 及依赖项。"],
    ["The Apigee API hub remote MCP server lets you manage the APIs, versions, specs, operations, deployments, attributes, external APIs, and dependencies registered in...", "Apigee API hub 远程 MCP 服务允许您管理注册的 API、版本、规范、操作、部署、属性、外部 API 及依赖项..."],

    ["Connect your AI assistants to Looker business intelligence. This MCP server enables data exploration and content management by allowing you to execute natural language queries and retrieve dashboards.", "将您的 AI 助手连接到 Looker 商业智能平台。该 MCP 服务允许您执行自然语言查询并获取仪表板以进行数据探索和内容管理。"],
    ["Connect your AI assistants to Looker business intelligence. This MCP server enables data exploration and content management by allowing you to execute natural...", "将您的 AI 助手连接到 Looker 商业智能平台。该 MCP 服务允许您执行自然语言查询以进行数据探索和内容管理..."],
    ["Connect your AI assistants to Looker business intelligence.", "将您的 AI 助手连接到 Looker 商业智能平台。"],

    ["Knowledge Catalog", "知识目录 (Knowledge Catalog)"],
    ["Connect your AI assistants to the Knowledge Catalog (formerly known as Dataplex). This MCP server enables data discovery and governance by allowing you to search for metadata, inspect data lineages, and manage policies.", "将您的 AI 助手连接到 Knowledge Catalog（前身为 Dataplex）。该 MCP 服务允许您搜索元数据、检查数据血缘并管理治理策略以实现数据发现与数据治理。"],
    ["Connect your AI assistants to the Knowledge Catalog (formerly known as Dataplex). This MCP server enables data discovery and governance by allowing you to search...", "将您的 AI 助手连接到 Knowledge Catalog（前身为 Dataplex）。该 MCP 服务允许您检索元数据以实现数据发现与数据治理..."],
    ["Connect your AI assistants to the Knowledge Catalog (formerly known as Dataplex).", "将您的 AI 助手连接到 Knowledge Catalog（前身为 Dataplex）。"],

    ["MCP Toolbox for Databases", "数据库 MCP 工具箱 (MCP Toolbox for Databases)"],
    ["The MCP Toolbox for Databases is an open-source MCP server designed to simplify and secure the development of tools for interacting with databases.", "MCP Toolbox for Databases 是一个开源 MCP 服务，旨在简化和保护与数据库交互工具的开发。"],

    ["Oracle Database", "Oracle 数据库"],
    ["Interact with your Oracle Database data using natural language. This MCP server allows you to securely connect to your databases for executing SQL queries, inspecting schemas, and analyzing performance.", "使用自然语言与您的 Oracle 数据库数据交互。该 MCP 服务允许您安全连接到数据库以执行 SQL 查询、检查数据表结构并分析性能。"],
    ["Interact with your Oracle Database data using natural language. This MCP server allows you to securely connect to your databases for executing SQL queries,...", "使用自然语言与您的 Oracle 数据库数据交互。该 MCP 服务允许您安全连接到数据库以执行 SQL 查询、检查表结构..."],

    ["The Dev Mode MCP Server brings Figma directly into your workflow by providing important design information and context to AI agents generating code from Figma designs.", "Dev Mode MCP 服务通过向从 Figma 设计生成代码的 AI 智能体提供关键设计信息和上下文，将 Figma 直接引入您的工作流程中。"],
    ["The Dev Mode MCP Server brings Figma directly into your workflow by providing important design information and context to AI agents generating code from Fig...", "Dev Mode MCP 服务通过向从 Figma 设计生成代码的 AI 智能体提供关键设计信息和上下文，将 Figma 直接引入您的工作流程中..."],

    ["The GitHub MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with GitHub APIs, enabling advanced automation and workflows directly in your AI assistant.", "GitHub MCP 服务是一个提供与 GitHub API 无缝集成的模型上下文协议 (MCP) 服务，可直接在 AI 助手内实现高级自动化与工作流。"],
    ["The GitHub MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with GitHub APIs, enabling advanced automation and...", "GitHub MCP 服务是一个提供与 GitHub API 无缝集成的模型上下文协议 (MCP) 服务，可实现高级自动化与..."],

    // 4. 截图 4 (物联网、云数据库与支付协同)
    ["Google Home Developer", "Google Home 开发者"],
    ["The Google Home Developer MCP server allows you to search through Google Home documentation, OpenThread and Matter specifications documentation.", "Google Home Developer MCP 服务允许您检索 Google Home 文档、OpenThread 和 Matter 规范文档。"],

    ["Manage your Neon backend with the Neon MCP Server: Lakebase Postgres, branching, Object Storage, Functions, and the AI Gateway", "使用 Neon MCP 服务管理您的 Neon 后端：Lakebase Postgres、数据库分支、对象存储、函数以及 AI 网关"],
    ["Manage your Neon backend with the Neon MCP Server", "使用 Neon MCP 服务管理您的 Neon 后端"],

    ["The Stripe Model Context Protocol server allows you to integrate with Stripe APIs through function calling. This protocol supports various tools to interact with different Stripe resources and features.", "Stripe 模型上下文协议服务允许您通过函数调用与 Stripe API 集成。该协议支持各种工具与不同 Stripe 资源和功能进行交互。"],
    ["The Stripe Model Context Protocol server allows you to integrate with Stripe APIs through function calling. This protocol supports various tools to interact with different...", "Stripe 模型上下文协议服务允许您通过函数调用与 Stripe API 集成。该协议支持各种工具与不同 Stripe 资源和功能进行交互..."],
    ["The Stripe Model Context Protocol server allows you to integrate with Stripe APIs through 函数调用. This protocol supports various tools to interact with different...", "Stripe 模型上下文协议服务允许您通过函数调用与 Stripe API 集成。该协议支持各种工具与不同 Stripe 资源和功能进行交互..."],

    ["Interact with Redis key-value stores", "与 Redis 键值存储交互"],

    ["A Model Context Protocol server for interacting with MongoDB Atlas.", "用于与 MongoDB Atlas 交互的模型上下文协议 (MCP) 服务。"],
    ["A Model Context Protocol server for interacting with MongoDB Atlas", "用于与 MongoDB Atlas 交互的模型上下文协议 (MCP) 服务"],

    ["Official Notion MCP Server that allows interaction with Notion workspaces, pages, databases, and comments via the Notion API.", "官方 Notion MCP 服务，允许通过 Notion API 与 Notion 工作区、页面、数据库和评论进行交互。"],
    ["Official Notion MCP Server that allows interaction with Notion workspaces, pages, databases, and comments via the Notion API", "官方 Notion MCP 服务，允许通过 Notion API 与 Notion 工作区、页面、数据库和评论进行交互"],

    ["Official Linear.app MCP Server for interacting with Linear projects, issues, and workflows.", "官方 Linear.app MCP 服务，用于与 Linear 项目、议题 (Issues) 和工作流程进行交互。"],
    ["Official Linear.app MCP Server for interacting with Linear projects, issues, and workflows", "官方 Linear.app MCP 服务，用于与 Linear 项目、议题 (Issues) 和工作流程进行交互"],

    ["An MCP server implementation that integrates the Perplexity Sonar API to provide real-time, web-wide research capabilities.", "集成 Perplexity Sonar API 的 MCP 服务实现，提供实时全网深度研究能力。"],
    ["An MCP server implementation that integrates the Perplexity Sonar API to provide real-time, web-wide research capabilities", "集成 Perplexity Sonar API 的 MCP 服务实现，提供实时全网深度研究能力"],

    ["Official PayPal MCP Server that allows integration with PayPal APIs for payment processing, transaction management, and account operations.", "官方 PayPal MCP 服务，允许与 PayPal API 集成以进行支付处理、交易管理和账户操作。"],
    ["Official PayPal MCP Server that allows integration with PayPal APIs for payment processing, transaction management, and account operations", "官方 PayPal MCP 服务，允许与 PayPal API 集成以进行支付处理、交易管理和账户操作"],

    // 5. 截图 5 (现代集成、代码分析与端到端观测)
    ["Airweave lets agents search any app.", "Airweave 允许智能体搜索任何应用程序。"],
    ["Airweave lets agents search any app", "Airweave 允许智能体搜索任何应用程序"],

    ["Atlassian MCP Server for interacting with Atlassian products.", "用于与 Atlassian 产品（Jira、Confluence 等）交互的 Atlassian MCP 服务。"],
    ["Atlassian MCP Server for interacting with Atlassian products", "用于与 Atlassian 产品（Jira、Confluence 等）交互的 Atlassian MCP 服务"],

    ["Interact with your Harness account using natural language. This MCP server lets AI agents inspect and manage CI/CD pipelines, executions, services, environments, and deployments.", "使用自然语言与您的 Harness 账户交互。该 MCP 服务允许 AI 智能体检查和管理 CI/CD 流水线、执行记录、服务、环境及部署。"],
    ["Interact with your Harness account using natural language. This MCP server lets AI agents inspect and manage CI/CD pipelines, executions, services, environments,...", "使用自然语言与您的 Harness 账户交互。该 MCP 服务允许 AI 智能体检查和管理 CI/CD 流水线、执行记录、服务与环境..."],
    ["Interact with your Harness account using natural language.", "使用自然语言与您的 Harness 账户交互。"],

    ["SonarQube MCP Server enables AI assistants to interact with SonarQube instances for code quality analysis, project management, and quality gate operations.", "SonarQube MCP 服务使 AI 助手能够与 SonarQube 实例交互，以执行代码质量分析、项目管理和质量门禁操作。"],
    ["SonarQube MCP Server enables AI assistants to interact with SonarQube instances for code quality analysis, project management, and quality gate operations", "SonarQube MCP 服务使 AI 助手能够与 SonarQube 实例交互，以执行代码质量分析、项目管理和质量门禁操作"],

    ["Netlify MCP Server enables AI assistants to interact with Netlify's platform for managing sites, deployments, domains, and other web development workflows.", "Netlify MCP 服务使 AI 助手能够与 Netlify 平台交互，以管理站点、部署、域名及其他 Web 开发工作流。"],
    ["Netlify MCP Server enables AI assistants to interact with Netlify's platform for managing sites, deployments, domains, and other web development workflows", "Netlify MCP 服务使 AI 助手能够与 Netlify 平台交互，以管理站点、部署、域名及其他 Web 开发工作流"],

    ["Sequential Thinking", "结构化深度思考 (Sequential Thinking)"],
    ["A Model Context Protocol server that provides structured thinking and reasoning capabilities for LLM conversations.", "为大语言模型 (LLM) 对话提供结构化思考与逻辑推理能力的模型上下文协议 (MCP) 服务。"],
    ["A Model Context Protocol server that provides structured thinking and reasoning capabilities for LLM conversations", "为大语言模型 (LLM) 对话提供结构化思考与逻辑推理能力的模型上下文协议 (MCP) 服务"],

    ["Sonatype Guide", "Sonatype 指南"],
    ["Sonatype MCP server for interacting with our dependency management and security intelligence platform.", "用于与依赖管理和安全情报平台交互的 Sonatype MCP 服务。"],
    ["Sonatype MCP server for interacting with our dependency management and security intelligence platform", "用于与依赖管理和安全情报平台交互的 Sonatype MCP 服务"],

    ["Google Maps Platform Code Assist", "Google Maps 平台 Code Assist"],
    ["Google Maps 平台 Code Assist", "Google Maps 平台 Code Assist"],
    ["The Google Maps Platform Code Assist MCP server provides your favorite AI coding assistant with up-to-date, official Google Maps Platform documentation, code samples, and best practices.", "Google Maps 平台 Code Assist MCP 服务为您喜爱的 AI 编程助手提供最新官方 Google Maps 平台文档、代码示例及最佳实践。"],
    ["The Google Maps Platform Code Assist MCP server provides your favorite AI coding assistant with up-to-date, official Google Maps Platform documentation, code samples...", "Google Maps 平台 Code Assist MCP 服务为您喜爱的 AI 编程助手提供最新官方 Google Maps 平台文档、代码示例及最佳实践..."],
    ["The Google Maps 平台 Code Assist MCP server provides your favorite AI coding assistant with up-to-date, official Google Maps 平台 documentation, code samples...", "Google Maps 平台 Code Assist MCP 服务为您喜爱的 AI 编程助手提供最新官方 Google Maps 平台文档、代码示例及最佳实践..."],

    ["ArizeTracingAssistant", "Arize 链路追踪助手 (ArizeTracingAssistant)"],
    ["This MCP server provides your LLM with docs and examples to instrument your AI apps with Arize AX. It also provides access to Arize support. Connect it to your IDE to start debugging traces.", "该 MCP 服务为您的 LLM 提供文档和示例，以便使用 Arize AX 埋点观测您的 AI 应用。它还提供对 Arize 支持的访问。将其连接到您的 IDE 开始调试链路跟踪。"],
    ["This MCP server provides your LLM with docs and examples to instrument your AI apps with Arize AX. It also provides access to Arize support. Connect it to your IDE...", "该 MCP 服务为您的 LLM 提供文档和示例，以便使用 Arize AX 埋点观测您的 AI 应用。它还提供对 Arize 支持的访问。将其连接到您的 IDE..."],
    ["This MCP server provides your LLM with docs and examples to instrument your AI apps with Arize AX.", "该 MCP 服务为您的 LLM 提供文档和示例，以便使用 Arize AX 埋点观测您的 AI 应用。"],
];

// 合并技能词条与 UI 词条
const COMBINED_PHRASES = [...skillPhrasePairs, ...UI_PHRASES];

// 4. 精确单词匹配
const EXACT_WORDS = {
    "Search MCP servers by name": "按名称搜索 MCP 服务",
    "Search MCP servers": "搜索 MCP 服务",
    "Search MCP server": "搜索 MCP 服务",
    "Configured MCP Servers": "已配置的 MCP 服务",
    "Available MCP Servers": "可用 MCP 服务",
    "Installed MCP Servers": "已安装的 MCP 服务",
    "No MCP servers found": "未找到匹配的 MCP 服务",
    "Custom MCP Server": "自定义 MCP 服务",
    "Add custom MCP server": "添加自定义 MCP 服务",
    "Add Custom Server": "添加自定义服务",
    "Manage MCP Servers": "管理 MCP 服务",
    "Google Kubernetes Engine (Remote)": "Google Kubernetes Engine (远程)",
    "Google Cloud Bigtable Admin": "Google Cloud Bigtable 管理",
    "Google Cloud CLI (Preview)": "Google Cloud CLI (预览)",
    "Google Cloud Apigee API hub": "Google Cloud Apigee API 中心",
    "Knowledge Catalog": "知识目录 (Knowledge Catalog)",
    "MCP Toolbox for Databases": "数据库 MCP 工具箱 (MCP Toolbox for Databases)",
    "Oracle Database": "Oracle 数据库",
    "Google Home Developer": "Google Home 开发者",
    "Sequential Thinking": "结构化深度思考 (Sequential Thinking)",
    "Sonatype Guide": "Sonatype 指南",
    "Google Maps Platform Code Assist": "Google Maps 平台 Code Assist",
    "Google Maps 平台 Code Assist": "Google Maps 平台 Code Assist",
    "ArizeTracingAssistant": "Arize 链路追踪助手 (ArizeTracingAssistant)",

    "Outside of folders file access policy": "工作目录外文件访问策略",
    "Terminal Command Auto Execution": "终端命令自动执行策略",
    "Terminal Command Auto Execution Policy": "终端命令自动执行策略",
    "Terminal Command Execution Policy": "终端命令执行策略",
    "Terminal Command Execution": "终端命令执行策略",
    "Controls the actions the agent can take.": "控制智能体可以执行的操作范围。",
    "Controls whether terminal commands require your approval before running.": "控制运行终端命令前是否需要您的审核与批准。",
    "Modify permissions for file, terminal, and MCP tools.": "修改文件、终端以及 MCP 工具的权限。",
    "Configures how the agent tries to access files outside of its working folders.": "配置智能体尝试访问其工作目录之外的文件时的处理策略。",
    "Folders": "文件夹",
    "Folder": "文件夹",
    "Disabled": "已禁用",
    "Catppuccin": "Catppuccin 浅色",
    "Catppuccin Light": "Catppuccin 浅色",
    "Catppuccin Dark": "Catppuccin 深色",
    "Fast Mode": "极速模式",
    "Fast mode": "极速模式",
    "Planning Mode": "规划模式",
    "Planning mode": "规划模式",
    "Task Mode": "任务模式",
    "Task mode": "任务模式",
    "Security Policy Preset": "安全策略预设",
    "Security Policy": "安全策略",
    "Danger Zone": "危险区域",
    "Delete Project": "删除项目",
    "Delete Conversation": "删除会话",
    "Delete conversation": "删除会话",
    "Delete Task": "删除任务",
    "Delete Artifact": "删除产物文档",
    "Require Review": "需要审核",
    "Tool Permissions": "工具权限",
    "Version": "版本",
    "App version": "应用版本",
    "Project": "项目",
    "Local Permissions": "本地权限",
    "Global Permissions": "全局权限",
    "Workspace Permissions": "工作区权限",
    "Dart and Flutter": "Dart 与 Flutter",
    "Google Maps Platform": "Google Maps 平台",
    "Inherit 常规设置": "继承常规设置",
    "Inherit General Settings": "继承全局常规设置",
    "Inherit General": "继承常规设置",
    "Inherit Global Settings": "继承全局设置",
    "Inherit Global": "继承全局设置",
    "Inherit Workspace Settings": "继承工作区设置",
    "Inherit Workspace": "继承工作区设置",
    "Enabled": "已启用",
    "Commands": "命令",
    "Window": "窗口",
    "Create Project": "新建项目",
    "Command Palette": "命令面板",
    "Commands Outside Sandbox": "沙箱外命令执行",
    "Open System Preferences": "打开系统偏好设置",
    "Agent terminated due to error": "智能体因错误而终止",
    "Copy debug info": "复制调试信息",
    "Copy Debug Info": "复制调试信息",
    "Split Right": "向右分屏",
    "Split Down": "向下分屏",
    "Split Left": "向左分屏",
    "Split Up": "向上分屏",
    "Replace With New": "替换为新建",
    "Replace with New": "替换为新建",
    "Split": "分屏",
    "Plugins": "插件扩展",
    "Customize": "自定义配置",
    "Custom Agents": "自定义代理",
    "Automatic Check for Updates": "自动检查更新",
    "Check for Updates": "检查更新",
    "Advanced Settings": "高级设置",
    "Allow running this command?": "允许运行此命令吗？",
    "Yes, allow this time": "允许，仅本次允许",
    "No (tell the agent what to do instead)": "拒绝（告诉智能体改做什么）",
    "Skip": "跳过",
    "Submit": "提交",
    "Add": "添加",
    "Back": "返回",
    "← Back": "← 返回",
    "One Light": "One 浅色",
    "Solarized Light": "Solarized 浅色",
    "One Dark": "One 深色",
    "Solarized Dark": "Solarized 深色",
    "Minimize": "最小化",
    "Maximize": "最大化",
    "Close": "关闭",
    "Zoom In": "放大",
    "Zoom Out": "缩小",
    "Reset Zoom": "重置缩放",
    "Close Tab": "关闭标签页",
    "Go Back": "返回",
    "Go Forward": "前进",
    "Focus Input": "聚焦输入框",
    "File Picker": "文件选择器",
    "Picker": "选择器",
    "Working": "正在运行",
    "General Feedback": "常规意见与反馈",
    "Dismiss": "知道了",
    "Invalid Media": "附件无效",
    "Device Name": "设备名称",
    "Device name": "设备名称",
    "copy link": "复制链接",
    "Copy link": "复制链接",
    "Copy Link": "复制链接",
    "Always Proceed": "始终自动执行",
    "Always proceed": "始终自动执行",
    "Always Ask": "每次询问",
    "Always ask": "每次询问",
    "Request Review": "请求审核",
    "Request review": "请求审核",
    "Default": "默认",
    "Narrow": "较窄",
    "Wide": "较宽",
    "Queue": "排队等待",
    "Strict": "严格模式",
    "Upgrade": "升级方案",
    "Plan": "当前方案",
    "Global": "全局",
    "Skills": "技能",
    "Projects": "项目管理",
    "Subagents": "子代理",
    "Artifacts": "产物文档",
    "Terminals": "终端控制台",
    "Terminal": "终端",
    "Settings": "设置",
    "Proceed": "继续执行",
    "Approve": "批准",
    "Reject": "拒绝",
    "Retry": "重试",
    "Cancel": "取消",
    "Send": "发送",
    "Stop": "停止",
    "Attach": "附件",
    "Copied": "已复制",
    "Copy": "复制",
    "Clear": "清空",
    "Delete": "删除",
    "Rename": "重命名",
    "Search": "搜索",
    "Filter": "筛选",
    "Accept": "接受",
    "Revert": "放弃",
    "Allow": "允许",
    "Ask": "询问",
    "Deny": "拒绝",
    "Theme": "主题",
    "Notifications": "系统通知",
    "Light": "明亮",
    "Dark": "暗黑",
    "System": "跟随系统",
    "Quit": "退出",
    "Docs": "官方文档",
    "Help": "帮助",
    "File": "文件",
    "Edit": "编辑",
    "View": "视图",
    "Open": "打开",
    "Chat": "对话",
    "App": "应用设置",
    "Application": "应用设置",
    "Custom": "自定义",
    "Full machine": "整机访问模式",
    "Turbo mode": "极速模式",
    "Turbo Mode": "极速模式",
    "Download": "下载安装",
    "Downloaded": "已安装",
    "Install": "安装",
    "Installed": "已安装",
    "Uninstall": "卸载",
    "Science": "科学研究",
    "Firebase": "Firebase 全栈",
    "Android": "Android 开发",
    "Local": "本地环境",
    "Always": "始终允许",
    "Confirm": "确认",
    "Run": "运行",
    "Feedback": "意见反馈",
    "Preset": "预设风格",
    "Background": "背景色",
    "Foreground": "前景色",
    "Accent": "强调色",
    "Description": "详细描述"
};

// 5. 生成直接内联的 JavaScript 代码
const injectedCode = `
// ==========================================
// Antigravity 延迟安全中文本地化引擎 (Preload 隔离环境 - v4.1 全量终极版)
// ==========================================
(function initChineseLocalization() {
    try {
        const PHRASES = ${JSON.stringify(COMBINED_PHRASES)};
        const EXACT_WORDS = ${JSON.stringify(EXACT_WORDS)};

        PHRASES.sort((a, b) => b[0].length - a[0].length);

        function isExcluded(node) {
            let el = node.nodeType === 1 ? node : node.parentElement;
            while (el) {
                const tag = el.tagName;
                if (tag === 'CODE' || tag === 'PRE' || tag === 'TEXTAREA' || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'INPUT') {
                    return true;
                }
                if (el.isContentEditable) {
                    return false;
                }
                if (el.classList && typeof el.classList.contains === 'function' && (
                    el.classList.contains('monaco-editor') ||
                    el.classList.contains('cm-content') ||
                    el.classList.contains('hljs') ||
                    el.classList.contains('token') ||
                    el.classList.contains('notranslate')
                )) {
                    return true;
                }
                el = el.parentElement;
            }
            return false;
        }

        function translateText(text) {
            if (!text || typeof text !== 'string' || !text.trim()) return text;
            let res = text;

            // 1. 特殊整句或已知混杂语句优先直接处理
            if (res.includes("使用 Gemini Interactions API 和 Live API 构建应用，，包含") || res.includes("使用 Gemini Interactions API 和 Live API 构建应用，包含 text generation")) {
                return "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频等能力。";
            }
            if (res.includes("Also includes global settings when working")) {
                return "在当前项目中工作时，同时继承并应用全局设置。了解更多。";
            }
            if (res.includes("Inherits your 常规设置 settings when working") || res.includes("Inherits your General Settings settings when working") || res.includes("Inherits your General settings when working")) {
                return "在当前项目中工作时，直接继承并沿用您的全局常规设置。";
            }

            // 2. 长短语字典替换
            for (let i = 0; i < PHRASES.length; i++) {
                const [en, zh] = PHRASES[i];
                if (res.includes(en)) {
                    res = res.replaceAll(en, zh);
                }
            }

            // 2.1 多行与空白折叠归一化匹配 (针对 YAML 块折叠换行等情况)
            if (/[a-zA-Z]{3,}/.test(res)) {
                const normRes = res.replace(/\\s+/g, ' ').trim();
                for (let i = 0; i < PHRASES.length; i++) {
                    const [en, zh] = PHRASES[i];
                    if (en.includes(' ') && normRes === en.replace(/\\s+/g, ' ').trim()) {
                        return zh;
                    }
                }
            }

            // 3. 精确单词匹配
            const trimmed = res.trim();
            if (EXACT_WORDS[trimmed]) {
                return res.replace(trimmed, EXACT_WORDS[trimmed]);
            }

            // 4. 弹窗与权限交互
            if (res.includes("Allow running this command?")) {
                res = res.replaceAll("Allow running this command?", "允许运行此命令吗？");
            }
            if (res.includes("Yes, allow this time")) {
                res = res.replaceAll("Yes, allow this time", "允许，仅本次允许");
            }
            if (res.includes("No (tell the agent what to do instead)")) {
                res = res.replaceAll("No (tell the agent what to do instead)", "拒绝（告诉智能体改做什么）");
            }

            // 5. 动态正则处理
            res = res.replace(/Permanently delete\s+([\s\S]+?)\s+including\s+(\d+)\s+active\s+conversations?\./gi, '永久删除 $1（包含 $2 个活动会话）。');
            res = res.replace(/Permanently delete\s+([\s\S]+?)\s+including/gi, '永久删除 $1，包含');
            res = res.replace(/Modified in\s+([\s\S]+)/gi, '已在 $1 中修改');
            res = res.replace(/Learn more about\s+([\s\S]+)/gi, '了解更多关于 $1');
            res = res.replace(/Learn more\s+关于\s+([\s\S]+)/gi, '了解更多关于 $1');
            res = res.replace(/Also includes global settings when working\s*（仅当前项目）\s*\.?\s*了解更多\.?/gi, '在当前项目中工作时，同时继承并应用全局设置。了解更多。');
            res = res.replace(/Also includes global settings when working\s*（仅当前项目）/gi, '在当前项目中工作时，同时继承并应用全局设置');
            res = res.replace(/Also includes global settings when working/gi, '在当前项目中工作时，同时继承并应用全局设置');
            res = res.replace(/Inherits your\s+(.+?)\s+settings when working\s*（仅当前项目）\s*\.?/gi, '在当前项目中工作时，直接继承并沿用您的 $1 设置。');
            res = res.replace(/Inherits your\s+(.+?)\s+settings when working in this project\s*\.?/gi, '在当前项目中工作时，直接继承并沿用您的 $1 设置。');
            res = res.replace(/Inherits your\s+(.+?)\s+settings/gi, '继承您的 $1 设置');
            res = res.replace(/Inherit\s+常规设置/gi, '继承常规设置');
            res = res.replace(/Inherit\s+General Settings/gi, '继承全局常规设置');
            res = res.replace(/Inherit\s+Global(\s+Settings)?/gi, '继承全局设置');
            res = res.replace(/继承\s+Global/gi, '继承全局设置');
            res = res.replace(/Inherit\s+(.+)/gi, '继承 $1');

            // 5.1 用户最新截图针对性动态匹配与兜底
            if (res.includes("Controls the actions the agent can take")) {
                res = "控制智能体可以执行的操作范围。";
            }
            if (res.includes("Outside of folders file access policy")) {
                res = "工作目录外文件访问策略";
            }
            if (res.includes("Configures how the agent tries to access files outside of its working folders")) {
                res = "配置智能体尝试访问其工作目录之外的文件时的处理策略。";
            }
            if (res.includes("Terminal Command Auto Execution")) {
                res = "终端命令自动执行策略";
            }
            if (res.includes("Controls whether terminal commands require your approval before running")) {
                res = "控制运行终端命令前是否需要您的审核与批准。";
            }
            if (res.includes("Modify permissions for file, terminal, and MCP tools")) {
                res = "修改文件、终端以及 MCP 工具的权限。";
            }
            if (res.includes("Are you sure you want to delete this conversation")) {
                res = "您确定要删除此会话吗？此操作无法撤销。";
            }
            if (res.includes("Are you sure you want to delete this project")) {
                res = "您确定要删除此项目吗？此操作无法撤销。";
            }
            if (res.includes("Agent terminated due to error")) {
                res = "智能体因错误而终止";
            }
            if (res.includes("You can prompt the model to try again or start a new conversation")) {
                res = "您可以提示模型重试，若错误持续存在，请开启新会话。";
            }
            if (res.includes("troubleshooting") && res.includes("help")) {
                res = "查看我们的 故障排除指南 获取更多帮助。";
            }
            if (res.includes("Replace the usage of")) {
                res = "将测试中的 expect 及 package:matcher 相关断言函数替换为现代 package:checks 等效项。";
            }
            if (res.includes("Proactively connect to running Dart/Flutter apps")) {
                res = res.replaceAll("Proactively connect to running Dart/Flutter apps and trigger hot reload or hot restart upon editing .dart files under lib/.", "编辑 lib/ 目录下的 .dart 文件时，主动连接正在运行的 Dart/Flutter 应用并触发热重载或热重启。");
                res = res.replaceAll("Proactively connect to running Dart/Flutter apps and trigger hot reload or hot restart upon editing .dart files under lib/", "编辑 lib/ 目录下的 .dart 文件时，主动连接正在运行的 Dart/Flutter 应用并触发热重载或热重启");
                res = res.replaceAll("Proactively connect to running Dart/Flutter apps", "主动连接正在运行的 Dart/Flutter 应用");
            }
            if (res.includes("Proactively connect to apps and hot reload")) {
                res = res.replaceAll("Proactively connect to apps and hot reload", "主动连接正在运行的应用并执行热重载");
            }
            if (res.includes("Manage project folders, agent settings, and permissions")) {
                res = res.replaceAll("Manage project folders, agent settings, and permissions.", "管理项目文件夹、智能体设置及权限。");
                res = res.replaceAll("Manage project folders, agent settings, and permissions", "管理项目文件夹、智能体设置及权限");
            }
            if (res.includes("Configure the browser subagent")) {
                res = res.replaceAll("Configure the browser subagent. It requires Google Chrome to be installed.", "配置浏览器子代理。需要安装 Google Chrome。");
                res = res.replaceAll("Configure the browser subagent.", "配置浏览器子代理。");
                res = res.replaceAll("Configure the browser subagent", "配置浏览器子代理");
                res = res.replaceAll("It requires Google Chrome to be installed.", "需要安装 Google Chrome。");
                res = res.replaceAll("It requires Google Chrome to be installed", "需要安装 Google Chrome");
            }
            if (res.includes("Block all browser JavaScript execution")) {
                res = res.replaceAll("Block all browser JavaScript execution.", "阻止所有浏览器 JavaScript 执行。");
                res = res.replaceAll("Block all browser JavaScript execution", "阻止所有浏览器 JavaScript 执行");
            }
            if (res.includes("Prompt for approval before running browser scripts")) {
                res = res.replaceAll("Prompt for approval before running browser scripts.", "运行浏览器脚本前提示审核与批准。");
                res = res.replaceAll("Prompt for approval before running browser scripts", "运行浏览器脚本前提示审核与批准");
            }
            if (res.includes("Allow full browser script execution without prompting")) {
                res = res.replaceAll("Allow full browser script execution without prompting.", "允许完整执行浏览器脚本且无需提示。");
                res = res.replaceAll("Allow full browser script execution without prompting", "允许完整执行浏览器脚本且无需提示");
            }
            if (res.includes("Guides agents in compiling and packaging C/C++ source code")) {
                res = "指导智能体使用 Dart 原生资产 (Native Assets) 钩子系统将 C/C++ 源码编译并打包为动态或静态库。当要求配置或链接原生资产、编译 C/C++ 代码、或在 Dart/Flutter 中集成 C/C++ 互操作时使用。";
            }
            if (res.includes("Rules and formatting guidelines for writing Dart /// API documentation")) {
                res = "编写 Dart /// API 文档与注释的规范与格式指南。在为 Dart 代码编写文档注释（库、类、方法、变量等）或遵循 Effective Dart 文档准则时使用。";
            }

            if (res.includes("Yes, and always allow ")) {
                res = res.replace(/Yes,\\s*and\\s*always\\s*allow\\s+([\\s\\S]+?)\\s+in\\s+this\\s+conversation/gi, '允许，并在当前会话中始终允许 $1');
                res = res.replace(/Yes,\\s*and\\s*always\\s*allow\\s+([\\s\\S]+?)\\s+in\\s+this\\s+project/gi, '允许，并在当前项目中始终允许 $1');
                res = res.replace(/Yes,\\s*and\\s*always\\s*allow\\s+([\\s\\S]+)/gi, '允许，并始终允许 $1');
            }


            // 5.2 MCP 服务市场特征前缀动态兜底
            if (res.includes("The Cloud Audit Manager remote MCP server")) {
                if (res.includes("europe")) {
                    res = "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查 europe-west1 区域内的资源登记状态。";
                } else {
                    res = "Cloud Audit Manager 远程 MCP 服务允许您登记项目、生成审计与作用域报告，并检查 us-central1 区域内的资源登记状态。";
                }
            }
            if (res.includes("Investigate and fix software issues using AI-powered root cause analysis")) {
                res = "使用 AI 驱动的根本原因分析调查并修复软件问题。该 MCP 服务连接到您的 Antimetal 账户以检索问题、阅读调查报告...";
            }
            if (res.includes("Query and act on your marketing, analytics, CRM")) {
                res = "跨 325+ 个连接器（Meta Ads、Google Ads、TikTok Ads、GA4、HubSpot 等）查询并处理您的营销、分析、CRM、电商及数据仓库数据。";
            }
            if (res.includes("Query your GitLab SDLC as a knowledge graph")) {
                res = "将您的 GitLab 软件开发生命周期 (SDLC) 作为知识图谱进行查询。Orbit 将群组、项目、源码、合并请求、流水线、工作项和安全发现编入图谱索引...";
            }
            if (res.includes("Enable Antigravity to deploy apps to Google Cloud Run")) {
                res = "使 Antigravity 能够将应用程序部署到 Google Cloud Run。";
            }
            if (res.includes("Ask questions. Get answers. The MCP is a server your coding agent talks to")) {
                res = "提出问题，获取答案。该 MCP 是智能体与之交互的服务器。用自然语言提问，它将针对您的 PostHog 数据执行查询并将答案直接返回到对话中...";
            }
            if (res.includes("Search and reference over 600,000 real-world app screens")) {
                res = "直接在您的 AI 工具中搜索并参考 Mobbin 上超过 600,000 个真实应用的界面、用户交互流程和 UI 设计模式。";
            }
            if (res.includes("The Wiz MCP Server connects multiple security data sources")) {
                res = "Wiz MCP 服务通过集中式主机和服务器设置连接多个安全数据源，为您的安全状况创建统一、上下文关联的全局视图——...";
            }
            if (res.includes("The GKE remote MCP server provides read write access")) {
                res = "GKE 远程 MCP 服务提供对 GKE Kubernetes 资源的读写访问权限。它允许 AI 智能体检查和观测您的集群环境。";
            }
            if (res.includes("Dart") && res.includes("Flutter MCP server exposes Dart")) {
                res = "Dart 与 Flutter MCP 服务向兼容的 AI 助手客户端暴露 Dart（及 Flutter）开发工具操作。";
            }
            if (res.includes("The Firebase Model Context Protocol (MCP) Server gives AI-powered development tools")) {
                res = "Firebase 模型上下文协议 (MCP) 服务使 AI 开发工具能够与您的 Firebase 项目和应用程序代码库协同工作。";
            }
            if (res.includes("The Genkit Model Context Protocol (MCP) Server gives AI-powered development tools")) {
                res = "Genkit 模型上下文协议 (MCP) 服务使 AI 开发工具能够构建、调试和检查您的 Genkit 应用程序。";
            }
            if (res.includes("The gopls Model Context Protocol (MCP) server provides tools")) {
                res = "gopls 模型上下文协议 (MCP) 服务为您的 Go 代码库提供语义代码分析、实时诊断与代码转换工具。";
            }
            if (res.includes("Interact with your BigQuery data using natural language")) {
                res = "使用自然语言与您的 BigQuery 数据交互。该 MCP 服务允许您安全连接到数据集以搜索数据、检查数据表结构...";
            }
            if (res.includes("The AlloyDB for PostgreSQL remote MCP server lets you access")) {
                res = "AlloyDB for PostgreSQL 远程 MCP 服务允许您访问并运行 AlloyDB 工具来管理 AlloyDB 集群和实例、管理用户、创建和恢复备份...";
            }
            if (res.includes("The Bigtable Admin remote MCP server lets you manage Bigtable resources")) {
                res = "Bigtable Admin 远程 MCP 服务允许您管理 Bigtable 资源。";
            }
            if (res.includes("Manage Google Cloud resources with natural language") || res.includes("Manage Google Cloud resources with natural...")) {
                res = "使用自然语言管理 Google Cloud 资源。该 MCP 服务提供安全运行 gcloud CLI 命令的工具。";
            }
            if (res.includes("The Cloud SQL remote MCP server lets you access and run Cloud SQL tools")) {
                res = "Cloud SQL 远程 MCP 服务允许您访问并运行 Cloud SQL 工具来管理 Cloud SQL 实例、管理用户、创建和恢复备份、管理数据库...";
            }
            if (res.includes("The Spanner remote MCP server lets you access and run Spanner tools")) {
                res = "Spanner 远程 MCP 服务允许您通过支持 AI 的开发环境访问并运行 Spanner 工具来创建、管理和查询 Spanner 资源...";
            }
            if (res.includes("The Apigee API hub remote MCP server lets you manage the APIs")) {
                res = "Apigee API hub 远程 MCP 服务允许您管理注册的 API、版本、规范、操作、部署、属性、外部 API 及依赖项...";
            }
            if (res.includes("Connect your AI assistants to Looker business intelligence")) {
                res = "将您的 AI 助手连接到 Looker 商业智能平台。该 MCP 服务允许您执行自然语言查询以进行数据探索和内容管理...";
            }
            if (res.includes("Connect your AI assistants to the Knowledge Catalog")) {
                res = "将您的 AI 助手连接到 Knowledge Catalog（前身为 Dataplex）。该 MCP 服务允许您检索元数据以实现数据发现与数据治理...";
            }
            if (res.includes("The MCP Toolbox for Databases is an open-source MCP server designed to simplify")) {
                res = "MCP Toolbox for Databases 是一个开源 MCP 服务，旨在简化和保护与数据库交互工具的开发。";
            }
            if (res.includes("Interact with your Oracle Database data using natural language")) {
                res = "使用自然语言与您的 Oracle 数据库数据交互。该 MCP 服务允许您安全连接到数据库以执行 SQL 查询、检查表结构...";
            }
            if (res.includes("The Dev Mode MCP Server brings Figma directly into your workflow")) {
                res = "Dev Mode MCP 服务通过向从 Figma 设计生成代码的 AI 智能体提供关键设计信息和上下文，将 Figma 直接引入您的工作流程中...";
            }
            if (res.includes("The GitHub MCP Server is a Model Context Protocol (MCP) server that provides seamless integration")) {
                res = "GitHub MCP 服务是一个提供与 GitHub API 无缝集成的模型上下文协议 (MCP) 服务，可实现高级自动化与智能工作流...";
            }
            if (res.includes("The Google Home Developer MCP server allows you to search")) {
                res = "Google Home Developer MCP 服务允许您检索 Google Home 文档、OpenThread 和 Matter 规范文档。";
            }
            if (res.includes("Manage your Neon backend with the Neon MCP Server")) {
                res = "使用 Neon MCP 服务管理您的 Neon 后端：Lakebase Postgres、数据库分支、对象存储、函数以及 AI 网关";
            }
            if (res.includes("The Stripe Model Context Protocol server allows you to integrate with Stripe APIs")) {
                res = "Stripe 模型上下文协议服务允许您通过函数调用与 Stripe API 集成。该协议支持各种工具与不同 Stripe 资源和功能进行交互...";
            }
            if (res.includes("Interact with Redis key-value stores")) {
                res = "与 Redis 键值存储交互";
            }
            if (res.includes("A Model Context Protocol server for interacting with MongoDB Atlas")) {
                res = "用于与 MongoDB Atlas 交互的模型上下文协议 (MCP) 服务。";
            }
            if (res.includes("Official Notion MCP Server that allows interaction with Notion workspaces")) {
                res = "官方 Notion MCP 服务，允许通过 Notion API 与 Notion 工作区、页面、数据库和评论进行交互。";
            }
            if (res.includes("Official Linear.app MCP Server for interacting with Linear projects")) {
                res = "官方 Linear.app MCP 服务，用于与 Linear 项目、议题 (Issues) 和工作流程进行交互。";
            }
            if (res.includes("An MCP server implementation that integrates the Perplexity Sonar API")) {
                res = "集成 Perplexity Sonar API 的 MCP 服务实现，提供实时全网深度研究能力。";
            }
            if (res.includes("Official PayPal MCP Server that allows integration with PayPal APIs")) {
                res = "官方 PayPal MCP 服务，允许与 PayPal API 集成以进行支付处理、交易管理和账户操作。";
            }
            if (res.includes("Airweave lets agents search any app")) {
                res = "Airweave 允许智能体搜索任何应用程序。";
            }
            if (res.includes("Atlassian MCP Server for interacting with Atlassian products")) {
                res = "用于与 Atlassian 产品（Jira、Confluence 等）交互的 Atlassian MCP 服务。";
            }
            if (res.includes("Interact with your Harness account using natural language")) {
                res = "使用自然语言与您的 Harness 账户交互。该 MCP 服务允许 AI 智能体检查和管理 CI/CD 流水线、执行记录、服务与环境...";
            }
            if (res.includes("SonarQube MCP Server enables AI assistants to interact with SonarQube instances")) {
                res = "SonarQube MCP 服务使 AI 助手能够与 SonarQube 实例交互，以执行代码质量分析、项目管理和质量门禁操作。";
            }
            if (res.includes("Netlify MCP Server enables AI assistants to interact with Netlify's platform")) {
                res = "Netlify MCP 服务使 AI 助手能够与 Netlify 平台交互，以管理站点、部署、域名及其他 Web 开发工作流。";
            }
            if (res.includes("A Model Context Protocol server that provides structured thinking and reasoning capabilities")) {
                res = "为大语言模型 (LLM) 对话提供结构化思考与逻辑推理能力的模型上下文协议 (MCP) 服务。";
            }
            if (res.includes("Sonatype MCP server for interacting with our dependency management")) {
                res = "用于与依赖管理和安全情报平台交互的 Sonatype MCP 服务。";
            }
            if (res.includes("The Google Maps") && res.includes("Code Assist MCP server provides your favorite AI coding assistant")) {
                res = "Google Maps 平台 Code Assist MCP 服务为您喜爱的 AI 编程助手提供最新官方 Google Maps 平台文档、代码示例及最佳实践...";
            }
            if (res.includes("This MCP server provides your LLM with docs and examples to instrument your AI apps with Arize AX")) {
                res = "该 MCP 服务为您的 LLM 提供文档和示例，以便使用 Arize AX 埋点观测您的 AI 应用。它还提供对 Arize 支持的访问。将其连接到您的 IDE...";
            }

            // 6. 相对时间词
            res = res.replace(/(\\d+)\\s*days?\\s*ago/gi, '$1 天前')
                     .replace(/(\\d+)\\s*hours?\\s*ago/gi, '$1 小时前')
                     .replace(/(\\d+)\\s*minutes?\\s*ago/gi, '$1 分钟前')
                     .replace(/(\\d+)\\s*days?/gi, '$1 天')
                     .replace(/(\\d+)\\s*hours?/gi, '$1 小时')
                     .replace(/(\\d+)\\s*minutes?/gi, '$1 分钟')
                     .replace(/(\\d+)\\s*seconds?/gi, '$1 秒');

            // 7. 标点清洗
            res = res.replaceAll("，，包含", "，包含")
                     .replaceAll("， 包含", "，包含")
                     .replaceAll("，，", "，")
                     .replaceAll("Inherit 常规设置", "继承常规设置")
                     .replaceAll("Inherit 全局常规设置", "继承全局常规设置");

            return res;
        }

        function translateNode(node) {
            if (!node) return;
            try {
                if (node.nodeType === 3) {
                    if (isExcluded(node)) return;
                    const original = node.nodeValue;
                    if (original && original.trim()) {
                        const translated = translateText(original);
                        if (translated !== original) {
                            node.nodeValue = translated;
                        }
                    }
                } else if (node.nodeType === 1) {
                    if (isExcluded(node)) return;
                    if (node.hasAttribute('placeholder')) {
                        const p = node.getAttribute('placeholder');
                        const tp = translateText(p);
                        if (p !== tp) node.setAttribute('placeholder', tp);
                    }
                    if (node.hasAttribute('data-placeholder')) {
                        const p = node.getAttribute('data-placeholder');
                        const tp = translateText(p);
                        if (p !== tp) node.setAttribute('data-placeholder', tp);
                    }
                    if (node.hasAttribute('aria-placeholder')) {
                        const p = node.getAttribute('aria-placeholder');
                        const tp = translateText(p);
                        if (p !== tp) node.setAttribute('aria-placeholder', tp);
                    }
                    if (node.hasAttribute('title')) {
                        const t = node.getAttribute('title');
                        const tt = translateText(t);
                        if (t !== tt) node.setAttribute('title', tt);
                    }
                    if (node.hasAttribute('aria-label')) {
                        const a = node.getAttribute('aria-label');
                        const ta = translateText(a);
                        if (a !== ta) node.setAttribute('aria-label', ta);
                    }
                    if (node.shadowRoot) {
                        translateNode(node.shadowRoot);
                    }
                    for (let i = 0; i < node.childNodes.length; i++) {
                        translateNode(node.childNodes[i]);
                    }
                }
            } catch (_) {}
        }

        let isTranslating = false;
        function sweep() {
            if (isTranslating || !document || !document.body) return;
            try {
                isTranslating = true;
                translateNode(document.body);
            } catch (_) {
            } finally {
                isTranslating = false;
            }
        }

        function initObserver() {
            sweep();
            let rafId = null;
            const observer = new MutationObserver(() => {
                if (!isTranslating && !rafId) {
                    rafId = requestAnimationFrame(() => {
                        rafId = null;
                        sweep();
                    });
                }
            });
            if (document.body) {
                observer.observe(document.body, { childList: true, subtree: true });
            }
            setInterval(sweep, 1000);
        }

        if (typeof window !== 'undefined') {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                setTimeout(initObserver, 600);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(initObserver, 600);
                });
            }
        }
    } catch (err) {
        console.error('[Antigravity-ZH] Initialization error:', err);
    }
})();
`;

const finalPreloadContent = baseCode + "\n" + injectedCode;
const targetPreload = path.join(cleanDir, "dist", "preload.js");
fs.writeFileSync(targetPreload, finalPreloadContent, "utf8");
fs.writeFileSync(path.join(__dirname, "..", "preload.js"), finalPreloadContent, "utf8");
console.log("FINAL_PRELOAD_V2151_WRITTEN_SUCCESSFULLY");
