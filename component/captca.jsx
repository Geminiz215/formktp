// pages/captcha.js
import { useState } from "react";

const CaptchaPage = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  function generateCaptcha() {
    const num1 = getRandomNumber(1, 10);
    const num2 = getRandomNumber(1, 10);
    const answer = num1 + num2;

    return {
      expression: `${num1} + ${num2} =`,
      answer: answer.toString(),
    };
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function refreshCaptcha() {
    setUserAnswer("");
    setCaptcha(generateCaptcha());
  }

  function validateCaptcha() {
    if (userAnswer === captcha.answer) {
      setMessage("CAPTCHA is correct! Proceed with your action.");
      refreshCaptcha();
    } else {
      setMessage("CAPTCHA is incorrect. Please try again.");
      refreshCaptcha();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="mb-6 text-xl font-semibold">CAPTCHA Verification</div>
        <div className="mb-4">
          <div className="text-lg">{captcha.expression}</div>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={validateCaptcha}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            onClick={refreshCaptcha}
            className="text-blue-500 underline cursor-pointer"
          >
            Refresh CAPTCHA
          </button>
        </div>
        {message && <div className="mt-4 text-red-500">{message}</div>}
      </div>
    </div>
  );
};

export default CaptchaPage;
