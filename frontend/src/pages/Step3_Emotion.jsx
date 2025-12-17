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
  const selectedEmotions = sessionData.emotionBefore || [];

  const toggleEmotion = (emotion) => {
    let newSelection;
    if (selectedEmotions.includes(emotion)) {
      newSelection = selectedEmotions.filter((item) => item !== emotion);
    } else {
      newSelection = [...selectedEmotions, emotion];
    }
    handleDataInput("emotionBefore", newSelection, false);
  };

  const isReadyToProceed = selectedEmotions.length > 0;

  return (
    <div
      className="kiosk-card standby-card"
      style={{ paddingBottom: "120px" }} // Added padding to push the card height so button doesn't overlap
    >
      <h2>What brings you here today?</h2>

      <div className="button-group">
        {emotionOptions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => toggleEmotion(emotion)}
            className={
              selectedEmotions.includes(emotion) ? "selected-button" : ""
            }
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* NEW: Circular Arrow Button anchored to bottom right with fine-tuned positioning */}
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
        <p className="tap-hint" style={{ opacity: isReadyToProceed ? 0.6 : 0 }}>
          Next
        </p>
      </div>
    </div>
  );
};

export default Step3_Emotion;
