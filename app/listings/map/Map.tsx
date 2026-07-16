'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SafeListing } from '@/app/types';

interface MapProps {
  listings: SafeListing[];
  selectedId: string | null;
  onMarkerClick: (id: string | null) => void;
}

const createPriceIcon = (price: number) =>
  L.divIcon({
    className: '',
    html: `<div style="
      display: inline-block;
      background: #f96f50;
      color: white;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 500;
      white-space: nowrap;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    ">$${price}</div>`,
    iconSize: [0, 0],
  });

const MapComponent = ({ listings, selectedId, onMarkerClick }: MapProps) => {
  console.log(listings);
  return (
    <MapContainer
      center={[32.7767, -96.797]}
      zoom={10}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude!, listing.longitude!]}
          icon={createPriceIcon(listing.rent_price)}
          eventHandlers={{
            click: () => onMarkerClick(listing.id),
          }}
        ></Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
