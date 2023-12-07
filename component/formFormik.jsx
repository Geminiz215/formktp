// pages/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ProvinceCityDistrictForm from "./address";
import DatePickerComponent from "./dateForm";
import Captcha from "./captca";

const FormFormik = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log(code);
  }, [code]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]\d{10,12}$/, "Phone number is not valid")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Required"),
    nik: Yup.string()
      .matches(/^\d{16}$/, "NIK must be a 16-digit number")
      .required("NIK is required"),
    tanggal_lahir: Yup.string().required("Date of birth is required"),
    jenis_kelamin: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female", "nonbinary", "other"], "Invalid gender"),
    provinsi: Yup.string().required("Required"),
    kabupaten: Yup.string().required("Required"),
    kecamatan: Yup.string().required("Kabupaten is equired"),
    captcha: Yup.string().required("captcha is required"),
  });

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("/api/hello", e);
      router.push("/finish/1");
    } catch (error) {
      console.error("Error:", error);
      router.push("/finish/-1");
    }
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
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          referral: code || "",
          nik: "",
          tanggal_lahir: "",
          jenis_kelamin: "",
          provinsi: "",
          kabupaten: "",
          kecamatan: "",
          captcha: "",
        }}
        enableReinitialize={true}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  name="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />

                {errors.name ? (
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-xs text-red-500"
                  >
                    {errors.name}
                  </p>
                ) : null}

                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nama{" "}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  name="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />

                {errors.email ? (
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-xs text-red-500"
                  >
                    {errors.email}
                  </p>
                ) : null}

                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  email{" "}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  name="referral"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                {errors.referral ? (
                  <p className="mt-2 text-sm text-red-500">{errors.referral}</p>
                ) : null}

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
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  name="nik"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />

                {errors.nik ? (
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-xs text-red-500"
                  >
                    {errors.nik}
                  </p>
                ) : null}

                <label
                  htmlFor="floating_nik"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  nik{" "}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nomor telepon:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 19 18"
                  >
                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                  </svg>
                </div>
                <Field
                  name="phone"
                  placeholder="081234560987"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {errors.phone ? (
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-xs text-red-500"
                >
                  {errors.phone}
                </p>
              ) : null}
            </div>
            <DatePickerComponent
              name="tanggal_lahir"
              className=" mb-4 p-2 border rounded-md w-full"
            />
            {errors.tanggal_lahir ? (
              <p
                id="helper-text-explanation"
                className="mt-2 text-xs text-red-500"
              >
                {errors.tanggal_lahir}{" "}
              </p>
            ) : null}
            <div className="mb-4 mt-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-600"
              >
                Jenis Kelamin :
              </label>
              <Field
                as="select"
                name="jenis_kelamin"
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="" disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <p
                id="helper-text-explanation"
                className="mt-2 text-xs text-red-500"
              >
                {errors.jenis_kelamin ? (
                  <div>{errors.jenis_kelamin}</div>
                ) : null}
              </p>
            </div>
            <ProvinceCityDistrictForm
              Province="provinsi"
              Kabupaten="kabupaten"
              Kecamatan="kecamatan"
              provError={errors.provinsi}
              kabError={errors.kabupaten}
              KecError={errors.kecamatan}
            />
            <Captcha name="captcha" />
            {errors.captcha ? (
              <p
                id="helper-text-explanation"
                className="mt-2 text-xs text-red-500"
              >
                {errors.captcha}
              </p>
            ) : null}

            <div className="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
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
                  memberikan data saya untuk keperluan informasi mengenai
                  kegiatan pemilu 2024.
                </a>
                .
              </label>
            </div>
            <div className="flex w-[100%] justify-center mt-10">
              <button
                type="submit"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={() => {
                  console.log(errors);
                }}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormFormik;
