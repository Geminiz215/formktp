// components/NumberInput.jsx
import React, { useState } from "react";

const NumberInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Ensure the value is numeric and has a maximum length of 16 characters
    value = value.replace(/\D/g, "").slice(0, 16);

    setInputValue(value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter a number"
    />
  );
};

export default NumberInput;
