import styles from "./WaypointList.module.css";
import DraggableList from "./DraggableList";
import { Trash2, Menu } from "react-feather";
import { useContext } from "react";
import { GeodataContext } from "./Geodata.context";

const WaypointList = () => {
  const { waypoints, onWaypointRemove, onWaypointMove } =
    useContext(GeodataContext);

  return (
    <ul>
      <DraggableList onChange={onWaypointMove}>
        {waypoints.map(([lat, lng], idx) => (
          <li key={`${idx}${lat}${lng}`} className={styles.item}>
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
