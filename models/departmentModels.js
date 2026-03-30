const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        head:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Employee",
            required:true,
        },

        budget:{
            type:Number,
            required:true
        },

        location: { type: String },

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

    }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

departmentSchema.virtual("employees", {
    ref: "Employee",
    localField: "_id",
    foreignField: "department",
});


module.exports = mongoose.model("Department", departmentSchema);