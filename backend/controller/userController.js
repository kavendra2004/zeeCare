const asyncHandler = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/errorMiddleware");
const userModel = require("../models/userModel");
const {generateJwtToken} = require("../utils/jwtToken"); // Import the token generation utility
const cloudinary = require("../config/cloudinary"); // Import the Cloudinary configuration

exports.patientRegistration = asyncHandler(async (req, res, next) => {
  try {
    // Simulate fetching user data from a database
    const {
      firstName,
      lastName,
      email,
      phone,
      NIC,
      DOB,
      gender,
      password,
      role
    } = req.body;

    // Validate the input data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !NIC ||
      !DOB ||
      !gender ||
      !password ||
      !role
    ) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      NIC,
      DOB,
      gender,
      password,
      role, // Set the role to 'patient'
    });
    
    if (!newUser) {
      return next(new ErrorHandler("User not found or registration failed", 400));
    }

    // Generate JWT token for the user
    const token = generateJwtToken(newUser, "User registered successfully", 201, res);

  } catch (error) {
    console.error("Error in patient registration:", error);
    res.status(500).json({
      success: false,
      message: "Error in patient registration",
      error: error.message,
    });
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const {
        email,
        confirmPassword,
        password,
        role,
        } = req.body;

    // Validate the input data
    if (!email || !password || !role || !confirmPassword ) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    // Find the user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if the password matches
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if the role matches
    if (user.role !== role) {
      return next(new ErrorHandler("Invalid role", 403));
    }

    // const token = generateJwtToken(user);
    // res.status(200).json({
    //   success: true,
    //   message: "User logged in successfully",
    //   token,
    //   user,
    // });

    generateJwtToken(user, "User logged in successfully", 200, res);
});

exports.addNewAdmin = asyncHandler(async (req, res, next) => {
  const { firstName,
      lastName,
      email,
      phone,
      NIC,
      DOB,
      gender,
      password,
     } = req.body;

  // Validate the input data
  if (!firstName ||
      !lastName ||
      !email ||
      !phone ||
      !NIC ||
      !DOB ||
      !gender ||
      !password 
    ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  // Check if the user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  // Create a new admin user
  const newAdmin = await userModel.create({
    firstName,
    lastName,
    email,
    phone,
    NIC,
    DOB,
    gender,
    password,
    role: "admin",
  });

  // Generate JWT token for the admin
//   const token = generateJwtToken(newAdmin, "Admin created successfully", 201, res);
    res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: newAdmin,
    });
});

exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  
    // Fetch all doctors from the database
    const doctors = await userModel.find({ role: "doctor" });

    if (doctors.length === 0) {
      return next(new ErrorHandler("No doctors found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });
});

exports.getUserDetails = asyncHandler(async (req, res, next) => {
  const user = req.user;
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        data: user,
    });
});

exports.logOutAdmin = asyncHandler(async (req, res, next) => {
  // Clear the admin token cookie
  res.clearCookie("adminToken");

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
});

exports.logOutPatient = asyncHandler(async (req, res, next) => {
  // Clear the patient token cookie
  res.clearCookie("patientToken");

  res.status(200).json({
    success: true,
    message: "patient logged out successfully",
  });
});

exports.addNewDoctor = asyncHandler(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload a profile picture", 400));
    }
    const { docFormat } = req.files;
    console.log(docFormat);
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if(!allowedFormats.includes(docFormat.mimetype)) {
        return next(new ErrorHandler("Invalid file format. Please upload a JPEG or PNG image.", 400));
    }
    const { firstName, lastName, email, phone, NIC, gender, DOB, password, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !NIC || !gender || !DOB || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docFormat.tempFilePath, {
        folder: "doctorAvatars",
        width: 150,
        height: 150,
        crop: "scale",
    });
    if(!cloudinaryResponse) {
        return next(new ErrorHandler("Error uploading profile picture to Cloudinary", 500));
    }
    const newDoctor = await userModel.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        NIC, 
        gender, 
        DOB, 
        password, 
        doctorDepartment,
        role: "doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(201).json({
        success: true,
        message: "Doctor created successfully",
        data: newDoctor,
    });
});
