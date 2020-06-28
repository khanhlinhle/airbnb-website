const Tag = require("../models/tag");

exports.findTag = async (request, response) => {
    try {

    } catch (error) {

    }
};

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

// exports.createTag = async (request, response) => {
//     try {
//         const tag = request.body;
//         if (tag) {
//             tag = await Tag.create(tag);
//         };
//         response.status(200).json({
//             status: "Success",
//             data: tag
//         });
//     } catch (error) {
//         response.status(400).json({
//             status: "Fail",
//             message: error.message
//         });
//     };
// };

exports.createTags = async (request, response) => {
    try {
        const tags = request.body.tag.map(t => t.trim());
        const tagIDs = tags.map(async e => {
            let tag = await Tag.findOne({ tag: e });
            if (tag)
                return tag;
            tag = await Tag.create({ tag: e });
            return tag;
        });
        const result = Promise.all(tagIDs); // execute all promises in the array
        response.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

// exports.updateTag = async (request, response) => {
//     try {

//     } catch (error) {

//     }
// };

// exports.deleteTag = async (request, response) => {
//     try {
//         request.tag = request.body.tag.map(async t => await Tag.remove(t));
//         response.status(200).json({
//             status: "Success",
//             data: true
//         });
//     } catch (error) {
//         response.status(400).json({
//             status: "Fail",
//             message: error.message
//         });
//     };
// };