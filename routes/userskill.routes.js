
import { Router } from "express";

import {
  addSkillToUser,
  deleteSkillFromUser,
  updatedSkillLevelForUser,
    showUserSkills,
} from "../controllers/user.controller.js";

const router = Router({ mergeParams: true });
router.get("/", showUserSkills);
router.put("/add", addSkillToUser);
router.delete("/remove/:skillId", deleteSkillFromUser);
router.put("/levelUpdate/:skillId", updatedSkillLevelForUser);
export default router;