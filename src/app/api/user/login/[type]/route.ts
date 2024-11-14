import { NextRequest, NextResponse } from 'next/server';
import { doPOST } from '@/backend/service';

type Params = Promise<{ type: string; }>;
type KakaoResponse = {
  clientId: string;    // 카카오 클라이언트 ID
  callbackUrl: string; // 카카오 로그인 콜백 URL
};

/* 카카오 로그인 페이지 이동 */
async function doLoginKakao() {
  try {
    const result = await doPOST<KakaoResponse>('/member/kakao/checkout', { signal: AbortSignal.timeout(5000) });

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
  } catch (e) {
    console.warn(e);
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { type } = await params;

  try {
    switch (type) {
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
