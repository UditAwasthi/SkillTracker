import { User } from "../models/user.model.js";
import { Skill } from "../models/skill.model.js";
import { Course } from "../models/course.js";

const getAdminStats = async (req, res) => {
  const users = await User.countDocuments();
  const skills = await Skill.countDocuments();
  const courses = await Course.countDocuments();

  res.json({ users, skills, courses });
};

export { getAdminStats };
