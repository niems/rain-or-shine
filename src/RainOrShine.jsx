import React, { useReducer, useEffect } from "react";
import LocationSearch from "./components/LocationSearch";
import "./RainOrShine.css";

const forecastInit = {
  currentLocation: {
    name: null,
    dataCoords: null,
  },
  forecast: null,
};

function forecastReducer(state, action) {
  switch (action.type) {
    case "new location":
      console.log("forecastReducer(): new location");
      return {
        currentLocation: action.payload,
        forecast: null,
      };

    default:
      return state;
  }
}

function RainOrShine(props) {
  const [state, dispatch] = useReducer(forecastReducer, forecastInit);

  useEffect(async () => {
    console.log("RainOrShine useEffect()");
    //TODO: await forecast api request
    //TODO: make sure forecast data is parsed
    //TODO: update forecast data state
  }, [state.currentLocation.dataCoords]);

  return (
    <div className="rain-or-shine">
      <LocationSearch
        currentLocation={state.currentLocation.name}
        locationDispatch={dispatch}
      />
    </div>
  );
}

export default RainOrShine;
