"""
环境检查脚本 —— 第 1 步:只检查 Python 版本

这是最小可运行版本:先把"检查 → 记录结果 → 汇总打印"的骨架搭起来,
后续步骤再往 results 列表里加更多检查项。
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
