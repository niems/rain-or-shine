import React from "react";
import PropTypes from "prop-types";

import { getFixedTemp } from "./helpers/conversions";

//* renders additional info for the current day selected out of the forecast weekly list
function AdditionalInfo({ info }) {
  //* renders only if it's likely to rain
  const chanceOfRain = getFixedTemp(info["pop"] * 100);

  return (
    <div className="additional-info">
      {chanceOfRain > 0 && (
        <span className="chance-of-rain">{`Chance of rain: ${chanceOfRain}%`}</span>
      )}
      <span className="humidity">{`Humidity: ${info.humidity}%`}</span>
      <span className="uv-index">{`UV Index: ${info.uvi}`}</span>
      <span className="sunset-sunrise">{`Sunrise/Sunset: ${info.sunrise}, ${info.sunset}`}</span>
    </div>
  );
}

AdditionalInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

export default AdditionalInfo;
