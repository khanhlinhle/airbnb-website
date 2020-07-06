var express = require('express');
const { getFakeExperiences, createFakeExperience, createFakeUser, getFakeUsers } = require('../controllers/fakeController');
var router = express.Router();

router.route("/experiences")
    .get(getFakeExperiences)
    .post(createFakeExperience);

router.route("/users")
    .get(getFakeUsers)
    .post(createFakeUser);
module.exports = router;