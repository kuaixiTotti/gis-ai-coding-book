# step-02-mapview:地图 + 按类别着色的 POI 点

对应正文 §5.6。在 step-01 基础上新增 `MapView` 组件,把 500 个 POI 用
Mapbox GL 显示到地图上,按类别着不同颜色,点击点有回调。

## 与 step-01 的差异

- 新增依赖 `mapbox-gl`
- 新增 `src/components/MapView.jsx`(地图组件)
- `App.jsx`:不再显示"加载条数",改为渲染全屏地图;点击点把结果存进 `selectedPoi`(本步先打到控制台)
- 新增 `.env.example`(Mapbox token 模板)

## ⚠️ 需要 Mapbox token

从这一步起地图依赖你自己的 Mapbox token,否则地图区域是空白。

1. 到 https://account.mapbox.com/access-tokens/ 拿一个免费 token
2. 复制 `.env.example` 为 `.env.local`,填入 token:
   ```
   VITE_MAPBOX_TOKEN=pk.你的token
   ```
3. `.env.local` 已被 `.gitignore` 忽略,不会进仓库——**不要提交 token**

## 运行

```bash
pnpm install
pnpm dev
```

打开 http://localhost:5173,应看到:

- 北京范围的地图
- 地图上 500 个圆点,按类别着色(餐饮红 / 购物橙 / 教育蓝 / 医疗绿 / 交通紫)
- 鼠标移到点上变手型,点击后 Console 打印"选中 POI: {...}"

## 预期验证点

- 地图正常加载、能看到彩色的点 → Mapbox 集成成功
- 点一个点,Console 有"选中 POI" → 点击回调通了(为 step-04 详情面板铺路)

> 💡 如果地图空白:十有八九是 token 没配或文件名不对(必须是 `.env.local`,
> 改完要重启 `pnpm dev`)。详见正文 §5.14 Q1。

## 下一步

`step-03-sidebar/`:加左侧栏(类别筛选 + 搜索 + POI 列表),并与地图联动。
