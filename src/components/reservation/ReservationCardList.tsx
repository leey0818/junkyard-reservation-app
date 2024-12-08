import { redirect } from 'next/navigation';
import { doGET } from '@/backend/service';
import { getAccessTokenFromCookie } from '@/utils/token';
import { ReservationData } from '@/types/reservation';
import ReservationCard from '@components/reservation/ReservationCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Link from 'next/link';

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
      <div className="text-center">
        <p className="mb-2">등록된 예약 정보가 없습니다.</p>
        <Link
          href="/reservation"
          className="inline-block border bg-blue-500 text-white border-blue-600 rounded px-3 py-0.5"
        >
          예약하기
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 text-center relative">
        <p className="text-gray-500">예약 내역을 클릭하면 상세 화면으로 이동합니다</p>
        <Link
          href="/reservation"
          className="absolute right-0 top-0 text-xs inline-block border bg-blue-500 text-white border-blue-600 rounded-full px-2 py-0.5"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          예약 추가
        </Link>
      </div>
      {result.data.map((o) => <ReservationCard key={o.reservationId} data={o}/>)}
    </>
  );
}
