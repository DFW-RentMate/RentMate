'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * 앱 전체를 NextAuth 세션으로 감싸는 Provider.
 *
 * "지금 로그인한 사람이 누구인지" 읽을 수 있다.
 */
export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}