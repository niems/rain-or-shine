import React, { useState } from "react";
import PropTypes from "prop-types";

import ForecastViewMenu from "./ForecastViewMenu";
import CurrentForecast from "./CurrentForecast";
import ForecastWeekly from "./ForecastWeekly";

import { getUnitType } from "./helpers/conversions";

function ForecastView({ unitType, currentDay, forecast, currentLocation }) {
  const [currentView, setCurrentView] = useState("today");
  let city = null;
  let unitTypeSymbol = getUnitType(unitType);

  //* pulls city out of the current location if it exists
  if (currentLocation) {
    city = currentLocation.split(",")[0];
  }

  function handleSelection(e) {
    const { id } = e.target;

    if (id) {
      switch (id) {
        case "today":
          setCurrentView("today");
          break;
        case "tomorrow":
          setCurrentView("tomorrow");
          break;
        case "weekly":
          setCurrentView("weekly");
          break;
      }
    }
  }

  return (
    <section className="forecast-view">
      <ForecastViewMenu
        currentView={currentView}
        handleSelection={handleSelection}
      />
      {currentView === "weekly" && <ForecastWeekly forecast={forecast} />}
      {currentView === "today" && (
        <CurrentForecast
          unitTypeSymbol={unitTypeSymbol}
          currentDay={currentDay}
          forecast={forecast}
          city={city}
        />
      )}
      {currentView === "tomorrow" && (
        <CurrentForecast
          unitTypeSymbol={unitTypeSymbol}
          forecast={forecast}
          city={city}
        />
      )}
    </section>
  );
}

ForecastView.propTypes = {
  unitType: PropTypes.string.isRequired,
  currentDay: PropTypes.object,
  forecast: PropTypes.array,
  currentLocation: PropTypes.string,
};

export default ForecastView;
