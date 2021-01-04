import React, { useState } from "react";

function useInput(init = "") {
  const [value, setValue] = useState(init);

  function handleChange(e) {
    setValue(e.target.value);
  }

  //* used to manually set value
  function updateValue(newValue) {
    setValue(newValue);
  }

  return [value, handleChange, updateValue];
}

export default useInput;
