import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { checkIn } from "../controllers/streak.controller.js";

const router = Router();

router.post("/check-in", requireAuth, checkIn);

export default router;
