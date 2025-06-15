import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Clear the auth token cookie
    const cookieStore = cookies();
    cookieStore.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    // Return success
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
