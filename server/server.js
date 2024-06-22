const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email service you want (e.g., 'gmail')
  auth: {
    user: 'akshayajanarthanreddy@gmail.com', // Your email address
    pass: 'AKshaya03@', // Your email password or app-specific password
  },
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
