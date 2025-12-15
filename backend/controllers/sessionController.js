// backend/controllers/sessionController.js
import Session from "../models/Session.js";

// @desc    Create a new anonymous session
// @route   POST /api/sessions/complete
// @access  Public (No authentication needed)
const completeSession = async (req, res) => {
  try {
    const {
      sessionType,
      duration,
      emotionBefore,
      emotionAfter,
      hrBefore,
      hrAfter,
    } = req.body;

    // Basic validation to ensure core data exists
    if (!sessionType || !duration || !emotionBefore || !emotionAfter) {
      return res
        .status(400)
        .json({ message: "Missing required session data." });
    }

    const newSession = new Session({
      sessionType,
      duration,
      emotionBefore,
      emotionAfter,
      hrBefore: hrBefore || null,
      hrAfter: hrAfter || null,
    });

    const createdSession = await newSession.save();

    // Respond with a success message, NOT the sensitive data (though it's anonymous)
    res.status(201).json({
      message: "Session data recorded successfully.",
      sessionId: createdSession._id, // We can return the ID, as it is non-identifiable
    });
  } catch (error) {
    console.error("Error saving session:", error);
    res
      .status(500)
      .json({ message: "Server error while saving session data." });
  }
};

export { completeSession };
