
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

import {
  addSkillToUser,
  deleteSkillFromUser,
  updatedSkillLevelForUser,
    showUserSkills,
} from "../controllers/user.controller.js";

const router = Router({ mergeParams: true });
router.get("/", requireAuth, showUserSkills);
router.put("/add", requireAuth, addSkillToUser);
router.delete("/remove/:skillId", requireAuth, deleteSkillFromUser);
router.put("/levelUpdate/:skillId", requireAuth, updatedSkillLevelForUser);

export default router;