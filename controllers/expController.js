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
        const { title, description } = request.body;
        if (!title || !description)
            return res.status(400).json({
                status: "fail",
                error: "Title and description are required "
            });
        // const tagObj = await createTags(tags);
        const newExperience = await Exp.create({
            title: title,
            // duration,
            // groupSize,
            // images,
            description: description,
            // items,
            // price,
            // tags: tagObj,
            host: user._id,
            // country,
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

exports.findExperience = async (request, response) => {
    try {
        const exp = await Exp.findOne(request.params.experienceId);
        if (!exp) throw new Error("Undefined experience");
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

exports.updateExperience = async (request, response) => {
    try {
        const exp = await Exp.findByIdAndUpdate(request.params.experienceId);
        if (!exp) {
            throw new Error("Undefined experience");
        };
        const expFields = Object.keys(request.body);
        expFields.map(field => exp[field] = request.body[field]);
        await exp.save();
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

exports.deleteExperience = async (request, response) => {
    try {
        const exp = await Exp.findByIdAndDelete(request.params.experienceId);
        if (!exp) {
            throw new Error("Undefined experience");
        };
        response.status(200).json({
            status: "Success",
            data: null
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};