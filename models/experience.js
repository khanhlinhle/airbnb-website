const mongoose = require("mongoose");

const expSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    duration: {
        type: Number
    },
    groupSize: {
        type: String,
        required: [true, "Group size is required"]
    },
    images: {
        type: [String],
        required: [true, "Images are required"]
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    items: {
        type: [String],
        required: [true, "Items are required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Only host user can create experience"]
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: [true, "At least 1 tag is needed"]
    }],
    // country: {
    //     type: [Country],
    //     required: [true, "Country is required"]
    // }
}, {
    timestamps: true
});

const Exp = mongoose.model ("Exp", expSchema);
module.exports = Exp;