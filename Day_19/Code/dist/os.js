"use strict";
/**?
 *? The node:os module provides operating system-related utility methods and properties. It can be accessed using:
 *?const os = require('node:os');
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
console.log(`Total memory :${os_1.default.totalmem()}`);
console.log(`Free memory  :${os_1.default.freemem()}`);
console.log(`Temporary files Dir  :${os_1.default.tmpdir()}`);
console.log(`System uptime   :${os_1.default.uptime() / (60 * 60)}`);
//# sourceMappingURL=os.js.map