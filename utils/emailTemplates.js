const getWelcomeTemplate = (name, department, designation, tempPassword) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; background:#f4f4f4; padding:20px; }
    .container { background:#fff; padding:20px; border-radius:10px; }
    .header { background:#4CAF50; color:white;  padding:10px; text-align:center; }
    .content { margin-top:20px; }
    .footer { margin-top:20px; font-size:12px; color:#777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to WorkSphere</h2>
    </div>

    <div class="content">
      <p>Hello <b>${name}</b>,</p>
      <p>Your account has been created successfully.</p>

      <p><b>Department:</b> ${department}</p>
      <p><b>Designation:</b> ${designation}</p>
      <p><b>Password:</b> ${tempPassword}</p>

      <p>We’re excited to have you onboard</p>
    </div>

    <div class="footer">
      <p>© 2026 WorkShere</p>
    </div>
  </div>
</body>
</html>
`;

const getOTPTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; background:#f4f4f4; padding:20px; }
    .box { background:#fff; padding:20px; border-radius:10px; text-align:center; }
    .otp { font-size:28px; font-weight:bold; color:#333; margin:20px 0; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Email Verification</h2>
    <p>Hello ${name},</p>
    <p>Your OTP is:</p>
    <div class="otp">${otp}</div>
    <p>This OTP is valid for 5 minutes.</p>
  </div>
</body>
</html>
`;

module.exports={
  getOTPTemplate,
  getWelcomeTemplate
}