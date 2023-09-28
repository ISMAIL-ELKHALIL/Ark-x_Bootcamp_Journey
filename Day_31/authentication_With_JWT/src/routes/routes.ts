import { Router } from "express";
import { body } from "express-validator";
import {
  signUser,
  loginUser,
  renderLogin,
  renderSign,
} from "../controllers/controllers";

const router: Router = Router();

router.get("/register", renderSign);

router.get("/login", renderLogin);

router.post(
  "/register",
  body("name").notEmpty().isString(),
  body("email").isEmail().normalizeEmail(),
  body("password").isStrongPassword(),
  body("role").notEmpty().isString(),
  signUser
);
router.post(
  "/login",
  body("name").notEmpty(),
  body("password").notEmpty(),
  loginUser
);

export default router;
