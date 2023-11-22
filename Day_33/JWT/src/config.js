"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, SALT = _a.SALT;
var _b = process.env, ACCESS_TOKEN_PRIVET_KEY = _b.ACCESS_TOKEN_PRIVET_KEY, REFRESH_TOKEN_PRIVET_KEY = _b.REFRESH_TOKEN_PRIVET_KEY;
exports.default = {
    port: PORT,
    salt: SALT,
    accessTokenPrivetKey: ACCESS_TOKEN_PRIVET_KEY,
    refreshTokenPrivetKey: REFRESH_TOKEN_PRIVET_KEY,
};
