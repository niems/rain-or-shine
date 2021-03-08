import React, { useState } from "react";
import PropTypes from "prop-types";

import ForecastDay from "./ForecastDay";

function ForecastWeekly({ forecast }) {
  const [additionalInfoID, setAdditionalInfoID] = useState(null);
  if (!forecast) return null;

  //* called when a forecast day is selected (only one selected at a time)
  //* updates the current selected forecast day, displaying the additional info
  function handleForecastSelect(e) {
    if (!e) return;

    const id = e.currentTarget.id;
    let newID = null;

    if (additionalInfoID !== id) {
      newID = id;
    }

    setAdditionalInfoID(newID);
  }

  const forecastList = forecast.map((day) => (
    <ForecastDay
      key={day.dt}
      day={day}
      additionalInfoID={additionalInfoID}
      handleDaySelect={handleForecastSelect}
    />
  ));

  return <ul className="forecast-weekly">{forecastList}</ul>;
}

ForecastWeekly.propTypes = {
  forecast: PropTypes.array,
};

export default ForecastWeekly;
