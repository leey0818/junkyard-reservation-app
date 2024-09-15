'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import uniqolor from 'uniqolor';
import AvatarWrapper from '@components/avatar/AvatarWrapper';
import { useRouter } from 'next/navigation';

type LoginedAvatarProps = {
  text: string;
};

const getShortenName = (text: string) => {
  // 한글이름이면 뒷 2자리, 이 외에는 앞 2자리
  if (/^[가-힣]{3,4}$/.test(text)) {
    return text.slice(-2);
  }
  return text.slice(0, 2);
};

export default function LoginedAvatar(props: LoginedAvatarProps) {
  const router = useRouter();
  const colour = useMemo(() => uniqolor(props.text), [props.text]);
  const [isShow, setShow] = useState(false);

  const handleClickLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' });
    router.replace('/');
    router.refresh();
  };

  return (
    <>
      <AvatarWrapper
        style={{ backgroundColor: colour.color }}
        className={classNames(
          'border-none uppercase text-lg cursor-pointer',
          colour.isLight && 'text-white',
        )}
        onClick={() => setShow(!isShow)}
      >
        {getShortenName(props.text)}
      </AvatarWrapper>
      {isShow && <div className="absolute right-0 border mt-2 bg-white rounded-lg shadow-lg">
        <ul className="text-center my-2 leading-loose">
          <li><Link href="/mypage" className="px-4">내 예약목록</Link></li>
          <li><a className="px-4 cursor-pointer" onClick={handleClickLogout}>로그아웃</a></li>
        </ul>
      </div>}
    </>
  );
}
