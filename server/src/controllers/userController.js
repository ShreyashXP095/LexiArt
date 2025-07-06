import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const alreadyuser = await userModel.findOne({ email });
    if (alreadyuser)
      return res.status(400).json({ message: "Email already Exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      savedUser: { name: savedUser.name },
    });
  } catch (error) {
    console.log("Error in registering users");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log("Error in Login users");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userCredits = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.log("Error in userCredits users");
    return res.status(500).json({ message: error.message });
  }
};