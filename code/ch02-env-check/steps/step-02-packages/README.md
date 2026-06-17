# step-02-packages:加上 Python 包检查

在 step-01 基础上新增**第 2 项检查:GIS 常用 Python 包是否装好**
(geopandas、shapely、folium、matplotlib、jupyter)。

与 step-01 的差异只有一段:多了一个遍历 `packages` 列表、逐个 `__import__`
的循环。这就是 `steps/` 的用法——对比相邻两步的 diff,看清每次加了什么。

## 运行

```bash
uv run python check_env.py
```

## 预期输出(包都装好时)

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
==================================================
🎉 所有检查通过,可以开始学习了!
```

若某个包没装,对应行会变成 ✗,且末尾提示未通过项数——这正是脚本的用途。

## 下一步

`final/` 会加上命令行工具(git、node、pnpm)检查,得到与教材正文完全一致的完整脚本。
