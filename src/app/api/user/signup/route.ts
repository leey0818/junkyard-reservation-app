import { NextRequest, NextResponse } from 'next/server';
import { SignupTokenPayload } from '@/types/api';
import { doPOST, FetchError } from '@/backend/service';
import { setUserTokenToCookie } from '@/utils/token';
import { decryptToJson } from '@/utils/crypto';

type RequestBody = {
  secToken: string;
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


export async function POST(request: NextRequest) {
  const data: RequestBody = await request.json();
  const payload = decryptToJson<SignupTokenPayload>(data.secToken);
  if (!payload) {
    return NextResponse.json({ success: false, message: '입력값 누락' });
  }

  try {
    const result = await doPOST<JoinResponse>('/member/join', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'kakao',
        id: payload.id,
        name: data.nickname,
        phoneNo: data.phoneNo,
        email: data.email,
        profileUrl: payload.profile,
      }),
    });

    if (result.code === 'NORMAL') {
      // 토큰 쿠키에 저장
      setUserTokenToCookie(result.data.token.accessToken, result.data.token.refreshToken);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: `${result.message} [${result.code}]`});
    }
  } catch (e) {
    console.warn(e);
    const cause = e instanceof FetchError ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : String(e);
    return NextResponse.json({ success: false, message: `서버와 연결에 실패하였습니다. [${cause}]`});
  }
}
