var express = require('express');
const { createTags, getTagsList } = require('../controllers/tagController');
const { hostRequired, loginRequired } = require('../services/authenticationService');
var router = express.Router();

router.route("/tags").get(getTagsList).post(loginRequired, hostRequired, createTags);
// router.route("/tag").post(createTag);

module.exports = router;