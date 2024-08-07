import Image from 'next/image';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AvatarProps = {
  iconUrl?: string;
};

const DefaultIcon = () => <FontAwesomeIcon icon={faUser} className="w-10 h-10 translate-y-1 text-gray-300"/>;

export default function Avatar({ iconUrl }: AvatarProps) {
  return (
    <div
      className="inline-flex relative rounded-full border border-gray-300 items-center justify-center overflow-hidden w-12 h-12 shadow-md"
    >
      {iconUrl ? <Image src={iconUrl} fill={true} alt="Avatar icon" /> : <DefaultIcon />}
    </div>
  );
}
