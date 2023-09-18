"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const process_1 = __importDefault(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
/* app.set("view engine", "ejs"); */
app.use(express_1.default.json());
const port = process_1.default.env.PORT || 4000;
let products = [
    { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
    { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
    { id: 3, name: "Sony PlayStation 5", price: 499.99 },
    { id: 4, name: "MacBook Pro 16", price: 2399.99 },
    { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];
//! MiddleWares
function logging(req, res, next) {
    const requestDate = Date.now();
    console.log("Request Date", requestDate);
    console.log("Request Method", req.method);
    console.log("Request URL", req.url);
    next();
}
function errorHandling(err, req, res, next) {
    switch (err.error) {
        case 404:
            res
                .status(err.error)
                .send('<h3  style="color: red; font-size: 20px;">Item not found<h3>');
            next();
            break;
        case 500:
            res
                .status(err.error)
                .send('<h3  style="color: red; font-size: 20px;">Internal server error<h3>');
            next();
            break;
        case 403:
            res
                .status(err.error)
                .send('<h3  style="color: red; font-size: 20px;">Access forbidden<h3>');
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
app.get("/products", function requestHandle(req, res) {
    res.status(200).json(products);
    /*   ejs.render(
      "/mnt/ssdK1/Ark-X/Daily-Challenges/Day_29/Product Management (EJS Templates)/dist/views/home",
      { products: products }
    ); */
});
//! The "/products/search"  route should allow users to SEARCH for products based on query parameters: name, minPrice, maxPrice.
app.get("/products/search", function requestHandler(req, res, next) {
    const maxPrice = parseInt(req.query.maxPrice);
    const minPrice = parseInt(req.query.minPrice);
    const name = req.query.name;
    // Filter the products based on the provided criteria
    let filteredProducts = products.filter((product) => {
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
        next({ error: 404 });
    }
    else {
        res.send(filteredProducts);
    }
});
//! The route "/products/:id" with GET method to return the details of a specific product by ID
app.get("/products/:id", function requestHandler(req, res, next) {
    const productId = parseInt(req.params.id);
    const product = products.find((product) => product.id === productId);
    if (product) {
        // res.render("productDetails", { product: product });
        res.send(product);
    }
    else {
        next({ error: 404 });
    }
});
//! The  route "/products with POST method to CREATE a new product
app.post("/products/:id", [(0, express_validator_1.body)("name").isString().notEmpty(), (0, express_validator_1.body)("price").isNumeric().notEmpty()], function requestHandler(req, res) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = {
        id: parseInt(req.body.id) || parseInt(req.params.id) || products.length + 1,
        name: req.body.name.toString(),
        price: parseFloat(req.body.price),
    };
    products.push(newProduct);
    return res.status(201).json(newProduct);
});
/* app.post("/products/",function requestHandler(req,res){

  let user={
    id:products.length+1,
    name:req.body.name.toString(),
    passwrod:req.body.passwrod.toSt
  }



})
 */
//! The "/products/:id" route with a PUT method should extract the id parameter from the request and UPDATE the details of the corresponding product.
app.put("/products/:id", function requestHandler(req, res) {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex >= 0) {
        (products[productIndex].name = req.body.name.toString()),
            (products[productIndex].price = parseInt(req.body.price));
        res.status(200).json(products);
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
});
//! The "/products/:id" route with a DELETE method extractS the id parameter and REMOVE the corresponding product.
app.delete("/products/:id", function requestHandler(req, res, next) {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex >= 0) {
        products.splice(productIndex, 1);
        res.status(200).send(products);
    }
    else {
        next({ error: 404 });
    }
});
//
app.use([errorHandling, logging]);
//! Start the server
app.listen(port, () => {
    console.info(`Server running on Port:`, port);
});
//# sourceMappingURL=index.js.map