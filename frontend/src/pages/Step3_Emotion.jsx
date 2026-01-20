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

// Map your UI options to the folder names in public/goal/
const emotionToFolderMap = {
  "Too much right now": "too",
  "Hard to focus": "hard",
  "Feeling restless": "feeling",
  "Low on energy": "low",
  "Just need a pause": "just",
  "Things feel heavy": "things",
  "I’m stuck in my head": "im",
  "Need to reset": "need",
  "Nothing in particular": "nothing",
};

const Step3_Emotion = ({ sessionData, handleDataInput, nextStep }) => {
  const selectedEmotions = sessionData.emotionBefore || [];

  const toggleEmotion = (emotion) => {
    let newSelection;
    if (selectedEmotions.includes(emotion)) {
      newSelection = selectedEmotions.filter((item) => item !== emotion);
    } else {
      newSelection = [...selectedEmotions, emotion];
    }

    // Save the array of emotions
    handleDataInput("emotionBefore", newSelection, false);

    // If this is the FIRST emotion selected, determine and save its audio folder
    if (newSelection.length === 1) {
      const folderName = emotionToFolderMap[newSelection[0]];
      handleDataInput("targetAudioFolder", folderName, false);
    }
  };

  const isReadyToProceed = selectedEmotions.length > 0;

  return (
    <div className="kiosk-card standby-card">
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

export default Step3_Emotion;
