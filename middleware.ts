import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  const isAdminArea = url.pathname.startsWith('/admin');
  const isStoreArea = url.pathname.startsWith('/store');
  const isAuthPage = url.pathname.startsWith('/auth');

  if (!token && (isAdminArea || isStoreArea)) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
  if (token && isAuthPage) {
    url.pathname = (token as any).role === 'ADMIN' ? '/admin' : '/store';
    return NextResponse.redirect(url);
  }
  if (token && isAdminArea && (token as any).role !== 'ADMIN') {
    url.pathname = '/store';
    return NextResponse.redirect(url);
  }
  if (token && isStoreArea && (token as any).role === 'ADMIN') {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/store/:path*', '/auth/:path*'],
};
