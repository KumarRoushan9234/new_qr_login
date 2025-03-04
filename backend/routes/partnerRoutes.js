import express from "express";
import { generateQRCode } from "../controllers/partnerController.js";

const router = express.Router();

router.post("/generate-qr", generateQRCode);

export default router;
