import { useContext } from "react";
import { GeodataContext } from "./Geodata.context";

const WaypointDownloadButton = () => {
  const { downloadGpxFile } = useContext(GeodataContext);
  return <button onClick={downloadGpxFile}>Download your Route</button>;
};
export default WaypointDownloadButton;
