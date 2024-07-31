declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
      NEXT_PUBLIC_KAKAO_REDIRECT_URI: string;
    }
  }
}

declare module '*.svg' {
  import React from 'react';
  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}

export {};
