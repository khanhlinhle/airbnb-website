const passport = require("passport");
const facebookStrategy = require("./facebook");

passport.use(facebookStrategy);

module.exports = passport;