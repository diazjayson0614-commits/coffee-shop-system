const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.showLogin = (req, res) => {
    res.render("auth/login");
};

exports.login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const [rows] = await User.findByUsername(username);

        if (rows.length === 0) {
            return res.send("Username not found");
        }

        const user = rows[0];

        console.log("Username:", username);
        console.log("Input Password:", password);
        console.log("Hash from DB:", user.password);

        const match = await bcrypt.compare(password, user.password);

        console.log("Match:", match);

        if (!match) {
            return res.send("Incorrect password");
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        if (user.role === "admin") {
            return res.redirect("/admin/dashboard");
        }

        if (user.role === "cashier") {
            return res.redirect("/cashier/dashboard");
        }

        if (user.role === "kitchen") {
            return res.redirect("/kitchen/dashboard");
        }

        return res.send("Unknown role");

    } catch (err) {
        console.error(err);
        return res.send("Server Error");
    }

};