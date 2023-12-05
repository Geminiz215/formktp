import { GroupByProvinsi } from "../../../../conn/query";
require("dotenv").config();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { sort, provinsi } = req.body;
      const documents = await GroupByProvinsi(provinsi, sort);
      return res.status(200).json({ data: documents });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}