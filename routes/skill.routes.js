import { Router } from "express";
import { createSkill,deleteSkill,updateSkill,getllSkills } from "../controllers/skill.controller.js";

const router = Router();
router.post("/", createSkill);
router.delete("/:id", deleteSkill);
router.put("/:id", updateSkill);
router.get("/", getllSkills);
export default router;
