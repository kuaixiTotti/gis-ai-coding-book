---
id: CH02-001
title: 让 AI 写一个一键检查 GIS 开发环境的脚本
chapter: 2
task_type: environment-setup
difficulty: basic
last_verified: 2026-06-17
verified_models: [kimi]
---

## 场景

刚装好 GIS 开发环境(Python + GeoPandas 等 + 命令行工具),想用一个脚本一键
确认每样东西都到位,而不是逐个手动 import / 敲 `--version`。本书第 2 章
§2.7 的实战练习。

## Prompt 模板

```
你是一位 Python 工程师。我是 GIS 专业的学生,正在搭建 GIS 开发环境,
用 {操作系统},Python {版本},用 {包管理器} 管理环境,搭建在本文件夹下的
虚拟 python 环境。

请帮我写一个 check_env.py 脚本,用来一键检查我的 GIS 开发环境是否装好,要求:
1. 检查 Python 版本(至少 {最低版本})
2. 检查能否 import:{包1、包2、……}
3. 检查命令行工具是否安装:{工具1、工具2、……}(并打印各自版本)
4. 最后汇总:每项用 ✓/✗ 标记,全部通过给出成功提示,否则提示有几项没过

请给出完整可运行的脚本,关键地方加中文注释解释为什么这么写。
```

## 变体

- **指定文件位置**:在结尾加一句"请把脚本放在 `code/我的项目/` 目录下",
  避免 AI 自作主张选路径(实测中 AI 会建到无关目录)。
- **加 CI 用途**:追加"脚本要能用退出码区分成功/失败,方便接入 CI",
  AI 会用 `sys.exit(0/1)`。

## 常见问题

- AI 可能把脚本建在你项目约定目录之外——把目标路径写进提示词可避免。
- 不同 AI 给的实现有差异(如 `__import__` vs `importlib.import_module`、
  版本号参数 `--version` vs `-v`),都对,理解取舍即可,别照单全收。
- 让 AI"顺便装包"时要当心:环境/包管理器(uv / conda / pip)说清楚,
  否则它可能给出和你工具链不符的安装命令。

## 示例输出

全部通过时:

```
🎉 恭喜!所有检查项全部通过!
你的 GIS 开发环境已就绪,可以开始工作了。
```

完整的真实对话见 [`dialogues/ch02/let-ai-write-env-check.md`](../../../dialogues/ch02/let-ai-write-env-check.md)。
