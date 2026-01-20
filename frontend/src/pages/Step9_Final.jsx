// frontend/src/pages/Step9_Final.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step9_Final = ({ setStep }) => {
  const handleClose = () => {
    // Hard reset back to the standby screen (Step 0)
    window.location.reload();
  };

  return (
    <div className="kiosk-card standby-card">
      <h2
        style={{ fontSize: "2.5rem", lineHeight: "1.2", marginBottom: "10px" }}
      >
        Carry this ease with you and step back into your day.
      </h2>
      <h2 style={{ color: "var(--pastel-pink)", marginTop: "0px" }}>
        You matter.
      </h2>

      {/* Circular Arrow Button anchored to bottom right */}
      <div className="bottom-right-anchor">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default Step9_Final;
