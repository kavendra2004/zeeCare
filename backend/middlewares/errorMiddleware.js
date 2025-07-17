// class ErrorHandler extends Error {
//   constructor(message, statusCode) {
//     super(message); // Call the parent constructor with the message
//     this.statusCode = statusCode; // Set the status code
//   }
// }

// exports.errorHandler = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500; // Set the status code if not already set
//   err.message = err.message || "Internal Server Error"; // Set the message if not already set

//   if (err.code === 11000) {
//     const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
//     err = new ErrorHandler(message, 400); // Create a new errorHandler instance with the message and status code
//   }

//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors).map((value) => value.message);
//     err = new ErrorHandler(message, 400); // Create a new errorHandler instance with the message and status code
//   }

//   if (err.name === "JsonWebTokenError") {
//     const message = "Json Web Token is invalid, try again";
//     err = new ErrorHandler(message, 400); // Create a new errorHandler instance with the message and status code
//   }
//   if (err.name === "TokenExpiredError") {
//     const message = "Json Web Token is expired, try again";
//     err = new ErrorHandler(message, 400); // Create a new errorHandler instance with the message and status code
//   }

//   if (err.name === "CastError") {
//     const message = `Invalid ${err.path}`;
//     err = new ErrorHandler(message, 400); // Create a new errorHandler instance with the message and status code
//   }

//   const errMessage = err.errors
//     ? Object.values(err.errors)
//         .map((error) => error.message)
//         .join(" ")
//     : err.message;

//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };

// exports.ErrorHandler = ErrorHandler; // Export the ErrorHandler class for use in other parts of the application

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  console.log("🔥 Error caught:", err);
  err.statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid token. Please try again.", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Token expired. Please login again.", 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = { ErrorHandler, errorHandler };