import { Router } from "express";
import { createUser,deleteUser,loginUser,updateUser,getAllUsers } from "../controllers/user.controller.js";

const router = Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
router.get("/users", getAllUsers);
export default router;
