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

/**
 * 휴대폰번호 포맷팅
 * @param phoneNo 휴대폰번호
 */
export const toPhoneNoFormat = (phoneNo: string) => phoneNo.replace(/^(01\d)-?(\d{3,4})-?(\d{4})$/, '$1-$2-$3');

/**
 * 금액 포맷팅
 * @param amount 금액
 */
export const toAmountFormat = (amount: number) => isNaN(amount) ? '-' : Number(amount).toLocaleString() + '원';
