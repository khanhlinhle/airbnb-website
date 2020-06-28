var express = require('express');
const { getExperienceList, createExperience, updateExperience } = require('../controllers/expController');
const { hostRequired, loginRequired } = require('../services/authenticationService');
var router = express.Router();

router.route("/experiences")
.get(getExperienceList)
.post(loginRequired, hostRequired, createExperience)
.put(loginRequired, hostRequired, updateExperience);

module.exports = router;