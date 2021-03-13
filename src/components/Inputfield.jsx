import React, { useState } from "react";
import PropTypes from "prop-types";
import IconBtn from "./IconBtn";

function Inputfield({
  value,
  handleChange,
  handleClear,
  handleSubmit,
  placeholder,
}) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <IconBtn icon="arrow_back" type="button" handleClick={handleClear} />
      <input
        type="text"
        className="form__input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || "Search a city..."}
      />
      <IconBtn icon="search" type="button" handleClick={handleSubmit} />
    </form>
  );
}

Inputfield.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Inputfield;
