// const nodemailer = require("nodemailer");
// const credentials = require("./credentials");
// const mailTransport = nodemailer.createTransport("SMTP", {
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   secure: true,
//   port: 465,
//   auth: {
//     user: credentials.gmail.user,
//     pass: credentials.gmail.pass,
//   },
// });
// // Send Mail
// mailTransport
//   .sendMail({
//     from: '"Kingsley Onyebuchi"<godwin2341@gmail.com>',
//     to: "godwin2341@gmail.com",
//     subject: "Email verification",
//     text: "Please kindly confirm your registration",
//   })
//   .catch((err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
