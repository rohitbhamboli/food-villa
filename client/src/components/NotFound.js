import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="w-full h-screen  flex flex-col justify-center items-center font-header text-primary bg-[#f2f2f2]">
        <h1 className="text-6xl text-primary font-header">404 Not Found</h1>
        <span className="w-24 m-10">
          <NavLink className="btn" to={navigate(-1)}>
            Go Back
          </NavLink>
        </span>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
