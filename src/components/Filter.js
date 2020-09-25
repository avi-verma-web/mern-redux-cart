import React from "react";
import "./Filter.css";
const Filter = ({ sortProducts, filterProducts, count, size, sort }) => {
  return (
    <div className="filter">
      <div className="filter_result">{count} Products</div>
      <div className="filter_sort">
        Order{" "}
        <select value={sort} onChange={sortProducts}>
          <option>Latest</option>
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
      </div>
      <div className="filter_size">
        Filter{" "}
        <select value={size} onChange={filterProducts}>
          <option hidden disabled value="">
            ALL
          </option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
