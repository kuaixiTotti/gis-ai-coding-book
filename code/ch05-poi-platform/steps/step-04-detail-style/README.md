# step-04-detail-style:详情面板 + 底图切换

对应正文 §5.9。在 step-03 基础上加两样:点击 POI 从右侧浮出详情面板;
右上角切换三种底图风格。

## 与 step-03 的差异

- 新增 `src/components/DetailPanel.jsx`(选中 POI 的详情,右上角 × 关闭)
- 新增 `src/components/MapStyleSwitcher.jsx`(街道 / 浅色 / 深色)
- `App.jsx`:加 `mapStyle` state,接上面板与切换器
- `MapView.jsx`:加 `mapStyle` prop —— `setStyle` 切底图,并把"加 source+layer"
  抽成 `addPoiLayer`,在 `style.load` 后重建图层(否则切完底图点会消失)

## 运行

```bash
cp .env.example .env.local   # 填入你的 Mapbox token
npm install                  # 或 pnpm install
npm run dev                  # 或 pnpm dev
```

## 预期验证点

- 点任一 POI(地图上或列表里)→ 右侧浮出详情面板,显示名称、类别、
  星级、描述、营业时间、坐标;点 × 关闭
- 右上角三个按钮切换底图,**切换后 POI 点不消失**(关键验证点)
- 切到深色底图,选中高亮、筛选仍正常

## 修正正文 §5.9.1 的坐标 bug

正文里 `poi.lon.toFixed(5)` 有坑:POI 从**地图点击**选中时,坐标来自
Mapbox 的 `feature.properties`,可能是字符串,对字符串调 `.toFixed` 会报错
(从侧边栏选中时才是数字)。本步 DetailPanel 统一用 `Number(poi.lon)` 兜底,
两条路径都安全。

## 关于 setStyle 的陷阱(正文 §5.9.2)

`setStyle` 是整样式替换,会清掉所有自定义 source/layer。所以切底图后必须
在 `style.load` 事件里重新 `addPoiLayer`。本步把该逻辑抽成一个函数,初始化、
数据更新、切底图三处复用。

## 下一步

`step-05-heatmap-mobile/`:热力图切换 + 移动端响应式。
