import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';

const ALL_CATEGORIES = ['餐饮', '购物', '教育', '医疗', '交通'];

// step-03:加侧边栏(类别筛选 + 搜索 + 列表),与地图联动,选中 POI 高亮飞入。
function App() {
  const [pois, setPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [activeCategories, setActiveCategories] = useState(new Set(ALL_CATEGORIES));
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('/data/beijing-poi.json')
      .then((res) => res.json())
      .then(setPois)
      .catch((err) => console.error('加载 POI 数据失败:', err));
  }, []);

  // filteredPois 是派生值——能从 pois + 筛选条件算出来,就不另存 state
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

  return (
    <div className="w-screen h-screen flex">
      <Sidebar
        filteredPois={filteredPois}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedPoi={selectedPoi}
        onPoiSelect={setSelectedPoi}
      />
      <main className="flex-1 relative">
        <MapView
          pois={filteredPois}
          selectedPoi={selectedPoi}
          onPoiClick={setSelectedPoi}
        />
      </main>
    </div>
  );
}

export default App;
