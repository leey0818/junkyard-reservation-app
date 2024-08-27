import type { Metadata } from 'next';
import { ReactNode } from 'react';
import localFont from 'next/font/local';
import classNames from 'classnames';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
config.autoAddCss = false;

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;  // modal (Parallel routes)
};

const pretendardFont = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: `익차장 - 폐차장 예약관리`,
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className={classNames(pretendardFont.className, 'max-w-screen-sm h-screen mx-auto bg-gray-100')}>
        <div className="bg-white min-h-full">
          {children}
        </div>
        <div>{modal}</div>
      </body>
    </html>
  );
}
