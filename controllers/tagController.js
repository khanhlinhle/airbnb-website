const Tag = require("../models/tag");
const { catchAsync } = require("./errorController");
const AppError = require("../utils/appError");

exports.getTagsList = catchAsync(async (request, response, next) => {
    const tagList = await Tag.find({});
    response.status(200).json({
        status: "Success",
        data: tagList
    });
});

exports.createTag = catchAsync(async (request, response, next) => {
    const tag = request.body.tag;
    if (!tag) next(new AppError(400, "Param is missing"));
    const newTag = await Tag.create({
        tag: tag
    });
    response.status(200).json({
        status: "Success",
        data: newTag
    });

});

exports.createTags = async (request, response) => {
    try {
        const tags = request.body.tags.map(t => t.trim());
        const tagIDs = tags.map(async e => {
            let tag = await Tag.findOne({ tag: e });
            if (tag) return tag;
            tag = await Tag.create({ tag: e });
            return tag;
        });
        const result = Promise.all(tagIDs); // execute all promises in the array
        return result;
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

exports.updateTag = catchAsync(async (request, response) => {
    const tag = await Tag.findByIdAndUpdate({ _id: request.params.tagId });
    if (!tag) {
        throw new Error("Undefined tag");
    };
    tag.tag = request.body.tag;
    await tag.save();
    response.status(200).json({
        status: "Success",
        data: tag
    });
});

exports.deleteTag = catchAsync(async (request, response) => {
    const tag = await Tag.findByIdAndDelete({ _id: request.params.tagId });
    if (!tag) {
        throw new Error("Undefined tag");
    };
    response.status(200).json({
        status: "Success",
        data: null
    });
});