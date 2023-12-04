// components/RecommendInput.js
import React, { useState, useEffect } from "react";

const RecommendationList = ({ filteredRecommendations, onSelect }) => (
  <ul className="absolute bg-white border border-gray-300 mt-1 p-2 w-full">
    {filteredRecommendations.map((item) => (
      <li
        key={item.id}
        onClick={() => onSelect(item.name)}
        className="cursor-pointer"
      >
        {item.name}
      </li>
    ))}
  </ul>
);

const RecommendInput = ({ sendDataToParent, getDataFromParent, text }) => {
  const [inputValue, setInputValue] = useState("");
  const [allRecommendations, setRecomendation] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Function to handle input focus
  const handleInputFocus = () => {
    setInputFocused(true);
  };

  useEffect(() => {
    const data = getDataFromParent;
    setRecomendation(data);
  }, [getDataFromParent]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setShowRecommendations(value.trim() !== "");
  };

  const handleSelectRecommendation = (value) => {
    setInputValue(value);
    sendDataToParent(value);
    setShowRecommendations(false);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    setTimeout(() => {
      setShowRecommendations(false);
    }, 1000);
  };

  const filteredRecommendations = allRecommendations.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={inputFocused ? "relative" : ""}>
      <h3 className="block text-sm font-medium text-gray-700 mb-3">{text} :</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        className="border border-gray-300 p-2 w-full mb-2"
        disabled={allRecommendations.length === 0}
        required
      />
      {showRecommendations && (
        <RecommendationList
          filteredRecommendations={filteredRecommendations}
          onSelect={handleSelectRecommendation}
        />
      )}
    </div>
  );
};

export default RecommendInput;
