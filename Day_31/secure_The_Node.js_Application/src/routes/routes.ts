import { Router } from "express";
import {
  renderLogIn,
  renderDashBoard,
  isUserAuthorized,
  registerUser,
  renderRegister,
} from "../controllers/controller";
import { body } from "express-validator";
const router: Router = Router();

router.get("/", renderLogIn);
router.get("/logIn", renderLogIn);
router.get("/register", renderRegister);
router.get("/protected", isUserAuthorized);
router.get("/dashboard", renderDashBoard);

router.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Username must not be empty"),
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 min"),
    body("role").notEmpty().isString(),
  ],
  registerUser
);

router.post("/login", [
  body("username").notEmpty().trim().escape(),
  body("password").isLength({ min: 6 }),
]);

router.put("/");
router.delete("/");

export default router;
