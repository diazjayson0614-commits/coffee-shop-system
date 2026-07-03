const db = require("../config/database");

exports.findByUsername = (username) => {
    return db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
};