'use server';

import { deleteUserTokenForCookie } from '@/utils/token';
import { redirect, RedirectType } from 'next/navigation';

export const doLogoutApp = async () => {
  await deleteUserTokenForCookie();
  redirect('/', RedirectType.replace);
};
