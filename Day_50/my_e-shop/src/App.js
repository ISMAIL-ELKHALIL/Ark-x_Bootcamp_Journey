import React, { useState } from "react";
import Cart from "./components/Cart.js";
/* import Shipping from "./components/Shipping.js";
import Billing from "./components/Billing.js";
import Invoice from "./components/Invoice.js";
 */
const catalog = [
  {
    name: "Liquid",
    items: [
      {
        name: "Water 500mL",
      },
      {
        name: "Orange juice 1L",
      },
    ],
  },
  {
    name: "Fruits",
    items: [
      {
        name: "Apples 750g",
      },
      {
        name: "Bannanas 500g",
      },
    ],
  },
];
const methods = ["CreditCard", "Paypal", "Cash"];
export default function App() {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState({});
  const [method, setMethod] = useState("");

  return (
    <>
      <h1>My order</h1>
      <div className="container">
        <Cart setItems={setItems} items={items} catalog={catalog} />
      </div>
    </>
  );
}

/*   <Cart setItems={setItems} items={items} />

        <Shipping setAddress={setAddress} address={address} />
        
        <Billing setMethod={setMethod} methods={methods} method={method} />
   
        <Invoice items={items} address={address} method={method} /> */
