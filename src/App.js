import React, { useState } from "react";
import "./App.css";

import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

import store from "./redux/store";
import { Provider } from "react-redux";

import { BrowserRouter, Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  // const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const c = [...cartItems];
    let alreadyInCart = false;
    c.forEach((item) => {
      if (item._id === product._id) {
        console.log("Loop");
        item.count = item.count + 1;
        alreadyInCart = true;
      }
    });

    if (c.length === 0) {
      console.log("sec");
      c.push({ ...product, count: 1 });
    } else if (!alreadyInCart && c.length !== 0) {
      console.log("first");
      c.push({ ...product, count: 1 });
    }

    setCartItems(c);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const removeAll = () => {
    console.log("button clicked");
    localStorage.removeItem('cartItems')
    setCartItems([])
  };

  const removeFromCart = (product) => {
    const c = [...cartItems];
    setCartItems(c.filter((x) => x._id !== product._id));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };



  const sortProducts = (e) => {
    setSort(e.target.value);
    setProducts(
      data.products
        .slice()
        .sort((a, b) =>
          sort === "Lowest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "Highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  };
  const filterProducts = (e) => {
    if (e.target.value === "") {
      setSize(e.target.value);
      setProducts(data.products);
    } else {
      setSize(e.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        )
      );
    }
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="grid-container">
          <header>
            <Link to="/">React Shopping Cart</Link>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  filterProducts={filterProducts}
                  sortProducts={sortProducts}
                  count={products.length}
                  sort={sort}
                  size={size}
                ></Filter>
                <Products addToCart={addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart
                  removeFromCart={removeFromCart}
                  cartItems={cartItems}
  
                  removeAll={removeAll}
                ></Cart>
              </div>
            </div>
          </main>
          <footer>Footer</footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
