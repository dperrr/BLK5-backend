import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addPart,
    getParts,
    updatePart,
    deletePart,
} from "../controllers/partController.js"


const router = express.Router();


router.post("/:motorcycleId", protect, addPart);

router.get("/:motorcycleId", protect, getParts);

router.put("/edit/:partId", protect, updatePart);

router.delete("/delete/:partId", protect, deletePart);

export default router;