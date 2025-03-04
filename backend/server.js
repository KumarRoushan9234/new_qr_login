import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/qr", require("./routes/qrRoutes"));
app.use("/api/checkin", require("./routes/checkInRoutes"));

app.listen(process.env.PORT, () => console.log(`✅ Server running on port ${process.env.PORT}`));
