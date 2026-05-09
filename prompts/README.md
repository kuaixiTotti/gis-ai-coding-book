# Prompt 模板库

本目录汇集本书使用的全部 Prompt 模板,是本书最重要的可复用资产。

## 组织方式

- `by-chapter/` — 按章节组织,方便学生跟读时查阅
- `by-task/` — 按任务类型组织,方便按需检索

同一条 Prompt 可能在两处都出现(软链接或互相引用)。

## 格式

所有 Prompt 遵循 `template.md` 的标准格式。

## 引用

Prompt 用 ID 引用,例如 `CH04-003`。每章正文中引用 Prompt 时必须使用 ID,便于维护。

## 验证

每条 Prompt 必须标注 `last_verified` 与 `verified_models`。过期的 Prompt 会被标记为 deprecated。
