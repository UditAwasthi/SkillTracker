import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";


const router = Router();
router.post("/register", createUser);
router.post("/login", loginUser);
export default router;
