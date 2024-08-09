import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiResponse } from '@/types/api';
import { decodeJwt } from 'jose';

type JoinResponse = ApiResponse<{
  token: string;
}>

export async function POST(request: NextRequest) {
  const data = await request.json();
  const kakaoId = cookies().get('kid');
  if (!kakaoId?.value) {
    return NextResponse.json({ success: false, message: '입력값 누락' });
  }

  const res = await fetch(process.env.BACKEND_API_URL + '/member/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: kakaoId.value,
      name: data.nickname,
      phoneNo: data.phoneNo,
      email: data.email,
      method: 'kakao',
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, message: `서버와 연결에 실패하였습니다. [${res.status} ${res.statusText}]`});
  }

  const result: JoinResponse = await res.json();
  if (result.code === 'NORMAL') {
    // JWT 토큰 쿠키에 저장
    const { exp } = decodeJwt(result.data.token);
    cookies().set('token', result.data.token, { expires: exp ? exp * 1000 : undefined });

    // 임시 카카오 ID 쿠키 삭제
    cookies().delete('kid');

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: `${result.message} [${result.code}]`});
  }
}
