"use strict";
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let num1 = Math.floor(Math.random() * 10 + 1);
let num2 = Math.floor(Math.random() * 10 + 1);
rl.question(`what ${num1} multiply by ${num2} \n`, (userInput) => {
    if (userInput === num2 * num1) {
        rl.close();
    }
    else {
        rl.setPrompt('Incorrect answer \n');
        rl.prompt();
        rl.on('line', (userInput) => {
            if (userInput == (num1 * num2)) {
            }
        });
    }
});
rl.on("close", () => {
    console.log("Answer is Correct");
});
rl.on('line', () => {
});
//# sourceMappingURL=readLine.js.map