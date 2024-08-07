import KakaoLoginButton from '@components/login/KakaoLoginButton';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex flex-col items-center text-center justify-center absolute inset-0 p-3">
      <h1 className="text-xl mb-12">폐차장 서비스를 이용하려면<br/> 로그인이 필요합니다.</h1>
      <KakaoLoginButton />

      <p className="mt-3">
        <Link href="/admin/login" className="text-gray-400 text-sm">관리자 로그인</Link>
      </p>
    </main>
  );
}
