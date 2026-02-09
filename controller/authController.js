const users = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, age, role, department, phoneNumber } = req.body;
    try {
        const existing = await users.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exist" });
        const heshedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({ name, email, password: heshedPassword, age, role, department, phoneNumber });
        res.status(201).json({ message: "Registered successfully", userid: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        if (!user) return res.status(404).json({ message: "user not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invaild Password" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ message: "Login Successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}