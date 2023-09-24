"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT ?? 4000;
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use("/user", routes_1.default);
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.static(__dirname + "/public"));
app.listen(port, () => {
    console.log("Server is running on Port : ", port);
});
