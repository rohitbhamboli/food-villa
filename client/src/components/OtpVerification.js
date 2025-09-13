import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAndRegister, sendOtp } from "../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const OtpVerification = ({ userData, tempUser, onOtpVerified }) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(60); // 60 seconds for OTP expiry
  const [canResend, setCanResend] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (error) {
      toast.error(error, { icon: "🔴", toastId: error });
    }
    if (isAuthenticated) {
      toast.success("Registration Successful!", { icon: "✅" });
      onOtpVerified(); // Notify parent component
      navigate("/");
    }
  }, [error, isAuthenticated, navigate, onOtpVerified]);

  const validateOtp = (otp) => {
    if (!otp) {
      setOtpError("OTP is required");
      return false;
    }
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("OTP must be a 6-digit number");
      return false;
    }
    setOtpError("");
    return true;
  };

  const handleOtpChange = (e) => {
    const newOtp = e.target.value;
    setOtp(newOtp);
    validateOtp(newOtp);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (validateOtp(otp)) {
      // Dispatch verifyOtp action

      if (tempUser) {
        userData.set("tempUser", JSON.stringify(tempUser));
      }
      userData.set("otp", otp);
      // console.log(
      //   "FormData sent to verifyOtpAndRegister:",
      //   Object.fromEntries(userData.entries())
      // );
      dispatch(verifyOtpAndRegister(userData));
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    setCanResend(false);
    dispatch(sendOtp(tempUser.email)); // Resend OTP
    toast.info("OTP has been re-sent!", { icon: "📧" });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          className="p-3 w-11/12 mx-auto mt-2 flex flex-col justify-evenly items-start animate-fade-in"
          onSubmit={handleVerifyOtp}
        >
          <h2 className="text-2xl font-bold mb-4 text-center w-full">
            OTP Verification
          </h2>
          <p className="text-gray-600 mb-4 text-center w-full">
            An OTP has been sent to {tempUser && tempUser.email}. Please enter
            it below.
          </p>
          <input
            className="w-full my-3 border-b-2 focus:outline-none transition-all duration-300 ease-in-out focus:border-primary"
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          {otpError && (
            <p className="text-red-500 text-sm mt-1 animate-slide-down">
              {otpError}
            </p>
          )}

          <button type="submit" className="btn w-full mt-4 animate-scale-in">
            Verify OTP
          </button>

          <div className="w-full text-center mt-4">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-primary hover:underline animate-fade-in"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-500 animate-fade-in">
                Resend OTP in {timer} seconds
              </p>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default OtpVerification;
