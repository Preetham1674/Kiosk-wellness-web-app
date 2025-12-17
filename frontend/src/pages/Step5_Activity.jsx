// frontend/src/pages/Step5_Activity.jsx
import React, { useState, useEffect, useRef } from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step5_Activity = ({ sessionData, nextStep }) => {
  // Controls when the actual activity (video) starts
  const [showActivity, setShowActivity] = useState(false);

  // Ref to control the video element
  const videoRef = useRef(null);

  // EFFECT to handle the 5-second delay after the page loads
  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setTimeout(() => {
      setShowActivity(true);

      // Trigger video playback
      // Note: Timeout gives React a moment to render the video element before we call .play()
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.log("Video playback error:", error);
          });
        }
      }, 100);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  // Handler to skip the video and advance to the next step
  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    nextStep();
  };

  // --- Display Pre-Activity Message (Shown for 5 seconds) ---
  if (!showActivity) {
    return (
      <div className="kiosk-card">
        <div
          style={{
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            Gently move in that direction
          </h2>
          <p style={{ color: "var(--pastel-blue)", fontStyle: "italic" }}>
            Preparing your {sessionData.sessionType} session...
          </p>
        </div>
      </div>
    );
  }

  // --- Display Main Activity (After 5s delay) ---
  return (
    <div className="kiosk-card activity-media-card">
      <h2>Guided {sessionData.sessionType} Session</h2>

      <div
        className="activity-media-container"
        style={{ margin: "20px auto", maxWidth: "600px", position: "relative" }}
      >
        <video
          ref={videoRef}
          src="/medvideo.mp4"
          autoPlay
          muted={false}
          controls={true}
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <PrimaryButton
        text="Finish Activity Early"
        onClick={handleSkip}
        disabled={false}
      />
    </div>
  );
};

export default Step5_Activity;
