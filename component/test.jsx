import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string().matches(/[1-9]\d{11,13}/, "Phone number is not valid"),
  email: Yup.string().email("Invalid email").required("Required"),
  nik: Yup.string().matches(/^\d{16,16}/, "Phone number is not valid"),
  tanggal_lahir: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  jenis_kelamin: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "nonbinary", "other"], "Invalid gender"),
  provinsi: Yup.string().required("Required"),
  kabupaten: Yup.string().required("Required"),
  desa: Yup.string().required("Required"),
});

const ValidationSchemaExample = () => (
  <div className="p-5">
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        referral: "",
        nik: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        provinsi: "",
        kabupaten: "",
        desa: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
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
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </p>
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name{" "}
              </label>
            </div>
          </div>
          <Field name="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="phone" type="phone" />
          {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ValidationSchemaExample;
