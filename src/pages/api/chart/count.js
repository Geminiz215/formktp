import { GetDataCounts } from "../../../../conn/query";
require("dotenv").config();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const documents = await GetDataCounts();
      return res.status(200).json({ data: documents });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
