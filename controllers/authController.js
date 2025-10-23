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

    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      "message": "User profile fetched successfully",
      user
    })

  }catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if(req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 12);
    };

    const updateUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        password: updateUser.password,
        email: updateUser.email,
        role: updateUser.role
      }
    });

  }catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logOut = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
  });
  return res.json({ message: "Logged out successfully" });
}
