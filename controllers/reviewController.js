const Review = require("../models/review");

exports.getReviewList = async (request, response) => {
    try {
        const reviewList = await Review.find({});
        response.status(200).json({
            reviewList
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.createReview = async (request, response) => {
    try {
        const { user, content } = request.body;
        if (!user || !content) {
            return response.status(400).json({
                message: "User and content are required"
            });
        };
        const review = await Review.create({
            user: user,
            content: content
        });
        response.status(200).json({
            status: "Success",
            data: review
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};