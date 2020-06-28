const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    tokens: [{
        type: String
    }],
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["Normal", "Host"],
        default: "Normal"
    },
    introduction: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;