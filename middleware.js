import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth/login');
  const isDashboard = req.nextUrl.pathname.startsWith('/auth/dashboard');

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // ถ้า login อยู่แล้ว ไม่ให้เข้าหน้า login ซ้ำ
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/auth/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/dashboard', '/auth/login'],
};
