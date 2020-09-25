import { FETCH_PRODUCTS } from "./actionTypes";
import axios from "axios";

export const fetchProducts = () => {
  return (dispatch) => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      const data = res.data;
      console.log(data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
      });
    });
  };
};
