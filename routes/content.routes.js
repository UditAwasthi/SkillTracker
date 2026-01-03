import { Router } from "express";
import {requireAuth} from "../middleware/auth.js"
import { generateAndSaveCourse } from "../controllers/content.controller.js";

const router = Router();

router.post('/',requireAuth,generateAndSaveCourse);
export default router;