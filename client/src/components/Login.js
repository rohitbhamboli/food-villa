import React, { useState } from "react";
import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Wallpaper1 from "../images/png-img.png";
import Wallpaper2 from "../images/chef-png.png";
import Footer from "./Footer";

function Login() {
  const [loginTab, setLoginTab] = useState(true);

  const handleLoginToggle = () => {
    setLoginTab(true);
  };
  const handleRegisterToggle = () => {
    setLoginTab(false);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-evenly items-center w-full h-11/12 my-10 lg:my-auto">
        {/* --------left side png------- */}
        <div className="hidden lg:block w-72 h-72 drop-shadow-2xl">
          <img src={Wallpaper2} alt="simple logo" />
        </div>
        {/* login-box card div */}
        <div className="w-80 my-28 md:w-1/3 md:mt-36 py-2 lg:w-80 lg:mt-32 rounded-xl shadow-2xl shadow-slate-500 overflow-hidden transition-all duration-500">
          {/* login / register toggle  */}
          <div className="relative w-44 lg:w-52 mx-auto my-5  py-2 rounded-3xl shadow-lg text-center cursor-pointer flex justify-around items-center">
            <div
              className={`absolute top-0 left-0 transition-translate duration-500 ${
                loginTab ? "translate-x-0" : "translate-x-full"
              } w-1/2 h-full bg-primary rounded-3xl `}
            ></div>
            <button
              type="button"
              className={`mx-2 lg:px-3 relative ${
                loginTab ? "text-white" : "text-gray-700"
              }`}
              onClick={handleLoginToggle}
            >
              Log in
            </button>
            <button
              type="button"
              className={`mx-2 lg:px-3 relative ${
                loginTab ? "text-gray-700" : "text-white"
              }`}
              onClick={handleRegisterToggle}
            >
              Register
            </button>
          </div>
          {/* social icon box  */}

          <div className="flex justify-evenly ml-3 mt-5 h-12 items-center text-xl">
            <i className="fa-brands fa-google social-icons"></i>
            <i className="fa-brands fa-apple social-icons text-2xl"></i>
            <i className="fa-brands fa-facebook-f social-icons"></i>
            <i className="fa-brands fa-x-twitter social-icons"></i>
          </div>

          {/* login / register form div */}
          <div
            className={`flex justify-around transition-transform duration-500 ease-in-out ${
              loginTab
                ? "transform translate-x-0"
                : "transform -translate-x-1/2"
            }`}
            style={{ width: "200%" }}
          >
            <div className="w-1/2">
              <LoginForm />
            </div>
            <div className="w-1/2">
              <RegisterForm />
            </div>
          </div>
        </div>

        {/* --------- right side png ---------- */}
        <div className="hidden lg:block w-80 h-80 drop-shadow-2xl">
          <img src={Wallpaper1} alt="simple logo" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
