import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvent,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";

const mapTextureProps = {
  width: 8000,
  height: 8000,
  maxZoom: 8,
};

const metersPerPoint = 500;

type PxPoint = [number, number];

function App() {
  return (
    <div className="App">
      <MapContainer
        minZoom={2}
        zoom={2}
        maxZoom={mapTextureProps.maxZoom}
        crs={L.CRS.Simple}
        className="map"
        id="map"
      >
        <ZoomControl />
        <MapTiles />
        <MapScale />
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
  map.setView(
    unproject([mapTextureProps.width / 2, mapTextureProps.height / 2]),
    1
  );

  map.on("click", function (event) {
    // any position in leaflet needs to be projected to obtain the image coordinates
    console.log("lat/lng", event.latlng);
    console.log("point", project(event.latlng));
  });

  return (
    <>
      <TileLayer url="tiles/{z}/{x}/{y}.png" bounds={bounds} noWrap={true} />
    </>
  );
}
const scaleBarWidth = 100;

function MapScale() {
  const { map } = useMapProjection();
  const [zoom, setZoom] = useState(2);

  useMapEvent("zoom", (e) => {
    setZoom(map.getZoom());
  });

  const { meters } = useRecalculateScale(zoom);

  return (
    <div className="scale" id="scale" style={{ width: scaleBarWidth }}>
      {meters * scaleBarWidth} m
    </div>
  );
}

// pixel map project hook

const zoomFactor = Math.ceil(
  Math.log(Math.max(mapTextureProps.width, mapTextureProps.height) / 256) /
    Math.log(2)
);

function useMapProjection() {
  const map = useMap();

  return {
    map,
    unproject: (point: PxPoint): L.LatLng => map.unproject(point, zoomFactor),
    project: (latlng: L.LatLng): PxPoint => {
      const point = map.project(latlng, zoomFactor);
      return [point.x, point.y];
    },
  };
}

// recalculates map scale

function useRecalculateScale(zoom: number) {
  const { map, project } = useMapProjection();
  const [meters, setMeters] = useState(0);

  useEffect(() => {
    const scaleBarDistance = pointsHorizontalDistance(
      project(map.containerPointToLatLng([0, 0])),
      project(map.containerPointToLatLng([scaleBarWidth, 0]))
    );

    const pointsPerPixel = scaleBarDistance / scaleBarWidth;

    setMeters(pointsPerPixel * metersPerPoint);
  }, [map, project, zoom]);

  return { meters };
}

// calculates distance between points coordinates on X axis

function pointsHorizontalDistance(point1: PxPoint, point2: PxPoint) {
  const dx = point1[0] - point2[0],
    dy = point1[1] - point2[1];

  return Math.sqrt(dx * dx + dy * dy);
}

export default App;
