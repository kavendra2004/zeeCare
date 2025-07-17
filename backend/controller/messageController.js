const asyncHandler = require("../middlewares/catchAsyncErrors");
const messageModel = require("../models/messageModel");
const { ErrorHandler } = require("../middlewares/errorMiddleware");

exports.sendMessage = asyncHandler(async (req, res, next) => {
    try {

      console.log("📥 Message received:", req.body); // ✅ Add this
      const { firstName, lastName, email, phone, message } = req.body;
  
      // Validate the input data
      if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill all the fields", 400));
      }
  
      // Create a new message instance
      const newMessage = new messageModel({
        firstName,
        lastName,
        email,
        phone,
        message,
      });
  
      // Save the message to the database
      await newMessage.save();
  
      // Send a response back to the client
      res.status(201).json({
        status: "success",
        message: "message sent successfully",
        data: {
          firstName,
          lastName,
          email,
          phone,
          message,
        },
      });
    } catch (error) {
      console.error("error in sending message", error);
      res.status(500).json({
        status: "error",
        message: "error in sending message",
        error: error.message,
      });
    }
  })

  exports.getAllMessages = asyncHandler(async (req, res) => {
    
      // Fetch all messages from the database
      const messages = await messageModel.find();
  
      // Send a response back to the client
      res.status(200).json({
        status: "success",
        data: messages,
      });
    
  });
