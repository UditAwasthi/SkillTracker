// controllers/user.controller.js
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* ================================
   CREATE USER  (REGISTER)
==================================*/
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hash,
    });

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Registration error", error: err.message });
  }
};

/* ================================
   LOGIN USER - USING TOKENS INSTEAD OF Cookies
==================================*/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


/* ================================
   GET ALL USERS
==================================*/
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("selectedskills.skill");
    res.json(users);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching users", error: err.message });
  }
};

/* ================================
   UPDATE USER
==================================*/
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Only rehash password if provided
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

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

/* ================================
   DELETE USER
==================================*/
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: err.message });
  }
};

/* ================================
   ADD SKILL TO USER
==================================*/
const addSkillToUser = async (req, res) => {
  try {
    const { skillId, level = "beginner" } = req.body;

    if (!skillId)
      return res.status(400).json({ message: "No skillId provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent duplicates
    const exists = user.selectedskills.find(
      (item) => item.skill.toString() === skillId
    );
    if (exists) return res.status(400).json({ message: "Skill already added" });

    user.selectedskills.push({ skill: skillId, level });
    await user.save();

    res.json({ message: "Skill added", skills: user.selectedskills });
  } catch (err) {
    res.status(500).json({ message: "Skill add error", error: err.message });
  }
};

/* ================================
   REMOVE SKILL FROM USER
==================================*/
const deleteSkillFromUser = async (req, res) => {
  try {
    const { id, skillId } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.selectedskills = user.selectedskills.filter(
      (item) => item.skill.toString() !== skillId
    );

    await user.save();
    res.json({ message: "Skill removed", skills: user.selectedskills });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Skill removal error", error: err.message });
  }
};

/* ================================
   UPDATE SKILL LEVEL
==================================*/
const updatedSkillLevelForUser = async (req, res) => {
  try {
    const { skillId, level } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const skillObj = user.selectedskills.find(
      (item) => item.skill.toString() === skillId
    );

    if (!skillObj) return res.status(404).json({ message: "Skill not found" });

    skillObj.level = level;
    await user.save();

    res.json({ message: "Skill level updated", skills: user.selectedskills });
  } catch (err) {
    res.status(400).json({ message: "Skill update error", error: err.message });
  }
};

/* ================================
   SHOW USER SKILLS WITH DETAILS
==================================*/
const showUserSkills = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "selectedskills.skill"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.selectedskills);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching skills", error: err.message });
  }
};

export {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addSkillToUser,
  deleteSkillFromUser,
  updatedSkillLevelForUser,
  showUserSkills,
};
