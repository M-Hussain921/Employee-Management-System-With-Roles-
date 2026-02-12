const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    designation: { type: String },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    salary: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema)