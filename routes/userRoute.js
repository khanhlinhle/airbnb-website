var express = require('express');
const { getUserList, createUser, logIn, logOut, getMyProfile, updateMyProfile } = require('../controllers/userController');
const { loginRequired } = require('../services/authenticationService');
var router = express.Router();

/* GET users listing. */
router.route("/users").get(getUserList).post(createUser);
router.route("/users/me").get(loginRequired ,getMyProfile).put(loginRequired, updateMyProfile);

router.route("/auth/login").post(logIn);
router.route("/auth/logout").post(loginRequired,logOut);
module.exports = router;
