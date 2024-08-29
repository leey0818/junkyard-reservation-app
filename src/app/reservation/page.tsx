import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { doPOST } from '@/backend/service';
import FormPage from './FormPage';

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

  if (result.code === 'NORMAL') {
    return (
      <div className="p-6">
        <FormPage secToken={result.data.idempotencyKey} />
      </div>
    );
  } else {
    throw new Error(`${result.code} ${result.message || ''}`);
  }
}
