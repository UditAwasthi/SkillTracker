import { Router } from "express";
import {requireAuth} from "../middleware/auth.js"
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/',requireAuth,getDashboardData);

export default router;