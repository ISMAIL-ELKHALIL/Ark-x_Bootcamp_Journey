//"use strict;

/* Task 1: Variable Declaration */

let name="Ismail";

let age=23;

let isStudent =true;

let favoriteColors= ["red","blue","black" ,"white"];


/* Task 2: Variable Types */

let string1 = 'Something'

let string2 = "Something Else"


console.log(string1 , string2);


/* Task 3: Concatenation */

let me = `Hi, it's ${name} form Morocco and im ${age} years old. `;

console.log(me);


/* Task 5: Logical Operators */

// My  favorite animal and color
let myFavoriteAnimal = "wolf";
let myFavoriteColor = "blue";

// Prompt user for input

//? The prompt() function in JavaScript is used to display a dialog box that prompts the user to input some text
let userFavoriteAnimal = prompt("What is your favorite animal?");
let userFavoriteColor = prompt("What is your favorite color?");

// Check if both user's favorite animal and color match your own

if (userFavoriteAnimal.toLowerCase() === myFavoriteAnimal && userFavoriteColor.toLowerCase() === myFavoriteColor) {
  alert("We have the same favorite animal and color!");
} else {
  alert("Our favorite animal or color is different.");
}
 

/* Task 6: Comparison Operators */

// Prompt the user for a number
const userInput = parseFloat(prompt("Enter a number:"));
// Check if the number is positive, negative, or zero

if (userInput > 0) {
   alert("The number is positive.");
} else if (userInput < 0) {
   alert("The number is negative.");
} else {
   alert("The number is zero.");
}


/* Task 7: Truthy & Falsy Values */

// Prompt the user for a value
const userValue = prompt("Enter a value:");

// Check if the value is truthy or falsy

if (userValue) {
    alert("The value is truthy.");
} else {
    alert("The value is falsy.");
}




