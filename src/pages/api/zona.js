import { connectDB, findAllDocuments, insertDocument } from '../../../conn/conn';
require('dotenv').config();



export default async function  handler(req, res)  {
  let collection = 'zona'
  if (req.method === 'GET') {
    try {
      const documents = await findAllDocuments(collection);
      return res.status(200).json({ data: documents });
    } catch (error) {
      console.error('Error fetching documents:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}