import React, { useState } from "react";
import axios from "axios";
import { Icon } from "leaflet";
import {Alert, Spinner} from "react-bootstrap";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup} from "react-leaflet";
import useSWR from "swr";
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "green.png",
    iconSize: [25, 45],
    iconAnchor: [13, 45],
    popupAnchor: [0, -35],
  });

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
  
const Home = () => {
    const [activeLocation, setActiveLocation] = useState(null);
  
    const { data, error } = useSWR("http://127.0.0.1:8000/api/locations/", fetcher);
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
  
    return (
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/
          copyright">OpenStreerMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
        {locations.features.filter(function (e) {
          return e.properties.name != 'Testi1';
          }).map((location) =>(
          <Marker
            key={location.properties.name}
            position={[
              location.geometry.coordinates[1],
              location.geometry.coordinates[0],
            ]}
            onClick={() => {
              setActiveLocation(location)
            }}
            icon={iconB}
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
                <p>Author: {location.properties.author}</p>
                <p>Created: {location.properties.created.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
                <p>Updated: {location.properties.updated.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        </FeatureGroup>
        <FeatureGroup>
        {locations.features.filter(function (e) {
          return e.properties.name == 'Testi1';
          }).map((location) =>(
          <Marker
            key={location.properties.name}
            position={[
              location.geometry.coordinates[1],
              location.geometry.coordinates[0],
            ]}
            onClick={() => {
              setActiveLocation(location)
            }}
            icon={iconG}
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
                <p>Author: {location.properties.author}</p>
                <p>Created: {location.properties.created.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
                <p>Updated: {location.properties.updated.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
              </div>
            </Popup>
          </Marker>
        ))}
            <EditControl 
                position="topleft"
                // onCreated={_onCreate} REMEMBER TO PREVENT if not authenticated
                // onEdited={_onEdit}
                // onDeleted={_onDelete}
                draw={{
                    rectangle: false,
                    polygon: false,
                    circle: false,
                    polyline: false,
                    circlemarker: false,
                }} 
            />
        </FeatureGroup>
      </MapContainer>
    );
};

export default Home;
