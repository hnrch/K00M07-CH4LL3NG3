import { createContext } from "react";
import { useGeodata } from "./Map.hooks";

const GeodataContext = createContext<ReturnType<typeof useGeodata>>({
  waypoints: [],
  onWaypointChange: () => {
    throw new Error("not implemented");
  },
  onWaypointAdd: () => {
    throw new Error("not implemented");
  },
  onWaypointRemove: () => {
    throw new Error("not implemented");
  },
  onWaypointSort: () => {
    throw new Error("not implemented");
  },
  downloadGpxFile: () => {
    throw new Error("not implemented");
  },
});

export { GeodataContext };
