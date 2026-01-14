import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
 const { name, email, password } = req.body;

 if (!name || !email || !password) {
  return res.status(400).json({ message: "All fields are required" });
 }

 const existingUser = await User.findOne({ email });

 if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
 }

 if (password.length < 6 || password.length > 18) {
  return res.status(400).json({ message: "Password length must be between 6 to 18 characters" });
 }

 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({
  name,
  email,
  password: hashedPassword
 });

 const token = generateToken(user._id);

 res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: process.env.NODE_ENV === "production"
 });

 return res.status(200).json({
  message: "User registered successfully",
  user: {
   id: user._id,
   name: user.name,
   email: user.email
  }
 });
}

export const login = async (req, res) => {
 const { email, password } = req.body;

 if (!email || !password) {
  return res.status(400).json({ message: "All fields are required" });
 }

 const user = await User.findOne({ email });
 if (!user) {
  return res.status(400).json({ message: "Invalid credentials" });
 }

 const isPasswordMatched = await bcrypt.compare(password, user.password);
 if (!isPasswordMatched) {
  return res.status(400).json({ message: "Invalid credentials" });
 }

 const token = generateToken(user._id);

 res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
 });

 res.status(200).json({
  message: "Login successful",
  user: {
   id: user._id,
   name: user.name,
   email: user.email
  }
 });
};


export const profile = async (req, res) => {
 const user = await User.findById(req.userId).select("-password");
 res.json({ user });
}

export const logout = (req, res) => {
 res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  path: "/"
 });

 res.status(200).json({ message: "Logged out successfully" });
};

