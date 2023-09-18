"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules and dependencies
const express_1 = __importDefault(require("express")); // Import Express.js for creating the server.
const products_route_1 = __importDefault(require("./routes/products_route")); // Import the routes for product-related functionality.
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv for loading environment variables.
const body_parser_1 = require("body-parser"); // Import the JSON body parser middleware.
const path_1 = __importDefault(require("path")); // Import the path module for handling file paths.
dotenv_1.default.config(); // Load environment variables from a .env file if present or other configured sources.
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000; // Set the server's port to the value defined in the PORT environment variable, defaulting to 4000 if not defined.
const app = (0, express_1.default)(); // Create an instance of the Express application.
app.use((0, body_parser_1.json)()); // Use the JSON body parser middleware for handling JSON data in requests.
app.use(express_1.default.urlencoded({ extended: true })); // Use the URL-encoded body parser middleware with extended mode.
// Configure the 'views' directory for rendering views/templates.
app.set("views", path_1.default.join(__dirname, "views"));
// Uncomment these lines if you want to serve static files from a 'public' directory.
// app.set("public", path.join(__dirname + "/public"));
// app.use(express.static("public"));
// Serve static files from a 'public' directory with caching enabled for improved performance.
app.use(express_1.default.static(__dirname + "/public", { maxAge: 31536000 }));
// Use the product-related routes defined in 'productsRoutes' for handling '/products' endpoints.
app.use("/products", products_route_1.default);
// Set the view engine to 'ejs' for rendering dynamic templates/views.
app.set("view engine", "ejs");
// Start the server and listen on the specified port.
app.listen(port, () => {
    console.log("Server is running on PORT:", port);
});
