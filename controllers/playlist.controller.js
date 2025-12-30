import { Playlist } from "../models/playlist.model.js";


const createPlaylist = async (req, res) => {
    try {
        // const { skillId, items } = req.body;

        // const playlist = await Playlist.create({
        //     userId: req.userId,      
        //     skillId,
        //     items,
        //     status: "pending"
        // });

        // Above code modified to accept userId from body for testing without auth middleware
        const { userId,skillId, items } = req.body;

        const playlist = await Playlist.create({
            userId,      
            skillId,
            items,
            status: "pending"
        });

        res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error creating playlist", error: error.message });
    }
};
const getTodayPlaylist = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const playlist = await Playlist.findOne({
            // userId: req.userId,
            // Modified to accept userId from body for testing without auth middleware
            userId: req.body.userId,
            dateAssigned: { $gte: today }
        }).populate("skillId");

        if (!playlist) return res.status(404).json({ message: "No playlist for today" });

        res.json({ playlist });
    } catch (error) {
        res.status(500).json({ message: "Error fetching playlist", error: error.message });
    }
};
const updatePlaylistItemStatus = async (req, res) => {
    try {
        const { playlistId, itemIndex, isCompleted } = req.body;

        const playlist = await Playlist.findOne({
            _id: playlistId,
            // userId: req.userId
            // Modified to accept userId from body for testing without auth middleware
            userId: req.body.userId
        });

        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        playlist.items[itemIndex].isCompleted = isCompleted;
        playlist.status = playlist.items.every(i => i.isCompleted) ? "completed" : "in-progress";

        await playlist.save();

        res.json({ message: "Task updated", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};
const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;

        const playlist = await Playlist.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        res.json({ message: "Playlist deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting playlist", error: error.message });
    }
};
export {createPlaylist, getTodayPlaylist, updatePlaylistItemStatus, deletePlaylist};