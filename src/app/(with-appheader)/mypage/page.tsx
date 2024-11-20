import { Suspense } from 'react';
import AppHeader from '@components/AppHeader';
import ReservationCardList from '@components/reservation/ReservationCardList';

export default function Page() {
  return (
    <>
      <AppHeader>내 예약</AppHeader>
      <div className="p-6 pt-3">
        <Suspense fallback={<p className="text-center text-gray-500">데이터를 가져오는 중...</p>}>
          <ReservationCardList />
        </Suspense>
      </div>
    </>
  );
}
