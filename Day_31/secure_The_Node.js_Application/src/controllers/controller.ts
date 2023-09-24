import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { SessionData } from "express-session";
import xss from "xss";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define a custom session interface
interface CustomSession extends SessionData {
  isAuthenticated?: boolean;
}

// Define a custom CSRF token function
declare module "express" {
  interface Request {
    csrfToken(): string;
  }
}

type User = {
  readonly id: number;
  username: string;
  email: string;
  password: string;
  role: string;
};

//Users
let users: User[] = [
  {
    id: 1,
    username: "user1",
    email: "user1@gmail.com",
    password: "password1",
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  },
];

// Method to render ejs Views

export const renderLogIn: RequestHandler = (req, res, next) => {
  res.render("logIn");
};

export const renderRegister: RequestHandler = (req, res, next) => {
  res.render("register");
};

export const renderDashBoard: RequestHandler = (req, res, next) => {
  //TODO: Secure the dashboard route to only allow authenticated users
  if ((req.session as CustomSession).isAuthenticated) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
};
//
export const registerUser: RequestHandler = (req, res, next) => {
  //TODO: Validate and authenticate the user
  //TODO: Implement appropriate validation and secure authentication mechanisms here
  //TODO: For simplicity, you can use a hardcoded username and password for demonstration purposes

  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role } = req.body;
  console.log("Body : ", req.body);
  // Sanitize the user input
  const sanitizedUserData: User = {
    id: Math.floor(Math.random() * 1000),
    username: xss(username),
    email: xss(email),
    password: xss(password),
    role: xss(role),
  };

  console.log("sanitized Data :", sanitizedUserData);

  users.push(sanitizedUserData);
  console.log("Users :", users);

  return res.status(201).json(sanitizedUserData);
  /*
  if (role === "admin" && password === "password") {
    (req.session as CustomSession).isAuthenticated = true;
    res.redirect("/dashboard");
  } else {
    res.redirect("/");
  } */
};

export const isUserAuthorized: RequestHandler = (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization!.split(" ")[1];

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, "secretKey") as JwtPayload;

    // Access the user's ID and role from the decoded token
    // const userId = decoded.id;
    const userRole = decoded.role;

    // Perform authorization based on the user's role
    if (userRole === "admin") {
      return res.status(200).json({ message: "Access granted for admin user" });
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
