import { connectDB, findAllDocuments, insertDocument } from '../../../conn/conn';
require('dotenv').config();



export default async function  handler(req, res)  {
  let collection = 'pendukung'
  if (req.method === 'GET') {
    try {
      const documents = await findAllDocuments(collection);
      return res.status(200).json({ data: documents });
    } catch (error) {
      console.error('Error fetching documents:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      console.log(req.body)
      const { name, email, phone, referral, nik, tanggal_lahir, jenis_kelamin, provinsi, kabupaten, desa } = req.body;
      const result = await insertDocument(collection, {
        name,
        email,
        phone,
        referral,
        nik,
        tanggal_lahir,
        jenis_kelamin,
        provinsi,
        kabupaten,
        desa,
      });

      return res.status(201).json({ message: 'Data inserted successfully', data: result });
    } catch (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}