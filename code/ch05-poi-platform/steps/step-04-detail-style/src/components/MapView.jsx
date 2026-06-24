import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const DEFAULT_STYLE = 'mapbox://styles/mapbox/streets-v12';

// 按类别着色的表达式,抽成常量,初始化和切换底图都复用
const CATEGORY_COLOR = [
  'match',
  ['get', 'category'],
  '餐饮', '#e74c3c',
  '购物', '#f39c12',
  '教育', '#3498db',
  '医疗', '#2ecc71',
  '交通', '#9b59b6',
  '#95a5a6',
];

export default function MapView({ pois, selectedPoi, mapStyle, onPoiClick }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  // 用 ref 存最新值,供事件回调 / 切换底图后重建图层时读取,避免闭包拿到旧值
  const poisRef = useRef(pois);
  const selectedRef = useRef(selectedPoi);
  const onClickRef = useRef(onPoiClick);
  poisRef.current = pois;
  selectedRef.current = selectedPoi;
  onClickRef.current = onPoiClick;
  // setStyle 会清空所有自定义图层。切换底图时需要在 style.load 后重建,
  // 而初始化已用初始 style,所以首次不触发切换。
  const styleInitedRef = useRef(false);

  // 根据当前 selectedPoi 重新下发高亮(paint 表达式不会随状态自动更新)
  const applyHighlight = (map) => {
    if (!map.getLayer('poi-circles')) return;
    const id = selectedRef.current?.id ?? -1;
    map.setPaintProperty('poi-circles', 'circle-radius', [
      'case', ['==', ['get', 'id'], id], 12, 6,
    ]);
    map.setPaintProperty('poi-circles', 'circle-stroke-color', [
      'case', ['==', ['get', 'id'], id], '#fbbf24', '#fff',
    ]);
    map.setPaintProperty('poi-circles', 'circle-stroke-width', [
      'case', ['==', ['get', 'id'], id], 3, 1.5,
    ]);
  };

  // 把当前 pois 加成 source + layer + 事件;初始化与切底图后都用它
  const addPoiLayer = (map) => {
    const geojson = {
      type: 'FeatureCollection',
      features: poisRef.current.map((p) => ({
        type: 'Feature',
        properties: { ...p },
        geometry: { type: 'Point', coordinates: [p.lon, p.lat] },
      })),
    };

    if (map.getSource('pois')) {
      map.getSource('pois').setData(geojson);
    } else {
      map.addSource('pois', { type: 'geojson', data: geojson });
    }

    if (!map.getLayer('poi-circles')) {
      map.addLayer({
        id: 'poi-circles',
        type: 'circle',
        source: 'pois',
        paint: {
          'circle-radius': 6,
          'circle-color': CATEGORY_COLOR,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#fff',
        },
      });
      map.on('click', 'poi-circles', (e) => {
        onClickRef.current?.(e.features[0].properties);
      });
      map.on('mouseenter', 'poi-circles', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'poi-circles', () => {
        map.getCanvas().style.cursor = '';
      });
    }

    applyHighlight(map);
  };

  const whenStyleReady = (map, fn) => {
    if (map.isStyleLoaded()) fn();
    else map.once('styledata', fn);
  };

  // ─── 初始化(仅一次)─────────────────────────
  useEffect(() => {
    if (mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle || DEFAULT_STYLE,
      center: [116.4074, 39.9042],
      zoom: 10,
    });
    mapRef.current = map;
    whenStyleReady(map, () => addPoiLayer(map));
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ─── pois 变化:更新数据 ─────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    whenStyleReady(map, () => addPoiLayer(map));
  }, [pois]);

  // ─── selectedPoi 变化:高亮 + 飞过去 ─────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    whenStyleReady(map, () => applyHighlight(map));
    if (selectedPoi) {
      map.flyTo({
        center: [Number(selectedPoi.lon), Number(selectedPoi.lat)],
        zoom: 15,
        duration: 1000,
      });
    }
  }, [selectedPoi]);

  // ─── mapStyle 变化:切底图并重建图层 ─────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapStyle) return;
    // 首次跳过:初始化时已用该 style 建图,无需再 setStyle
    if (!styleInitedRef.current) {
      styleInitedRef.current = true;
      return;
    }
    map.setStyle(mapStyle);
    // setStyle 清空了自定义图层,等新样式加载完重新加回去
    map.once('style.load', () => addPoiLayer(map));
  }, [mapStyle]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
