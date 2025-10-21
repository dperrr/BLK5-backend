import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();


connectDB();

app.use(express.json(), cookieParser());

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

