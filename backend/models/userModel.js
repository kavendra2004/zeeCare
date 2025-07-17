const mongoose = require('mongoose');
const valdiate = require('validator'); // Import the validator library for validation
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for JWT generation

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name must be at most 20 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, "Last name must be at least 2 characters"],
    maxlength: [50, "Last name must be at most 20 characters"],
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone number must be at least 10 characters"],
    maxlength: [15, "Phone number must be at most 15 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [valdiate.isEmail, "Please enter a valid email address"],
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name must be at most 50 characters"],
  },
  NIC: {
    type: String,
    required: true,
    minlength: [13, "NIC number must be at least 13 characters"],
    maxlength: [15, "NIC number must be at most 15 characters"],
  },
  DOB: {
    type: String,
    required: [true, "Date of Birth is required"],
    
  },
  gender: {
    type: String,
    required: [true," gendrer is required"],
    enum: ["male" , "female"],
},
password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Exclude password from query results by default
},
role:{
    type: String,
    required: true,
    enum: ["admin", "patient", "doctor"],
    default: "user",
},
doctorDepartment: {
    type: String ,
},
docAvatar: {
    public_id: String,
    url: String,
},
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
}

const user = mongoose.model('user', userSchema);
module.exports = user;