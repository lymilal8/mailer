const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();
app.use(express.json());

// Configure the SMTP transport for Gmail
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: 'lymitest@gmail.com',
      pass: 'kdluwqhjzqyscjxv'
    }
  })
);

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { recipient, subject, text } = req.body;

  // Compose the email message
  const mailOptions = {
    from: 'lymitest@gmail.com',
    to: recipient,
    subject: subject,
    text: text
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent successfully:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});