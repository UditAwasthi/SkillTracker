import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({ username, email, password: hash });

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Registration error", error: err.message });
  }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return  res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful", user });
    }catch (err) {
        res.status(400).json({ message: "Login error", error: err.message });
    }

}



export { createUser, loginUser };