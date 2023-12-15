import styles from "./App.module.css";
import Map from "./Map";
import { MapProvider } from "./Map.provider";
import Sidebar from "./Sidebar";

function App() {
  return (
    <MapProvider>
      <div className={styles.wrapper}>
        <Sidebar />
        <Map />
      </div>
    </MapProvider>
  );
}

export default App;
