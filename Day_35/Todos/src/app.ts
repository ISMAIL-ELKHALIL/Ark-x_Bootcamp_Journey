import express, { Application, Request, Response } from "express";
import config from "./config";
import { urlencoded } from "body-parser";
import authRouter from "./routes/auth";
import path from "path";
import cookieParser from "cookie-parser";
import { NextFunction } from "connect";
var createError = require("http-errors");
//create an instance of the Express class(server)
const app: Application = express();
const port = config.post ?? 3000;

//? Middleware to parse incoming requests
app.use(express.json());
app.use(urlencoded({ extended: false }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/public")));

//routes
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
  
app.listen(port, () => {
  console.log("Server running on Port", port);
});
