const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/database");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Test Database Connection
db.query("SELECT 1")
    .then(() => {
        console.log("✅ Connected to MySQL Database");
    })
    .catch((err) => {
        console.error("❌ Database Connection Failed");
        console.error(err);
    });

app.get("/", (req, res) => {
    res.send("Coffee Shop Management System");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});