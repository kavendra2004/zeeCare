const mongoose = require('mongoose');
const valdiate = require('validator'); 

const appointmentSchema = new mongoose.Schema({
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
  dateOfAppointment: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum:["male","female"]
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Assuming you have a Doctor model
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Assuming you have a Patient model
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const appointment = mongoose.model('appointment', appointmentSchema);
module.exports = appointment;