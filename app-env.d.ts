declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
      NEXT_PUBLIC_KAKAO_REDIRECT_URI: string;
    }
  }
}

export {};
