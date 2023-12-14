import { LatLngTuple } from "leaflet";
import { useCallback, useState } from "react";

type Waypoint = ReturnType<typeof useWaypoints>["waypoints"][number];
type WaypointChangeHandler = ReturnType<
  typeof useWaypoints
>["onWaypointChange"];
type WaypointRemoveHandler = ReturnType<
  typeof useWaypoints
>["onWaypointRemove"];
type WaypointSortHandler = ReturnType<typeof useWaypoints>["onWaypointSort"];
type WaypointAddHandler = ReturnType<typeof useWaypoints>["onWaypointAdd"];

const useWaypoints = () => {
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

  return {
    waypoints,
    onWaypointAdd,
    onWaypointRemove,
    onWaypointChange,
    onWaypointSort,
  };
};

export { useWaypoints };

export type {
  Waypoint,
  WaypointChangeHandler,
  WaypointRemoveHandler,
  WaypointSortHandler,
  WaypointAddHandler,
};
