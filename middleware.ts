import { redirect } from "next/navigation";
import { getSession } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

const auth_routes = ["/login", "/register", "/reset"]

export async function middleware(req: NextRequest) {
  const user = await getSession();
  
  const pathname = req.nextUrl.pathname;
  if (!user && !auth_routes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}