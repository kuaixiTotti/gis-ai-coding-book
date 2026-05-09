# 第 4 章 前端地图开发:Leaflet 与 Mapbox

> **本章学习目标**
> - 理解 Leaflet 与 Mapbox GL 的本质差异,并会做基础选型
> - 能通过 AI 对话,从零搭建一个 Leaflet 单页地图
> - 掌握底图切换、GeoJSON 渲染、标记与弹窗、交互事件四项核心能力
> - 理解 Mapbox 的数据驱动样式(data-driven styling),会做热力图与 3D 建筑
> - 掌握"地图不显示"这类高频问题的 AI 辅助调试流程
> - **完成一个迷你项目:交互式校园地图**
>
> **本章预计用时**:完整跟完一遍 4–6 小时。建议分两天做,一天 Leaflet,一天 Mapbox。

---

## 4.1 开场:前端地图是 GIS 开发的"门面"

前三章我们讲了"为什么"、"怎么开始"、"怎么做好"。从这一章开始,我们正式进入技术栈。

为什么第一站是前端地图?

因为**前端地图是 GIS 开发里成就感最快、可展示性最强的环节**。你花一下午,就能做出一个能在浏览器里打开、能让别人眼前一亮的作品。对于学习动力的建立,这比先啃一个月数据库要有效得多。

也因为**前端地图是 AI 辅助开发最顺滑的场景之一**。前端代码结构清晰、库文档齐全、错误反馈即时(浏览器里立刻就能看到)——这三个条件,让 AI 对话式编程在这里的表现接近"理想状态"。

所以这一章的目标不只是"学会 Leaflet 和 Mapbox",更是**让你真切体验一次"和 AI 一起做出一个东西"的完整流程**。这个体验会决定你对本书剩余章节的期待。

---

## 4.2 Leaflet vs Mapbox:做选择前你要知道的

第一次接触前端地图库的人,经常被五六个选项搞晕:Leaflet、Mapbox GL、OpenLayers、MapLibre、Cesium、Deck.gl、高德、百度……

本书的策略是:**精通两个,知道其他**。

Leaflet 和 Mapbox GL 是两个最主流、也最互补的库。掌握这两个,90% 的前端 GIS 需求都能做。其他库留到附录 F(三维)或学有余力时再看。

### 它们的本质差异

**Leaflet 基于 DOM/SVG/Canvas**,本质上是用网页原生的方式画图层。每一个标记点、每一条线,在 HTML 结构里都是真实存在的元素(或 Canvas 上的像素)。

**Mapbox GL 基于 WebGL**,本质上是用显卡画地图。整张地图是一块矢量瓦片 + 样式表实时合成的"画布",没有真实的 DOM 元素。

这个底层差异导致了一系列上层差异:

| 维度 | Leaflet | Mapbox GL |
|---|---|---|
| **学习曲线** | 平缓,30 分钟入门 | 较陡,概念多一些 |
| **性能** | 几千要素尚可,上万卡顿 | 几十万要素仍流畅 |
| **视觉表现** | 朴素 / 复古 | 现代 / 可倾斜 3D |
| **矢量瓦片** | 需插件支持 | 原生支持 |
| **依赖** | 仅 leaflet.js(40KB) | 需 Mapbox 账号 + token |
| **免费额度** | 完全免费 | 每月 5 万次加载免费 |
| **离线部署** | 容易 | 需自建瓦片服务 |
| **中文资料** | 多且旧 | 少但较新 |

### 本书的策略

**第 4.3 - 4.6 节用 Leaflet 打基础**。这部分你会做出第一个可运行的地图,学习地图组件的通用概念(图层、标记、事件)。这些概念换到任何其他地图库都通用。

**第 4.7 - 4.8 节升级到 Mapbox**。当你已经对"地图库能做什么"有直觉后,Mapbox 的进阶能力(数据驱动样式、3D)才学得踏实。

### 选型建议(不是绝对的)

- **论文插图、原型展示、课程作业** → Leaflet
- **数据量大(万级以上)** → Mapbox GL 或 MapLibre GL(后者是 Mapbox 的开源分叉)
- **要做 3D 建筑、倾斜视角** → Mapbox GL
- **离线部署 / 公司内网** → Leaflet 或 MapLibre(Mapbox 需付费离线授权)
- **纯国内数据,需要中文底图** → Leaflet + 天地图/高德瓦片

实际项目中,**Leaflet 能做就用 Leaflet**——它更简单、更轻、出问题更好修。遇到它做不动的再换 Mapbox。

---

## 4.3 第一张 Leaflet 地图:从零到可运行

### 4.3.1 先想清楚目标

打开 Cursor,我们从零开始。

在之前建好的 `gis-ai-learning` 项目里,新建一个章节目录:

```bash
mkdir -p code/ch04-leaflet-campus
cd code/ch04-leaflet-campus
```

本节的目标:**做一个单文件 HTML,在浏览器里打开就能看到一张地图,初始视野在你的学校**。

就这么简单。不用着急加标记、加数据,先让地图**能亮起来**。

### 4.3.2 第一次结构化 Prompt

按第 3 章的五要素,写一个 Prompt。打开 Cursor 对话框:

> 👤 **[角色]** 你是一个熟悉 Leaflet 的前端工程师。
>
> **[任务]** 帮我创建一个单文件 HTML,用 Leaflet 显示一张地图,初始视野在北京大学(经纬度约 116.308, 39.995),缩放级别 15。
>
> **[约束]**
> - Leaflet 通过 CDN 引入,不要 npm
> - 底图用 OpenStreetMap
> - 页面打开地图要占满整个屏幕
> - 代码要有中文注释,适合初学者
>
> **[输出]**
> - 单个 `index.html` 文件,保存在当前目录
> - 除了 HTML 其他什么都不要生成

AI 会生成类似下面的代码。

### 4.3.3 AI 生成的代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的第一张 Leaflet 地图</title>

  <!-- Leaflet 的 CSS(必须在 JS 之前加载)-->
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />

  <!-- 让地图容器占满整个视口 -->
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    #map {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>

  <!-- 地图容器,必须要有明确的高度 -->
  <div id="map"></div>

  <!-- Leaflet 的 JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <script>
    // ─── 1. 创建地图实例 ───────────────────────────
    // setView([纬度, 经度], 缩放级别)
    const map = L.map('map').setView([39.995, 116.308], 15);

    // ─── 2. 添加 OpenStreetMap 底图 ────────────────
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
  </script>
</body>
</html>
```

### 4.3.4 跑起来

双击 `index.html`,或在 Cursor 里点右上角的"在浏览器中打开"。

你应该看到一张地图,中心是北大校园,周边建筑、道路清晰可见。

> 💡 **第一次成功的意义**:你可能觉得"这不就是复制粘贴了一段代码吗,有啥大不了"。但这是本书到目前为止,**第一个"可见的、交互的、别人能打开"的作品**。保留这个文件,你会在后续章节里一次次扩展它。

### 4.3.5 解剖这段代码

HTML 结构只有**三件事**:

1. **引入 Leaflet 的 CSS 和 JS**(通过 CDN)
2. **一个 id 为 `map` 的 div,并通过 CSS 给它明确的高度**
3. **几行 JS 初始化地图、加底图**

第 2 点是**最常见的坑**:如果你的 `#map` 高度是 0,地图会显示为空白而不报错。本书后面会反复见到这个现象。

### 4.3.6 任务:把视野换成你自己的学校

**这是本章第一个动手练习**。

请你:
1. 在地图上找到你学校的大致中心点(可以用 maps.google.com 或 amap.com 右键查坐标)
2. 修改 `setView` 里的经纬度和缩放级别
3. 再次打开 `index.html`,确认视野是你的学校

如果你学校在中国境内,**你很可能会发现地图数据非常稀疏**——OpenStreetMap 在中国境内覆盖度不高。这不是 bug,是数据本身。下一节我们换底图解决。

---

## 4.4 底图切换:OpenStreetMap、高德、天地图

### 4.4.1 为什么要换底图

底图是整张地图的"背景画布"。不同底图对应不同的视觉风格、数据源、覆盖范围、使用条款。

对中国的读者,常见选择:

| 底图 | 特点 | 适用场景 |
|---|---|---|
| **OpenStreetMap** | 全球开源,国内稀疏 | 海外、学习 |
| **高德地图瓦片** | 国内详细,GCJ-02 坐标 | 商业项目、本地可视化 |
| **天地图** | 国家测绘局出品,CGCS2000 | 政府项目、官方展示 |
| **Carto 系列** | 极简、深色、学术风 | 数据叠加、论文插图 |
| **Esri Satellite** | 全球卫星影像 | 影像底图 |

### 4.4.2 加一个图层切换控件

我们不是简单地换一个底图,而是**加一个右上角的切换按钮**,让用户自己选。

继续对话:

> 👤 给 `index.html` 加一个底图切换控件,提供以下底图:
>
> 1. OpenStreetMap(默认)
> 2. 高德地图(URL 模板:`https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`,subdomains 为 `['1','2','3','4']`)
> 3. 高德卫星图(URL 模板:`https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`)
> 4. Carto 深色风格(URL:`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`)
>
> 切换控件放在地图右上角。

AI 会修改 `<script>` 部分,变成:

```javascript
// ─── 1. 定义各个底图图层 ──────────────────────────
const osm = L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: '© OpenStreetMap', maxZoom: 19 }
);

const amapRoad = L.tileLayer(
  'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  { subdomains: ['1', '2', '3', '4'], attribution: '© 高德地图', maxZoom: 18 }
);

const amapSatellite = L.tileLayer(
  'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  { subdomains: ['1', '2', '3', '4'], attribution: '© 高德地图', maxZoom: 18 }
);

const cartoDark = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  { attribution: '© CARTO', maxZoom: 19 }
);

// ─── 2. 创建地图,默认加载 OSM ───────────────────
const map = L.map('map', {
  center: [39.995, 116.308],
  zoom: 15,
  layers: [osm]   // 默认图层
});

// ─── 3. 图层控件 ──────────────────────────────────
const baseMaps = {
  "OpenStreetMap": osm,
  "高德道路图": amapRoad,
  "高德卫星图": amapSatellite,
  "Carto 深色": cartoDark
};

L.control.layers(baseMaps).addTo(map);
```

刷新页面,右上角出现一个图层按钮,鼠标悬停展开,可以切换。

### 4.4.3 踩一次真实的坑:坐标系不一致

这时候有个**必须讨论的问题**。

我们在 `setView` 里写的是 `[39.995, 116.308]`,这是**北大校门的 WGS84 坐标**(可以在 OSM 上查到)。当底图是 OSM 时,地图居中显示北大,完全正确。

**但当你切换到高德道路图时,会发现中心位置往北大的西南方向偏移了几百米**。

这就是第 3 章反复强调的**坐标系不一致**问题。

- OSM 用 WGS84
- 高德地图用 GCJ-02(国家规定的加密坐标)
- 两者在中国境内差距最多可达数百米

**如何处理这个问题?有三种方案**:

1. **底图和点位用同一坐标系**。如果你的数据是 WGS84,就用 OSM 或 Carto。如果你的数据是 GCJ-02(从高德 API 拿的),就用高德底图。
2. **做坐标系转换**。用现成的转换函数把 WGS84 转成 GCJ-02 再用。网上有开源的 `gcoord` 库。
3. **忽略**。如果你在做小范围演示、对精度要求不严格(比如课堂 demo),几百米的偏移在视觉上可能不那么明显,可以先不处理。

本书的做法:**第 4 章学习阶段用 OSM,不引入坐标系问题。第 8 章讲数据库时我们会系统处理坐标转换**。

> 📌 **但现在就记住一句话**:在 Leaflet 里看到点位"飘"到街对面或附近区域,第一件事是检查**底图坐标系和数据坐标系是否一致**。

---

## 4.5 加载 GeoJSON:让地图开始"有内容"

底图只是背景,地图的价值来自**叠加在上面的数据**。

本节我们加载一份真实的 GeoJSON,让地图"活起来"。

### 4.5.1 准备数据

在 `code/ch04-leaflet-campus/` 目录下新建 `data/campus.geojson`,内容如下(可以让 AI 根据你学校的位置生成,也可以直接用下面这份北大示例):

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "未名湖",
        "category": "景观",
        "desc": "北大地标,冬日湖面结冰可滑冰"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.3101, 39.9985]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "博雅塔",
        "category": "景观",
        "desc": "未名湖南岸,与湖并称'一塔湖图'"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.3117, 39.9987]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "图书馆",
        "category": "建筑",
        "desc": "全国高校最大的图书馆之一"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.3118, 39.9969]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "百周年纪念讲堂",
        "category": "建筑",
        "desc": "北大文艺演出主要场馆"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.3130, 39.9940]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "北大食堂(学一)",
        "category": "餐饮",
        "desc": "学生食堂,性价比高"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.3088, 39.9945]
      }
    }
  ]
}
```

**观察这份数据的结构**:

- 最外层是 `FeatureCollection`(要素集合)
- 里面是 `features` 数组
- 每个 feature 有 `geometry`(几何)和 `properties`(属性)
- 坐标格式是 `[经度, 纬度]`,**经度在前!**——这是 GeoJSON 的官方规范,但和中文习惯相反,容易搞反

### 4.5.2 加载它

继续对话:

> 👤 在 `index.html` 里加载 `data/campus.geojson`,把每个点绘制为标记。点击标记时,弹出一个 popup,显示点的 name、category 和 desc。

AI 会加这段代码(注意用 fetch):

```javascript
// ─── 加载 GeoJSON 并渲染 ──────────────────────────
fetch('data/campus.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      // 每个要素被添加到地图时的回调
      onEachFeature: (feature, layer) => {
        const { name, category, desc } = feature.properties;
        // 绑定弹窗
        layer.bindPopup(`
          <h3>${name}</h3>
          <p><strong>类别:</strong> ${category}</p>
          <p>${desc}</p>
        `);
      }
    }).addTo(map);
  })
  .catch(err => {
    console.error('加载数据失败:', err);
  });
```

刷新页面,你会看到 5 个标记点,点击弹出信息。

### 4.5.3 第一次"地图不显示"的调试

好,这里我要让你**故意制造一个错误**,学习调试流程。

**修改 HTML**,把 `data/campus.geojson` 改成 `data/campus.json`(少写了个 geo),保存,刷新页面。

**现象**:底图正常显示,但 5 个标记点都没有了。页面看起来什么都没报错。

这是前端地图开发最典型的"静默失败"。现在我们按第 2 章学过的流程排查:

**第一步:打开 Console**(F12)。

你会看到一条红色错误:

```
GET http://localhost/data/campus.json 404 (Not Found)
```

**第二步:把这条错误连同相关代码贴给 AI**:

> 👤 打开 index.html 后,底图显示正常,但 GeoJSON 数据加载不上。Console 报错:
> ```
> GET http://localhost/data/campus.json 404 (Not Found)
> ```
> 相关代码:`fetch('data/campus.json')`
>
> 请帮我诊断。

AI 立刻就能发现是路径拼写错误。改回 `campus.geojson`,刷新,标记点恢复。

**第三步:把这次经历记下来**。

看起来只是个笔误,但这次演示的是**本书反复强调的流程**:现象 → 打开 DevTools → 看 Console → 贴给 AI → 修复。这个流程在你写前端地图的几百个小时里,会用到无数次。

---

## 4.6 样式、交互、高级特性

### 4.6.1 按分类着色

我们希望"景观"、"建筑"、"餐饮"三类点用不同颜色区分。

Leaflet 默认标记是一个蓝色图钉图片。要改颜色,有两种方式:用 `circleMarker`(圆点)、或用自定义图标。我们选简单的 `circleMarker`:

> 👤 把所有标记改成圆点。按 category 字段不同颜色:景观=#2ecc71(绿色)、建筑=#3498db(蓝色)、餐饮=#e74c3c(红色)。圆点半径 8 像素。

AI 会重写 `onEachFeature` 前后的部分,关键改动是用 `pointToLayer`:

```javascript
// 按类别分配颜色
const categoryColors = {
  '景观': '#2ecc71',
  '建筑': '#3498db',
  '餐饮': '#e74c3c'
};

L.geoJSON(data, {
  // 每个点如何创建图层(关键!这里决定点的样式)
  pointToLayer: (feature, latlng) => {
    const color = categoryColors[feature.properties.category] || '#95a5a6';
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: color,
      color: '#fff',      // 白色描边
      weight: 2,
      fillOpacity: 0.9
    });
  },
  // 每个点的交互逻辑
  onEachFeature: (feature, layer) => {
    const { name, category, desc } = feature.properties;
    layer.bindPopup(`<h3>${name}</h3><p>${desc}</p>`);
  }
}).addTo(map);
```

刷新,三类点被三种颜色区分开。

### 4.6.2 加一个图例

用户看到三种颜色,得知道哪个颜色是什么意思。我们加一个自定义图例:

> 👤 在地图右下角加一个图例,显示三种类别的颜色。图例用白色背景、圆角、轻微阴影,看起来像一个卡片。

AI 会添加一个 Leaflet 的自定义控件:

```javascript
// ─── 自定义图例 ───────────────────────────────────
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = `
    <h4 style="margin:0 0 8px;">类别</h4>
    <div><span style="background:#2ecc71"></span>景观</div>
    <div><span style="background:#3498db"></span>建筑</div>
    <div><span style="background:#e74c3c"></span>餐饮</div>
  `;
  return div;
};

legend.addTo(map);
```

还要加相应的 CSS(AI 会自动建议放到 `<style>` 里):

```css
.info.legend {
  background: white;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 13px;
}
.info.legend div {
  display: flex;
  align-items: center;
  margin: 4px 0;
}
.info.legend span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
```

刷新,右下角出现一个小卡片样式的图例。**到这里,这张地图已经有了"作品"的样子**。

### 4.6.3 鼠标悬停高亮

继续加点交互感。鼠标移到点上,点变大、显示名称;移开后恢复:

> 👤 当鼠标悬停在某个点上:
> 1. 点的半径从 8 增大到 12,描边变粗
> 2. 在点上方显示一个小 tooltip,只显示 name 字段
> 3. 鼠标移开恢复原状

AI 会在 `onEachFeature` 里加上事件绑定:

```javascript
onEachFeature: (feature, layer) => {
  const { name, category, desc } = feature.properties;

  layer.bindPopup(`<h3>${name}</h3><p>${desc}</p>`);

  // 显示 name 作为 tooltip
  layer.bindTooltip(name, { direction: 'top', offset: [0, -10] });

  // 鼠标悬停事件
  layer.on('mouseover', (e) => {
    e.target.setStyle({ radius: 12, weight: 3 });
  });
  layer.on('mouseout', (e) => {
    e.target.setStyle({ radius: 8, weight: 2 });
  });
}
```

### 4.6.4 小项目完成:校园地图 v1

到这里,你的 `index.html` 已经是一个**完整的交互式校园地图**:

- 四种底图可切换
- 5 个校园地标,按类别着色
- 悬停有 tooltip,点击有 popup
- 右下角有图例

把它提交到 Git:

```bash
cd /path/to/gis-ai-learning
git add code/ch04-leaflet-campus/
git commit -m "feat(ch04): 完成校园地图 v1 版本"
git push
```

### 4.6.5 一段真实对话复盘

回头看我们这一节和 AI 的对话,大约经历了这些轮次:

1. 底图切换(加 4 个底图)
2. 加载 GeoJSON
3. 触发一次"静默失败"并调试
4. 按分类着色
5. 加图例
6. 加悬停交互

**整个过程约 45 分钟**,产出了一个能演示的作品。如果让你不用 AI 从零学 Leaflet 做到这个水平,**大概率需要 1–2 天**——要查文档、踩坑、调样式。

这就是第 1 章说过的"认知负担差异"。AI 做完了大量"工具翻译"工作,你的注意力始终在**你要的效果**上。

**但请注意**:你看了 AI 写的每一行代码。如果现在把 AI 拿走,你大概能自己写出类似的东西。**"看着 AI 写"本身就是一种高效学习**。

---

## 4.7 升级到 Mapbox GL:为什么值得学

到目前为止,Leaflet 能做的事情已经不少。但当数据量增大、视觉要求提高、需要 3D 效果时,你会撞上 Leaflet 的天花板。

Mapbox GL 是目前业界主流的**下一代** Web 地图引擎。它的几个独特能力,Leaflet 要么做不到,要么做起来很笨重:

**一是大数据性能**。矢量瓦片 + WebGL 渲染,几十万要素仍能流畅平移缩放。Leaflet 遇到这个量级会卡死。

**二是数据驱动样式**。同一个图层,不同要素按属性值自动决定颜色、大小、透明度,用一个样式表达式就能搞定。Leaflet 要手写很多逻辑。

**三是倾斜视角与 3D**。pitch(俯仰)和 bearing(方位)控制,3D 建筑拉伸,这些一行代码就能开。

**四是基于样式表的一致外观**。Mapbox 的样式是 JSON,可以像 CSS 一样被复用、被共享、被版本管理。

代价是:需要注册账号、用 token、学一套稍陡的概念(source / layer / style)。

### 4.7.1 注册 Mapbox 账号

访问 mapbox.com,免费注册。注册后:

1. 进入 Account 页面
2. 找到 Access Tokens 部分
3. 复制 Default public token(`pk.` 开头的字符串)

**免费额度**:每月 5 万次地图加载,对学习和小项目绰绰有余。

如果你不方便注册 Mapbox(比如所在地区有访问问题),可以用 **MapLibre GL**——它是 Mapbox GL 的开源分叉,API 几乎完全一致,不用 token。本书接下来的代码两者都兼容,下文提到 Mapbox 的地方换成 MapLibre 基本都能跑。

### 4.7.2 建一个 Mapbox 最小示例

新建目录:

```bash
mkdir -p code/ch04-mapbox-heatmap
cd code/ch04-mapbox-heatmap
```

> 👤 **[角色]** 你是 Mapbox GL 专家。
>
> **[任务]** 帮我做一个单文件 HTML,用 Mapbox GL 显示一张地图,初始视野在北京,缩放 10。
>
> **[约束]**
> - Mapbox GL 通过 CDN 引入
> - 使用 Mapbox 预设的 `mapbox://styles/mapbox/streets-v12` 样式
> - 我的 token 用占位符 `YOUR_MAPBOX_TOKEN`,我会自己替换
> - 地图占满整个屏幕
>
> **[输出]** 一个 `index.html` 文件

AI 产出:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Mapbox GL 入门</title>
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css" rel="stylesheet">
  <style>
    html, body { margin: 0; padding: 0; height: 100%; }
    #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js"></script>
  <script>
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [116.4074, 39.9042],   // [经度, 纬度]
      zoom: 10
    });
  </script>
</body>
</html>
```

**把 token 替换成你自己的**,双击打开 `index.html`,你会看到一张比 Leaflet 的 OSM 精致得多的地图。

> 💡 **观察差异**:同样是地图,Mapbox 的字体、颜色、层次感明显更现代。这就是"矢量瓦片 + 样式表"的力量——每一个标注都是动态渲染的,不是瓦片图片上"画死"的文字。

### 4.7.3 倾斜与 3D 视角

试试 Leaflet 做不到的事:

> 👤 给地图加上倾斜视角。初始 pitch=60 度,bearing=-17 度。加两个按钮,"平面视角"和"3D 视角",分别切换。

AI 会改 `center` 下面加两个参数 `pitch` 和 `bearing`,并加按钮:

```javascript
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [116.4074, 39.9042],
  zoom: 15,
  pitch: 60,
  bearing: -17
});
```

```html
<div style="position:absolute;top:10px;left:10px;z-index:1;">
  <button onclick="map.easeTo({pitch: 0, bearing: 0})">平面视角</button>
  <button onclick="map.easeTo({pitch: 60, bearing: -17})">3D 视角</button>
</div>
```

点击按钮,地图会流畅地过渡——这种体验在 Leaflet 里基本做不到。

---

## 4.8 Mapbox 的核心概念与热力图实战

### 4.8.1 Source 和 Layer:理解 Mapbox 的核心设计

Mapbox 和 Leaflet 最不一样的一点:**数据(source)和展现(layer)是分离的**。

在 Leaflet 里,你 `L.geoJSON(data, {...样式})` 一步完成,数据和样式混在一起。

在 Mapbox 里:
- 先添加一个 `source`(数据源):"我有一批 POI 数据"
- 再添加一个或多个 `layer`(图层):"用这个 source 的数据,画成圆点 / 热力图 / 3D 柱状体"

这个分离有巨大价值:**同一份数据可以同时被多个图层使用**。比如同一批 POI 数据,你可以画一层热力图表达密度,再画一层圆点表达具体位置,再画一层标签显示名称——三个图层共享一个 source,数据只加载一次。

### 4.8.2 做一张北京 POI 热力图

我们来做一个具体的例子。假设你有 500 个北京 POI 点(随机分布),要画热力图。

先生成模拟数据,让 AI 帮忙:

> 👤 生成 500 个北京市区范围内的随机 POI 点,保存为 `data/beijing-poi.geojson`。每个点的 properties 里有一个 `weight` 字段,值为 1–10 的随机整数。范围大致在经度 116.2–116.6, 纬度 39.8–40.0。

AI 会生成数据文件。然后画热力图:

> 👤 在地图上加载 `data/beijing-poi.geojson`,画成热力图。热力图的权重用 weight 字段。鼠标缩放时热力图点半径平滑变化。

AI 产出:

```javascript
map.on('load', () => {
  // ─── 1. 添加数据源 ──────────────────────────────
  map.addSource('poi', {
    type: 'geojson',
    data: 'data/beijing-poi.geojson'
  });

  // ─── 2. 添加热力图图层 ──────────────────────────
  map.addLayer({
    id: 'poi-heat',
    type: 'heatmap',
    source: 'poi',
    paint: {
      // 权重:按 weight 字段插值
      'heatmap-weight': [
        'interpolate', ['linear'], ['get', 'weight'],
        0, 0,
        10, 1
      ],
      // 强度:按缩放级别插值
      'heatmap-intensity': [
        'interpolate', ['linear'], ['zoom'],
        0, 1,
        15, 3
      ],
      // 颜色:密度 0→1 的色带
      'heatmap-color': [
        'interpolate', ['linear'], ['heatmap-density'],
        0, 'rgba(0,0,255,0)',
        0.2, 'royalblue',
        0.4, 'cyan',
        0.6, 'lime',
        0.8, 'yellow',
        1, 'red'
      ],
      // 半径:按缩放插值
      'heatmap-radius': [
        'interpolate', ['linear'], ['zoom'],
        0, 2,
        15, 30
      ],
      // 透明度:缩放大时隐藏热力图,显示原始点
      'heatmap-opacity': [
        'interpolate', ['linear'], ['zoom'],
        13, 1,
        15, 0
      ]
    }
  });
});
```

刷新页面,你会看到一张标准的彩色热力图。

### 4.8.3 花 5 分钟看懂这段样式表达式

这段代码最"奇怪"的是那些 `['interpolate', ...]` 表达式。这叫 **Mapbox 表达式语言**,是它数据驱动样式的核心。

读法:**`['interpolate', ['linear'], <输入>, <锚点1_输入>, <锚点1_输出>, <锚点2_输入>, <锚点2_输出>, ...]`**。

以 `heatmap-weight` 为例:

```javascript
['interpolate', ['linear'], ['get', 'weight'],
  0, 0,
  10, 1
]
```

含义:读取每个点的 `weight` 字段,weight=0 时权重为 0,weight=10 时权重为 1,中间线性插值。

**掌握 interpolate 表达式,就掌握了 Mapbox 样式的 80%**。其余 20% 是条件判断(`case`、`match`)、数学运算(`+`、`*`)之类,用到时查文档或问 AI 即可。

### 4.8.4 缩放联动:原始点 + 热力图结合

上面代码最后一段 `heatmap-opacity` 的插值很有意思:缩放 13 级时完全显示热力图,15 级时完全消失。因为放大后看单个点比看热力图更有用。

我们再加一个原始点图层,和热力图**反向透明度**:

> 👤 在热力图之上再加一个圆点图层,每个 POI 画一个蓝色小圆点,半径按缩放级别变化:zoom=14 时半径 3,zoom=18 时半径 10。透明度和热力图反向:zoom=13 时完全透明,zoom=15 时完全不透明。

AI 加一个 `circle` 图层:

```javascript
map.addLayer({
  id: 'poi-point',
  type: 'circle',
  source: 'poi',   // 共享同一个数据源
  paint: {
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      14, 3,
      18, 10
    ],
    'circle-color': '#3498db',
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
    'circle-opacity': [
      'interpolate', ['linear'], ['zoom'],
      13, 0,
      15, 1
    ]
  }
});
```

刷新,缩放地图。你会看到缩小时是热力图,放大时自动过渡到散点图,非常流畅。**这种交互,Leaflet 需要写几十行状态管理,Mapbox 两个图层加几个 interpolate 就搞定**。

### 4.8.5 3D 建筑(彩蛋)

再来一个 Mapbox 的"炫技"功能:3D 建筑。

> 👤 在地图上加 3D 建筑图层。用 Mapbox 自带的 composite source 里的 building 数据。建筑按层数(height 字段)拉伸,颜色淡灰色。

AI 会加:

```javascript
map.addLayer({
  id: 'buildings-3d',
  source: 'composite',
  'source-layer': 'building',
  type: 'fill-extrusion',
  minzoom: 14,
  filter: ['==', 'extrude', 'true'],
  paint: {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': ['get', 'height'],
    'fill-extrusion-base': ['get', 'min_height'],
    'fill-extrusion-opacity': 0.7
  }
});
```

放大到城市中心,切换到 3D 视角(用 4.7.3 节的按钮),你会看到真实的建筑被 3D 拉伸出来。

**这一刻请你停下来想想**:从本章开头到现在,你只写了不到 100 行代码,做出了带底图切换、交互标记、热力图、3D 建筑的前端地图作品。如果是传统学习路径,这些能力分别分散在十几篇教程里,你可能要花几周才能走到这里。

---

## 4.9 本章项目小结:校园地图 v2(综合练习)

本章到此为止,你有了两个独立的小项目:

- `code/ch04-leaflet-campus/` — Leaflet 版校园地图
- `code/ch04-mapbox-heatmap/` — Mapbox 版北京 POI 热力图

**本章的综合练习**:把两者的能力结合起来,做一个 **校园地图 v2**。要求:

1. 用 Mapbox GL 作为地图引擎
2. 加载你学校的 POI 数据(至少 20 个点,分 4 个以上类别)
3. 实现分类着色(用 Mapbox 的 `match` 表达式,而不是 Leaflet 的 `pointToLayer`)
4. 鼠标悬停高亮、点击弹窗
5. 加一个类别筛选面板(用按钮或复选框,切换不同类别的显示)
6. 视角可以在平面与 3D 之间切换
7. 支持三种底图样式(streets / satellite / dark)

**不要自己写,让 AI 按五要素 Prompt 一步步帮你做**。每完成一个功能点就 commit 一次。整个任务预计 2–3 小时。

完成后,你会拥有本书第一个**可以给别人看的作品**。把它部署到 GitHub Pages(让 AI 带你做),发给你的朋友或老师看看。反馈会让你对"AI 辅助开发到底能走多远"有更直观的认识。

---

## 4.10 常见问题速查

**Q1:地图是空白的,底图没出来**

按顺序检查:
1. 打开 Console,看有没有红色错误(通常是 token 错、CDN 挂了、URL 错)
2. 打开 Network,看瓦片请求是不是 200(403 是 token 失效,404 是 URL 错,CORS 是跨域问题)
3. 打开 Elements,看 `#map` 的高度是不是 0(这是最常见原因)

**Q2:GeoJSON 加载了但点"飘"到不对的地方**

99% 是坐标系不一致。检查:
- 你的数据是 WGS84 还是 GCJ-02
- 你用的底图是哪个坐标系
- 两者必须一致,否则偏移几百米

**Q3:Mapbox token 提示 401 / 403**

- 检查 token 是否完整复制(中间不能断)
- 检查 token 是否是 public token(`pk.` 开头),不是 secret token(`sk.` 开头)
- 检查 Mapbox 账号的 token 没过期或被禁用

**Q4:Mapbox 提示 "style is not done loading"**

Mapbox 的很多 API 必须在地图"load"事件之后才能调用。把相关代码包进:

```javascript
map.on('load', () => {
  // 在这里调用 addSource / addLayer
});
```

**Q5:GeoJSON 里经纬度写错顺序**

GeoJSON 规范是 **[经度, 纬度]**,和中文习惯"北京纬度 39.9、经度 116.4"相反。很多 AI 生成的代码也可能写反。看到点出现在海里、南极或赤道附近,先检查这个。

**Q6:Leaflet 的标记点击没反应**

通常是 CSS 层级问题——有别的元素盖在地图上。打开 Elements 看一下 `#map` 之上有没有浮层。

**Q7:我想用 MapLibre 代替 Mapbox 但不会改**

把本章的 Mapbox Prompt 直接发给 AI,加一句"请用 MapLibre GL 实现,不要 Mapbox token"。MapLibre 兼容 Mapbox 95% 的 API,差异很小。

---

## 4.11 小结

本章做了这些事:

- 对比了 Leaflet 与 Mapbox GL 的本质差异,给了选型建议
- 从零做出了第一个 Leaflet 校园地图:底图切换、GeoJSON 加载、分类着色、交互、图例
- 踩了一次"坐标系不一致"和一次"静默失败"的坑,演示了 AI 辅助调试流程
- 升级到 Mapbox GL,理解了 source / layer 分离、数据驱动样式、表达式插值
- 做了北京 POI 热力图、3D 建筑、缩放联动等 Mapbox 独门功能

**更重要的是**:你第一次完整经历了"用自然语言和 AI 一起做一个前端作品"的全流程。从零行代码到可展示作品,大约 4–6 小时。这个速度,是传统学习路径下几乎做不到的。

下一章,我们会用整整一章的篇幅做一个**更正式的项目**——城市 POI 可视化平台。那是本书第一个有"工程感"的项目:有目录结构、有组件拆分、有状态管理、要部署上线。如果本章是"会用 Leaflet 和 Mapbox",下一章就是"会用它们搭一个像样的产品"。

**课间小练**:在进入第 5 章之前,把本章综合练习(4.9 节校园地图 v2)认真做完。它是你从本章能带走的最大财富。

---

## 本章延伸阅读

**官方文档(按需查阅)**

- Leaflet 官方文档 (leafletjs.com/reference.html) — API 查询为主,教程部分较简单
- Mapbox GL JS 官方文档 (docs.mapbox.com/mapbox-gl-js) — Examples 页面有大量可直接运行的样例,**强烈建议翻一遍**,每个 example 都是一份好的 Prompt 参考素材
- MapLibre GL 官方文档 (maplibre.org) — Mapbox 的开源替代

**教程与案例**

- 《Leaflet 实战》(有中文版,适合想系统学 Leaflet 的读者)
- Mapbox 官方博客的 Case Studies — 看行业里是怎么用 Mapbox 的,对理解它的能力边界有帮助
- Observable 上 `mbostock` 和 `fil` 的 Mapbox 相关 notebook — d3.js 作者用 Mapbox 的方式,对可视化同行有启发

**样式美学参考**

- Mapbox 官方样式库 (mapbox.com/gallery) — 审美参考
- Stadia Maps (stadiamaps.com) — 一组高质量开源矢量地图样式,免费额度够用
- Carto 的底图样式 (carto.com/basemaps) — 极简风格,适合学术可视化

**对于中文读者**

- 高德 Web 服务 API 文档 — 国内项目基本绕不开
- 天地图开发者文档 — 政府类项目参考
- 各省自然资源局发布的数据(通常有坐标系说明)

> **阅读建议**:官方文档 Examples 页是 Prompt 训练的绝佳素材。随便翻一个 example,把效果描述给 AI,让 AI 写出代码,然后对比与官方代码的差异。这种"反向练习"能快速提升你的 Prompt 能力。

---

## 本章习题

**基础**

1. Leaflet 的 `L.map('map').setView([纬度, 经度], 缩放)` 与 Mapbox 的 `new Map({center: [经度, 纬度], zoom: 缩放})` 在坐标顺序上有差别。请总结一下这两者的差异,并说明 GeoJSON 官方规范规定的坐标顺序是哪种。

2. 本章给出了"地图不显示"的三步排查流程。请用自己的话复述这三步,并为每一步举一个具体的例子。

3. 什么情况下该用 Leaflet、什么情况下该用 Mapbox?给出三个真实场景,并给出你的选型与理由。

**进阶**

4. 本章 4.6 节做了"按类别着色"的 Leaflet 实现。请你用 Mapbox 的 `match` 表达式实现同样的效果。(提示:可以让 AI 帮忙,但请你自己读懂表达式结构)

5. 4.8 节热力图最后做了"缩放时从热力图过渡到散点图"的联动效果。请你理解其中的 `heatmap-opacity` 和 `circle-opacity` 的 interpolate 表达式,用自然语言描述它们在 zoom=13, 14, 15, 16 时分别是什么值。

6. 本章出现过一次"故意制造的静默失败"(把 `.geojson` 改成 `.json`)。请你回顾整个调试过程,把它总结成一份 Markdown 笔记,保存到你自己的 `dialogues/ch04/` 目录。你会发现这个笔记对你将来遇到类似问题很有用。

**挑战**

7. 完成本章 4.9 节的综合练习:校园地图 v2。要求最终 commit 到 GitHub,并生成一个可访问的 GitHub Pages 链接。在 README 里记录:
   - 整个过程你和 AI 对话了多少轮(估算即可)
   - 哪些部分 AI 一次就写对了,哪些改了多轮才收敛
   - 你认为 AI 在这个项目里帮到你最大的地方是什么,最没帮到的又是什么

8. (研究生选作)找一篇近三年发表的 GIS / 地理信息可视化方向的**学术论文**,选其中一张地图插图作为目标,试着用本章学到的 Leaflet 或 Mapbox 技术,**复刻**这张图。如果原图用的是 ArcGIS 或其他工具,考虑如何用 Web 技术达到相近效果。写一份 500 字的复刻报告,讨论差距与改进方向。
