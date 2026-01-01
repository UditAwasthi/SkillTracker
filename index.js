import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // allow Flutter/Electron/mobile apps
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Skill Tracker API");
});

// imports routes
import authRoutes from "./routes/auth.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import userSkillRoutes from "./routes/userskill.routes.js";
import express from "express";
import playlistRoutes from "./routes/playlist.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import dashBoardRoutes from "./routes/dashboard.routes.js"
import streakRoutes from "./routes/streak.routes.js";

// use routes
app.use("/auth", authRoutes);
app.use("/skills", skillRoutes);
app.use("/user/:id/skills", userSkillRoutes);
app.use("/playlist", playlistRoutes);
app.use("/progress", progressRoutes);
app.use("/user/dashboard", dashBoardRoutes);
app.use("/user/streak", streakRoutes);

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error.message);
  });
