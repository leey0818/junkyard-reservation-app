declare global {
  namespace NodeJS {
    interface ProcessEnv {
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
