const STYLES = [
  { id: 'streets', name: '街道', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'light', name: '浅色', url: 'mapbox://styles/mapbox/light-v11' },
  { id: 'dark', name: '深色', url: 'mapbox://styles/mapbox/dark-v11' },
];

export default function MapStyleSwitcher({ currentStyle, onStyleChange }) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded shadow-md overflow-hidden z-10">
      {STYLES.map((s) => (
        <button
          key={s.id}
          onClick={() => onStyleChange(s.url)}
          className={`px-3 py-2 text-sm block w-full text-left
                      ${currentStyle === s.url ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'}`}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
