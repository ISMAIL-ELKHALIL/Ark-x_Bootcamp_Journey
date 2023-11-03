"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary packages and modules
const express_1 = __importDefault(require("express")); // Import Express and its types
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv for environment variable configuration
const routes_1 = __importDefault(require("./routes/routes")); // Import your routes module
const path_1 = __importDefault(require("path")); // Import path module for file path handling
const body_parser_1 = require("body-parser"); // Import body-parser for parsing URL-encoded data
dotenv_1.default.config(); // Load environment variables from a .env file if available
const app = (0, express_1.default)(); // Create an instance of Express
let port = process.env.PORT || 4000; // Use the specified port from environment variables or default to 4000
app.set("view engine", "ejs"); // Set the view engine to EJS
app.use(express_1.default.json()); // Parse JSON data in request bodies
app.use((0, body_parser_1.urlencoded)({ extended: true })); // Parse URL-encoded data in request bodies
app.set("views", path_1.default.join(__dirname, "views")); // Set the views directory
app.use(express_1.default.static(__dirname + "/	public")); // Serve static files from the "public" directory
app.use("/", routes_1.default); // Use the imported routes for routing
app.listen(port, () => {
    console.log("Server is running on Port:", port); // Start the server and log the port it's listening on
});
//# sourceMappingURL=app.js.map
