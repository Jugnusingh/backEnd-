const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password for gmail
  },
});

// send mail with defined transport object
const sendEmail = async (emailOptions) => {
  try {
    let info = await transporter.sendMail(emailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
