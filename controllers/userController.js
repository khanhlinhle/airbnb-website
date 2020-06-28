const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken, loginWithEmail } = require("../services/authenticationService");
const saltRounds = 10;

exports.getUserList = async (request, response) => {
    try {
        const userList = await User.find({});
        response.status(200).json({
            userList
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.createUser = async (request, response) => {
    try {
        const { name, email, password, role, introduction } = request.body;
        if (!name || !email || !password || !role) {
            return response.status(400).json({
                message: "Name, email, password and role are required"
            });
        };
        if (role === "Host") {
            if (!introduction) {
                return response.status(400).json({
                    message: "Host user needs introduction"
                });
            };
        };
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            introduction: introduction
        });
        const token = await generateToken(user);
        response.status(200).json({
            status: "Success",
            data: { user, token }
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.logIn = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required"
            });
        };
        const user = await loginWithEmail(email, password); //check email & password are correct or not?
        const token = await generateToken(user);
        response.status(200).json({
            status: "Success",
            data: { user, token }
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.logOut = async (request, response, next) => {
    try {
        const token = request.body.token;
        if (!token) {
            return response.status(400).json({
                message: "Token is required"
            });
        };
        const user = request.user;
        user.tokens = user.tokens.filter(elm => elm !== token);
        await user.save();
        response.status(200).json({
            status: "Success",
            data: null
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.getMyProfile = async (request, response) => {
    try {
        const user = request.user;
        response.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};

exports.updateMyProfile = async (request, response) => {
    try {
        const { email, name, password, token, role, introduction } = request.body;
        if (!token) {
            return response.status(400).json({
                message: "Token is required"
            });
        };
        const user = request.user;
        if (email) {
            user.email = email;
        };
        if (name) {
            user.name = name;
        };
        if (password) {
            user.password = password;
        };
        if (role) {
            user.role = role;
        };
        if (introduction) {
            user.introduction = introduction;
        };
        await user.save();
        response.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    };
};