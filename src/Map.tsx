import "leaflet/dist/leaflet.css";
import "./Map.css";

import { useEffect, useRef } from "react";
import {
  map as leafletMap,
  tileLayer,
  LatLngTuple,
  LayerGroup,
  LeafletMouseEventHandlerFn,
  layerGroup,
  marker,
  divIcon,
  Map as LeafletMap,
} from "leaflet";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaG5yY2hyZGwiLCJhIjoiY2xxMnBjZnN1MDQyZjJpcGR1aW9pcHFsMiJ9.tPNurWX_oV0Ai-7cetcKyw";
const TILE_SOURCE = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`;
const TILE_ATTRIBUTION = "&copy; Mapbox";
const INITIAL_CENTER = [52.388, 13.058] as LatLngTuple;
const INITIAL_ZOOM = 14;
const MARKER_SIZE = 32;

type Props = {
  onClick: (waypoint: LatLngTuple) => void;
  waypoints: LatLngTuple[];
};

const Map = ({ onClick, waypoints }: Props) => {
  const waypointLayerGroupRef = useRef<LayerGroup>(layerGroup());
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    mapRef.current = leafletMap("map", { doubleClickZoom: false }).setView(
      INITIAL_CENTER,
      INITIAL_ZOOM
    );

    tileLayer(TILE_SOURCE, {
      attribution: TILE_ATTRIBUTION,
    }).addTo(mapRef.current);

    waypointLayerGroupRef.current.addTo(mapRef.current);

    const handleClick: LeafletMouseEventHandlerFn = (e) => {
      if (onClick) {
        const { lat, lng } = e.latlng;
        onClick([lat, lng]);
      }
    };

    mapRef.current.on("click", handleClick);

    return () => {
      mapRef.current?.off("click", handleClick);
      mapRef.current?.remove();
    };
  }, [onClick]);

  useEffect(() => {
    waypointLayerGroupRef.current.clearLayers();

    waypoints.forEach((waypoint, idx) => {
      marker(waypoint, {
        icon: divIcon({
          iconSize: [MARKER_SIZE, MARKER_SIZE],
          iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
          className: "marker",
          html: `<span>${idx}</span>`,
        }),
      }).addTo(waypointLayerGroupRef.current);
    });
  }, [waypoints]);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
};

export default Map;
export type { Props as MapProps };
