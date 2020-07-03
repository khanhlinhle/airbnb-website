const mongoose = require("mongoose");

const expSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Only host user can create experience"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"]
    },
    groupSize: {
        type: Number,
        required: [true, "Group size is required"]
    },
    images: [{
        type: [String],
        required: [true, "Images are required"]
    }],
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    items: [{
        type: [String],
        required: [true, "At least 1 item is needed"]
    }],
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: [true, "At least 1 tag is needed"]
    }],
    city: {
        type: String,
        required: [true, "City is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    }
}, {
    timestamps: true
});

const Exp = mongoose.model("Exp", expSchema);
module.exports = Exp;