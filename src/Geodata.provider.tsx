import { GeodataContext } from "./Geodata.context";

import type { ReactNode } from "react";
import { useGeodata } from "./Geodata.hooks";

type Props = {
  children?: ReactNode;
};

const GeodataProvider = ({ children }: Props) => {
  const geodata = useGeodata();

  return (
    <GeodataContext.Provider value={geodata}>
      {children}
    </GeodataContext.Provider>
  );
};
export { GeodataProvider };
