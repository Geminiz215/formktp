// pages/index.js
import React, { useState } from "react";
import BeautyForm from "../../component/testt";
import UserProfile from "../../component/getId";
import CaptchaPage from "../../component/captca";
const Home = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <CaptchaPage />
    </div>
  );
};

export default Home;
