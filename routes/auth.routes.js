import { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/get-all-users", getAllUsers);

export default router;
