// components/Camera.js

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for rear camera

  const switchCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
    console.log(videoConstraints)
  };

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

  let videoConstraints = {
    facingMode: facingMode,
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
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
          />
          <div className="flex my-3">
          <div onClick={switchCamera} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mb-5"'>Switch camera</div>
          <div onClick={capture} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Capture Photo</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
