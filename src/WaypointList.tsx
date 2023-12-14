import "./WaypointList.css";
import { LatLngTuple } from "leaflet";
import DraggableList from "./DraggableList";

type Props = {
  waypoints: LatLngTuple[];
  onRemove: (idxToRemove: number) => void;
  onSort: (idxFrom: number, idxTo: number) => void;
};

const WaypointList = ({ waypoints, onRemove, onSort }: Props) => {
  return (
    <div className="waypoint-list">
      <ul>
        {/* @ts-expect-error - TODO: how to fix this? */}
        <DraggableList
          itemTagName="li"
          itemClassName="waypoint-list__item"
          renderItem={(_item: any, idx: any) => (
            <>
              Waypoint {idx + 1}
              <span onClick={() => onRemove(idx)}>del</span>
            </>
          )}
          items={waypoints}
          onChange={onSort}
        />
      </ul>
    </div>
  );
};

export default WaypointList;
export type { Props as WaypointListProps };
