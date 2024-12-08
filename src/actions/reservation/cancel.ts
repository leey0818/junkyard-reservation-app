'use server';

import { redirect } from 'next/navigation';
import { doPOST, FetchError } from '@/backend/service';
import { getAccessTokenFromCookie } from '@/utils/token';
import { revalidatePath } from 'next/cache';

/**
 * 예약 취소 API (서버 액션)
 * @param id 예약키
 */
export const cancelReservation = async (id: string) => {
  const accessToken = await getAccessTokenFromCookie();
  if (!accessToken) {
    return redirect('/');
  }

  try {
    const result = await doPOST('/reservation/cancel', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotencyKey: id,
        cancelReason: '사용자 요청 취소',
      }),
    });

    if (result.code === 'NORMAL') {
      revalidatePath('/mypage');  // 내 예약페이지 새로고침
      return { success: true };
    } else {
      return { success: false, message: `${result.message} [${result.code}]` };
    }
  } catch (e) {
    console.warn(e);
    const cause = e instanceof FetchError ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : String(e);
    return { success: false, message: `서버와 연결에 실패하였습니다. [${cause}]` };
  }
};
