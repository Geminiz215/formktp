import React, { useEffect, useState } from "react";
import Table from "./statDashboard/table";
import PiePendukung from "./statDashboard/pie";
import BarPerprovinsi from "./statDashboard/bar";
import DateRange from "./dateRange";
import axios from "axios";

export default function Statistic() {
  const [table, setTable] = useState([]);
  const [count, setCount] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0,
  });

  const tableData = async (provinces, sort) => {
    let req = {};
    if (provinces !== "" && provinces !== undefined) {
      req.provinsi = provinces;
    }

    if (sort !== "" && sort !== undefined) {
      req.sort = sort;
    }
    try {
      const response = await axios.get("/api/table", {
        params: req,
      });
      return response.data.data;
    } catch (error) {
      console.log("error :=>", error);
    }
  };

  const countData = async () => {
    try {
      const response = await axios.get("/api/chart/count");
      return response.data.data;
    } catch (error) {
      console.log("error :=>", error);
    }
  };

  useEffect(() => {
    tableData().then((data) => {
      setTable(data);
    });
    countData().then((data) => {
      setCount(data);
    });
  }, []);

  const tableFilter = async (value) => {
    let { provinces, sort } = value;
    tableData(provinces, sort).then((data) => {
      setTable(data);
    });
  };

  return (
    <div className="w-screen">
      <div className="flex space-x-4 p-4 h-[139px]">
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Total</h5>
          <h2 className="text-2xl ">{count.total}</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Hari ini</h5>
          <h2 className="text-2xl ">{count.today}</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Minggu ini</h5>
          <h2 className="text-2xl ">{count.thisWeek}</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
        <div className="flex-1 p-4 rounded-[12px] border-[2px] flex flex-col justify-between border-[#ECEEF6]">
          <h5 className="text-sm font-semibold">Bulan ini</h5>
          <h2 className="text-2xl ">{count.thisMonth}</h2>
          <h5 className="text-sm text-[#949494]">suara</h5>
        </div>
      </div>
      <div className="p-4 w-screen min-w-fit">
        <div className="rounded-md border-[2px] p-2 border-[#ECEEF6]">
          <div className="w-[100%] flex flex-row-reverse px-3">
            <DateRange />
          </div>
          <BarPerprovinsi />
        </div>
      </div>
      <div className="lg:flex w-screen p-4">
        <div className="lg:w-[70%] overflow-auto sm:w-[100%] relative md:w-[70%] mb-5 p-4 lg:mr-4 min-w-fit max-w-screen-sm rounded-[12px] border-[2px] border-[#ECEEF6]">
          <Table table={table} reqTable={tableFilter} />
        </div>
        <div className="lg:w-[41%] md:w-[41%]  sm:w-[100%] min-w-fit  p-4 rounded-[12px] border-[2px] border-[#ECEEF6]">
          <h3 className="text-[20px]">Rentan Usia</h3>
          <PiePendukung />
        </div>
      </div>
    </div>
  );
}
