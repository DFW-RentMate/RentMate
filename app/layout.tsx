import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// Provider & 컴포넌트
// ─────────────────────────────────────────────
import AuthContext from '@/lib/auth-context';
import ClientOnly from './components/ClientOnly';
import ToastProvider from './provider/ToastProvider';
import LoginModal from './components/auth/LoginModal';
import Navbar from './components/navbar/Navbar';
import { Footer } from './components/shell/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'RoomRent DFW ',
  description:
    '달라스·포트워스 한인 커뮤니티를 위한 방 렌트 & 룸메이트 매칭 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn('font-sans', inter.variable)}>
      <body className="flex min-h-screen flex-col bg-background">
        
        <AuthContext>
          <ClientOnly>
            <ToastProvider />
            <LoginModal />
          </ClientOnly>

          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}