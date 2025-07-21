import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // ✅ ถ้า user ไม่ login
  if (!token) {
    // ถ้าจะเข้าหน้า dashboard, profile → redirect ไป /auth/login
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
      const loginUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ✅ ถ้า user login อยู่
  // ถ้าจะเข้าหน้า login → redirect ไป home
  if (pathname.startsWith('/auth/login') || pathname === '/auth') {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};