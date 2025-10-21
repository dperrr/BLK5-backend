import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try{
        const { firstName, lastName, email, password, role} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)  return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json({ message: `${firstName} ${lastName} registered succesfully`});
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if(!user) return res.status(401).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user._id);
    res.json({ message: "Try"  ,accessToken: newAccessToken });

  }catch (err) {
    return res.status(401).json({ message: "Invalid refresh tokenew" });
  }
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // send refresh token in cookie (httpOnly)
    const acessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.json({
      message: "Login successful",
      acessToken,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      "message": "User profile fetched successfully",
      user
    })

  }catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
