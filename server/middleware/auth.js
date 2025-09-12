import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to verify JWT and attach user to the request object
export const isAuthenticatedUser = async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // If no token is found, user is not authenticated
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource" });
  }

  try {
    // Verify the token using the JWT secret
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID from the token payload and attach it to the request
    req.user = await User.findById(decodedData.id);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle cases where the token is invalid or expired
    return res.status(401).json({ message: "Invalid token, please login again" });
  }
};