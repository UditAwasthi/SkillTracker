import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
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
    date:{
        type: Date,
        default: ()=> new Date()
    },

    completionRate:{
        type: Number,
        default: 0
    },

    timeSpent:{
        type: Number,
        default: 0
    },
    resultNotes: String
}, { timestamps: true });

const Progress = mongoose.model("Progress", progressSchema);
export { Progress };