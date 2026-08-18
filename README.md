# Antigravity 社区中文辅助包 (antigravity-chinese-community-pack)

> **Unofficial community Chinese skills, rules, and terminology reference for Antigravity.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform Compatibility](https://img.shields.io/badge/Platform-Antigravity%202.0-orange.svg)](https://antigravity.google)

> ⚠️ **免责声明 (Disclaimer)**
>
> 1. 本项目为**非官方社区开源项目**，与 Google、Antigravity、VS Code 及其关联方不存在任何隶属、授权、赞助或背书关系。
> 2. “Antigravity”商标与名称仅用于客观说明本辅助包所面向的兼容软件环境，不代表任何官方身份。
> 3. 本项目内容完全基于公开文档与实际版本测试维护，软件功能与指令可能随版本更新而变动。

---

## 📖 项目简介

本项目旨在为中文开发者提供更友好、流畅的智能体协作开发体验。本项目**通过宿主可识别的技能（Skill）与规则（Rule）文件组织内容**，并**按公开文档和实际版本测试维护**，不触碰任何宿主程序的底层二进制实现。

---

## 🌟 核心功能 (3 项明确能力)

1. **💬 中文交流与产物规范 (`rules/`)**
   - 引导智能体在任务规划、思路拆解、代码审查与执行汇报中默认使用专业地道的简体中文。
   - 提供标准化的中文实施计划模版 (`chinese-artifacts.md`) 与演练回顾模版。

2. **📚 中文功能参考知识库 (`skills/`)**
   - 内置 `antigravity-zh-guide` 技能包，基于实际测试环境整理了常用的界面布局、斜杠命令（如 `/goal`, `/grill-me`, `/schedule`）与快捷键参考（包含适用版本与验证记录说明）。

3. **📖 社区中英文术语对照字典 (`ui-localization/translations.json`)**
   - 维护一份规范的中英对照术语表（如 `Planning Mode` $\rightarrow$ `规划模式`，`Subagent` $\rightarrow$ `子代理`），供开发者阅读文档或编写提示词时参考。
   - *注：本字典仅作为静态对照参考，不宣称也不包含任何强制修改宿主界面的脚本。*

---

## 🛡️ 隐私与安全 (Privacy & Safety)

- **零数据收集**：本项目不收集、不记录、不上传任何用户代码、对话数据或个人信息。
- **无网络请求**：不包含任何外部网络请求、遥测探针、后台上报或凭据读取逻辑。
- **不修改二进制文件**：本项目完全采用静态 Markdown 规则与 Skill 配置，**绝不会修改** Antigravity、VS Code 或操作系统的任何二进制文件或内部核心代码。

---

## 📁 目录结构

```text
antigravity-chinese-community-pack/
├── plugin.json                     # 插件元数据清单
├── rules/                          # 中文化行为与产物规则
│   ├── chinese-interaction.md      # 中文交流与术语规范
│   └── chinese-artifacts.md        # 中文实施计划与回顾模版
├── skills/                         # 中文技能与功能指南
│   └── antigravity-zh-guide/
│       └── SKILL.md                # 中文功能参考说明 (Skill 定义)
├── ui-localization/
│   └── translations.json           # 社区中英术语对照表 (静态参考)
├── LICENSE                         # MIT 开源许可证
└── README.md                       # 项目说明文档
```

---

## 🚀 安装与验证指引

### 1. 安装 Skill 与 Rules（推荐作为全局扩展）

将本项目的 `antigravity-zh-guide` 放置于全局自定义目录：

- **Windows**:
  - **Skill 路径**: `C:\Users\<用户名>\.gemini\skills\antigravity-zh-guide`
  - **或作为 Plugin 整体放入**: `C:\Users\<用户名>\.gemini\plugins\antigravity-chinese-community-pack`
- **macOS / Linux**:
  - **Skill 路径**: `~/.gemini/skills/antigravity-zh-guide`
  - **Plugin 路径**: `~/.gemini/plugins/antigravity-chinese-community-pack`

#### 验证 Skill 是否生效：
重新打开 Antigravity，点击左侧导航栏的 **`自定义扩展 / Skills & Customizations`**，在列表中如果看到 **`antigravity-zh-guide`**，即表示安装成功！

---

### 2. 在指定项目工作区启用（局部项目生效）

在您当前项目的根目录下创建 `.agents/plugins/` 目录并将本文件夹放入：

```bash
mkdir -p .agents/plugins
cp -r /path/to/antigravity-chinese-community-pack .agents/plugins/antigravity-chinese-community-pack
```

---

### 3. 基础界面语言设置（官方原生方式）

本辅助包**不提供**对宿主程序 UI 界面的二进制修改或脚本注入。如需汉化基础编辑器界面，请使用宿主自带的原生语言切换功能：

1. 在 Antigravity IDE 中按下快捷键 `Ctrl + Shift + P`（macOS 为 `Cmd + Shift + P`）；
2. 输入并选择 `Configure Display Language`；
3. 选择 `zh-cn`（简体中文），按提示重启即可完成基础界面汉化。

---

## 🤝 社区贡献

欢迎提交 Issue 和 Pull Request，共同完善中文术语对照表与使用指南！

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 许可协议开源。
