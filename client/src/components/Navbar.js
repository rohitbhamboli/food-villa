import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./../images/logo-red.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-around items-center bg-white space-x-0 lg:h-24 fixed w-full top-0 left-0 z-10">
      <div className="flex items-center p-5 pl-0">
        <NavLink to="/">
          <img
            className="w-auto h-20 lg:h-24 object-contain"
            src={Logo}
            alt="Food Villa"
          />
        </NavLink>
      </div>
      <ul className="hidden lg:flex justify-center lg:flex-row items-center lg:m-5">
        <li className="m-5">
          <NavLink to="/" className="relative inline-block group">
            <span>Home</span>
            <span className="links"></span>
          </NavLink>
        </li>
        <li className="m-5">
          <NavLink to="/about" className="relative inline-block group">
            <span>About</span>
            <span className="links"></span>
          </NavLink>
        </li>
        <li className="m-5">
          <NavLink to="/menu" className="relative inline-block group">
            <span>Menu</span>
            <span className="links"></span>
          </NavLink>
        </li>
        <li className="m-5">
          <NavLink to="/booking" className="relative inline-block group">
            <span>Reservation</span>
            <span className="links"></span>
          </NavLink>
        </li>
        <li className="m-5">
          <NavLink to="/contact" className="relative inline-block group">
            <span>Contact us</span>
            <span className="links"></span>
          </NavLink>
        </li>
      </ul>

      {/* Login Sign up buttons */}

      <div className="hidden md:block mt-2 p-5">
        <span className="lg:ml-5">
          <NavLink className="btn " to="/login">
            Log in
          </NavLink>
          <NavLink className="btn ml-2 lg:ml-5" to="/login">
            Sign up
          </NavLink>
        </span>
      </div>

      {/* Hamburger menu icon */}

      <div className="lg:hidden">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ce1212"
            className="size-6 w-9 h-9 m-5 cursor-pointer focus:outline-none"
            onClick={toggleMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ce1212"
            className="size-6 w-9 h-9 m-5 cursor-pointer focus:outline-none"
            onClick={toggleMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
            />
          </svg>
        )}
      </div>

      {/* Dropdown menu */}

      <div
        className={`absolute top-full left-0 w-full bg-white text-center transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-5">
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={toggleMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" onClick={toggleMenu}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" onClick={toggleMenu}>
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={toggleMenu}>
              Contact us
            </NavLink>
          </li>
        </ul>
        <div className="block md:hidden mt-2 p-5">
          <span className="lg:ml-5">
            <NavLink className="btn " to="/login">
              Log in
            </NavLink>
            <NavLink className="btn ml-2 lg:ml-5" to="/login">
              Sign up
            </NavLink>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
