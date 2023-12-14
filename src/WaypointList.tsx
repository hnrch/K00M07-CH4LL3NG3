import "./WaypointList.css";
import { LatLngTuple } from "leaflet";
import DraggableList from "./DraggableList";
import { Trash2, Menu } from "react-feather";

type Props = {
  waypoints: LatLngTuple[];
  onRemove: (idxToRemove: number) => void;
  onSort: (idxFrom: number, idxTo: number) => void;
};

const WaypointList = ({ waypoints, onRemove, onSort }: Props) => {
  return (
    <ul className="waypoint-list">
      <DraggableList onChange={onSort}>
        {waypoints.map((waypoint, idx) => (
          <li
            key={`${waypoint[0]}-${waypoint[1]}`}
            className="waypoint-list__item"
          >
            <Menu color="gray" size={16} />
            <span>Waypoint {idx + 1}</span>
            <span
              className="waypoint-list__remove-btn"
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
