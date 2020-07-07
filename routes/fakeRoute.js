var express = require('express');
const { createFakeExperience, createFakeUser, getFakeUsers } = require('../controllers/fakeController');
var router = express.Router();

router.route("/experiences/fake")
    .post(createFakeExperience);

router.route("/users/fake")
    .post(createFakeUser);
module.exports = router;