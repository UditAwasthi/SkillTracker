import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    selectedskills: [
      {
        skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
        category: { type: String, default: "General" },
        level: { type: String, default: "beginner" },
      },
    ],
    streak: {
      type: Number,
      default: 0,
    },
    lastCheckIN: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
