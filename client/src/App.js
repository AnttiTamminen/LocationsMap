import React,{useState} from "react";
import axios from "axios";
import { Icon } from "leaflet";
import {Alert, Spinner} from "react-bootstrap";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import useSWR from "swr";
import './App.css';

export const iconG = new Icon({
  iconUrl: "green.png",
  iconSize: [25, 45],
  iconAnchor: [13, 45],
  popupAnchor: [0, -35],
});

export const iconB = new Icon({
  iconUrl: "blue.png",
  iconSize: [25, 45],
  iconAnchor: [13, 45],
  popupAnchor: [0, -35],
});

const fetcher = (url) => axios.get(url).then((res) => res.data)

const App = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  const { data, error } = useSWR("http://127.0.0.1:8000/api/v1/locations/", fetcher);
  const locations = data && !error ? data : {};
  const position = [62.6011800, 29.7631600];
  const zoom = 11;

  if (error) {
    return <Alert variant="danger">Problem occured</Alert>;
  }
  if (!data) {
    return (
      <Spinner
        animation="border"
        variant="danger"
        role="status"
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block",
        }}
      />
    );
  }

  // Needs to be updated when user login is complete
  const markerColor = (location) => {
    if (location.properties.name === "Testi1") {
      return iconG
    } else {
      return iconB
    }
  }

  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/
        copyright">OpenStreerMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.features.map((location) =>(
        <Marker
          key={location.properties.name}
          position={[
            location.geometry.coordinates[1],
            location.geometry.coordinates[0],
          ]}
          onClick={() => {
            setActiveLocation(location)
          }}
          icon={markerColor(location)}
        >
          <Popup
            position={[
              location.geometry.coordinates[1],
              location.geometry.coordinates[0],
            ]}
            onClose={() => {
              setActiveLocation(null)
            }}
          >
            <div>
              <h6>{location.properties.name}</h6>
              <p>{location.properties.desc}</p>
              <p>{location.properties.author}</p>
              <p>{location.properties.created}</p>
              <p>{location.properties.updated}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default App;
