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
      ⏳ 待你登录天地图下载一次后,运行脚本得 size/checksum 填回 sources.yaml
- [ ] 🟨 **W1.5–W2** ch05 联合任务:代码代写(Claude)+ 正文同步修订 + 分 step 快照 + 验证
      设计已定(2026-06-17):Tailwind v3 稳定版;5 步+final(init/mapview/sidebar/detail-style/heatmap-mobile);
      模拟数据确定性生成 500 条;每步独立可运行(step-02 起需用户自配 .env.local 的 Mapbox token)
      正文 4 处现在同步改:① 5.8.1 删虚构问题 ② 5.3.2 钉 Tailwind v3 ③ 5.9.1 DetailPanel lon.toFixed bug ④ 5.8.2 高亮给可跑实现
      进度:✅ 数据 ✅ step-01(npm实测) ✅ step-02(用户真token验证) ✅ step-03(npm构建+冒烟;待用户token验交互) ⬜ step-04 ⬜ step-05 ⬜ final ⬜ 正文4改
      正文修订:① 5.8.1 虚构问题、④ 5.8.2 高亮——已在 step-03 代码与 README 给出正确实现,正文待同步改写
- [ ] ⬜ **W2** code/ch04-mapbox-heatmap/steps/ 快照 ≥2 个
- [ ] ⬜ **W2** 建 dialogues/,ch01–ch05 各 ≥1 篇对话入库(脱敏)
- [ ] ⬜ **W2** exercises/ch01–ch05 落地(5 章 × 5 题)
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
