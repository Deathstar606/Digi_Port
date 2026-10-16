const express = require('express');
const nodemailer = require('nodemailer');
const Emailrouter = express.Router();

Emailrouter.post('/', (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "dsfardin606@gmail.com", 
      pass: "mmci qyfw zkny mnmt",  
    }
  });

  const mailOptions = {
    from: email,
    to: 'digix71@gmail.com',
    subject: 'Message From Website',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

module.exports = Emailrouter;
