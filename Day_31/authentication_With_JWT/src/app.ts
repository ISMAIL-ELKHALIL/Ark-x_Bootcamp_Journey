// Import necessary packages and modules
import express, { Express } from "express"; // Import Express and its types
import dotenv from "dotenv"; // Import dotenv for environment variable configuration
import routes from "./routes/routes"; // Import your routes module
import path from "path"; // Import path module for file path handling
import { urlencoded } from "body-parser"; // Import body-parser for parsing URL-encoded data

dotenv.config(); // Load environment variables from a .env file if available
const app: Express = express(); // Create an instance of Express
let port = process.env.PORT || 4000; // Use the specified port from environment variables or default to 4000

app.set("view engine", "ejs"); // Set the view engine to EJS
app.use(express.json()); // Parse JSON data in request bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded data in request bodies

app.set("views", path.join(__dirname, "views")); // Set the views directory
app.use(express.static(__dirname + "/public")); // Serve static files from the "public" directory

app.use("/", routes); // Use the imported routes for routing
app.listen(port, () => {
  console.log("Server is running on Port:", port); // Start the server and log the port it's listening on
});
