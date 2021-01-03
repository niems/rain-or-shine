import react, { useState, useEffect } from "react";
import Inputfield from "./Inputfield";

function LocationSearch(props) {
  const [tempLocations, setTempLocations] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      //TODO: reset tempLocations and inputfield
      setTempLocations(null);
    }
  }, [isFocused]);

  return (
    <div
      className="loc-search"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Inputfield />
    </div>
  );
}

export default LocationSearch;
