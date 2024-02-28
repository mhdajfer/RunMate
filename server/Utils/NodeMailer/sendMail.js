const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'runmate88@gmail.com',
    pass: "ajtk gnyn mqfe avuz",
  },
});

const sendMail = async (email, url) => {
  const userDetails = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Activate your account", // Subject line
    html: `<b>Your activation link :- ${url}</b>`, // html body
  };

  transporter.sendMail(userDetails, (err, data) => {
    if (err) {
      console.log("errorr", err);
    } else {
      console.log("email sent successfully");
    }
  });
};

module.exports = sendMail;
