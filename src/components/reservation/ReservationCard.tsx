import Link from 'next/link';
import classNames from 'classnames';
import StateBadge from '@components/StateBadge';
import { ReservationData } from '@/types/reservation';
import { toAmountFormat, toPhoneNoFormat } from '@/utils/common';

type ReservationCardProps = {
  data: ReservationData;
};

export default function ReservationCard({ data }: ReservationCardProps) {
  return (
    <Link href={`/mypage/${data.reservationId}`} className="block mb-5 last:mb-0">
      <div className="relative border rounded p-4 pt-3 bg-white mb-8 last:mb-0 shadow-lg">
        <StateBadge status={data.status} className="absolute top-3 right-3" />
        <p className="font-bold text-xl mb-2">{data.car.licensePlate}</p>
        <p className="text-sm font-semibold mt-2">차량</p>
        <p>{data.car.make} / {data.car.model}</p>
        <p className="text-sm font-semibold mt-2">예약자</p>
        <p>{data.clientName} / {toPhoneNoFormat(data.phoneNo ?? '')}</p>
        <p className="text-sm font-semibold mt-2">예약내용</p>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">{data.contents}</p>
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
