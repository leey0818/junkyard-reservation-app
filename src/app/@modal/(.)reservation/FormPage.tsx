'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@components/Modal';
import ReservationForm from '@/app/reservation/ReservationForm';

export default function FormPage({ secToken }: { secToken: string }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <Modal open={modalOpen} onClosed={() => router.back()}>
      <ReservationForm
        secToken={secToken}
        onSubmit={() => router.push('/')}
        onCancel={() => setModalOpen(false)}
      />
    </Modal>
  )
}
