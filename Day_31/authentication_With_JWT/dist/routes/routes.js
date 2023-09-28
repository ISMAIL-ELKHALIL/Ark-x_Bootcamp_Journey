"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers/controllers");
const router = (0, express_1.Router)();
router.get("/register", controllers_1.renderSign);
router.get("/login", controllers_1.renderLogin);
router.post("/register", (0, express_validator_1.body)("name").notEmpty().isString(), (0, express_validator_1.body)("email").isEmail().normalizeEmail(), (0, express_validator_1.body)("password").isStrongPassword(), (0, express_validator_1.body)("role").notEmpty().isString(), controllers_1.signUser);
router.post("/login", (0, express_validator_1.body)("name").notEmpty(), (0, express_validator_1.body)("password").notEmpty(), controllers_1.loginUser);
exports.default = router;
//# sourceMappingURL=routes.js.map