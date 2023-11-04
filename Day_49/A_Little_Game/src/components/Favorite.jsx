const Favorite = ({ data, currentSecond }) => {
  return (
    <ul className="ls">
      {data.map((item, index) => {
        const isEvenSecond = currentSecond % 2 === 0;
        const isOdd = currentSecond % 2 === 1;
        // Check if the index matches the currentSecond parity
        if ((isEvenSecond && index % 2 === 0) || (isOdd && index % 2 === 1)) {
          return (
            <li key={"fi_" + index} className={`el-${index + 1}`}>
              {index + 1}-{item}
            </li>
          );
        }
        return null; // If index doesn't match currentSecond, return null (item won't be rendered)
      })}
    </ul>
  );
};

export default Favorite;
