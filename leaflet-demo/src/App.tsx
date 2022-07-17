import React, { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";

import L from "leaflet";

const mapTextureProps = {
  width: 8000,
  height: 8000,
  maxZoom: 8,
};

const meterPerPixel = 500;

const wholeMapWidth = mapTextureProps.width * meterPerPixel;

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
      >
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

  // const scale = L.control.scale({ imperial: false });
  // map.addControl(scale);

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

function countScreenToMapPxRatio() {
  return window.innerWidth / wholeMapWidth;
}

function MapScale() {
  const [meters, setMeters] = useState<number>();
  const [ratio, setRatio] = useState<number>(countScreenToMapPxRatio());

  // window.addEventListener("resize", () => {
  //   setRatio(countScreenToMapPxRatio());
  // });

  const width = 100;

  useEffect(() => {
    setMeters(width / ratio);
  }, [width, ratio]);

  return (
    <div className="scale" id="scale" style={{ width: width }}>
      {meters} m
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

export default App;
