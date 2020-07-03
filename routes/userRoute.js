var express = require('express');
const { getUserList, createUser, logIn, logOut, getMyProfile, updateMyProfile } = require('../controllers/userController');
const { loginRequired } = require('../services/authenticationService');
const { loginFacebook, facebookAuthHandler, loginGoogle, googleAuthHandler } = require('../controllers/authController');
var router = express.Router();

router.route("/users").get(getUserList).post(createUser);
router.route("/users/me").get(loginRequired, getMyProfile).put(loginRequired, updateMyProfile);

router.route("/auth/login").post(logIn);
router.route("/auth/logout").post(loginRequired, logOut);

router.route("/auth/facebook/login").get(loginFacebook);
router.route("/auth/facebook/authorized").get(facebookAuthHandler);

router.route("/auth/google/login").get(loginGoogle);
router.route("/auth/google/authorized").get(googleAuthHandler);
module.exports = router;
