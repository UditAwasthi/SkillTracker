import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    },
    items: [
        {
            title: {type: String, required: true},
            description: String,
            resourceLink: String,
            isCompleted: {type: Boolean, default: false}
        }
    ],
    dateAssigned: {type: Date, default: () => new Date()},

    status: {type: String, enu: ["pending", "in-progress", "completed"], default: "pending"},
},{timestamps: true});

const Playlist = mongoose.model("Playlist", playlistSchema);

export {Playlist};
