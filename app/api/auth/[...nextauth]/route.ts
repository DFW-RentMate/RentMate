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
    // 로그인 성공 직후: users 테이블에 저장 (있으면 갱신, 없으면 생성)
    async signIn({ user, account }) {
      if (!user.email || !account) return false;

      try {
        await prisma.users.upsert({
          where: { email: user.email },
          update: {
            name: user.name ?? undefined,
            profile_photo_url: user.image ?? undefined,
            updated_at: new Date(),
          },
          create: {
            email: user.email,
            name: user.name ?? null,
            profile_photo_url: user.image ?? null,
            auth_provider: account.provider as 'google' | 'kakao',
            auth_provider_id: account.providerAccountId,
          },
        });
        return true;
      } catch (error) {
        console.error('signIn callback error:', error);
        return false;
      }
    },

    // JWT에 DB 유저 id 심기
    async jwt({ token, account }) {
      if (account && token.email) {
        const dbUser = await prisma.users.findUnique({
          where: { email: token.email },
          select: { id: true },
        });
        if (dbUser) token.userId = dbUser.id;
      }
      return token;
    },

    // 세션에서 user.id 접근 가능하게
    async session({ session, token }) {
      if (session.user && token.userId) {
        (session.user as typeof session.user & { id: string }).id =
          token.userId as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };