const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/database");
const path = require("path");
const session = require("express-session");
const adminRoutes = require("./src/routes/admin.routes");

dotenv.config();

const app = express();
const authRoutes = require("./src/routes/auth.routes");

const PORT = process.env.PORT || 3000;

/* =======================
   MIDDLEWARE (IMPORTANT)
======================= */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({
        secret: "coffee_shop_secret",
        resave: false,
        saveUninitialized: false
    })
);

/* =======================
   ROUTES (AFTER MIDDLEWARE)
======================= */

app.use("/", authRoutes);

app.use("/admin", adminRoutes);

/* =======================
   DATABASE TEST
======================= */

db.query("SELECT 1")
    .then(() => {
        console.log("✅ Connected to MySQL Database");
    })
    .catch((err) => {
        console.error("❌ Database Connection Failed");
        console.error(err);
    });

/* =======================
   SERVER START
======================= */

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});