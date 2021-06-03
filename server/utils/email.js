const nodemailer = require('nodemailer');

const email = (username, mail) => {
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'udaymittal0123@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    //activate in gmail "less secure app" option
  });

  const send = async (subject) => {
    // 1) define the email options
    const mailOptions = {
      from: 'udaymittal0123@gmail.com',
      to: mail,
      subject,
      text: `Hello ${username}.\nWelcome to Facebook.\n`,
    };

    // 2) create a transport and send email
    await mailTransporter.sendMail(mailOptions, (err, data) => {
      if (err) console.log(err);
      else console.log('Email sent successfully');
    });
  };

  //For sending welcome email anytime a new user sign up
  const sendWelcome = async () => {
    // Relevant subject is added here
    await send('Welcome to Facebook!');
  };

  //We can use this same function for more emails too
};

module.exports = email;
