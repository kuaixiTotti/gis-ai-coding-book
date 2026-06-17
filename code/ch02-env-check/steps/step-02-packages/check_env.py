"""
环境检查脚本 —— 第 2 步:加上 Python 包检查

在 step-01 的基础上,新增对 GIS 常用 Python 包的检查:
逐个尝试 import,装了就记 ✓,没装就记 ✗。
"""
import sys

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
# 用 __import__ 按名字动态导入,免去为每个包写一行 import
packages = ["geopandas", "shapely", "folium", "matplotlib", "jupyter"]
for pkg in packages:
    try:
        __import__(pkg)
        results.append(("✓", f"Python 包:{pkg}"))
    except ImportError:
        results.append(("✗", f"Python 包未装:{pkg}"))

# ─── 打印汇总 ───────────────────────────────────────
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
