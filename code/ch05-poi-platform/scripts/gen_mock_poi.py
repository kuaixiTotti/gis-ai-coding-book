"""确定性生成 500 条北京模拟 POI,输出 public/data/beijing-poi.json。

正文 §5.4 让学生"请 AI 直接生成这份 JSON"。配套仓库为了可重现,
改用固定随机种子的脚本生成同样 schema 的数据——内容稳定、可追溯,
学生跟读时仍按正文那样请 AI 生成即可。

schema(与正文 §5.4.2 一致):
  id, name, category, subcategory, lon, lat, rating, desc, open_time
类别分布:餐饮 40% / 购物 25% / 教育 15% / 医疗 10% / 交通 10%
范围:北京六环内,lon 116.15–116.65,lat 39.75–40.05
"""

import json
import random
from pathlib import Path

SEED = 20240517          # 固定种子,保证每次生成完全一致
TOTAL = 500
LON_RANGE = (116.15, 116.65)
LAT_RANGE = (39.75, 40.05)

# 类别 → (占比, 子类列表, 店名候选词)
CATEGORIES = {
    "餐饮": (0.40, ["火锅", "快餐", "咖啡", "面馆", "烧烤", "西餐"],
             ["海底捞", "西贝", "星巴克", "肯德基", "麦当劳", "瑞幸", "庆丰", "眉州东坡"]),
    "购物": (0.25, ["超市", "商场", "便利店", "服饰", "数码"],
             ["华联", "物美", "永辉", "苏宁", "京东之家", "优衣库", "无印良品"]),
    "教育": (0.15, ["小学", "中学", "培训", "图书馆", "大学"],
             ["新东方", "学而思", "北京一中", "海淀实验", "市图书馆"]),
    "医疗": (0.10, ["医院", "诊所", "药店", "社区卫生"],
             ["协和", "同仁", "海淀医院", "国大药房", "社区卫生站"]),
    "交通": (0.10, ["地铁站", "公交站", "停车场", "加油场"],
             ["地铁站", "公交枢纽", "P+R 停车场", "中石化加油"]),
}

SUFFIXES = ["(中关村店)", "(国贸店)", "(西单店)", "(望京店)", "(三里屯店)",
            "(亚运村店)", "(五道口店)", "(金融街店)", "", ""]
OPEN_TIMES = ["9:00-22:00", "10:00-22:00", "8:00-21:00", "24 小时",
              "9:30-21:30", "7:00-23:00"]


def build_records() -> list[dict]:
    rng = random.Random(SEED)
    records: list[dict] = []
    pid = 1
    for category, (ratio, subs, names) in CATEGORIES.items():
        count = round(TOTAL * ratio)
        for _ in range(count):
            name = rng.choice(names) + rng.choice(SUFFIXES)
            records.append({
                "id": pid,
                "name": name,
                "category": category,
                "subcategory": rng.choice(subs),
                "lon": round(rng.uniform(*LON_RANGE), 5),
                "lat": round(rng.uniform(*LAT_RANGE), 5),
                "rating": round(rng.uniform(3.0, 5.0), 1),
                "desc": f"{name}，{category}类{rng.choice(subs)}场所。",
                "open_time": rng.choice(OPEN_TIMES),
            })
            pid += 1
    # 占比取整后可能差几条,用餐饮补足到正好 TOTAL
    while len(records) < TOTAL:
        records.append(dict(records[0], id=len(records) + 1))
    return records[:TOTAL]


def main() -> None:
    # master 数据放项目 data/(仓库约定的"项目专用数据");
    # 各 step 运行时用的副本在各自的 public/data/ 下。
    out = Path(__file__).resolve().parent.parent / "data" / "beijing-poi.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    records = build_records()
    out.write_text(
        json.dumps(records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"已生成 {len(records)} 条 → {out}")


if __name__ == "__main__":
    main()
