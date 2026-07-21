'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SafeListing } from '@/app/types';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface MapProps {
  listings: SafeListing[];
  selectedId: string | null;
  onMarkerClick: (id: string | null) => void;
  onMarkerHover: (id: string | null) => void;
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

const MapComponent = ({
  listings,
  selectedId,
  onMarkerClick,
  onMarkerHover,
}: MapProps) => {
  const createPriceIcon = (price: number, isSelected: boolean) =>
    L.divIcon({
      className: '',
      html: `<div style="
        display: inline-block;
        background: ${isSelected ? '#b63d29' : '#f96f50'};
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
      {listings.map((listing) => {
        if (listing.latitude == null || listing.longitude == null) return null;

        return (
          <Marker
            key={listing.id}
            position={[listing.latitude!, listing.longitude!]}
            icon={createPriceIcon(
              listing.rent_price,
              selectedId === listing.id,
            )}
            eventHandlers={{
              click: () => onMarkerClick(listing.id),
              mouseover: () => onMarkerHover(listing.id),
              mouseout: () => onMarkerHover(null),
            }}
          >
            <Popup offset={[25, 0]}>
              <div className="flex flex-col   bg-white w-64 overflow-hidden cursor-pointer">
                <div className="relative w-full h-40">
                  <img
                    src={listing.listing_photos?.[0]?.url || '/placeholder.jpg'}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      ${Number(listing.rent_price).toLocaleString()}
                    </span>
                    <Heart
                      size={22}
                      className="text-gray-400 hover:text-primary cursor-pointer"
                    />
                  </div>
                  {/* 방 타입 */}
                  <div className="text-sm text-gray-500">
                    {listing.room_type}
                  </div>
                  {/* 제목 */}
                  <div className="text-sm font-medium text-gray-800 ">
                    {listing.title}
                  </div>
                  {/* 위치 */}
                  <div className="text-xs text-gray-400 truncate">
                    {listing.city}, TX
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
