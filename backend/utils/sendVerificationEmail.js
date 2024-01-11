const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ name, email, url }) => {
  return sendEmail({
    to: email,
    subject: "Confirmation Email",
    html: `<h1>Hello ${name}</h1>
  <p>Kindly click on the following link to confirm your email: ${url}</p>`,
  });
};

module.exports = sendVerificationEmail;
