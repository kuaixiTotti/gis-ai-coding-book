# 贡献指南

欢迎为本书做出贡献!

## 常见贡献类型

### 1. 勘误

发现错别字、代码 bug、描述不准确?请:
1. 在 [Issues](../../issues) 新建 issue,选择"勘误"模板
2. 注明章节号、页码或行号、具体问题、建议修正

### 2. 内容改进建议

对章节结构、案例选择、讲解方式有建议?请走 Issue "建议"模板。

### 3. 代码贡献

如果你想直接修 bug 或补充代码:
1. Fork 本仓库
2. 创建分支:`git checkout -b fix/ch04-leaflet-bug`
3. 提交 PR,关联相关 Issue

## 代码规范

- Python 代码通过 `ruff check` 与 `ruff format`
- JS/TS 代码通过 `prettier` 与 `eslint`
- Commit message 遵循 [Conventional Commits](https://www.conventionalcommits.org/)

## 贡献 Prompt 模板

如果你发现了好用的 GIS 相关 prompt,欢迎贡献到 `prompts/` 目录:
1. 按 `prompts/template.md` 的格式编写
2. 至少在两个主流模型上测试过
3. 填写 `last_verified` 与 `verified_models` 字段

## 行为准则

见 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

## 致谢

所有贡献者会列入每个正式版本的致谢名单。
