import { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), createUser);
router.post("/login", validate(loginSchema), loginUser);

router.delete("/:id", requireAuth, deleteUser);
router.put("/:id", requireAuth, updateUser);
router.get("/get-all-users", requireAuth, getAllUsers);

export default router;


