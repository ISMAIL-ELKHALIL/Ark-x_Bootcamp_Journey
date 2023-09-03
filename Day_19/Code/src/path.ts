/**
 *? The node:path module provides utilities for working with file and directory paths. It can be accessed using:
 *? const path = require('node:path'); OR import path from "path";

*/

import path from "path";

console.log(path.parse(__filename));
console.log("-------------------------------------");
console.log(path.parse(__dirname));
console.log("-------------------------------------");
console.log(
  path.basename("/mnt/ssdK1/Ark-X/Daily-Challenges/Day_19/Code/src/index")
);
