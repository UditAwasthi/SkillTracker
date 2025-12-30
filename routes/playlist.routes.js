import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createPlaylist,
  getTodayPlaylist,
  updatePlaylistItemStatus,
  deletePlaylist
} from "../controllers/playlist.controller.js";

const router = Router();

router.post("/create", requireAuth, createPlaylist);
router.get("/today", requireAuth, getTodayPlaylist);
router.put("/update-task", requireAuth, updatePlaylistItemStatus);
router.delete("/:id", requireAuth, deletePlaylist);

export default router;
