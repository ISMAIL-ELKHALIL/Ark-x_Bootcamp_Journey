"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signUser = exports.renderLogin = exports.renderSign = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const users = [
    { id: 45454, name: "sam", email: "sam@gmail.com", password: "123" },
];
const renderSign = (req, res) => {
    res.status(200).render("register");
};
exports.renderSign = renderSign;
const renderLogin = (req, res) => {
    res.status(200).render("logIn");
};
exports.renderLogin = renderLogin;
const signUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!req.body) {
        return res.status(404).send("Something went wrong");
    }
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty) {
        return res.status(404).json({ errors: result.array() });
    }
    //* Create new User
    const user = {
        id: (0, crypto_1.randomUUID)(),
        name: name,
        email: email,
        password: password,
    };
    //* Generate JWT Token
    const token = jsonwebtoken_1.default.sign({ name: user.name, email: user.name, id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
    users.push(user);
    console.log(users, token);
    res.redirect("/login");
};
exports.signUser = signUser;
const loginUser = (req, res) => {
    const { name, password } = req.body;
    res.locals.admin = true;
    console.log(res.locals.admin);
    const user = users.find((e) => e.name === name && e.password === password);
    if (!user) {
        return res.send("User not exist");
    }
    res.render("dashboard", { name: user.name.toUpperCase() });
};
exports.loginUser = loginUser;
//# sourceMappingURL=controllers.js.map