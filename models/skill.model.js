import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "General" },
  level: { type: String, default: "beginner" },
});

const Skill = mongoose.model("Skill", skillSchema);

export  {Skill};