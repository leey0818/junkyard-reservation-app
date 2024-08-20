import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

/**
 * 기본 아바타
 */
export default function DefaultAvatar() {
  return (
    <div
      className="inline-flex items-center justify-center border border-gray-300 rounded-full w-12 h-12 overflow-hidden shadow-md"
    >
      <FontAwesomeIcon icon={faUser} className="w-10 h-10 translate-y-1 text-gray-300" />
    </div>
  )
}
