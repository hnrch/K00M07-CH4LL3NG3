import { LatLngTuple } from "leaflet";
import { useCallback, useState } from "react";

const useGeodata = () => {
  const [waypoints, setWaypoints] = useState<LatLngTuple[]>([]);

  // add waypoint by lat/lng
  const onWaypointAdd = useCallback((waypoint: LatLngTuple) => {
    setWaypoints((_waypoints) => [..._waypoints, waypoint]);
  }, []);

  // remove waypoint by index
  const onWaypointRemove = useCallback((idxToRemove: number) => {
    setWaypoints((_waypoints) =>
      _waypoints.filter((_, idx) => idx !== idxToRemove)
    );
  }, []);

  // change waypoint by index
  const onWaypointChange = useCallback(
    (updatedWaypoint: LatLngTuple, idxToChange: number) => {
      setWaypoints((_waypoints) =>
        _waypoints.map((waypoint, idx) =>
          idx === idxToChange ? updatedWaypoint : waypoint
        )
      );
    },
    []
  );

  // move waypoint by index
  const onWaypointMove = useCallback((idxFrom: number, idxTo: number) => {
    setWaypoints((_waypoints) => {
      const movedWaypoint = _waypoints[idxFrom];
      const updatedWaypoints = _waypoints.filter((_, idx) => idx !== idxFrom);
      updatedWaypoints.splice(idxTo, 0, movedWaypoint);

      return updatedWaypoints;
    });
  }, []);

  /**
   * link: https://www.topografix.com/GPX/1/1/
   */
  const createWaypointsGpxFileContents = useCallback(() => {
    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
  <gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
      <trk>
      <name>Cross-Country Run</name>
      <trkseg>
          ${waypoints
            .map(([lat, lng]) => `<trkpt lat="${lat}" lon="${lng}"></trkpt>`)
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
    onWaypointMove,
    downloadGpxFile,
  };
};

export { useGeodata };
