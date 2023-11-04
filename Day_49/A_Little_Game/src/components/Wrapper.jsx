import Favorite from "./Favorite";
import "./Wrapper.css";
const Wrapper = ({
  cars,
  cities,
  books,
  movies,
  foods,
  favorites,
  currentSecond,
}) => {
  return (
    <div className="wrapper">
      <div className="favorite-container">
        <h2>Favorite Cars</h2>
        <Favorite data={cars} currentSecond={currentSecond} />
      </div>
      <div className="favorite-container">
        <h2>Favorite cities</h2>
        <Favorite data={cities} currentSecond={currentSecond} />
      </div>

      <div className="favorite-container">
        <h2>Favorite books</h2>
        <Favorite data={books} currentSecond={currentSecond} />
      </div>
      <div className="favorite-container">
        <h2>Favorite favorites </h2>
        <Favorite data={favorites} currentSecond={currentSecond} />
      </div>

      <div className="favorite-container">
        <h2>Favorite movies</h2>
        <Favorite data={movies} currentSecond={currentSecond} />
      </div>
      <div className="favorite-container">
        <h2>Favorite foods</h2>
        <Favorite data={foods} currentSecond={currentSecond} />
      </div>
    </div>
  );
};

export default Wrapper;
