import classNames from 'classnames';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { doGET } from '@/backend/service';
import AppHeader from '@components/AppHeader';
import StateBadge from '@components/StateBadge';

type ReservationData = {
  reservationId: string;
  userId: string;
  clientName: string;
  phoneNo: string;
  contents: string;
  startTime: string;
  endTime: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  car: {
    make: string;
    model: string;
    licensePlate: string;
  };
  estimate: {
    amount: number;
    description: string;
    issuedDate: string;
    isFinal: boolean;
  }[];
};

const toPhoneNoFormat = (phoneNo: string) => phoneNo?.replace(/^(01\d)-?(\d{3,4})-?(\d{4})$/, '$1-$2-$3');
const toAmountFormat = (amount: number) => isNaN(amount) ? '-' : Number(amount).toLocaleString() + '원';

const getStatusBadge = (status: string) => {
  //상태값: PENDING, CONFIRMED, CANCELED, REJECTED, COMPLETED
  const state = (() => {
    switch (status) {
      case 'PENDING': return 'wait';
      case 'CONFIRMED': return 'proc';
      case 'REJECTED': return 'fail';
      default: return 'done';
    }
  })();
  const stateText = (() => {
    switch (status) {
      case 'PENDING': return '대기';
      case 'CONFIRMED': return '진행중';
      case 'CANCELED': return '취소됨';
      case 'REJECTED': return '거절됨';
      case 'COMPLETED': return '완료';
    }
  })();

  return <StateBadge state={state} text={stateText} className="absolute top-3 right-3" />
};

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
        <div className="p-6">
          <p className="text-center">일시적으로 데이터를 가져올 수 없습니다.<br/>잠시 후 다시 시도해 주세요.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHeader>내 예약</AppHeader>
      <div className="p-6">
        {result.data?.length > 0
          ? result.data.map((o) =>
            <div key={o.reservationId} className="relative border rounded p-4 pt-3 bg-white mt-5 first:mt-0">
              {getStatusBadge(o.status)}
              <p className="font-bold text-xl mb-2">{o.car.licensePlate}</p>
              <p className="text-sm font-semibold mt-2">차량</p>
              <p>{o.car.make} / {o.car.model}</p>
              <p className="text-sm font-semibold mt-2">예약자</p>
              <p>{o.clientName} / {toPhoneNoFormat(o.phoneNo)}</p>
              <p className="text-sm font-semibold mt-2">예약내용</p>
              <p>{o.contents}</p>
              <p className="text-sm font-semibold mt-2">견적 정보</p>
              <ul>
                {o.estimate?.length > 0
                  ? o.estimate.map((eo, idx) =>
                    <li
                      key={idx}
                      className={classNames(!eo.isFinal && 'line-through text-black/40')}
                    >· {toAmountFormat(eo.amount)} / {eo.description}</li>
                  )
                  : <li>아직 등록된 견적이 없습니다.</li>
                }
              </ul>
            </div>)
          : <p className="text-center">등록된 예약 정보가 없습니다.</p>
        }
      </div>
    </>
  );
}
