import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface JwtPayload {
  userId: string;
  email: string;
}

// Generate a JWT token
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// Verify a JWT token
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

// Set the JWT token as an HTTP cookie
export function setTokenCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

// Get the JWT token from the request
export function getTokenFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get("authToken")?.value;
  return token || null;
}

// Clear the auth token cookie
export function clearTokenCookie() {
  const cookieStore = cookies();
  cookieStore.set("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}

// Authenticate a request, returns user payload or null
export function authenticateRequest(req: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

// Create an authenticated response
export function createAuthenticatedResponse(
  data: any,
  status: number = 200,
  token?: string
): NextResponse {
  const response = NextResponse.json(data, { status });

  if (token) {
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
  }

  return response;
}
