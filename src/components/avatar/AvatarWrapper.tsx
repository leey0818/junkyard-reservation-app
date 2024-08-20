import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

type AvatarWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function AvatarWrapper(props: AvatarWrapperProps) {
  return (
    <div
      {...props}
      className={classNames(
        'inline-flex items-center justify-center border border-gray-300 rounded-full w-12 h-12 overflow-hidden shadow-md',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
