import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useFormikContext } from "formik";

const Captcha = ({ name }) => {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const { setFieldValue, values } = useFormikContext();

  const onLoad = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {
    setFieldValue(name, token);
  }, [token]);

  return (
    <HCaptcha
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
      onLoad={onLoad}
      onVerify={setToken}
      ref={captchaRef}
    />
  );
};

export default Captcha;
