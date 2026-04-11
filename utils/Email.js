const nodemailer = require("nodemailer");

const getWelcomeTemplate = (name, designation, department,tempPassword) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; background:#f4f4f4; padding:20px; }
    .container { background:#fff; padding:20px; border-radius:10px; }
    .header { background:#4CAF50; color:white; display:flex; gap:5px padding:10px; text-align:center; }
    .content { margin-top:20px; }
    .footer { margin-top:20px; font-size:12px; color:#777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
    <img src="assets/logo/workSphere-logo.png" width="120" />
      <h2>Welcome to WorkSphere</h2>
    </div>

    <div class="content">
      <p>Hello <b>${name}</b>,</p>
      <p>Your account has been created successfully.</p>

      <p><b>Department:</b> ${department}</p>
      <p><b>Designation:</b> ${designation}</p>
      <p><b>Password:</b> ${tempPassword}</p>

      <p>We’re excited to have you onboard 🚀</p>
    </div>

    <div class="footer">
      <p>© 2026 WorkShere</p>
    </div>
  </div>
</body>
</html>
`;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
  } catch (err) {
    console.log("Email error:", err.message);
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
  }
};

module.exports = {
  sendEmail,
  getWelcomeTemplate
};
