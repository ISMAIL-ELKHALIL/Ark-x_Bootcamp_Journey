"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
const secret = "My antinio Api key";
const random = () => {
    return crypto_1.default.randomBytes(128).toString("hex");
};
exports.random = random;
const hashPassword = (salt, password) => {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(secret)
        .digest("hex");
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=helper.js.map