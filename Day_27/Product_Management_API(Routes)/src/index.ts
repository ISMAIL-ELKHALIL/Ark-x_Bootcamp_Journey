import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3002;

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

app.use(express.json()); // Parse JSON request bodies

app.listen(port, () => {
  console.info(`Server running on Port:`, port);
});

// Route to return all products
app.get("/products", (req: Request, res: Response) => {
  res.status(200).json(products);
});


//! Route to return the details of a specific product by ID

//? The expression '\\d+'  is regExp use to specifie that the ID should be an intger  to access the this route
app.get(
  "/products/:id(\\d+)",
  function requestHandler(req: Request, res: Response) {
    const productId: number = parseInt(req.params.id);
    const product = products.find((product) => product.id === productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  }
);

//! This route should allow users to search for products based on query parameters: q, minPrice, maxPrice.

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


//! Route to create a new product
app.post(
  "/products",
  [body("name").isString().notEmpty(), body("price").isNumeric().notEmpty()],
  function requestHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProduct: Product = {
      id: products.length + 1,
      name: req.body.name.toString(),
      price: parseFloat(req.body.price),
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
  }
);

//! The "/products/:id" route with a PUT method should extract the id parameter from the request and update the details of the corresponding product in the dummy array.

app.put("/products/:id", function requestHandler(req: Request, res: Response) {
  const productId: number = parseInt(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex >= 0) {
    (products[productIndex].name = req.body.name.toString()),
      (products[productIndex].price = parseInt(req.body.price));
    res.status(200).json(products);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

//! The "/products/:id" route with a DELETE method should extract the id parameter from the request and remove the corresponding product from the dummy array.

app.delete(
  "/products/:id",
  function requestHandler(req: Request, res: Response) {
    const productId: number = parseInt(req.params.id);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
      res.status(200).send(products);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  }
);
