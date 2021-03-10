import React, { useReducer, useEffect } from "react";
import Menu from "./components/Menu";
import LocationSearch from "./components/LocationSearch";
import ForecastView from "./components/ForecastView";
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
  temperatureUnitType: "imperial", //* defaults to fahrenheit
  currentDay: null,
  forecast: null,
};

function forecastReducer(state, action) {
  switch (action.type) {
    case "new location":
      return {
        currentLocation: action.payload,
        temperatureUnitType: state.temperatureUnitType,
        currentDay: null,
        forecast: null,
      };

    case "update forecast":
      return {
        ...state,
        currentDay: action.payload.current,
        forecast: action.payload.forecast,
      };

    case "update unit type":
      //* unit type changed
      if (state.temperatureUnitType !== action.payload.unitType) {
        const newUnitType = action.payload.unitType;

        return {
          currentLocation: state.currentLocation,
          temperatureUnitType: newUnitType,
          currentDay: action.payload.weather.current,
          forecast: action.payload.weather.forecast,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}

function RainOrShine(props) {
  const [state, dispatch] = useReducer(forecastReducer, forecastInit);

  useEffect(() => {
    async function getForecast() {
      const forecastData = await getForecastData(
        state.currentLocation.dataCoords,
        state.temperatureUnitType
      );

      if (!forecastData) return;

      const parsedForecast = parseForecastData(forecastData);
      dispatch({ type: "update forecast", payload: parsedForecast });
    }

    if (state.currentLocation.dataCoords) {
      getForecast();
    }
  }, [state.currentLocation.dataCoords]);

  //* if unit type changes, this requests the new forecast
  //* w/updated unit types. Then
  async function handleUnitUpdate(unitType) {
    if (!unitType) return;

    //* unit type changed
    if (unitType !== state.temperatureUnitType) {
      const forecastData = await getForecastData(
        state.currentLocation.dataCoords,
        unitType
      );

      if (!forecastData) return;

      const parsedForecast = parseForecastData(forecastData);
      dispatch({
        type: "update unit type",
        payload: { weather: parsedForecast, unitType: unitType },
      });
    }
  }

  return (
    <main role="main" className="rain-or-shine">
      <LocationSearch
        currentLocation={state.currentLocation.name}
        locationDispatch={dispatch}
      />
      <ForecastView
        unitType={state.temperatureUnitType}
        currentDay={state.currentDay}
        forecast={state.forecast}
        currentLocation={state.currentLocation.name}
      />
      <Menu handleUnitUpdate={handleUnitUpdate} />
    </main>
  );
}

export default RainOrShine;
