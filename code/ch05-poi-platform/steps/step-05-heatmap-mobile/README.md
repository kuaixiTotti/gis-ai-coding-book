# step-05-heatmap-mobile:热力图切换 + 移动端响应式

对应正文 §5.10–§5.11。在 step-04 基础上加两块:侧边栏里切换"散点图 / 热力图";
整套界面适配手机屏幕。

## 与 step-04 的差异

- `MapView.jsx`:新增热力层 `poi-heat`(与散点同一个 source,筛选一起联动);
  加 `viewMode` prop,用 `setLayoutProperty` 切换散点 / 热力可见性
- `Sidebar.jsx`:加"散点图 / 热力图"切换;移动端变成从左滑入的抽屉
- `DetailPanel.jsx`:桌面端右侧浮出,移动端变成底部上滑卡片(50vh)
- `MapStyleSwitcher.jsx`:桌面端右上角,移动端右下角
- `App.jsx`:加 `viewMode` 与 `sidebarOpen` 状态、汉堡按钮、遮罩

## 运行

```bash
cp .env.example .env.local   # 填入你的 Mapbox token
npm install                  # 或 pnpm install
npm run dev                  # 或 pnpm dev
```

## 预期验证点

**热力图**
- 侧边栏点"热力图" → 散点消失、显示热力分布;点"散点图"切回
- 热力图下取消某类别 → 热力跟着变(同一 source 联动)

**移动端**(DevTools 切手机模拟,或真机访问)
- 窄屏:侧边栏默认隐藏,左上角汉堡按钮打开抽屉,点遮罩或 ✕ 关闭
- 详情面板从底部上滑(不是右侧)
- 底图切换在右下角
- 宽屏:恢复桌面布局(固定左栏 + 右侧面板 + 右上切换)

## 下一步

`final/`:打磨 + 完整 README + 部署说明(对应正文 §5.12–§5.13)。
