# TASKS — 初稿写作(四个月版,W1 = 2026-06-15)

> 目标:2026-10-09 前完成全书 12 章初稿 + 配套资产齐全。
> 周历见 `docs/roadmap.md`,逐周工时与交付量见 `docs/sprint-plan.md`。
> 初稿之后的完善与出版待办见 `docs/post-draft-backlog.md`(写作期间发现"成书前必须做"的事,随手记进该文件的记录区)。
> 状态图例:⬜ 待做　🟨 进行中　✅ 完成

## 正文初稿进度

- [x] ✅ ch01 为什么 GIS 开发者要学 AI 对话式编程(正文有未提交修改,W1 提交)
- [x] ✅ ch02 开发环境搭建
- [x] ✅ ch03 Prompt 设计基础
- [x] ✅ ch04 前端地图开发:Leaflet 与 Mapbox
- [x] ✅ ch05 前端综合项目:城市 POI 可视化平台
- [ ] ⬜ **W3–W4 · 06-29/07-06** ch06 GeoPandas + AI 空间数据处理
- [ ] ⬜ **W5–W6 · 07-13/07-20** ch07 空间分析任务
- [ ] ⬜ **W8–W9 · 08-03/08-10** ch08 PostGIS + AI 建库写 SQL
- [ ] ⬜ **W10–W11 · 08-17/08-24** ch09 FastAPI + AI 构建空间数据 API
- [ ] ⬜ **W12–W14 · 08-31/09-07/09-14** ch10 城市通勤分析仪表盘(数据/后端/前端三周)
- [ ] ⬜ **W15 · 09-21** ch11 AI 辅助开发方法论
- [ ] ⬜ **W16 · 09-28** ch12 局限、幻觉与伦理
- [ ] ⬜ **W17 · 10-05** 收尾:通读 + terminology-auditor 术语巡检 + 全量代码回归 + v0.2 tag

## 存量补课(W1–W2 清零)

- [x] ✅ **W1** 提交 ch01 未提交的修改(917c79a,06-10 提前完成)
- [x] ✅ **W1** code/ch02-env-check/steps/ 快照(step-01/02/final)+ 实跑验证 + final 与正文逐字一致(6ab9448)
- [x] ✅ **W1** ch06 数据源定为天地图 GS(2024)0650 县级(边界合规、适合出版);sources.yaml 补全、写 download_china_admin.py(引导下载+校验,三分支已测)
      ✅ size/checksum 已填入(9.5MB / 91edf86…;用户复跑结果一致,数据可重现)
- [x] ✅ **W1.5–W2** ch05 联合任务完成:代码(数据+step-01~05+final+主README)+ 正文 4 处修订
      代码:用户已验 step-02~05 浏览器渲染;final 构建冒烟过
      正文修订(9c12643):① 5.8.1 删虚构问题 ② 5.3.2 钉 Tailwind v3 ③ 5.9.1 坐标 Number 兜底 ④ 5.8.2 高亮 setPaintProperty
      ⏳ 收尾遗留:ch05 的 dialogues/PROMPTS/exercises 仍在 W2 资产补课周统一做
      正文修订(代码已落地,正文待同步改写):① 5.8.1 虚构问题 ④ 5.8.2 高亮(step-03) ③ 5.9.1 DetailPanel lon.toFixed bug(step-04);② 5.3.2 Tailwind v3 已贯彻全 step
- [ ] ⬜ **W2** code/ch04-mapbox-heatmap/steps/ 快照 ≥2 个
- [ ] 🟨 **W2** 建 dialogues/,ch01–ch05 各 ≥1 篇对话入库(脱敏)—— ✅ ch02 已开张(let-ai-write-env-check,Kimi 真实对话);ch01/03/04/05 仍需作者提供素材
- [x] ✅ **W2** exercises/ch01–ch05 落地(5 章 × 5 题,从正文抽取)
- [x] 🟨 **W2** prompts 库起步:CH04-001/002 已入库;ch03/ch05 待补;所有条目 last_verified/verified_models 待作者确认
- [ ] ⬜ **W2** prompts/ 库起步:ch03/ch04/ch05 共 ≥7 条
- [ ] ⬜ **W2** code-tester 回归 ch02/ch04/ch05 全部 steps

## 节点检查(缓冲周)

- [ ] ⬜ **W7 · 07-27** 复盘 W1–W6 实际工时 vs 预估(偏差>30% 调排期)+ ch08 Docker 环境预研 + **ch10 通勤数据源预研(全书最大数据风险,提前锁定)**

## 单章交付清单(每章发布周周五自检)

- [ ] 学习目标 3–5 条;**先修知识清单**;结构齐:引子/小结/延伸阅读/习题(2+2+1)
- [ ] **本章 Prompt 小结**(writing-guide 必备元素)
- [ ] 至少 1 份真实 AI 对话已入 dialogues/(脱敏)
- [ ] 配套代码 steps/ 快照齐全且独立可运行(code-tester 验证)
- [ ] ≥2 条 Prompt 入库(CHXX-NNN)
- [ ] **配图齐:命名 fig-chXX-NN-描述,截图已去书签栏/头像等隐私元素**(style-guide §4)
- [ ] 新用数据集已登记 data/sources.yaml(含 license)
- [ ] 通过 /style-check;style-reviewer 深度审稿无"必须修正"项
- [ ] Conventional Commits 提交并打周标记
