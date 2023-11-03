"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { PORT, MONGODB_URL } = process.env;
exports.default = {
    port: PORT,
    mongodbUrl: MONGODB_URL,
};
//# sourceMappingURL=config.js.map