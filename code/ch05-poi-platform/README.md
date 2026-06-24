# ch05-poi-platform · 城市 POI 可视化平台

> 第 5 章配套综合项目:用 React + Vite + Mapbox GL + Tailwind 做一个可展示、
> 可部署的城市 POI 可视化平台。

## 这个项目是什么

一个交互式前端 GIS 应用,以北京为例展示约 500 个 POI:按类别着色、筛选、
搜索、详情面板、选中飞入高亮、底图切换、散点/热力图切换、移动端适配。
是本书从"单文件 HTML"到"组件化工程"的跨越。

## 运行方式

**前提**:Node.js 20+,一个 Mapbox token(免费,见正文 §5.6.2)。

```bash
cd steps/final
cp .env.example .env.local      # 填入你的 Mapbox token
pnpm install                    # 或 npm install
pnpm dev                        # 或 npm run dev
# 打开 http://localhost:5173
```

## 项目结构

```
ch05-poi-platform/
├── README.md            # 你正在读的文件
├── PROMPTS.md           # 本项目用到的关键 Prompt
├── DIALOGUE.md          # 精选 AI 对话记录
├── data/
│   └── beijing-poi.json # 模拟 POI master 数据
├── scripts/
│   └── gen_mock_poi.py  # 确定性生成模拟数据的脚本
└── steps/               # 分阶段代码快照(每个都独立可运行)
    ├── step-01-init/            # 骨架 + 数据加载(无需 token)
    ├── step-02-mapview/         # 地图 + 按类别着色的点
    ├── step-03-sidebar/         # 侧边栏 + 联动 + 选中高亮
    ├── step-04-detail-style/    # 详情面板 + 底图切换
    ├── step-05-heatmap-mobile/  # 热力图 + 移动端响应式
    └── final/                   # 成品版(含完整 README、部署说明)
```

## 学习路径建议

1. **先跑 `steps/final/`**,看到完整效果,建立目标感
2. **回到 `step-01-init`**,从最小骨架开始读
3. **逐步对比** step-01 → 02 → 03 → 04 → 05 → final 的差异,每步对应正文一节
4. **做本章习题**(见 `../../exercises/ch05/`)

> 💡 step-01 无需 Mapbox token;step-02 起需要按各步 README 配置 `.env.local`。

## 数据说明

`data/beijing-poi.json` 是确定性生成的**模拟数据**(500 条),由
`scripts/gen_mock_poi.py` 生成,schema 见正文 §5.4.2。各 step 的
`public/data/` 下各有一份副本,保证独立可运行。

## 关键 Prompt

见 [`PROMPTS.md`](PROMPTS.md)。

## 真实对话片段

见 [`DIALOGUE.md`](DIALOGUE.md)。

## 相关资源

- 教材正文:[`../../book/ch05-poi-platform/`](../../book/ch05-poi-platform/)
- 课后习题:[`../../exercises/ch05/`](../../exercises/ch05/)
