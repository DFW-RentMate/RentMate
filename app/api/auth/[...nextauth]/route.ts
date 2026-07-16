import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '@/lib/prisma';   

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
  async signIn({ user, account }) {
    if (!user.email || !account) return false;

    // ⚠️ TODO: DATABASE_URL 받으면 아래 주석 다시 풀기
    // try {
    //   await prisma.users.upsert({
    //     where: { email: user.email },
    //     update: { ... },
    //     create: { ... },
    //   });
    // } catch (error) {
    //   console.error('signIn callback error:', error);
    //   return false;
    // }

    return true;  // 임시: DB 저장 없이 로그인만 허용
  },

  async jwt({ token, account }) {
    // ⚠️ TODO: DB 연결되면 여기도 살리기
    // if (account && token.email) {
    //   const dbUser = await prisma.users.findUnique({ ... });
    //   if (dbUser) token.userId = dbUser.id;
    // }
    return token;
  },

  async session({ session, token }) {
    // token.userId 없으니 이 부분도 지금은 비활성
    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };