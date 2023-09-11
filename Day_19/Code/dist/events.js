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
console.log("I'm learning about");
for (let idx = 0; idx < 9999999999; idx++) { }
// The second console.log() statement is
// delayed by the for loop's execution
console.log("the Event Loop");
//# sourceMappingURL=events.js.map