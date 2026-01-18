import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import routes from "./routes/index.js";  
import listEndpoints from "express-list-endpoints";
dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
console.table(listEndpoints(routes));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));