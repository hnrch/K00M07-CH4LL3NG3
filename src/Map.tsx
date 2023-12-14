import type {
  Waypoint,
  WaypointAddHandler,
  WaypointChangeHandler,
} from "./App.hooks";
import { useMap } from "./Map.hooks";

type Props = {
  waypoints: Waypoint[];
  onWaypointAdd: WaypointAddHandler;
  onWaypointChange: WaypointChangeHandler;
};

const Map = ({ waypoints, onWaypointAdd, onWaypointChange }: Props) => {
  useMap({ waypoints, onWaypointAdd, onWaypointChange });

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
};

export default Map;
export type { Props as MapProps };
