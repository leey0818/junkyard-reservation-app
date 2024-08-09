import { NextRequest, NextResponse } from 'next/server';

type TokenResponse = {
  code: string;
  message: string;
  data: {
    clientId: string;
    callbackUrl: string;
  };
};

/* 카카오 로그인 페이지 이동 */
async function doLoginKakao() {
  const res = await fetch(process.env.BACKEND_API_URL + '/member/kakao/checkout', {
    method: 'POST',
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) return new NextResponse(null, { status: 500 });

  const result: TokenResponse = await res.json();

  // 서버 응답 전상
  if (result.code === 'NORMAL') {
    const searchParams = new URLSearchParams({
      client_id: result.data.clientId,
      redirect_uri: result.data.callbackUrl,
      response_type: 'code',
    });

    return NextResponse.redirect('https://kauth.kakao.com/oauth/authorize?' + searchParams.toString(), { status: 302 });
  } else {
    return new NextResponse(null, { status: 500, statusText: `${result.message} [${result.code}]` });
  }
}

export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    switch (params.type) {
      case 'kakao':
        return await doLoginKakao();
      default:
        return new NextResponse(null, { status: 400 });
    }
  } catch (e) {
    console.error(e);
    return new NextResponse(null, { status: 500 });
  }
}
