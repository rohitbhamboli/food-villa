import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Diner from "./../images/diner-img.jpg";
import TopView from "./../images/top-view.jpg";

function About() {
  return (
    <>
      <Navbar />
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('${TopView}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="flex flex-col items-center ustify-center mt-10">
            <span className="text-white my-5 text-3xl md:text-4xl font-header">
              Welcome to
            </span>
            <span className="text-white my-5 text-6xl md:text-7xl lg:text-8xl font-about md:font-montez">
              Food Villa
            </span>
          </h1>
        </div>
      </div>
      <div
        className=" w-full p
      y-10 bg-[#f2f2f2] flex flex-wrap items-center justify-evenly"
      >
        <div className="hidden lg:block basis-4/12 shadow-xl rounded-xl overflow-hidden my-14">
          <img src={Diner} alt="Food Villa" />
        </div>
        <div className="flex flex-col items-center justify-between my-8">
          <div className="text-5xl font-header text-primary">About us</div>
          <p className="m-10 text-lg md:text-xl max-w-3xl text-black">
            We bring the best taste and health right to your doorstep. Whether
            you're craving a hearty meal at home or looking for a place to relax
            and enjoy a delicious dining experience, Food Villa is the perfect
            destination. Our luxurious seating and inviting ambiance make it an
            ideal spot to unwind and spend quality time with friends and family.
            Indulge in our diverse menu and savor the flavors that make every
            meal a delightful experience at Food Villa.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
