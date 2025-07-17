const mongoose = require('mongoose');
const valdiate = require('validator'); // Import the validator library for validation

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
  message: {
    type: String,
    required: true,
  },
});

const message = mongoose.model('message', messageSchema);
module.exports = message;