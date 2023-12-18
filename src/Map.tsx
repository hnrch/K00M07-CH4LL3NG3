import { useContext } from "react";
import { GeodataContext } from "./Geodata.context";
import { MAP_ID, useMap } from "./Map.hooks";

const Map = () => {
  useMap(useContext(GeodataContext));

  return <div id={MAP_ID} style={{ height: "100%", width: "100%" }}></div>;
};
export default Map;
