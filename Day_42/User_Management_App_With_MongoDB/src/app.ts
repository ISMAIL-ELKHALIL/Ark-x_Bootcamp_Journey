// Import necessary packages and modules
import express, { Application } from "express";
import http from "http";
import { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import config from "./config";
import mongoose from "mongoose";
import router from "./routes/router";
// Create an instance of the Express application
const app: Application = express();

// Middleware setup:
// Use compression middleware to compress responses
app.use(compression());

// Use cookie-parser middleware for handling cookies
app.use(cookieParser());

// Use urlencoded middleware to parse URL-encoded request bodies
app.use(urlencoded({ extended: false }));

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// Use cors middleware to enable Cross-Origin Resource Sharing (CORS) with credentials
app.use(cors({ credentials: true }));

// Define the port to listen on, using the port from the configuration or defaulting to 3001
const port = config.port || 3001;

// Create an HTTP server using the Express app
const server = http.createServer(app);

app.use("/", router());
// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

const mongodbUrl = config.mongodbUrl;

mongoose.Promise = Promise;
mongoose.connect(mongodbUrl as string);
mongoose.connection.on("connected", () => {
  console.info("Connection to MongoDB has been established successfully");
});
mongoose.connection.on("error", (error: Error) => console.log(error));
