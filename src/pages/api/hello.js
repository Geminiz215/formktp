// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe' })
  } else if (req.method === 'POST') {
    const { filename } = req.body;
    const pythonProcess = spawn('python3', ['KTP-OCR/ocr.py', `KTP-OCR/ktpocr/dataset/${filename}`]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python output: ${data}`);
      res.send(data.toString());
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python: ${data}`);
      res.status(500).send(data.toString());
    });
  } else if (req.method == 'PUT') {
    res.send(req)
  }
}
