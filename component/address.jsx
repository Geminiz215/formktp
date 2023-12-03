// components/Dropdown.js

import React, { Fragment, useEffect, useState } from "react";
import RecommendInput from "./Dropdown/recommendList";

function ProvinceCityDistrictForm({ setProvince, setKabupaten, setDesa }) {
  const [provinces, setProvinces] = useState([]);
  const [city, setCity] = useState([]);
  const [kab, setKab] = useState([]);

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
    setProvince(value);
    for (let index = 0; index < provinces.length; index++) {
      if (provinces[index].name === value) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinces[index].id}.json`
        )
          .then((response) => response.json())
          .then((regencies) => setCity(regencies));
      }
    }
  };

  const handleCityChange = (value) => {
    setDesa(value);
    for (let index = 0; index < city.length; index++) {
      if (city[index].name === value) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${city[index].id}.json`
        )
          .then((response) => response.json())
          .then((districts) => setKab(districts));
      }
    }
  };

  const handleKabChange = (value) => {
    setKabupaten(value);
  };

  return (
    <div className="mb-5">
      <RecommendInput
        getDataFromParent={provinces}
        sendDataToParent={handleProvinciesChange}
        text={"Provinsi"}
      />
      <RecommendInput
        sendDataToParent={handleCityChange}
        getDataFromParent={city}
        text={"Kabupaten"}
      />
      <RecommendInput
        sendDataToParent={handleKabChange}
        getDataFromParent={kab}
        text={"Kecamatan"}
      />
    </div>
  );
}

export default ProvinceCityDistrictForm;
