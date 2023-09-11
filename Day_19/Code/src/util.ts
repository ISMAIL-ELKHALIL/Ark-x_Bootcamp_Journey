const util = require("util");

const today = new Date();
const earthDay = "April 22, 2022";
today.setMonth(7);
console.log(today.getMonth().toLocaleString);
console.log(util.types.isDate(earthDay));

function getUser(id: number, callback: Function) {
  return setTimeout(() => {
    if (id === 5) {
      callback(null, { nickname: "Teddy" });
    } else {
      callback(new Error("User not found"));
    }
  }, 1000);
}

function callback(error: Error, user: any) {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log(`User found! Their nickname is: ${user.nickname}`);
}

getUser(1, callback); // -> `User not found`
getUser(5, callback); // -> `User found! Their nickname is: Teddy`
