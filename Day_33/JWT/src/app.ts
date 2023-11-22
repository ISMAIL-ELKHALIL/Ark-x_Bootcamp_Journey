import express, { Application, Request, Response } from "express";
import { urlencoded } from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { RateLimitRequestHandler, rateLimit } from "express-rate-limit";
import { errorsHandlerMiddleware } from "./middlewares/errors.middleware";
import config from "./config";
//create an instance of the Express class(server)
const app: Application = express();
const port = config.port || 3000;

//? Middleware to parse incoming requests
app.use(express.json());
app.use(urlencoded({ extended: true }));
//? Morgan is an HTTP request logger middleware like "Winston"
app.use(morgan("common"));
//? Use Helmet!  helps secure Express apps by setting HTTP response headers.
app.use(helmet());

//? limiter Used to limit repeated requests to public APIs and/or endpoints such as password reset.
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use("/static", express.static(path.join(__dirname, "public")));

//add routing for /Path

app.use(errorsHandlerMiddleware);

app.get("/", (req: Request, res: Response) => {
  throw new Error();
  res.status(404).json({ message: "Hello sir " });
});

//Start the Server
app.listen(port, () => {
  console.log("Server running on PORT:", port);
});

let User: Map<boolean, number> = new Map();

User.set(true, 1);
console.log(User);

export default app;
