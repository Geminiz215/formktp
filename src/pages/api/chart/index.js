import { GroupByProvinsi } from "../../../../conn/query";
require("dotenv").config();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { start, end } = req.query;
      // const documents = await GroupByProvinsi(start, end);
      return res.status(200).json({ data: "ok" });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
