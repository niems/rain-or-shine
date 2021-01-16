import React, { useState, useEffect } from "react";
import Inputfield from "./Inputfield";
import useInput from "./hooks/useInput";
import LocationsList from "./LocationsList";
import { autoCompleteSearch } from "./getWeatherData";

function LocationSearch({ currentLocation, locationDispatch }) {
  const [tempLocations, setTempLocations] = useState(null);
  const [inputValue, handleInputChange, updateInputValue] = useInput("");

  //* clears input and temp locations on arrow click
  function handleClear(e) {
    console.log("handleClear()");
    e.preventDefault();
    updateInputValue("");
    setTempLocations(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit()");

    if (inputValue === "") return;

    //TODO: don't send api request if input is the same as current location (parent state)
    const locationsArr = await autoCompleteSearch(inputValue);

    //* stores only the city, state out of the location name
    let locationsSplit = [];
    for (let i = 0; i < locationsArr.length; i++) {
      const tempSplit = locationsArr[i].name.split(",");
      const tempFinal = tempSplit[0] + "," + tempSplit[1];

      locationsSplit.push({
        name: tempFinal,
        id: `${locationsArr[i].id}`,
        dataCoords: `${locationsArr[i].lat},${locationsArr[i].lon}`,
      });
    }

    setTempLocations(locationsSplit);
  }

  //*
  function handleLocationSelect(e) {
    e.preventDefault();
    const { id, className } = e.target;

    if (id) {
      const selectedLocation = tempLocations.find((loc) => loc.id === id);
      const payload = {
        name: selectedLocation.name,
        dataCoords: selectedLocation.dataCoords,
      };

      console.log(`\n\nselected location: ${JSON.stringify(selectedLocation)}`);
      console.log(`payload: ${JSON.stringify(payload)}`);

      //*
      locationDispatch({ type: "new location", payload: payload });

      //* clear temp data
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

export default LocationSearch;
