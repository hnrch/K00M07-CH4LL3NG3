import styles from "./WaypointList.module.css";
import DraggableList from "./DraggableList";
import { Trash2, Menu } from "react-feather";

import type {
  Waypoint,
  WaypointRemoveHandler,
  WaypointSortHandler,
} from "./App.hooks";

type Props = {
  waypoints: Waypoint[];
  onRemove: WaypointRemoveHandler;
  onSort: WaypointSortHandler;
};

const WaypointList = ({ waypoints, onRemove, onSort }: Props) => {
  return (
    <ul>
      <DraggableList onChange={onSort}>
        {waypoints.map((waypoint, idx) => (
          <li key={`${waypoint[0]}-${waypoint[1]}`} className={styles.item}>
            <Menu color="gray" size={16} />
            <span>Waypoint {idx + 1}</span>
            <span
              className={styles.removebtn}
              role="button"
              onClick={() => onRemove(idx)}
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
export type { Props as WaypointListProps };
