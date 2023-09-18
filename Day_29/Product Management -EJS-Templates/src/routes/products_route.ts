import { Router } from "express";
import { body } from "express-validator";
import { json } from "body-parser";
import {
  createProduct,
  getProductById,
  showProducts,
} from "../controllers/products_controller";

const router = Router().use(json());

router.get("/", showProducts);
router.get("/:id(\\d+)", getProductById);

router.post(
  "/",
  body("name").notEmpty().isString().isLength({ min: 3 }),
  body("price").notEmpty().isNumeric(),
  createProduct
);

router.patch("/:id");

router.delete("/:id");

export default router;
