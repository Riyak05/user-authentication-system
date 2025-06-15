import nodemailer from "nodemailer";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
) => {
  console.log("Preparing to send reset email to:", email);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email configuration is missing");
    return false;
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    console.error("App URL is not configured");
    return false;
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
  console.log("Reset URL generated:", resetUrl);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 0.875rem;">
          If the button above doesn't work, copy and paste this link into your browser:<br>
          <span style="color: #3b82f6;">${resetUrl}</span>
        </p>
      </div>
    `,
  };

  try {
    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
