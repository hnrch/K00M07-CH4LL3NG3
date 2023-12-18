import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { useEffect, useRef } from "react";
import { map, divIcon, layerGroup, tileLayer, polyline, marker } from "leaflet";
import { useGeodata } from "./Geodata.hooks";

import type {
  LeafletMouseEventHandlerFn,
  LatLngTuple,
  Map as LMap,
  LayerGroup,
} from "leaflet";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaG5yY2hyZGwiLCJhIjoiY2xxMnBjZnN1MDQyZjJpcGR1aW9pcHFsMiJ9.tPNurWX_oV0Ai-7cetcKyw";
const TILE_SOURCE = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`;
const TILE_ATTRIBUTION = "&copy; Mapbox";
const INITIAL_CENTER = [52.388, 13.058] as LatLngTuple;
const INITIAL_ZOOM = 14;
const MARKER_SIZE = 24;
const MAP_ID = "map";

type UseMapArgs = {
  waypoints: ReturnType<typeof useGeodata>["waypoints"];
  onWaypointAdd?: ReturnType<typeof useGeodata>["onWaypointAdd"];
  onWaypointChange: ReturnType<typeof useGeodata>["onWaypointChange"];
};

const createIcon = (idx: number) =>
  divIcon({
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
    className: styles.marker,
    html: `<span>${idx + 1}</span>`,
  });

const useMap = ({ waypoints, onWaypointAdd, onWaypointChange }: UseMapArgs) => {
  const mapRef = useRef<LMap | null>(null);
  const waypointMarkerLayerGroupRef = useRef<LayerGroup>(layerGroup());
  const waypointPolylineLayerGroupRef = useRef<LayerGroup>(layerGroup());

  useEffect(() => {
    // initialize map
    mapRef.current = map(MAP_ID, { doubleClickZoom: false }).setView(
      INITIAL_CENTER,
      INITIAL_ZOOM
    );

    // add tile layer
    tileLayer(TILE_SOURCE, {
      attribution: TILE_ATTRIBUTION,
    }).addTo(mapRef.current);

    // add waypoint layer groups
    waypointMarkerLayerGroupRef.current.addTo(mapRef.current);
    waypointPolylineLayerGroupRef.current.addTo(mapRef.current);

    // register map clicks
    const handleClick: LeafletMouseEventHandlerFn = (e) => {
      if (onWaypointAdd) {
        const { lat, lng } = e.latlng;
        onWaypointAdd([lat, lng]);
      }
    };

    mapRef.current.on("click", handleClick);

    return () => {
      // cleanup
      mapRef.current?.off("click", handleClick);
      mapRef.current?.remove();
    };
  }, [onWaypointAdd]);

  useEffect(() => {
    // clear layers
    waypointMarkerLayerGroupRef.current.clearLayers();
    waypointPolylineLayerGroupRef.current.clearLayers();

    // create and add markers
    waypoints.forEach((waypoint, idx) => {
      const waypointMarker = marker(waypoint, {
        icon: createIcon(idx),
        draggable: true,
      }).addTo(waypointMarkerLayerGroupRef.current);

      // create and add lines
      if (idx !== 0) {
        const previousWaypoint = waypoints[idx - 1];
        polyline([waypoint, previousWaypoint], {
          color: "#3D83E3",
          weight: 5,
          opacity: 0.9,
        }).addTo(waypointPolylineLayerGroupRef.current);
      }

      // make marker draggable
      waypointMarker.on(
        "dragend",
        // TODO: unregister this event listener before marker is removed.
        function (e) {
          const { lat, lng } = e.target.getLatLng();
          onWaypointChange([lat, lng], idx);
        }
      );
    });
  }, [onWaypointChange, waypoints]);
};

export { useMap, MAP_ID };
