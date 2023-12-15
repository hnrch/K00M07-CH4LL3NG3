import { GeodataContext } from "./Map.context";
import { useGeodata, useMap } from "./Map.hooks";

import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const MapProvider = ({ children }: Props) => {
  const geodata = useGeodata();

  useMap(geodata);

  return (
    <GeodataContext.Provider value={geodata}>
      {children}
    </GeodataContext.Provider>
  );
};
export { MapProvider };
