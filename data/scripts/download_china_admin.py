"""下载并校验"中国县级行政区划 2024"(天地图,审图号 GS(2024)0650)。

天地图官方平台需登录账号、网页交互下载,没有公开的批量下载接口,
因此无法做成全自动脚本。这里采用"引导下载 + 自动校验"的方式:
- 数据文件不在本地时,打印官方下载步骤后退出;
- 文件就位后,校验要素数量、计算 SHA256,供填入 sources.yaml。

选用天地图官方数据的原因:其边界画法符合国家标准、带审图号,
是教材(尤其将来国内出版)唯一稳妥的行政区划数据源。
详见 data/sources.yaml 的 china-admin-2024 条目。
"""

import hashlib
import json
import sys
from pathlib import Path

# 数据下载到 data/china-admin-2024/(已被 .gitignore 排除,不进仓库)
DATASET_ID = "china-admin-2024"
DATA_DIR = Path(__file__).resolve().parent.parent / DATASET_ID
TARGET_FILE = DATA_DIR / "china-counties-2024.geojson"

# 县级单元的大致数量,用于校验下载的是不是县级数据(而非省级/市级)
EXPECTED_COUNTY_COUNT = 2891
COUNT_TOLERANCE = 200  # 行政区划会微调,留出容差

DOWNLOAD_STEPS = """\
请按以下步骤从天地图官方平台手动下载(需注册并登录天地图账号):

  1. 打开 https://cloudcenter.tianditu.gov.cn/administrativeDivision/
  2. 登录天地图账号(没有则先免费注册)
  3. 进入"数据资源" → "行政区可视化"
  4. 逐级下载到"县级":确认页面标注审图号为 GS(2024)0650、坐标系 GCS_WGS_1984
  5. 下载得到的 GeoJSON 另存为:
     {target}

放好文件后,重新运行本脚本即可自动校验并计算校验和。
""".format(target=TARGET_FILE)


def sha256_of(path: Path) -> str:
    """分块读取计算文件 SHA256,避免大文件一次性读入内存。"""
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def count_features(path: Path) -> int:
    """返回 GeoJSON 的要素数量;文件不是合法 FeatureCollection 时抛错。"""
    with path.open(encoding="utf-8") as fh:
        data = json.load(fh)
    if data.get("type") != "FeatureCollection":
        raise ValueError("不是 FeatureCollection,可能下错了文件类型")
    return len(data.get("features", []))


def main() -> int:
    if not TARGET_FILE.exists():
        # 文件未就位:打印引导步骤,以非零码退出,提示调用方"还没好"
        print(f"[{DATASET_ID}] 未找到数据文件:{TARGET_FILE}\n")
        print(DOWNLOAD_STEPS)
        return 1

    n = count_features(TARGET_FILE)
    checksum = sha256_of(TARGET_FILE)
    size_mb = TARGET_FILE.stat().st_size / (1024 * 1024)

    print(f"[{DATASET_ID}] 校验通过的文件:{TARGET_FILE}")
    print(f"  要素数量:{n}")
    print(f"  文件大小:{size_mb:.1f} MB")
    print(f"  SHA256 :{checksum}")

    # 要素数量明显偏离县级规模时,多半下成了省级/市级,提醒但不报错
    if abs(n - EXPECTED_COUNTY_COUNT) > COUNT_TOLERANCE:
        print(
            f"\n⚠️  要素数量与县级预期({EXPECTED_COUNTY_COUNT} 左右)相差较大,"
            "请确认下载的是县级数据。"
        )

    print(
        "\n下一步:把上面的 size 与 SHA256 填进 "
        "data/sources.yaml 的 china-admin-2024 条目。"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
