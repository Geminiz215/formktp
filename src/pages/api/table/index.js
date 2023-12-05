import { GroupByKabupaten } from "../../../../conn/query";
require("dotenv").config();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { sort, provinsi } = req.query;
      const documents = await GroupByKabupaten(provinsi, sort);
      return res.status(200).json({ data: documents });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
