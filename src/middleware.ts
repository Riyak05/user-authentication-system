import { NextRequest, NextResponse } from "next/server";

// Define the paths that require authentication
const protectedPaths: string[] = ["/dashboard"]; // Added dashboard back to protected paths

// Define public paths that should bypass the middleware
const publicPaths = [
  "/",
  "/signin",
  "/signup",
  "/api/auth/signin",
  "/api/auth/signup",
];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the path is protected
  const isPathProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // If the path is not protected, allow access
  if (!isPathProtected) {
    return NextResponse.next();
  }

  // Check for the authentication token in cookies
  const authToken = req.cookies.get("authToken")?.value;

  // If there's no token and the path is protected, redirect to sign in
  if (!authToken && isPathProtected) {
    const url = new URL("/signin", req.url);
    return NextResponse.redirect(url);
  }

  // Allow access to protected routes if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (static images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
