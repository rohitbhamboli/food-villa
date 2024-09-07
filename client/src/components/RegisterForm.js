import React from "react";

function RegisterForm() {
  return (
    <form className="p-3 w-11/12 mx-auto flex flex-col justify-evenly items-start">
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
      />
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        required
      />
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="tel"
        name="phone"
        id="phone"
        min="10"
        max="10"
        placeholder="Phone Number"
        required
      />
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="password"
        name="cpassword"
        id="cpassword"
        placeholder="Confirm Password"
        required
      />
      <span className="flex justify-center items-center my-2">
        <input
          className="mr-2 transform scale-110 focus:outline-none bg-primary"
          type="checkbox"
          name="terms"
          id="terms"
        />
        <label
          className="text-lg lg:text-sm cursor-pointer select-none"
          htmlFor="terms"
        >
          I accept Terms & Conditions
        </label>
      </span>
      <button type="submit" className="btn w-full mt-2">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
