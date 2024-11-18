'use server';

import { doPOST } from '@/backend/service';
import { redirect } from 'next/navigation';

type KakaoResponse = {
  clientId: string;    // 카카오 클라이언트 ID
  callbackUrl: string; // 카카오 로그인 콜백 URL
};

export const doLoginKakao = async () => {
  const searchParams = new URLSearchParams();
  try {
    const result = await doPOST<KakaoResponse>('/member/kakao/checkout', { signal: AbortSignal.timeout(5000) });

    // 서버 응답 정상
    if (result.code !== 'NORMAL') {
      throw new Error(`${result.message} [${result.code}]`);
    }

    searchParams.set('client_id', result.data.clientId);
    searchParams.set('redirect_uri', result.data.callbackUrl);
    searchParams.set('response_type', 'code');
  } catch (e) {
    return { success: false, message: `로그인 요청에 실패하였습니다:\n${e instanceof Error ? e.message : String(e)}` };
  }

  // 함수 내부적으로 RedirectError를 발생시키기 때문에 try/catch 블럭 밖에서 호출
  redirect('https://kauth.kakao.com/oauth/authorize?' + searchParams.toString());
};
