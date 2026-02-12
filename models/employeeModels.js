const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    designation: { type: String },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    salary: { type: Number }
}, { timestamps: true,toJSON:{virtuals:true},toObject:{virtuals:true} });

employeeSchema.virtual("users",{
    ref:"users",
    localField:"_id",
    foreignField:"employee"
})

module.exports = mongoose.model("Employee", employeeSchema);