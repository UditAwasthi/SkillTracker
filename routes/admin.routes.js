import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = Router();
router.get("/stats", requireAuth, getAdminStats);

export default router;
