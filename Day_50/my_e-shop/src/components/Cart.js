export default function Cart({ setItems, catalog }) {
  function addItems(p) {
    setItems((i) => [...i, p]);
  }

  return (
    <div className="block-cart">
      <h2>Products</h2>
      {catalog.map((category) => {
        return (
          <div className={"category-" + category.name}>
            <h3>{category.name}</h3>
            // Loop through items
            <div class="item-1">
              <h4>Water 500mL</h4>
              <button>Add</button>
            </div>
            // End loop
          </div>
        );
      })}
    </div>
  );
}
