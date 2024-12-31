import React, { useState } from "react";
import SendOtp from "../components/templates/SendOtp";
import ChekOtp from "../components/templates/ChekOtp";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  return (
    <div>
      {step === 1 && (
        <SendOtp setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && (
        <ChekOtp
          code={code}
          setCode={setCode}
          mobile={mobile}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default AuthPage;
