"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary packages and modules
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
// Create an instance of the Express application
const app = (0, express_1.default)();
// Middleware setup:
// Use compression middleware to compress responses
app.use((0, compression_1.default)());
// Use cookie-parser middleware for handling cookies
app.use((0, cookie_parser_1.default)());
// Use urlencoded middleware to parse URL-encoded request bodies
app.use((0, body_parser_1.urlencoded)({ extended: false }));
// Use express.json() middleware to parse JSON request bodies
app.use(express_1.default.json());
// Use cors middleware to enable Cross-Origin Resource Sharing (CORS) with credentials
app.use((0, cors_1.default)({ credentials: true }));
// Define the port to listen on, using the port from the configuration or defaulting to 3001
const port = config_1.default.port || 3001;
// Create an HTTP server using the Express app
const server = http_1.default.createServer(app);
app.use("/", (0, router_1.default)());
// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
const mongodbUrl = config_1.default.mongodbUrl;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(mongodbUrl);
mongoose_1.default.connection.on("error", (error) => console.log(error));
//# sourceMappingURL=app.js.map