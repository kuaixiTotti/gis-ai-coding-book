# 贡献指南

感谢你对本书的关注!这本书是开放写作的实践,你的反馈、勘误、贡献都会让它变得更好。

## 我能怎么贡献

按门槛从低到高排列:

### 1. 反馈勘误(最常见,最受欢迎)

发现错别字、命令跑不通、描述不清楚、截图过时?

→ 在 [Issues](../../issues) 新建 issue,选择 **"勘误"模板**

填写要点:
- **位置**:第 X 章 X.X 节,或具体段落的关键词
- **当前内容**:原文是什么(可以截图,也可以引用文字)
- **建议修正**:你认为应该是什么
- **复现条件**(代码相关):你的操作系统、Python/Node 版本、命令

不需要担心"小题大做"——一个错别字也值得修。

### 2. 提改进建议

对章节结构、案例选择、讲解方式有想法?

→ Issue **"建议"模板**

特别欢迎以下类型的建议:
- "第 X 章用了 ___ 例子,但 ___ 例子可能更典型"
- "第 X 章某概念讲得跳跃,建议补充 ___"
- "第 X 章顺序应该和第 Y 章对调,理由是 ___"

不接受的建议:
- 整体重写某章(请直接 Fork 自己写)
- 转向其他技术栈(本书的技术选型已在第 1 章末说明)
- 删除"AI 局限性"等批判性内容(这是本书的核心立场)

### 3. 报告代码运行问题

代码跑不通?

→ Issue **"问题"模板**,提供:
- 操作系统、Python/Node 版本
- 完整的报错信息(粘贴文本,**不要截图错误**)
- 你已经尝试过的修复

### 4. 直接贡献内容

要修代码 bug、补充示例、完善文档?

1. Fork 本仓库
2. 创建分支:`git checkout -b fix/ch04-leaflet-bug`
3. 提交修改(代码规范见下文)
4. 提 PR,在描述中关联相关 Issue(`Closes #123`)

PR 不必很大,**修一个错别字也欢迎**。

### 5. 贡献 Prompt 模板

发现了好用的 GIS 相关 Prompt?

1. 按 [`prompts/template.md`](prompts/template.md) 的格式编写
2. 至少在两个主流模型上测试过(Claude / GPT / Gemini 任选两个)
3. 填写 `last_verified` 与 `verified_models` 字段
4. 放到 `prompts/by-chapter/` 或 `prompts/by-task/` 合适位置
5. 提 PR

## 代码规范

### Python

- 用 `ruff check` 通过
- 用 `ruff format` 格式化
- 注释用中文,变量名用英文
- 第 6 章及之后引入类型注解

### JavaScript / TypeScript

- 用 `prettier` 格式化(项目根有 `.prettierrc`)
- 用 `eslint` 通过
- 单引号字符串、分号结尾
- 函数组件 + Hooks(不写 class component)

### Markdown 教材

- 中文与英文/数字之间加空格:"使用 Leaflet 加载 GeoJSON"
- 专业术语首次出现给出英文:"空间连接(spatial join)"
- 不滥用 emoji,功能性符号(✓ ✗ ⚠️ 💡 📌)按惯例使用
- 代码块标注语言:` ```python `、` ```bash `、` ```javascript `

### Commit Message

遵循 [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

常用 type:
- `feat` 新增内容
- `fix` 修正错误
- `docs` 文档/教材正文
- `chore` 仓库维护(比如改 .gitignore)
- `refactor` 重构(行为不变)
- `test` 测试相关

scope 用章节标识:`ch04`、`ch05`...

示例:
```
docs(ch04): 修正 Leaflet 坐标系示例的经纬度顺序
fix(ch05): MapView 在样式切换后图层丢失的问题
chore: 更新 .gitignore 忽略 .env.local
```

## 行为准则

见 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

简言之:
- 友善、尊重、有耐心
- 批评对事不对人
- 不容忍骚扰、歧视、人身攻击

## 致谢

所有有效贡献(被合并的 PR、被采纳的 Issue 建议)的提交者,会列入对应版本的 [CHANGELOG.md](CHANGELOG.md) 致谢区。在正式出版版本中,所有贡献者会列入书籍的"致谢"页。

匿名贡献也接受,在 Issue/PR 描述里注明"匿名"即可。

## 联系

- **公开问题**:走 Issue,这是首选
- **教师资源申请**:见 [`solutions/README.md`](solutions/README.md)
- **商业合作 / 出版意向**:邮件 [kuaixi@szu.edu.cn]
- **隐私问题**:邮件 [kuaixi@szu.edu.cn]
