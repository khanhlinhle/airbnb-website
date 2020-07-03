const passportFacebook = require("passport-facebook");
const Strategy = passportFacebook.Strategy;
require("dotenv").config({ path: ".env" });

const facebookStrategy = new Strategy(
    // 1st arg is configuration
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "email", "name"]
    },
    // verification function (callback) /auth/facebook/authorized
    function (accessToken, refreshToken, profile, next) {
        console.log(profile);
        next(null, profile);
    }
);

module.exports = facebookStrategy;
