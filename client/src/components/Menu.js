import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard.js";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../actions/productActions";
import Loader from "./Loader";
import { toast } from "react-toastify";

function Menu() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error, { icon: "🔴" });
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#f2f2f2]">
        <h2 className="text-center text-3xl font-header text-primary pt-28">
          Dishes
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Menu;
