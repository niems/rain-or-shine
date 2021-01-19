import React, { useReducer, useEffect } from "react";
import LocationSearch from "./components/LocationSearch";
import {
  getForecastData,
  parseForecastData,
} from "./components/getWeatherData";
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

    case "update forecast":
      console.log("forecastReducer(): update forecast");
      return {
        ...state,
        forecast: action.payload,
      };

    default:
      return state;
  }
}

function RainOrShine(props) {
  const [state, dispatch] = useReducer(forecastReducer, forecastInit);

  useEffect(() => {
    console.log("RainOrShine useEffect()");
    const numOfForecastDays = 7;

    async function getForecast() {
      const forecastData = await getForecastData(
        state.currentLocation.dataCoords,
        numOfForecastDays
      );

      if (!forecastData) return;

      const parsedForecast = parseForecastData(forecastData);

      //for (let i = 0; i < parsedForecast.length; i++) {
      //console.log(`day: ${JSON.stringify(parsedForecast[i])}`);
      //}

      dispatch({ type: "update forecast", payload: parsedForecast });
    }

    if (state.currentLocation.dataCoords) {
      getForecast();
    }
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
