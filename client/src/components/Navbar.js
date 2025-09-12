import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import Logo from "./../images/logo-red.png";
import Profile from "./../images/Profile.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

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

      {/* Right side icons */}
      <div className="flex items-center space-x-4 pr-5">
        {/* Mobile screen icons */}
        <div className="lg:hidden flex items-center space-x-4">
          <NavLink to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {isAuthenticated && user && (
            <div className="relative profile-dropdown-container">
              <button
                className="flex items-center justify-center focus:outline-none"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img
                  src={user.avatar ? user.avatar : Profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <NavLink
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      toggleMenu();
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      toggleMenu();
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    Orders
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <div>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ce1212"
                className="size-6 w-9 h-9 cursor-pointer focus:outline-none"
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
                className="size-6 w-9 h-9 cursor-pointer focus:outline-none"
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
        </div>

        {/* Desktop screen icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative lg:order-3">
            {isAuthenticated && user ? (
              <div
                className="flex items-center mx-6 cursor-pointer profile-dropdown-container"
                onMouseEnter={() => {
                  clearTimeout(dropdownTimeout.current);
                  setIsProfileDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  dropdownTimeout.current = setTimeout(() => {
                    setIsProfileDropdownOpen(false);
                  }, 200); // 200ms delay
                }}
              >
                <img
                  src={user.avatar ? user.avatar : Profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 top-full">
                    <NavLink
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      Orders
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span className="lg:ml-5">
                <NavLink className="btn " to="/login?form=login">
                  Log in
                </NavLink>
                <NavLink className="btn ml-2 lg:ml-5" to="/login?form=register">
                  Sign up
                </NavLink>
              </span>
            )}
          </div>
          <NavLink to="/cart" className="relative lg:order-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </div>
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
        {!isAuthenticated && (
          <div className="flex flex-row items-center justify-center space-x-2 p-5">
            <NavLink
              className="btn"
              to="/login?form=login"
              onClick={toggleMenu}
            >
              Log in
            </NavLink>
            <NavLink
              className="btn"
              to="/login?form=register"
              onClick={toggleMenu}
            >
              Sign up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
