import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "General" },
  content:{type: mongoose.Schema.Types.ObjectId, ref: "Course"},
  level: { type: String, default: "beginner" },
});

const Skill = mongoose.model("Skill", skillSchema);

export  {Skill};