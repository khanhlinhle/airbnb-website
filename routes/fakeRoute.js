var express = require('express');
const { createExperience } = require('../controllers/expController');
const { createFakeExperience } = require('../controllers/fakeController');
var router = express.Router();

router.route("/experiences/fake")
    .post(createFakeExperience);

module.exports = router;