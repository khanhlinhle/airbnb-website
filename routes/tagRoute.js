var express = require('express');
const { createTag, getTagsList, deleteTag, updateTag } = require('../controllers/tagController');
const { hostRequired, loginRequired } = require('../services/authenticationService');
var router = express.Router();

router.route("/tags")
.get(getTagsList)
.post(loginRequired, hostRequired, createTag);
// router.route("/tag").post(createTag);

router.route("/tags/:tagId")
.put(loginRequired, hostRequired, updateTag)
.delete(loginRequired, hostRequired, deleteTag);

module.exports = router;