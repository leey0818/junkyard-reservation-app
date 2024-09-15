import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { doPOST } from '@/backend/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning';
import ReservationForm from '@/app/reservation/ReservationForm';
import AppHeader from '@components/AppHeader';

type CheckoutResponse = {
  idempotencyKey: string;
};

export default async function Page() {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    return redirect('/');
  }

  // 백앤드 서버에서 예약키 가져오기
  const result = await doPOST<CheckoutResponse>('/reservation/checkout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (result.code !== 'NORMAL') {
    return (
      <div className="text-center pt-6">
        <FontAwesomeIcon icon={faWarning} className="text-yellow-300 mb-8" size="4x"/>
        <h1>알 수 없는 오류가 발생했습니다.</h1>
        <p>{result.code} {result.message}</p>
      </div>
    );
  }

  return (
    <>
      <AppHeader>차량 예약</AppHeader>
      <div className="p-6">
        <ReservationForm secToken={result.data.idempotencyKey} />
      </div>
    </>
  );
}
