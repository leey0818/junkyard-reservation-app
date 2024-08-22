import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, SignupTokenPayload } from '@/types/api';
import { redirectUri, setUserTokenCookie } from '@/utils/server';
import { encryptText } from '@/utils/crypto';

type AuthCheckResponse = ApiResponse<{
  joined: boolean;  // 가입여부
  kakaoId: number;  // 카카오 사용자 ID
  nickname: string; // 사용자 닉네임
  profileUrl: string | null; // 프로필 URL
  token: {
    accessToken: string;  // 엑세스 토큰
    refreshToken: string; // 리프레시토큰
  };
}>;

export async function GET(request: NextRequest) {
  // 서버로 부터 받은 엑세스 토큰 값
  const token = request.nextUrl.searchParams.get('accessToken');
  if (!token) {
    return new NextResponse(null, { status: 400 });
  }

  // 서버로 가입상태 확인 요청
  const res = await fetch(process.env.BACKEND_API_URL + '/member/kakao/auth-check', {
    method: 'POST',
    headers: {
      'kakaoAccessToken': token,
    },
  });

  if (!res.ok) return new NextResponse(null, { status: 500 });

  const result: AuthCheckResponse = await res.json();
  if (result.code === 'NORMAL') {
    if (result.data.joined) {
      // 토큰정보 저장
      setUserTokenCookie(result.data.token.accessToken, result.data.token.refreshToken);
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
}
