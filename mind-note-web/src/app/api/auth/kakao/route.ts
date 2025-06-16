import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');
  const isRegistered = searchParams.get('isRegistered');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/fail', req.url));
  }

  const nextPath =
  isRegistered === 'false'
    ? `/register?accessToken=${accessToken}`
    : '/home';
  const res = NextResponse.redirect(new URL(nextPath, req.url));

  // ✅ 서버 쿠키로 저장
  res.cookies.set('accessToken', accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return res;
}
