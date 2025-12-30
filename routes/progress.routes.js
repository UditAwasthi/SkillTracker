import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  logProgress,
  updateProgressEntry,
  getProgressHistory
} from "../controllers/progress.controller.js";

const router = Router();

router.post("/log", requireAuth, logProgress);
router.put("/update/:progressId", requireAuth, updateProgressEntry);
router.get("/history", requireAuth, getProgressHistory);

export default router;
