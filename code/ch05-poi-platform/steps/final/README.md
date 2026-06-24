# 城市 POI 可视化平台

一个交互式的城市兴趣点(POI)可视化平台,以北京为例展示数百个地点在地图上的
分布,支持按类别筛选、关键字搜索、详情查看、底图切换、热力图分析,并适配移动端。

> 这是《GIS × AI 对话式编程》第 5 章的综合项目成品版。如果你在跟读教材,
> 建议从 `../step-01-init/` 开始逐步搭建;本目录是最终完整版。

## 在线 Demo

> 部署后把链接填在这里,例如:https://your-project.vercel.app

## 技术栈

- **React 18 + Vite** — 现代前端工程脚手架
- **Mapbox GL JS** — 矢量地图渲染与交互
- **Tailwind CSS v3** — 原子化 CSS

## 功能

- 🗺️ 地图展示约 500 个 POI,按类别着色(餐饮 / 购物 / 教育 / 医疗 / 交通)
- 🔍 按关键字搜索店铺名,实时过滤
- ☑️ 按类别筛选,地图与列表联动
- 📍 点击 POI 查看详情(评分、描述、营业时间、坐标)
- 🎯 选中后地图平滑飞入并高亮
- 🌓 三种底图风格切换(街道 / 浅色 / 深色)
- 🔥 散点图 / 热力图两种视图
- 📱 移动端响应式(抽屉侧边栏、底部详情卡片)

## 本地运行

**前提**:Node.js 20+。

```bash
# 1. 安装依赖(用 pnpm 或 npm 均可)
pnpm install        # 或 npm install

# 2. 配置 Mapbox token
cp .env.example .env.local
# 编辑 .env.local,填入你的 token(在 https://account.mapbox.com/access-tokens/ 获取)

# 3. 启动开发服务器
pnpm dev            # 或 npm run dev
```

打开 http://localhost:5173。

> ⚠️ 地图空白多半是 token 未配置:文件名必须是 `.env.local`,变量名必须以
> `VITE_` 开头,改完需重启 dev server。

## 数据说明

`public/data/beijing-poi.json` 是**模拟数据**(500 条,确定性生成,见
`../../scripts/gen_mock_poi.py`)。学习阶段用模拟数据保证稳定;接入真实
OSM Overpass API 是本章的挑战习题。

## 部署到 Vercel

```bash
pnpm build          # 先确认能正常打包
```

1. 把仓库推到 GitHub
2. 在 vercel.com 用 GitHub 登录 → Add New → Project → 选择仓库
3. **在 Environment Variables 里添加 `VITE_MAPBOX_TOKEN`**(否则线上地图空白)
4. Deploy,1–2 分钟后得到公网链接

### Token 安全

Mapbox public token 会出现在前端代码里,这无法避免。防护措施:

1. 在 Mapbox 控制台给 token 设 **URL 限制**(只允许你的域名 + localhost)
2. 监控用量(免费额度每月 5 万次)

## 项目结构

```
src/
├── App.jsx                      # 顶层:全局状态 + 布局
├── main.jsx                     # 入口
├── index.css                    # Tailwind 指令
└── components/
    ├── MapView.jsx              # Mapbox 地图:散点/热力层、高亮、飞入、底图切换
    ├── Sidebar.jsx              # 侧边栏:视图切换 + 类别筛选 + 搜索 + 列表
    ├── DetailPanel.jsx          # POI 详情面板
    └── MapStyleSwitcher.jsx     # 底图切换
```

## 未来可改进

- 接入真实 OSM POI 数据(替换模拟数据)
- POI 列表超 5000 条时用虚拟列表(react-window)
- 用 useReducer / Zustand 重构全局状态
- 大屏看板模式(≥1920px)

## 许可

代码 MIT。本项目为教材配套示例。
