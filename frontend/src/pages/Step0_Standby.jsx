// frontend/src/pages/Step0_Standby.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";
import WaveLoader from "../components/WaveLoader.jsx";

const Step0_Standby = ({ nextStep, setStartTime }) => {
  const handleStart = () => {
    setStartTime(Date.now());
    nextStep();
  };

  return (
    <div className="kiosk-card standby-card">
      <h2>Take a moment</h2>

      <WaveLoader />

      {/* Positioned container for the arrow */}
      <div
        className="bottom-right-anchor"
        style={{ bottom: "30px", right: "30px" }}
      >
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleStart}
        />
      </div>
    </div>
  );
};

export default Step0_Standby;
