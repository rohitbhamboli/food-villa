import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Menu() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen text-3xl flex justify-center items-center font-header text-primary bg-[#f2f2f2]">
        Menu
      </div>
      <Footer />
    </>
  );
}

export default Menu;
