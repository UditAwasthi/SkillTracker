import { User } from "../models/user.model.js";

const checkIn = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.lastCheckIN) {
      user.streak = 1;
      user.lastCheckIN = today;
      await user.save();
      return res
        .status(200)
        .json({ message: "First Check In", streak: user.streak });
    }

    const last = user.lastCheckIN;
    last.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (last.getDate() === today.getDate()) {
      return res.json({
        message: "Already checked in today",
        streak: user.streak,
      });
    }

    if (last.getDate() === yesterday.getDate()) {
      user.streak++;
      user.lastCheckIN = today;
      await user.save();
      return res
        .status(200)
        .json({ message: "Checked In", streak: user.streak });
    }
    user.streak = 1;
    user.lastCheckIN = today;
    await user.save();

    return res.json({
      message: "Streak Reset since you were not regular",
      streak: user.streak,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Streak Error", error: error.message });
  }
};

export { checkIn };
