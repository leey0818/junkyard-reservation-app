import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { doGET } from '@/backend/service';
import { ReservationData } from '@/app/mypage/type';
import AppHeader from '@components/AppHeader';
import ReservationCard from '@/app/mypage/ReservationCard';


export default async function Page() {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    return redirect('/');
  }

  // 예약목록 가져오기
  const result = await doGET<ReservationData[]>('/reservation', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (result.code !== 'NORMAL') {
    console.log(JSON.stringify(result));
    return (
      <>
        <AppHeader>내 예약</AppHeader>
        <div className="p-6 bg-neutral-50 min-h-[calc(100vh-48px)]">
          <p className="text-center">일시적으로 데이터를 가져올 수 없습니다.<br/>잠시 후 다시 시도해 주세요.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHeader>내 예약</AppHeader>
      <div className="p-6 pt-3 bg-neutral-50 min-h-[calc(100vh-48px)]">
        {result.data?.length > 0
          ? <>
              <p className="mb-3 text-gray-500 text-center">예약 내역을 클릭하면 상세 화면으로 이동합니다</p>
              {result.data.map((o) => <ReservationCard key={o.reservationId} data={o} />)}
            </>
          : <p className="text-center">등록된 예약 정보가 없습니다.</p>
        }
      </div>
    </>
  );
}
