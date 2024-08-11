import type { Metadata } from 'next';
import { ReactNode } from 'react';
import classNames from 'classnames';
import localFont from 'next/font/local';
import { config } from '@fortawesome/fontawesome-svg-core';
import pkg from '../../package.json';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
config.autoAddCss = false;

const pretendardFont = localFont({
  src: '../assets/fonts/PretendardVariable.ttf',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: {
    default: pkg.description,
    template: `%s | ${pkg.description}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={classNames(pretendardFont.className, 'max-w-screen-sm h-screen mx-auto bg-gray-100')}>
        <div className="bg-white min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
