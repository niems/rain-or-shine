import react from "react";
import LocationSearch from "./components/LocationSearch";
import "./RainOrShine.css";

function RainOrShine(props) {
  return (
    <div className="rain-or-shine">
      <LocationSearch />
    </div>
  );
}

export default RainOrShine;
