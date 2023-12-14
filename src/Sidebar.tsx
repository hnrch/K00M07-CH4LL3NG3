import styles from "./Sidebar.module.css";
import WaypointList from "./WaypointList";

import type {
  Waypoint,
  WaypointRemoveHandler,
  WaypointSortHandler,
} from "./App.hooks";

type Props = {
  waypoints: Waypoint[];
  onWaypointRemove: WaypointRemoveHandler;
  onWaypointSort: WaypointSortHandler;
};

const Sidebar = ({ waypoints, onWaypointRemove, onWaypointSort }: Props) => (
  <aside className={styles.wrapper}>
    <div className={styles.header}>
      <h3>Route Builder</h3>
      <hr className={styles.divider} />
    </div>
    <div className={styles.content}>
      <WaypointList
        waypoints={waypoints}
        onRemove={onWaypointRemove}
        onSort={onWaypointSort}
      />
    </div>
    <div className={styles.footer}>
      <button>Download .gpx</button>
    </div>
  </aside>
);

export default Sidebar;
export type { Props as SidebarProps };
