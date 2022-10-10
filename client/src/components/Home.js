import React, { useState } from "react";
import axios from "axios";
import { Icon } from "leaflet";
import {Alert, Spinner} from "react-bootstrap";
import {MapContainer, TileLayer, Marker, Popup, FeatureGroup} from "react-leaflet";
import useSWR from "swr";
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';
import DataService from "../services/dataService";

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

delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "green.png",
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

    const _onCreate = (e) => {
      if (localStorage.user) {
        DataService.create({author: JSON.parse(localStorage.getItem('user')).user.username, 
        userid: JSON.parse(localStorage.getItem('user')).user.id,
        lat: e.layer._latlng.lat, 
        lng: e.layer._latlng.lng}).then(
          () => {
            window.location.reload();
          });
      } else {
        window.location.reload()
      }
    }

    const _onDelete = (e) => {
      const id = String(Object.values(e.layers._layers)[0].options.layerID)
      console.log(id)
      if (localStorage.user) {
          DataService.delete(id).then(
            window.location.reload()
          )
      } else {
        window.location.reload()
      }
    }

    const _onEdit = (e) => {
      const id = String(Object.values(e.layers._layers)[0].options.layerID)+'/'
      const lat = Object.values(e.layers._layers)[0]._latlng.lat
      const lng = Object.values(e.layers._layers)[0]._latlng.lng
      if (localStorage.user) {
        DataService.update(id, lat, lng).then(
          window.location.reload()
        )
      } else {
        window.location.reload()
      }
    }
  
    return (
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/
          copyright">OpenStreerMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
        {locations.filter(function (e) {
          if (localStorage.user) {
            return e.author != JSON.parse(localStorage.getItem('user')).user.username;
          } else {
            return e;
          }
          }).map((location) =>(
          <Marker
            key={location.id}
            position={[
              location.lat,
              location.lng,
            ]}
            onClick={() => {
              setActiveLocation(location)
            }}
            icon={iconB}
            layerID={location.id}
          >
            <Popup
              position={[
                location.lat,
                location.lng,
              ]}
              onClose={() => {
                setActiveLocation(null)
              }}
            >
              <div>
                <p>Author: {location.author}</p>
                <p>Created: {location.created.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
                <p>Updated: {location.updated.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        </FeatureGroup>
        <FeatureGroup>
        {locations.filter(function (e) {
          if (localStorage.user) {
            return e.author == JSON.parse(localStorage.getItem('user')).user.username;
          } else {
            return e.created == null;
          }
          }).map((location) =>(
          <Marker
            key={location.id}
            position={[
              location.lat,
              location.lng,
            ]}
            onClick={() => {
              setActiveLocation(location)
            }}
            icon={iconG}
            layerID={location.id}
          >
            <Popup
              position={[
                location.lat,
                location.lng,
              ]}
              onClose={() => {
                setActiveLocation(null)
              }}
            >
              <div>
                <h6>{location.name}</h6>
                <p>{location.desc}</p>
                <p>Author: {location.author}</p>
                <p>Created: {location.created.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
                <p>Updated: {location.updated.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p>
              </div>
            </Popup>
          </Marker>
        ))}
            <EditControl 
                position="topleft"
                onCreated={_onCreate}
                onEdited={_onEdit}
                onDeleted={_onDelete}
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
