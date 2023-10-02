import { randomUUID } from "crypto";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Result, ValidationError, validationResult } from "express-validator";

interface User {
  readonly id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [
  {
    id: "45454",
    name: "sam",
    email: "sam@gmail.com",
    password: "123",
    role: "admin",
  },
];

//?  Hash the Password  Using bcrypt

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // You can adjust the number of salt rounds (10 is a common value)

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

//? Compare Passwords Using bcrypt

async function comparePassword(plaintextPassword: string, hash: string) {
  await bcrypt
    .compare(plaintextPassword, hash)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const renderSign: RequestHandler = (req, res) => {
  res.status(200).render("register");
};

export const renderLogin: RequestHandler = (req, res) => {
  res.status(200).render("logIn");
};

export const renderDashboard: RequestHandler = (req, res) => {
  res.status(200).render("dashboard");
};

export const signUser: RequestHandler = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!req.body) {
    return res.status(404).send("Something went wrong");
  }

  const result: Result<ValidationError> = validationResult(req);

  if (!result.isEmpty) {
    return res.status(404).json({ errors: result.array() });
  }

  //* Create new User
  const user: User = {
    id: randomUUID(),
    name: name,
    email: email,
    password: await hashPassword(password),
    role: role,
  };

  console.log(user);

  //* Add new user to Users array
  users.push(user);

  res.redirect("/login");
};

export const loginUser: RequestHandler = (req, res) => {
  const { name, password } = req.body;

  const user = users.find(
    (u) => u.name === name && comparePassword(password, u.password)
  );

  if (!user) {
    return res.status(404).send("User not exist");
  }

  //* Generate JWT Token
  const accesToken = jwt.sign(
    { id: user.id, name: user.name, email: user.name },
    process.env.ACCES_TOKEN_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.name },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );

  return res
    .status(300)
    .render("dashboard", { role: user.role, name: user.name });
};

//? verifyAccess

export const verifyAccess: RequestHandler = (req, res) => {
  console.log("Protected URL", req.url);
  // Extract the token from the Authorization header
  if (!req.headers.authorization) {
    return res.status(404).send("token ");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ error: "JWT secret key is not defined" });
    }
    // Verify and decode the JWT token
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as JwtPayload;

    // Access the user's ID and role from the decoded token
    //const userId: string = decoded.id;
    const userRole: string = decoded.role;

    // Perform authorization based on the user's role
    if (userRole === "admin") {
      return res.status(200).render("protected");
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
