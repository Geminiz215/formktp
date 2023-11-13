// pages/index.js
import React, { useState } from 'react';
import Camera from '../../component/camera';
const Home = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <h1>Camera App</h1>
      <Camera onCapture={handleCapture} />
      {capturedImage && (
        <div>
          <h2>Captured Photo</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default Home;
