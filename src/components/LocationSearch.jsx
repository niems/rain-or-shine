import react, { useState, useEffect } from "react";
import Inputfield from "./Inputfield";
import useInput from "./hooks/useInput";

function LocationSearch(props) {
  const [tempLocations, setTempLocations] = useState(null);
  const [isContainerFocused, setIsContainerFocused] = useState(false);
  const [inputValue, handleInputChange, updateInputValue] = useInput("");

  useEffect(() => {
    console.log("useEffect() focus changed");
    console.log(`active focus: ${document.activeElement.classList}`);
    const activeClasses = [...document.activeElement.classList];

    //* resets search data if focus is lost
    if (
      !(
        activeClasses.includes("form__input") ||
        activeClasses.includes("icon-btn")
      )
    ) {
      console.log("reset based on active class");
      setTempLocations(null);
      updateInputValue("");
    }
  }, [isContainerFocused]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit()");

    if (inputValue === "") return;

    console.log(`\t - making api request now: ${inputValue}`);
    //TODO: autocomplete search api request
    //TODO: response array stored in tempLocations (filter out duplicates)
  }

  return (
    <div
      className="loc-search"
      onFocus={() => setIsContainerFocused(true)}
      onBlur={() => setIsContainerFocused(false)}
    >
      <Inputfield
        value={inputValue}
        handleChange={handleInputChange}
        handleClear={() => updateInputValue("")}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default LocationSearch;
