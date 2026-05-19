---
name: new-prompt
description: 向《GIS × AI 对话式编程》的 Prompt 模板库新增一条 Prompt。当用户要"加一个 Prompt""新建 Prompt 模板""把这个 Prompt 收进库里""new prompt"时使用。严格套用 prompts/template.md 格式并分配 CHXX-NNN 编号。
---

# 新增 Prompt 模板

把一条 Prompt 规范地收进 `prompts/` 库。库是本书最重要的可复用资产,格式必须严格。

## 第一步:分配 ID

ID 格式 `CHXX-NNN`(章节号 + 三位序号,如 `CH04-003`)。

确定序号:扫描 `prompts/by-chapter/chXX/` 下已有文件,取该章最大序号 +1。第一条为 `001`。

## 第二步:收集字段

向用户确认 frontmatter 必填字段(`prompts/template.md` 定义):

```yaml
---
id: CHXX-NNN
title: Prompt 的一句话描述
chapter: X
task_type: frontend-styling / data-cleaning / sql-writing / spatial-analysis / api-design / debugging / ...
difficulty: basic / intermediate / advanced
last_verified: YYYY-MM-DD   # 用今天日期,且必须真的验证过
verified_models: [claude-opus-4.7, gpt-5, gemini-2.5-pro]
---
```

> ⚠️ `last_verified` 只能填**确实在该模型上跑通过**的日期。没验证过就不要填模型,或标 deprecated。

## 第三步:写正文

套用 `prompts/template.md` 的固定章节:`## 场景`、`## Prompt 模板`、`## 变体`、`## 常见问题`、`## 示例输出`(可选)。

要点:
- Prompt 模板正文里的变量一律用 `{方括号}` 标记(如 `{城市名}`、`{数据路径}`)
- `## 常见问题` 必须写"这个 Prompt 容易让 AI 犯什么错"——这是库的核心价值
- 不编造示例输出;给示例就给真实跑出来的

## 第四步:落盘

按 `prompts/README.md` 的双重组织方式存放:

- 主文件:`prompts/by-chapter/chXX/CHXX-NNN-<slug>.md`
- 任务索引:在 `prompts/by-task/<task_type>/` 下加一个指向主文件的引用(README 说明可用软链接或互相引用,与该目录现有做法保持一致)

## 收尾

- 提醒用户:正文中引用此 Prompt 必须用 ID(`CH04-003`),不要贴全文。
- 建议提交:`chore(chXX): 新增 Prompt CHXX-NNN`。
