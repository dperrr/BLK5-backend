import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import motorcylceRoutes from "./motorCycleRoutes.js";

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/motorcycles", motorcylceRoutes);


export default router;
