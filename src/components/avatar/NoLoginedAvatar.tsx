'use client';

import { useId } from 'react';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import AvatarWrapper from '@components/avatar/AvatarWrapper';

export default function NoLoginedAvatar() {
  const tooltipId = useId();

  return (
    <>
      <AvatarWrapper data-tooltip-id={tooltipId}>
        <FontAwesomeIcon icon={faUser} className="w-10 h-10 translate-y-1 text-gray-300" />
      </AvatarWrapper>
      <Tooltip
        id={tooltipId}
        className="leading-none"
        content="로그인이 필요합니다."
        place="left"
        isOpen={true}
      />
    </>
  );
}
