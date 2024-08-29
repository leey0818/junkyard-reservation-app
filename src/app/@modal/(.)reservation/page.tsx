import FormPage from './FormPage';
import { doPOST } from '@/backend/service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type CheckoutResponse = {
  idempotencyKey: string;
};

export default async function Page() {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    return redirect('/login');
  }

  // 백앤드 서버에서 예약키 가져오기
  const result = await doPOST<CheckoutResponse>('/reservation/checkout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (result.code === 'NORMAL') {
    return <FormPage secToken={result.data.idempotencyKey} />;
  } else {
    throw new Error(`${result.code} ${result.message || ''}`);
  }
}
