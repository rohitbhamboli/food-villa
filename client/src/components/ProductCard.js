import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../actions/cartActions";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1));
    alert("Item Added to Cart");
  };

  return (
    <div className="productCard m-5 p-5 bg-white shadow-lg rounded-lg text-center">
      <Link to={`/product/${product._id}`}>
        <img className="w-full h-48 object-cover" src={product.images[0].url} alt={product.name} />
        <p className="text-lg font-semibold my-2">{product.name}</p>
      </Link>
      <div>
        <span className="text-primary font-bold">{`₹${product.price}`}</span>
      </div>
      <button className="btn mt-4" onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;