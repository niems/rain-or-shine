import React from "react";
import PropTypes from "prop-types";

function Icon({ imgData }) {
  const imgClasses = imgData.addClasses ? `icon ${imgData.addClasses}` : "icon";

  return (
    <img
      className={imgClasses}
      src={`${imgData.path}.svg`}
      alt={`${imgData.alt}`}
    />
  );
}

Icon.propTypes = {
  imgData: PropTypes.shape({
    addClasses: PropTypes.string,
    path: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
};

export default Icon;
