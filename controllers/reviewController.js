const Review = require("../models/review");
const Exp = require("../models/experience");

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
        const { rating, expId, content } = request.body;
        if (!expId || !rating) {
            return response.status(400).json({
                message: "Experience and rating are required"
            });
        };
        const user = request.user;
        const exp = await Exp.findOne({ _id: expId });
        if (!exp) throw new Error("Undefined experience");
        const review = await Review.create({
            user: user._id,
            content: content,
            rating: rating,
            experience: expId
        });
        await review.populate({
            path: "user",
            select: "_id name"
        }).populate({
            path: "experience",
            select: "_id title"
        }).execPopulate();
        response.status(200).json({
            status: "Success",
            data: review
        });
        const reviewInDb = await Review.findOne({ user: user._id, experience: expId });
        if (reviewInDb) {
            return response.status(400).json({
                status: "Fail",
                message: "Already created review"
            });
        };
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.updateReview = async (request, response) => {
    try {
        const { rating, content } = request.body;
        const review = await Review.findOne({ _id: reviewId });
        review.content = content;
        review.rating = rating;
        await review.save();
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

exports.deleteReview = async (request, response) => {
    try {
        const review = await Review.findByIdAndDelete({ _id: request.params.reviewId });
        if (!review) throw new Error("Undefined review");
        response.status(200).json({
            status: "Success",
            data: null
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};