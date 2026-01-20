// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import sessionRoutes from "./routes/sessionRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Allows parsing of JSON request body

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/sessions");
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Routes
// Health check route
app.get("/", (req, res) => res.send("Kiosk Backend Running!"));
// Session submission route
app.use("/api/sessions", sessionRoutes);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
