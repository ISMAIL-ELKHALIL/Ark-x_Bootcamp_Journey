//? This file is a test to learn how to create a module and export it
import EventEmitter = require("events");

let url: string = "https://";

class Logger extends EventEmitter {
  sentData(data: any) {
    console.log(`Data : `, data);
    this.emit("notYet", { id: 4, name: "ismail" });
  }
}

//!Export Modules
module.exports = { url, Logger };
