import NextAuth from 'next-auth';
import Kakao from '@auth/core/providers/kakao';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Kakao({
      style: {

      }
      // async authorization() {
      //   //TODO
      //   console.log('auth...');
      // },
    }),
  ],
  callbacks: {
    async signIn() {
      console.log('signin???');
      return true;
    }
  }
});
