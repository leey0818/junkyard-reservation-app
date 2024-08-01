import Link from 'next/link';
import KakaoSymbol from '@assets/images/kakao_symbol.svg';

export default function KakaoLoginButton() {
  return (
    <Link
      href="/login/sso/kakao"
      className="flex items-center justify-center select-none h-12 w-full min-w-48 max-w-96 px-4 rounded-md bg-[#FEE500] text-sm text-black/85 gap-2 cursor-pointer"
    >
      <KakaoSymbol />
      카카오 로그인
    </Link>
  );
}
