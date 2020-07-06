var express = require('express');
const { getFakeExperiences, createFakeExperience, createFakeUser, getFakeUsers } = require('../controllers/fakeController');
var router = express.Router();

router.route("/experiences/fake")
    .post(createFakeExperience);

router.route("/users")
    .get(getFakeUsers)
    .post(createFakeUser);
module.exports = router;