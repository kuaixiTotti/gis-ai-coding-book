---
id: CH04-001
title: 从零创建可运行的 Leaflet 单文件地图
chapter: 4
task_type: frontend-mapping
difficulty: basic
last_verified: "TODO:作者确认实际验证日期"
verified_models: []  # TODO:作者填写实际验证过的模型
---

## 场景

你要做第一张可运行的网页地图,希望 AI 直接给出一个单文件 HTML(用 CDN 引入
Leaflet,不引入构建工具),打开就能看到指定城市的地图。对应正文 §4 与配套
项目 `code/ch04-leaflet-campus/` 的 step-01。

## Prompt 模板

```
[角色] 你是一个熟悉 Leaflet 的前端工程师。

[任务] 帮我创建一个单文件 HTML,用 Leaflet 显示一张地图,
初始视野在{城市/地点}(经纬度约 {经度}, {纬度}),缩放级别 {缩放}。

[约束]
- Leaflet 通过 CDN 引入,不要 npm
- 底图用 OpenStreetMap
- 页面打开地图要占满整个屏幕
- 代码要有中文注释,适合初学者

[输出]
- 单个 index.html 文件
- 除了 HTML 其他什么都不要生成
```

## 变体

- **换城市**:把 `{城市/地点}` 和经纬度改成你的目标位置即可复用。
- **要离线/内网**:把"通过 CDN 引入"改成"把 Leaflet 的 JS/CSS 也内联进 HTML"。

## 常见问题

- AI 给的代码地图不显示,99% 是 `#map` 容器没设 `height`——检查 `<style>` 里
  有没有 `height: 100%`(或固定像素高度)。
- 不写"代码要有中文注释",默认产出的注释很稀疏,初学者不易读。
- 经纬度顺序易错:Leaflet 的 `setView` 用 `[纬度, 经度]`,与 GeoJSON 的
  `[经度, 纬度]` 相反。

## 示例输出

见配套快照 `code/ch04-leaflet-campus/steps/step-01-init/index.html`。
