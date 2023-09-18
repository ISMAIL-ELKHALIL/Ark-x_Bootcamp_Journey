import express, { Express, NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import httpError from "http-errors";

//import ejs from "ejs";

const app: Express = express();
app.set("view engine", "ejs");
const port: number = 3000;

type Product = {
  readonly id: number;
  name: string;
  price: number;
};

let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];
//! MiddleWares
function logging(req: Request, res: Response, next: NextFunction) {
  const requestDate = Date.now();
  console.log("Request Date", requestDate);
  console.log("Request Method", req.method);
  console.log("Request URL", req.url);
  console.log("Middleware 1");
  next();
}

function errorHandler(
  err: httpError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (err.error) {
    case 404:
      res.status(err.error).send("Item not found");
      next();
      break;
    case 500:
      res.status(err.error).send("Internal server error");
      next();
      break;
    case 403:
      res.status(err.error).send("Access forbidden");
      next();
      break;
  }
}

// Middleware function to find a product by ID
/* function findProduct(req: Request, res: Response, next: NextFunction) {
  const productId: number = parseInt(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    const error = new Error("Product not found");
    return next(error);
  }

  res.locals.productIndex = productIndex;
  next();
}
 */



//! The route "/products" with GET method to return ALL products
app.get("/products", function requestHandle(req: Request, res: Response) {
  res.status(200).json(products);
});

//! The route "/products/:id" with GET method to return the details of a specific product by ID

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

//! The  route "/products with POST method to CREATE a new product
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

//! The "/products/:id" route with a PUT method should extract the id parameter from the request and UPDATE the details of the corresponding product.

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

//! The "/products/:id" route with a DELETE method extractS the id parameter and REMOVE the corresponding product.

app.delete(
  "/products/:id",
  function requestHandler(req: Request, res: Response, next: NextFunction) {
    const productId: number = parseInt(req.params.id);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
      res.status(200).send(products);
    } else {
      next({ error: 404 });
    }
  }
);

//
app.use([errorHandling, logging]);

//! Start the server
app.listen(port, () => {
  console.info(`Server running on Port:`, port);
});
