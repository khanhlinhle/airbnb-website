var express = require('express');
const { getExperienceList, findExperience, createExperience, updateExperience, deleteExperience } = require('../controllers/expController');
const { hostRequired, loginRequired } = require('../services/authenticationService');
var router = express.Router();

router.route("/experiences")
    .get(getExperienceList)
    .post(loginRequired, hostRequired, createExperience);
router.route("/experiences/:experienceId")
    .get(findExperience)
router.route("/experiences/:experienceId/edit")
    .put(loginRequired, hostRequired, updateExperience)
    .delete(loginRequired, hostRequired, deleteExperience);

module.exports = router;