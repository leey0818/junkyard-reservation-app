import { NextRequest, NextResponse } from 'next/server';

type TokenResponse = {
  clientId: string;
  redirectUri: string;
};

/* 카카오 로그인 페이지 이동 */
async function doLoginKakao() {
  const res = await fetch(process.env.BACKEND_API_URL + '/token/kakao', {
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });

  const data: TokenResponse = await res.json();
  const searchParams = new URLSearchParams({
    client_id: data.clientId,
    redirect_uri: data.redirectUri,
    response_type: 'code',
  });

  return NextResponse.redirect('https://kauth.kakao.com/oauth/authorize?' + searchParams.toString(), { status: 302 });
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
