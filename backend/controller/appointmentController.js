
const asyncHandler = require('../middlewares/catchAsyncErrors');
const { ErrorHandler } = require('../middlewares/errorMiddleware');
const appointment = require('../models/appointmentShema');
const userModel = require('../models/userModel'); // Adjust the path as necessary

exports.postappointment = asyncHandler(async (req, res, next) => {
 
    const {   
      firstName,
      lastName,
      phone,
      email,
      NIC,
      DOB,
      dateOfAppointment,
      gender,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address,
    } = req.body;

    // Validate the input data
    if (
      !firstName || !lastName || !phone || !email || !NIC || !DOB || !dateOfAppointment ||
      !gender || !department || !doctor_firstName || !doctor_lastName || address === undefined
    ) {
      return next(new ErrorHandler('Please fill all the fields', 400));
    }

    if (typeof hasVisited !== 'boolean') {
      return next(new ErrorHandler('Invalid value for hasVisited', 400));
    }


    // Check if the doctor exists
    const doctor = await userModel.find({firstName: doctor_firstName , lastName : doctor_lastName, role: 'doctor', doctorDepartment: department});
    if (doctor.length===0) {
      return next(new ErrorHandler('Doctor not found', 404));
    }
    if(doctor.length>1){
      return next(new ErrorHandler('Multiple doctors found with the same name. Please specify the doctor more clearly.', 400));
    }
    const doctorId = doctor[0]._id; // Assuming the first doctor is the one to be assigned
    const patientId = req.user._id; // Assuming the patient ID is available in the request user object
    // Create a new appointment

    if (!req.user || !req.user._id) {
      return next(new ErrorHandler('User authentication failed', 401));
    }

    const newAppointment = await appointment.create({
      firstName,
      lastName,
      phone,
      email,
      NIC,
      DOB,
      dateOfAppointment,
      gender,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });

    res.status(201).json({
      data: newAppointment,
      status: 'success',
      message: 'Appointment created successfully',
    });

});

exports.getAllAppointments = asyncHandler(async (req, res, next) => {

    // Fetch all appointments from the database
    const appointments = await appointment.find();

    if (appointments.length === 0) {
      return next(new ErrorHandler("No appointments found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });
});

exports.updateAppointment = asyncHandler(async (req, res, next) => {

    const { id } = req.params; // Assuming the appointment ID is passed as a URL parameter
    const appointmentId = id; // Use the ID from the request parameters

    // Validate the input data
    if (!appointmentId || Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("Please provide appointment ID and data to update", 400));
    }

    const updatedAppointment = await appointment.findByIdAndUpdate(appointmentId, req.body, { new: true });

    if (!updatedAppointment) {
      return next(new ErrorHandler("Appointment not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
});

exports.deleteAppointment = asyncHandler(async (req, res, next) => {

    const { id } = req.params; // Assuming the appointment ID is passed as a URL parameter
    const appointmentId = id; // Use the ID from the request parameters

    // Validate the input data
    if (!appointmentId || Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("Please provide appointment ID and data to update", 400));
    }

    const deletedAppointment = await appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return next(new ErrorHandler("Appointment not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      data: deletedAppointment,
    });
});