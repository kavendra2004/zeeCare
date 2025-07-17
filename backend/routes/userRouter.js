const express = require('express');
const router = express.Router();
const {patientRegistration, loginUser, addNewAdmin, getAllDoctors, getUserDetails, logOutAdmin, logOutPatient, addNewDoctor} = require('../controller/userController');
const {isAdminAuthenticated, ispatientAuthenticated} = require('../middlewares/auth'); // Import authentication middlewares

router.post('/patient/register', patientRegistration); // Route for patient registration
router.post('/login', loginUser); // Route for user login
router.post('/addNewAdmin', isAdminAuthenticated, addNewAdmin); // Route for adding a new admin
router.get('/doctor/getAll', getAllDoctors); 
router.get('/admin/me', isAdminAuthenticated, getUserDetails); // Route to get admin details
router.get('/patient/me', ispatientAuthenticated, getUserDetails); // Route to get patient details
router.post('/admin/logout',isAdminAuthenticated, logOutAdmin);
router.post('/patient/logout',ispatientAuthenticated, logOutPatient);
router.post('/doctor/addNew', isAdminAuthenticated, addNewDoctor); // Route for adding a new doctor by admin

module.exports = router;