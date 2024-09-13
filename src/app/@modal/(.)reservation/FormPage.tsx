'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning';
import Modal from '@components/Modal';
import ReservationForm from '@/app/reservation/ReservationForm';

type FormPageProps = { secToken: string; } | { error: string; }

export default function FormPage(props: FormPageProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(true);

  const handleClickClose = useCallback(() => {
    router.back();
  }, [router]);

  if ('error' in props) {
    return (
      <Modal open={modalOpen} onClosed={handleClickClose}>
        <div className="text-center pt-6">
          <FontAwesomeIcon icon={faWarning} className="text-yellow-300 mb-8" size="4x" />
          <h1>알 수 없는 오류가 발생했습니다.</h1>
          <p>{props.error}</p>
        </div>

        <button
          className="w-full bg-gray-50 border border-gray-200 rounded mt-6 p-1"
          onClick={() => setModalOpen(false)}
        >이전 화면으로 돌아가기</button>
      </Modal>
    );
  }

  return (
    <Modal open={modalOpen} onClosed={handleClickClose}>
      <ReservationForm
        secToken={props.secToken}
        onSubmit={() => router.push('/')}
        onCancel={() => setModalOpen(false)}
      />
    </Modal>
  );
}
