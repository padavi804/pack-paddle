import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import * as React from 'react';
import './Leaflet.css';
import L from 'leaflet';

function Leaflet({ }) {

  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the Leaflet map when the component mounts
    const map = L.map(mapRef.current).setView([47.869870, -90.885780], 13); // Use proper coordinates (lat, lon)

    // Add OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    var marker = L.marker([47.869870, -90.885780]).addTo(map); // Use proper coordinates (lat, lon)

    // Cleanup the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <div ref={mapRef} id="map" className="map">

      </div>
    </div>
  );
}

export default Leaflet;