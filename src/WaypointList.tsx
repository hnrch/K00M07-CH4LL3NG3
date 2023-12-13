import { LatLngTuple } from "leaflet";
import DraggableList from "./DraggableList";

type Props = {
  waypoints: LatLngTuple[];
  onRemove: (idxToRemove: number) => void;
};

const WaypointList = ({ waypoints, onRemove }: Props) => {
  return (
    <div className="waypoint-list">
      <ul>
        <DraggableList
          renderItem={(_item: any, idx: any) => (
            <li key={idx}>
              Waypoint {idx}
              <span onClick={() => onRemove(idx)}>del</span>
            </li>
          )}
          items={waypoints}
        />
      </ul>
    </div>
  );
};

export default WaypointList;
export type { Props as WaypointListProps };
