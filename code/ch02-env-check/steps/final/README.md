# final:完整的环境检查脚本

教材正文 §2.7 中那段 `check_env.py` 的完整版,逐字与书一致。在 step-02
基础上新增**第 3 项检查:命令行工具**(git、node、pnpm),并完善汇总输出。

四项检查:
1. Python 版本 ≥ 3.12
2. Python 包:geopandas、shapely、folium、matplotlib、jupyter
3. 命令行工具:git、node、pnpm(并打印各自版本号)
4. 汇总:全通过则庆祝,否则提示未通过项数

## 运行

```bash
uv run python check_env.py
```

## 预期输出(全部装好时)

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

任何一行是 ✗,把那一行连同你的操作系统贴给 AI,问它怎么修。
