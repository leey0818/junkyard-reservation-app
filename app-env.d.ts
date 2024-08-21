declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MOCK_KAKAO_CLIENT_ID: string;
      MOCK_KAKAO_REDIRECT_URI: string;

      BACKEND_API_URL: string;
      DATA_ENCRYPTION_KEY: string;
    }
  }

  module '*.svg' {
    import React from 'react';
    const svg: React.FC<React.SVGProps<SVGSVGElement>>;
    export default svg;
  }
}

export {};
