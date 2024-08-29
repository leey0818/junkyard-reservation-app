'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorProps) {
  return (
    <div className="text-center pt-6">
      <FontAwesomeIcon icon={faWarning} className="text-yellow-300 mb-8" size="4x" />
      <h1>알 수 없는 오류가 발생했습니다.</h1>
      <p>{props.error.message}</p>
    </div>
  );
}
