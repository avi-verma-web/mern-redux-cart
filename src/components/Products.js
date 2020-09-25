import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link } from "react-router-dom";

import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions";

const Products = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const products = useSelector(state => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };
  return (
    <div>
      <Fade bottom cascade={true}>
        {!products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {products.map((product) => (
              <li key={product.id}>
                <div className="product">
                  <Link
                    to={"#" + product._id}
                    onClick={() => openModal(product)}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </Link>
                  <div className="product-price">
                    <div>{"$" + product.price + "  "}</div>
                    <button
                      onClick={() => addToCart(product)}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {product ? (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="prodcut-details">
              <img src={product.image} alt=""></img>
              <div className="prodcut-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes:{" "}
                  {product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="close-modal button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>${product.price}</div>
                  <button
                    style={{ marginLeft: "20rem", marginRight: "20rem" }}
                    className="button primary"
                    onClick={() => {
                      addToCart(product);
                      closeModal();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      ) : null}
    </div>
  );
};

export default Products;
