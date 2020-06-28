const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Country name is required"],
        unique: true,
        trim: true
    }
});

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;