# 第 2 章 习题

> 配套正文:[`book/ch02-environment/`](../../book/ch02-environment/)。
> 参考答案见教师专用仓库(申请方式见 [`../../solutions/README.md`](../../solutions/README.md))。

## 基础

1. 解释 `uv add geopandas` 背后发生了什么:它和传统的 `pip install geopandas` 相比,做了哪些额外的事?(提示:可以让 AI 帮你解释,但自己要能复述出来)
2. 为什么本书推荐 pnpm 而不是 npm?列出至少两个理由。
3. `git commit` 和 `git push` 分别在什么时候用?一次提交最少需要哪两条命令?

## 进阶

4. 按本章 2.7 节的方法,让 AI 写一个 `check_env.py`,然后**故意卸载一个包**(比如 `uv remove folium`),重新跑脚本,看 ✗ 是不是出现在正确的位置。再装回去验证 ✓ 恢复。
5. 在你的 `gis-ai-learning` 仓库里随便改一些代码,然后用 `git diff` 查看改动,复制给 AI,让它为你生成一条 Conventional Commits 规范的提交信息。记录 AI 产出 vs 你自己能想到的信息的差异。

## 挑战

6. 本章 2.6 节提到"地图不显示时的三步排查流程"(Console → Network → Elements)。请你随便找一个线上的 Leaflet 或 Mapbox 演示页(官方文档里的 live demo 就行),打开 DevTools,**刻意看懂**这三个面板此时显示的内容,并用一张表格记录下来(每个面板你看到了什么、代表什么含义)。这是第 4 章之前你能做的最有价值的准备。
