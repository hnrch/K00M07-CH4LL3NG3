import { createContext } from "react";
import { useGeodata } from "./Map.hooks";

const GeodataContext = createContext<ReturnType<typeof useGeodata>>({
  waypoints: [],
  onWaypointChange: () => {},
  onWaypointAdd: () => {},
  onWaypointRemove: () => {},
  onWaypointSort: () => {},
});

export { GeodataContext };
