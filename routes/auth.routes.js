import { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.delete("/:id", requireAuth, deleteUser);
router.put("/:id", requireAuth, updateUser);
router.get("/get-all-users", requireAuth, getAllUsers);

export default router;


// 69504a82dcb4a2dffbc394c3