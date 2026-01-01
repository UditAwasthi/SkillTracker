import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";
import { Progress } from "../models/progress.model.js";

const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    const skills = user.selectedskills;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const playlist = await Playlist.findOne({
      userId,
      dateAssigned: { $gte: today },
    }).populate("skillId");

    const todayProgress = await Progress.findOne({
      userId,
      date: { $gte: today },
    }).populate("skillId");

    const lastCheckIn = user.lastCheckIN ? new Date(user.lastCheckIN) : null;
    let checkedToday = false;
    if (lastCheckIn) {
      const last = new Date(lastCheckIn);
      last.setHours(0, 0, 0, 0);
      checkedToday = last.getTime() === today.getTime();
    }

    return res.json({
      message: "Dashboard Data Loaded Successfully",
      user,
      skills,
      playlist: playlist || null,
      todayProgress: todayProgress || null,
      streakData: {
        currentStreak: user.streak,
        lastCheckIn: user.lastCheckIN,
        checkedToday,
        nextCheckInRequired: !checkedToday,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Dashboard Error", error: error.message });
  }
};

export { getDashboardData };
