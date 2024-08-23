import uniqolor from 'uniqolor';
import classNames from 'classnames';
import AvatarWrapper from '@components/avatar/AvatarWrapper';

type ColouredAvatarProps = {
  text: string;
};

const getShortenName = (text: string) => {
  // 한글이름이면 뒷 2자리, 이 외에는 앞 2자리
  if (/^[가-힣]{3,4}$/.test(text)) {
    return text.slice(-2);
  }
  return text.slice(0, 2);
};

/**
 * 텍스트에 따라 결정되는 색상형 아바타
 * @param text 표시할 텍스트 (텍스트는 2자로 제한됨)
 */
export default function ColouredAvatar({ text }: ColouredAvatarProps) {
  const colour = uniqolor(text);
  return (
    <AvatarWrapper
      style={{ backgroundColor: colour.color }}
      className={classNames(
        'border-none uppercase text-lg',
        colour.isLight && 'text-white',
      )}
    >
      {getShortenName(text)}
    </AvatarWrapper>
  );
};
