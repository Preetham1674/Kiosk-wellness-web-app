// frontend/src/pages/Step8_Results.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step8_Results = ({ nextStep }) => {
  return (
    <div className="kiosk-card standby-card">
      {/* Purely textual message */}
      <h2 style={{ fontSize: "2rem", lineHeight: "1.4", margin: "40px 0" }}>
        Your rhythm has its own pace and it’s welcome here.
      </h2>

      {/* Circular Arrow Button anchored to bottom right */}
      <div className="bottom-right-anchor">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={nextStep}
        />
      </div>
    </div>
  );
};

export default Step8_Results;
