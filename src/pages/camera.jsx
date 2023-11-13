// pages/index.js
import React, { useState } from 'react';
import BeautyForm from '../../component/testt';
const Home = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <BeautyForm/>
    </div>
  );
};

export default Home;
