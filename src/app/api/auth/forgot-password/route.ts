import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/utils/emailConfig";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("Received password reset request for email:", email);

    // Validate email
    if (!email) {
      console.log("Email is missing");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      console.log(
        "User lookup result:",
        user ? "User found" : "User not found"
      );

      if (!user) {
        // Return success even if user doesn't exist (security best practice)
        return NextResponse.json(
          {
            message:
              "If an account exists with this email, you will receive a password reset link",
          },
          { status: 200 }
        );
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      console.log("Generated reset token and expiry");

      // Save reset token to database
      try {
        await prisma.user.update({
          where: { email },
          data: {
            resetToken,
            resetTokenExpiry,
          },
        });
        console.log("Reset token saved to database");
      } catch (dbError) {
        console.error("Database error while saving reset token:", dbError);
        throw new Error("Failed to save reset token");
      }

      // Send reset email
      try {
        const emailSent = await sendPasswordResetEmail(email, resetToken);
        console.log(
          "Email send attempt result:",
          emailSent ? "Success" : "Failed"
        );

        if (!emailSent) {
          throw new Error("Failed to send reset email");
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        throw new Error("Failed to send reset email");
      }

      return NextResponse.json(
        {
          message:
            "If an account exists with this email, you will receive a password reset link",
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Database error occurred");
    }
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
