'use server';

import { decryptToJson } from '@/utils/crypto';
import { SignupTokenPayload } from '@/types/api';
import { NextResponse } from 'next/server';
import { doPOST, FetchError } from '@/backend/service';
import { setUserTokenToCookie } from '@/utils/token';
import { redirect, RedirectType } from 'next/navigation';

type FormValues = {
  nickname: string;
  phoneNo: string;
  email: string;
};

type JoinResponse = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

/**
 * 사용자 회원가입 (서버 액션)
 * @param secToken 보안토큰
 * @param formData 회원가입 데이터
 */
export const doSignup = async (secToken: string, formData: FormValues) => {
  const payload = decryptToJson<SignupTokenPayload>(secToken);
  if (!payload) {
    return { success: false, message: '입력값 누락' };
  }

  try {
    const result = await doPOST<JoinResponse>('/member/join', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'kakao',
        id: payload.id,
        name: formData.nickname,
        phoneNo: formData.phoneNo,
        email: formData.email,
        profileUrl: payload.profile,
      }),
    });

    // 토큰 쿠키에 저장
    if (result.code !== 'NORMAL') {
      throw new Error(`${result.message} [${result.code}]`);
    }

    await setUserTokenToCookie(result.data.token.accessToken, result.data.token.refreshToken);
  } catch (e) {
    console.warn(e);
    const cause = e instanceof FetchError ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : String(e);
    return { success: false, message: `회원가입 중 오류가 발생했습니다:\n${cause}` };
  }

  redirect('/', RedirectType.replace);
};
