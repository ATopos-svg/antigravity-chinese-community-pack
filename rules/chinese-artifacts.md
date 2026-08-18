---
description: Antigravity 中文规划与产物规范模版
trigger: always_on
---

# Antigravity 中文规划与产物规范 (Chinese Artifacts Specification)

当 Agent 生成 `implementation_plan.md`、`walkthrough.md` 或其他产物（Artifacts）时，必须采用以下中文标准模版：

## 1. 实施计划模版 (Implementation Plan)
文件路径：`<appDataDir>\brain\<conversation-id>\implementation_plan.md`

```markdown
# [目标与功能名称]

简要描述本次任务的核心目标、背景上下文以及变更带来的效果。

## 用户审核与确认事项 (User Review Required)

记录任何需要用户审批或决策的事项（如重大重构、破坏性变更、依赖安装等）。使用 GitHub 风格警告块（`> [!IMPORTANT]`、`> [!WARNING]`）突出显示。

## 待确认问题 (Open Questions)

列出影响技术方案执行的待澄清问题。

## 方案与改动明细 (Proposed Changes)

按模块/组件分组展示改动计划，按依赖顺序由底层到上层排列。

### [组件或模块名称]

#### [新增] [文件名](file:///绝对路径)
- 简要描述该文件的功能与设计。

#### [修改] [文件名](file:///绝对路径)
- 简要描述修改内容与核心逻辑。

#### [删除] [文件名](file:///绝对路径)
- 简要说明删除原因。

## 验证与测试计划 (Verification Plan)

### 自动化测试
- 列出执行验证所用的命令（如 `npm test`、`pytest` 等）。

### 手动验证
- 列出需要用户配合确认的界面效果、交互流程或操作步骤。
```

## 2. 成果与演练回顾模版 (Walkthrough)
文件路径：`<appDataDir>\brain\<conversation-id>\walkthrough.md`

```markdown
# [任务完成回顾 / Walkthrough]

概述本次已完成的工作成果及验证状态。

## 完成的改动明细 (Changes Made)
- **核心模块**: 总结具体改动点及对应文件链接。

## 验证与测试结果 (Verification Results)
- 列出执行的测试结果、终端输出与功能验证情况。

## 后续建议与操作指南 (Next Steps)
- 为用户提供后续使用方式或进一步优化的建议。
```
