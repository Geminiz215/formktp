// components/Dropdown.js

import React, { Fragment, useEffect, useState } from "react";
import RecommendInput from "./Dropdown/recommendList";
import { useFormikContext } from "formik";

function ProvinceCityDistrictForm({
  Province,
  Kabupaten,
  Kecamatan,
  provError,
  kabError,
  KecError,
}) {
  const [provinces, setProvinces] = useState([]);
  const [kab, setKab] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    try {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then((response) => response.json())
        .then((provinces) => setProvinces(provinces));
    } catch (error) {
      console.log("error :=>", error);
    }
  }, []);

  const handleProvinciesChange = (value) => {
    setFieldValue(Province, value);
    for (let index = 0; index < provinces.length; index++) {
      if (provinces[index].name === value) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinces[index].id}.json`
        )
          .then((response) => response.json())
          .then((regencies) => setKab(regencies));
      }
    }
  };

  const handleKabupatenChange = (value) => {
    setFieldValue(Kabupaten, value);
    for (let index = 0; index < kab.length; index++) {
      if (kab[index].name === value) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kab[index].id}.json`
        )
          .then((response) => response.json())
          .then((districts) => setKecamatan(districts));
      }
    }
  };

  const handleKecChange = (value) => {
    setFieldValue(Kecamatan, value);
  };

  return (
    <div className="mb-5">
      <RecommendInput
        getDataFromParent={provinces}
        sendDataToParent={handleProvinciesChange}
        text={"Provinsi"}
      />
      <p id="helper-text-explanation" className="text-xs text-red-500">
        {provError ? <div>{"please finish form"}</div> : null}
      </p>
      <RecommendInput
        sendDataToParent={handleKabupatenChange}
        getDataFromParent={kab}
        text={"Kabupaten"}
      />
      <p id="helper-text-explanation" className="text-xs text-red-500">
        {kabError ? <div>{"please finish form"}</div> : null}
      </p>
      <RecommendInput
        sendDataToParent={handleKecChange}
        getDataFromParent={kecamatan}
        text={"Kecamatan"}
      />
      <p id="helper-text-explanation" className="text-xs text-red-500">
        {KecError ? <div>{"please finish form"}</div> : null}
      </p>
    </div>
  );
}

export default ProvinceCityDistrictForm;
