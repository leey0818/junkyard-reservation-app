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

  console.log(result);


  return (
    <>
      <AppHeader>내 예약</AppHeader>

      <div className="p-6">
        <div className="relative border rounded p-4 pt-3 bg-white">
          <StateBadge state="proc" className="absolute top-3 right-3" />
          <p className="font-bold text-xl mb-2">13가 1234</p>
          <p className="text-sm font-semibold mt-2">차량</p>
          <p>현대 / 소나타 19년식</p>
          <p className="text-sm font-semibold mt-2">예약자</p>
          <p>이용완 / 010-2222-3333</p>
          <p className="text-sm font-semibold mt-2">예약내용</p>
          <p>빨리 폐차하고 싶어요. 연락 빠르게 주세요.</p>
        </div>
      </div>
    </>
  );
}
