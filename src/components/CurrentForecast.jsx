import React from "react";
import PropTypes from "prop-types";

import DegreeSymbol from "./DegreeSymbol";
import Icon from "./Icon";

function CurrentForecast({ unitTypeSymbol, currentDay, forecast, city }) {
  if (!forecast) return null;

  let temp = null;
  let feelsLike = null;
  let weather = null;
  let date = null;
  let sunriseTimestamp = null;
  let sunsetTimestamp = null;

  //* data pulled from forecast (tomorrow selected)
  //* everything pulled based on day-time
  if (!currentDay) {
    temp = forecast[1].temp.day;
    feelsLike = forecast[1].feels_like.day;
    weather = forecast[1].weather[0];
    date = forecast[1].dt;
    sunriseTimestamp = forecast[1].sunrise;
    sunsetTimestamp = forecast[1].sunset;
  }

  //* pulled from current day (today selected)
  else {
    temp = currentDay.temp;
    feelsLike = currentDay.feels_like;
    weather = currentDay.weather[0];
    date = currentDay.dt;
    sunriseTimestamp = forecast[0].sunrise;
    sunsetTimestamp = forecast[0].sunset;
  }

  const sunsetImgData = {
    path: "assets/weather-icons/sunset",
    alt: "sunset icon",
  };
  const sunriseImgData = {
    path: "assets/weather-icons/sunrise",
    alt: "sunrise icon",
  };
  const tempImgData = {
    path: "assets/weather-icons/temperature",
    alt: "temperature icon",
  };

  const imgPath = `assets/weather-icons/${weather.icon}`;

  return (
    <div className="current-forecast">
      <div className="date">{date}</div>
      <div className="city">{city}</div>
      <div className="description">{weather.main}</div>
      <div className="icon-wrapper">
        <img
          className="icon"
          src={`${imgPath}.svg`}
          alt="weather status icon"
        />

        <div className="current-temp">
          {temp}
          <DegreeSymbol unitType={unitTypeSymbol} />
        </div>
      </div>
      <hr />

      <div className="info">
        <div className="feels-like">
          <Icon imgData={tempImgData} />
          <div>
            {`Feels like ${feelsLike}`}
            <DegreeSymbol />
          </div>
        </div>
        <div className="sunrise">
          <Icon imgData={sunriseImgData} />
          {sunriseTimestamp}
        </div>
        <div className="sunset">
          <Icon imgData={sunsetImgData} />
          {sunsetTimestamp}
        </div>
      </div>
    </div>
  );
}

CurrentForecast.propTypes = {
  unitTypeSymbol: PropTypes.string.isRequired,
  currentDay: PropTypes.object,
  forecast: PropTypes.array,
  city: PropTypes.string,
};

export default CurrentForecast;
