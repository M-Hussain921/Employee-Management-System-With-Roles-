const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },

    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["super_admin", "admin", "hr", "employee"],
        default: "employee"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    deletedAt: {
        type: Date,
        default: null
    },

    restoredAt: {
        type: Date,
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);