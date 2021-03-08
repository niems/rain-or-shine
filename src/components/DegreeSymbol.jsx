import React from "react";
import propTypes from "prop-types";

//* returns degree symbol
//* optional - adds unit type (ex. 'F' for fahrenheit, 'C' for celsius)
function DegreeSymbol({ unitType = "" }) {
  const symbol = String.fromCharCode(176) + unitType;

  return <sup className="degree-symbol">{symbol}</sup>;
}

DegreeSymbol.propTypes = {
  unitType: propTypes.string,
};

export default DegreeSymbol;
