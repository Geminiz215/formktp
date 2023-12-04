import axios from "axios";
import { useEffect, useState } from "react";

export default function Table() {
  const [provinces, setProvinces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [table, setTable] = useState([]);

  const handleOptionChange = async (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    try {
      const response = await axios.get("/api/table");
      console.log(response);
    } catch (error) {
      console.log("error :=>", error);
    }
  };

  useEffect(() => {
    try {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then((response) => response.json())
        .then((provinces) => setProvinces(provinces));
    } catch (error) {
      console.log("error :=>", error);
    }
  }, []);

  const handleDropdownFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="shadow-md sm:rounded-lg">
      <div className={`inline-block text-left  mr-3 mb-3`}>
        <input
          type="text"
          className="inline-flex justify-center rounded-md w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          id="options-menu"
          value={selectedOption || "Select an option"}
          onFocus={handleDropdownFocus}
        />

        {isOpen && (
          <div
            className="absolute w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {provinces.map((option, index) => (
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

      <table className="w-full text-sm text-left rtl:text-right min-w-full text-gray-500 dark:text-gray-400 sm:rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Kabupaten
            </th>
            <th scope="col" className="px-4 py-3">
              <div className="flex items-center">
                Total
                <a href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-4 py-4">$2999</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>

            <td className="px-4 py-4">$1999</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>

            <td className="px-4 py-4">$99</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
