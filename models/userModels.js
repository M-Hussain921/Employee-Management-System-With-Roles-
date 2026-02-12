const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: Number },
    age: { type: Number },
    role: { type: String, required: true, enum: ["admin", "hr", "employee"], default: "employee" },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department",required:false }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);