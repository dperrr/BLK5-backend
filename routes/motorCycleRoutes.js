import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createMotorcycle, getMotorcycles, getMotorcycleById, updateMotorcycle, deleteMotorcycle, } from "../controllers/motorcycleController.js";


const router = express.Router();

router.post("/", protect, createMotorcycle);
router.get("/", protect, getMotorcycles);
router.get("/:id", protect, getMotorcycleById);
router.put("/:id", protect, updateMotorcycle);
router.delete("/:id", protect, deleteMotorcycle);

export default router;