"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//? This file is a test to learn how to create a module and export it
const EventEmitter = require("events");
let url = "https://";
class Logger extends EventEmitter {
    sentData(data) {
        console.log(`Data : `, data);
        this.emit("notYet", { id: 4, name: "ismail" });
    }
}
//!Export Modules
module.exports = { url, Logger };
//# sourceMappingURL=logger.js.map