// 类别 → 颜色,与地图圆点配色保持一致
const CATEGORY_COLORS = {
  '餐饮': '#e74c3c',
  '购物': '#f39c12',
  '教育': '#3498db',
  '医疗': '#2ecc71',
  '交通': '#9b59b6',
};

export default function Sidebar({
  filteredPois,
  activeCategories,
  onToggleCategory,
  searchText,
  onSearchChange,
  selectedPoi,
  onPoiSelect,
  viewMode,
  onViewModeChange,
  isOpen,
  onClose,
}) {
  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-20 w-80 bg-white
                  border-r border-gray-200 flex flex-col
                  transform transition-transform duration-300
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                  md:translate-x-0`}
    >
      {/* 标题(移动端带关闭按钮)*/}
      <div className="p-4 border-b flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">北京 POI 平台</h1>
          <p className="text-xs text-gray-500 mt-1">{filteredPois.length} 个结果</p>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-gray-600 text-xl leading-none"
          aria-label="关闭侧边栏"
        >
          ✕
        </button>
      </div>

      {/* 视图模式:散点 / 热力 */}
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">视图</h2>
        <div className="flex rounded overflow-hidden border border-gray-300 text-sm">
          {[
            { id: 'points', name: '散点图' },
            { id: 'heat', name: '热力图' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => onViewModeChange(m.id)}
              className={`flex-1 py-1.5 ${
                viewMode === m.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* 类别筛选 */}
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">类别</h2>
        <div className="space-y-1">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <label
              key={cat}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="checkbox"
                checked={activeCategories.has(cat)}
                onChange={() => onToggleCategory(cat)}
                className="mr-2"
              />
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 搜索框 */}
      <div className="p-4 border-b">
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜索店铺名"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* POI 列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredPois.map((poi) => (
          <div
            key={poi.id}
            onClick={() => onPoiSelect(poi)}
            className={`p-3 border-b cursor-pointer hover:bg-gray-50
                        ${selectedPoi?.id === poi.id ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{poi.name}</span>
              <span className="text-xs text-yellow-600">★ {poi.rating}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">{poi.category}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
