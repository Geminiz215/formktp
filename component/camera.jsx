// components/Camera.js

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);

  useEffect(() => {
    if (cameraStarted) {
      const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.video.srcObject = stream;
        }
      };

      startCamera();
    }
  }, [cameraStarted]);

  const handleStartCamera = () => {
    setCameraStarted(true);
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }
  };

  return (
    <div>
      {!cameraStarted && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStartCamera}>Start Camera</button>
      )}
      {cameraStarted && (
        <div>
          <Webcam
            audio={false}
            height={480}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
          />
          <button onClick={capture}>Capture Photo</button>
        </div>
      )}
    </div>
  );
};

export default Camera;
