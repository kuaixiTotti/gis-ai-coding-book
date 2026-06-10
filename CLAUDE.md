# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目性质

这是一本面向 GIS 专业学生的教材《GIS × AI 对话式编程》，共 12 章，正在写作中（草稿阶段）。工作重心是**教材正文写作**和**配套代码示例维护**，而非应用开发。

主要工作目录：
- `book/chXX-*/` — 教材正文（Markdown，这是主要写作对象）
- `code/chXX-*/` — 各章配套可运行代码
- `prompts/` — Prompt 模板库（格式见 `prompts/template.md`）

## 章节完成状态

有正文初稿的章节：ch01–ch05。其余章节（ch06–ch12）仅有 README 骨架，待写。

路线图：四个月版（W1 = 2026-06-15，常规章节两周一章，2026-10-09 前完成 12 章初稿）。周历见 `docs/roadmap.md`，逐周交付物与工时见 `docs/sprint-plan.md`，进度打勾在根目录 `TASKS.md`。每章发布前按 TASKS.md 的"单章交付清单"卡关。

## 代码质量命令

```bash
# Python 代码 lint（code/ 和 data/scripts/ 目录）
pip install ruff
ruff check code/ data/scripts/
ruff format code/ data/scripts/

# Markdown lint（全仓库）
npx markdownlint-cli2 "**/*.md"

# 检查链接（需安装 lychee）
lychee --verbose './**/*.md'
```

Python 要求 3.12+，Node.js 要求 20+。

## 配套代码的结构约定

每个 `code/chXX-*/` 目录的固定结构：

```
chXX-项目名/
├── README.md       # 运行说明、学习路径
├── PROMPTS.md      # 本项目使用的关键 Prompt（按时间顺序，含踩坑提示）
├── DIALOGUE.md     # 精选真实 AI 对话记录（不可编造）
├── .env.example    # 环境变量模板
├── data/           # 项目专用数据
└── steps/          # 分阶段代码快照（step-01-init → … → final）
    ├── step-01-*/
    └── final/
```

`steps/` 是核心教学资产——每个子目录都是独立可运行版本，学生可以跳着用。添加新功能时必须在 `steps/` 留快照，而不只是更新 `final/`。

## 教材正文写作规范

完整规范在 `style-guide.md`，关键约束：

**结构**：每章固定结构：学习目标（3–5 条）→ 开场引子 → 主体内容（每节 ≤1500 字）→ 小结 → 延伸阅读 → 习题（2 基础 + 2 进阶 + 1 挑战）。

**文风**：第二人称"你"；每段 ≤5 句；禁用"显然""不难发现""我们将会看到"。

**中英混排**：中文与英文/数字之间加半角空格。专业术语首次出现标注英文原文，如"空间连接（spatial join）"。

**段落标记符号**（一段只用一种）：
- `> 💡` 提示  `> 📌` 重点  `> ⚠️` 警告/踩坑  `> 💬` 旁注

**代码注释**：注释解释"为什么"，不解释"是什么"；变量名用英文，注释用中文。

**AI 对话记录**：所有对话必须真实发生，不可编造。对话中含个人信息或 token 须脱敏。

## Prompt 模板规范

新增 Prompt 必须遵循 `prompts/template.md` 的格式，关键字段：

```yaml
---
id: CHXX-NNN
task_type: frontend-styling / data-cleaning / sql-writing / ...
difficulty: basic / intermediate / advanced
last_verified: YYYY-MM-DD
verified_models: [claude-opus-4.7, gpt-5, ...]
---
```

Prompt 正文引用格式：`CH04-003`（章节+序号）。

## Commit 规范

遵循 Conventional Commits，scope 用章节标识：

```
docs(ch04): 修正 Leaflet 坐标系示例的经纬度顺序
fix(ch05): MapView 样式切换后图层丢失
feat(ch07): 新增 15 分钟城市分析代码示例
chore: 更新 data/sources.yaml 数据集条目
```

## 数据文件

大数据文件不进仓库（`.gitignore` 已排除 `data/*/`，保留 `data/scripts/`、`data/README.md`、`data/sources.yaml`）。新增数据集需在 `data/sources.yaml` 登记，字段：`id`、`name`、`chapter`、`source`、`license`、`format`、`download_script`、`checksum_sha256`。

## 特有约束

- **不用 AI 对话截图代替代码**（截图会过时）
- **不使用有版权争议的数据集**
- **不编造 AI 对话**
- 不在正文中"后续章节会讲"超过 3 次（埋的钩子要尽早回收）
- Prompt 模板里变量用 `{方括号}` 标记
