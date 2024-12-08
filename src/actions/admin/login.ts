'use server';

import { doPOST } from '@/backend/service';

type FormValues = {
  loginId: string;
  password: string;
};

export const doLoginAdmin = async (_: unknown, formData: FormValues) => {
  try {
    const result = await doPOST<{}>('/member/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: formData.loginId,
        password: formData.password,
      }),
    });

    console.log(result);

    if (result.code === 'NORMAL') {
      return { success: true, message: '' };
    } else {
      return { success: false, message: result.message };
    }
  } catch (e) {
    const cause = e instanceof Error ? e.message : String(e);
    return { success: false, message: cause };
  }
};
