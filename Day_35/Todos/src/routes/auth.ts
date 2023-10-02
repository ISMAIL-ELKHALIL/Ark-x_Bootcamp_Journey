import { Router } from "express";

const router: Router = Router();

router.get("/login", function (req, res, next) {
  res.render("login");
});

export default router;
