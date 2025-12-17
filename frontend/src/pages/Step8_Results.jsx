// frontend/src/pages/Step8_Results.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step8_Results = ({ sessionData, nextStep }) => {
  const hrBefore = sessionData.hrBefore || "N/A";
  const hrAfter = sessionData.hrAfter || "N/A";

  return (
    <div className="kiosk-card standby-card">
      <h2>Your rhythm has its own pace and it’s welcome here.</h2>

      <div className="result-comparison">
        <p>
          Pulse Data: <span className="result-value">{hrBefore} BPM</span>{" "}
          <span className="arrow-symbol">&rarr;</span>{" "}
          <span className="result-value">{hrAfter} BPM</span>
        </p>

        {/* Optional: Show selected emotions/goals if they are arrays */}
        <p style={{ marginTop: "15px", fontSize: "1rem" }}>
          Focus:{" "}
          <span className="result-value">
            {Array.isArray(sessionData.sessionType)
              ? sessionData.sessionType.join(", ")
              : sessionData.sessionType || "General"}
          </span>
        </p>
      </div>

      {/* Circular Arrow Button anchored to bottom right */}
      <div className="bottom-right-anchor">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={nextStep}
        />
        <p className="tap-hint" style={{ opacity: 0.6 }}>
          Next
        </p>
      </div>
    </div>
  );
};

export default Step8_Results;
