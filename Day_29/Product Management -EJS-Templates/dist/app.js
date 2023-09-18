"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./routes/products_route"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const path_1 = __importDefault(require("path"));
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use("/products", products_route_1.default);
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.listen(port, () => {
    console.log("Server is running on PORT:", port);
});
