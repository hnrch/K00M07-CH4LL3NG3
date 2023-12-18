import styles from "./Sidebar.module.css";
import WaypointList from "./WaypointList";
import WaypointDownloadButton from "./WaypointDownloadButton";

const Sidebar = () => (
  <aside className={styles.wrapper}>
    <div className={styles.header}>
      <h3>Route Builder</h3>
      <hr className={styles.divider} />
    </div>
    <div className={styles.content}>
      <WaypointList />
    </div>
    <div className={styles.footer}>
      <WaypointDownloadButton />
    </div>
  </aside>
);

export default Sidebar;
