// eslint-disable-next-line
import React, { useState } from "react";

function RegisterForm() {
  // const {}
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
      <input
        className="w-full my-3 border-b-2 focus:outline-none file:bg-gray-200 file:border-none file:rounded-full file:text-primary"
        type="file"
        accept="image/*"
        name="avatar"
        id="avatar"
        placeholder="Avatar"
      />
      <button
        type="submit"
        className="btn w-full mt-2"
        // onClick={handleRegister}
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
