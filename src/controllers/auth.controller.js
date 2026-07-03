const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.showLogin = (req, res) => {
    res.render("auth/login");
};


exports.login = async (req, res) => {

    const username = req.body?.username;
    const password = req.body?.password;

    if (!username || !password) {
        return res.send("Missing credentials");
    }

    // TEMP SUCCESS RESPONSE
    return res.send("Login received successfully");
};