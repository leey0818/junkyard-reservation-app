import KakaoLoginButton from '@components/login/KakaoLoginButton';

export default function Page() {
  return (
    <main className="flex flex-col items-center text-center justify-center h-full p-3">
      <h1 className="text-2xl mb-12">폐차장 서비스를 이용하려면<br/> 로그인이 필요합니다.</h1>
      <KakaoLoginButton />
    </main>
  );
}
