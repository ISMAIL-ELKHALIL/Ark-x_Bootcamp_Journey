"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
//create an instance of the Express class(server)
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
//morgan is an HTTP request logger middleware
app.use((0, morgan_1.default)("common"));
// Use Helmet!  helps secure Express apps by setting HTTP response headers.
app.use((0, helmet_1.default)());
//add routing for /Path
app.get("", (req, res) => {
    res.json({ message: "Hello dude " });
});
//Start the Server
app.listen(port, () => {
    console.log("Server running on PORT:", port);
});
exports.default = app;
//# sourceMappingURL=app.js.map