import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <Navbar />
      {/* ----------contact form------------ */}
      <div className="w-full my-20 mt-44 lg:mt-28 flex flex-col justify-center items-center font-header text-primary">
        <h1 className="relative flex items-center align w-3/4 lg:w-2/4 lg:mx-auto mx-5 font-header -mt-10 lg:my-8">
          <div className="flex-grow border-t border-primary"></div>
          <span className="flex-shrink mx-4 text-primary font-header text-4xl">
            Contact us
          </span>
          <div className="flex-grow border-t border-primary"></div>
        </h1>
        <div className="w-4/5 md:w-1/2 shadow-2xl mt-12">
          <form className="flex flex-col items-start justify-evenly p-3 w-11/12 mx-auto">
            <div className="flex justify-center items-center w-full my-2">
              <input
                className="w-[48%] my-2 mx-2 lg:mx-5 border-b-2 focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <input
                className="w-[48%] my-2 mx-2 lg:mx-5 border-b-2 focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="flex justify-center items-center w-full my-2">
              <input
                className="w-full my-2 mx-4 border-b-2 focus:outline-none"
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
                value={subject}
                onChange={handleSubjectChange}
                required
              />
            </div>
            <div className="flex justify-center items-center w-full my-2">
              <textarea
                className="w-full my-2 mx-4 border-2 focus:outline-none p-2 rounded-lg"
                type="text"
                name="message"
                id="message"
                placeholder="Message"
                value={message}
                rows={5}
                onChange={handleMessageChange}
                required
              />
            </div>

            <button type="submit" className="btn m-4 mx-auto">
              Send Message
            </button>
          </form>
        </div>
      </div>
      {/* -----------------contact cards--------------------- */}
      <div className="flex flex-wrap w-full my-5">
        {/* -----------cards go here----------- */}
        <div className="flex basis-11/12 md:basis-5/12 flex-nowrap rounded-xl h-24 my-8 mx-auto shadow-xl">
          <div className="flex flex-nowrap basis-1/4 items-center justify-center">
            <i className="fa-solid fa-location-dot text-white bg-primary rounded-full w-10 h-10 items-center justify-center text-center pt-3"></i>
          </div>
          <div className="flex flex-col flex-nowrap item-center justify-start my-auto">
            <h1 className="text-lg text-black font-body">Address</h1>
            <p className="text-sm">Bhambholi, Opposite Shyam Resort</p>
          </div>
        </div>
        <div className="flex basis-11/12 md:basis-5/12 flex-nowrap rounded-xl h-24 my-8 mx-auto shadow-xl">
          <div className="flex flex-nowrap basis-1/4 items-center justify-center">
            <i className="fa-regular fa-clock text-white bg-primary rounded-full w-10 h-10 items-center justify-center text-center pt-3"></i>
          </div>
          <div className="flex flex-col flex-nowrap item-center justify-start my-auto">
            <h1 className="text-lg text-black font-body">Opening Hours</h1>
            <p className="text-sm">
              Mon-Sat: 09 AM - 10 pm, Sun: 10 AM - 10 PM
            </p>
          </div>
        </div>
        <div className="flex basis-11/12 md:basis-5/12 flex-nowrap rounded-xl h-24 my-8 mx-auto shadow-xl">
          <div className="flex flex-nowrap basis-1/4 items-center justify-center">
            <i className="fa-solid fa-phone text-white bg-primary rounded-full w-10 h-10 items-center justify-center text-center pt-3"></i>
          </div>
          <div className="flex flex-col flex-nowrap item-center justify-start my-auto">
            <h1 className="text-lg text-black font-body">Call us</h1>
            <p className="text-sm">+91 87083943472</p>
          </div>
        </div>
        <div className="flex basis-11/12 md:basis-5/12 flex-nowrap rounded-xl h-24 my-8 mx-auto shadow-xl">
          <div className="flex flex-nowrap basis-1/4 items-center justify-center">
            <i className="fa-regular fa-envelope text-white bg-primary rounded-full w-10 h-10 items-center justify-center text-center pt-3"></i>
          </div>
          <div className="flex flex-col flex-nowrap item-center justify-start my-auto">
            <h1 className="text-lg text-black font-body">E-mail</h1>
            <p className="text-sm">food.villa@gmail.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
