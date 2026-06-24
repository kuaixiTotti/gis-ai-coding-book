import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// token 从环境变量读取,绝不硬编码进代码(见 .env.example)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({ pois, selectedPoi, onPoiClick }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // ─── 地图初始化(仅一次)──────────────────────
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
      const geojson = {
        type: 'FeatureCollection',
        features: pois.map((p) => ({
          type: 'Feature',
          properties: { ...p },
          geometry: { type: 'Point', coordinates: [p.lon, p.lat] },
        })),
      };

      if (map.getSource('pois')) {
        map.getSource('pois').setData(geojson);
        return;
      }

      map.addSource('pois', { type: 'geojson', data: geojson });
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
            '#95a5a6',
          ],
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#fff',
        },
      });

      map.on('click', 'poi-circles', (e) => {
        onPoiClick?.(e.features[0].properties);
      });
      map.on('mouseenter', 'poi-circles', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'poi-circles', () => {
        map.getCanvas().style.cursor = '';
      });
    };

    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.once('styledata', addLayers);
    }
  }, [pois, onPoiClick]);

  // ─── 选中的 POI:飞过去 + 高亮 ────────────────
  // 关键:paint 表达式在 addLayer 后不会随 React 状态自动更新,
  // 必须在 selectedPoi 变化时主动 setPaintProperty 重新下发。
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const apply = () => {
      if (!map.getLayer('poi-circles')) return;
      const selectedId = selectedPoi?.id ?? -1;

      // 选中的点:半径 12、描边金色;其余维持原样
      map.setPaintProperty('poi-circles', 'circle-radius', [
        'case',
        ['==', ['get', 'id'], selectedId], 12,
        6,
      ]);
      map.setPaintProperty('poi-circles', 'circle-stroke-color', [
        'case',
        ['==', ['get', 'id'], selectedId], '#fbbf24',
        '#fff',
      ]);
      map.setPaintProperty('poi-circles', 'circle-stroke-width', [
        'case',
        ['==', ['get', 'id'], selectedId], 3,
        1.5,
      ]);
    };

    if (map.isStyleLoaded()) apply();
    else map.once('styledata', apply);

    // 选中时平滑飞过去
    if (selectedPoi) {
      map.flyTo({
        center: [Number(selectedPoi.lon), Number(selectedPoi.lat)],
        zoom: 15,
        duration: 1000,
      });
    }
  }, [selectedPoi]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
