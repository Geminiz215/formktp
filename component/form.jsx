// pages/index.js
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
      <form onSubmit={handleSubmit} action='submit'>
        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="name" id="floating_email" onChange={handleChange} value={formData.name}className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name :</label>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative z-0 w-full mb-6 group">
            <input type="email" name="email" id="floating_email" value={formData.email}
            onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
        </div>
        

        <div className="mb-4">
        <div className="relative z-0 w-full mb-6 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" for="floating_phone"  value={formData.phoneNumber}
            onChange={handleChange} name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
    </div>
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

<div className="flex items-center">
    <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label for="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
</div>

        
     </div>
        <div className="flex w-[100%] justify-center">
        <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
  );
  
  }
export default Index;
