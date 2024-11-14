import { redirect, RedirectType } from 'next/navigation';
import { SignupTokenPayload } from '@/types/api';
import { decryptToJson } from '@/utils/crypto';
import SignupForm from './form';

type SearchParams = Promise<{ d?: string; }>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const token = (await searchParams).d;
  const data = token ? decryptToJson<SignupTokenPayload>(token) : null;

  // 토큰값이 안넘어왔거나, 복호화 실패이면 로그인 페이지로 이동
  if (!token || !data) {
    return redirect('/login', RedirectType.replace);
  }

  return (
    <main className="px-4 py-12 sm:px-10 sm:py-16">
      <h1 className="text-2xl font-semibold">회원가입</h1>
      <p>서비스를 이용하시려면 회원가입이 필요합니다.</p>
      <SignupForm secToken={token} initialName={data.name ?? ''} />
    </main>
  )
}
