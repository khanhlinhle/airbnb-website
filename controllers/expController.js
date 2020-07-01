const Exp = require("../models/experience");
const Tag = require("../models/tag");
const { createTags } = require("./tagController");
const { catchAsync } = require("./errorController");
const AppError = require("../utils/appError");

exports.getExperienceList = catchAsync(async (request, response) => {
    const experienceList = await Exp.find({});
    response.status(200).json({
        status: "Success",
        data: experienceList
    });
});

exports.createExperience = catchAsync(async (request, response) => {
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
});

exports.findExperience = catchAsync(async (request, response) => {
    const exp = await Exp.findOne({ _id: request.params.experienceId });
    if (!exp) throw new Error("Undefined experience");
    response.status(200).json({
        status: "Success",
        data: exp
    });
});

exports.updateExperience = catchAsync(async (request, response, next) => {
    const exp = await Exp.findByIdAndUpdate({ _id: request.params.experienceId });
    if (!exp) next(new AppError(400, "Undefined experience"));
    const user = request.user;
    if (user._id !== exp.host) next(new AppError(400, "You are not allowed to update this experience"));
    const expFields = Object.keys(request.body);
    expFields.map(field => exp[field] = request.body[field]);
    await exp.save();
    response.status(200).json({
        status: "Success",
        data: exp
    });
});

exports.deleteExperience = catchAsync(async (request, response) => {
    const exp = await Exp.findByIdAndDelete({ _id: request.params.experienceId });
    if (!exp) {
        throw new Error("Undefined experience");
    };
    response.status(200).json({
        status: "Success",
        data: null
    });
});