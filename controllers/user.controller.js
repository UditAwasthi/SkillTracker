import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
 
    const { username, email, password } = req.body;
    try {
    const newUser =await new User({ username, email, password });
    const user = await User.create(newUser);
    res.status(201).json(user);
    } catch (error) {   
    res.status(500).json({ message: "Error creating user", error });
    }

}