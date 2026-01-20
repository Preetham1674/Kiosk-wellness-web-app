// frontend/src/pages/Step5_PostEmotion.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step6_PostEmotion = ({ handleDataInput }) => {
  const handleContinue = () => {
    // Save a default value and advance to the final heart rate check
    handleDataInput("emotionAfter", "Not specified");
  };

  return (
    <div className="kiosk-card standby-card">
      <h2>Stay with what unfolds</h2>

      <div style={{ marginTop: "40px", textAlign: "center" }}></div>

      {/* Circular Arrow Button anchored to bottom right */}
      <div className="bottom-right-anchor">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleContinue}
        />
      </div>
    </div>
  );
};

export default Step6_PostEmotion;
