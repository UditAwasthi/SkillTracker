import { Skill } from "../models/skill.model.js";


const createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body; 
    const skill = await Skill.create({ name, category, level });
    res.json({ message: "Skill created successfully", skill });
  } catch (err) {
    res.status(400).json({ message: "Error creating skill", error: err.message });
  } };

const deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    await Skill.findByIdAndDelete(skillId);
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting skill", error: err.message });
  } };
const updateSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const updates = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(skillId, updates, {
      new: true,
    });
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: "Error updating skill", error: err.message });
  } };

const getllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(400).json({ message: "Error fetching skills", error: err.message });
  }
};

export { createSkill, deleteSkill, updateSkill, getllSkills };