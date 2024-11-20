import { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative pt-12 box-border bg-neutral-50 h-full min-h-screen">
      {children}
    </div>
  );
}
