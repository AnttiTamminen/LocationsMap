import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import './App.css';

const App = () => {
  return (
    <MapContainer center={[62.6011800, 29.7631600]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/
        copyright">OpenStreerMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default App;
