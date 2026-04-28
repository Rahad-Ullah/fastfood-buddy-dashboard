import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./app/utils/getToken";
import { myFetch } from "./app/utils/myFetch";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken();

  /**
   * 1. If user is logged in and tries to access /login
   * → redirect to dashboard
   */
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /**
   * 2. Redirect root "/" → dashboard
   */
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /**
   * 3. Protect dashboard routes
   */
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role check (Admin only)
    const user = await myFetch("/users/profile");

    if (user?.data?.role !== "Admin" && user?.data?.role !== "Super Admin") {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}
