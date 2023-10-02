"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccess = exports.loginUser = exports.signUser = exports.renderDashboard = exports.renderLogin = exports.renderSign = void 0;
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const users = [
    {
        id: "45454",
        name: "sam",
        email: "sam@gmail.com",
        password: "123",
        role: "admin",
    },
];
//?  Hash the Password  Using bcrypt
async function hashPassword(password) {
    const saltRounds = 10; // You can adjust the number of salt rounds (10 is a common value)
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw error;
    }
}
//? Compare Passwords Using bcrypt
async function comparePassword(plaintextPassword, hash) {
    await bcrypt_1.default
        .compare(plaintextPassword, hash)
        .then((result) => {
        return result;
    })
        .catch((err) => {
        console.log(err);
    });
}
const renderSign = (req, res) => {
    res.status(200).render("register");
};
exports.renderSign = renderSign;
const renderLogin = (req, res) => {
    res.status(200).render("logIn");
};
exports.renderLogin = renderLogin;
const renderDashboard = (req, res) => {
    res.status(200).render("dashboard");
};
exports.renderDashboard = renderDashboard;
const signUser = async (req, res) => {
    const { name, email, password, role } = req.body;
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
        password: await hashPassword(password),
        role: role,
    };
    console.log(user);
    //* Add new user to Users array
    users.push(user);
    res.redirect("/login");
};
exports.signUser = signUser;
const loginUser = (req, res) => {
    const { name, password } = req.body;
    const user = users.find((u) => u.name === name && comparePassword(password, u.password));
    if (!user) {
        return res.status(404).send("User not exist");
    }
    //* Generate JWT Token
    /*   const token = jwt.sign(
      { name: user.name, email: user.name, id: user.id },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: process.env.JWT_EXPIRE_TIME }
    ); */
    return res
        .status(300)
        .render("dashboard", { role: user.role, name: user.name });
};
exports.loginUser = loginUser;
//? verifyAccess
const verifyAccess = (req, res) => {
    console.log("Protected URL", req.url);
    // Extract the token from the Authorization header
    if (!req.headers.authorization) {
        return res.status(404).send("token ");
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({ error: "JWT secret key is not defined" });
        }
        // Verify and decode the JWT token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Access the user's ID and role from the decoded token
        //const userId: string = decoded.id;
        const userRole = decoded.role;
        // Perform authorization based on the user's role
        if (userRole === "admin") {
            return res.status(200).render("protected");
        }
        else {
            return res.status(403).json({ error: "Access denied" });
        }
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.verifyAccess = verifyAccess;
//# sourceMappingURL=controllers.js.map