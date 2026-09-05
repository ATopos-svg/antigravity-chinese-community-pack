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
const cleanDir = "C:\\Users\\Lenovo\\AppData\\Local\\Temp\\agy_212_extract";
const officialPreload = fs.readFileSync(path.join(cleanDir, "dist", "preload.js"), "utf8");

const marker = "// ==========================================";
let baseCode = officialPreload;
if (baseCode.includes(marker)) {
    baseCode = baseCode.substring(0, baseCode.indexOf(marker)).trim();
}

// 3. UI 菜单、系统按钮与基础短语
const UI_PHRASES = [
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
    ["Execution", "执行与流程"],
    ["about Turbo mode", "极速模式的相关说明"],
    ["about", "关于"],
    ["Plugin: ", "插件: "],
    ["Plugin:", "插件:"]
];

// 合并技能词条与 UI 词条
const COMBINED_PHRASES = [...skillPhrasePairs, ...UI_PHRASES];

// 4. 精确单词匹配
const EXACT_WORDS = {
    "Commands": "命令",
    "Window": "窗口",
    "Create Project": "新建项目",
    "Command Palette": "命令面板",
    "Commands Outside Sandbox": "沙箱外命令执行",
    "Open System Preferences": "打开系统偏好设置",
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
                if (tag === 'CODE' || tag === 'PRE' || tag === 'TEXTAREA' || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
                    return true;
                }
                if (el.isContentEditable) {
                    return false;
                }
                if (el.classList && (
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
            if (!text || !text.trim()) return text;
            let res = text;
            for (let i = 0; i < PHRASES.length; i++) {
                const [en, zh] = PHRASES[i];
                if (res.includes(en)) {
                    res = res.replaceAll(en, zh);
                }
            }
            const trimmed = res.trim();
            if (EXACT_WORDS[trimmed]) {
                return res.replace(trimmed, EXACT_WORDS[trimmed]);
            }
            if (res.includes("Allow running this command?")) {
                res = res.replaceAll("Allow running this command?", "允许运行此命令吗？");
            }
            if (res.includes("Yes, allow this time")) {
                res = res.replaceAll("Yes, allow this time", "允许，仅本次允许");
            }
            if (res.includes("No (tell the agent what to do instead)")) {
                res = res.replaceAll("No (tell the agent what to do instead)", "拒绝（告诉智能体改做什么）");
            }
            if (res.includes("Yes, and always allow ")) {
                res = res.replace(/Yes,\\s*and\\s*always\\s*allow\\s+([\\s\\S]+?)\\s+in\\s+this\\s+conversation/gi, '允许，并在当前会话中始终允许 $1');
                res = res.replace(/Yes,\\s*and\\s*always\\s*allow\\s+([\\s\\S]+?)\\s+in\\s+this\\s+project/gi, '允许，并在当前项目中始终允许 $1');
                res = res.replace(/Yes,\\s*and\\s*always\\s*allow\\s+([\\s\\S]+)/gi, '允许，并始终允许 $1');
            }
            res = res.replace(/(\\d+)\\s*days?\\s*ago/gi, '$1 天前')
                     .replace(/(\\d+)\\s*hours?\\s*ago/gi, '$1 小时前')
                     .replace(/(\\d+)\\s*minutes?\\s*ago/gi, '$1 分钟前')
                     .replace(/(\\d+)\\s*days?/gi, '$1 天')
                     .replace(/(\\d+)\\s*hours?/gi, '$1 小时')
                     .replace(/(\\d+)\\s*minutes?/gi, '$1 分钟')
                     .replace(/(\\d+)\\s*seconds?/gi, '$1 秒');
            return res;
        }

        function translateNode(node) {
            if (!node) return;
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
                if (isExcluded(node)) return;
                if (node.shadowRoot) {
                    translateNode(node.shadowRoot);
                }
                for (let i = 0; i < node.childNodes.length; i++) {
                    translateNode(node.childNodes[i]);
                }
            }
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

        if (typeof window !== 'undefined') {
            window.addEventListener('load', () => {
                setTimeout(() => {
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
                    setInterval(sweep, 800);
                }, 1000);
            });
        }
    } catch (err) {
        console.error('[Antigravity-ZH] Initialization error:', err);
    }
})();
`;

const finalPreloadContent = baseCode + "\n" + injectedCode;
const targetPreload = "C:\\Users\\Lenovo\\AppData\\Local\\Temp\\agy_212_extract\\dist\\preload.js";
fs.writeFileSync(targetPreload, finalPreloadContent, "utf8");
console.log("FINAL_PRELOAD_V41_WRITTEN_SUCCESSFULLY");
