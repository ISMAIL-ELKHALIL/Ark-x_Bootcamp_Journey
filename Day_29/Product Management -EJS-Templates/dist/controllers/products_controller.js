"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.showProducts = exports.createProduct = void 0;
const express_validator_1 = require("express-validator");
let products = [
    { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
    { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
    { id: 3, name: "Sony PlayStation 5", price: 499.99 },
    { id: 4, name: "MacBook Pro 16", price: 2399.99 },
    { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];
const createProduct = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        const newProduct = {
            id: Math.floor(Math.random() * 10000),
            name: req.body.name,
            price: req.body.price,
        };
        console.log("New Product", newProduct);
        products.push(newProduct);
        return res.status(200).json(products);
    }
    res.status(404).send({ errors: result.array });
};
exports.createProduct = createProduct;
const showProducts = (req, res, next) => {
    if (products.length !== 0) {
        return res.status(200).render("home", { products });
    }
    else {
        return res.status(404).send("Product not found");
    }
};
exports.showProducts = showProducts;
const getProductById = (req, res, next) => {
    const productId = parseInt(req.params.id);
    const product = products.find((product) => product.id === productId);
    if (product) {
        res.status(200).render("productDetails", { product });
    }
    else {
        res.status(404).json({ error: "Product not found" });
    }
};
exports.getProductById = getProductById;
