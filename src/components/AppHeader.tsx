'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type AppHeaderProps = {
  children: ReactNode;
  allowBack?: boolean;
};

export default function AppHeader(props: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-center h-12 border-b">
      {props.allowBack !== false &&
        <a className="absolute left-6 text-center cursor-pointer" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </a>}
      <div className="text-center font-semibold text-xl">{props.children}</div>
    </header>
  )
}
