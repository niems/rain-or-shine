import React, { useState } from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";
import DegreeSymbol from "./DegreeSymbol";

//* menu that deals with updating the unit type
function Menu({ handleUnitUpdate }) {
  const [isActive, setIsActive] = useState(false);
  const imgData = {
    path: "assets/nav/settings",
    alt: "settings menu icon",
  };

  function handleNewUnitType(e) {
    if (!e) return;

    const newUnitType = e.target.id;

    setIsActive(false); //* toggles off menu
    handleUnitUpdate(newUnitType);
  }

  return (
    <menu className="menu">
      <button className="btn" onClick={() => setIsActive(!isActive)}>
        <Icon imgData={imgData} />
      </button>
      {isActive && (
        <div className="menu__extended">
          <span className="menu-title">Select unit type:</span>
          <div>
            <input
              type="radio"
              id="imperial"
              name="unitType"
              value="imperial"
              onClick={handleNewUnitType}
            />
            <label htmlFor="imperial">
              <DegreeSymbol unitType="F" />
              <span> - imperial</span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="metric"
              name="unitType"
              value="metric"
              onClick={handleNewUnitType}
            />
            <label htmlFor="metric">
              <DegreeSymbol unitType="C" />
              <span> - metric</span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="kelvin"
              name="unitType"
              value="kelvin"
              onClick={handleNewUnitType}
            />
            <label htmlFor="kelvin">
              <DegreeSymbol unitType="K" />
              <span> - kelvin</span>
            </label>
          </div>
        </div>
      )}
    </menu>
  );
}

Menu.propTypes = {
  handleUnitUpdate: PropTypes.func.isRequired,
};

export default Menu;
