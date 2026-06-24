# 第 5 章 前端综合项目——城市 POI 可视化平台

> **本章学习目标**
> - 完成一个有工程结构的前端 GIS 项目:React + Mapbox + Tailwind
> - 理解从"单文件 HTML"到"组件化应用"的思维跳跃
> - 掌握用 AI 协作做需求分析、技术选型、项目拆解
> - 学会真实的前端工作流:本地开发、Git 管理、一键部署
> - **交付一个可访问的公网链接,能给别人展示**
>
> **本章预计用时**:10–14 小时,建议分 4–5 次完成。

---

## 5.1 从"地图"到"产品"的跨越

第 4 章你做出了两个可运行的 HTML 文件,它们很酷,但它们不是"产品"。

什么是"产品"?以下几个问题,如果你的答案都是 no,那你手里的就只是"demo":

- 别人能不能通过一个网址直接打开,不用下载文件?
- 如果要加一个新功能(比如搜索框),要改动多少文件?几分钟能搞定吗?
- 代码量涨到 2000 行时,你还能快速找到某个功能写在哪里吗?
- 换一个城市、换一份数据,要不要重写一半代码?

本章就是要让你回答这些问题时,**从 no 变成 yes**。

我们要做的项目:**一个城市 POI 可视化平台**。以北京为例,用户可以:

- 看到北京几千个 POI 分布在地图上(彩色圆点 + 热力图切换)
- 按类别筛选(餐饮、购物、教育、医疗……)
- 按关键字搜索店铺名称
- 点击任一 POI 看详情
- 切换三种底图风格
- 在移动端浏览器也能流畅使用

技术栈:**React 18 + Vite + Mapbox GL + Tailwind CSS**。这是 2024–2026 年前端实战最主流的组合之一,学会它等于拿到进任何前端团队的"工具卡"。

---

## 5.2 先和 AI 讨论需求,不要急着写代码

这是本章第一次对第 3 章**模式二"先讨论方案再写代码"**的实战运用。

### 5.2.1 写一份"需求一页纸"

打开 Cursor,开始一次新对话。**先不要写任何代码**。

> 👤 **[角色]** 你是一个有产品思维的前端工程师。
>
> **[任务]** 我要做一个"城市 POI 可视化平台"。我是 GIS 专业的学生,希望能做出一个像样的作品用来展示和投简历。技术栈定为 React + Vite + Mapbox GL + Tailwind。
>
> **[任务的细节]** 这个平台要能做:地图展示 POI、按类别筛选、按关键字搜索、详情面板、底图切换、移动端兼容。
>
> **[你要做的事]** 先不要写代码。请帮我:
>
> 1. 把这个项目拆成 8–12 个"用户故事"(user stories),按"作为 X,我想 Y,以便 Z"格式写
> 2. 按 MVP(最小可行产品)和 Nice-to-have 两档分类
> 3. 列出每个用户故事对应的技术难点
> 4. 给出一个建议的开发顺序

### 5.2.2 AI 产出的需求文档(节选)

AI 会返回类似下面的结构化文档。这是项目的**第一份文字资产**:

```
## 用户故事

### MVP(必须完成)

1. 作为游客,我想在打开页面时立刻看到北京 POI 的地图分布,
   以便快速了解城市全貌。
   → 技术难点:初始数据加载性能、地图初始视野

2. 作为探索者,我想按类别(餐饮、购物…)筛选 POI,
   以便聚焦我感兴趣的内容。
   → 技术难点:Mapbox filter 表达式、UI 状态管理

3. 作为用户,我想通过关键字搜索 POI 名称,
   以便快速定位某个店铺。
   → 技术难点:客户端搜索实现、搜索结果高亮

4. 作为好奇的人,我想点击某个 POI 看详情,
   以便了解这个地点的具体信息。
   → 技术难点:弹出层设计、响应式布局

5. 作为审美有要求的用户,我想切换不同风格的底图,
   以便适应不同的浏览场景。
   → 技术难点:Mapbox 样式动态切换

### Nice-to-have(有时间再做)

6. 作为数据分析者,我想切换到热力图视图看密度分布
7. 作为移动用户,我想在手机浏览器流畅使用
8. 作为重度用户,我想把当前筛选结果导出为 CSV
9. 作为设计爱好者,我想有深色模式支持
...

## 建议开发顺序

Day 1:项目初始化 + 地图基础显示(用户故事 1)
Day 2:类别筛选 + 详情面板(用户故事 2、4)
Day 3:搜索功能 + 底图切换(用户故事 3、5)
Day 4:热力图 + 移动端适配(用户故事 6、7)
Day 5:打磨、部署、README
```

### 5.2.3 把这份文档存下来

**非常关键的一步**:在你的 `code/ch05-poi-platform/` 目录下新建 `docs/requirements.md`,把这份内容粘贴进去。

为什么重要?三个理由:

一是**它是你工程的"北极星"**。开发中迷茫时,翻开它重新定位。

二是**它是 AI 上下文的"记忆锚"**。未来和 AI 对话时,你可以说"参考 `docs/requirements.md` 里的用户故事 3",AI 立刻知道范围。

三是**它是简历素材**。将来你写这个项目的经历,这份文档就是你"做过需求分析"的证据。

提交它:

```bash
mkdir -p code/ch05-poi-platform/docs
# 把需求文档保存到 docs/requirements.md
git add code/ch05-poi-platform/docs/
git commit -m "docs(ch05): 添加 POI 平台需求文档"
```

---

## 5.3 项目初始化:现代前端工程的样子

### 5.3.1 用 Vite 创建项目

回到命令行:

```bash
cd code/ch05-poi-platform
pnpm create vite . --template react
```

它会问你几个问题,一路回车默认。等几秒,项目骨架就出来了:

```
ch05-poi-platform/
├── docs/
│   └── requirements.md
├── node_modules/          # 依赖(.gitignore 会忽略)
├── public/                # 静态资源
├── src/
│   ├── App.jsx            # 根组件
│   ├── App.css
│   ├── main.jsx           # 入口文件
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

装依赖并启动:

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:5173`,你会看到 Vite 的默认页面——转动的 React logo。

**你的第一个 React 项目跑起来了**。

### 5.3.2 安装需要的额外依赖

```bash
pnpm add mapbox-gl
pnpm add -D tailwindcss@^3.4 postcss autoprefixer
```

> 📌 本书统一用 **Tailwind v3**(写作时钉到 `3.4` 这条稳定线),它的生态最成熟、教程最多,配置方式多年稳定。Tailwind v4 在 2024 年底之后逐渐流行,配置更简(用 `@tailwindcss/vite` 插件、不再需要 `tailwind.config.js`),但 API 和 v3 不同——本书示例一律按 v3 来,**不要装 `tailwindcss@next` 或 v4**,否则下面的配置步骤和代码会对不上。

这里让 AI 带你完成 Tailwind v3 的配置:

> 👤 我刚用 Vite 创建了 React 项目,装了 tailwindcss@^3.4、postcss、autoprefixer。请帮我:
> 1. 用 Tailwind v3 的方式配置,使其能在 Vite + React 项目里工作(生成 `tailwind.config.js` 和 `postcss.config.js`,`content` 指向 index.html 和 src)
> 2. 在 src/index.css 中加入必要的 `@tailwind` 指令
> 3. 给我一个 App.jsx 的最简测试代码,验证 Tailwind 生效(比如一个蓝色大标题)

AI 会给出具体的配置步骤。跟着做,几分钟内你会看到首页变成一个用 Tailwind 写的简单组件。

### 5.3.3 理解这些文件是干什么的

很多学生第一次接触 React 项目时,被目录里一堆文件吓到。其实你只需要关心四个:

- **`index.html`** — 网页入口。只有一行有意义的代码:`<div id="root"></div>`。React 会把整个 App 塞进这个 div。
- **`src/main.jsx`** — JavaScript 入口。告诉 React"把 `<App />` 渲染到 id=root 的 div"。几乎不用改。
- **`src/App.jsx`** — 根组件。**你的绝大部分代码会在这里或从这里拆出去**。
- **`src/index.css`** — 全局样式。我们用 Tailwind,这个文件主要是 `@tailwind` 指令。

剩下的配置文件(vite.config.js、package.json)前期不用碰。

### 5.3.4 一次小 commit

先把空壳提交:

```bash
git add .
git commit -m "chore(ch05): 初始化 Vite + React + Tailwind 项目"
```

养成习惯:**每完成一小步就 commit**。

---

## 5.4 准备数据:模拟一批真实的北京 POI

### 5.4.1 为什么要模拟数据

真实北京 POI 数据从 OSM Overpass API 能拿到,但有几个问题:

- API 调用慢,每次开发都要等 30 秒
- 数据格式和我们要的结构不一定一致
- 这是教材演示,稳定性 > 真实性

**学习阶段用模拟数据,生产阶段接真实 API**——这是合理的工程策略。

### 5.4.2 让 AI 生成模拟数据

> 👤 帮我生成一份模拟的北京 POI 数据,保存为 `public/data/beijing-poi.json`,要求:
>
> 1. 总计 500 条记录
> 2. 覆盖北京六环内,经度范围 116.15–116.65,纬度范围 39.75–40.05
> 3. 类别分布:餐饮(40%)、购物(25%)、教育(15%)、医疗(10%)、交通(10%)
> 4. 每条记录包含:id、name、category、subcategory、lon、lat、rating(1-5 随机一位小数)、desc(一句话描述)、open_time(随机几种常见值如"9:00-22:00")
> 5. name 要像真实中文店铺名(可以用常见连锁品牌 + 后缀组合)
> 6. 输出标准 JSON 数组,不要 GeoJSON 结构(我们后续手动转)
> 7. 直接生成完整 JSON 内容,不要代码生成器

AI 会产出一个 500 条记录的 JSON 文件。**把它保存到 `public/data/beijing-poi.json`**(Vite 会把 public 目录下的文件直接作为静态资源对外提供)。

### 5.4.3 在 React 里加载它

修改 `src/App.jsx`:

```jsx
import { useEffect, useState } from 'react';

function App() {
  const [pois, setPois] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // public 目录的文件在 URL 根路径下直接可访问
    fetch('/data/beijing-poi.json')
      .then(res => res.json())
      .then(data => {
        setPois(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('加载 POI 数据失败:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">加载中...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">北京 POI 平台</h1>
      <p className="text-gray-600">共加载 {pois.length} 条 POI 数据</p>
    </div>
  );
}

export default App;
```

保存,浏览器自动刷新,你会看到"共加载 500 条 POI 数据"。

**暂停 30 秒想一下**:这 20 行代码里涉及了 `useState`、`useEffect`、`fetch`、条件渲染——这是 React 最核心的四个概念。如果你之前没用过 React,请对着这段代码**让 AI 给你讲一遍**,每一行都理解一下。这是后续所有内容的基础。

---

## 5.5 组件化:把 App 拆成几个角色

第 4 章所有代码都在一个 HTML 文件里。第 5 章开始,你必须学会"拆"。

### 5.5.1 先设计组件架构

在动手之前,和 AI 讨论一下组件怎么拆:

> 👤 我的 POI 平台 UI 大概这样:
>
> - 左侧是一个可收起的侧边栏:类别筛选复选框 + 搜索框 + POI 列表
> - 中间是地图,占主要空间
> - 点击地图上的 POI 或侧边栏列表项,右侧弹出详情面板
> - 地图右上角有底图切换按钮
>
> 请帮我设计组件树。每个组件:
> - 一句话职责描述
> - 接收哪些 props
> - 维护哪些 state
> - 触发哪些事件
>
> 不要写代码,给我一个可读的设计文档。

AI 会产出组件树,大致长这样:

```
App (顶层,管理全局状态)
  ├── 状态:pois, filteredPois, selectedPoi, filters, searchText, mapStyle
  └── 子组件:
      ├── Sidebar
      │     ├── 职责:类别筛选 + 搜索 + POI 列表
      │     ├── props: pois, filteredPois, onFilterChange, onSearchChange, onPoiSelect
      │     └── 子组件:CategoryFilter / SearchBox / PoiList
      │
      ├── MapView
      │     ├── 职责:渲染 Mapbox 地图,处理点的显示与交互
      │     ├── props: pois, filteredPois, selectedPoi, mapStyle, onPoiClick
      │     └── 内部 state:mapRef
      │
      ├── DetailPanel
      │     ├── 职责:展示选中 POI 的详细信息
      │     ├── props: poi, onClose
      │     └── 无 state
      │
      └── MapStyleSwitcher
            ├── 职责:切换地图样式
            ├── props: currentStyle, onStyleChange
            └── 无 state
```

### 5.5.2 把设计文档存下来

和需求文档一样,把这份存到 `docs/architecture.md`。你会在整个项目过程中反复参考它。

### 5.5.3 按架构创建组件文件

在 `src/` 下创建:

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── MapView.jsx
│   ├── DetailPanel.jsx
│   ├── MapStyleSwitcher.jsx
│   ├── CategoryFilter.jsx
│   ├── SearchBox.jsx
│   └── PoiList.jsx
├── App.jsx
└── main.jsx
```

空文件也好,让目录先站起来:

```bash
cd src
mkdir components
cd components
touch Sidebar.jsx MapView.jsx DetailPanel.jsx MapStyleSwitcher.jsx \
      CategoryFilter.jsx SearchBox.jsx PoiList.jsx
```

然后一次 commit:

```bash
git add .
git commit -m "chore(ch05): 建立组件目录结构"
```

---

## 5.6 先把地图显示出来:MapView 组件

按开发顺序,我们先让地图可见,再做侧边栏。

### 5.6.1 创建 MapView 组件

> 👤 帮我实现 `src/components/MapView.jsx`,要求:
>
> 1. 函数组件,接收 props:pois(所有 POI 数组)、onPoiClick(点击 POI 的回调)
> 2. 用 Mapbox GL 显示地图,初始视野北京
> 3. 用 useRef 保存 map 实例,避免重复创建
> 4. 组件挂载时创建地图,卸载时销毁
> 5. pois 数据变化时,把点加到地图上(用 addSource + addLayer)
> 6. 点击 POI 时调用 onPoiClick(poi)
> 7. 用 Tailwind 让组件占满父容器
> 8. Mapbox token 从环境变量 `VITE_MAPBOX_TOKEN` 读取
> 9. 代码要有关键注释

AI 会产出一个完整的组件。典型结构:

```jsx
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({ pois, onPoiClick }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // ─── 地图初始化(仅一次)──────────────────────
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [116.4074, 39.9042],
      zoom: 10
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ─── POI 数据变化时,重新渲染点 ──────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !pois.length) return;

    const addLayers = () => {
      // 把 POI 数组转成 GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: pois.map(p => ({
          type: 'Feature',
          properties: { ...p },
          geometry: {
            type: 'Point',
            coordinates: [p.lon, p.lat]
          }
        }))
      };

      // 已有 source 就更新,没有就添加
      if (map.getSource('pois')) {
        map.getSource('pois').setData(geojson);
      } else {
        map.addSource('pois', { type: 'geojson', data: geojson });

        // 按类别分配颜色的圆点图层
        map.addLayer({
          id: 'poi-circles',
          type: 'circle',
          source: 'pois',
          paint: {
            'circle-radius': 6,
            'circle-color': [
              'match', ['get', 'category'],
              '餐饮', '#e74c3c',
              '购物', '#f39c12',
              '教育', '#3498db',
              '医疗', '#2ecc71',
              '交通', '#9b59b6',
              '#95a5a6'   // 默认颜色
            ],
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#fff'
          }
        });

        // 点击事件
        map.on('click', 'poi-circles', (e) => {
          const props = e.features[0].properties;
          onPoiClick?.(props);
        });

        // 悬停改变鼠标
        map.on('mouseenter', 'poi-circles', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'poi-circles', () => {
          map.getCanvas().style.cursor = '';
        });
      }
    };

    // 如果地图样式已加载完成
    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.once('styledata', addLayers);
    }
  }, [pois, onPoiClick]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
```

### 5.6.2 配置 Mapbox Token

新建 `.env.local`(注意不要加后缀):

```
VITE_MAPBOX_TOKEN=pk.你的token
```

**绝对不要把 .env.local 提交到 Git**。Vite 默认已经在 `.gitignore` 里忽略了它,验证一下:

```bash
cat .gitignore | grep env
# 应该看到 .env.local 或类似规则
```

### 5.6.3 在 App.jsx 里用起来

```jsx
import { useEffect, useState } from 'react';
import MapView from './components/MapView';

function App() {
  const [pois, setPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);

  useEffect(() => {
    fetch('/data/beijing-poi.json')
      .then(res => res.json())
      .then(setPois);
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <main className="flex-1 relative">
        <MapView pois={pois} onPoiClick={setSelectedPoi} />
      </main>
    </div>
  );
}

export default App;
```

保存。浏览器刷新——**你应该看到地图上 500 个按类别着色的点**。

点一下任意一个点,Console 里应该看到 `selectedPoi` 更新了(可以临时加个 `console.log(selectedPoi)`)。

### 5.6.4 小结一下做了什么

到这里,你已经有了:

- 一个可以独立存在的 `MapView` 组件,可以被复用
- 正确的 React 生命周期:挂载时建地图、数据变时更新点、卸载时销毁
- Mapbox GL 和 React 的正确集成方式(用 ref,不要用 state 存 map 实例)
- 点击 POI 的回调机制,主界面能感知到选中事件

**这是"组件化"的真正样子**。如果别人要在别的项目里用这个地图,只需要传两个 props。

提交:

```bash
git add .
git commit -m "feat(ch05): 实现 MapView 组件与 POI 基础展示"
```

---

## 5.7 侧边栏:筛选、搜索、列表

### 5.7.1 先加状态管理

`App.jsx` 需要管理筛选条件。加几个 state:

```jsx
function App() {
  const [pois, setPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [activeCategories, setActiveCategories] = useState(
    new Set(['餐饮', '购物', '教育', '医疗', '交通'])
  );
  const [searchText, setSearchText] = useState('');

  // 计算筛选后的 POI
  const filteredPois = pois.filter(p => {
    const categoryMatch = activeCategories.has(p.category);
    const searchMatch = searchText === ''
      || p.name.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // ...
}
```

**关键点**:`filteredPois` 不是一个 state,而是每次渲染时重新计算的派生值。这是 React 的核心思维——**能算出来的东西就不要存**。

### 5.7.2 实现 Sidebar 组件

> 👤 帮我实现 `src/components/Sidebar.jsx`,要求:
>
> 1. 左侧宽度 320px,高度占满
> 2. 顶部是项目标题"北京 POI 平台"
> 3. 中间是:
>    - 类别筛选(5 个复选框,带颜色小圆点)
>    - 搜索框(placeholder "搜索店铺名")
>    - POI 列表(每项显示 name、category、rating)
> 4. POI 列表项可点击,点击调用 onPoiSelect(poi)
> 5. 选中的 POI 在列表里高亮(淡蓝色背景)
> 6. 列表超出时可滚动
> 7. 用 Tailwind,风格简洁现代
> 8. Props:filteredPois、activeCategories、onToggleCategory、searchText、onSearchChange、selectedPoi、onPoiSelect

AI 产出的代码(精简版):

```jsx
const CATEGORY_COLORS = {
  '餐饮': '#e74c3c',
  '购物': '#f39c12',
  '教育': '#3498db',
  '医疗': '#2ecc71',
  '交通': '#9b59b6'
};

export default function Sidebar({
  filteredPois,
  activeCategories,
  onToggleCategory,
  searchText,
  onSearchChange,
  selectedPoi,
  onPoiSelect
}) {
  return (
    <aside className="w-80 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* 标题 */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">北京 POI 平台</h1>
        <p className="text-xs text-gray-500 mt-1">{filteredPois.length} 个结果</p>
      </div>

      {/* 类别筛选 */}
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">类别</h2>
        <div className="space-y-1">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <label key={cat} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={activeCategories.has(cat)}
                onChange={() => onToggleCategory(cat)}
                className="mr-2"
              />
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 搜索框 */}
      <div className="p-4 border-b">
        <input
          type="text"
          value={searchText}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="搜索店铺名"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* POI 列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredPois.map(poi => (
          <div
            key={poi.id}
            onClick={() => onPoiSelect(poi)}
            className={`p-3 border-b cursor-pointer hover:bg-gray-50
                        ${selectedPoi?.id === poi.id ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{poi.name}</span>
              <span className="text-xs text-yellow-600">★ {poi.rating}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">{poi.category}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
```

### 5.7.3 在 App 里接起来

```jsx
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';

function App() {
  // ...(前面的 state 和 filteredPois 计算)

  const toggleCategory = (cat) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  return (
    <div className="w-screen h-screen flex">
      <Sidebar
        filteredPois={filteredPois}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedPoi={selectedPoi}
        onPoiSelect={setSelectedPoi}
      />
      <main className="flex-1 relative">
        <MapView pois={filteredPois} onPoiClick={setSelectedPoi} />
      </main>
    </div>
  );
}
```

刷新页面,你应该看到左侧 320px 的侧边栏、中间地图、筛选实时生效、搜索框也能工作。**一个像样的界面诞生了**。

### 5.7.4 暂停一下,做代码审查

这里我要插入一个本书第一次明确的"代码审查"练习。

你刚才大部分代码是 AI 写的。现在打开 `Sidebar.jsx`,**对着代码和 AI 来一次问答**:

> 👤 请审查你刚才写的 Sidebar.jsx,回答这几个问题:
>
> 1. 哪些地方可能有性能问题?比如 POI 列表有 500 条时会不会卡?
> 2. 有没有地方对特殊输入处理不好?(比如搜索框粘贴超长文本)
> 3. 如果我想让用户能"清空搜索"或者"全选/全不选类别",最小改动是什么?
> 4. 有没有代码可以抽成独立组件的地方?

AI 会给你一份审查报告。**这是你从本项目学到最有价值的东西之一**——不是会写代码,是会读代码、会问代码。

---

## 5.8 联动 Mapbox 图层:筛选和高亮

上一节,侧边栏的筛选改的是 `filteredPois`,而 App 把 `filteredPois` 作为 `pois` prop 传给了 `MapView`。MapView 的 useEffect 依赖 `pois`,所以筛选一变,地图就会 `setData` 重绘——**筛选已经自动联动了**,现在刷新页面就能看到取消某个类别时地图上的点跟着变少。

这一节我们先把"为什么它能自动联动"想清楚,再加一个真正的新功能:选中高亮。

### 5.8.1 两种联动思路的取舍

筛选联动有两种实现,本章选了其中一种,值得对比一下:

**方法 A(本章用的)**:App 把 `filteredPois` 传给 MapView,MapView 只负责"显示传进来的这些点"。每次筛选都把过滤后的整份 GeoJSON 重新 `setData` 推给地图。简单直接,组件职责清晰。

**方法 B**:App 始终传全部 `pois`,另外把筛选条件(activeCategories)也传进去,让 Mapbox 用图层的 `filter` 表达式在渲染层过滤,数据不重传。性能更好,但组件间耦合变复杂。

判断依据是数据量:500 个点用方法 A 毫无压力(`setData` 很快);到几万、几十万点时,频繁重传整份数据才会成为瓶颈,那时才值得换方法 B。**先用够简单的方案,等真遇到性能问题再优化**——这是贯穿本书的工程态度。

### 5.8.2 让选中的 POI 在地图上突出

用户在侧边栏列表点击某个 POI,地图上这个点应该变大、变色、视野平滑飞过去:

> 👤 MapView 组件再加一个 prop:`selectedPoi`(可能为 null)。当它变化时:
>
> 1. 地图平滑飞过去(用 flyTo,zoom=15)
> 2. 选中的 POI 在地图上半径从 6 变成 12,边框变金色
> 3. 未选中的 POI 保持原样
>
> 飞过去用 `flyTo`;高亮用 `setPaintProperty` 在选中变化时重新下发 `case` 表达式,不要重建整个图层。

这里有一个**关键的坑**:很多人(包括 AI 的第一版)会把高亮写在 `addLayer` 的 `paint` 里,用 `case` 表达式判断 `selectedPoi?.id`。但 `paint` 是建图层时一次性求值的,**之后 `selectedPoi` 再变,图层样式不会自动更新**。正确做法是单独用一个 `useEffect`,在 `selectedPoi` 变化时调用 `setPaintProperty` 把新的 `case` 表达式重新下发给地图:

```jsx
// App.jsx 多传一个 prop
<MapView pois={filteredPois} selectedPoi={selectedPoi} onPoiClick={setSelectedPoi} />

// MapView.jsx:selectedPoi 变化时,飞过去 + 重新下发高亮
useEffect(() => {
  const map = mapRef.current;
  if (!map) return;

  // 1) 高亮:选中的点半径 12、描边金色;其余维持原样
  const id = selectedPoi?.id ?? -1;
  if (map.getLayer('poi-circles')) {
    map.setPaintProperty('poi-circles', 'circle-radius', [
      'case', ['==', ['get', 'id'], id], 12, 6,
    ]);
    map.setPaintProperty('poi-circles', 'circle-stroke-color', [
      'case', ['==', ['get', 'id'], id], '#fbbf24', '#fff',
    ]);
  }

  // 2) 平滑飞过去
  if (selectedPoi) {
    map.flyTo({
      center: [Number(selectedPoi.lon), Number(selectedPoi.lat)],
      zoom: 15,
      duration: 1000,
    });
  }
}, [selectedPoi]);
```

> 💬 注意 `flyTo` 的坐标用了 `Number(...)` 包一层。这是为下一节埋的伏笔:POI 从地图点击进来时,坐标可能是字符串,直接用会出问题——5.9.1 会讲。

**学习阶段先做出能用的版本即可,性能优化(比如改用 `feature-state`)留到第 10 章项目里讨论**。

### 5.8.3 一次 commit

```bash
git add .
git commit -m "feat(ch05): 侧边栏与地图联动,选中 POI 高亮并飞过去"
```

---

## 5.9 详情面板与底图切换

### 5.9.1 DetailPanel 组件

右侧点击后浮出一个详情面板:

> 👤 实现 `src/components/DetailPanel.jsx`,要求:
>
> 1. Props:poi(对象,可能为 null)、onClose
> 2. 当 poi 为 null 时不渲染任何东西
> 3. 否则在屏幕右侧浮出一个宽 320px 的面板,内容包括:name、category、rating(5 颗星样式)、desc、open_time、坐标
> 4. 右上角有 × 关闭按钮,点击触发 onClose
> 5. 从右侧滑入的过渡动画
> 6. 不要用任何 UI 库,纯 Tailwind

AI 的产出大致如下(省略):

```jsx
export default function DetailPanel({ poi, onClose }) {
  if (!poi) return null;

  // poi 可能来自两条路径:侧边栏(原始对象,坐标是数字)或地图点击
  // (Mapbox feature.properties,坐标可能是字符串)。统一用 Number 兜底。
  const lon = Number(poi.lon);
  const lat = Number(poi.lat);
  const coordText =
    Number.isFinite(lon) && Number.isFinite(lat)
      ? `${lon.toFixed(5)}, ${lat.toFixed(5)}`
      : `${poi.lon}, ${poi.lat}`;

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl
                    z-10 transition-transform duration-300
                    p-6 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold pr-8">{poi.name}</h2>
      <div className="mt-1 text-sm text-gray-500">{poi.category} · {poi.subcategory}</div>

      <div className="mt-4 flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < Math.round(poi.rating) ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
        <span className="ml-2 text-sm">{poi.rating}</span>
      </div>

      <p className="mt-4 text-sm text-gray-700">{poi.desc}</p>

      <div className="mt-4 pt-4 border-t text-xs text-gray-500 space-y-1">
        <div>营业时间:{poi.open_time}</div>
        <div>坐标:{coordText}</div>
      </div>
    </div>
  );
}
```

> ⚠️ 这里有个真实会踩的坑:很容易直接写 `poi.lon.toFixed(5)`。当 POI 从**侧边栏**点进来时 `poi` 是原始对象,`lon` 是数字,没问题;但从**地图点击**进来时,`poi` 来自 Mapbox 的 `feature.properties`,数值字段可能是字符串,对字符串调 `.toFixed` 会直接报 `TypeError`。所以上面先用 `Number(poi.lon)` 转一下,并用 `Number.isFinite` 兜底——两条选中路径都安全。这也呼应了 5.8.2 里 `flyTo` 用 `Number(...)` 的原因。

在 App.jsx 里把它加进来:

```jsx
<main className="flex-1 relative">
  <MapView pois={filteredPois} selectedPoi={selectedPoi} onPoiClick={setSelectedPoi} />
  <DetailPanel poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
</main>
```

### 5.9.2 MapStyleSwitcher

底图切换组件简单很多:

```jsx
const STYLES = [
  { id: 'streets', name: '街道', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'light',   name: '浅色', url: 'mapbox://styles/mapbox/light-v11' },
  { id: 'dark',    name: '深色', url: 'mapbox://styles/mapbox/dark-v11' }
];

export default function MapStyleSwitcher({ currentStyle, onStyleChange }) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded shadow-md overflow-hidden z-10">
      {STYLES.map(s => (
        <button
          key={s.id}
          onClick={() => onStyleChange(s.url)}
          className={`px-3 py-2 text-sm block w-full text-left
                      ${currentStyle === s.url ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'}`}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
```

在 App 里管理样式 state,把它传给 MapView 和 MapStyleSwitcher。MapView 内部需要监听 `mapStyle` 变化,调用 `map.setStyle(...)`——**这里有一个陷阱**:`setStyle` 会清空所有图层,你需要在 `map.once('style.load', ...)` 里重新添加 source 和 layer。

这是让 AI 实现的好机会:

> 👤 MapView 现在多一个 prop:`mapStyle`。当它变化时,用 `map.setStyle(mapStyle)` 切换。但切换样式会清掉所有自定义图层,所以我需要在 style.load 事件里重新添加 source 和 layer。请重构 MapView,把"添加 source + layer"的逻辑抽成一个函数,让初始化和样式切换都能复用它。

### 5.9.3 让 AI 给你讲清这个陷阱

在 AI 修完代码后,追加一句:

> 👤 请解释为什么 `setStyle` 会清掉自定义图层,这是 Mapbox 的设计故意的还是 bug?有没有什么办法可以"保留"图层?

AI 会解释:setStyle 是**整样式替换**,不是"改基础层"。Mapbox 新版本提供了 `setStyle(style, { diff: false })` 和 `setStyle(style, { diff: true })` 两种模式,后者在某些情况下能保留。但保险起见,用"重新添加"的方式更稳定。

**这段对话比你直接抄代码重要**。你学到的不只是怎么用,更是"为什么会这样设计",这才是工程直觉的积累。

---

## 5.10 热力图切换(Nice-to-have 的落地)

按需求文档,热力图是 Nice-to-have。我们现在实现它:

> 👤 在侧边栏加一个"视图模式"切换:**散点图 / 热力图**。散点图就是现在的样子;热力图用同一份数据,但渲染成热力图图层(隐藏散点圆层)。

AI 会加一个 state、一个按钮、在 MapView 里根据 viewMode 控制图层的 visibility。

关键技巧是用 Mapbox 的 `setLayoutProperty`:

```javascript
map.setLayoutProperty('poi-circles', 'visibility', viewMode === 'points' ? 'visible' : 'none');
map.setLayoutProperty('poi-heat', 'visibility', viewMode === 'heat' ? 'visible' : 'none');
```

做完你会发现一个有趣的现象:热力图下搜索和筛选仍然生效(因为 filteredPois 驱动同一个 source)。这正是第 4 章说过的 Mapbox "source / layer 分离"的威力。

---

## 5.11 移动端适配

现在用手机打开你的页面(或 DevTools 切换到手机模拟模式),你会发现:

- 侧边栏占了半个屏幕,地图没地方显示
- 详情面板覆盖整个屏幕
- 按钮太小点不准

适配思路:

- 小屏幕时侧边栏变成**可收起的抽屉**,默认隐藏,点按钮才显示
- 详情面板在小屏幕变成**从底部上滑的卡片**,不是右侧浮出
- 增大按钮触控区域

让 AI 做这些改动,主要靠 Tailwind 的响应式前缀(`md:`、`lg:`):

> 👤 现在的布局在手机屏幕(<768px)显示效果很差。请改成响应式:
>
> 1. 侧边栏:桌面端保持 320px 固定左侧,手机端变成从左滑入的抽屉,默认隐藏,由一个汉堡菜单按钮控制
> 2. 详情面板:桌面端保持右侧 320px 浮出,手机端变成底部上滑卡片,高度 50vh
> 3. MapStyleSwitcher:桌面端右上角,手机端右下角
> 4. 修改全部相关组件,给出完整的改动清单

让 AI 一次性处理,然后在手机上验证。

---

## 5.12 部署到 Vercel

到这里项目可以跑了,但它还只在你电脑上。最后一步:**部署上线**。

### 5.12.1 准备部署

先确保项目能正常打包:

```bash
pnpm build
```

如果有报错,贴给 AI 修。通常第一次 build 会出几个小问题:未使用的 import、环境变量引用错误。

### 5.12.2 推送到 GitHub

```bash
git push
```

### 5.12.3 Vercel 一键部署

1. 访问 vercel.com,用 GitHub 账号登录
2. 点 "Add New → Project"
3. 选择你的仓库
4. **关键一步**:在 Environment Variables 里添加 `VITE_MAPBOX_TOKEN`,值填你的 token
5. 点 Deploy

1–2 分钟后,Vercel 会给你一个 `your-project.vercel.app` 的公网链接。

**打开链接,用手机扫码访问,发给你的朋友**。你刚刚做出了一个可以给别人看的真实前端产品。

### 5.12.4 处理 Mapbox Token 的暴露问题

你可能会注意到一个安全问题:**Mapbox token 会出现在前端代码里,打开 DevTools 能看到**。这无法避免——前端代码本质上是公开的。

正确的做法是:

1. **在 Mapbox 控制台给 token 设置 URL 限制**。比如只允许 `your-project.vercel.app` 和 `localhost:5173` 使用。这样别人复制你的 token 也没法用。
2. **监控 token 使用量**。免费额度每月 5 万次,被滥用了会报警。

让 AI 带你在 Mapbox 控制台做这些设置。

---

## 5.13 项目复盘

到这里,你完成了这些事:

- 一个有工程结构的 React 项目
- 组件化架构(7 个组件各司其职)
- 状态管理(筛选、搜索、选中、样式切换、视图模式)
- Mapbox 的散点 + 热力图 + 交互
- 移动端响应式
- 部署到公网

代码量大致在 800–1200 行(含样式、组件)。如果让你从零、不用 AI 做这样一个项目,**预计需要 2–4 周**(对于 GIS 学生)。你现在用了约 10–14 小时。

### 5.13.1 停下来做一次复盘

请你**现在不要急着翻到下一章**,花 30 分钟做以下事情:

**1. 写一份 README**:在项目根目录写一份 Markdown,至少 300 字。包括:

- 这个项目是什么、解决什么问题
- 技术栈
- 如何本地运行(包括 Mapbox token 的配置)
- 功能列表
- 在线 Demo 链接
- 未来可能的改进

这是你个人项目的"门面",会被招聘方看到。**让 AI 帮你起草初稿,你精修**。

**2. 回顾你和 AI 的对话**。打开 Cursor 或你用的对话历史,看看:

- 整个项目你大约和 AI 对话了多少轮?
- 哪一轮是 AI 帮你省了最多时间的?
- 哪一轮是 AI 写错了、你花了很长时间才改对的?
- 如果让你再来一次,哪些 Prompt 你会写得更清楚?

把这些记录到 `dialogues/ch05/reflection.md`。

**3. 做一次口头演示练习**。找一个朋友(不一定是技术背景),给他看你的项目。3 分钟内讲清楚:

- 这是什么
- 它能做什么
- 关键技术是什么(用朋友能听懂的话)

如果你讲不清楚,说明你自己还没理解透。**回去和 AI 聊一下"帮我写一份面向非技术人的 3 分钟讲稿"**。

这三件事,每一件都比"再多学一个技术"重要得多。

---

## 5.14 常见问题速查

**Q1:pnpm dev 启动后地图是空白的**

- 打开 Console 看有无错误
- 最可能:Mapbox token 没配置或配错了。检查 `.env.local` 文件名(不是 `.env`,是 `.env.local`),变量名必须以 `VITE_` 开头
- Vite 需要重启才能加载新环境变量,改完 .env 要 Ctrl+C 重启 `pnpm dev`

**Q2:切换底图样式后 POI 点消失了**

setStyle 清了自定义图层。需要监听 `style.load` 事件重新 addSource/addLayer。见 5.9.3 节。

**Q3:手机上布局错乱**

Tailwind 的响应式前缀只有默认值是"手机优先"。`w-80 md:w-80` 这种写法对手机也生效,要写 `w-full md:w-80` 才是"手机全宽、桌面 320px"。

**Q4:Vercel 部署后页面空白**

- 检查 Vercel 日志,一般是 build 报错
- 最可能:环境变量 `VITE_MAPBOX_TOKEN` 没在 Vercel 里配置
- 检查 `vite.config.js` 里的 `base` 路径配置

**Q5:筛选结果太多时 POI 列表滚动卡顿**

500 条没问题,5000 条以上需要虚拟列表。推荐 `react-window` 库,让 AI 带你集成。

**Q6:selectedPoi 点击后高亮没效果**

Mapbox 的 `feature-state` 或 `case` 表达式容易出错,让 AI 给你一个最小复现,在浏览器 Network 里看发生了什么。

**Q7:我想把北京数据换成其他城市**

只需要替换 `public/data/beijing-poi.json`,以及 `MapView.jsx` 里的初始 center。让 AI 帮你写一个通用的"城市配置"对象,把这些硬编码值抽出来。这是重构的好练习。

---

## 5.15 小结

这一章的重量级不在"学了多少知识",而在"完成度"。**你从 0 做出了一个可展示的前端产品**,这件事在你的学习曲线里是一次关键跳跃。

更重要的是方法论层面的几个"第一次":

- 第一次用 AI 做**需求分析**(5.2 节)
- 第一次用 AI 做**组件架构设计**(5.5 节)
- 第一次用 AI 做**代码审查**(5.7.4 节)
- 第一次让 AI **解释工程陷阱**(5.9.3 节)
- 第一次把产品**部署到公网**(5.12 节)

每一个"第一次",都是你 AI 辅助开发能力的一次台阶式上升。

从下一章开始,我们离开前端,进入空间数据处理的世界。GeoPandas、PostGIS、FastAPI 这些名字可能让你听起来觉得"后端"、"硬核",其实它们的学习路径和前端一样——**用好 AI 对话,你会惊讶于这些东西比你想象中友好得多**。

---

## 本章延伸阅读

**React 生态**

- React 官方文档(react.dev) — 2023 年重写过,教程质量远超老版本,**强烈推荐读一遍 Learn 章节**
- Dan Abramov 的博客(overreacted.io) — React 核心作者,对 hooks 和组件设计的解读最权威
- Tao Te Tip Jar 的 *React 设计模式* 系列(英文原文 patterns.dev) — 进阶学习组件模式

**Mapbox + React**

- Mapbox 官方 React 集成示例(docs.mapbox.com/mapbox-gl-js/example) — 有官方的 React 示例,本章代码模式参考了它
- react-map-gl 库(visgl.github.io/react-map-gl) — Uber 出品的 Mapbox React 封装,如果你做大项目值得考虑。本章没用它是为了让你理解"原生集成"的思路

**Tailwind CSS**

- Tailwind 官方文档(tailwindcss.com) — 要查 utility 类是什么时,直接搜
- *Refactoring UI*(refactoringui.com) — Tailwind 作者写的一本设计小书,对做出"看起来不像程序员做的"UI 有奇效

**部署与工程化**

- Vercel 官方文档 — 简短但够用
- *The Twelve-Factor App*(12factor.net) — 十年前的文章,但至今是现代 Web 应用设计的金标准

**项目参考**

- GitHub 上搜索 `awesome-mapbox` 和 `awesome-leaflet` — 看真实项目怎么做
- Observable HQ 上搜索 "Mapbox" — 有大量可交互的地理可视化案例,适合找灵感

> **阅读建议**:React 官方文档一次读不完可以分次。本章完成后,**特别推荐读 "Thinking in React" 这一小节**——它会让你对本章的组件拆解为什么要这样分有更深的理解。

---

## 本章习题

**基础**

1. 解释 React 里"派生值"(derived value)和"state"的区别。本章 `filteredPois` 是哪种?为什么?

2. 本章用了 `useRef` 保存 Mapbox map 实例,而不是 `useState`。为什么?两者在这个场景下有什么关键区别?

3. 部署后你的 Mapbox token 暴露在前端代码中。本章给出了什么防护措施?这些措施能完全防止 token 被盗用吗?

**进阶**

4. 本章的 `activeCategories` 用了 `Set` 而不是数组。请用自己的话解释这个选择的好处,并给出一个"如果用数组,哪些代码会变得更麻烦"的具体例子。

5. 重构本章的 `App.jsx`。目前所有 state 都在 App 里,当项目继续变大时会难以维护。请研究 `useReducer` 或 Zustand(一个轻量状态管理库),**尝试用其中一种重构你的状态管理**。让 AI 带你做,写一份 200 字的反思:重构前后的差异是什么?你更喜欢哪种?

6. 本章的热力图是"全部 POI 一起做热力图"。改造一下:**让热力图也能跟着筛选联动**——只对当前筛选后的 POI 做热力图。你会遇到什么技术难点?(提示:它涉及 source 的 data 如何传给热力图 layer)

**挑战**

7. 本章是桌面端 + 移动端的响应式。**再加一档**:**做一个"大屏模式"(≥1920px)**——地图宽更大、字体更大、信息密度更高,看起来像大屏看板。要求:
   - 用 Tailwind 的 `2xl:` 前缀做分层
   - 提供一个"切换到大屏模式"按钮(或者自动检测)
   - 完成后截图或录屏,放到 GitHub README 里

8. (研究生选作)本章项目用了模拟数据。**改造它让它支持真实的 OSM Overpass API 数据**。要求:
   - 实现一个 `fetchOsmPoi(bbox, categories)` 函数,调用 Overpass API 拿指定矩形范围、指定类别的 POI
   - 处理 Overpass API 的速率限制(加 delay、缓存响应)
   - 把获取到的数据映射到本章原有的数据结构(name、category、rating、lon、lat、desc、open_time)
   - 对没有的字段给合理默认值(比如真实 OSM 数据没有 rating,填 "—")
   - 写一份 500 字技术报告,记录你遇到的问题、AI 给出的方案、最终的取舍
