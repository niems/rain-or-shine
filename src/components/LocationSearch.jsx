import React, { useState } from "react";
import PropTypes from "prop-types";

import Inputfield from "./Inputfield";
import useInput from "./hooks/useInput";
import LocationsList from "./LocationsList";
import { autoCompleteSearch } from "./getWeatherData";

function LocationSearch({ currentLocation, locationDispatch }) {
  const [tempLocations, setTempLocations] = useState(null);
  const [inputValue, handleInputChange, updateInputValue] = useInput("");

  //* clears input and temp locations on arrow click
  function handleClear(e) {
    e.preventDefault();
    updateInputValue("");
    setTempLocations(null);
  }

  //* handles pulling the possible location matches from the city search & updating the match-state
  async function handleSubmit(e) {
    e.preventDefault();

    if (inputValue === "") return;

    const locationsArr = await autoCompleteSearch(inputValue);

    //* stores only the city, state out of the location name
    let locationsSplit = [];
    for (let i = 0; i < locationsArr.length; i++) {
      const tempSplit = locationsArr[i].name.split(",");
      const tempFinal = tempSplit[0] + "," + tempSplit[1];

      locationsSplit.push({
        name: tempFinal,
        id: `${locationsArr[i].id}`,
        dataCoords: {
          lat: locationsArr[i].lat,
          lon: locationsArr[i].lon,
        },
      });
    }

    setTempLocations(locationsSplit);
  }

  //* clears out the temporary locations from city search & gets
  //* ready for requesting the forecast data for the selected city
  function handleLocationSelect(e) {
    e.preventDefault();
    const { id } = e.target;

    if (id) {
      const selectedLocation = tempLocations.find((loc) => loc.id === id);
      const payload = {
        name: selectedLocation.name,
        dataCoords: selectedLocation.dataCoords,
      };

      locationDispatch({ type: "new location", payload: payload });
      setTempLocations(null);
      updateInputValue("");
    }
  }

  return (
    <div className="loc-search" onClick={handleLocationSelect}>
      <Inputfield
        value={inputValue}
        handleChange={handleInputChange}
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        placeholder={currentLocation}
      />

      <LocationsList list={tempLocations} handleSelect={handleLocationSelect} />
    </div>
  );
}

LocationSearch.propTypes = {
  currentLocation: PropTypes.string,
  locationDispatch: PropTypes.func.isRequired,
};

export default LocationSearch;
