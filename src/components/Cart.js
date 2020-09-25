import React, { useState } from "react";
import "./Cart.css";

//For Animation
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import Modal from "react-modal";

import axios from 'axios'

const Cart = ({ cartItems, removeFromCart, removeAll }) => {
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState();
  const [modalvisible, setModalvisible] = useState(true);

  console.log(cartItems);

  const handleInput = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;

      case "name":
        setName(e.target.value);
        break;

      case "address":
        setAddress(e.target.value);
        break;

      default:
        break;
    }
  };
  const createCartOrder = (e) => {
    e.preventDefault();
    let order = {
      email: email,
      name: name,
      address: address,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
      cartItems: cartItems,
    };
    

    axios.post('http://localhost:5000/api/orders',order).then((res=>{
      console.log(res)
      setOrder(res.data);
    })).catch((err)=>{
      console.log(err)
    })
  };

  const closeModal = () => {
    setModalvisible(false);
  };
  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in the cart{" "}
          </div>
        )}
      </div>
      {order ? (
        <Modal isOpen={modalvisible}>
          <Zoom>
            <button onClick={closeModal} className="close-modal">
              x
            </button>
            <div className="order-details">
              <h3 className="success-message" style={{ color: "green" }}>
                Your order has been placed
              </h3>
              <h2>Order Number: {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>${order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div>
                        {" "}
                        {x.count} quantitiy of{x.title}{" "}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      ) : null}
      <div>
        <div className="cart">
          <Fade left cascade={true}>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>{item.title}</div>
                  <div className="right">
                    {"$" + item.price} x {item.count}{" "}
                    <button onClick={() => removeFromCart(item)}>
                      Remove From Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 ? (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total: ${" "}
                  {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                </div>
                <button
                  onClick={() => {
                    setShowCheckOut(true);
                  }}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
              <div>
                <button onClick={removeAll} className="button primary">
                  Remove All
                </button>
              </div>
            </div>
            {showCheckOut ? (
              <Fade right cascade={true}>
                <div className="ca">
                  <form onSubmit={createCartOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <div>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={handleInput}
                          ></input>
                        </div>
                      </li>
                      <li>
                        <label>Name</label>
                        <div>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={handleInput}
                          ></input>
                        </div>
                      </li>
                      <li>
                        <label>Address</label>
                        <div>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={handleInput}
                          ></input>
                        </div>
                      </li>
                      <li cl>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
