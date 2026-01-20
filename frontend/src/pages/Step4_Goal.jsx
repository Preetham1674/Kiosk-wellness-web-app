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
  // Ensure we are working with an array
  const selectedGoals = sessionData.sessionType || [];

  const toggleGoal = (goal) => {
    let newSelection;
    if (selectedGoals.includes(goal)) {
      newSelection = selectedGoals.filter((item) => item !== goal);
    } else {
      newSelection = [...selectedGoals, goal];
    }
    handleDataInput("sessionType", newSelection, false);
  };

  const isReadyToProceed = selectedGoals.length > 0;

  return (
    <div
      className="kiosk-card standby-card"
      // Added space at the bottom of the card
    >
      <h2>Where would you like this moment to take you?</h2>

      <div className="button-group">
        {goalOptions.map((type) => (
          <button
            key={type}
            onClick={() => toggleGoal(type)}
            className={selectedGoals.includes(type) ? "selected-button" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Circular Arrow Button anchored to bottom right with spacing fix */}
      <div
        className="bottom-right-anchor"
        style={{ bottom: "20px", right: "25px" }}
      >
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={nextStep}
          disabled={!isReadyToProceed}
        />
      </div>
    </div>
  );
};

export default Step4_Goal;
