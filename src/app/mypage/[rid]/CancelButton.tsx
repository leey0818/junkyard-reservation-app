'use client';

import { cancelReservation } from '@/actions/mypage/cancel-reservation';
import { useRouter } from 'next/navigation';

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
      router.replace('/mypage');
    } else {
      alert(result.message);
    }
  };

  return (
    <a className="underline text-gray-400" onClick={onClickCancel}>예약 취소</a>
  );
}
