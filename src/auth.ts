import NextAuth from 'next-auth';
import Kakao from '@auth/core/providers/kakao';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao],
  callbacks: {
    async jwt(params) {
      console.log('jwt!!!', params);
      if (params.account) {
        return {
          ...params.token,
          accessToken: params.account.access_token,
          refreshToken: params.account.refresh_token,
          expiresAt: params.account.expires_at,
        };
      }
      return params.token;
    },
    async signIn(params) {
      console.log('signin???', params);
      //TODO 여기서 회원가입 여부 체크한다음, 이미 가입된 사용자면 true 반환. 아니면 /signup 페이지로 이동. 오류이면 AccessDenied 오류 반환
      if (params.user) {
        //TODO
      }
      return '/signup?d=aa';
    }
  }
});
