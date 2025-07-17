const express = require('express');
const router = express.Router();
const { postappointment, getAllAppointments, updateAppointment, deleteAppointment } = require('../controller/appointmentController'); // Import appointment controller functions
const { ispatientAuthenticated, isAdminAuthenticated } = require('../middlewares/auth');


router.post('/post',ispatientAuthenticated ,postappointment);
router.get('/getAll',isAdminAuthenticated ,getAllAppointments);
router.put('/update/:id',isAdminAuthenticated ,updateAppointment);
router.delete('/delete/:id',isAdminAuthenticated ,deleteAppointment);

module.exports = router;