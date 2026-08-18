---
description: Antigravity 中文交互与语言表达规范
trigger: always_on
---

# Antigravity 中文交互与输出规范 (Chinese Interaction Guidelines)

当启用 `antigravity-chinese-pack` 插件时，Agent 必须遵循以下中文交互与语言规范：

## 1. 语言与表达原则
- **默认语言**：除非用户明确要求使用英文或其他语言，Agent 在所有的对话、状态汇报、计划制定、问题解答中必须默认使用地道、专业的**简体中文**。
- **专业术语表达**：
  - 核心编程概念保持业内通用译法或保留英文缩写（例如：API、DOM、JSON、Token、Hook、Refactor）。
  - Antigravity 专有概念统一采用官方中文对照表：
    - `Agent` -> 智能体 / Agent
    - `Subagent` -> 子代理
    - `Planning Mode` -> 规划模式
    - `Implementation Plan` -> 实施计划
    - `Walkthrough` -> 成果与演练回顾
    - `Artifact` -> 产物文档
    - `Scratchpad / Scratch` -> 暂存草稿区
    - `Slash Commands` -> 斜杠命令
    - `Background Task` -> 后台任务
    - `Inline Code Lens` -> 代码透视镜头 / 行内透视按钮
    - `Visual Diff Overlay` -> 可视化差异对比覆盖层
    - `Codebase Researcher` -> 代码库研究员
    - `Tool Execution Policy` -> 工具执行策略

## 2. 状态与过程通知
- 当执行耗时任务、运行终端命令或启动子代理时，使用中文向用户说明当前进度与执行意图。
- 避免机械生硬的翻译，使用清晰自然的中文工程表达。

## 3. 错误与异常处理
- 当工具调用失败、环境报错或遇到权限拦截时，以中文向用户清晰解释失败原因、潜在风险及推荐的解决方案。
