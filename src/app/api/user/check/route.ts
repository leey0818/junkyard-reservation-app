import { NextRequest, NextResponse } from 'next/server';
import { SignupTokenPayload } from '@/types/api';
import { setUserTokenToCookie } from '@/utils/token';
import { redirectUri } from '@/utils/server';
import { encryptText } from '@/utils/crypto';
import { doPOST } from '@/backend/service';

type AuthCheckResponse = {
  joined: boolean;  // 가입여부
  kakaoId: number;  // 카카오 사용자 ID
  nickname: string; // 사용자 닉네임
  profileUrl: string | null; // 프로필 URL
  token: {
    accessToken: string;  // 엑세스 토큰
    refreshToken: string; // 리프레시토큰
  };
};

export async function GET(request: NextRequest) {
  // 서버로 부터 받은 엑세스 토큰 값
  const token = request.nextUrl.searchParams.get('accessToken');
  if (!token) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    // 서버로 가입상태 확인 요청
    const result = await doPOST<AuthCheckResponse>('/member/kakao/auth-check', {
      headers: {
        kakaoAccessToken: token,
      },
    });

    if (result.code === 'NORMAL') {
      if (result.data.joined) {
        // 토큰정보 저장
        await setUserTokenToCookie(result.data.token.accessToken, result.data.token.refreshToken);
        return redirectUri(request, '/');  // 이미 가입된 사용자
      } else {
        // 가입에 필요한 데이터를 암호화 하여 클라이언트로 전송
        const data = encryptText(JSON.stringify({
          id: result.data.kakaoId,
          name: result.data.nickname,
          profile: result.data.profileUrl,
        } satisfies SignupTokenPayload));

        return redirectUri(request, '/signup?d=' + data);  // 신규가입
      }
    } else {
      return new NextResponse(null, { status: 500, statusText: `${result.message} [${result.code}]` });
    }
  } catch (e) {
    console.warn(e);
    return new NextResponse(null, { status: 500 });
  }
}
