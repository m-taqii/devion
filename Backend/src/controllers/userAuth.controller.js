const userModel = require("../models/user.model");

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userModel.create({ name, email, password: hashedPassword });
        const token = user.generateToken();
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "User creation failed", error });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        const hashPassword = await userExist.comparePassword(password);
        if (!hashPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = userExist.generateToken();
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(200).json({ message: "User logged in successfully", user: userExist, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "User login failed", error });
    }
}

module.exports = {
    signup,
    login
}
