import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMaintenance,
  getMaintenances,
  updateMaintenance,
  deleteMaintenance
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", protect, addMaintenance);
router.get("/", protect, getMaintenances);
router.put("/:id", protect, updateMaintenance);
router.delete("/:id", protect, deleteMaintenance);

export default router;