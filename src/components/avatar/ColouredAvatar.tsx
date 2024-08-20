import uniqolor from 'uniqolor';
import classNames from 'classnames';
import AvatarWrapper from '@components/avatar/AvatarWrapper';

type ColouredAvatarProps = {
  text: string;
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
      {text.substring(0, 2)}
    </AvatarWrapper>
  );
};
