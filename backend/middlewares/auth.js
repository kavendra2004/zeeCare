import asyncHandler from "./catchAsyncErrors.js";
import { ErrorHandler, errorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Adjust the path as necessary

export const isAdminAuthenticated = asyncHandler(async(req, res, next) => {
  // Always attach these headers manually
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
    const token = req.cookies.adminToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ErrorHandler("Please login as admin to access this resource", 401));
  }
  
    // Verify the token and extract user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming req.user is set by a previous middleware that verifies the token
    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. Please login again.',
      });
    }
    req.user = await User.findById(decoded.id); // Set the user information in the request object
    if (!req.user || req.user.role !== "admin") {
      return next(new ErrorHandler("You are not authorized to access this resource", 403));
    }
    next();
  });

  export const ispatientAuthenticated = asyncHandler(async(req, res, next) => {
    const token = req.cookies.patientToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("Please login as patient to access this resource", 401));
    }
  
    // Verify the token and extract user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming req.user is set by a previous middleware that verifies the token
    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. Please login again.',
      });
    }
    req.user = await User.findById(decoded.id); // Set the user information in the request object
    if (!req.user || req.user.role !== "patient") {
      return next(new ErrorHandler("You are not authorized to access this resource", 403));
    }
    next();
  });