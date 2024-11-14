import { ReactNode } from 'react';
import HeaderBackButton from '@components/HeaderBackButton';

type AppHeaderProps = {
  children: ReactNode;
  allowBack?: boolean;
};

export default function AppHeader(props: AppHeaderProps) {
  return (
    <header className="relative flex items-center justify-center h-12 border-b">
      {props.allowBack !== false && <HeaderBackButton />}
      <div className="text-center font-semibold text-xl">{props.children}</div>
    </header>
  )
}
