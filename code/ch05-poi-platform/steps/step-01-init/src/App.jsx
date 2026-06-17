import { useEffect, useState } from 'react';

// step-01:只做"加载数据 + 显示条数",验证整个项目骨架跑得通。
// 地图、侧边栏等留到后面的 step。
function App() {
  const [pois, setPois] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // public 目录的文件在 URL 根路径下直接可访问
    fetch('/data/beijing-poi.json')
      .then((res) => res.json())
      .then((data) => {
        setPois(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('加载 POI 数据失败:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">加载中...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">北京 POI 平台</h1>
      <p className="text-gray-600">共加载 {pois.length} 条 POI 数据</p>
    </div>
  );
}

export default App;
