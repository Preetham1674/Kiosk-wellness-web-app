import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step8_Results = ({ sessionData, nextStep }) => {
  const hrBefore = sessionData.hrBefore || "N/A";
  const hrAfter = sessionData.hrAfter || "N/A";

  return (
    <div className="kiosk-card">
      <h2>Your rhythm has its own pace and it’s welcome here.</h2>

      <div className="result-comparison">
        <p>
          Pulse Data: <span className="result-value">{hrBefore} BPM</span>{" "}
          <span className="arrow-symbol">&rarr;</span>{" "}
          <span className="result-value">{hrAfter} BPM</span>
        </p>
      </div>

      <div className="animated-button-wrapper">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={nextStep}
        />
      </div>
      <p style={{ marginTop: "15px", opacity: 0.6 }}>Next</p>
    </div>
  );
};

export default Step8_Results;
