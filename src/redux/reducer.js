import { FETCH_PRODUCTS } from "./actionTypes";

const initialState = {
  items: "",
};

export const productsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload };

    default:
      return state;
  }
};
