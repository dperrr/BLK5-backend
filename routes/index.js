import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import motorcylceRoutes from "./motorCycleRoutes.js";
import partRoutes from "./partRoutes.js"
import maintenanceRoutes from "./maintenanceRoutes.js"

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/motorcycles", motorcylceRoutes);
router.use("/parts", partRoutes);
router.use("/maintenance", maintenanceRoutes);



export default router;
