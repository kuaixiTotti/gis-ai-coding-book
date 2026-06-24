export default function DetailPanel({ poi, onClose }) {
  if (!poi) return null;

  // poi 可能来自两条路径:侧边栏(原始对象,坐标是数字)或地图点击
  // (Mapbox feature.properties,坐标可能是字符串)。统一用 Number 兜底,
  // 避免对字符串调用 .toFixed 报错。
  const lon = Number(poi.lon);
  const lat = Number(poi.lat);
  const coordText =
    Number.isFinite(lon) && Number.isFinite(lat)
      ? `${lon.toFixed(5)}, ${lat.toFixed(5)}`
      : `${poi.lon}, ${poi.lat}`;

  return (
    <div
      className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl
                 z-10 transition-transform duration-300 p-6 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold pr-8">{poi.name}</h2>
      <div className="mt-1 text-sm text-gray-500">
        {poi.category} · {poi.subcategory}
      </div>

      <div className="mt-4 flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={
              i < Math.round(Number(poi.rating))
                ? 'text-yellow-400'
                : 'text-gray-300'
            }
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm">{poi.rating}</span>
      </div>

      <p className="mt-4 text-sm text-gray-700">{poi.desc}</p>

      <div className="mt-4 pt-4 border-t text-xs text-gray-500 space-y-1">
        <div>营业时间:{poi.open_time}</div>
        <div>坐标:{coordText}</div>
      </div>
    </div>
  );
}
