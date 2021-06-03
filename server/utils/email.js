const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.name = user.username),
      (this.url = url),
      (this.from = 'Facebook');
  }

  newTransport() {
    // using mailtrap for testing
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      //activate in gmail "less secure app" option
    });
  }

  async send(message, subject) {
    // 1) define the email options
    const mailOptions = {
      from: 'udaymittal0123@gmail.com',
      to: this.to,
      subject,
      text: message,
    };

    // 2) create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, data) => {
      if (err) console.log(err);
      else console.log('Email sent successfully');
    });
  }

  //For sending welcome email anytime a new user sign up
  async sendWelcome() {
    // Relevant subject is added here
    await send('Welcome', 'Welcome to Facebook!');
  }

  // password reset
  async sendPasswordReset(message) {
    await this.send(
      message,
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  //We can use this same function for more emails too
};
