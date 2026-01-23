import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createMotorcycle, getMotorcycles, getMotorcycleById, updateMotorcycle, deleteMotorcycle, } from "../controllers/motorcycleController.js";
import { upload } from '../config/cloudinary.js';


const router = express.Router();

router.post("/", protect, upload.single("image"), createMotorcycle);
router.get("/motors", protect, getMotorcycles);
router.get("/:id", protect, getMotorcycleById);
router.put("/:id", protect, upload.single("image"), updateMotorcycle);
router.delete("/:id", protect, deleteMotorcycle);

export default router;