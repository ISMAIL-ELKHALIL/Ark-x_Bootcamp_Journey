// Importing necessary modules and dependencies
import express from "express"; // Import Express.js for creating the server.
import productsRoutes from "./routes/products_route"; // Import the routes for product-related functionality.
import dotenv from "dotenv"; // Import dotenv for loading environment variables.
import { json } from "body-parser"; // Import the JSON body parser middleware.
import path from "path"; // Import the path module for handling file paths.

dotenv.config(); // Load environment variables from a .env file if present or other configured sources.
const port = process.env.PORT ?? 4000; // Set the server's port to the value defined in the PORT environment variable, defaulting to 4000 if not defined.
const app = express(); // Create an instance of the Express application.

app.use(json()); // Use the JSON body parser middleware for handling JSON data in requests.
app.use(express.urlencoded({ extended: true })); // Use the URL-encoded body parser middleware with extended mode.

// Configure the 'views' directory for rendering views/templates.
app.set("views", path.join(__dirname, "views"));
// Uncomment these lines if you want to serve static files from a 'public' directory.
// app.set("public", path.join(__dirname + "/public"));
// app.use(express.static("public"));

// Serve static files from a 'public' directory with caching enabled for improved performance.
app.use(express.static(__dirname + "/public", { maxAge: 31536000 }));

// Use the product-related routes defined in 'productsRoutes' for handling '/products' endpoints.
app.use("/products", productsRoutes);

// Set the view engine to 'ejs' for rendering dynamic templates/views.
app.set("view engine", "ejs");

// Start the server and listen on the specified port.
app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
