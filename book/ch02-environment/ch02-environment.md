# 第 2 章 开发环境搭建

> **本章学习目标**
> - 选择并安装一个适合 AI 对话式编程的 IDE
> - 搭建好 Python(含 GIS 常用库)与 Node.js 两套运行环境
> - 掌握 Git 与 GitHub 的最小必要用法,包括如何用 AI 辅助写提交信息
> - 熟悉浏览器开发者工具的基本使用
> - **第一次真正地和 AI 对话**——让 AI 帮你检查环境是否装好
>
> **本章预计用时**:完整做一遍约 3–4 小时。如果中途卡住,不要硬撑,把报错粘给 AI,这本身就是本章的主题。

---

## 2.1 本章前置说明

第 1 章基本没有代码,从本章开始我们要卷起袖子干活。在动手之前,几个坦诚的说明:

**关于操作系统**。GIS 开发对操作系统不挑剔,macOS、Linux、Windows 都能做。本章会尽量同时给三种系统的说明,但在实际的依赖安装上,**macOS 和 Linux 一般顺利,Windows 偶尔会多踩几个坑**。这不是偏见,是 GDAL 等底层库的历史原因。如果你用 Windows,第 2.2 节会专门给你一条推荐路径。

**关于版本**。本书所有示例基于 **Python 3.12+** 和 **Node.js 20+**。如果你的版本更高通常也没问题,更低的话建议先升级。具体原因后文会说。

**关于 AI 工具的选择**。本书默认你有以下三者**至少之一**的访问权限:

- Claude(claude.ai 网页版,或通过 API)
- GPT / ChatGPT(chatgpt.com 网页版,或 Plus 订阅)
- 或能稳定使用其中任一模型的第三方客户端

如果你完全没有访问权限,本章结尾会给出一些替代方案建议,但坦白说,**这本书的体验会打折扣**。请务必先解决访问问题再继续。

**关于"完美主义陷阱"**。环境搭建最大的敌人是追求完美。不要一上来就想"我要装最好的所有东西"——**先装一套能跑的最小集合,后面章节遇到需要再补**。本章的目标不是"一次装完所有你可能用到的工具",而是"装好你前三章需要用的东西"。

---

## 2.2 IDE 选型

IDE(Integrated Development Environment,集成开发环境)是你每天盯着的界面。选一个合适的 IDE,对 AI 对话式编程尤其重要——好的 IDE 会让 AI 和你的代码之间的"距离"变近,差的 IDE 会让你每次都要手动复制粘贴。

目前主流的三个选择:

### 选项 A:Cursor(本书推荐)

**Cursor 是一个基于 VS Code 分叉的 AI 原生 IDE**。它把 AI 对话做成了一等公民——编辑器右侧就是对话框,AI 可以直接读你的项目文件、改你的代码、跑你的命令。对于本书"对话式编程"的主题,它是最契合的工具。

**优点**:AI 集成度最高;界面和 VS Code 几乎一样,学习成本低;对本书后续所有示例都友好。

**缺点**:付费(免费额度有限,Pro 版约 $20/月);需要科学上网;数据会经过其服务器。

**适合谁**:你认真把 AI 对话式编程作为核心工作流的学生。对于一门跨越一个学期的课程,这个投入是值得的。

下载:访问 cursor.com,按系统下载安装包,打开即可。**不需要单独装 VS Code**,Cursor 自带所有 VS Code 的核心功能。

### 选项 B:VS Code + GitHub Copilot / Claude Code

**VS Code 是微软出品的免费编辑器,GitHub Copilot 是它最流行的 AI 插件**。Claude Code 是 Anthropic 出的命令行工具,可以和 VS Code 并用。

**优点**:VS Code 本身免费,生态巨大,插件最多;Copilot 对学生免费(需要学生认证);对轻度 AI 使用者足够。

**缺点**:AI 集成不如 Cursor 深入;Copilot 更擅长"代码补全"而不是"多轮对话",本书会用到后者的场景较多。

**适合谁**:已经熟悉 VS Code、暂时不想换工具的人;有学生邮箱、想免费试用一学期的人。

如果选这条路,**本书正文里所有"在 Cursor 中"的操作,你可以大部分用 VS Code + Copilot 替代,但对话的流畅度会差一些**。

### 选项 C:传统 IDE(PyCharm、WebStorm 等) + AI 网页版

**就是你用惯的 IDE + 直接在浏览器里开着 Claude/ChatGPT**。AI 和代码之间靠复制粘贴沟通。

**优点**:保持原有工作流;零切换成本。

**缺点**:AI 读不到你的项目上下文,每次对话你都要手动贴代码;本书的很多"让 AI 直接改文件"的演示你做不了,要手动搬运。

**适合谁**:只想把 AI 作为偶尔参考的辅助工具、不打算重塑工作流的人。对这本书来说,这个选项**不推荐**。

### 本书的建议

**如果你能付费,选 Cursor**。本书大部分演示基于 Cursor,换用其他工具你需要自行做少量适配。

**如果你是学生且认证通过,选 VS Code + Copilot**。配合浏览器里的 Claude/ChatGPT 网页版做长对话。

**如果你两者都不具备**,先把本书读到第 3 章,你会对"AI 对话式编程"有更具体的理解,再决定要不要投资一个 AI IDE 也不迟。

> 📌 **本章接下来的所有示例,默认你已经装好 Cursor 或 VS Code**。如果你用别的 IDE,请自行适配。

---

## 2.3 Python 环境搭建

GIS 开发的"后端"主要用 Python。我们要搭建的目标是:

- Python 3.12 或更新版本
- 一个干净隔离的虚拟环境(不污染系统)
- 装好 GeoPandas 和它那个臭名昭著的依赖 GDAL
- 能在 Jupyter Notebook 里跑起来

### 2.3.1 为什么不推荐 Anaconda

你可能听过前辈推荐 Anaconda。它曾经是 GIS Python 界的事实标准,原因是"它能解决 GDAL 的安装问题"。

但在 2024 年之后,情况变了。Anaconda 的商用许可政策收紧,越来越多的高校和企业禁用它。更重要的是,**有了更好的替代品**:uv。

**本书推荐用 uv 管理 Python 环境**。uv 是 Rust 写的 Python 包管理器,速度比 pip 快 10–100 倍,对 GeoPandas 这类有复杂依赖的包支持也足够好。

### 2.3.2 安装 uv

**macOS / Linux**:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows(PowerShell)**:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

装完关掉终端重开一次,运行:

```bash
uv --version
```

如果看到版本号(类似 `uv 0.5.x`),说明装好了。

> ⚠️ **Windows 踩坑提示**:如果你用的是 PowerShell 而 `uv` 命令找不到,很可能是 `%USERPROFILE%\.local\bin` 没加入 PATH。**把这个报错直接贴给 AI,它能给出修复命令**。这就是本章想演示的工作流——报错不要自己死磕。

### 2.3.3 创建你的第一个项目环境

找一个你常放代码的文件夹,我们新建一个本书的练习项目:

```bash
mkdir gis-ai-learning
cd gis-ai-learning
uv init
```

这会在当前目录生成几个文件:

```
gis-ai-learning/
├── .python-version
├── README.md
├── main.py
└── pyproject.toml
```

`pyproject.toml` 是现代 Python 项目的配置文件,记录项目用了哪些包。之后每次装包,uv 会自动更新它。

### 2.3.4 安装 GIS 相关包

```bash
uv add geopandas shapely folium matplotlib jupyter
```

第一次会慢一点(要下载 GDAL 相关的 wheel 文件),后续就快了。

装完后,跑一个最小验证:

```bash
uv run python -c "import geopandas; print(geopandas.__version__)"
```

应该打印出版本号(类似 `1.0.1`)。

**如果报错**,不要自己搜。**把完整报错信息贴给 AI,描述你的系统和上面做过的步骤,让 AI 告诉你怎么修**。这是本章最重要的练习之一。

### 2.3.5 Windows 用户的特殊路径

如果你用 Windows,**且 `uv add geopandas` 报了 GDAL 相关错误**,你有两个选择:

**方案 1**:让 AI 看报错,按建议修。通常 AI 会让你装 Microsoft C++ Build Tools 或下载预编译的 GDAL wheel。

**方案 2**:用 WSL2(Windows Subsystem for Linux)。这是 Windows 开发者搞定 Linux 工具链的"官方捷径"。装好 WSL2 后,你在 Ubuntu 子系统里按 Linux 的流程来,几乎不会遇到 GDAL 问题。

> 📌 **本书的建议**:如果你是 Windows 且不排斥命令行,**花一个小时装一下 WSL2**。它会为你后续 90% 的环境问题提前画上句号。具体安装指南让 AI 带你做,它对 WSL2 很熟。

### 2.3.6 在 Cursor / VS Code 里打开项目

打开 Cursor,菜单 → File → Open Folder,选中 `gis-ai-learning` 目录。

右下角会提示你"Select Python Interpreter"(选择 Python 解释器)。选带 `.venv` 字样的那个(uv 会在项目里创建一个名叫 `.venv` 的虚拟环境)。

现在你可以新建一个 `test.ipynb` 文件,在第一个单元格里写:

```python
import geopandas as gpd
print(gpd.__version__)
```

Shift + Enter 运行。看到版本号,Python 环境完工。

---

## 2.4 Node.js 环境搭建

GIS 开发的"前端"主要用 JavaScript / TypeScript,运行这些代码需要 Node.js。

### 2.4.1 用 nvm 管理 Node 版本

**直接装 Node 最新版不是好主意**。不同项目可能依赖不同 Node 版本,一台电脑上共存多个版本是常态。**nvm(Node Version Manager)是最流行的解决方案**。

**macOS / Linux**:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

关掉终端重开,然后:

```bash
nvm install 20
nvm use 20
node --version
```

看到 `v20.x.x` 说明好了。

**Windows**:用 `nvm-windows`(不同项目,但用法类似)。到 github.com/coreybutler/nvm-windows 下载 `nvm-setup.exe`。装完后:

```cmd
nvm install 20.17.0
nvm use 20.17.0
```

### 2.4.2 包管理器:npm 还是 pnpm?

Node 自带 npm(Node Package Manager)。但 npm 有一些众所周知的问题:装得慢、`node_modules` 巨大、版本管理容易混乱。

**本书推荐用 pnpm 替代 npm**。它比 npm 快,且 `node_modules` 占用硬盘少很多——对你这种可能同时跑好几个项目的学生,这点很重要。

装 pnpm:

```bash
npm install -g pnpm
pnpm --version
```

本书后续所有 `npm install` 都可以替换为 `pnpm install`,`npm run dev` 替换为 `pnpm dev`。如果你坚持用 npm 也可以,只是慢一些。

### 2.4.3 验证前端工具链

新建一个测试项目:

```bash
cd ..
mkdir node-test
cd node-test
pnpm init
pnpm add leaflet
```

看到 `node_modules` 目录生成,且里面有 leaflet 文件夹,说明前端环境可用。

我们会在第 4 章正式使用 Leaflet,这里只是验证工具链。

---

## 2.5 Git 与 GitHub 基础

Git 是版本控制工具。GitHub 是最大的 Git 托管平台。对于 AI 辅助开发,Git 不是可选项,而是**必备技能**——因为 AI 会频繁地改你的代码,你需要随时能"撤回"或"对比"。

如果你已经熟悉 Git,跳过本节。如果你完全新手,请老老实实读完。

### 2.5.1 安装与配置

**macOS**:终端里运行 `git --version`,如果没装系统会提示你安装。

**Windows**:从 git-scm.com 下载安装包。

**Linux**:`sudo apt install git`(Ubuntu/Debian)或 `sudo dnf install git`(Fedora)。

装完做一次身份配置(只需做一次):

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

邮箱建议用将来注册 GitHub 的邮箱。

### 2.5.2 在本书练习项目里初始化 Git

```bash
cd gis-ai-learning
git init
git add .
git commit -m "初始化项目"
```

三条命令分别做了:创建 Git 仓库、暂存所有文件、提交到本地仓库。

从现在开始,**每次你完成一个小阶段的修改,都做一次 git commit**。这是 AI 辅助开发里极其重要的纪律——AI 可能一次改很多文件,如果你没提交,撤回会很麻烦。

### 2.5.3 把项目推到 GitHub

注册 github.com(如果还没有),登录,点右上角 + → New repository,输入项目名 `gis-ai-learning`,**不勾选任何初始化选项**,点 Create。

页面会给你几行命令,复制到终端执行。大致是:

```bash
git remote add origin https://github.com/你的用户名/gis-ai-learning.git
git branch -M main
git push -u origin main
```

刷新 GitHub 页面,你的代码就在上面了。

### 2.5.4 让 AI 帮你写 commit message

提交代码时写清楚这次改了什么,是一个容易被忽视的好习惯。但写一段得体的提交信息需要时间,学生常常就随便写个 "update" 了事。

**这是 AI 可以大幅降低摩擦的地方**。一种简单的工作流:

1. 改完代码准备提交,先运行 `git diff` 看看你改了什么
2. 把输出复制给 AI,加一句 "请帮我生成一条符合 Conventional Commits 规范的提交信息,中文"
3. AI 会产出类似 `feat(ch04): 添加校园地图的标记点渲染` 的信息
4. 用这条信息提交:`git commit -m "feat(ch04): 添加校园地图的标记点渲染"`

这个小习惯让你的项目历史可读性极大提升,**将来回看自己的代码时会感谢今天的自己**。

Cursor 等 AI IDE 还可以直接在提交面板里"让 AI 基于当前改动生成 commit 信息",一键完成。

---

## 2.6 浏览器开发者工具速成

前端地图开发绕不开浏览器。而**浏览器开发者工具(DevTools)是前端调试的核心阵地**。本节不是要把你训练成前端工程师,而是让你掌握**最少需要的五个操作**。

推荐用 **Chrome 或基于 Chromium 的浏览器**(Edge、Arc、Brave 都可以)。本书截图基于 Chrome。

**打开 DevTools**:F12,或者右键页面 → "检查"。

### 你需要认识的五个面板

**1. Elements(元素)面板**:显示当前页面的 HTML 结构。你可以实时修改(改了不会影响真文件,只是临时试)。对前端地图开发,当地图容器显示不出来时,最先检查的就是这里。

**2. Console(控制台)面板**:看 JS 的报错、打印输出。JavaScript 代码出错几乎都会在这里留下红字。**本书中你 80% 的前端调试时间会花在这个面板**。

**3. Network(网络)面板**:看页面加载了哪些文件、有没有加载失败。当你加载 GeoJSON 或者调用地图瓦片服务时,这里能告诉你请求是成功(状态 200)还是失败(404、403、CORS 错误)。

**4. Sources(源代码)面板**:看页面加载了哪些 JS/CSS 文件。可以在这里设置断点,跑到这一行会暂停。初学阶段用不上,知道有这玩意就行。

**5. Application(应用)面板**:看 Cookie、本地存储等。偶尔会用到,比如看 Mapbox Token 是否正确存储。

### 最有用的一个技巧

**当你遇到前端地图不显示的问题,按这个顺序排查**:

1. 打开 Console,看有没有红色错误 → 有就复制给 AI
2. 打开 Network,过滤 XHR / Fetch,看数据请求是否成功
3. 打开 Elements,找到地图容器 div,看它有没有高度(`height: 0` 是最常见的地图不显示原因)

**这三步能解决 70% 的前端地图问题**。第 4 章我们会反复演示这个流程。

---

## 2.7 第一次真正的 AI 对话:让 AI 检查你的环境

到此为止,你应该已经装好了 Cursor/VS Code、Python + uv、Node.js + pnpm、Git。

我们来做一次小小的"仪式感"练习:**让 AI 写一个环境检查脚本,帮你确认所有东西都到位**。

### 2.7.1 启动一次结构化对话

打开 Cursor(或你选的 IDE),在 `gis-ai-learning` 项目里新建一个文件 `check_env.py`。

然后打开 AI 对话框(Cursor 里按 Cmd+L / Ctrl+L),输入这样一段 Prompt:

> 👤 你是一个 Python 工程师。请帮我写一个 `check_env.py` 脚本,用来检查我的 GIS 开发环境是否装好。要求:
>
> 1. 检查 Python 版本(至少 3.12)
> 2. 检查是否能 import:geopandas、shapely、folium、matplotlib、jupyter
> 3. 检查 Git 是否安装(调用 `git --version`)
> 4. 检查 Node 和 pnpm 是否安装
> 5. 每一项用 ✓ 或 ✗ 输出
> 6. 最后给一个总结:全部通过,或列出未通过的项
> 7. 代码要有中文注释,适合初学者阅读

### 2.7.2 AI 会返回类似这样的代码

```python
"""
环境检查脚本 —— 检查 GIS 开发环境是否装好
"""
import sys
import shutil
import subprocess

# 记录所有检查结果,最后统一汇总
results = []

# ─── 1. 检查 Python 版本 ────────────────────────────
# sys.version_info 返回一个元组,前两位是主版本和次版本
py_version = sys.version_info
if py_version >= (3, 12):
    results.append(("✓", f"Python 版本 {py_version.major}.{py_version.minor}"))
else:
    results.append(("✗", f"Python 版本过低:{py_version.major}.{py_version.minor},需要 3.12+"))

# ─── 2. 检查 Python 包 ──────────────────────────────
packages = ["geopandas", "shapely", "folium", "matplotlib", "jupyter"]
for pkg in packages:
    try:
        __import__(pkg)
        results.append(("✓", f"Python 包:{pkg}"))
    except ImportError:
        results.append(("✗", f"Python 包未装:{pkg}"))

# ─── 3. 检查命令行工具 ───────────────────────────────
# shutil.which 在 PATH 里找可执行文件
cli_tools = ["git", "node", "pnpm"]
for tool in cli_tools:
    path = shutil.which(tool)
    if path:
        # 获取版本号
        version = subprocess.run(
            [tool, "--version"],
            capture_output=True,
            text=True
        ).stdout.strip()
        results.append(("✓", f"命令行工具:{tool}({version})"))
    else:
        results.append(("✗", f"命令行工具未装:{tool}"))

# ─── 4. 打印汇总 ────────────────────────────────────
print("=" * 50)
print("GIS 开发环境检查结果")
print("=" * 50)
for status, msg in results:
    print(f"  {status}  {msg}")

failed = [r for r in results if r[0] == "✗"]
print("=" * 50)
if not failed:
    print("🎉 所有检查通过,可以开始学习了!")
else:
    print(f"⚠️  有 {len(failed)} 项未通过,请根据上面的提示修复。")
```

### 2.7.3 跑一下

在终端运行:

```bash
uv run python check_env.py
```

你会看到类似这样的输出:

```
==================================================
GIS 开发环境检查结果
==================================================
  ✓  Python 版本 3.12
  ✓  Python 包:geopandas
  ✓  Python 包:shapely
  ✓  Python 包:folium
  ✓  Python 包:matplotlib
  ✓  Python 包:jupyter
  ✓  命令行工具:git(git version 2.45.0)
  ✓  命令行工具:node(v20.17.0)
  ✓  命令行工具:pnpm(9.12.1)
==================================================
🎉 所有检查通过,可以开始学习了!
```

如果某项是 ✗,把那一行**连同你的操作系统**贴给 AI,问它怎么修。

### 2.7.4 这次练习的意义

这个 `check_env.py` 脚本本身是一次性工具。但这次练习有三个持久价值:

**第一**,你刚刚完成了全书的第一次"结构化 Prompt"——有角色、有任务、有约束、有输出格式。这是第 3 章会系统讲的 Prompt 五要素的雏形。

**第二**,你亲眼看到了 AI 产出的代码长什么样——有注释、有结构、有错误处理。这比你自己从零写同样的脚本,至少省 30 分钟。

**第三**,你有了一个**可复用的环境检查脚本**。把它提交到 Git 里,以后换电脑、搭新环境,跑一下就知道差什么。

提交它:

```bash
git add check_env.py
git commit -m "chore: 添加开发环境检查脚本"
git push
```

---

## 2.8 常见环境问题速查表

这一节是本章的"急救包"。按出现频率排序。

### Q1:`uv add geopandas` 装得很慢,甚至超时

**可能原因**:网络访问 PyPI 慢。

**解决方案**:换用国内镜像。在项目根目录建一个 `.uv/config.toml`(或者在 `pyproject.toml` 的 tool 段落里配):

```toml
[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
```

**或者**临时指定:

```bash
uv add geopandas --index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### Q2:Windows 下装 GeoPandas 报错,提示 GDAL 找不到

**可能原因**:GDAL 是 C++ 底层库,Windows 下 wheel 兼容性偶尔出问题。

**解决方案**(按推荐顺序):

1. 先试把完整报错贴给 AI,看它给什么针对性建议
2. 升级 uv 到最新版后重试
3. 装 Microsoft C++ Build Tools(visualstudio.microsoft.com 下载 Build Tools)
4. 切换到 WSL2 做开发

### Q3:Jupyter Notebook 在 Cursor 里打不开,或者跑 cell 时报 kernel 错误

**可能原因**:Cursor 没识别到项目的虚拟环境。

**解决方案**:

1. Cursor 菜单:Command Palette(Cmd/Ctrl+Shift+P)→ "Python: Select Interpreter" → 选 `.venv` 里的那个
2. 重启 Cursor
3. 还不行:`uv add ipykernel` 再试

### Q4:`git push` 时提示需要密码或 token

**可能原因**:GitHub 2021 年后已不支持密码登录,必须用 Personal Access Token(PAT)或 SSH 密钥。

**解决方案**:

1. 最简单:GitHub 设置 → Developer settings → Personal access tokens → 生成一个(勾选 repo 权限),复制下来,push 时密码栏粘贴它
2. 更推荐:配 SSH 密钥(一劳永逸)。让 AI 带你做,非常快

### Q5:Cursor 的 AI 回复很慢或提示"rate limit"

**可能原因**:免费额度用完,或高峰期网络拥堵。

**解决方案**:

1. 如果是免费版,考虑订阅 Pro
2. 本书所有代码示例都可以在 claude.ai 网页版或 chatgpt.com 里完成,只是没了项目上下文的自动注入
3. 降低对话频率,合并多个问题为一次提问

### Q6:所有东西看起来装好了,但一跑代码就中文乱码

**可能原因**:Windows 默认的 cp936 编码和 Python 3 的 UTF-8 默认不一致。

**解决方案**:

1. 在 Python 代码开头加 `# -*- coding: utf-8 -*-`(Python 3 其实已不必要,但能让一些工具认对)
2. 读文件时明确指定编码:`open(file, encoding='utf-8')`
3. 读 shapefile 遇到中文字段时,`gpd.read_file(path, encoding='gbk')`

### Q7:我不确定我到底是什么问题

**解决方案**:

1. 把你做了什么、期望什么、实际发生什么,这三件事**写下来**,贴给 AI
2. 附上完整的错误信息(不要截图,要文字)
3. 附上你的操作系统、Python 版本、相关包版本

这种"结构化的求助"是本书后续章节反复要你做的事。出错本身不重要,**学会把问题讲清楚**才重要。

---

## 2.9 小结

本章你做了这些事:

- 选定并安装了 IDE(推荐 Cursor)
- 装好 Python 3.12 + uv + GeoPandas 全家桶
- 装好 Node.js 20 + pnpm
- 学会了 Git 最小必要用法,并把项目推到 GitHub
- 了解了浏览器 DevTools 的五个核心面板
- **完成了本书第一次结构化 Prompt 对话**——让 AI 写环境检查脚本

如果中途某一步报错,但你通过和 AI 对话解决了,**请回头想一下这个过程**。这不是"AI 帮你搞定了一件烦事",这是你**亲身经历了一次完整的 AI 辅助调试**——报错如何描述、上下文如何给、AI 的建议如何验证、修复后如何确认。这个循环会在本书的每一章反复出现。

从下一章开始,你会开始系统学习**如何更高效地和 AI 对话**。环境是静态的,你搭一次用一年;但 Prompt 技巧是动态的,你每次写都会比上次更好。这是本书最值得的学习投资。

---

## 本章延伸阅读

**工具官方文档**(按需查阅即可,不需要通读)

- uv 官方文档 (docs.astral.sh/uv) — Python 包管理的现代替代方案
- pnpm 官方文档 (pnpm.io) — 比 npm 更高效的 Node 包管理器
- Pro Git (git-scm.com/book/zh) — 最权威的 Git 中文书,免费在线阅读

**开发环境相关**

- Julia Evans, *How Git Works*(Wizard Zines 出品,漫画风格的 Git 原理小册子,对理解 Git 的内部机制有奇效)
- *The Missing Semester of Your CS Education*(MIT 出品的短课程,讲授大学不教但工作必需的命令行、Git、调试技能,strongly recommended 给所有编程初学者)

**AI IDE 相关**

- Cursor 官方教程 (cursor.com/learn) — 如果选 Cursor,花 30 分钟过一遍
- GitHub Copilot 学生认证指南 (education.github.com/pack) — 如果是学生,值得申请

---

## 本章习题

**基础**

1. 解释 `uv add geopandas` 背后发生了什么:它和传统的 `pip install geopandas` 相比,做了哪些额外的事?(提示:可以让 AI 帮你解释,但自己要能复述出来)
2. 为什么本书推荐 pnpm 而不是 npm?列出至少两个理由。
3. `git commit` 和 `git push` 分别在什么时候用?一次提交最少需要哪两条命令?

**进阶**

4. 按本章 2.7 节的方法,让 AI 写一个 `check_env.py`,然后**故意卸载一个包**(比如 `uv remove folium`),重新跑脚本,看 ✗ 是不是出现在正确的位置。再装回去验证 ✓ 恢复。
5. 在你的 `gis-ai-learning` 仓库里随便改一些代码,然后用 `git diff` 查看改动,复制给 AI,让它为你生成一条 Conventional Commits 规范的提交信息。记录 AI 产出 vs 你自己能想到的信息的差异。

**挑战**

6. 本章 2.6 节提到"地图不显示时的三步排查流程"(Console → Network → Elements)。请你随便找一个线上的 Leaflet 或 Mapbox 演示页(官方文档里的 live demo 就行),打开 DevTools,**刻意看懂**这三个面板此时显示的内容,并用一张表格记录下来(每个面板你看到了什么、代表什么含义)。这是第 4 章之前你能做的最有价值的准备。
