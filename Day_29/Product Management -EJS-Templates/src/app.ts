import express from "express";
import productsRoutes from "./routes/products_route";
import dotenv from "dotenv";
import { json } from "body-parser";
import path from "path";
const port = process.env.PORT ?? 4000;
const app = express();
dotenv.config();
app.use("/products", productsRoutes);
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
