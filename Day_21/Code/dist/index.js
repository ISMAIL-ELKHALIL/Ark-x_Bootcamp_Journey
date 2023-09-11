"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
let products = [
    { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
    { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
    { id: 3, name: "Sony PlayStation 5", price: 499.99 },
    { id: 4, name: "MacBook Pro 16", price: 2399.99 },
    { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];
// GET /products - Get all products
app.get("/products", (req, res) => {
    res.json(products);
});
// GET /products/:id - Get a specific product by ID
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
});
// GET /products/search - Search for products based on query parameters
app.get("/products/search", (req, res) => {
    const { q, minPrice, maxPrice } = req.query;
    let filteredProducts = [...products];
    if (q) {
        filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(q.toString().toLowerCase()));
    }
    if (minPrice) {
        filteredProducts = filteredProducts.filter((p) => p.price >= parseFloat(minPrice.toString()));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter((p) => p.price <= parseFloat(maxPrice.toString()));
    }
    res.json(filteredProducts);
});
// POST /products - Create a new product
app.post("/products", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        res.status(400).json({ error: "Name and price are required" });
    }
    else {
        const newProduct = {
            id: products.length + 1,
            name,
            price: parseFloat(price.toString()),
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
    }
});
// PUT /products/:id - Update a specific product by ID
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
        if (name) {
            products[productIndex].name = name;
        }
        if (price) {
            products[productIndex].price = parseFloat(price.toString());
        }
        res.json(products[productIndex]);
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
});
// DELETE /products/:id - Delete a specific product by ID
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        res.status(204).json({ product: deletedProduct[0], status: "Deleted" });
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map