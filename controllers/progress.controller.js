import { Progress } from "../models/progress.model.js";

const logProgress = async (req, res) => {
  try {
    const { skillId, completionRate, timeSpent, resultNotes } = req.body;

    const progress = await Progress.create({
      // userId: req.userId
      // Modified to accept userId from body for testing without auth middleware
      userId: req.body.userId,
      skillId,
      completionRate,
      timeSpent,
      resultNotes,
    });

    res.status(201).json({ message: "Progress logged", progress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging progress", error: error.message });
  }
};

const updateProgressEntry = async (req, res) => {
  try {
    const { progressId } = req.params;
    const updates = req.body;

    const progress = await Progress.findOneAndUpdate(
      {
        _id: progressId,
        // userId: req.userId
        // Modified to accept userId from body for testing without auth middleware
        userId: req.body.userId,
      },
      updates,
      { new: true }
    );

    if (!progress) return res.status(404).json({ message: "Entry not found" });

    res.json({ message: "Progress updated", progress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating entry", error: error.message });
  }
};

const getProgressHistory = async (req, res) => {
  try {
    const history = await Progress.find({
      // userId: req.userId
      // Modified to accept userId from body for testing without auth middleware
      userId: req.body.userId,
    })
      .sort({ date: -1 })
      .populate("skillId");

    res.json({ history });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching history", error: error.message });
  }
};
export { logProgress, updateProgressEntry, getProgressHistory };
