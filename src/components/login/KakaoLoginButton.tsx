'use client';

import Image from 'next/image';
import imageKakaoLogin from '@assets/images/btn_kakao_login.png';

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
    <a className="cursor-pointer" onClick={handleClick}>
      <Image src={imageKakaoLogin} alt="카카오 로그인" unoptimized={true} />
    </a>
  );
}
