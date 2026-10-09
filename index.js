const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const UserDetails = require("./UserDetails");
const connectEnsureLogin = require("connect-ensure-login");
const path = require("path");

const app = express();

//Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || require("crypto").randomBytes(32).toString("hex"),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax"
        }
    })
);

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Configure local authentication strategy
passport.use(UserDetails.createStrategy());

//Store and retrieve authenticated users in sessions
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// Handle login form submission
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login?info=invalid"
    })
);

// Display login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Protected homepage
app.get("/", connectEnsureLogin.ensureLoggedIn("/login"), (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Protected private page
app.get("/private", connectEnsureLogin.ensureLoggedIn("/login"), (req, res) => {
    res.sendFile(path.join(__dirname, "private.html"));
});

// Return logged-in user information
app.get("/user", connectEnsureLogin.ensureLoggedIn("/login"), (req, res) => {
    res.json({
        username: req.user.username
    });
});

// Logout
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie("connect.sid");
            res.redirect("/login");
        });
    });
});

//Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`AuthApp running on port ${PORT}`);
});

// MONGODB SETUP: existing users remain in the database.
mongoose
    .connect("mongodb://127.0.0.1:27017/MyDatabase")
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
