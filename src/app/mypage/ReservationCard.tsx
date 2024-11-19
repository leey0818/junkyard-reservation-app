import classNames from 'classnames';
import StateBadge from '@components/StateBadge';
import { ReservationData } from '@/app/mypage/type';
import { toAmountFormat, toPhoneNoFormat } from '@/utils/common';
import Link from 'next/link';

type ReservationCardProps = {
  data: ReservationData;
};

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

export default function ReservationCard({ data }: ReservationCardProps) {
  return (
    <Link href={`/mypage/${data.reservationId}`} className="block mb-5 last:mb-0">
      <div className="relative border rounded p-4 pt-3 bg-white mb-8 last:mb-0 shadow-lg">
        {getStatusBadge(data.status)}
        <p className="font-bold text-xl mb-2">{data.car.licensePlate}</p>
        <p className="text-sm font-semibold mt-2">차량</p>
        <p>{data.car.make} / {data.car.model}</p>
        <p className="text-sm font-semibold mt-2">예약자</p>
        <p>{data.clientName} / {toPhoneNoFormat(data.phoneNo ?? '')}</p>
        <p className="text-sm font-semibold mt-2">예약내용</p>
        <p>{data.contents}</p>
        <p className="text-sm font-semibold mt-2">견적 정보</p>
        <ul>
          {data.estimate?.length > 0
            ? data.estimate.map((eo, idx) =>
              <li
                key={idx}
                className={classNames(!eo.isFinal && 'line-through text-black/40')}
              >· {toAmountFormat(eo.amount)} / {eo.description}</li>
            )
            : <li>아직 등록된 견적이 없습니다.</li>
          }
        </ul>
      </div>
    </Link>
  )
}
