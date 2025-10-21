import express from "express";
import { registerUser, loginUser, getUserProfile, refreshToken} from "../controllers/authController.js";
import { protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile, (req, res) => {
  res.json({ message: "Welcome, authorized user", user: req.user });
});
router.get("/refresh", refreshToken);


export default router;
