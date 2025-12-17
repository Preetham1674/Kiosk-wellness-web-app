import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step9_Final = ({ setStep, handleDataInput }) => {
  const handleClose = () => {
    // Hard reset back to the very beginning
    window.location.reload();
    // OR: setStep(0);
  };

  return (
    <div className="kiosk-card">
      <h2 style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
        Carry this ease with you and step back into your day.
      </h2>
      <h2 style={{ color: "var(--pastel-pink)", marginTop: "10px" }}>
        You matter.
      </h2>

      <div className="animated-button-wrapper" style={{ marginTop: "50px" }}>
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleClose}
        />
      </div>

      <p style={{ marginTop: "20px", opacity: 0.8, fontWeight: "600" }}>
        Close Session
      </p>
    </div>
  );
};

export default Step9_Final;
