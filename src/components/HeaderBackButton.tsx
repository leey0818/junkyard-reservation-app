'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

export default function HeaderBackButton() {
  const router = useRouter();

  return (
    <a className="absolute left-6 text-center cursor-pointer" onClick={() => router.back()}>
      <FontAwesomeIcon icon={faChevronLeft}/>
    </a>
  );
}
