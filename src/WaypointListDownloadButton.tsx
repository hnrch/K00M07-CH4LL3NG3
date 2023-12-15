import { useContext } from "react";
import { GeodataContext } from "./Map.context";

const WaypointListDownloadButton = () => {
  const { downloadGpxFile } = useContext(GeodataContext);
  return <button onClick={downloadGpxFile}>Download your Route</button>;
};
export default WaypointListDownloadButton;
