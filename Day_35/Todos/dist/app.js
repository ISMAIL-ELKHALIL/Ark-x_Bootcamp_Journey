"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const body_parser_1 = require("body-parser");
const auth_1 = __importDefault(require("./routes/auth"));
const path_1 = __importDefault(require("path"));
//create an instance of the Express class(server)
const app = (0, express_1.default)();
const port = (_a = config_1.default.post) !== null && _a !== void 0 ? _a : 3000;
//? Middleware to parse incoming requests
app.use(express_1.default.json());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
//routes
app.use("/", auth_1.default);
app.listen(port, () => {
    console.log("Server running on Port", port);
});
//# sourceMappingURL=app.js.map