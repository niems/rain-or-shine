import React from "react";
import PropTypes from "prop-types";

function ForecastViewMenu({ currentView, handleSelection }) {
  const classBase = "current-forecast-item";
  const viewClasses = {
    today: currentView === "today" ? `${classBase}--active` : classBase,
    tomorrow: currentView === "tomorrow" ? `${classBase}--active` : classBase,
    weekly: currentView === "weekly" ? `${classBase}--active` : classBase,
  };

  return (
    <nav>
      <ul className="current-forecast-list" onClick={handleSelection}>
        <li id="today" className={viewClasses.today}>
          today
        </li>
        <li id="tomorrow" className={viewClasses.tomorrow}>
          tomorrow
        </li>
        <li id="weekly" className={viewClasses.weekly}>
          weekly
        </li>
      </ul>
    </nav>
  );
}

ForecastViewMenu.propTypes = {
  currentView: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default ForecastViewMenu;
