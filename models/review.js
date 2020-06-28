const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema ({
    user: {
        type: String,
        required: [true, "User is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;