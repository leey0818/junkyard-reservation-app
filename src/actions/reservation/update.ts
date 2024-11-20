'use server';

import { doCallAPI } from '@/backend/service';
import { getAccessTokenFromCookie } from '@/utils/token';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * 예약 내용 수정 (서버 액션)
 */
export const updateReservationContent = async (rid: string, content: string) => {
  const accessToken = await getAccessTokenFromCookie();
  if (!accessToken) {
    return redirect('/');
  }

  try {
    const result = await doCallAPI('/reservation', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotencyKey: rid,
        contents: content,
      }),
    });

    if (result.code !== 'NORMAL') {
      throw new Error(`${result.message} [${result.code}]`);
    }

    revalidatePath(`/mypage/${rid}`);
    return { success: true, message: '' };
  } catch (e) {
    console.warn(e);
    const cause = e instanceof Error ? e.message : String(e);
    return { success: false, message: `예약 내용 수정에 실패했습니다.\n${cause}` };
  }
};
