import { getIn, useFormikContext } from "formik";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePickerComponent = ({ name }) => {
  const { setFieldValue, values } = useFormikContext();
  const value = getIn(values, name);
  return (
    <div className="">
      <div className="relative max-w-sm mb-3">
        <label
          htmlFor="datepicker"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          Tanggal Lahir :
        </label>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
      </div>
      <Datepicker
        useRange={false}
        asSingle={true}
        maxDate={new Date()}
        value={{ startDate: value, endDate: value }}
        // selected={{ startDate: value, endDate: value }}
        onChange={(val) => setFieldValue(name, val.startDate)}
      />
    </div>
  );
};

export default DatePickerComponent;
