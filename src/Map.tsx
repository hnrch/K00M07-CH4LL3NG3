import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { map as leafletMap, tileLayer } from "leaflet";

const Map = ({ onClick }: any) => {
  useEffect(() => {
    // Initialize the map
    const map = leafletMap("map", { doubleClickZoom: false }).setView(
      [0, 0],
      2
    );

    tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaG5yY2hyZGwiLCJhIjoiY2xxMnBjZnN1MDQyZjJpcGR1aW9pcHFsMiJ9.tPNurWX_oV0Ai-7cetcKyw",
      {
        attribution: "&copy; Mapbox",
      }
    ).addTo(map);

    const handleClick = (e: any) => {
      const { lat, lng } = e.latlng;
      onClick({ latitude: lat, longitude: lng });
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
      map.remove();
    };
  }, [onClick]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default Map;
