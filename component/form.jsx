// pages/index.js
import { Router } from 'next/router';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Camera from './camera';

const Index = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    ktpPhoto: null,
  });
  //camera
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Perform actions with form data (e.g., send to server, upload photo, etc.)
    console.log('Form Data:', formData);

    // Reset form data
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      ktpPhoto: null,
    });

    try {
      const response = await fetch('http://localhost:3000/api/hello', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully', response);
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
   router.push("/finish");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Pendaftaran Pendukung Prabowo Gibran 2024 </h1>
      <div className="mb-6">
        <img
          src="prabowo.jpg"  // Replace with the actual path to your photo
          alt="Sample Photo"
          className="w-full h-auto rounded"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">KTP Photo:</label>
          <Camera onCapture={handleCapture} />
          {capturedImage && (
          <div>
            <img src={capturedImage} alt="Captured" />
         </div>
           )}
        </div>
        <div>
        
     </div>

        <div className="flex w-[100%] justify-center">
        <button
          type="submit"
          className="bg-blue-500 align-middle hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
  
  }
export default Index;
