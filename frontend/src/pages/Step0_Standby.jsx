// frontend/src/pages/Step0_Standby.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";
import WaveLoader from "../components/WaveLoader.jsx"; // <-- Imported NEW Loader

const Step0_Standby = ({ nextStep, setStartTime }) => {
  const handleStart = () => {
    setStartTime(Date.now());
    nextStep();
  };

  return (
    <div className="kiosk-card standby-card">
      <h2>Take a moment</h2>
      {/* Using the WaveLoader Component */}
      <WaveLoader />
      <br />
      <PrimaryButton text="Feel Better" onClick={handleStart} />
    </div>
  );
};

export default Step0_Standby;
