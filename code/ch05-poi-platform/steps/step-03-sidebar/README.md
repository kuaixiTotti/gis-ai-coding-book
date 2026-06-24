# step-03-sidebar:侧边栏 + 地图联动 + 选中高亮

对应正文 §5.7–§5.8。在 step-02 基础上加左侧栏(类别筛选、搜索、POI 列表),
筛选/搜索实时联动地图,点击列表项或地图点时该 POI 飞入并高亮。

## 与 step-02 的差异

- 新增 `src/components/Sidebar.jsx`(类别复选框 + 搜索框 + 可滚动列表)
- `App.jsx`:加 `activeCategories`(Set)、`searchText` 两个 state,派生出
  `filteredPois`,把侧边栏和地图接起来
- `MapView.jsx`:新增 `selectedPoi` prop —— 选中时 `flyTo` 飞过去,并用
  `setPaintProperty` 把该点半径变 12、描边金色

## 运行

```bash
cp .env.example .env.local   # 填入你的 Mapbox token
npm install                  # 或 pnpm install
npm run dev                  # 或 pnpm dev
```

## 预期验证点

- 左侧 320px 侧边栏:5 个类别复选框、搜索框、POI 列表
- 取消勾选某类别 → 地图和列表同时少掉那类点
- 搜索框输入文字 → 列表和地图实时过滤
- 点列表项 → 地图飞过去,该点变大、描边变金色,列表项高亮蓝底
- 点地图上的点 → 同样高亮、列表里对应项高亮

## 关于"筛选联动"的说明(对应正文 §5.8.1 修订)

App 把 `filteredPois` 同时传给侧边栏和地图,二者读同一份派生数据,所以
筛选天然联动,**不存在"地图不更新"的问题**。500 个点用这种"重传整份数据"
的方式足够快;数据量到几万级时,才需要改用 Mapbox 的 `filter` 表达式在
图层级过滤(见正文讨论)。

## 关于选中高亮的实现(对应正文 §5.8.2 修订)

paint 表达式在 `addLayer` 之后不会随 React 状态自动更新。所以高亮不是在
建图层时写死,而是在 `selectedPoi` 变化的 useEffect 里用 `setPaintProperty`
重新下发 `case` 表达式——这是能稳定生效的做法。

## 下一步

`step-04-detail-style/`:详情面板(点击后浮出)+ 底图切换。
