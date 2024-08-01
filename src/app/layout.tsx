import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import classNames from 'classnames';
import pkg from '../../package.json';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
config.autoAddCss = false;

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
        <div className="bg-white min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
