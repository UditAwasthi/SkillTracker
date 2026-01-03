import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { attachCourseToSkill } from "../controllers/skillCourse.controller.js";

const router = Router();

router.post("/:skillId/attach-course", requireAuth, attachCourseToSkill);

export default router;
