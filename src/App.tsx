import styles from "./App.module.css";
import Map from "./Map";
import Sidebar from "./Sidebar";
import { useWaypoints } from "./App.hooks";

function App() {
  const {
    waypoints,
    onWaypointAdd,
    onWaypointRemove,
    onWaypointChange,
    onWaypointSort,
  } = useWaypoints();

  return (
    <div className={styles.wrapper}>
      <Sidebar
        waypoints={waypoints}
        onWaypointRemove={onWaypointRemove}
        onWaypointSort={onWaypointSort}
      />
      <Map
        waypoints={waypoints}
        onWaypointAdd={onWaypointAdd}
        onWaypointChange={onWaypointChange}
      />
    </div>
  );
}

export default App;
