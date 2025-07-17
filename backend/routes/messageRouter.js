const express = require('express');
const router = express.Router();
const {sendMessage, getAllMessages} = require('../controller/messageController'); // Import the sendMessage function from the controller
const { isAdminAuthenticated } = require('../middlewares/auth');



router.post('/sendMessage', sendMessage);
router.get('/getAllMessages', isAdminAuthenticated, getAllMessages ); // Define a GET route to retrieve all messages 
 
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the file upload API',
  });
}); // Define a GET route for the root URL of this router

module.exports = router; // Export the router for use in other parts of the application
// This file defines the routes for handling file uploads and retrievals