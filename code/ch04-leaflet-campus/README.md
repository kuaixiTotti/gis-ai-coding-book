# ch04-leaflet-campus · 校园地图 v1

> 第 4 章配套项目:用 Leaflet 做出第一个交互式地图。

## 这个项目是什么

一个单文件 HTML 应用,在浏览器里展示一所大学校园的关键地点(景观、建筑、餐饮),支持:

- 四种底图切换(OpenStreetMap、高德道路图、高德卫星图、Carto 深色)
- 按类别着色的 POI 圆点
- 鼠标悬停高亮 + 工具提示
- 点击弹出详情卡片
- 右下角图例

## 运行方式

**前提**:你已经按第 2 章装好了开发环境(本项目不需要 Node.js,直接打开 HTML 即可)。

### 方式一:直接用浏览器打开

```bash
# macOS / Linux
open final/index.html

# Windows
start final/index.html
```

### 方式二:用本地服务器(推荐)

直接打开 HTML 文件时,浏览器会用 `file://` 协议,某些浏览器(如 Chrome 较新版本)会因 CORS 限制阻止读取本地 GeoJSON。用本地 HTTP 服务器更可靠:

```bash
# Python 自带的简易服务器(推荐)
cd final
python -m http.server 8000

# 然后浏览器打开 http://localhost:8000
```

### 方式三:在 Cursor / VS Code 里打开

1. 在 IDE 中打开本目录
2. 安装 Live Server 扩展(VS Code Marketplace)
3. 右键 `final/index.html` → Open with Live Server

## 项目结构

```
ch04-leaflet-campus/
├── README.md            # 你正在读的文件
├── PROMPTS.md           # 本项目使用的关键 Prompt
├── DIALOGUE.md          # 精选 AI 对话记录
├── .env.example         # 环境变量示例(本项目用不到,留作模板)
│
├── data/                # 项目专用数据
│   └── campus.geojson   # 校园 POI 数据
│
├── src/                 # (本项目代码全部在 final/,src 留空备用)
├── tests/               # (本项目无测试)
├── screenshots/         # 运行效果截图
│
└── steps/               # 分阶段代码快照
    ├── step-01-init/        # 阶段 1:最小可运行地图
    ├── step-02-basemap/     # 阶段 2:加底图切换
    ├── step-03-geojson/     # 阶段 3:加载 GeoJSON
    ├── step-04-styling/     # 阶段 4:分类着色 + 图例
    └── final/               # 最终版本(交互完整)
```

每个 `steps/` 子目录都是独立可运行的版本。**学习时从 step-01 开始,跑通后跳到 step-02**,以此类推。任何一步卡住,都可以直接跳到下一步继续。

## 学习路径建议

1. **先跑 final/**,看到完整效果,建立目标感
2. **回到 step-01-init**,自己读一遍代码,理解最小结构
3. **对比 step-01 → step-02 的差异**,重点看 diff 里多出来的部分
4. **重复对比** step-02 → step-03 → step-04 → final
5. **最后做本章习题**,改造这个项目

每一步 diff 大约 30-80 行,5-10 分钟能读完。

## 关键 Prompt

本项目从零搭建时用到的 Prompt 见 [`PROMPTS.md`](PROMPTS.md)。

## 真实对话片段

精选了 3 段真实开发对话(包括一次"地图不显示"的调试过程),见 [`DIALOGUE.md`](DIALOGUE.md)。

## 已知问题

- **OpenStreetMap 底图在中国境内细节稀疏**——这是数据本身的局限,不是 bug。建议切换到高德底图查看国内细节。
- **切换到高德底图后中心位置可能偏移**——坐标系不一致(WGS84 vs GCJ-02)。本章学习阶段先不处理,第 8 章会系统讲。
- **DevTools Console 可能有 favicon 404**——无影响,可忽略。

## 扩展练习

完成本项目后,推荐尝试:

1. 把校园数据换成你自己学校的(让 AI 帮你生成)
2. 给每个 POI 加一张图片字段,弹窗里显示
3. 加一个"路线规划"功能:点两个点,显示最短路径(提示:Leaflet Routing Machine)
4. 把它部署到 GitHub Pages(让 AI 带你做)

## 相关资源

- 教材正文:[`../../book/ch04-frontend-maps/`](../../book/ch04-frontend-maps/)
- 课后习题:[`../../exercises/ch04/`](../../exercises/ch04/)
- 进阶项目:[`../ch04-mapbox-heatmap/`](../ch04-mapbox-heatmap/)

## 反馈

发现 bug、命令跑不通、截图过时?

→ 提交 Issue 选择"勘误"或"问题"模板。详见 [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md)。
