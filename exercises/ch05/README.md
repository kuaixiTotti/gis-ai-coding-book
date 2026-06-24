# 第 5 章 习题

> 配套正文:[`book/ch05-poi-platform/`](../../book/ch05-poi-platform/)。
> 配套代码:[`code/ch05-poi-platform/`](../../code/ch05-poi-platform/)。
> 参考答案见教师专用仓库(申请方式见 [`../../solutions/README.md`](../../solutions/README.md))。

## 基础

1. 解释 React 里"派生值"(derived value)和"state"的区别。本章 `filteredPois` 是哪种?为什么?
2. 本章用了 `useRef` 保存 Mapbox map 实例,而不是 `useState`。为什么?两者在这个场景下有什么关键区别?
3. 部署后你的 Mapbox token 暴露在前端代码中。本章给出了什么防护措施?这些措施能完全防止 token 被盗用吗?

## 进阶

4. 本章的 `activeCategories` 用了 `Set` 而不是数组。请用自己的话解释这个选择的好处,并给出一个"如果用数组,哪些代码会变得更麻烦"的具体例子。
5. 重构本章的 `App.jsx`。目前所有 state 都在 App 里,当项目继续变大时会难以维护。请研究 `useReducer` 或 Zustand(一个轻量状态管理库),**尝试用其中一种重构你的状态管理**。让 AI 带你做,写一份 200 字的反思:重构前后的差异是什么?你更喜欢哪种?
6. 本章的热力图是"全部 POI 一起做热力图"。改造一下:**让热力图也能跟着筛选联动**——只对当前筛选后的 POI 做热力图。你会遇到什么技术难点?(提示:它涉及 source 的 data 如何传给热力图 layer)

## 挑战

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
