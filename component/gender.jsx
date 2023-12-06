import { useState } from "react";

const Gender = ({ gender, setGender }) => {
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="">
      <h3 className="mb-3 text-sm font-medium text-gray-900 ">
        Jenis Kelamin :
      </h3>
      <div className="flex my-5">
        <div className="flex items-center mr-5">
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-1"
            className="ms-2 text-sm font-medium  text-gray-900 "
          >
            Laki - Laki
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <label
            htmlFor="default-radio-2"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Perempuan
          </label>
        </div>
      </div>
    </div>
  );
};

export default Gender;
