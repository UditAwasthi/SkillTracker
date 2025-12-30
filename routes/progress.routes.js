import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  logProgress,
  updateProgressEntry,
  getProgressHistory
} from "../controllers/progress.controller.js";

const router = Router();

router.post("/log",  logProgress);
router.put("/update/:progressId",updateProgressEntry);
router.get("/history", getProgressHistory);

export default router;
