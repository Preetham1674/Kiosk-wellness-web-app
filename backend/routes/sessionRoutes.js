// backend/routes/sessionRoutes.js
import express from "express";
import { completeSession } from "../controllers/sessionController.js";

const router = express.Router();

// POST request to submit the completed session data
router.post("/complete", completeSession);

export default router;
