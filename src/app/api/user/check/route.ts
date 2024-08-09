import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { cookies } from 'next/headers';

type AuthCheckResponse = ApiResponse<{
  kakaoId: string;  // 카카오 사용자 ID
  token: string;    // 엑세스 토큰
  joined: boolean;  // 가입여부
  nickname: string; // 닉네임
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
    console.log(result.data);
    if (result.data.joined) {
      return NextResponse.redirect(new URL('/', request.url));        // 이미 가입된 사용자
    } else {
      // 가입에 필요한 카카오 ID 저장
      cookies().set('kid', result.data.kakaoId, { httpOnly: true });
      return NextResponse.redirect(new URL('/signup', request.url));  // 신규가입
    }
  } else {
    return new NextResponse(null, { status: 500, statusText: `${result.message} [${result.code}]` });
  }
}
