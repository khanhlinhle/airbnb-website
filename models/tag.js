const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "Tags are required"],
        unique: true,
    }
}, {
    timestamps: true
});

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;