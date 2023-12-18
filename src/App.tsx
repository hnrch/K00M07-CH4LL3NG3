import styles from "./App.module.css";
import { GeodataProvider } from "./Geodata.provider";
import Map from "./Map";
import Sidebar from "./Sidebar";

function App() {
  return (
    <GeodataProvider>
      <div className={styles.wrapper}>
        <Sidebar />
        <Map />
      </div>
    </GeodataProvider>
  );
}

export default App;
