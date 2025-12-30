import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createPlaylist,
  getTodayPlaylist,
  updatePlaylistItemStatus,
  deletePlaylist
} from "../controllers/playlist.controller.js";

const router = Router();

router.post("/create", createPlaylist);
router.get("/today", getTodayPlaylist);
router.put("/update-task", updatePlaylistItemStatus);
router.delete("/:id", deletePlaylist);

export default router;
