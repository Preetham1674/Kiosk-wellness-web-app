// frontend/src/pages/Step4_Goal.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const goalOptions = [
  "More ease",
  "A clear head",
  "Grounded",
  "Light",
  "At peace",
  "Slow things down",
  "Recharge",
  "Balanced",
];

const Step4_Goal = ({ sessionData, handleDataInput, nextStep }) => {
  const isReadyToProceed = sessionData.sessionType;

  return (
    <div className="kiosk-card">
      <h2>Where would you like this moment to take you?</h2>

      <p className="emotion-prompt">I want to feel...</p>
      <div className="button-group">
        {goalOptions.map((type) => (
          <button
            key={type}
            // Retaining the manual advance logic (next=false) as requested in previous steps
            onClick={() => handleDataInput("sessionType", type, false)}
            className={
              sessionData.sessionType === type ? "selected-button" : ""
            }
          >
            {type}
          </button>
        ))}
      </div>

      <PrimaryButton
        text="Start Guided Activity"
        // Button advances to the activity (Step 5)
        onClick={nextStep}
        disabled={!isReadyToProceed}
      />
    </div>
  );
};

export default Step4_Goal;
