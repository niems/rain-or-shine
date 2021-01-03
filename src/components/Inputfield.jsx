import React, { useState } from "react";
import IconBtn from "./IconBtn";

function Inputfield(props) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClear() {
    setValue("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!e || value === "") return; //* no update on empty field

    console.log("handleSubmit()");
    //TODO: send search up through the callback
    //TODO: then clear the state value
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <IconBtn icon="arrow_back" type="button" handleClick={handleClear} />
      <input
        type="text"
        className="form__input"
        value={value}
        onChange={handleChange}
      />
      <IconBtn icon="search" type="submit" handleClick={handleSubmit} />
    </form>
  );
}

export default Inputfield;
