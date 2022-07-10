import React from 'react';
import './App.css';
import {MapContainer, TileLayer, useMap } from 'react-leaflet'

import L from 'leaflet';

const mapTextureProps = {
  width: 8000,
  height: 8000,
  maxZoom: 8,
};

type PxPoint = [number, number];

function App() {
  return (
    <div className="App">
        <MapContainer
          minZoom={2}
          zoom={2}
          maxZoom={mapTextureProps.maxZoom}
          crs={L.CRS.Simple}
          >
          <MapTiles />
        </MapContainer>
    </div>
  );
}

function MapTiles() {
  const { map, unproject, project } = useMapProjection();

  // prevent user from going outside map
  const bounds = new L.LatLngBounds(
    unproject([0, mapTextureProps.height]),
    unproject([mapTextureProps.width, 0])
  );
  map.setMaxBounds(bounds);

  // center the map
  map.setView(unproject([
    mapTextureProps.width / 2,
    mapTextureProps.height / 2
  ]), 1);

  map.on('click', function (event) {
    // any position in leaflet needs to be projected to obtain the image coordinates
    console.log('lat/lng', event.latlng);
    console.log('point', project(event.latlng))
  })


  return <>
    <TileLayer
      url="tiles/{z}/{x}/{y}.png"
      bounds={bounds}
      noWrap={true}
    />
  </>;
}

// pixel map project hook

const zoomFactor = Math.ceil(
  Math.log(
    Math.max(mapTextureProps.width, mapTextureProps.height) / 256
  ) / Math.log(2)
);

function useMapProjection() {
  const map = useMap();

  return {
    map,
    unproject: (point: PxPoint) =>  map.unproject(point, zoomFactor),
    project: (latlng: L.LatLng): PxPoint => {
      const point = map.project(latlng, zoomFactor)
      return [point.x, point.y];
    }
  }
}

export default App;
