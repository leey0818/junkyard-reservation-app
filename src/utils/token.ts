import { doPOST } from '@/backend/service';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

type RefreshTokenResponse = {
  token: {
    accessToken: string;
    refreshToken: string;
  }
};

/**
 * 리프레시 토큰으로 엑세스 토큰을 재발급합니다.
 * @param token 리프레스 토큰
 */
export const getAccessTokenUsingRefreshToken = async (token: string) => {
  try {
    const result = await doPOST<RefreshTokenResponse>('/member/refresh-token', {
      headers: {
        refreshToken: token,
      },
    });

    if (result?.code === 'NORMAL') {
      return {
        accessToken: result.data.token.accessToken,
        refreshToken: result.data.token.refreshToken,
      };
    } else {
      console.log(JSON.stringify(result));
    }
    return null;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

/**
 * 엑세스 토큰이 만료되었는지 검증합니다.
 * @param token 엑세스 토큰
 */
export const isExpiredAccessToken = (token: string) => {
  const payload = decodeJwt(token);
  return payload.exp ? Date.now() >= ((payload.exp * 1000) - (60 * 1000)) : true;  // 만료 1분전까지 체크, 만료시간 없으면 무조건 true
};

/**
 * 토큰정보 쿠키에 셋팅
 * @param accessToken 엑세스 토큰
 * @param refreshToken 리프레시 토큰
 */
export const setUserTokenToCookie = (accessToken: string, refreshToken: string) => {
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

/**
 * 쿠키에 저장된 토큰정보 삭제
 */
export const deleteUserTokenForCookie = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};
