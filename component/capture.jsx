// pages/index.js
import { useState } from 'react';

const Capture = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoStream) {
      const video = document.getElementById('camera-preview');
      const canvas = document.createElement('canvas');
      canvas.width = video.width;
      canvas.height = video.height;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, video.width, video.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  const handleUpload = () => {
    // Perform upload logic with capturedImage
    console.log('Uploading captured image:', capturedImage);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
      {capturedImage ? (
        <>
          <img src={capturedImage} alt="Captured" className="mb-4 rounded" />
          <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </>
      ) : (
        <>
          <video
            id="camera-preview"
            className="w-full h-auto rounded"
            autoPlay
            playsInline
            muted
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={startCamera}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Start Camera
            </button>
            <button
              onClick={capturePhoto}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Capture Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Capture;
