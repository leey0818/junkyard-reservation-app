import { redirect } from 'next/navigation';
import { doGET } from '@/backend/service';
import { getAccessTokenFromCookie } from '@/utils/token';
import { ReservationData } from '@/types/reservation';
import ReservationCard from '@components/reservation/ReservationCard';

export default async function ReservationCardList() {
  const accessToken = await getAccessTokenFromCookie();
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
      <p className="text-center">일시적으로 데이터를 가져올 수 없습니다.<br/>잠시 후 다시 시도해 주세요.</p>
    );
  }

  if (!result.data?.length) {
    return (
      <p className="text-center">등록된 예약 정보가 없습니다.</p>
    );
  }

  return (
    <>
      <p className="mb-3 text-gray-500 text-center">예약 내역을 클릭하면 상세 화면으로 이동합니다</p>
      {result.data.map((o) => <ReservationCard key={o.reservationId} data={o}/>)}
    </>
  );
}
