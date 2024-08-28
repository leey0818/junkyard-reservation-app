'use client';

import ReservationForm from './ReservationForm';
import { useRouter } from 'next/navigation';

export default function FormPage({ secToken }: { secToken: string }) {
  const router = useRouter();

  return (
    <ReservationForm
      secToken={secToken}
      onSubmit={() => router.push('/')}
      onCancel={() => router.back()}
    />
  );
}
