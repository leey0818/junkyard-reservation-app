import * as cookie from 'cookie';
import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAccessTokenUsingRefreshToken,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  isExpiredAccessToken,
} from '@/utils/token';

export default async function middleware(req: NextRequest) {
  const accessToken = await getAccessTokenFromCookie();
  const refreshToken = await getRefreshTokenFromCookie();

  // 엑세스 토큰이 만료되었으면 재발급 요청 (리프레시 토큰 있을 때)
  if (refreshToken && (!accessToken || isExpiredAccessToken(accessToken))) {
    const result = await getAccessTokenUsingRefreshToken(refreshToken);
    if (result) {
      const accessToken = result.accessToken;
      const refreshToken = result.refreshToken;
      const acsPayload = decodeJwt(accessToken);
      const refPayload = decodeJwt(refreshToken);
      const acsExpires = acsPayload.exp ? new Date(acsPayload.exp * 1000) : undefined;
      const refExpires = refPayload.exp ? new Date(refPayload.exp * 1000) : undefined;

      // 변경된 엑세스토큰을 요청 헤더에 넣기 (SSR에서 새로고침없이 바로 사용하기 위함)
      const reqHeaders = new Headers(req.headers);
      reqHeaders.append('Cookie', cookie.serialize('accessToken', accessToken));

      // 응답 헤더에 재발급된 토큰쿠키 추가
      return NextResponse.next({
        request: {
          headers: reqHeaders,
        },
        headers: [
          ['Set-Cookie', cookie.serialize('accessToken', accessToken, { expires: acsExpires })],
          ['Set-Cookie', cookie.serialize('refreshToken', refreshToken, { expires: refExpires, httpOnly: true })],
        ],
      });
    } else {
      // 리프레시 토큰이 있는데, 갱신실패하면 토큰 삭제
      return NextResponse.next({
        headers: [
          ['Set-Cookie', cookie.serialize('refreshToken', '', { maxAge: 0 })],
        ],
      });
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\\\.png$).*)',
  ],
};
