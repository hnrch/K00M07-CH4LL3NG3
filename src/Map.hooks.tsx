import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { useEffect, useRef } from "react";
import { map, divIcon, layerGroup, tileLayer, polyline, marker } from "leaflet";

import type {
  LeafletMouseEventHandlerFn,
  LatLngTuple,
  Map as LeafletMap,
  LayerGroup,
} from "leaflet";
import type {
  Waypoint,
  WaypointAddHandler,
  WaypointChangeHandler,
} from "./App.hooks";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaG5yY2hyZGwiLCJhIjoiY2xxMnBjZnN1MDQyZjJpcGR1aW9pcHFsMiJ9.tPNurWX_oV0Ai-7cetcKyw";
const TILE_SOURCE = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`;
const TILE_ATTRIBUTION = "&copy; Mapbox";
const INITIAL_CENTER = [52.388, 13.058] as LatLngTuple;
const INITIAL_ZOOM = 14;
const MARKER_SIZE = 32;

const createIcon = (idx: number) =>
  divIcon({
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
    className: styles.marker,
    html: `<span>${idx + 1}</span>`,
  });

type UseMapArgs = {
  waypoints: Waypoint[];
  onWaypointAdd?: WaypointAddHandler;
  onWaypointChange: WaypointChangeHandler;
};

const useMap = ({ waypoints, onWaypointAdd, onWaypointChange }: UseMapArgs) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const waypointMarkerLayerGroupRef = useRef<LayerGroup>(layerGroup());
  const waypointPolylineLayerGroupRef = useRef<LayerGroup>(layerGroup());

  useEffect(() => {
    mapRef.current = map("map", { doubleClickZoom: false }).setView(
      INITIAL_CENTER,
      INITIAL_ZOOM
    );

    tileLayer(TILE_SOURCE, {
      attribution: TILE_ATTRIBUTION,
    }).addTo(mapRef.current);

    waypointMarkerLayerGroupRef.current.addTo(mapRef.current);
    waypointPolylineLayerGroupRef.current.addTo(mapRef.current);

    const handleClick: LeafletMouseEventHandlerFn = (e) => {
      if (onWaypointAdd) {
        const { lat, lng } = e.latlng;
        onWaypointAdd([lat, lng]);
      }
    };

    mapRef.current.on("click", handleClick);

    return () => {
      mapRef.current?.off("click", handleClick);
      mapRef.current?.remove();
    };
  }, [onWaypointAdd]);

  useEffect(() => {
    waypointMarkerLayerGroupRef.current.clearLayers();
    waypointPolylineLayerGroupRef.current.clearLayers();

    waypoints.forEach((waypoint, idx) => {
      const waypointMarker = marker(waypoint, {
        icon: createIcon(idx),
        draggable: true,
      }).addTo(waypointMarkerLayerGroupRef.current);

      // TODO: make sure to unregister this event listener before marker is removed.
      waypointMarker.on("dragend", function (e) {
        const { lat, lng } = e.target.getLatLng();
        onWaypointChange([lat, lng], idx);
      });

      if (idx !== 0) {
        const previousWaypoint = waypoints[idx - 1];
        polyline([waypoint, previousWaypoint], {
          color: "#3D83E3",
          weight: 5,
          opacity: 0.9,
        }).addTo(waypointPolylineLayerGroupRef.current);
      }
    });
  }, [onWaypointChange, waypoints]);
};

export { useMap };
