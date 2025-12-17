// frontend/src/pages/Step1_Welcome.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step1_Welcome = ({ nextStep }) => {
  return (
    <div className="kiosk-card">
      <h2>"Settle in, nothing else matters right now."</h2>
      <p>Ready to validate your experience and test your impact?</p>
      <PrimaryButton text="Let's follow your own rhythm" onClick={nextStep} />
    </div>
  );
};

export default Step1_Welcome;
