import { LatLngTuple } from "leaflet";
import { useCallback, useState } from "react";

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
    (updatedWaypoint: LatLngTuple, idxToChange: number) => {
      setWaypoints((waypoints) =>
        waypoints.map((waypoint, idx) =>
          idx === idxToChange ? updatedWaypoint : waypoint
        )
      );
    },
    []
  );

  const onWaypointSort = useCallback(
    (idxFrom: number, idxTo: number) => {
      const movedWaypoint = waypoints[idxFrom];
      const updatedWaypoints = waypoints
        .filter((_, idx) => idx !== idxFrom)
        .splice(idxTo, 0, movedWaypoint);
      setWaypoints(updatedWaypoints);
    },
    [waypoints]
  );

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
    onWaypointSort,
    downloadGpxFile,
  };
};

export { useGeodata };
