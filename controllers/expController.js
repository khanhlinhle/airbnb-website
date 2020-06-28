const Exp = require("../models/experience");
const Tag = require("../models/tag");
const { createTags } = require("./tagController");

exports.getExperienceList = async (request, response) => {
    try {
        const experienceList = await Exp.find({});
        response.status(200).json({
            status: "Success",
            data: experienceList
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

exports.createExperience = async (request, response) => {
    try {
        const user = request.user;
        const { title, duration, groupSize, images, description, items, price, tags } = request.body;
        if (!title || !description || !tags || !duration || !groupSize || !images || !items || !price)
            return res.status(400).json({
                status: "fail",
                error: "Title, duration, group size, images, description, items, price and tags are required "
            });
        const tagObj = await createTags(tags);
        const newExperience = await Exp.create({
            title: title,
            duration: duration,
            groupSize: groupSize,
            images: images,
            description: description,
            items: items,
            price: price,
            tags: tagObj,
            host: user._id
        });
        response.status(200).json({
            status: "Success",
            data: newExperience
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

exports.updateExperience = async (request, response) => {
    try {
        const exp = await Exp.findByIdAndUpdate(request.params.expId);
        if (!exp) {
            throw new Error("Undefined experience");
        };
        const expFields = Object.keys(request.body);
        expFields.map(field => exp[field] = request.body[field]);
        response.status(200).json({
            status: "Success",
            data: exp
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};