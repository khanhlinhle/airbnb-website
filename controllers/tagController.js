const Tag = require("../models/tag");

exports.getTagsList = async (request, response) => {
    try {
        const tagList = await Tag.find({});
        response.status(200).json({
            status: "Success",
            data: tagList
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

exports.createTag = async (request, response) => {
    try {
        const tag = request.body.tag;
        if (!tag) throw new Error("Tag is required");
        const newTag = await Tag.create({
            tag: tag
        });
        response.status(200).json({
            status: "Success",
            data: newTag
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

// exports.createTags = async (request, response) => {
//     try {
//         const tags = request.body.tag.map(t => t.trim());
//         const tagIDs = tags.map(async e => {
//             let tag = await Tag.findOne({ tag: e });
//             if (tag) return tag;
//             tag = await Tag.create({ tag: e });
//             return tag;
//         });
//         const result = Promise.all(tagIDs); // execute all promises in the array
//         response.status(200).json({
//             status: "Success",
//             data: result
//         });
//     } catch (error) {
//         response.status(400).json({
//             status: "Fail",
//             message: error.message
//         });
//     };
// };

exports.updateTag = async (request, response) => {
    try {
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
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

exports.deleteTag = async (request, response) => {
    try {
        const tag = await Tag.findByIdAndDelete({ _id: request.params.tagId });
        if (!tag) {
            throw new Error("Undefined tag");
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