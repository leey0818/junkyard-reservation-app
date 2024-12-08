import { redirect } from 'next/navigation';
import { doGET } from '@/backend/service';
import { getAccessTokenFromCookie } from '@/utils/token';
import { toPhoneNoFormat } from '@/utils/common';
import { ReservationData } from '@/types/reservation';
import AppHeader from '@components/AppHeader';
import StateBadge from '@components/StateBadge';
import CancelButton from '@components/reservation/CancelButton';
import EditableContent from '@components/reservation/EditableContent';

type Params = Promise<{ rid: string; }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const accessToken = await getAccessTokenFromCookie();
  if (!accessToken) {
    return redirect('/');
  }

  // 예약 상세 조회
  const result = await doGET<ReservationData>(`/reservation/${params.rid}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (result.code !== 'NORMAL') {
    console.log(JSON.stringify(result));
    return (
      <>
        <AppHeader>예약 상세</AppHeader>
        <div className="p-4">
          <p className="text-center">일시적으로 데이터를 가져올 수 없습니다.<br/>잠시 후 다시 시도해 주세요.</p>
        </div>
      </>
    )
  }

  const isStatusPending = result.data.status === 'PENDING';
  return (
    <>
      <AppHeader>{result.data.car.licensePlate}</AppHeader>
      <div className="m-4 relative">
        <StateBadge status={result.data.status} className="absolute top-0 right-0" />

        <h1 className="text-xl font-bold">차량 정보</h1>
        <div className="grid grid-cols-2 mb-6">
          <div>
            <h2 className="text-lg font-semibold">제조사</h2>
            <p>{result.data.car.make}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">모델/연식</h2>
            <p>{result.data.car.model}</p>
          </div>
        </div>

        <h1 className="text-xl font-bold">예약자 정보</h1>
        <div className="grid grid-cols-2 mb-6">
          <div>
            <h2 className="text-lg font-semibold">성명</h2>
            <p>{result.data.clientName}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">연락처</h2>
            <p>{toPhoneNoFormat(result.data.phoneNo ?? '')}</p>
          </div>
        </div>

        <EditableContent
          id={params.rid}
          content={result.data.contents}
          readonly={!isStatusPending}
        />

        <div>
          <h1 className="text-xl font-bold">견적 정보</h1>
          <p className="mb-6">아직 등록된 견적이 없습니다.</p>
        </div>

        {isStatusPending && <div className="text-sm text-center">
          <CancelButton id={result.data.reservationId} />
        </div>}
      </div>
    </>
  )
}
