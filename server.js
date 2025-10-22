import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";  

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
