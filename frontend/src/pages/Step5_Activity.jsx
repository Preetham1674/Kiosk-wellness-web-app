// frontend/src/pages/Step5_Activity.jsx
import React, { useState, useEffect, useRef } from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step5_Activity = ({ sessionData, nextStep }) => {
  const [showActivity, setShowActivity] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true); // NEW: Track button lockout
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Initial 5-second delay to show the "Preparing" message
    const preparationTimer = setTimeout(() => {
      setShowActivity(true);

      // 2. Start the 7-second lockout timer once the activity reveals
      const lockoutTimer = setTimeout(() => {
        setBtnDisabled(false);
      }, 7000); // 7 seconds

      // 3. Trigger video playback
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.log("Video playback error:", error);
          });
        }
      }, 100);

      return () => clearTimeout(lockoutTimer);
    }, 5000); // 5-second initial delay

    return () => clearTimeout(preparationTimer);
  }, []);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    nextStep();
  };

  // --- Display Pre-Activity Message ---
  if (!showActivity) {
    return (
      <div className="kiosk-card standby-card">
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
            Preparing your{" "}
            {Array.isArray(sessionData.sessionType)
              ? sessionData.sessionType.join(" & ")
              : sessionData.sessionType}{" "}
            session...
          </p>
        </div>
      </div>
    );
  }

  // --- Display Main Activity ---
  return (
    <div
      className="kiosk-card activity-media-card standby-card"
      style={{ paddingBottom: "130px" }}
    >
      <h2>
        Guided{" "}
        {Array.isArray(sessionData.sessionType)
          ? sessionData.sessionType.join(" & ")
          : sessionData.sessionType}{" "}
        Session
      </h2>

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
          onEnded={nextStep}
        />
      </div>

      {/* Circular Arrow Button with 7-second lockout logic */}
      <div
        className="bottom-right-anchor"
        style={{ bottom: "25px", right: "30px" }}
      >
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleSkip}
          disabled={btnDisabled} // Button is disabled for the first 7s
        />
        <p className="tap-hint" style={{ opacity: btnDisabled ? 0.3 : 0.6 }}>
          {btnDisabled ? "Wait..." : "Finish"}
        </p>
      </div>
    </div>
  );
};

export default Step5_Activity;
