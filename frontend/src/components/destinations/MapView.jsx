import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customIcon = L.divIcon({
  className: '',
  html: `<div style="background:#DC143C;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function MapView({ destinations = [], center = [28.3949, 84.1240], zoom = 7, height = '400px' }) {
  return (
    <div style={{ height, borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map(dest => {
          const coords = dest.location?.coordinates;
          if (!coords || coords.length < 2) return null;
          return (
            <Marker key={dest._id} position={[coords[1], coords[0]]} icon={customIcon}>
              <Popup>
                <div className="p-1">
                  {dest.coverImage && <img src={dest.coverImage} alt={dest.title} className="w-full h-24 object-cover rounded-lg mb-2" />}
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{dest.title}</h3>
                  <p className="text-gray-500 text-xs mb-2">{dest.region}</p>
                  <a href={`/destinations/${dest.slug || dest._id}`} className="text-primary-600 text-xs font-medium hover:underline">View Details →</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
