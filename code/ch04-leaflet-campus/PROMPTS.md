# ch04-leaflet-campus · 关键 Prompt 记录

> 这个项目从零搭建时,我用的关键 Prompt 按时间顺序整理在这里。
> 复制即可在你自己的对话里复现整个项目的搭建过程。

---

## Prompt 1:第一张地图

**对话目的**:从零创建可运行的 Leaflet 单文件 HTML。

**Prompt**:

```
[角色] 你是一个熟悉 Leaflet 的前端工程师。

[任务] 帮我创建一个单文件 HTML,用 Leaflet 显示一张地图,
初始视野在北京大学(经纬度约 116.308, 39.995),缩放级别 15。

[约束]
- Leaflet 通过 CDN 引入,不要 npm
- 底图用 OpenStreetMap
- 页面打开地图要占满整个屏幕
- 代码要有中文注释,适合初学者

[输出]
- 单个 index.html 文件
- 除了 HTML 其他什么都不要生成
```

**预期产出**:见 `steps/step-01-init/index.html`

**踩坑提示**:如果 AI 给的代码地图不显示,99% 是 `#map` 容器没设置 height。检查 `<style>` 里有没有 `height: 100%`。

---

## Prompt 2:多底图切换

**对话目的**:在第一张地图基础上加底图切换控件。

**Prompt**:

```
给 index.html 加一个底图切换控件,提供以下底图:

1. OpenStreetMap(默认)
2. 高德地图(URL 模板:
   https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}
   subdomains 为 ['1','2','3','4'])
3. 高德卫星图(URL 模板:
   https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z})
4. Carto 深色风格(URL:
   https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png)

切换控件放在地图右上角。
```

**预期产出**:见 `steps/step-02-basemap/index.html`

**注意事项**:切换到高德底图时,北大位置可能往西南偏移几百米,这是 WGS84 与 GCJ-02 坐标系差异导致,本章不处理。

---

## Prompt 3:加载 GeoJSON 数据

**对话目的**:从外部 GeoJSON 文件加载校园 POI,以圆点标记。

**Prompt**:

```
在 index.html 里加载 data/campus.geojson,
把每个点绘制为标记。
点击标记时,弹出一个 popup,
显示点的 name、category 和 desc。
```

**预期产出**:见 `steps/step-03-geojson/`(同时含 `data/campus.geojson`)

**踩坑提示**:用 `file://` 协议直接打开 HTML 时,fetch 会被 CORS 拦截。请用本地服务器(`python -m http.server`)。

---

## Prompt 4:分类着色

**对话目的**:把通用蓝色图钉换成按 category 字段着色的圆点。

**Prompt**:

```
把所有标记改成圆点。按 category 字段不同颜色:
- 景观 = #2ecc71(绿色)
- 建筑 = #3498db(蓝色)
- 餐饮 = #e74c3c(红色)

圆点半径 8 像素,白色描边,边宽 2 像素。
```

**预期产出**:见 `steps/step-04-styling/index.html`

---

## Prompt 5:加图例

**对话目的**:在右下角加一个看起来像卡片的图例。

**Prompt**:

```
在地图右下角加一个图例,显示三种类别的颜色。
图例用白色背景、圆角、轻微阴影,看起来像一个卡片。
```

**预期产出**:见 `steps/step-04-styling/index.html`(图例与上一步合并实现)

---

## Prompt 6:鼠标悬停交互

**对话目的**:加上视觉反馈,让用户感觉地图"有反应"。

**Prompt**:

```
当鼠标悬停在某个点上:
1. 点的半径从 8 增大到 12,描边变粗
2. 在点上方显示一个小 tooltip,只显示 name 字段
3. 鼠标移开恢复原状
```

**预期产出**:见 `steps/final/index.html`

---

## Prompt 7(调试场景):静默失败排查

**对话目的**:演示如何用 AI 调试"地图正常但点没出来"的问题。

**前置条件**:故意把 `data/campus.geojson` 写成 `data/campus.json`(漏写 `geo`)。

**Prompt**:

```
打开 index.html 后,底图显示正常,但 GeoJSON 数据加载不上。
Console 报错:

GET http://localhost:8000/data/campus.json 404 (Not Found)

相关代码:fetch('data/campus.json')

请帮我诊断问题。
```

**AI 应给出**:路径错了,应该是 `.geojson`。

**学习重点**:这次对话演示了"现象 → 打开 DevTools → 看 Console → 贴给 AI → 修复"的标准流程。详见 `DIALOGUE.md` 中的对话 2。

---

## 模板使用说明

如果你想复制这个项目结构创建自己的章节项目:

1. 把 `Prompt 1` 里的"北京大学"和经纬度改成你的目标位置
2. 按顺序执行 Prompt 2 到 Prompt 6
3. 每完成一个 Prompt 都做一次 `git commit`,留下分阶段快照
4. Prompt 7 的"故意制造错误"是教学用的,实战中不需要主动制造,但**遇到类似问题时按这个流程排查**

整个项目预计 45 分钟–1 小时完成。

---

## 我的 Prompt 优化反思

回顾本项目时发现的几点改进空间:

- **Prompt 1 中"代码要有中文注释"**这一条非常值得加,默认 AI 给的代码注释稀疏
- **Prompt 2 给完整 URL 模板**比说"用高德地图"有效得多——不留歧义
- **Prompt 3 没说清 properties 字段会不会有空值**,实战中 AI 没处理 null 报了错
- **Prompt 6 没指定 tooltip 显示位置**,默认在点正上方但偶尔会遮挡

下一次做类似项目时,把这些经验写入初始 Prompt。这就是个人 Prompt 库的迭代方式。
