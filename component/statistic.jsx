import React, { useState } from "react";
import Table from "./statDashboard/table";
import PiePendukung from "./statDashboard/pie";
import BarPerprovinsi from "./statDashboard/bar";

// import { Radar } from "react-chartjs-2";

export default function Statistic() {
  return (
    <div className="w-screen">
      <div className="flex space-x-4 p-4 h-[139px]">
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Total</h5>
          <h2 className="text-2xl ">2.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Hari ini</h5>
          <h2 className="text-2xl ">12.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Minggu ini</h5>
          <h2 className="text-2xl ">12.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Bulan ini</h5>
          <h2 className="text-2xl ">12.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
      </div>
      <div className="p-4 w-screen min-w-fit">
        <div className="rounded-md border-[2px] p-2 border-[#ECEEF6]">
          <div className="w-[100%] flex flex-row-reverse px-3">
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              className="inline-flex mb-4  items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              Last 30 days
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          </div>
          <BarPerprovinsi />
        </div>
      </div>
      <div className="lg:flex w-screen p-4">
        <div className="lg:w-[70%] overflow-auto sm:w-[100%] relative md:w-[70%] mb-5 p-4 lg:mr-4 min-w-fit max-w-screen-sm rounded-[12px] border-[2px] border-[#ECEEF6]">
          <Table />
        </div>
        <div className="lg:w-[41%] md:w-[41%]  sm:w-[100%] min-w-fit  p-4 rounded-[12px] border-[2px] border-[#ECEEF6]">
          <h3 className="text-[20px]">Rentan Usia</h3>
          <PiePendukung />
        </div>
      </div>
    </div>
  );
}
