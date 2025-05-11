'use client';

import { useBookings } from '@/hooks/useBookings';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

// 修复 Leaflet 默认图标问题
const icon = new Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function Map() {
  const { bookings } = useBookings();

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[-27.4698, 153.0251]} // 布里斯班市中心坐标
        zoom={12}
        className="w-full h-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {bookings?.results.map((booking) => {
          if (!booking.latitude || !booking.longitude) return null;
          
          return (
            <Marker
              key={`${booking.title}-${booking.start}`}
              position={[booking.latitude, booking.longitude]}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-base">{booking.title}</h3>
                  <p className="text-sm text-gray-600">
                    {booking.address}
                  </p>
                  {booking.foodTruckDetails && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm">
                        <span className="font-semibold">Food Truck:</span>{' '}
                        {booking.foodTruckDetails.name}
                      </p>
                      {booking.foodTruckDetails.category && (
                        <p className="text-sm text-gray-600">
                          {booking.foodTruckDetails.category}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
} 