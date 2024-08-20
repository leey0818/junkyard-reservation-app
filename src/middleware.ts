import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';
import { ApiResponse } from '@/types/api';

type RefreshTokenResponse = ApiResponse<{
  token: {
    accessToken: string;
    refreshToken: string;
  }
}>;

/**
 * JWT 엑세스 토큰 만료여부 체크
 * 만료 1분전까지 체크합니다.
 */
const isTokenExpired = () => {
  const token = cookies().get('accessToken');
  if (token?.value) {
    const payload = decodeJwt(token.value);
    return payload.exp && Date.now() >= ((payload.exp * 1000) - (60 * 1000));  // 만료 1분전까지 체크
  }
  return false;
};

/**
 * 리프레시 토큰으로 엑세스 토큰을 요청합니다.
 */
const getAccessTokenWithRefreshToken = async () => {
  try {
    const refreshToken = cookies().get('refreshToken');
    if (refreshToken?.value) {
      const res = await fetch(process.env.BACKEND_API_URL + '/v1/api/member/refresh-token', {
        headers: {
          refreshToken: refreshToken.value,
        },
      });

      const result: RefreshTokenResponse | null = res.ok ? await res.json() : null;
      if (result?.code === 'NORMAL') {
        const accessToken = result.data.token.accessToken;
        const refreshToken = result.data.token.refreshToken;
        const { exp: accessExp } = decodeJwt(accessToken);
        const { exp: refreshExp } = decodeJwt(refreshToken);
        cookies().set('accessToken', accessToken, { expires: accessExp ? accessExp * 1000 : undefined });
        cookies().set('refreshToken', refreshToken, { expires: refreshExp ? refreshExp * 1000 : undefined });
        return accessToken;
      }
    }
    return null;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export default async function middleware(request: NextRequest) {
  // JWT 엑세스 토큰 만료 체크
  if (isTokenExpired()) {
    // 리프레시 토큰으로 재발급 요청
    const accessToken = await getAccessTokenWithRefreshToken();
    if (!accessToken) {
      // 엑세스토큰 발급 실패시 403 권한 없음 응답
      return new NextResponse('', { status: 403 });
    }
  }
}

export const config = {
  matcher: [
    '/api/(?!user).*',  // api 하위 전부 (api/user 제외)
  ],
};
