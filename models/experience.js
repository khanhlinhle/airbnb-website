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
    },
    groupSize: {
        type: Number
    },
    images: [{
        type: [String]
    }],
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    items: [{
        type: [String]
    }],
    price: {
        type: Number
    },
    // tags: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Tag",
    //     required: [true, "At least 1 tag is needed"]
    // }],
    country: {
        city: { type: String },
        country: { type: String },
    }
}, {
    timestamps: true
});

const Exp = mongoose.model("Exp", expSchema);
module.exports = Exp;