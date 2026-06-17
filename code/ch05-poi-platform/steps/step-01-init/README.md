# step-01-init:项目骨架 + 数据加载

对应正文 §5.3–§5.4。这一步先把现代前端工程的"空壳"立起来,并验证能
加载 500 条 POI 数据——**还没有地图**,地图在 step-02。

这一步能让你确认:Vite + React + Tailwind 三件套配好了、数据 fetch 通了。

## 这一步包含什么

- Vite + React 18 项目骨架
- Tailwind CSS v3 已配好(`tailwind.config.js` + `postcss.config.js` + `index.css` 的三条 `@tailwind`)
- `public/data/beijing-poi.json`:500 条模拟北京 POI(schema 见正文 §5.4.2)
- `src/App.jsx`:加载数据、显示"共加载 500 条 POI 数据"

## 运行

```bash
pnpm install
pnpm dev
```

浏览器打开 http://localhost:5173,应看到:

```
北京 POI 平台
共加载 500 条 POI 数据
```

> 💡 这一步**不需要 Mapbox token**(还没上地图)。从 step-02 起才需要,
> 那时按 `.env.example` 配置 `.env.local`。

## 预期验证点

- 页面显示"共加载 500 条 POI 数据"——数据加载链路通
- 标题是 Tailwind 的样式(粗体、字号变大)——Tailwind 生效

## 下一步

`step-02-mapview/`:加入 MapView 组件,把 500 个点按类别着色显示到地图上。
