import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();


connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
