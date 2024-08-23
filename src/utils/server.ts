import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

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
