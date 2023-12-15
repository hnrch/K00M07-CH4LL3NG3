import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { useEffect, useRef, useCallback, useState } from "react";
import { map, divIcon, layerGroup, tileLayer, polyline, marker } from "leaflet";

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
    mapRef.current = map(MAP_ID, { doubleClickZoom: false }).setView(
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

const useGeodata = () => {
  const [waypoints, setWaypoints] = useState<LatLngTuple[]>([]);

  const onWaypointAdd = useCallback((waypoint: LatLngTuple) => {
    setWaypoints((waypoints) => [...waypoints, waypoint]);
  }, []);

  const onWaypointRemove = useCallback((idxToRemove: number) => {
    setWaypoints((waypoints) =>
      waypoints.filter((_, idx) => idx !== idxToRemove)
    );
  }, []);

  const onWaypointChange = useCallback(
    (waypointUpdate: LatLngTuple, idxToChange: number) => {
      setWaypoints((waypoints) =>
        waypoints.map((waypoint, idx) =>
          idx === idxToChange ? waypointUpdate : waypoint
        )
      );
    },
    []
  );

  const onWaypointSort = useCallback(
    (idxFrom: number, idxTo: number) => {
      const waypoint = waypoints[idxFrom];
      const newWaypoints = waypoints.filter((_, idx) => idx !== idxFrom);
      newWaypoints.splice(idxTo, 0, waypoint);
      setWaypoints(newWaypoints);
    },
    [waypoints]
  );

  const createWaypointsGpxFileContents = useCallback(() => {
    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
      <trk>
        <name>Cross-Country Run</name>
        <trkseg>
          ${waypoints
            .map(
              (waypoint) =>
                `<trkpt lat="${waypoint[0]}" lon="${waypoint[1]}"></trkpt>`
            )
            .join("\n")}
        </trkseg>
      </trk>
    </gpx>`;

    return gpx;
  }, [waypoints]);

  const downloadGpxFile = useCallback(() => {
    const gpxContent = createWaypointsGpxFileContents();

    // Create a Blob containing the GPX content
    const blob = new Blob([gpxContent], { type: "application/xml" });

    // Create a download link
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "track.gpx";

    // Append the link to the body and trigger the download
    document.body.appendChild(a);
    a.click();

    // Remove the link from the body
    document.body.removeChild(a);
  }, [createWaypointsGpxFileContents]);

  return {
    waypoints,
    onWaypointAdd,
    onWaypointRemove,
    onWaypointChange,
    onWaypointSort,
    downloadGpxFile,
  };
};

export { useGeodata, useMap, MAP_ID };
