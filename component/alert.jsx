import { useState, useEffect } from "react";

const FlyAlert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Adjust the timeout based on your preferred duration

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 right-0 mt-8 mr-8 p-4 rounded-md transform ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } ${
        visible
          ? "translate-x-0 opacity-100 transition-all duration-500 ease-out"
          : "translate-x-full opacity-0 ease-out duration-200 pointer-events-none"
      }`}
    >
      <p className="text-white">{message}</p>
    </div>
  );
};

export default FlyAlert;
