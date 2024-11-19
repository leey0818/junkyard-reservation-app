'use server';

import { redirect } from 'next/navigation';
import { getAccessTokenFromCookie } from '@/utils/token';
import { doPOST, FetchError } from '@/backend/service';

type FormValues = {
  name: string;
  phoneNo: string;
  vendor: string;
  model: string;
  carNo: string;
  note: string;
};

/**
 * 예약 생성 API (서버 액션)
 * @param impKey 멱등성키
 * @param formData 예약 데이터
 */
export const createReservation = async (impKey: string, formData: FormValues) => {
  const accessToken = await getAccessTokenFromCookie();
  if (!accessToken) {
    return redirect('/');
  }

  try {
    const result = await doPOST('/reservation', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotencyKey: impKey,
        contents: formData.note,
        clientName: formData.name,
        phoneNo: formData.phoneNo,
        car: {
          make: formData.vendor,
          model: formData.model,
          licensePlate: formData.carNo,
        },
      }),
    });

    if (result.code !== 'NORMAL') {
      throw new Error(`${result.message} [${result.code}]`);
    }

    return { success: true, message: '' };
  } catch (e) {
    console.warn(e);
    const cause = e instanceof FetchError ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : String(e);
    return { success: false, message: `예약 생성 중 오류가 발생했습니다.\n${cause}` };
  }
};
