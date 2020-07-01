const Review = require("../models/review");
const Exp = require("../models/experience");
const { catchAsync } = require("./errorController");

exports.getReviewList = catchAsync (async (request, response) => {
        const reviewList = await Review.find({});
        response.status(200).json({
            reviewList
        });
});

exports.createReview = catchAsync (async (request, response) => {
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
});

exports.updateReview = catchAsync (async (request, response) => {
        const { rating, content } = request.body;
        const review = await Review.findOne({ _id: reviewId });
        review.content = content;
        review.rating = rating;
        await review.save();
        response.status(200).json({
            status: "Success",
            data: review
        });
});

exports.deleteReview = catchAsync (async (request, response) => {
        const review = await Review.findByIdAndDelete({ _id: request.params.reviewId });
        if (!review) throw new Error("Undefined review");
        response.status(200).json({
            status: "Success",
            data: null
        });
});