import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Table from "./statDashboard/table";
import BarPendukung from "./statDashboard/pie";
import PiePendukung from "./statDashboard/pie";
import BarPerprovinsi from "./statDashboard/bar";

// import { Radar } from "react-chartjs-2";

export default function Statistic() {
  return (
    <div className="w-screen">
      <div className="flex space-x-4 p-4 h-[139px]">
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Total</h5>
          <h2 className="text-2xl font-inter-italic">2.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Hari ini</h5>
          <h2 className="text-2xl font-inter-italic">12.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Minggu ini</h5>
          <h2 className="text-2xl font-inter-italic">12.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Bulan ini</h5>
          <h2 className="text-2xl font-inter-italic">12.000</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
      </div>
      <div className="p-4 w-screen">
        <div className="rounded-md w-full h-full border-[2px] p-2 border-[#ECEEF6]">
          <div className="w-[100%] flex flex-row-reverse px-3">
            <p>Filter</p>
          </div>
          <BarPerprovinsi />
        </div>
      </div>
      <div className="sm:flex w-screen p-4 ">
        <div className="sm:w-[70%] p-4 sm:mr-4 rounded-[12px] border-[2px] border-[#ECEEF6]">
          <h3 className="text-[20.296px] mb-4">test</h3>
          <Table />
        </div>
        <div className="sm:w-[41%] p-4 rounded-[12px] border-[2px] border-[#ECEEF6]">
          <h3 className="text-[20px]">Rentan Usia</h3>
          <PiePendukung />
        </div>
      </div>
    </div>
  );
}
