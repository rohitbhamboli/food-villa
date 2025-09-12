import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({
  item,
  deleteCartItems,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b-2 py-4">
      {/* Product */}
      <div className="col-span-2 flex items-center">
        <img
          className="w-20 h-20 object-cover mr-4"
          src={item.image}
          alt={item.name}
        />
        <div>
          <Link to={`/product/${item.product}`} className="text-lg font-semibold">
            {item.name}
          </Link>
          <button
            className="text-red-500 text-sm block"
            onClick={() => deleteCartItems(item.product)}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-center">
        <span className="md:hidden font-bold">Price: </span>₹{item.price}
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-center">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={() => decreaseQuantity(item.product, item.quantity)}
        >
          -
        </button>
        <input
          className="w-12 text-center mx-2"
          type="number"
          value={item.quantity}
          readOnly
        />
        <button
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
        >
          +
        </button>
      </div>

      {/* Total */}
      <div className="text-center font-bold">
        <span className="md:hidden font-bold">Total: </span>₹{item.price * item.quantity}
      </div>
    </div>
  );
};

export default CartItemCard;