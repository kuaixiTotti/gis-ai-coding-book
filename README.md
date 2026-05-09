# GIS × AI 对话式编程

> 一本面向 GIS 专业本科生与研究生的实战教材,讲授如何用自然语言与 AI 协作完成从前端地图到空间数据库的全栈 GIS 开发。

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](LICENSE)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Text-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Status: Draft](https://img.shields.io/badge/status-draft-orange.svg)](CHANGELOG.md)

---

## 这本书为什么存在

每年九月,全国 GIS 专业的学生都会重演同一幕:打开 VS Code、装 GeoPandas、读 shapefile、画地图——花一整天和工具搏斗,真正用在思考问题上的时间不到两小时。

这本书想回答一个具体问题:**当你是一名 GIS 专业的学生,手里有 Cursor 或 Claude,如何把它真正用起来,独立完成一个从数据到前端的 GIS 项目?**

本书不是又一本"AI 入门读物",也不是 Leaflet/GeoPandas 的工具教程。它讲的是**当 AI 成为日常工具后,GIS 开发者的工作方式应该怎么变**。

## 适合谁读

- GIS 专业本科三年级及以上学生
- GIS 方向研究生
- 有少量编程基础(学过 Python 或 JS 任一即可),想快速上手 web GIS 开发的人

## 目录

**第一部分 基础与心法**
- 第 1 章 为什么 GIS 开发者要学 AI 对话式编程
- 第 2 章 开发环境搭建
- 第 3 章 Prompt 设计基础

**第二部分 前端地图开发**
- 第 4 章 前端地图开发:Leaflet 与 Mapbox
- 第 5 章 前端综合项目:城市 POI 可视化平台

**第三部分 空间数据与后端**
- 第 6 章 GeoPandas + AI 空间数据处理
- 第 7 章 空间分析任务
- 第 8 章 PostGIS + AI 建库写 SQL
- 第 9 章 FastAPI + AI 构建空间数据 API

**第四部分 综合与反思**
- 第 10 章 全栈综合项目:城市通勤分析仪表盘
- 第 11 章 AI 辅助开发方法论
- 第 12 章 局限、幻觉与伦理

完整正文见 [`book/`](book/)。

## 配套资源

| 目录 | 内容 |
|---|---|
| [`book/`](book/) | 教材正文(Markdown 源) |
| [`code/`](code/) | 各章配套可运行代码 |
| [`prompts/`](prompts/) | Prompt 模板库 |
| [`dialogues/`](dialogues/) | 真实 AI 对话记录 |
| [`exercises/`](exercises/) | 课后习题 |
| [`data/`](data/) | 数据源清单与下载脚本 |
| [`instructor/`](instructor/) | 教师资料(受限访问) |

## 快速开始

```bash
git clone https://github.com/YOUR_NAME/gis-ai-coding-book.git
cd gis-ai-coding-book

# 进入任意章节代码目录,按 README 运行
cd code/ch04-leaflet-campus
# 跟着该目录的 README.md 操作
```

每章 `code/<chapter>/` 目录下的 `steps/` 子目录保存了从初版到最终版的代码快照,任何一步卡住都能跳到下一步继续。

## 配套教学资源

教师如需课程 PPT、实验指导、参考答案与题库,见 [`solutions/README.md`](solutions/README.md) 申请说明。

## 参与与反馈

- **勘误**:发现错别字、代码 bug、描述不准确 → 提交 Issue 选择"勘误"模板
- **改进建议**:对结构、案例、讲解方式有建议 → Issue "建议"模板
- **代码贡献**:Fork → 改 → PR,详见 [CONTRIBUTING.md](CONTRIBUTING.md)
- **讨论**:开放话题、学习心得 → 仓库 Discussions 区

> **重要约定**:本书定位为活的教材。AI 工具更新很快,Mapbox 改 API、Cursor 出新版,都会让某些演示过时。看到任何"截图和实际不一样"、"命令报错和书里不同",**请告诉我们**,这是教材保持有效的唯一办法。

## 许可证

- **代码**:MIT,见 [LICENSE](LICENSE)
- **正文与图表**:CC BY-NC-SA 4.0(署名-非商业-相同方式共享)

商业用途(如出版、付费课程)请联系作者。

## 引用

引用格式见 [CITATION.cff](CITATION.cff)。建议格式:

> 作者. *GIS × AI 对话式编程*(草稿版本 vX.X). 出版年. https://github.com/kuaixiTotti/gis-ai-coding-book

## 致谢

本书在公开写作过程中收到了来自 GitHub Issues、邮件、读者群的大量反馈。所有贡献者在每个正式版本的 [CHANGELOG](CHANGELOG.md) 中列名致谢。

特别感谢以下不会取代但会被低估的群体:每一位曾在凌晨三点把报错粘到搜索引擎里、最终在 Stack Overflow 找到答案的 GIS 学生——这本书是写给你们的。
