---
id: CH04-002
title: 给 Leaflet 地图加多底图切换控件
chapter: 4
task_type: frontend-mapping
difficulty: basic
last_verified: "TODO:作者确认实际验证日期"
verified_models: []  # TODO:作者填写实际验证过的模型
---

## 场景

已有一张可运行的 Leaflet 地图(见 [CH04-001](CH04-001-first-leaflet-map.md)),
想加一个右上角的底图切换控件,在 OSM、高德、卫星、深色等底图之间切换。
对应配套项目 step-02。

## Prompt 模板

```
给 index.html 加一个底图切换控件,提供以下底图:

1. OpenStreetMap(默认)
2. 高德地图(URL 模板:
   https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}
   subdomains 为 ['1','2','3','4'])
3. 高德卫星图(URL 模板:
   https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z})
4. {其他底图:名称 + URL 模板}

切换控件放在地图{位置,如右上角}。
```

## 变体

- **只要两三种底图**:删掉不需要的条目即可。
- **想要带预览缩略图的切换器**:追加"切换控件每项配一个小预览图"。

## 常见问题

- **给完整 URL 模板,不要只说"用高德地图"**——后者会让 AI 猜 URL,十有八九
  猜错。把 `{s}/{x}/{y}/{z}` 占位的完整模板贴给它最可靠。
- 切到高德底图后,中国境内位置可能往西南偏移几百米:这是 WGS84 与 GCJ-02
  坐标系差异,不是 bug;本章不处理,第 8 章系统讲。

## 示例输出

见配套快照 `code/ch04-leaflet-campus/steps/step-02-basemap/index.html`。
