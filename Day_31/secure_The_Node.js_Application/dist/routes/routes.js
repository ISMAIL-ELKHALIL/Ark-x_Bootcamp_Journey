"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", controller_1.renderLogIn);
router.get("/logIn", controller_1.renderLogIn);
router.get("/register", controller_1.renderRegister);
router.get("/protected", controller_1.isUserAuthorized);
router.get("/dashboard", controller_1.renderDashBoard);
router.post("/register", [
    (0, express_validator_1.body)("username")
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Username must not be empty"),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 min"),
    (0, express_validator_1.body)("role").notEmpty().isString(),
], controller_1.registerUser);
router.post("/login", [
    (0, express_validator_1.body)("username").notEmpty().trim().escape(),
    (0, express_validator_1.body)("password").isLength({ min: 6 }),
]);
router.put("/");
router.delete("/");
exports.default = router;
