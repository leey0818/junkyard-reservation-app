import { decodeJwt } from 'jose';

/**
 * 토큰에서 사용자 정보 가져오기
 * @param token 엑세스 토큰
 */
export const getLoginUserInfo = (token: string) => {
  try {
    const payload = decodeJwt(token);
    return {
      nickname: (payload.nickname ?? '') as string,
    };
  } catch {
    return null;
  }
};
