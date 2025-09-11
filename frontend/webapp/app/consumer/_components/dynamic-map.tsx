"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with webpack
const iconDefault = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;


const positions: Record<string, [number, number]> = {
    farm: [53.3498, -6.2603],
    distributor: [53.3505, -6.2550],
    retailer: [53.3480, -6.2500],
    customer: [53.3458, -6.2450],
  };

const polyline = [
    positions.farm,
    positions.distributor,
    positions.retailer,
    positions.customer,
];

const ProductJourneyMap = () => {
  return (
    <MapContainer center={positions.farm} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       <Marker position={positions.farm}>
        <Popup>Harvest Farms</Popup>
      </Marker>
      <Marker position={positions.distributor}>
        <Popup>Distributor</Popup>
      </Marker>
      <Marker position={positions.retailer}>
        <Popup>Retailer</Popup>
      </Marker>
      <Marker position={positions.customer}>
        <Popup>Customer</Popup>
      </Marker>
      <Polyline positions={polyline} color="green" />
    </MapContainer>
  );
};

export default ProductJourneyMap;
