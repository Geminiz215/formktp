// components/Dropdown.js

import React, { useState, useEffect } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [Option, setOptions] = useState([]);

  const handleOptionChange = (value) => {
    sendDataToParent(value);
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const data = getDataFromParent;
    setOptions(data);
  }, []);

  const handleDropdownFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className={`inline-block text-left  mr-3`}>
      <h3 className="mb-3 text-md font-medium text-gray-900 ">{text}</h3>
      <div>
        <span className="rounded-md shadow-sm">
          <input
            type="text"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            id="options-menu"
            value={selectedOption || "Select an option"}
            onFocus={handleDropdownFocus}
          />
        </span>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {Option.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              role="menuitem"
              onClick={() => handleOptionChange(option.name)}
            >
              <input
                type="radio"
                id={option.name}
                name="options"
                value={option.name}
                className="mr-2"
              />
              <label htmlFor={option.name}>{option.name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
