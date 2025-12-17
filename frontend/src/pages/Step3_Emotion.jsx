// frontend/src/pages/Step3_Emotion.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const emotionOptions = [
  "Too much right now",
  "Hard to focus",
  "Feeling restless",
  "Low on energy",
  "Just need a pause",
  "Things feel heavy",
  "I’m stuck in my head",
  "Need to reset",
  "Nothing in particular",
];

const Step3_Emotion = ({ sessionData, handleDataInput, nextStep }) => {
  // Checks if an emotion has been selected (hrBefore is placeholder, should be emotionBefore)
  const isReadyToProceed = sessionData.emotionBefore;

  return (
    <div className="kiosk-card">
      <h2>What brings you here today?</h2>

      <p className="emotion-prompt">I currently feel...</p>
      <div className="button-group">
        {emotionOptions.map((emotion) => (
          <button
            key={emotion}
            // FIXED: Set next=false to prevent automatic advance
            onClick={() => handleDataInput("emotionBefore", emotion, false)}
            className={
              sessionData.emotionBefore === emotion ? "selected-button" : ""
            }
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* Primary button is now the required validator and advances to Step 4 */}
      <PrimaryButton
        text="Continue to Goals"
        onClick={nextStep} // Advances to the next screen (Step 4: Goal)
        disabled={!isReadyToProceed} // Disabled until an option is chosen
      />
    </div>
  );
};

export default Step3_Emotion;
