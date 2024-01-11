const sendEmail = require("./sendEmail");

const sendResetPasswordLink = async ({ email, name, url }) => {
  return sendEmail({
    to: email,
    subject: "Password reset link",
    html: `<h1>Hello ${name}</h1>
  <p>Kindly click on the following link to reset your password: ${url}</p>`,
  });
};

module.exports = sendResetPasswordLink;
