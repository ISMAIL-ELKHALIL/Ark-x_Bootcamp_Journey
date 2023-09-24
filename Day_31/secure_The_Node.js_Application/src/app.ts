import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
const app: Express = express();
dotenv.config();
const port = process.env.PORT ?? 4000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use("/user", routes);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.listen(port, () => {
  console.log("Server is running on Port : ", port);
});
