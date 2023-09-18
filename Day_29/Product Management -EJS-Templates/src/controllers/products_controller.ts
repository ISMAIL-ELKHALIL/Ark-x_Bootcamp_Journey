import { RequestHandler } from "express";
import { validationResult } from "express-validator";
type Product = {
  readonly id: number;
  name: string;
  price: number;
};

let products: Product[] = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];

const createProduct: RequestHandler = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const newProduct: Product = {
      id: Math.floor(Math.random() * 10000),
      name: (req.body as { name: string }).name,
      price: (req.body as { price: number }).price,
    };
    console.log("New Product", newProduct);
    products.push(newProduct);

    return res.status(200).json(products);
  }
  res.status(404).send({ errors: result.array });
};

const showProducts: RequestHandler = (req, res, next) => {
  if (products.length !== 0) {
    return res.status(200).render("home", { products });
  } else {
    return res.status(404).send("Product not found");
  }
};

const getProductById: RequestHandler = (req, res, next) => {
  const productId: number = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.status(200).render("productDetails", { product });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

//! Route to return the details of a specific product by ID

/*
app.get(
  "/products/search",
  function requestHandler(req: Request, res: Response) {
    // Filter the products based on the provided criteria
    let filteredProducts = products.filter((product) => {
      const maxPrice: number = parseInt(req.query.maxPrice as string);
      const minPrice: number = parseInt(req.query.minPrice as string);
      const name: string = req.query.name as string;

      // Filter by product name
      if (name && !product.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }

      // Filter by price range
      if (minPrice && product.price < minPrice) {
        return false;
      }

      if (maxPrice && product.price > maxPrice) {
        return false;
      }

      return true;
    });

    // Send the filtered products as a response
    if (filteredProducts.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.send(filteredProducts);
    }
  }
);
 */
export { createProduct, showProducts, getProductById };
