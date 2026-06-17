# ch02-env-check · 环境检查脚本

> 第 2 章配套项目:让 AI 帮你写一个 `check_env.py`,确认 GIS 开发环境是否装好。

## 这个项目是什么

一个纯 Python 脚本(无第三方依赖),检查四类东西:

1. Python 版本是否 ≥ 3.12
2. GIS 常用 Python 包是否装好(geopandas、shapely、folium、matplotlib、jupyter)
3. 命令行工具是否装好(git、node、pnpm)
4. 汇总打印,一眼看出哪项没过

它是本书第一个"让 AI 干活"的练习,对应正文 §2.7。

## 运行方式

**前提**:装好 Python 3.12+。本书推荐用 uv 管理环境(见正文 §2.3)。

```bash
# 用 uv(推荐)
uv run python steps/final/check_env.py

# 或直接用 python
python steps/final/check_env.py
```

包检查项为 ✗ 是正常的——说明那个包还没装,按正文 §2.3 的步骤装上即可。

## 项目结构

```
ch02-env-check/
├── README.md            # 你正在读的文件
├── PROMPTS.md           # 写这个脚本用到的 Prompt
├── DIALOGUE.md          # 精选 AI 对话记录
├── .env.example         # 环境变量示例(本项目用不到,留作模板)
│
└── steps/               # 分阶段代码快照
    ├── step-01-python/      # 阶段 1:只检查 Python 版本(最小骨架)
    ├── step-02-packages/    # 阶段 2:加上 Python 包检查
    └── final/               # 最终版:加上命令行工具检查(与正文一致)
```

每个 `steps/` 子目录都是独立可运行的版本。建议从 step-01 开始读,对比相邻
两步的 diff,看清每一步加了什么。

## 关键 Prompt

见 [`PROMPTS.md`](PROMPTS.md)。

## 真实对话片段

见 [`DIALOGUE.md`](DIALOGUE.md)。

## 相关资源

- 教材正文:[`../../book/ch02-environment/`](../../book/ch02-environment/)
