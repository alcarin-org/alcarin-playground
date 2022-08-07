import React, { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";

import L from "leaflet";

const mapTextureProps = {
  width: 8000,
  height: 8000,
  maxZoom: 8,
};

const metersPerMapPixel = 500;

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
const initialScaleBarWidth = 100;

function MapScale() {
  const { map } = useMapProjection();
  const [zoom, setZoom] = useState(2);
  const [scaleBarWidth, setScaleBarWidth] = useState(initialScaleBarWidth);

  useMapEvent("zoom", (e) => {
    setZoom(map.getZoom());
  });

  const { meters } = useRecalculateScale(zoom, initialScaleBarWidth);

  const { convertedValue: scaleValue, scaleBarWidth: adjustedScaleBarWidth } =
    useConvertUnits(meters * initialScaleBarWidth, initialScaleBarWidth);

  useEffect(() => {
    setScaleBarWidth(adjustedScaleBarWidth);
  }, [adjustedScaleBarWidth]);

  return (
    <div className="scale" id="scale" style={{ width: scaleBarWidth }}>
      {scaleValue}
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

function useRecalculateScale(zoom: number, scaleBarWidth: number) {
  const { map, project } = useMapProjection();
  const [meters, setMeters] = useState(0);

  useEffect(() => {
    const scaleBarDistance = pointsHorizontalDistance(
      project(map.containerPointToLatLng([0, 0])),
      project(map.containerPointToLatLng([scaleBarWidth, 0]))
    );

    const pointsPerPixel = scaleBarDistance / scaleBarWidth;

    setMeters(pointsPerPixel * metersPerMapPixel);
  }, [map, project, zoom, scaleBarWidth]);

  return { meters };
}

// calculates distance between points coordinates on X axis

function pointsHorizontalDistance(point1: PxPoint, point2: PxPoint) {
  const dx = point1[0] - point2[0],
    dy = point1[1] - point2[1];

  return Math.sqrt(dx * dx + dy * dy);
}

// converts meters to kilometers if given value is bigger than 1000m

function useConvertUnits(meters: number, initialScaleBarWidth: number) {
  const shouldConvertToKm = meters >= 1000;

  const [scaleBarWidth, setScaleBarWidth] = useState(initialScaleBarWidth);
  const [convertedValue, setConvertedValue] = useState(meters);

  useEffect(() => {
    const convertedMeters = shouldConvertToKm ? meters / 1000 : meters;
    const isConvertedValueFloat = convertedMeters % 5 !== 0;

    const ceiledValue = isConvertedValueFloat
      ? Math.ceil(convertedMeters / 5) * 5
      : convertedMeters;

    const ceilingFactor = isConvertedValueFloat
      ? (Math.ceil(convertedMeters / 5) * 5) / convertedMeters
      : 1;

    setConvertedValue(ceiledValue);
    setScaleBarWidth(initialScaleBarWidth * ceilingFactor);
  }, [meters, initialScaleBarWidth, shouldConvertToKm]);

  return {
    convertedValue: shouldConvertToKm
      ? `${convertedValue} km`
      : `${convertedValue} m`,
    scaleBarWidth,
  };
}

export default App;
