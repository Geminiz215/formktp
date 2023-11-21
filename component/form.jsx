// pages/index.js
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Camera from "./camera";
import axios from "axios";
import Checked from "./chackbox";
import DateForm from "./dateForm";
import Address from "./address";
import Dropdown from "./address";
import ProvinceCityDistrictForm from "./address";
import Gender from "./gender";

const Index = ({ referral }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    referral: "",
    nik: "",
    tangal_lahir: "",
    jenis_kelamin: "",
    provinsi: "",
    kabupaten: "",
    desa: "",
  });

  useEffect(() => {
    if (referral) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        referral: referral,
      }));
    }
  }, [referral]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let formatPhoneNumber = (event) => {
    const input = event.target;
    const numericValue = input.value.replace(/\D/g, "");
    if (!numericValue.startsWith("62")) {
      input.value = "+62" + numericValue;
    }
  };

  const handleBirthDay = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      tangal_lahir: value,
    }));
  };

  const handleProvincies = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      provinsi: value,
    }));
  };
  const handleKabupaten = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      kabupaten: value,
    }));
  };
  const handleDesa = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      desa: value,
    }));
  };

  const handleGender = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      jenis_kelamin: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const router = useRouter();

    try {
      const response = await axios.post("/api/hello", formData);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      referral: "",
      nik: "",
      tangal_lahir: "",
      jenis_kelamin: "",
      provinsi: "",
      kabupaten: "",
      desa: "",
    });

    router.push("/finish");
  };

  return (
    <div className="max-w-2xl mx-auto lg:mt-10 md:mt-0 sm:mt-0 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Pendaftaran Pendukung Prabowo Gibran 2024{" "}
      </h1>
      <div className="mb-6">
        <img
          src="../prabowo.jpg" // Replace with the actual path to your photo
          alt="Sample Photo"
          className="w-full h-auto rounded"
        />
      </div>
      <form onSubmit={handleSubmit} action="submit">
        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="floating_email"
              onChange={handleChange}
              value={formData.name}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name{" "}
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              value={formData.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              onChange={handleChange}
              onInput={formatPhoneNumber}
              pattern="^\+62\d{9,15}$"
              name="phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (+6212008867534)
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="referral"
              id="floating_referral"
              onChange={handleChange}
              value={formData.referral}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_referral"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              referral{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                (optional).
              </a>
              .
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              onChange={handleChange}
              pattern="^\+62\d{9,15}$"
              name="nik"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              NIK
            </label>
          </div>
        </div>
        <DateForm
          selectedDate={formData.tangal_lahir}
          setSelectedDate={handleBirthDay}
        />
        <Gender gender={formData.jenis_kelamin} setGender={handleGender} />
        <ProvinceCityDistrictForm
          setProvince={handleProvincies}
          setKabupaten={handleKabupaten}
          setDesa={handleDesa}
        />

        <div className="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            required
          ></input>
          <label
            htmlFor="link-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Saya setuju{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              memberikan data saya untuk keperluan informasi mengenai kegiatan
              pemilu 2024.
            </a>
            .
          </label>
        </div>

        <div className="flex w-[100%] justify-center mt-10">
          <button
            type="submit"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Index;
