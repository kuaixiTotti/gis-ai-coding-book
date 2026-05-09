# Screenshots

本目录存放本项目的运行效果截图。

## 命名规范

`fig-ch04-NN-description.png`

- `ch04`:章节号
- `NN`:本章内的图片编号(01, 02, ...)
- `description`:简短英文描述(用连字符分隔)

## 建议截图

- `fig-ch04-01-final-view.png` — 最终版本完整效果
- `fig-ch04-02-basemap-switching.png` — 底图切换效果
- `fig-ch04-03-popup-detail.png` — 点击弹出详情
- `fig-ch04-04-hover-tooltip.png` — 悬停 tooltip 效果
- `fig-ch04-05-devtools-debug.png` — DevTools 调试演示

## 截图前的检查清单

- [ ] 关闭浏览器书签栏(View → Hide Bookmarks Bar)
- [ ] 隐藏所有非必要的扩展图标
- [ ] 检查右上角没有个人头像、登录信息
- [ ] DevTools 截图只截关键面板,不截全屏
- [ ] 分辨率不低于 1920×1080,缩放后清晰可读

## 推荐工具

- **macOS**:`Cmd+Shift+4` 区域截图,`Cmd+Shift+4+空格` 窗口截图
- **Windows**:Win+Shift+S(Snipping Tool)
- **跨平台**:Flameshot、ShareX、CleanShot X

## 优化建议

PNG 图片可以用 `pngquant` 或 `oxipng` 无损压缩:

```bash
# 减小文件体积约 50-70%,视觉无差异
pngquant --quality=80-95 *.png --ext=.png --force
```
