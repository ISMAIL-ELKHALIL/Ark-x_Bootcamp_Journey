"use strict";
/**
 *? The node:path module provides utilities for working with file and directory paths. It can be accessed using:
 *? const path = require('node:path'); OR import path from "path";

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
console.log(path_1.default.parse(__filename));
console.log("-------------------------------------");
console.log(path_1.default.parse(__dirname));
console.log("-------------------------------------");
console.log(path_1.default.basename("/mnt/ssdK1/Ark-X/Daily-Challenges/Day_19/Code/src/index"));
//# sourceMappingURL=path.js.map