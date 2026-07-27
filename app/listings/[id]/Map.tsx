'use client';

import { SafeListing } from '@/app/types';
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

interface MapProps {
  listing: SafeListing;
}

const centerIcon = L.divIcon({
  html: `<div style="
    width: 36px; height: 36px;
    background: #f96f50;
    border: 3px solid white;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>`,
  className: '',
  iconSize: [46, 46],
  iconAnchor: [18, 18],
});

const Map = ({ listing }: MapProps) => {
  const lat = listing.latitude ?? 32.7767;
  const lng = listing.longitude ?? -96.797;
  const center: [number, number] = [lat, lng];

  return (
    <div className="my-4">
      <MapContainer
        center={[listing.latitude ?? 32.7767, listing.longitude ?? -96.797]}
        zoom={12}
        maxZoom={15}
        zoomControl={true}
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* <CircleMarker
        center={[listing.latitude ?? 32.7767, listing.longitude ?? -96.797]}
        radius={50}
        pathOptions={{
          color: '#f96f50',
          fillColor: '#f96f50',
          fillOpacity: 0.1,
        }}
      /> */}

        <Circle
          center={center}
          radius={300}
          pathOptions={{
            color: '#f96f50',
            fillColor: '#f96f50',
            fillOpacity: 0.15,
            weight: 1.5,
            opacity: 0.4,
          }}
        />

        {/* 중심 아이콘 */}
        <Marker position={center} icon={centerIcon} />
      </MapContainer>
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <MapPin size={14} className="text-orange-400 shrink-0" />
        <span>정확한 위치는 임대인 연락 후 안내됩니다</span>
      </div>
    </div>
  );
};

export default Map;
