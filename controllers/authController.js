import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
