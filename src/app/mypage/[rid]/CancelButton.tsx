'use client';

import { useRouter } from 'next/navigation';
import { cancelReservation } from '@/actions/reservation/cancel';

type CancelButtonProps = {
  id: string;
};

export default function CancelButton({ id }: CancelButtonProps) {
  const router = useRouter();

  const onClickCancel = async () => {
    if (!confirm('예약을 취소하시겠습니까?')) return;
    const result = await cancelReservation(id);
    if (result.success) {
      alert('예약이 취소되었습니다.');
      router.back();
    } else {
      alert(result.message);
    }
  };

  return (
    <a className="underline text-gray-400 cursor-pointer" onClick={onClickCancel}>예약 취소</a>
  );
}
