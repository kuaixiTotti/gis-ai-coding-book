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
