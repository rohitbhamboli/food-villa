import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../actions/userActions";
import { toast } from "react-toastify";
import Profile from "../images/Profile.png";
import OtpVerification from "./OtpVerification";

// RegisterForm now accepts error, isAuthenticated, and clearErrors as props
function RegisterForm({ error, isAuthenticated, clearErrors }) {
  const dispatch = useDispatch();
  const { tempUser } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  // Validation states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userData, setUserData] = useState(null);

  // Validation functions
  const validateName = (name) => {
    if (!name) {
      setNameError("Name is required");
      return false;
    }
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (phone) => {
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setPhoneError("Phone number must be 10 digits");
      return false;
    }
    setPhoneError("");
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

  const validateCpassword = (cpassword, password) => {
    if (!cpassword) {
      setCpasswordError("Confirm Password is required");
      return false;
    }
    if (cpassword !== password) {
      setCpasswordError("Passwords do not match");
      return false;
    }
    setCpasswordError("");
    return true;
  };

  const handleInputChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
        setAvatar(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });

      // Real-time validation based on field name
      if (e.target.name === "name") validateName(e.target.value);
      if (e.target.name === "email") validateEmail(e.target.value);
      if (e.target.name === "phone") validatePhone(e.target.value);
      if (e.target.name === "password") validatePassword(e.target.value);
      if (e.target.name === "cpassword")
        validateCpassword(e.target.value, user.password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleCpasswordVisibility = () => {
    setShowCpassword((prevShowCpassword) => !prevShowCpassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const isNameValid = validateName(user.name);
    const isEmailValid = validateEmail(user.email);
    const isPhoneValid = validatePhone(user.phone);
    const isPasswordValid = validatePassword(user.password);
    const isCpasswordValid = validateCpassword(user.cpassword, user.password);

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isCpasswordValid
    ) {
      const myForm = new FormData();

      myForm.set("name", user.name);
      myForm.set("email", user.email);
      myForm.set("phone", user.phone);
      myForm.set("password", user.password);
      myForm.set("cpassword", user.cpassword);
      if (avatar) {
        myForm.set("avatar", avatar);
      }

      setUserData(myForm);
      dispatch(sendOtp(user.email));
      setShowOtpVerification(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { icon: "🔴", toastId: error });
      clearErrors();
    }

    if (isAuthenticated) {
      toast.success("Registration Successful!", { icon: "✅" });
    }
  }, [error, isAuthenticated, clearErrors]);

  return (
    <>
      {showOtpVerification ? (
        <OtpVerification
          userData={userData}
          tempUser={tempUser}
          onOtpVerified={() => {
            setShowOtpVerification(false);
          }}
        />
      ) : (
        <form
          className="p-3 w-11/12 mx-auto flex flex-col justify-evenly items-start"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full my-3 border-b-2 focus:outline-none"
            type="text"
            name="name"
            id="register-name"
            placeholder="Name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}

          <input
            className="w-full my-3 border-b-2 focus:outline-none"
            type="email"
            name="email"
            id="register-email"
            placeholder="E-mail"
            value={user.email}
            onChange={handleInputChange}
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}

          <input
            className="w-full my-3 border-b-2 focus:outline-none"
            type="tel"
            name="phone"
            id="register-phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleInputChange}
            required
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}

          <div className="relative w-full">
            <input
              className="w-full my-3 border-b-2 focus:outline-none pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              id="register-password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
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

          <div className="relative w-full">
            <input
              className="w-full my-3 border-b-2 focus:outline-none pr-10"
              type={showCpassword ? "text" : "password"}
              name="cpassword"
              id="register-cpassword"
              placeholder="Confirm Password"
              value={user.cpassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none"
              onClick={toggleCpasswordVisibility}
            >
              {showCpassword ? (
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
          {cpasswordError && (
            <p className="text-red-500 text-sm mt-1">{cpasswordError}</p>
          )}

          <div className="flex items-center my-3">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-12 h-12 rounded-full mr-4"
            />
            <input
              className="w-full file:bg-gray-200 file:border-none file:rounded-full file:text-primary"
              type="file"
              accept="image/*"
              name="avatar"
              id="avatar"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn w-full mt-2">
            Register
          </button>
        </form>
      )}
    </>
  );
}

export default RegisterForm;
