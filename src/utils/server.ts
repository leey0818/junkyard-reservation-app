import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

/**
 * 헤더 Host 값으로 호출 Domain 가져오기
 * @param request
 */
export const getRequestHost = (request: NextRequest) => {
  if (request.headers.has('host')) {
    return request.nextUrl.protocol + '//' + request.headers.get('host');
  }
  return request.url;
};

/**
 * URI 리다이렉트
 * @param request
 * @param uri
 */
export const redirectUri = (request: NextRequest, uri: string) => {
  const host = getRequestHost(request);
  return NextResponse.redirect(new URL(uri, host));
};

/**
 * 토큰정보 쿠키에 셋팅
 * @param accessToken 엑세스 토큰
 * @param refreshToken 리프레시 토큰
 */
export const setUserTokenCookie = (accessToken: string, refreshToken: string) => {
  // JWT 엑세스토큰 쿠키에 저장
  let payload = decodeJwt(accessToken);
  cookies().set('accessToken', accessToken, {
    expires: payload.exp ? payload.exp * 1000 : undefined,
  });

  // JWT 리프레시토큰 쿠키에 저장 (httpOnly)
  payload = decodeJwt(refreshToken);
  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    expires: payload.exp ? payload.exp * 1000 : undefined,
  });
};
