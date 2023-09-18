"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
const port = 3002;
let products = [
    { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
    { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
    { id: 3, name: "Sony PlayStation 5", price: 499.99 },
    { id: 4, name: "MacBook Pro 16", price: 2399.99 },
    { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];
app.use(express_1.default.json()); // Parse JSON request bodies
app.listen(port, () => {
    console.info(`Server running on Port:`, port);
});
// Route to return all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});
//! This route should allow users to search for products based on query parameters: q, minPrice, maxPrice.
app.get("/products/search", function requestHandler(req, res) {
    const maxPrice = parseInt(req.query.maxPrice);
    const minPrice = parseInt(req.query.minPrice);
    const queryName = req.query.name;
    let filteredProducts = [];
    if (req.query.maxPrice || req.query.minPrice || req.query.name) {
        if (req.query.maxPrice && req.query.minPrice) {
        }
        else if (req.query.maxPrice) {
            filteredProducts = products.filter((product) => {
                return product.price <= maxPrice;
            });
        }
        else if (req.query.minPrice) {
            filteredProducts = products.filter((product) => {
                return product.price >= minPrice;
            });
            if (req.query.name) {
                if (filteredProducts.length !== 0) {
                    filteredProducts = filteredProducts.filter((product) => {
                        return product.name
                            .toLowerCase()
                            .includes(queryName.toLowerCase());
                    });
                }
                else {
                    filteredProducts = products.filter((product) => {
                        return product.name
                            .toLowerCase()
                            .includes(queryName.toLowerCase());
                    });
                }
            }
        }
        if (filteredProducts.length !== 0) {
            res.status(200).send(filteredProducts);
        }
        else {
            res.status(404).send("Product not found");
        }
    }
    else {
        res.status(404).json({
            error: "Invalid minPrice or maxPrice values Or ProductName",
        });
    }
});
//! Route to return the details of a specific product by ID
app.get("/products/:id", function requestHandler(req, res) {
    const productId = parseInt(req.params.id);
    const product = products.find((product) => product.id === productId);
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
});
//! Route to create a new product
app.post("/products", [(0, express_validator_1.body)("name").isString().notEmpty(), (0, express_validator_1.body)("price").isNumeric().notEmpty()], function requestHandler(req, res) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = {
        id: products.length + 1,
        name: req.body.name.toString(),
        price: parseFloat(req.body.price),
    };
    products.push(newProduct);
    return res.status(201).json(newProduct);
});
//! The "/products/:id" route with a PUT method should extract the id parameter from the request and update the details of the corresponding product in the dummy array.
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
//! The "/products/:id" route with a DELETE method should extract the id parameter from the request and remove the corresponding product from the dummy array.
app.delete("/products/:id", function requestHandler(req, res) {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex >= 0) {
        products.splice(productIndex, 1);
        res.status(200).send(products);
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
});
//# sourceMappingURL=index.js.map