const { getReviewList, createReview } = require("../controllers/reviewController");
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.route("/reviews").get(getReviewList).post(createReview);
module.exports = router;