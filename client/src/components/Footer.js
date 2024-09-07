import React from "react";
import Logo from "./../images/logo-white.png";

function Footer() {
  return (
    <div className=" bg-slate-900 w-full text-white flex flex-wrap items-center justify-evenly">
      <div className="basis-3/4 lg:basis-1/3 flex flex-col items-center text-sm my-5">
        <img
          className="w-auto h-20 object-contain m-3"
          src={Logo}
          alt="Food Villa"
        />
      </div>
      <div className="basis-3/4 lg:basis-1/3 flex flex-col items-center text-sm my-4 lg:mt-8">
        <span className="text-white my-1">
          <i className="fa-solid fa-location-dot text-white"></i> Bhambholi,
          Opp. Shyam Resort
        </span>
        <span className="text-white ">Contact : +91 8708394472</span>
        <div className="flex justify-evenly items-center">
          <i className="fa-brands fa-instagram social-icons text-lg text-white"></i>
          <i className="fa-brands fa-facebook-f social-icons text-white"></i>
          <i className="fa-brands fa-x-twitter social-icons text-white"></i>
        </div>
      </div>
      <div className="basis-3/4 lg:basis-1/3 flex flex-col items-center text-sm my-4">
        <span className="text-white text-sm my-1">
          &copy; Copyright Food Villa 2024
        </span>
        <span className="text-white text-sm my-1">All Rights Reserved</span>
        <span className="text-white text-sm my-1">
          Designed by Jatin Bhambholi
        </span>
      </div>
    </div>
  );
}

export default Footer;
