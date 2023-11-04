import Wrapper from "./Wrapper";
const Container = (props) => {
  const name = "ISMAIL";
  return (
    <div>
      <h1>Hey ! My name is {name} and these are my favorite things</h1>
      <Wrapper
        currentSecond={props.currentSecond}
        cars={props.cars}
        cities={props.cities}
        books={props.books}
        movies={props.movies}
        foods={props.foods}
        favorites={props.favorites}
      />
    </div>
  );
};

export default Container;
