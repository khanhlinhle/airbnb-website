const { getReviewList, createReview, updateReview, deleteReview } = require("../controllers/reviewController");
var express = require('express');
const { loginRequired } = require("../services/authenticationService");
var router = express.Router();


/* GET users listing. */
router.route("/reviews")
.get(getReviewList)
.post(loginRequired, createReview);
router.route("/reviews/:reviewId")
.put(loginRequired, updateReview)
.delete(loginRequired, deleteReview);

module.exports = router;