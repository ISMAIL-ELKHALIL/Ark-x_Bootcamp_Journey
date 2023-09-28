import { randomUUID } from "crypto";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Result, ValidationError, validationResult } from "express-validator";

type User = {
  readonly id: string | number;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [
  { id: 45454, name: "sam", email: "sam@gmail.com", password: "123" },
];

export const renderSign: RequestHandler = (req, res) => {
  res.status(200).render("register");
};

export const renderLogin: RequestHandler = (req, res) => {
  res.status(200).render("logIn");
};

export const signUser: RequestHandler = (req, res) => {
  const { name, email, password } = req.body;

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
    password: password,
  };
  //* Generate JWT Token

  const token = jwt.sign(
    { name: user.name, email: user.name, id: user.id },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
  users.push(user);
  console.log(users, token);

  res.redirect("/login");
};

export const loginUser: RequestHandler = (req, res) => {
  const { name, password } = req.body;
  res.locals.admin = true;
  console.log(res.locals.admin);
  res.locals.sx;
  const user = users.find((e) => e.name === name && e.password === password);

  if (!user) {
    return res.send("User not exist");
  }

  res.render("dashboard", { name: user.name.toUpperCase() });
};
