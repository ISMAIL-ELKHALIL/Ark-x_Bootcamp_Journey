"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
let router = (0, express_1.Router)();
exports.default = () => {
    (0, authRoutes_1.default)(router);
    return router;
};
//# sourceMappingURL=router.js.map