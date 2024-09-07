import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  return (
    <form className=" p-3 w-11/12 mx-auto mt-2 flex flex-col justify-evenly items-start">
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="w-full my-3 border-b-2 focus:outline-none"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        required
      />
      <span className="flex justify-center items-center my-3">
        <input
          className="mr-2 transform scale-110 focus:outline-none bg-primary"
          type="checkbox"
          name="remember"
          id="remember"
        />
        <label
          className="text-lg lg:text-sm cursor-pointer select-none"
          htmlFor="remember"
        >
          Remember me
        </label>
      </span>
      <button type="submit" className="btn w-full mt-4">
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
