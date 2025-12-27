import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({ username, email, password: hash });

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Registration error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ message: "Login error", error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching users", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    updates['password'] = await bcrypt.hash(updates['password'], 10);
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: err.message });
  }
};

export { createUser, loginUser, getAllUsers, updateUser, deleteUser };
