import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const INSTALL_URL = "/install";
const LOGIN_URL = "/login";

const PUBLIC_PATHS = [
  INSTALL_URL,
  LOGIN_URL,
  "/api/check-installation",
  "/api/login",
  "/"
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  console.log("RAN MIDDLEWARE");

  // Check if the request is for the installation page to avoid redirection loop
  if (path === INSTALL_URL) {
    return NextResponse.next();
  }

  // Fetch the installation status from the API route
  const res = await fetch(`${request.nextUrl.origin}/api/check-installation`);
  const data = await res.json();

  // Redirect to installation page if not installed
  if (!data.isInstalled) {
    url.pathname = INSTALL_URL;
    return NextResponse.redirect(url);
  }

  // Allow public pages without restrictions
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    url.pathname = LOGIN_URL;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define the paths that should use the middleware
export const config = {
  matcher: ["/"],
};
