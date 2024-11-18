'use client';

import { useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { doLoginKakao } from '@/actions/user/login';
import KakaoSymbol from '@assets/images/kakao_symbol.svg';

export default function KakaoLoginButton() {
  const [isPending, startTransition] = useTransition();

  const onClickLogin = () => {
    startTransition(async () => {
      const { success, message } = await doLoginKakao();
      if (!success) {
        alert(message);
      }
    });
  };

  return (
    <button
      className="flex items-center justify-center select-none h-12 w-full min-w-48 max-w-96 px-4 rounded-md bg-[#FEE500] text-sm text-black/85 gap-2 cursor-pointer"
      disabled={isPending}
      onClick={onClickLogin}
    >
      {isPending ? <FontAwesomeIcon icon={faSpinner} pulse={true} /> : <KakaoSymbol />}
      카카오 로그인
    </button>
  );
}
