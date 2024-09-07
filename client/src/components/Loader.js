import React from "react";
import "./Loader.css";
import Navbar from "./Navbar";

function Loader() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-screen min-h-screen bg-[#f2f2f2]">
        <div className="loader"></div>
      </div>
    </>
  );
}

export default Loader;
