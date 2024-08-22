import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, SignupTokenPayload } from '@/types/api';
import { setUserTokenCookie } from '@/utils/server';
import { decryptToJson } from '@/utils/crypto';

type RequestBody = {
  secToken: string;
  nickname: string;
  phoneNo: string;
  email: string;
};

type JoinResponse = ApiResponse<{
  token: {
    accessToken: string;
    refreshToken: string;
  };
}>;


export async function POST(request: NextRequest) {
  const data: RequestBody = await request.json();
  const payload = decryptToJson<SignupTokenPayload>(data.secToken);
  if (!payload) {
    return NextResponse.json({ success: false, message: '입력값 누락' });
  }

  const res = await fetch(process.env.BACKEND_API_URL + '/member/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: payload.id,
      name: data.nickname,
      phoneNo: data.phoneNo,
      email: data.email,
      profileUrl: payload.profile,
      method: 'kakao',
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, message: `서버와 연결에 실패하였습니다. [${res.status} ${res.statusText}]`});
  }

  const result: JoinResponse = await res.json();
  if (result.code === 'NORMAL') {
    // 토큰 쿠키에 저장
    setUserTokenCookie(result.data.token.accessToken, result.data.token.refreshToken);

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: `${result.message} [${result.code}]`});
  }
}
