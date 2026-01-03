import { Skill } from "../models/skill.model.js";
import { Course } from "../models/course.js";

const attachCourseToSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // If already linked → reuse
    if (skill.content) {
      const course = await Course.findById(skill.content);
      return res.json({ message: "Course reused", course });
    }

    // Find any existing course with same title
    const existingCourse = await Course.findOne({
      title: new RegExp(skill.name, "i"),
    });

    if (existingCourse) {
      skill.content = existingCourse._id;
      await skill.save();
      return res.json({ message: "Existing course linked", course: existingCourse });
    }

    return res.status(404).json({
      message: "No course found. Generate one via /content",
    });
  } catch (error) {
    res.status(500).json({ message: "Skill–Course error", error: error.message });
  }
};

export { attachCourseToSkill };
