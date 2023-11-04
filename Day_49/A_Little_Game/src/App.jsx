import { useState } from "react";
import "./App.css";
import Container from "./components/Container";
function App() {
  const favorites = ["foods", "movies", "books", "cities", "cars"];

  const foods = ["Pizza", "Sushi", "Chocolate", "Burgers", "Ice Cream"];

  const movies = [
    "The Shawshank Redemption",
    "Inception",
    "The Godfather",
    "Pulp Fiction",
    "The Dark Knight",
  ];

  const books = [
    "To Kill a Mockingbird",
    "1984",
    "The Great Gatsby",
    "Harry Potter and the Sorcerer's Stone",
    "The Hobbit",
  ];

  const cities = ["New York", "Paris", "Tokyo", "London", "Sydney"];

  const cars = [
    "Tesla Model 3",
    "BMW M5",
    "Audi R8",
    "Ford Mustang",
    "Porsche 911",
  ];

  const currentSecond = new Date().getSeconds().toString();
  console.log("currentSecond", currentSecond);

  return (
    <>
      <b>
        <span>Current second is {currentSecond}</span>
      </b>
      <br />

      <Container
        currentSecond={parseInt(currentSecond)}
        cars={cars}
        cities={cities}
        books={books}
        movies={movies}
        foods={foods}
        favorites={favorites}
      />
    </>
  );
}

export default App;
