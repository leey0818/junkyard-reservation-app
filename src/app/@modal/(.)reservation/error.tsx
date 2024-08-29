'use client';

import Error from '@/app/reservation/error';
import Modal from '@components/Modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorWrapper(props: ErrorProps) {
  const [modalOpen, setModalOpen] = useState(true);
  const router = useRouter();

  return (
    <Modal open={modalOpen} onClosed={() => router.back()}>
      <Error {...props} />

      <button
        className="w-full bg-gray-50 border border-gray-200 rounded mt-6 p-1"
        onClick={() => setModalOpen(false)}
      >이전 화면으로 돌아가기</button>
    </Modal>
  )
}
