'use client';

import DefaultAvatar from '@components/avatar/DefaultAvatar';
import { Tooltip } from 'react-tooltip';

export default function NoLoginedAvatar() {
  return (
    <>
      <DefaultAvatar data-tooltip-id="login-required-anchor" />
      <Tooltip
        id="login-required-anchor"
        content="로그인이 필요합니다."
        place="left"
        isOpen={true}
      />
    </>
  )
}
