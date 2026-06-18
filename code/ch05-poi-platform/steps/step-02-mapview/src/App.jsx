import { useEffect, useState } from 'react';
import MapView from './components/MapView';

// step-02:把 step-01 加载的数据交给 MapView,在地图上按类别着色显示。
// 点击点会把 selectedPoi 存起来(本步先存着,详情面板在 step-04 做)。
function App() {
  const [pois, setPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);

  useEffect(() => {
    fetch('/data/beijing-poi.json')
      .then((res) => res.json())
      .then(setPois)
      .catch((err) => console.error('加载 POI 数据失败:', err));
  }, []);

  // 本步暂时把选中结果打到控制台,验证点击回调通了
  useEffect(() => {
    if (selectedPoi) console.log('选中 POI:', selectedPoi);
  }, [selectedPoi]);

  return (
    <div className="w-screen h-screen flex">
      <main className="flex-1 relative">
        <MapView pois={pois} onPoiClick={setSelectedPoi} />
      </main>
    </div>
  );
}

export default App;
