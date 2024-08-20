import uniqolor from 'uniqolor';
import classNames from 'classnames';

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
    <div
      className={classNames(
        `inline-flex items-center justify-center rounded-full w-12 h-12 overflow-hidden shadow-md uppercase text-lg`,
        colour.isLight && 'text-white',
      )}
      style={{ backgroundColor: colour.color }}
    >{text.substring(0, 2)}</div>
  );
};
