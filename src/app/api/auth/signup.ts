import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    console.log("Received signup request for:", email);

    // Validate inputs
    if (!name || !email || !password) {
      console.log("Missing fields:", { name, email, password: !!password });
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Connect to database
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Connected to database successfully");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("Existing user check:", existingUser ? "Found" : "Not found");

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    console.log("Creating new user...");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await newUser.save();
    console.log("User saved successfully:", { email, name });

    // Return success
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
