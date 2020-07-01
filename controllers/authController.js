const passport = require("../oauth/index");

exports.loginFacebook = passport.authenticate("facebook", { scope: ['email'] });

exports.facebookAuthHandler = function (req, res, next) {
    console.log("test");
    passport.authenticate("facebook", async function (err, profile) {
        // if email exists in database => login the user and return token
        //else email does not exist, we create a new user with such email and then return the token as well
        try {
            const email = profile._json.email;
            const name = profile._json.first_name + " " + profile._json.last_name;
            const user = await User.findOneOrCreate({ email, name });
            const token = await user.generateToken();
            //if user successfully login => redirect to frontend page
            return res.redirect(`https://localhost:3000/?token=${token}`)
        } catch (error) { // <~ if error => redirect to login page again
            return res.redirect(`https://localhost:3000/login`)
        };

        // return res.json({ user, token });
    })(req, res, next);
};
