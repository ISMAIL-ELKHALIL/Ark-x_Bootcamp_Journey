"use strict";
const Logger = require("./logger");
const newLogger = new Logger.Logger();
//register an event
newLogger.on("done", function () {
    console.log("DONE IT");
});
newLogger.on("notYet", function (arg) {
    console.log("Not Yet");
    console.log(`undoneTasks: `, arg);
});
// Raise Event
newLogger.sentData({ id: 1, name: "ismail" });
//# sourceMappingURL=events.js.map