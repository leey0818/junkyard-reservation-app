'use client';

import KakaoSymbol from '@assets/images/kakao_symbol.svg';

export default function KakaoLoginButton() {
  const handleClick = () => {
    const searchParams = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      response_type: 'code',
    });
    window.open('https://kauth.kakao.com/oauth/authorize?' + searchParams.toString());
  };

  return (
    <a
      className="inline-flex items-center justify-center select-none h-12 px-4 w-96 rounded-md bg-[#FEE500] text-sm text-black/85 gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <KakaoSymbol />
      카카오 로그인
    </a>
  );
}
