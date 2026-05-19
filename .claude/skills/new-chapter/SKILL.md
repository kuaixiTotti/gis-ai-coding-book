---
name: new-chapter
description: 为《GIS × AI 对话式编程》教材生成新章节骨架。当用户要"开始写第 X 章""新建章节""搭一章的架子""scaffold a chapter"时使用。自动创建 book/、exercises/ 目录并套用 style-guide.md 的章节模板。
---

# 新建章节骨架

为本教材新建一章时,按本流程一次性把目录和模板搭好,避免每章手动复制。

## 第一步:确认章节信息

向用户确认(若用户已给出则跳过):

- **章节号** `XX`(两位数,如 `05`)
- **book slug**:`book/chXX-<slug>/`,kebab-case,见 README 目录,如 `ch05-poi-platform`
- **章节中文标题**:如"前端综合项目:城市 POI 可视化平台"
- **是否同时建配套代码项目**(`code/chXX-<slug>/`)。注意一章可有多个代码项目(如 ch04 有 leaflet-campus 和 mapbox-heatmap),代码 slug 可与 book slug 不同。

## 第二步:创建 book 正文文件

创建 `book/chXX-<slug>/chXX-<slug>.md`,严格套用 `style-guide.md` 第五节的章节结构模板:

```markdown
# 第 X 章 <章节标题>

> **本章学习目标**
> - 目标 1
> - 目标 2
> - 目标 3
>
> **本章预计用时**:X–Y 小时

---

## X.1 开场:<引子小标题>

[用具体场景、问题、对比开场,不要直接讲定义]

---

## X.2 <主体小节标题>

[每节 ≤1500 字,按"动机 → 操作 → 解释 → 反思"展开]

---

## X.N 小结

[做了哪些事、关键认知、下一章预告]

---

## 本章延伸阅读

[分类整理,每条加 1-2 句点评]

---

## 本章习题

**基础**(2 题:概念回顾、基础操作)

**进阶**(2 题:综合应用、轻度改造)

**挑战**(1 题:跨章节、研究生选作)
```

同时更新(或创建)`book/chXX-<slug>/README.md`,填上节安排与学习目标的占位清单。

## 第三步:创建习题目录

创建 `exercises/chXX/README.md`,占位 5 道题(2 基础 + 2 进阶 + 1 挑战)的标题。

## 第四步:创建对话目录

创建 `dialogues/chXX/` 目录(放一个 `.gitkeep`)。正文里的完整对话片段会落到这里,格式见 `format-dialogue` skill。

## 第五步(可选):创建配套代码项目

若用户要建代码项目,创建 `code/chXX-<code-slug>/`,固定结构见根目录 `CLAUDE.md`:

```
chXX-<code-slug>/
├── README.md          # 仿照 code/ch04-leaflet-campus/README.md 的结构
├── PROMPTS.md          # 关键 Prompt 占位
├── DIALOGUE.md         # 精选对话占位
├── .env.example
├── data/.gitkeep
├── src/.gitkeep
├── tests/.gitkeep
├── screenshots/.gitkeep
└── steps/             # 先留空,用 code-snapshot skill 逐步填充
```

## 收尾

- 不要编造学习目标或节标题——拿不准就把占位留成"待补充",让用户填。
- 完成后用一句话汇报建了哪些文件,并提示下一步(列提纲 / 跑通核心示例)。
- 建议提交:`docs(chXX): 新建第 X 章骨架`(Conventional Commits,scope 用章节号)。
