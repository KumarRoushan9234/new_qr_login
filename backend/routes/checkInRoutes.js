import express from "express";
import { submitCheckIn, approveCheckIn } from "../controllers/checkInController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitCheckIn);
router.post("/approve", protect, approveCheckIn);

export default router;
