import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import DetailPanel from './components/DetailPanel';
import MapStyleSwitcher from './components/MapStyleSwitcher';

const ALL_CATEGORIES = ['餐饮', '购物', '教育', '医疗', '交通'];
const DEFAULT_STYLE = 'mapbox://styles/mapbox/streets-v12';

// step-05:加热力图切换 + 移动端响应式(抽屉侧边栏、底部详情卡片)。
function App() {
  const [pois, setPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [activeCategories, setActiveCategories] = useState(new Set(ALL_CATEGORIES));
  const [searchText, setSearchText] = useState('');
  const [mapStyle, setMapStyle] = useState(DEFAULT_STYLE);
  const [viewMode, setViewMode] = useState('points'); // 'points' | 'heat'
  const [sidebarOpen, setSidebarOpen] = useState(false); // 仅移动端抽屉用

  useEffect(() => {
    fetch('/data/beijing-poi.json')
      .then((res) => res.json())
      .then(setPois)
      .catch((err) => console.error('加载 POI 数据失败:', err));
  }, []);

  const filteredPois = pois.filter((p) => {
    const categoryMatch = activeCategories.has(p.category);
    const searchMatch =
      searchText === '' ||
      p.name.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  // 移动端点了列表项,选中后顺手收起抽屉,好看清地图
  const handlePoiSelect = (poi) => {
    setSelectedPoi(poi);
    setSidebarOpen(false);
  };

  return (
    <div className="w-screen h-screen flex relative">
      <Sidebar
        filteredPois={filteredPois}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedPoi={selectedPoi}
        onPoiSelect={handlePoiSelect}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 移动端:抽屉打开时的半透明遮罩,点一下关闭 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 relative">
        {/* 移动端汉堡按钮,桌面端隐藏 */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden absolute top-4 left-4 z-10 bg-white rounded shadow-md
                     w-10 h-10 flex items-center justify-center text-xl"
          aria-label="打开侧边栏"
        >
          ☰
        </button>

        <MapView
          pois={filteredPois}
          selectedPoi={selectedPoi}
          mapStyle={mapStyle}
          viewMode={viewMode}
          onPoiClick={setSelectedPoi}
        />
        <MapStyleSwitcher currentStyle={mapStyle} onStyleChange={setMapStyle} />
        <DetailPanel poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
      </main>
    </div>
  );
}

export default App;
