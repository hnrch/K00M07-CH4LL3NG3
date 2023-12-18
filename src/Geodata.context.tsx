import { createContext } from "react";
import { useGeodata } from "./Geodata.hooks";

const GeodataContext = createContext<ReturnType<typeof useGeodata>>({
  waypoints: [],
  onWaypointChange: () => {
    throw new Error("not provided");
  },
  onWaypointAdd: () => {
    throw new Error("not provided");
  },
  onWaypointRemove: () => {
    throw new Error("not provided");
  },
  onWaypointMove: () => {
    throw new Error("not provided");
  },
  downloadGpxFile: () => {
    throw new Error("not provided");
  },
});

export { GeodataContext };
