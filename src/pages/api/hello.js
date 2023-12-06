import { findAllDocuments, insertDocument } from "../../../conn/query";
import hCaptcha from "hcaptcha";
require("dotenv").config();

export default async function handler(req, res) {
  let collection = "pendukung";
  if (req.method === "GET") {
    try {
      // const documents = await findAllDocuments(collection);
      return res.status(200).json({ data: "ok" });
    } catch (error) {
      console.error("Error fetching documents:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        name,
        email,
        phone,
        referral,
        nik,
        tanggal_lahir,
        jenis_kelamin,
        provinsi,
        kabupaten,
        kecamatan,
        captcha,
      } = req.body;

      const response = await hCaptcha.verify(
        process.env.HCAPTCHA_SECRET_KEY,
        captcha
      );

      if (!response.success) {
        res
          .status(400)
          .json({ success: false, error: "hCaptcha verification failed" });
      }

      const result = await insertDocument({
        name,
        email,
        phone,
        referral,
        nik,
        tanggal_lahir,
        jenis_kelamin,
        provinsi,
        kabupaten,
        kecamatan,
      });

      return res
        .status(201)
        .json({ message: "Data inserted successfully", data: "successed" });
    } catch (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
