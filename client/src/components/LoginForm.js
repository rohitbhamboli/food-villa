import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import Loader from "./Loader.js";
import { toast } from "react-toastify";

// LoginForm now accepts error, isAuthenticated, and clearErrors as props
function LoginForm({ error, isAuthenticated, clearErrors }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Validation functions
  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    // Basic email regex for format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail); // Real-time validation
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword); // Real-time validation
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { icon: "🔴", toastId: error });
      clearErrors();
    }
    if (isAuthenticated) {
      toast.success("Login Successful!", { icon: "✅" });
      navigate("/");
    }
  }, [error, isAuthenticated, navigate, clearErrors]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          className="p-3 w-11/12 mx-auto mt-2 flex flex-col justify-evenly items-start"
          onSubmit={loginSubmit}
        >
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
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}

          <div className="relative w-full">
            <input
              className="w-full my-3 border-b-2 focus:outline-none pr-10" // Added pr-10 for eye icon space
              type={showPassword ? "text" : "password"} // Toggle type
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {/* Eye icon - You might need to import a specific icon library or use SVG */}
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.5-.241.807-.529 1.599-.87 2.366M9.383 11.383a3.001 3.001 0 0 1 3.718 3.718m-4.98-4.98a3.001 3.001 0 0 0 3.718 3.718M9.383 11.383L6.228 6.228m-2.24 2.24L.934 12m1.004 4.777l2.24-2.24m2.24-2.24l4.98-4.98M12 12l3.718 3.718M12 12l-3.718-3.718"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.172.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.172Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

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
      )}
    </>
  );
}

export default LoginForm;
