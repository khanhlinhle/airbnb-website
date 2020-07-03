const passportGoogle = require("passport-google-oauth2");
const Strategy = passportGoogle.Strategy;
require("dotenv").config({ path: ".env" });

const googleStrategy = new Strategy(
    // 1st arg is configuration
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        profileFields: ["id", "email", "name"]
    },
    // verification function (callback) /auth/facebook/authorized
    function (accessToken, refreshToken, profile, next) {
        console.log(profile);
        next(null, profile);
    }
);

module.exports = googleStrategy;