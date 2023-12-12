import React, { useCallback } from "react";
import "./App.css";
import Map from "./Map";
import Sidebar from "./Sidebar";

function App() {
  const onMapClick = useCallback((location: any) => {
    console.log(location);
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <Map onClick={onMapClick} />
    </div>
  );
}

export default App;
