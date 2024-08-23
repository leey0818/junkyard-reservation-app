import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLoginUserInfo } from '@/utils/common';
import {
  deleteUserTokenForCookie,
  getAccessTokenUsingRefreshToken,
  isExpiredAccessToken,
  setUserTokenToCookie
} from '@/utils/token';

export async function GET(req: NextRequest) {
  let accessToken = cookies().get('accessToken')?.value;
  let refreshToken = cookies().get('refreshToken')?.value;

  // 토큰 만료되었으면 재발급 요청
  if (!accessToken || isExpiredAccessToken(accessToken)) {
    if (refreshToken) {
      const result = await getAccessTokenUsingRefreshToken(refreshToken);
      if (result) {
        accessToken = result.accessToken;
        refreshToken = result.refreshToken;
        setUserTokenToCookie(accessToken, refreshToken);
      } else {
        deleteUserTokenForCookie();
        return NextResponse.json({ data: null });
      }
    } else {
      deleteUserTokenForCookie();
      return NextResponse.json({ data: null });
    }
  }

  return NextResponse.json({ data: getLoginUserInfo(accessToken) });
}
