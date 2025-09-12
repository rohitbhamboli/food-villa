import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartActions";
import CartItemCard from "./CartItemCard.js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    // Navigate to shipping
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pt-28">
            <h1 className="text-3xl font-header font-bold text-gray-700">
              Your Cart is Empty
            </h1>
            <Link
              to="/menu"
              className="btn mt-4 px-6 py-2 bg-primary text-white rounded-md"
            >
              Show Menu
            </Link>
          </div>
        ) : (
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center my-8">
              Shopping Cart
            </h1>
            <div className="flex flex-col">
              {/* Cart Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 font-bold text-lg border-b-2 pb-4">
                <div className="col-span-2">Dish</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>

              {cartItems.map((item) => (
                <CartItemCard
                  key={item.product}
                  item={item}
                  deleteCartItems={deleteCartItems}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}

              {/* Cart Footer */}
              <div className="flex justify-end items-center mt-8">
                <div className="text-2xl font-bold">
                  Grand Total: ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </div>
                <button
                  className="ml-4 px-6 py-2 bg-primary text-white rounded-md"
                  onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
