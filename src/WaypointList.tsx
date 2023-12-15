import styles from "./WaypointList.module.css";
import DraggableList from "./DraggableList";
import { Trash2, Menu } from "react-feather";
import { useContext } from "react";
import { GeodataContext } from "./Map.context";

const WaypointList = () => {
  const { waypoints, onWaypointRemove, onWaypointSort } =
    useContext(GeodataContext);

  return (
    <ul>
      <DraggableList onChange={onWaypointSort}>
        {waypoints.map((waypoint, idx) => (
          <li key={`${waypoint[0]}-${waypoint[1]}`} className={styles.item}>
            <Menu color="gray" size={16} />
            <span>Waypoint {idx + 1}</span>
            <span
              className={styles.removebtn}
              role="button"
              onClick={
                onWaypointRemove ? () => onWaypointRemove(idx) : undefined
              }
            >
              <Trash2 color="gray" size={16} />
            </span>
          </li>
        ))}
      </DraggableList>
    </ul>
  );
};

export default WaypointList;
