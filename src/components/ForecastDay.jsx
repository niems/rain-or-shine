import React from "react";
import PropTypes from "prop-types";

import { getFixedTemp } from "../components/helpers/conversions";
import DegreeSymbol from "./DegreeSymbol";
import Icon from "./Icon";
import AdditionalInfo from "./AdditionalInfo";

function ForecastDay({ day, additionalInfoID, handleDaySelect }) {
  const imgBasePath = "assets/weather-icons/";
  const weeklyDate = day.weeklyDT;
  const weather = day.weather[0];
  const dayTempMax = getFixedTemp(day.temp.max);
  const dayTempMin = getFixedTemp(day.temp.min);
  const imgData = {
    addClasses: "forecast-day__icon",
    path: `${imgBasePath}/${weather.icon}`,
    alt: "weather icon",
  };

  const arrowImgData = {
    addClasses: "arrow-down",
    path: `assets/nav/arrow_down`,
    alt: "expands / closes additional weather info",
  };

  const forecastDayClasses =
    additionalInfoID === weeklyDate ? "forecast-day toggled" : "forecast-day";

  return (
    <li
      className={forecastDayClasses}
      id={weeklyDate}
      onClick={handleDaySelect}
    >
      <div className="forecast-day__date">{weeklyDate}</div>
      <div className="forecast-day__status">{weather.description}</div>
      <Icon imgData={imgData} />
      <div className="forecast-day__max">
        {dayTempMax}
        <DegreeSymbol />
      </div>
      <div className="forecast-day__min">
        {dayTempMin}
        <DegreeSymbol />
      </div>
      <Icon imgData={arrowImgData} />

      {additionalInfoID === weeklyDate && <AdditionalInfo info={day} />}
    </li>
  );
}

ForecastDay.propTypes = {
  day: PropTypes.object.isRequired,
  additionalInfoID: PropTypes.string,
  handleDaySelect: PropTypes.func.isRequired,
};

export default ForecastDay;
