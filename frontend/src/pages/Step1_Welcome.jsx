// frontend/src/pages/Step1_Welcome.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step1_Welcome = ({ nextStep }) => {
  return (
    <div className="kiosk-card standby-card">
      <h2>Settle in, nothing else matters right now.</h2>

      {/* Positioned container for the arrow */}
      <div className="bottom-right-anchor">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={nextStep}
        />
        <p className="tap-hint">Next</p>
      </div>
    </div>
  );
};

export default Step1_Welcome;
