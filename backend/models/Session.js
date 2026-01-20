// backend/models/Session.js
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  sessionType: { type: String, required: true }, // Calm, Focus, Sleep
  duration: { type: Number, required: true }, // in seconds
  emotionBefore: { type: String, required: true }, // Anxious, Neutral, etc.
  emotionAfter: { type: String, required: true }, // better than before, same, etc.
  hrBefore: { type: Number, default: null }, // Optional heart rate data
  hrAfter: { type: Number, default: null }, // Optional heart rate data
});

// Important: Note that there are NO fields for user ID, email, or name.
const Session = mongoose.model("Session", SessionSchema);

export default Session;
