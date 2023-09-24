"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuthorized = exports.registerUser = exports.renderDashBoard = exports.renderRegister = exports.renderLogIn = void 0;
const express_validator_1 = require("express-validator");
const xss_1 = __importDefault(require("xss"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Users
let users = [
    {
        id: 1,
        username: "user1",
        email: "user1@gmail.com",
        password: "password1",
        role: "user",
    },
    {
        id: 2,
        username: "admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
    },
];
// Method to render ejs Views
const renderLogIn = (req, res, next) => {
    res.render("logIn");
};
exports.renderLogIn = renderLogIn;
const renderRegister = (req, res, next) => {
    res.render("register");
};
exports.renderRegister = renderRegister;
const renderDashBoard = (req, res, next) => {
    //TODO: Secure the dashboard route to only allow authenticated users
    if (req.session.isAuthenticated) {
        res.render("dashboard");
    }
    else {
        res.redirect("/");
    }
};
exports.renderDashBoard = renderDashBoard;
//
const registerUser = (req, res, next) => {
    //TODO: Validate and authenticate the user
    //TODO: Implement appropriate validation and secure authentication mechanisms here
    //TODO: For simplicity, you can use a hardcoded username and password for demonstration purposes
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, role } = req.body;
    console.log("Body : ", req.body);
    // Sanitize the user input
    const sanitizedUserData = {
        id: Math.floor(Math.random() * 1000),
        username: (0, xss_1.default)(username),
        email: (0, xss_1.default)(email),
        password: (0, xss_1.default)(password),
        role: (0, xss_1.default)(role),
    };
    console.log("sanitized Data :", sanitizedUserData);
    users.push(sanitizedUserData);
    console.log("Users :", users);
    return res.status(201).json(sanitizedUserData);
    /*
    if (role === "admin" && password === "password") {
      (req.session as CustomSession).isAuthenticated = true;
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    } */
};
exports.registerUser = registerUser;
const isUserAuthorized = (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    try {
        // Verify and decode the JWT token
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        // Access the user's ID and role from the decoded token
        // const userId = decoded.id;
        const userRole = decoded.role;
        // Perform authorization based on the user's role
        if (userRole === "admin") {
            return res.status(200).json({ message: "Access granted for admin user" });
        }
        else {
            return res.status(403).json({ error: "Access denied" });
        }
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.isUserAuthorized = isUserAuthorized;
