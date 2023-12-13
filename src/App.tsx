import "./App.css";

import { LatLngTuple } from "leaflet";
import { useCallback, useState } from "react";
import Map from "./Map";
import Sidebar from "./Sidebar";
import WaypointList from "./WaypointList";

function App() {
  const [waypoints, setWaypoints] = useState<LatLngTuple[]>([]);

  const onWaypointAdd = useCallback((waypoint: LatLngTuple) => {
    setWaypoints((waypoints) => [...waypoints, waypoint]);
  }, []);

  const onWaypointRemove = useCallback((idxToRemove: number) => {
    setWaypoints((waypoints) =>
      waypoints.filter((_, idx) => idx !== idxToRemove)
    );
  }, []);

  return (
    <div className="app">
      <Sidebar>
        <WaypointList waypoints={waypoints} onRemove={onWaypointRemove} />
      </Sidebar>
      <Map onClick={onWaypointAdd} waypoints={waypoints} />
    </div>
  );
}

export default App;
