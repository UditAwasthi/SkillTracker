import { Router } from "express";
import { createSkill,deleteSkill,updateSkill,getllSkills } from "../controllers/skill.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.post("/", requireAuth, createSkill);
router.delete("/:id", requireAuth, deleteSkill);
router.put("/:id", requireAuth, updateSkill);
router.get("/", requireAuth, getllSkills);

export default router;
