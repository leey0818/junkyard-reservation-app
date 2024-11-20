import { ReactNode } from 'react';
import HeaderBackButton from '@components/HeaderBackButton';

type AppHeaderProps = {
  children: ReactNode;
  allowBack?: boolean;
};

export default function AppHeader(props: AppHeaderProps) {
  return (
    <header className="absolute top-0 w-full h-12 flex items-center justify-center border-b bg-white">
      {props.allowBack !== false && <HeaderBackButton />}
      <div className="text-center font-semibold text-xl">{props.children}</div>
    </header>
  )
}
