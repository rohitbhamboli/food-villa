import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer.js";
import hero from "../images/hero-img.png";
import specialMenu from "./Resources/SpecialMenu.js";
import { NavLink } from "react-router-dom";
function Main() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col lg:flex-row items-center mt-12 lg:mt-10 justify-around bg-[#f2f2f2]">
          <div className="flex flex-col justify-center -mt-16 lg:m-auto min-h-screen lg:ml-24 p-3">
            <h1 className="text-gray-700 font-header text-5xl lg:text-6xl text-bold items-center p-3">
              <span className="text-primary font-header">Enjoy</span> Your
              Healthy
              <br />
              Delicious food
            </h1>
            <h4 className="p-3 text-xl">
              Explore healthy lifestyles with authentic flavours
            </h4>
            <span className="mt-5 ml-20 lg:ml-3">
              <NavLink className="btn" to="/menu">
                Browse Menu
              </NavLink>
              <NavLink className="btn ml-5 lg:ml-10" to="/login">
                Log in
              </NavLink>
            </span>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <img
              className="p-10 h-5/6 w-5/6 animate-bounce-slow"
              src={hero}
              alt="hero-item"
            />
          </div>
        </div>

        {/* --------------- Specials Cards section ---------------- */}

        <h1 className="relative flex items-center align lg:w-2/4 lg:mx-auto mx-5 font-header mt-10 mb-5">
          <div className="flex-grow border-t border-primary"></div>
          <span className="flex-shrink mx-4 text-primary font-header text-5xl">
            Our Specials
          </span>
          <div className="flex-grow border-t border-primary"></div>
        </h1>
        <div className="bg-white flex flex-row flex-wrap flex-grow justify-center items-center">
          {/* ------cards go here----- */}
          {specialMenu.map((item) => (
            <div className="cards">
              <img
                src={item.image}
                alt="pizza"
                className="w-full object-contain"
              />
              <div>
                <h2 className="text-center text-2xl text-primary m-5">
                  {item.name}
                </h2>
                <div className="flex flex-col item-center text-center space-y-5">
                  <span>
                    {item.type1} @ {item.price1}/-
                  </span>
                  <span>
                    {item.type2} @ {item.price2}/-
                  </span>
                  <span>
                    {item.type3} @ {item.price3}/-
                  </span>
                </div>
                <div className="mt-5 p-5 flex justify-center items-center">
                  <span className="btn">
                    <NavLink to="/menu">Order now</NavLink>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
