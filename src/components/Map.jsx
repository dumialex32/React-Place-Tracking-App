import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { getCurrentPosition } from "./helpers";
import { useEffect, useState } from "react";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPosition, setCurrentPosition] = useState([]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(currentPosition);

  const position = [51.505, -0.09];

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
