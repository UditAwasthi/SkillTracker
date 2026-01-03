import mongoose from "mongoose";
import { Skill } from "../models/skill.model.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const skills = [
  { name: "JavaScript" },
  { name: "Python" },
  { name: "React" },
  { name: "Node.js" },
];

await Skill.insertMany(skills);
console.log("Skills seeded");
process.exit();
