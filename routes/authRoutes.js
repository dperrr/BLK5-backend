import express from "express";
import { registerUser, loginUser, getUserProfile, refreshToken, logOut, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userProfile", protect, getUserProfile, (req, res) => {
  res.json({ message: "Welcome, authorized user", user: req.user });
});
router.put("/updateProfile", protect, updateProfile);
router.post("/refresh", refreshToken);
router.post("/logout", logOut);


export default router;
