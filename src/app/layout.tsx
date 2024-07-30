import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import classNames from 'classnames';
import pkg from '../../package.json';

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: pkg.description,
    template: `%s | ${pkg.description}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={classNames(notoSansKR.className, 'max-w-screen-sm h-screen mx-auto bg-gray-100')}>
        <div className="bg-white h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
