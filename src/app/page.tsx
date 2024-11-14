import Link from 'next/link';
import { getAccessTokenFromCookie } from '@/utils/token';
import { getLoginUserInfo } from '@/utils/common';
import NoLoginedAvatar from '@components/avatar/NoLoginedAvatar';
import LoginedAvatar from '@components/avatar/LoginedAvatar';

export default async function Home() {
  const token = await getAccessTokenFromCookie();
  const user = token ? getLoginUserInfo(token) : null;

  return (
    <main className="px-4 py-5">
      <div className="text-right mb-4 leading-0 relative">
        {user ? <LoginedAvatar text={user.nickname} /> : <NoLoginedAvatar />}
      </div>

      <div className="text-center *:mb-4">
        <h1 className="font-bold text-2xl">간편한 폐차 예약 서비스</h1>
        <p>고객님의 시간과 노력을 아끼기 위해 설계된<br/>간편한 폐차 예약 서비스를 제공합니다.</p>
        <p>폐차 과정에서 발생할 수 있는 모든 불편함을<br/>최소화하기 위해 최선을 다하고 있으며, 친절하고<br/> 전문적인 지원을 약속드립니다.</p>
        <p>차량을 손쉽게 처분하고 싶으신가요?<br/>저희 서비스는 안전하고 신속하게 폐차를 완료하며,<br/> 필요한 모든 서류와 절차를 대행해드립니다.</p>
        <p>지금 바로 시작하여 폐차의 모든 과정을<br/>간편하게 해결해보세요!</p>

        {user
          ? <Link
            href="/reservation"
            className="inline-block border bg-blue-500 text-white border-blue-600 rounded px-3 py-1"
          >예약하기</Link>
          : <Link
            href="/login"
            className="inline-block border bg-blue-500 text-white border-blue-600 rounded px-3 py-1"
          >로그인 페이지로 이동</Link>
        }
      </div>
    </main>
  );
}
