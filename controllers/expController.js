const Exp = require("../models/experience");
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

exports.createExperience = catchAsync(async (request, response, next) => {
    const user = request.user;
    const { title, duration, groupSize, description, images, items, price, tags, country, city } = request.body;
    if (!title || !description || !duration || !groupSize || !images || !items || !price || !tags || !country || !city)
        return response.status(400).json({
            status: "fail",
            error: "Missing required info "
        });
    const tagObj = await createTags(request, response);
    const newExperience = await Exp.create({
        title: title,
        duration: duration,
        groupSize: groupSize,
        images: images,
        description: description,
        items: items,
        price: price,
        tags: tagObj,
        host: user._id,
        country: country,
        city: city,
        tags: tagObj
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