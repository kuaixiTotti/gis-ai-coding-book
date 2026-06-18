import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// token 从环境变量读取,绝不硬编码进代码(见 .env.example)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({ pois, onPoiClick }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // ─── 地图初始化(仅一次)──────────────────────
  // 用 ref 存 map 实例而不是 state:map 不参与渲染,
  // 存进 state 会引发不必要的重渲染。
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [116.4074, 39.9042],
      zoom: 10,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ─── POI 数据变化时,重新渲染点 ──────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !pois.length) return;

    const addLayers = () => {
      // 把 POI 数组转成 GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: pois.map((p) => ({
          type: 'Feature',
          properties: { ...p },
          geometry: {
            type: 'Point',
            coordinates: [p.lon, p.lat],
          },
        })),
      };

      // 已有 source 就更新数据,没有就新建图层
      if (map.getSource('pois')) {
        map.getSource('pois').setData(geojson);
        return;
      }

      map.addSource('pois', { type: 'geojson', data: geojson });

      // 按类别着色的圆点图层
      map.addLayer({
        id: 'poi-circles',
        type: 'circle',
        source: 'pois',
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'match',
            ['get', 'category'],
            '餐饮', '#e74c3c',
            '购物', '#f39c12',
            '教育', '#3498db',
            '医疗', '#2ecc71',
            '交通', '#9b59b6',
            '#95a5a6', // 默认颜色
          ],
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#fff',
        },
      });

      // 点击 POI:把该要素的属性回传给父组件
      map.on('click', 'poi-circles', (e) => {
        onPoiClick?.(e.features[0].properties);
      });

      // 悬停时把光标变成手型,提示可点击
      map.on('mouseenter', 'poi-circles', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'poi-circles', () => {
        map.getCanvas().style.cursor = '';
      });
    };

    // 样式可能还没加载完,没加载完就等 styledata 事件
    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.once('styledata', addLayers);
    }
  }, [pois, onPoiClick]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
